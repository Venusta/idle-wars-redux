/* eslint-disable jsx-a11y/click-events-have-key-events */
import { selectTownIds } from "../../selectors";
import { useStateSelector } from "../hooks";
import Style from "./style.module.css";

export const WorldMap = (): JSX.Element => {
  const townIds = useStateSelector((state) => selectTownIds(state));

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, townId: string) => {
    console.log(`yeet: ${townId}`);
    e.preventDefault();
  };

  return (
    <div className={Style.container}>
      {
        townIds.map((id) => (
          <div key={id} className={Style.clicky} onClick={(e) => handleClick(e, id)} role="button" tabIndex={0}>
            {`Town ${id}`}
          </div>
        ))
      }
    </div>
  );
};
