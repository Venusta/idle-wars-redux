import Style from "./style.module.css";

interface ButtonProps {
  text: string;
}

export const InactiveButton = ({ text }: ButtonProps): JSX.Element => <button type="button" className={Style["button-style"]}>{text}</button>;
