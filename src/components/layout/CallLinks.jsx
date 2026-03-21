import { HiMiniPhone } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import useConversion from "../../hooks/useConversion";

const CallLinks = () => {
  const { track, trackPhone, WA_URL } = useConversion();

  return (
    <div className="cta">
      <a
        href={WA_URL}
        rel="noopener noreferrer"
        title="Contact MouDev sur WhatsApp"
        className="link"
        onClick={() => track(WA_URL)}
      >
        <FaWhatsapp className="cta-icon" />
      </a>
      <a
        href="tel:+212696964341"
        rel="noopener noreferrer"
        title="Appeler MouDev"
        className="link"
        onClick={trackPhone}
      >
        <HiMiniPhone className="cta-icon" />
      </a>
    </div>
  );
};

export default CallLinks;
