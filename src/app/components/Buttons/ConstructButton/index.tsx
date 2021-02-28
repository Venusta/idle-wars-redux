import "./style.css";

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

export const ConstructButton = ({ text, handleClick }: ButtonProps): JSX.Element => <button type="button" onClick={() => handleClick()} className="button-style">{text}</button>;
