import { Link } from "react-router-dom";
import Style from "./style.module.css";

interface ButtonProps {
  text: string;
  linkTo: string;
}

export const HeaderNavButton = ({ text, linkTo }: ButtonProps): JSX.Element => (
  <Link
    className={`${Style.buttonStyle} link`}
    to={linkTo}
    type="button"
  >
    {text}
  </Link>
);
