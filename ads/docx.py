"""Minimal .docx writer — standard library only, no pip install required.

A .docx is a zip of OOXML parts. This builds the four parts Word needs and
exposes a small API (heading / para / bullet / table / rule) used by
generate-plans.py. Kept deliberately small: it does what these reports need
and nothing more.
"""

import zipfile
from xml.sax.saxutils import escape

# Palette shared with the published audit page.
INK = "13201E"
MUTED = "6B7F7A"
CRIT = "9C2B23"
WARN = "8A5D0C"
GOOD = "24614A"
HEAD_FILL = "EDF1F0"
CRIT_FILL = "F6E0DD"
GOOD_FILL = "DCEBE3"

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>"""

RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

DOC_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""


def _style(sid, name, size, bold, color, before, after, outline=None):
    ol = f'<w:outlineLvl w:val="{outline}"/>' if outline is not None else ""
    return (
        f'<w:style w:type="paragraph" w:styleId="{sid}">'
        f'<w:name w:val="{name}"/><w:basedOn w:val="Normal"/>'
        f'<w:pPr><w:spacing w:before="{before}" w:after="{after}"/>{ol}</w:pPr>'
        f'<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>'
        f'<w:b w:val="{"1" if bold else "0"}"/><w:color w:val="{color}"/>'
        f'<w:sz w:val="{size}"/></w:rPr></w:style>'
    )


STYLES = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr>
<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:color w:val="{INK}"/><w:sz w:val="21"/>
</w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="140" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault>
</w:docDefaults>
<w:style w:type="paragraph" w:styleId="Normal" w:default="1"><w:name w:val="Normal"/></w:style>
{_style("Title", "Title", 44, True, INK, 0, 100, 0)}
{_style("Heading1", "heading 1", 30, True, INK, 380, 140, 0)}
{_style("Heading2", "heading 2", 24, True, INK, 300, 120, 1)}
{_style("Heading3", "heading 3", 21, True, MUTED, 240, 100, 2)}
<w:style w:type="paragraph" w:styleId="Mono"><w:name w:val="Mono"/><w:basedOn w:val="Normal"/>
<w:pPr><w:spacing w:after="80"/><w:ind w:left="220"/></w:pPr>
<w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/></w:rPr></w:style>
</w:styles>"""


def _runs(parts):
    """parts: str, or list of str / (text, **opts) tuples."""
    if isinstance(parts, str):
        parts = [parts]
    out = []
    for p in parts:
        opts = {}
        if isinstance(p, tuple):
            text, opts = p[0], p[1]
        else:
            text = p
        rpr = ""
        if opts.get("b"):
            rpr += "<w:b/>"
        if opts.get("i"):
            rpr += "<w:i/>"
        if opts.get("color"):
            rpr += f'<w:color w:val="{opts["color"]}"/>'
        if opts.get("mono"):
            rpr += '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/>'
        if opts.get("sz"):
            rpr += f'<w:sz w:val="{opts["sz"]}"/>'
        rpr = f"<w:rPr>{rpr}</w:rPr>" if rpr else ""
        out.append(f'<w:r>{rpr}<w:t xml:space="preserve">{escape(text)}</w:t></w:r>')
    return "".join(out)


class Doc:
    def __init__(self):
        self.body = []

    def title(self, text, sub=None):
        self.body.append(f'<w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr>{_runs(text)}</w:p>')
        if sub:
            self.body.append(
                '<w:p><w:pPr><w:spacing w:after="240"/></w:pPr>'
                + _runs([(sub, {"color": MUTED, "sz": 20})])
                + "</w:p>"
            )

    def h1(self, text):
        self.body.append(f'<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr>{_runs(text)}</w:p>')

    def h2(self, text):
        self.body.append(f'<w:p><w:pPr><w:pStyle w:val="Heading2"/></w:pPr>{_runs(text)}</w:p>')

    def h3(self, text):
        self.body.append(f'<w:p><w:pPr><w:pStyle w:val="Heading3"/></w:pPr>{_runs(text)}</w:p>')

    def p(self, parts):
        self.body.append(f"<w:p>{_runs(parts)}</w:p>")

    def mono(self, text):
        for line in text.split("\n"):
            self.body.append(
                f'<w:p><w:pPr><w:pStyle w:val="Mono"/></w:pPr>{_runs(line or " ")}</w:p>'
            )

    def bullet(self, parts, level=0):
        ind = 340 + level * 280
        self.body.append(
            f'<w:p><w:pPr><w:spacing w:after="70"/><w:ind w:left="{ind}" w:hanging="220"/></w:pPr>'
            + _runs([("•   ", {"color": MUTED})])
            + _runs(parts)
            + "</w:p>"
        )

    def numbered(self, n, parts):
        self.body.append(
            '<w:p><w:pPr><w:spacing w:after="70"/><w:ind w:left="420" w:hanging="420"/></w:pPr>'
            + _runs([(f"{n}.", {"b": True}), ("   ", {})])
            + _runs(parts)
            + "</w:p>"
        )

    def table(self, headers, rows, widths=None, fills=None):
        n = len(headers)
        widths = widths or [round(100 / n, 2)] * n
        grid = "".join(f'<w:gridCol w:w="{int(w * 94)}"/>' for w in widths)
        out = [
            '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/>'
            '<w:tblBorders>'
            f'<w:top w:val="single" w:sz="4" w:color="D3DBD8"/>'
            f'<w:bottom w:val="single" w:sz="4" w:color="D3DBD8"/>'
            f'<w:insideH w:val="single" w:sz="4" w:color="D3DBD8"/>'
            '</w:tblBorders>'
            '<w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/>'
            '<w:left w:w="90" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tblCellMar>'
            f'</w:tblPr><w:tblGrid>{grid}</w:tblGrid>'
        ]
        cells = []
        for h, w in zip(headers, widths):
            cells.append(
                f'<w:tc><w:tcPr><w:tcW w:w="{int(w * 50)}" w:type="pct"/>'
                f'<w:shd w:val="clear" w:fill="{HEAD_FILL}"/></w:tcPr>'
                f'<w:p><w:pPr><w:spacing w:after="0"/></w:pPr>'
                + _runs([(h, {"b": True, "sz": 17, "color": MUTED})])
                + "</w:p></w:tc>"
            )
        out.append(f'<w:tr><w:trPr><w:tblHeader/></w:trPr>{"".join(cells)}</w:tr>')

        for i, row in enumerate(rows):
            fill = (fills or {}).get(i)
            shd = f'<w:shd w:val="clear" w:fill="{fill}"/>' if fill else ""
            cells = []
            for cell, w in zip(row, widths):
                opts = {"sz": 18}
                if isinstance(cell, tuple):
                    cell, extra = cell[0], cell[1]
                    opts.update(extra)
                cells.append(
                    f'<w:tc><w:tcPr><w:tcW w:w="{int(w * 50)}" w:type="pct"/>{shd}</w:tcPr>'
                    f'<w:p><w:pPr><w:spacing w:after="0"/></w:pPr>'
                    + _runs([(str(cell), opts)])
                    + "</w:p></w:tc>"
                )
            out.append(f'<w:tr>{"".join(cells)}</w:tr>')
        out.append("</w:tbl>")
        self.body.append("".join(out))
        self.body.append('<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>')

    def save(self, path):
        doc = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
            "<w:body>" + "".join(self.body) +
            '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
            '<w:pgMar w:top="1100" w:right="1100" w:bottom="1100" w:left="1100"/></w:sectPr>'
            "</w:body></w:document>"
        )
        with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
            z.writestr("[Content_Types].xml", CONTENT_TYPES)
            z.writestr("_rels/.rels", RELS)
            z.writestr("word/document.xml", doc)
            z.writestr("word/_rels/document.xml.rels", DOC_RELS)
            z.writestr("word/styles.xml", STYLES)
