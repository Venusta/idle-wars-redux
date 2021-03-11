/* eslint-disable react/no-array-index-key */
import { useParams } from "react-router-dom";
import { batch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import React, { useMemo } from "react";
import {
  BuildingId, ResourceIdType, UnitIdProductionType, UnitIdType, UnitProductionBuildingIdType,
} from "../../game/constants";
import { baseBuildings } from "../../game/buildings";
import { baseUnits } from "../../game/units";
import { UnitResourceDisplay as UnitResourceDisplayCell } from "./UnitResourceDisplay";
import { RootState, useAppDispatch } from "../../store";
import {
  selectResources, selectRecruitForm, selectRecruitForms, selectUnlockedUnits,
} from "../../selectors";
import { setUnitFormData, RecruitForms } from "../../slices/misc";
import { startRecruitSomething } from "../../slices/towns";
import { ResourcesNormalised } from "../../../types/townStateTypes";
import Style from "./style.module.css";
import { ConstructButton } from "../Buttons";
import { makeSelectUnitAmounts } from "../../selectors/selectUnitAmounts";
import { useMemoSelector } from "../hooks";

interface UnitRowProps {
  unitId: UnitIdProductionType
}
interface UnitColumnProps {
  unitId: UnitIdProductionType
}

// TODO make the div a link to show info of the unit
const UnitColumnCell = ({ unitId }: UnitColumnProps) => (
  <div className={Style.unitColumn}>
    <img src={`${process.env.PUBLIC_URL}/units/${unitId}.png`} alt="" />
    <div className={Style.unitColumnName}>{baseUnits[unitId].name}</div>
  </div>
);

const RecruitAmount = ({ unitId }: { unitId: UnitIdProductionType }) => {
  const { townId } = useParams<{ townId: string }>();
  const resources = useMemoSelector((state) => selectResources(state, townId));
  const barracksFormData = useMemoSelector((state) => selectRecruitForms(state, BuildingId.Barracks));
  const unlockedUnits = useMemoSelector((state) => selectUnlockedUnits(state, townId, BuildingId.Barracks));

  // const canRecruitAmount = (formData: RecruitFormOld, townResources: ResourcesNormalised) => {
  //   interface SingleUnitData {
  //     id: UnitIdProductionType;
  //     amount: number;
  //   }
  //   type UnitsData = {
  //     [id in UnitIdProductionType]?: SingleUnitData;
  //   };

  //   type ResMap = Map<ResourceIdType, number>;
  //   const remainder: ResMap = new Map([]);

  //   // ?? todo fix this fucking method for the 9th time zzzzzzzzzzzzz
  //   // eslint-disable-next-line @typescript-eslint/no-shadow
  //   const howManyWeCanMake: UnitsData = unlockedUnits.reduce((prev: UnitsData, unitId) => {
  //     const data = formData[unitId];

  //     const [id, amountOfUnits] = data ?? [unitId, 0];
  //     const unitResourceCost = baseUnits[id].cost.resources;

  //     const minUnitArray = unitResourceCost.all.map((unitCostResId) => {
  //       const unitCostResAmount = unitResourceCost.id[unitCostResId]?.amount ?? 0;

  //       const multiplied = unitCostResAmount * amountOfUnits;
  //       remainder.set(unitCostResId, ((remainder.get(unitCostResId) ?? 0) - multiplied));
  //       // console.log(remainder);

  //       // check we have enough in the town
  //       const spareResAmount = (townResources.id[unitCostResId]?.amount ?? 0) + (remainder.get(unitCostResId) ?? 0);
  //       // console.log(spareResAmount);

  //       if (spareResAmount > 0) {
  //         const makeWithX = Math.floor(spareResAmount / unitCostResAmount);
  //         return makeWithX;
  //       }
  //       return 0;
  //     });
  //     // console.log(`${unitId}: ${Math.min(...minUnitArray)}`);

  //     return {
  //       ...prev,
  //       [id]: {
  //         id,
  //         amount: Math.min(...minUnitArray),
  //       },
  //     };
  //   }, {});

  //   return howManyWeCanMake;
  // };

  // const x = canRecruitAmount(allFormData, resources);
  // console.log(x);

  return (
    // <div className={Style.RecruitLabel}>{`(${(x[unitId]?.amount ?? 0)})`}</div>
    <div className={Style.RecruitLabel}>Fix me V3</div>
  );
};

interface PropsIn {
  unitId: UnitIdProductionType
}

const InputForm = ({ unitId }: PropsIn) => {
  const dispatch = useAppDispatch();
  const formData = useMemoSelector((state) => selectRecruitForm(state, BuildingId.Barracks, unitId));
  const allFormData = useMemoSelector((state) => selectRecruitForms(state, BuildingId.Barracks)); // TODO try not have this here

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(allFormData);
    // dispatch(queueUnits(allFormData))
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length === 0) {
      dispatch(setUnitFormData({ buildingId: BuildingId.Barracks, unitId, amount: undefined }));
    }
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    if (value.match(/^\d+$/)) {
      if (parseInt(value, 10) <= 100000) dispatch(setUnitFormData({ buildingId: BuildingId.Barracks, unitId, amount: parseInt(value, 10) }));
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input id={unitId} type="text" value={formData === undefined ? "" : formData.amount} onChange={(e) => handleChange(e)} />
    </form>
  );
};

// TODO do the input box, lift state up? then pass down to recruit amount
const RecruitColumnCell = ({ unitId }: { unitId: UnitIdProductionType }) => (
  <div className={Style.RecruitColumn}>
    <InputForm unitId={unitId} />
    <RecruitAmount unitId={unitId} />
  </div>
);

const UnitAmountsCell = ({ unitId }: { unitId: UnitIdType }): JSX.Element => {
  console.log("UnitAmountsCell Rendered");
  const { townId } = useParams<{ townId: string }>();
  const select = useMemo(makeSelectUnitAmounts, []);
  const { town, total } = useSelector((state: RootState) => select(state, townId, unitId));
  return (
    <div className={Style.infoColumn}>{`${town}/${total}`}</div>
  );
};

// todo own file
const UnitRow = ({ unitId }: UnitRowProps) => (
  <>
    <UnitColumnCell unitId={unitId} />
    <UnitResourceDisplayCell unitId={unitId} />
    <UnitAmountsCell unitId={unitId} />
    <RecruitColumnCell unitId={unitId} />
  </>
);

const queueUnits = (dispatch: Dispatch<AnyAction>, townId: string, formData: RecruitForms) => {
  // TODO SELECT FORM FOR ONE TYPE OF BUILDING, DISPATCH THAT ENTIRE FORM //capslock
  // looping all buildings here will create a bug
  /* dispatch(startRecruitSomething({
    townId, formData[barracks]
  })) */
  batch(() => {
    // formData.all.forEach((buildingId) => {
    Object.values(formData.id[BuildingId.Barracks]).forEach((RecruitFormUnitData) => {
      const data = RecruitFormUnitData;
      if (data !== undefined) {
        const { unitId, amount } = data;
        console.log(`Queueing ${amount} of ${unitId}`);
        // dispatch(startRecruitSomething({ townId, queueBuildingId: BuildingId.Barracks }));
      }
      // TODO un hard code from barrcks when we have an easy way to figure out where a unit is trained
      // });
    });
  });
};

// TODO only show unlocked .filter
export const Barracks = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { townId } = useParams<{ townId: string }>();
  const formData = useMemoSelector((state) => selectRecruitForms(state, BuildingId.Barracks)); // TODO try not have this here, should make component for button and do it in there i guess
  return (
    <div className={Style.outer}>
      <div className={Style.wrapper}>
        <div className={Style.columnHeader}>Unit</div>
        <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
        <div className={Style.columnHeader}>Village / Total</div>
        <div className={Style.columnHeader}>Recruit</div>
        {baseBuildings[BuildingId.Barracks].creates.map((id, index) => <UnitRow key={`${id}${index}`} unitId={id} />)}
        <ConstructButton
          text="Recruit"
          handleClick={() => dispatch(startRecruitSomething({ townId, queueBuildingId: BuildingId.Barracks, formData }))}

        />
      </div>
    </div>
  );
};
