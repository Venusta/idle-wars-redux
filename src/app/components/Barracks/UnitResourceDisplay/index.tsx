import { UnitId, ResourceId, BuildingId } from "../../../game/constants";
import { SingleUnitResource } from "./SingleUnitResource";
import { SingleUnitPop } from "./SingleUnitPop";
import { SingleUnitTime } from "./SingleUnitTime";
import Style from "./style.module.css";

interface Props {
  unitId: UnitId
}

export const UnitResourceDisplay = ({ unitId }: Props) => {
  const multiplier = 1; // how many to make
  // todo loop over cost for each resource if we have new
  // todo maybe return as div
  return (
    <>
      <SingleUnitResource unitId={unitId} multiplier={multiplier} resourceId={ResourceId.Timber} />
      <SingleUnitResource unitId={unitId} multiplier={multiplier} resourceId={ResourceId.Clay} />
      <SingleUnitResource unitId={unitId} multiplier={multiplier} resourceId={ResourceId.Iron} />
      <SingleUnitPop unitId={unitId} multiplier={multiplier} />
      <SingleUnitTime unitId={unitId} multiplier={multiplier} buildingId={BuildingId.Barracks} />
    </>
  );
};
