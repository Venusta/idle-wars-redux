import Style from "./style.module.css"

import React from 'react'

const Barracks = () => {
  return (
    <div className={Style.outer}>

    <div className={Style.wrapper}>
      <div className={Style.columnHeader}>Unit</div>
      <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
      <div className={Style.columnHeader}>In the village/total</div>
      <div className={Style.columnHeader}>Recruit</div>
      {/* {baseBuildings[hqId].creates.map((id, index) => <BuildingRow key={id + index} buildingId={id} />)} */}
    </div>
    </div>
  )
}

export default Barracks
