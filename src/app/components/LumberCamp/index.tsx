/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import {
  BuildingId, GathererId, UnitIdGathererType, UnitIdType,
} from "../../game/constants";
import { baseBuildings } from "../../game/buildings";
import { UnitResourceDisplay as UnitResourceDisplayCell } from "./UnitResourceDisplay";
import { RootState, useAppDispatch } from "../../store";
import {
  selectRecruitFormsDataBuilding, selectUnits,
} from "../../selectors";
import { RecruitFormQueueData, startRecruitSomething } from "../../slices/towns";
import Style from "./style.module.css";
import { ConstructButton } from "../Buttons";
import { makeSelectUnitAmounts } from "../../selectors/selectUnitAmounts";
import { useStateSelector } from "../hooks";
import { baseGatherers } from "../../game/units/gatherers";
import { FormsRecruitUnitData } from "../../slices/misc";

interface UnitRowProps {
  unitId: UnitIdGathererType
}
interface UnitColumnProps {
  unitId: UnitIdGathererType
}

// TODO make the div a link to show info of the unit
const UnitColumnCell = ({ unitId }: UnitColumnProps) => (
  <div className={Style.unitColumn}>
    <img alt="" src={`${process.env.PUBLIC_URL}/units/${unitId}.png`} />
    <div className={Style.unitColumnName}>{baseGatherers[unitId].name}</div>
  </div>
);

// const calculateTotalCost = (formData: FormsRecruitUnitData[]) => {
//   return formData.reduce((accumulatedCost: ResourcesNormalised, { unitId, amount }) => {
//     const unitResourceCost = multiplyResources(baseGatherers[unitId].cost.resources, amount);
//     return addPartialResources(accumulatedCost, [unitResourceCost]);
//   }, {
//     id: {},
//     all: [],
//   });
// };

// const calculateMaxAdditionalRecruits = (unitId: UnitIdGathererType, resources: ResourcesNormalised): number => {
//   const unitResourceCost = baseGatherers[unitId].cost.resources;
//   const maxRecruitAmount: number = Object.values(resources.id).reduce((maxAmount, resource) => {
//     if (resource !== undefined) {
//       const unitCost = unitResourceCost.id[resource.id];
//       if (unitCost !== undefined) {
//         return Math.min(maxAmount, Math.floor(resource.amount / unitCost.amount));
//       }
//     }
//     return 0;
//   }, Infinity);
//   return maxRecruitAmount;
// };

// const RecruitAmount = ({ unitId }: { unitId: UnitIdGathererType }) => {
//   const dispatch = useAppDispatch();
//   const { townId } = useParams<{ townId: string }>();

//   const barracksFormData = useSelector((state: RootState) => selectRecruitFormsDataBuilding(state, BuildingId.Barracks));
//   const resources = useSelector((state: RootState) => selectResources(state, townId));

//   const totalCost = calculateTotalCost(barracksFormData);
//   const remainingResources = subResourcesFromTown(resources, totalCost);

//   const maxAdditionalAmount = calculateMaxAdditionalRecruits(unitId, remainingResources);

//   // const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//   //   e.preventDefault();
//   //   if (maxAdditionalAmount === 0) {
//   //     dispatch(setUnitFormData({ unitId, amount: undefined }));
//   //   } else {
//   //     const newFormAmount = (barracksFormData.find(({ unitId: id }) => id === unitId)?.amount ?? 0) + maxAdditionalAmount;
//   //     dispatch(setUnitFormData({ unitId, amount: newFormAmount }));
//   //   }
//   // };

//   return (
//     // eslint-disable-next-line jsx-a11y/click-events-have-key-events
//     // <div className={Style.RecruitLabel} onClick={(e) => handleClick(e)} role="button" tabIndex={0}>{`(${maxAdditionalAmount})`}</div>
//     <div className={Style.RecruitLabel} role="button" tabIndex={0}>{`(${maxAdditionalAmount})`}</div>
//   );
// };

interface PropsIn {
  unitId: UnitIdGathererType
}

const InputForm = ({ unitId }: PropsIn) => {
  const dispatch = useAppDispatch();
  // const formData = useStateSelector((state) => selectRecruitForm(state, unitId));
  const allFormData = useStateSelector((state) => selectRecruitFormsDataBuilding(state, BuildingId.Barracks)); // TODO try not have this here

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(allFormData);
    // dispatch(queueUnits(allFormData))
    e.preventDefault();
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   if (value.length === 0) {
  //     dispatch(setUnitFormData({ unitId, amount: undefined }));
  //   }
  //   // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  //   if (value.match(/^\d+$/)) {
  //     if (parseInt(value, 10) <= 100000) dispatch(setUnitFormData({ unitId, amount: parseInt(value, 10) }));
  //   }
  // };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input id={unitId} type="text" value="Yeet" />
    </form>
  );
};

const RecruitColumnCell = ({ unitId }: { unitId: UnitIdGathererType }) => (
  <div className={Style.RecruitColumn}>
    <InputForm unitId={unitId} />
    {/* <RecruitAmount unitId={unitId} /> */}
  </div>
);

const UnitAmountsCell = ({ unitId }: { unitId: UnitIdGathererType }): JSX.Element => {
  console.log("UnitAmountsCell Rendered");
  const { townId } = useParams<{ townId: string }>();
  const lumberjack = useSelector((state: RootState) => state.towns.id[townId].gatherers.id.lumberjack);
  const { home, total } = lumberjack ?? { home: -3, total: -3 };
  return (
    <div className={Style.infoColumn}>{`${home}/${total}`}</div>
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

const RecruitAllButton = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { townId } = useParams<{ townId: string }>();
  // const formData = useStateSelector((state) => selectRecruitFormsDataBuilding(state, BuildingId.Barracks));
  const formData = [
    { unitId: GathererId.Lumberjack, amount: 1 },
  ];

  // todo maybe make the selector return this format
  // const data: RecruitFormQueueData[] = [{
  //   queueBuildingId: BuildingId.LumberCamp,
  //   formData,
  // }];

  return (
    <div>Ex-button</div>
    // <ConstructButton
    //   handleClick={() => dispatch(startRecruitSomething({ townId, data }))}
    //   text="Recruit"
    // />
  );
};

// TODO only show unlocked .filter

export const LumberCamp = (): JSX.Element => {
  return (
    <div className={Style.outer}>
      <div className={Style.wrapper}>
        <div className={Style.columnHeader}>Unit</div>
        <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
        <div className={Style.columnHeader}>Village / Total</div>
        <div className={Style.columnHeader}>Recruit</div>
        {baseBuildings[BuildingId.LumberCamp].creates.map((id, index) => <UnitRow key={`${id}${index}`} unitId={id} />)}
        <RecruitAllButton />
      </div>
    </div>
  );
};
