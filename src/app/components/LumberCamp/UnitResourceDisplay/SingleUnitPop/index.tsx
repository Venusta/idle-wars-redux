import Style from "./style.module.css";
import { UnitIdGathererType } from "../../../../game/constants";
import { baseGatherers } from "../../../../game/units/gatherers";

interface Props {
  unitId: UnitIdGathererType;
  multiplier: number;
}
// TODO icon
// TODO make text red if not enough farm space
export const SingleUnitPop = ({ unitId, multiplier = 1 }: Props): JSX.Element => {
  const cost = baseGatherers[unitId].cost.population * multiplier;

  return (
    <div className={Style.container}>
      <img alt="" className={Style.logo} src={`${process.env.PUBLIC_URL}/knight.svg`} />
      <div>{cost}</div>
    </div>
  );
};
