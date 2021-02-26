import React from 'react'
import { BuildingId, UnitId } from "../../game/constants"
import { baseBuildings } from "../../game/buildings"
import { baseUnits } from "../../game/units"

import Style from "./style.module.css"
import { UnitResourceDisplay } from './UnitResourceDisplay'

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

const UnitRow = ({ unitId }: UnitRowProps) => { // todo own file
  return (
    <>
      <UnitColumn unitId={unitId} />
      <UnitResourceDisplay unitId={unitId} />
      <div className={Style.infoColumn}>10/300</div>
      <div>button</div>
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
        <div className={Style.columnHeader}>In the village/total</div>
        <div className={Style.columnHeader}>Recruit</div>
        {baseBuildings[BuildingId.Barracks].creates.map((id, index) => <UnitRow key={id + index} unitId={id} />)}
      </div>
    </div>
  )
}
