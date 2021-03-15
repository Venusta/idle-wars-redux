import { ResourceId, BuildingId, UnitIdGathererType } from "../../../game/constants";
import { SingleUnitResource } from "./SingleUnitResource";
import { SingleUnitPop } from "./SingleUnitPop";
import { SingleUnitTime } from "./SingleUnitTime";

interface Props {
  unitId: UnitIdGathererType
}

export const UnitResourceDisplay = ({ unitId }: Props): JSX.Element => {
  // const { amount } = useSelector((state: RootState) => selectRecruitForm(state, unitId)) ?? { id: unitId, amount: 1 };
  const amount = 1;
  // todo loop over cost for each resource if we have new
  // todo maybe return as div
  return (
    <>
      <SingleUnitResource multiplier={amount} resourceId={ResourceId.Timber} unitId={unitId} />
      <SingleUnitResource multiplier={amount} resourceId={ResourceId.Clay} unitId={unitId} />
      <SingleUnitResource multiplier={amount} resourceId={ResourceId.Iron} unitId={unitId} />
      <SingleUnitPop multiplier={amount} unitId={unitId} />
      <SingleUnitTime buildingId={BuildingId.Barracks} multiplier={amount} unitId={unitId} />
    </>
  );
};
