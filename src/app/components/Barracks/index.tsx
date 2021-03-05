/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BuildingId, UnitId, ResourceId } from "../../game/constants";
import { baseBuildings } from "../../game/buildings";
import { baseUnits } from "../../game/units";

import Style from "./style.module.css";
import { UnitResourceDisplay as UnitResourceDisplayCell } from "./UnitResourceDisplay";
import { RootState, useAppDispatch } from "../../store";
import { selectResources, selectRecruitForm, selectRecruitForms } from "../../selectors";
import { setUnitFormData, RecruitForm } from "../../slices/misc";
import { Resources } from "../../../types/types";

interface UnitRowProps {
  unitId: UnitId
}
interface UnitColumnProps {
  unitId: UnitId
}

// TODO make the div a link to show info of the unit
const UnitColumnCell = ({ unitId }: UnitColumnProps) => (
  <div className={Style.unitColumn}>
    <img src={`${process.env.PUBLIC_URL}/units/${unitId}.png`} alt="" />
    <div className={Style.unitColumnName}>{baseUnits[unitId].name}</div>
  </div>
);
const RecruitAmount = ({ unitId }: { unitId: UnitId }) => {
  const { townId } = useParams<{ townId: string }>();
  const resources = useSelector((state: RootState) => selectResources(state, townId));
  const allFormData = useSelector((state: RootState) => selectRecruitForms(state));

  const canRecruitAmount = (formData: RecruitForm, townResources: Resources) => {
    type IndexMap = Map<ResourceId, number>; // maybe store this on the state?
    const townResourceIndexs: IndexMap = new Map([]);
    townResources.forEach(([id], index) => {
      townResourceIndexs.set(id, index);
    });

    const howManyWeCanMake: ([UnitId, number] | undefined)[] = Object.values(formData).map((data) => {
      if (data !== undefined) {
        const [id, amountOfUnits] = data;
        const unitResourceCost = baseUnits[id].cost.resources;

        const minUnitArray = unitResourceCost.map(([unitCostResId, unitCostResAmount]) => {
          // get the index of that resource
          const resourceIndex = townResourceIndexs.get(unitCostResId);
          // check if the resource exists on the town
          if (resourceIndex !== undefined) {
            const multiplied = unitCostResAmount * amountOfUnits;
            const remainder = townResources[resourceIndex][1] - multiplied;

            // check we have enough in the town
            if (remainder > 0) {
              const makeWithX = Math.floor(remainder / unitCostResAmount);
              return makeWithX;
            }
            // console.log(`Not enough resources for: ${id}`);
            return 0;
          }
          // console.error("Resource not found on town state");
          return 0;
        });
        return [id, Math.min(...minUnitArray)];
      }
      return undefined;
    });
    return howManyWeCanMake;
  };

  const x = canRecruitAmount(allFormData, resources);

  return (
    <div className={Style.RecruitLabel}>{`(${x ? x[0] : "0"})`}</div>
  );
};

interface PropsIn {
  unitId: UnitId
}

const InputForm = ({ unitId }: PropsIn) => {
  const dispatch = useAppDispatch();
  const formData = useSelector((state: RootState) => selectRecruitForm(state, unitId));
  const allFormData = useSelector((state: RootState) => selectRecruitForms(state)); // TODO try not have this here

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(allFormData);
    // dispatch(queueUnits(allFormData))
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length === 0) {
      dispatch(setUnitFormData({ unitId, amount: undefined }));
    }
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    if (value.match(/^\d+$/)) {
      if (parseInt(value, 10) <= 100000) dispatch(setUnitFormData({ unitId, amount: parseInt(value, 10) }));
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input id={unitId} type="text" value={formData === undefined ? "" : formData[1]} onChange={(e) => handleChange(e)} />
    </form>
  );
};

// TODO do the input box, lift state up? then pass down to recruit amount
const RecruitColumnCell = ({ unitId }: { unitId: UnitId }) => (
  <div className={Style.RecruitColumn}>
    <InputForm unitId={unitId} />
    <RecruitAmount unitId={unitId} />
  </div>
);
  // todo own file
const UnitRow = ({ unitId }: UnitRowProps) => (
  <>
    <UnitColumnCell unitId={unitId} />
    <UnitResourceDisplayCell unitId={unitId} />
    <div className={Style.infoColumn}>10/300</div>
    <RecruitColumnCell unitId={unitId} />
  </>
);

// TODO only show unlocked .filter
export const Barracks = (): JSX.Element => (
  <div className={Style.outer}>
    <div className={Style.wrapper}>
      <div className={Style.columnHeader}>Unit</div>
      <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
      <div className={Style.columnHeader}>Village / Total</div>
      <div className={Style.columnHeader}>Recruit</div>
      {baseBuildings[BuildingId.Barracks].creates.map((id, index) => <UnitRow key={`${id}${index}`} unitId={id} />)}
      <div className={Style.buttonRow}>Recruit button</div>
    </div>
  </div>
);
