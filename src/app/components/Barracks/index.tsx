/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import {
  BuildingId, UnitIdProductionType, UnitIdType,
} from "../../game/constants";
import { baseBuildings } from "../../game/buildings";
import { baseUnits } from "../../game/units";
import { UnitResourceDisplay as UnitResourceDisplayCell } from "./UnitResourceDisplay";
import { RootState, useAppDispatch } from "../../store";
import {
  selectResources, selectRecruitForm, selectRecruitFormsDataBuilding,
} from "../../selectors";
import { FormsRecruitUnitData, setUnitFormData } from "../../slices/misc";
import { RecruitFormQueueData, startRecruitSomething } from "../../slices/towns";
import Style from "./style.module.css";
import { ConstructButton } from "../Buttons";
import { makeSelectUnitAmounts } from "../../selectors/selectUnitAmounts";
import { useCurrentpage, useStateSelector } from "../hooks";
import { addPartialResources, multiplyResources, subResourcesFromTown } from "../../util";
import { ResourcesNormalised } from "../../../types/townStateTypes";

interface UnitRowProps {
  unitId: UnitIdProductionType
}
interface UnitColumnProps {
  unitId: UnitIdProductionType
}

// TODO make the div a link to show info of the unit
const UnitColumnCell = ({ unitId }: UnitColumnProps) => (
  <div className={Style.unitColumn}>
    <img alt="" src={`${process.env.PUBLIC_URL}/units/${unitId}.png`} />
    <div className={Style.unitColumnName}>{baseUnits[unitId].name}</div>
  </div>
);

const calculateTotalCost = (formData: FormsRecruitUnitData[]) => {
  return formData.reduce((accumulatedCost: ResourcesNormalised, { unitId, amount }) => {
    const unitResourceCost = multiplyResources(baseUnits[unitId].cost.resources, amount);
    return addPartialResources(accumulatedCost, [unitResourceCost]);
  }, {
    id: {},
    all: [],
  });
};

const calculateMaxAdditionalRecruits = (unitId: UnitIdProductionType, resources: ResourcesNormalised): number => {
  const unitResourceCost = baseUnits[unitId].cost.resources;
  const maxRecruitAmount: number = Object.values(resources.id).reduce((maxAmount, resource) => {
    if (resource !== undefined) {
      const unitCost = unitResourceCost.id[resource.id];
      if (unitCost !== undefined) {
        return Math.min(maxAmount, Math.floor(resource.amount / unitCost.amount));
      }
    }
    return 0;
  }, Infinity);
  return maxRecruitAmount;
};

const RecruitAmount = ({ unitId }: { unitId: UnitIdProductionType }) => {
  const dispatch = useAppDispatch();
  const { townId } = useParams<{ townId: string }>();

  const barracksFormData = useSelector((state: RootState) => selectRecruitFormsDataBuilding(state, BuildingId.Barracks));
  const resources = useSelector((state: RootState) => selectResources(state, townId));

  const totalCost = calculateTotalCost(barracksFormData);
  const remainingResources = subResourcesFromTown(resources, totalCost);

  const maxAdditionalAmount = calculateMaxAdditionalRecruits(unitId, remainingResources);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (maxAdditionalAmount === 0) {
      dispatch(setUnitFormData({ unitId, amount: undefined }));
    } else {
      const newFormAmount = (barracksFormData.find(({ unitId: id }) => id === unitId)?.amount ?? 0) + maxAdditionalAmount;
      dispatch(setUnitFormData({ unitId, amount: newFormAmount }));
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={Style.RecruitLabel} onClick={(e) => handleClick(e)} role="button" tabIndex={0}>{`(${maxAdditionalAmount})`}</div>
  );
};

interface PropsIn {
  unitId: UnitIdProductionType
}

const InputForm = ({ unitId }: PropsIn) => {
  const dispatch = useAppDispatch();
  const formData = useStateSelector((state) => selectRecruitForm(state, unitId));
  const allFormData = useStateSelector((state) => selectRecruitFormsDataBuilding(state, BuildingId.Barracks)); // TODO try not have this here

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
      <input id={unitId} onChange={(e) => handleChange(e)} type="text" value={formData === undefined ? "" : formData.amount} />
    </form>
  );
};

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
  const { home, total } = useSelector((state: RootState) => select(state, townId, unitId));
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
  const formData = useStateSelector((state) => selectRecruitFormsDataBuilding(state, BuildingId.Barracks));

  // todo maybe make the selector return this format
  const data: RecruitFormQueueData[] = [{
    queueBuildingId: BuildingId.Barracks,
    formData,
  }];

  return (
    <ConstructButton
      handleClick={() => dispatch(startRecruitSomething({ townId, data }))}
      text="Recruit"
    />
  );
};

// TODO only show unlocked .filter

export const Barracks = (): JSX.Element => {
  useCurrentpage("barracks");
  return (
    <div className={Style.outer}>
      <div className={Style.wrapper}>
        <div className={Style.columnHeader}>Unit</div>
        <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
        <div className={Style.columnHeader}>Village / Total</div>
        <div className={Style.columnHeader}>Recruit</div>
        {baseBuildings[BuildingId.Barracks].creates.map((id, index) => <UnitRow key={`${id}${index}`} unitId={id} />)}
        <RecruitAllButton />
      </div>
    </div>
  );
};
