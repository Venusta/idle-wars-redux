import { BuildingId, UnitId, ResourceId } from "../../game/constants"
import { baseBuildings } from "../../game/buildings"
import { baseUnits } from "../../game/units"

import Style from "./style.module.css"
import { UnitResourceDisplay as UnitResourceDisplayCell } from './UnitResourceDisplay'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { selectResources, selectRecruitForm, selectRecruitForms } from '../../selectors'
import { setUnitFormData, RecruitForm } from '../../slices/misc'
import { Resources } from '../../../types/types'
import { isUnitId } from '../../game/utility'

interface UnitRowProps {
  unitId: UnitId
}
interface UnitColumnProps {
  unitId: UnitId
}

const UnitColumnCell = ({ unitId }: UnitColumnProps) => {
  // make the div a link to show info of the unit
  return (
    <div className={Style.unitColumn}>
      <img src={`${process.env.PUBLIC_URL}/units/${unitId}.png`} alt="" />
      <div className={Style.unitColumnName}>{baseUnits[unitId].name}</div>
    </div>
  )
};

const RecruitAmount = ({ unitId }: { unitId: UnitId }) => {
  const { townId } = useParams<{ townId: string }>();
  const resources = useSelector((state: RootState) => selectResources(state, townId));
  const allFormData = useSelector((state: RootState) => selectRecruitForms(state));

  // console.log("_____________________");

  // console.log(allFormData);


  const calcRemainingResources = (formData: RecruitForm, townResources: Resources): Resources => {

    const x = Object.entries(formData).map(([unitId, amount = 0]) => {
      if (isUnitId(unitId)) {
        const unitResourceCost: Resources = baseUnits[unitId].cost.resources;

        const res: Resources = Object.values(ResourceId).reduce((accum, resource) => {
          return {
            ...accum,
            [resource]: (unitResourceCost[resource] * amount)// + accum[resource]
          };
        }, {} as unknown as Resources); // todo YUCKKKKKKKKKKKKKKKKKKK

        const res2 = Object.values(ResourceId).reduce<Partial<Resources>>((accum, resource) => {
          return {
            ...accum,
            [resource]: (unitResourceCost[resource] * amount)// + accum[resource]
          };
        }, {});

        // console.log("Cost:, Amount: %s", amount);
        // console.log(unitResourceCost);
        // console.log("Total:");
        // console.log(res);
        // console.log(res2);

        return res;
      };
    });

    // console.log(x);


    const remainingResources = { //TODO fix this obj
      timber: 0,
      clay: 0,
      iron: 0
    }

    return remainingResources;
  }
  // const calcRemainingResources = (formData: RecruitForm, townResources: Resources): Resources => {
  //   const queuedResources: Resources = { timber: 0, clay: 0, iron: 0 }; //TODO fix this obj

  //   Object.entries(formData).forEach(([unitId, amount = 0]) => {
  //     if (isUnitId(unitId)) {
  //       const unitResourceCost = baseUnits[unitId].cost.resources;
  //       Object.values(ResourceId).forEach((resource) => {
  //         queuedResources[resource] += unitResourceCost[resource] * amount;
  //       });
  //     };
  //   });

  //   const remainingResources = { //TODO fix this obj
  //     timber: townResources[ResourceId.Timber] - queuedResources[ResourceId.Timber],
  //     clay: townResources[ResourceId.Clay] - queuedResources[ResourceId.Clay],
  //     iron: townResources[ResourceId.Iron] - queuedResources[ResourceId.Iron]
  //   }

  //   return remainingResources;
  // }

  const unitCost = baseUnits[unitId].cost;

  const remainingResources = calcRemainingResources(allFormData, resources);
  const canRecruitAmount = Math.min(...Object.values(ResourceId).map((resourceId) => {
    return Math.max(Math.floor(remainingResources[resourceId] / unitCost.resources[resourceId]), 0);
  }));

  return (
    <div className={Style.RecruitLabel}>{`(${canRecruitAmount})`}</div>
  )
}

interface PropsIn {
  unitId: UnitId
}

const InputForm = ({ unitId }: PropsIn) => {
  const dispatch = useAppDispatch()
  const formData = useSelector((state: RootState) => selectRecruitForm(state, unitId) ?? "")
  const allFormData = useSelector((state: RootState) => selectRecruitForms(state));


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(allFormData);
    // dispatch(queueUnits(allFormData))
    e.preventDefault();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      dispatch(setUnitFormData({ unitId, amount: undefined }))
    }
    if (value.match(/^\d+$/)) {
      if (parseInt(value, 10) <= 100000)
        dispatch(setUnitFormData({ unitId, amount: parseInt(value, 10) }))
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input id={unitId} type="text" value={formData} onChange={(e) => handleChange(e)} />
    </form>
  )
}

const RecruitColumnCell = ({ unitId }: { unitId: UnitId }) => {
  // TODO do the input box, lift state up? then pass down to recruit amount
  return (
    <div className={Style.RecruitColumn}>
      <InputForm unitId={unitId} />
      <RecruitAmount unitId={unitId} />
    </div>
  )
};

const UnitRow = ({ unitId }: UnitRowProps) => { // todo own file
  return (
    <>
      <UnitColumnCell unitId={unitId} />
      <UnitResourceDisplayCell unitId={unitId} />
      <div className={Style.infoColumn}>10/300</div>
      <RecruitColumnCell unitId={unitId} />
    </>
  )
}

export const Barracks = () => {
  // TODO only show unlocked .filter
  return (
    <div className={Style.outer}>
      <div className={Style.wrapper}>
        <div className={Style.columnHeader}>Unit</div>
        <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
        <div className={Style.columnHeader}>Village / Total</div>
        <div className={Style.columnHeader}>Recruit</div>
        {baseBuildings[BuildingId.Barracks].creates.map((id, index) => <UnitRow key={id + index} unitId={id} />)}
        <div className={Style.buttonRow}>Recruit button</div>
      </div>
    </div>
  )
}
