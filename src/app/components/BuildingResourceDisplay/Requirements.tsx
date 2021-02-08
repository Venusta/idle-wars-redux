/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import { baseBuildings } from "../../game/buildings";
import { BuildingId } from "../../game/constants";
import "./style.css";

interface Props {
  buildingId: BuildingId
}

export const BuildingResourceDisplay = ({ buildingId }: Props) => {
  const cost = baseBuildings[buildingId].getCost(20);
  const amount = 1;
  const timber = cost.resources.timber * amount;
  const clay = cost.resources.clay * amount;
  const iron = cost.resources.iron * amount;
  const pop = ((cost.population ?? 0) * amount);
  const time = "0:03:22" // convert seconds to timestamp

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
    <>
      <SingleBuildingRequirements data={timber.toFixed(0)} imgId="timber"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={clay.toFixed(0)} imgId="clay"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={iron.toFixed(0)} imgId="iron"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={pop.toFixed(0)} imgId="timber"></SingleBuildingRequirements>
      <SingleBuildingRequirements data={time} imgId="timber"></SingleBuildingRequirements>
    </>
  )
}
