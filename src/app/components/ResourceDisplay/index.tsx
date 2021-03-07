/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store";
import { selectPops } from "../../selectors";
import { ResourceId } from "../../game/constants";
import Style from "./style.module.css";
import { toggleResourceDisplay } from "../../slices/misc";
import { SingleResource } from "./SingleResource";

export const ResourceDisplay = (): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();
  const dispatch = useAppDispatch();
  const { population, maxPopulation } = useSelector((state: RootState) => selectPops(state, townId));
  const storageCapacity = useSelector((state: RootState) => state.towns.byId[townId].storageCapacity);

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
