import React from 'react'
import { BuildingId, UnitId, ResourceId } from "../../game/constants"
import { baseBuildings } from "../../game/buildings"
import { baseUnits } from "../../game/units"

import Style from "./style.module.css"
import { UnitResourceDisplay } from './UnitResourceDisplay'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { selectResources } from '../../selectors'
import { Resource } from '../../game/resources/base/resource'

interface UnitRowProps {
  unitId: UnitId
}
interface UnitColumnProps {
  unitId: UnitId
}

const UnitColumn = ({ unitId }: UnitColumnProps) => {
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
  const unitCost = baseUnits[unitId].cost;

  const amount = Math.min(...Object.values(ResourceId).map((resourceId) => {
    return Math.floor(resources[resourceId] / unitCost.resources[resourceId])
  }));

  return (
    <div className={Style.RecruitLabel}>{`(${amount})`}</div>
  )
}

const RecruitColumn = ({ unitId }: { unitId: UnitId }) => {
  return (
    <div className={Style.RecruitColumn}>
      <div>inputbox</div>
      <RecruitAmount unitId={unitId} />
    </div>
  )
};

const UnitRow = ({ unitId }: UnitRowProps) => { // todo own file
  return (
    <>
      <UnitColumn unitId={unitId} />
      <UnitResourceDisplay unitId={unitId} />
      <div className={Style.infoColumn}>10/300</div>
      <RecruitColumn unitId={unitId} />
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
