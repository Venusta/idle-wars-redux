/* eslint-disable jsx-a11y/click-events-have-key-events */
import { selectTowns } from "../../selectors";
import { useMemoSelector } from "../hooks";
import Style from "./style.module.css";

export const WorldMap = (): JSX.Element => {
  const towns = useMemoSelector((state) => selectTowns(state));

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, townId: string) => {
    console.log(`yeet: ${townId}`);
    e.preventDefault();
  };

  return (
    <div className={Style.container}>
      {
        Object.values(towns.id).map(({ id }) => (
          <div className={Style.clicky} key={id} onClick={(e) => handleClick(e, id)} role="button" tabIndex={0}>
            {`Town ${id}`}
          </div>
        ))
      }
    </div>
  );
};
