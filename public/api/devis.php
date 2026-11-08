<?php
/**
 * Devis form → email notification (Hostinger SMTP, no library, no third party).
 *
 * Called by src/components/sections/DevisForm.jsx on a valid submit. Sends
 * through smtp.hostinger.com, authenticated as the creation-site@ mailbox, so
 * SPF/DKIM align. PHP mail() is NOT used: on Hostinger it returned "sent"
 * while nothing was delivered (tested 2026-11-08).
 *
 * The mailbox password lives in devis-config.php OUTSIDE public_html (never in
 * git, never overwritten by a dist upload):
 *   /home/<user>/domains/moudevpro.com/devis-config.php
 *   <?php return ['smtp_pass' => '...'];
 * Errors are logged next to it in devis-mail.log.
 *
 * The Google Sheet log (trackLead → Apps Script) still runs in parallel: it
 * keeps the gclid for Offline Conversion Import. This file only notifies.
 */

declare(strict_types=1);

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const MAIL_TO   = 'creation-site@moudevpro.com';
const MAIL_FROM = 'creation-site@moudevpro.com'; // must be a mailbox on this domain
const ALLOWED_HOSTS = ['www.moudevpro.com', 'moudevpro.com'];
const RATE_MAX    = 5;    // submissions…
const RATE_WINDOW = 600;  // …per IP per 10 minutes
const SMTP_HOST = 'ssl://smtp.hostinger.com';
const SMTP_PORT = 465;
// public_html/api/devis.php → /home/<user>/domains/moudevpro.com/
define('PRIVATE_DIR', dirname(__DIR__, 2));
// ─────────────────────────────────────────────────────────────────────────────

function log_error(string $msg): void
{
    @file_put_contents(
        PRIVATE_DIR . '/devis-mail.log',
        date('c') . ' ' . $msg . "\n",
        FILE_APPEND | LOCK_EX
    );
}

/**
 * Minimal authenticated SMTP send (implicit TLS, AUTH LOGIN).
 * Returns '' on success, or a short error code.
 */
function smtp_send(string $user, string $pass, string $to, string $rawMessage): string
{
    $fp = @stream_socket_client(SMTP_HOST . ':' . SMTP_PORT, $errno, $errstr, 15);
    if (!$fp) {
        log_error("connect failed: $errno $errstr");
        return 'connect';
    }
    stream_set_timeout($fp, 15);

    $read = static function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 515)) !== false) {
            $out .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break; // last line of a (multi-line) reply
            }
        }
        return $out;
    };
    $cmd = static function (string $c, string $expect) use ($fp, $read): bool {
        if ($c !== '') {
            fwrite($fp, $c . "\r\n");
        }
        $reply = $read();
        if (strncmp($reply, $expect, 3) !== 0) {
            $shown = str_starts_with($c, 'AUTH') || strlen($c) > 60 ? '[hidden]' : $c;
            log_error("SMTP '$shown' → " . trim($reply));
            return false;
        }
        return true;
    };

    // Dot-stuffing: a line starting with "." must be doubled.
    $data = preg_replace('/^\./m', '..', $rawMessage);

    $ok = $cmd('', '220')
        && $cmd('EHLO www.moudevpro.com', '250')
        && $cmd('AUTH LOGIN', '334')
        && $cmd(base64_encode($user), '334')
        && $cmd(base64_encode($pass), '235')
        && $cmd('MAIL FROM:<' . $user . '>', '250')
        && $cmd('RCPT TO:<' . $to . '>', '250')
        && $cmd('DATA', '354')
        && $cmd($data . "\r\n.", '250');

    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok ? '' : 'smtp';
}

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

function respond(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method']);
}

// Same-site only: the browser always sends Origin on a cross-site POST.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array(parse_url($origin, PHP_URL_HOST), ALLOWED_HOSTS, true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

$data = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'json']);
}

// Honeypot filled → bot. Pretend success, send nothing.
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

/** Single-line, length-capped field (no header injection possible). */
function field(array $d, string $key, int $max = 120): string
{
    $v = isset($d[$key]) && is_scalar($d[$key]) ? (string) $d[$key] : '';
    $v = preg_replace('/[\r\n\t]+/', ' ', $v) ?? '';
    return mb_substr(trim($v), 0, $max);
}

$name    = field($data, 'name', 80);
$phone   = preg_replace('/[\s.\-]/', '', field($data, 'phone', 30)) ?? '';
$city    = field($data, 'city', 60);
$project = field($data, 'projectType', 60);
$budget  = field($data, 'budget', 60);
$ref     = field($data, 'ref', 20);
$source  = field($data, 'source', 40);
$page    = field($data, 'page', 200);
$gclid   = field($data, 'gclid', 200);
$message = isset($data['message']) && is_scalar($data['message'])
    ? mb_substr(trim((string) $data['message']), 0, 1000) : '';

// Same rules as the form (DevisForm.jsx validate()).
if (mb_strlen($name) < 2 || !preg_match('/^(?:0[5-7]\d{8}|(?:\+|00)212[5-7]\d{8})$/', $phone)) {
    respond(422, ['ok' => false, 'error' => 'invalid']);
}

// Rate limit per IP (flat files in the system temp dir).
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateFile = sys_get_temp_dir() . '/mdp_devis_' . md5($ip);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($rateFile))),
        static fn (int $t): bool => $t > $now - RATE_WINDOW
    );
}
if (count($hits) >= RATE_MAX) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}
$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);

$labels = [
    'vitrine' => 'Site vitrine', 'ecommerce' => 'Site e-commerce',
    'autre' => 'Autre (application, refonte…)',
    'moins-5000' => 'Moins de 5 000 DH', '5000-15000' => '5 000 – 15 000 DH',
    '15000-30000' => '15 000 – 30 000 DH', 'plus-30000' => 'Plus de 30 000 DH',
    'ne-sais-pas' => 'Je ne sais pas encore',
];
$projectLabel = $labels[$project] ?? ($project ?: '—');
$budgetLabel  = $labels[$budget] ?? ($budget ?: '—');

// wa.me link to reply to the lead from Mourad's own WhatsApp.
$intl = preg_replace('/^(?:\+|00)/', '', $phone) ?? $phone;
if (str_starts_with($intl, '0')) {
    $intl = '212' . substr($intl, 1);
}
$waReply = 'https://wa.me/' . $intl . '?text=' . rawurlencode(
    "Bonjour $name, merci pour votre demande de devis" . ($ref ? " (réf. $ref)" : '') . '.'
);

$date = (new DateTime('now', new DateTimeZone('Africa/Casablanca')))->format('d/m/Y H:i');

$body = implode("\n", [
    'Nouvelle demande de devis — moudevpro.com',
    '',
    "Nom       : $name",
    "Téléphone : $phone",
    'Ville     : ' . ($city ?: '—'),
    "Projet    : $projectLabel",
    "Budget    : $budgetLabel",
    '',
    'Message :',
    $message !== '' ? $message : '—',
    '',
    "Répondre sur WhatsApp : $waReply",
    "Appeler : tel:$phone",
    '',
    '---',
    "Réf     : " . ($ref ?: '—'),
    "Date    : $date (Casablanca)",
    "Source  : " . ($source ?: '—'),
    "Page    : " . ($page ?: '—'),
    "Google Ads : " . ($gclid !== '' ? 'oui (gclid présent)' : 'non'),
]);

$subject = '=?UTF-8?B?' . base64_encode(
    "Nouveau devis : $name — $projectLabel" . ($city ? " ($city)" : '')
) . '?=';

$config = @include PRIVATE_DIR . '/devis-config.php';
if (!is_array($config) || empty($config['smtp_pass'])) {
    log_error('devis-config.php missing or without smtp_pass');
    respond(500, ['ok' => false, 'error' => 'config']);
}

$raw = implode("\r\n", [
    'Date: ' . date(DATE_RFC2822),
    'From: MouDevPro Site <' . MAIL_FROM . '>',
    'To: <' . MAIL_TO . '>',
    "Subject: $subject",
    'Message-ID: <' . bin2hex(random_bytes(12)) . '@moudevpro.com>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    rtrim(chunk_split(base64_encode($body), 76, "\r\n")),
]);

$err = smtp_send(MAIL_FROM, (string) $config['smtp_pass'], MAIL_TO, $raw);

respond($err === '' ? 200 : 500, $err === '' ? ['ok' => true] : ['ok' => false, 'error' => $err]);
