import "./style.css";

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

export const ConstructButton = ({ text, handleClick }: ButtonProps): JSX.Element => (
  <button
    className="button-style"
    onClick={() => handleClick()}
    type="button"
  >
    {text}
  </button>
);
