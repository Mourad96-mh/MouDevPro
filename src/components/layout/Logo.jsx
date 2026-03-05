import { Link } from "react-router-dom";
import { DiCode } from "react-icons/di";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <span className="logo-mou">Mou</span>
      <span className="logo-dev">DEV</span>
      <span>
        <DiCode />
      </span>
    </Link>
  );
};

export default Logo;
