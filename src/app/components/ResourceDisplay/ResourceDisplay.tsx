/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { selectTown } from "../../selectors"
import './style.css';
import { baseBuildings } from '../../game/buildings';
import { BuildingId } from '../../game/constants';

export const ResourceDisplay = () => {
  const townId = "0" // TODO don't hardcode
  const town = useSelector((state: RootState) => selectTown(state, townId))
  const { timber, clay, iron } = town.resources;
  const { population, maxPopulation, storageCapacity } = town;

  const timberPerSecond = baseBuildings[BuildingId.TimberCamp].getResourceGeneration(town.buildings.timbercamp.level);
  const clayPerSecond = baseBuildings[BuildingId.ClayPit].getResourceGeneration(town.buildings.claypit.level);
  const ironPerSecond = baseBuildings[BuildingId.IronMine].getResourceGeneration(town.buildings.ironmine.level); 

  const ResDisplay1 = () => {
    return (
      <table>
        <tbody>
          <tr>
            <img src={`${process.env.PUBLIC_URL}/resources/timber.png`} />
            <td>{timber}</td>
            <img src={`${process.env.PUBLIC_URL}/resources/clay.png`} />
            <td>{clay}</td>
            <img src={`${process.env.PUBLIC_URL}/resources/iron.png`} />
            <td>{iron}</td>
            <td>{storageCapacity}</td>
            <td>{`${population}/${maxPopulation}`}</td>
          </tr>
        </tbody>
      </table>
    )
  };

  const ResDisplay2 = () => {    
    return (
      <div className="flex-container">
        <div className="wrapper">
          <div className="inner">
            <img className="icon" src={`${process.env.PUBLIC_URL}/resources/timber.png`} />
            <div className="display">{`${(timber).toFixed(0)} (${timberPerSecond.toFixed(2)}/s)`}</div>
          </div>
          <div className="inner">
            <img className="icon" src={`${process.env.PUBLIC_URL}/resources/clay.png`} />
            <div className="display">{`${(clay).toFixed(0)} (${clayPerSecond.toFixed(2)}/s)`}</div>
          </div>
          <div className="inner">
            <img className="icon" src={`${process.env.PUBLIC_URL}/resources/iron.png`} />
            <div className="display">{`${(iron).toFixed(0)} (${ironPerSecond.toFixed(2)}/s)`}</div>
          </div>
          <div className="inner">
            <div className="display">{storageCapacity}</div>
          </div>
          <div className="inner-end">
            <div className="display">{`${population}/${maxPopulation}`}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ResDisplay2 />
    </div>
  )
}
