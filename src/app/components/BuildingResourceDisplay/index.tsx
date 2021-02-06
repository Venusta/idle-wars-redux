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
  const amount = 10;
  const timber = 50 * amount;
  const clay = 30 * amount;
  const iron = 10 * amount;
  const pop = 1 * amount;
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
      <SingleBuildingRequirements data={timber} imgId="timber"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={clay} imgId="clay"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={iron} imgId="iron"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={pop} imgId="timber"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={time} imgId="timber"></SingleBuildingRequirements>
    </div>
  )
}
