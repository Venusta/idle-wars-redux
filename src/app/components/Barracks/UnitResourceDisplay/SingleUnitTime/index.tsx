import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Style from "./style.module.css";
import { UnitId, BuildingId } from "../../../../game/constants";
import { baseUnits } from "../../../../game/units";
import { RootState } from "../../../../store";
import { selectBuilding } from "../../../../selectors";

interface Props {
  unitId: UnitId;
  buildingId: BuildingId;
  multiplier: number;
}
// TODO icon
export const SingleUnitTime = ({ unitId, buildingId, multiplier = 1 }: Props): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();
  const building = useSelector((state: RootState) => selectBuilding(state, townId, buildingId));

  const time = baseUnits[unitId].getRecruitTime(building.level) * multiplier;
  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);

  return (
    <div className={Style.container}>
      <img className={Style.logo} src={`${process.env.PUBLIC_URL}/clock.svg`} alt="" />
      <div>{formattedTime}</div>
    </div>
  );
};