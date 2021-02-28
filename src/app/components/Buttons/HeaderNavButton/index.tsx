import { Link } from "react-router-dom";
import Style from "./style.module.css";

interface ButtonProps {
  text: string;
  linkTo: string;
}

export const HeaderNavButton = ({ text, linkTo }: ButtonProps): JSX.Element => <Link to={linkTo} type="button" className={`${Style.buttonStyle} link`}>{text}</Link>;
