/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { selectPops } from "../../selectors";
import { ResourceId } from "../../game/constants";
import Style from "./style.module.css";
import { toggleResourceDisplay } from "../../slices/misc";
import { SingleResource } from "./SingleResource";
import { useStateSelector } from "../hooks";

export const ResourceDisplay = (): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();
  const dispatch = useAppDispatch();
  const { population, maxPopulation } = useStateSelector((state) => selectPops(state, townId));
  const storageCapacity = useStateSelector((state) => state.towns.id[townId].storageCapacity);

  const handleToggle = () => {
    dispatch(toggleResourceDisplay());
  };

  return (
    <div className={Style.wrapper} onClick={handleToggle}>
      <SingleResource id={ResourceId.Timber} />
      <SingleResource id={ResourceId.Clay} />
      <SingleResource id={ResourceId.Iron} />

      <div className={Style.inner}>
        <div className={Style.displayText}>{storageCapacity.toFixed(0)}</div>
      </div>
      <div className={Style.inner}>
        <div className={Style.displayText}>{`${population.toFixed(0)}/${maxPopulation.toFixed(0)}`}</div>
      </div>
    </div>
  );
};
