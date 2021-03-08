import { useParams } from "react-router-dom";
import { ResourceId, UnitId } from "../../../../game/constants";
import { selectResource } from "../../../../selectors";
import Style from "./style.module.css";
import { baseUnits } from "../../../../game/units";
import { useMemoSelector } from "../../../hooks";

interface Props {
  unitId: UnitId
  resourceId: ResourceId
  multiplier: number
}

const ResouceAmount = ({ unitId, resourceId, multiplier = 1 }: Props) => {
  const { townId } = useParams<{ townId: string }>();
  const resource = useMemoSelector((state) => selectResource(state, townId, resourceId));
  const amount = baseUnits[unitId].cost.resources.id[resourceId]?.amount ?? 0;
  const cost = amount * multiplier;
  // todo this might be broken
  return (
    <div className={`${resource < cost ? `${Style.dangerText}` : ""}`}>{cost.toFixed(0)}</div>
  );
};

export const SingleUnitResource = ({ unitId, resourceId, multiplier = 1 }: Props): JSX.Element => (
  <div className={Style.container}>
    <img src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} alt="" />
    <ResouceAmount unitId={unitId} resourceId={resourceId} multiplier={multiplier} />
  </div>
);
