import { useParams } from "react-router-dom";
import Style from "./style.module.css";
import { BuildingIdType, UnitIdGathererType } from "../../../../game/constants";
import { selectBuilding } from "../../../../selectors";
import { useStateSelector } from "../../../hooks";
import { baseGatherers } from "../../../../game/units/gatherers";

interface Props {
  unitId: UnitIdGathererType;
  buildingId: BuildingIdType;
  multiplier: number;
}
// TODO icon
export const SingleUnitTime = ({ unitId, buildingId, multiplier = 1 }: Props): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();
  const building = useStateSelector((state) => selectBuilding(state, townId, buildingId));

  const time = baseGatherers[unitId].getRecruitTime(building.level) * multiplier;
  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);

  return (
    <div className={Style.container}>
      <img alt="" className={Style.logo} src={`${process.env.PUBLIC_URL}/clock.svg`} />
      <div>{formattedTime}</div>
    </div>
  );
};
