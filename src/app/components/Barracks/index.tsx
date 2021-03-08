/* eslint-disable react/no-array-index-key */
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BuildingId, ResourceId, UnitId } from "../../game/constants";
import { baseBuildings } from "../../game/buildings";
import { baseUnits } from "../../game/units";
import { UnitResourceDisplay as UnitResourceDisplayCell } from "./UnitResourceDisplay";
import { RootState, useAppDispatch } from "../../store";
import {
  selectResources, selectRecruitForm, selectRecruitForms, selectUnlockedUnits,
} from "../../selectors";
import { setUnitFormData, RecruitForm } from "../../slices/misc";
import { ResourcesNormalised } from "../../../types/townStateTypes";
import Style from "./style.module.css";

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
  const unlockedUnits = useSelector((state: RootState) => selectUnlockedUnits(state, townId, BuildingId.Barracks));

  const canRecruitAmount = (formData: RecruitForm, townResources: ResourcesNormalised) => {
    interface SingleUnitData {
      id: UnitId;
      amount: number;
    }
    type UnitsData = {
      [id in UnitId]?: SingleUnitData;
    };

    type ResMap = Map<ResourceId, number>;
    const remainder: ResMap = new Map([]);

    // ?? todo fix this fucking method for the 9th time zzzzzzzzzzzzz
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const howManyWeCanMake: UnitsData = unlockedUnits.reduce((prev: UnitsData, unitId) => {
      const data = formData[unitId];

      const [id, amountOfUnits] = data ?? [unitId, 0];
      const unitResourceCost = baseUnits[id].cost.resources;

      const minUnitArray = unitResourceCost.all.map((unitCostResId) => {
        const unitCostResAmount = unitResourceCost.id[unitCostResId]?.amount ?? 0;

        const multiplied = unitCostResAmount * amountOfUnits;
        remainder.set(unitCostResId, ((remainder.get(unitCostResId) ?? 0) - multiplied));
        // console.log(remainder);

        // check we have enough in the town
        const spareResAmount = (townResources.id[unitCostResId]?.amount ?? 0) + (remainder.get(unitCostResId) ?? 0);
        // console.log(spareResAmount);

        if (spareResAmount > 0) {
          const makeWithX = Math.floor(spareResAmount / unitCostResAmount);
          return makeWithX;
        }
        return 0;
      });
      // console.log(`${unitId}: ${Math.min(...minUnitArray)}`);

      return {
        ...prev,
        [id]: {
          id,
          amount: Math.min(...minUnitArray),
        },
      };
    }, {});

    return howManyWeCanMake;
  };

  const x = canRecruitAmount(allFormData, resources);
  // console.log(x);

  return (
    // <div className={Style.RecruitLabel}>{`(${(x[unitId]?.amount ?? 0)})`}</div>
    <div className={Style.RecruitLabel}>Fix me V3</div>
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
