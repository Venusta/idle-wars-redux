/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { selectTown } from "../../selectors"
import './style.css';
import { baseBuildings } from '../../game/buildings';
import { BuildingId } from '../../game/constants';
import { useParams } from 'react-router-dom';

export const ResourceDisplay = () => {
  const { townId } = useParams<{ townId: string }>();

  const town = useSelector((state: RootState) => selectTown(state, townId))
  const { timber, clay, iron } = town.resources;
  const { population, maxPopulation, storageCapacity } = town;

  const timberPerSecond = baseBuildings[BuildingId.TimberCamp].getResourceGeneration(town.buildings.timbercamp.level);
  const clayPerSecond = baseBuildings[BuildingId.ClayPit].getResourceGeneration(town.buildings.claypit.level);
  const ironPerSecond = baseBuildings[BuildingId.IronMine].getResourceGeneration(town.buildings.ironmine.level);

  const ResourceDisplay = () => {
    return (
      <div className="res-display-wrapper">
        <div className="res-display-inner">
          <img className="icon" src={`${process.env.PUBLIC_URL}/resources/timber.png`} />
          <div className="res-display-text">{`${(timber).toFixed(0)} (${timberPerSecond.toFixed(2)}/s)`}</div>
        </div>
        <div className="res-display-inner">
          <img className="res-display-icon" src={`${process.env.PUBLIC_URL}/resources/clay.png`} />
          <div className="res-display-text">{`${(clay).toFixed(0)} (${clayPerSecond.toFixed(2)}/s)`}</div>
        </div>
        <div className="res-display-inner">
          <img className="icon" src={`${process.env.PUBLIC_URL}/resources/iron.png`} />
          <div className="res-display-text">{`${(iron).toFixed(0)} (${ironPerSecond.toFixed(2)}/s)`}</div>
        </div>
        <div className="res-display-inner">
          <div className="res-display-text">{storageCapacity}</div>
        </div>
        <div className="res-display-inner">
          <div className="res-display-text">{`${population}/${maxPopulation}`}</div>
        </div>
      </div>
    )
  }

  return (
    <ResourceDisplay />
  )
}
