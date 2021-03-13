import { useSelector } from "react-redux";
import { ResourceId, BuildingId, UnitIdProductionType } from "../../../game/constants";
import { SingleUnitResource } from "./SingleUnitResource";
import { SingleUnitPop } from "./SingleUnitPop";
import { SingleUnitTime } from "./SingleUnitTime";
import { selectRecruitForm } from "../../../selectors";
import { RootState } from "../../../store";
import Style from "./style.module.css";

interface Props {
  unitId: UnitIdProductionType
}

export const UnitResourceDisplay = ({ unitId }: Props): JSX.Element => {
  const { amount } = useSelector((state: RootState) => selectRecruitForm(state, unitId)) ?? { id: unitId, amount: 1 };
  // todo loop over cost for each resource if we have new
  // todo maybe return as div
  return (
    <>
      <SingleUnitResource unitId={unitId} multiplier={amount} resourceId={ResourceId.Timber} />
      <SingleUnitResource unitId={unitId} multiplier={amount} resourceId={ResourceId.Clay} />
      <SingleUnitResource unitId={unitId} multiplier={amount} resourceId={ResourceId.Iron} />
      <SingleUnitPop unitId={unitId} multiplier={amount} />
      <SingleUnitTime unitId={unitId} multiplier={amount} buildingId={BuildingId.Barracks} />
    </>
  );
};
