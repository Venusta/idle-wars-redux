import Style from "./style.module.css";
import { UnitIdType } from "../../../../game/constants";
import { baseUnits } from "../../../../game/units";

interface Props {
  unitId: UnitIdType;
  multiplier: number;
}
// TODO icon
// TODO make text red if not enough farm space
export const SingleUnitPop = ({ unitId, multiplier = 1 }: Props): JSX.Element => {
  const cost = baseUnits[unitId].cost.population * multiplier;

  return (
    <div className={Style.container}>
      <img alt="" className={Style.logo} src={`${process.env.PUBLIC_URL}/knight.svg`} />
      <div>{cost}</div>
    </div>
  );
};
