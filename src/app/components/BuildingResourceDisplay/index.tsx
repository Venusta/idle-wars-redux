/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import "./style.css";

interface Props {
  timber: number
  clay: number
  iron: number
  pop: number
  time: string
}

export const BuildingRequirements = (/*{ timber, clay, iron, pop, time} : Props*/) => {
  const timber = 50;
  const clay = 30;
  const iron = 10;
  const pop = 1;
  const time = "0:03:22"

  // todo move
  const SingleBuildingRequirements = ({ data, imgId }: { data: string | number, imgId: string }) => {
    return (
      <div className="brd-group">
        <img src={`${process.env.PUBLIC_URL}/resources/${imgId}.png`} />
        <div className="brd-display">{data}</div>
      </div>
    )
  } 

  return (
    <div className="brd-flex-container">
      <SingleBuildingRequirements data={timber} imgId="0"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={clay} imgId="1"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={iron} imgId="2"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={pop} imgId="2"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={time} imgId="2"></SingleBuildingRequirements>
    </div>
  )
}
