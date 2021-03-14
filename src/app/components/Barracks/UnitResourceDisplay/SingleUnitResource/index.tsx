import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ResourceIdType, UnitIdType } from "../../../../game/constants";
import { baseUnits } from "../../../../game/units";
import { RootState } from "../../../../store";
import { selectEnoughResource } from "../../../../selectors";
import Style from "./style.module.css";

interface Props {
  unitId: UnitIdType
  resourceId: ResourceIdType
  multiplier: number
}

const ResourceAmount = ({ unitId, resourceId, multiplier = 1 }: Props) => {
  const { townId } = useParams<{ townId: string }>();
  const amount = baseUnits[unitId].cost.resources.id[resourceId]?.amount ?? 0;
  const cost = amount * multiplier;

  const enoughResources = useSelector((state: RootState) => selectEnoughResource(state, townId, resourceId)(cost));

  return (
    <div className={`${enoughResources ? "" : `${Style.dangerText}`}`}>{cost.toFixed(0)}</div>
  );
};

export const SingleUnitResource = ({ unitId, resourceId, multiplier = 1 }: Props): JSX.Element => (
  <div className={Style.container}>
    <img alt="" src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} />
    <ResourceAmount multiplier={multiplier} resourceId={resourceId} unitId={unitId} />
  </div>
);
