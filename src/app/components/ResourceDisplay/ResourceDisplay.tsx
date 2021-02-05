/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { selectTown } from "../../selectors"
import './style.css';

export const ResourceDisplay = () => {
  const townId = "0" // TODO don't hardcode
  const town = useSelector((state: RootState) => selectTown(state, townId))
  const { timber, clay, iron } = town.resources;
  const { population, maxPopulation, storageCapacity } = town;

  const ResDisplay1 = () => {
    return (
      <table>
        <tbody>
          <tr>
            <img src={`${process.env.PUBLIC_URL}/resources/${0}.png`} />
            <td>{timber}</td>
            <img src={`${process.env.PUBLIC_URL}/resources/${1}.png`} />
            <td>{clay}</td>
            <img src={`${process.env.PUBLIC_URL}/resources/${2}.png`} />
            <td>{iron}</td>
            <td>{storageCapacity}</td>
            <td>{`${population}/${maxPopulation}`}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  const ResDisplay2 = () => {
    return (
      <div className="flex-container">
        <div className="wrapper">
          <div className="inner">
            <img className="icon" src={`${process.env.PUBLIC_URL}/resources/${0}.png`} />
            <div className="display">{`${timber} (50/s)`}</div>
          </div>
          <div className="inner">
            <img className="icon" src={`${process.env.PUBLIC_URL}/resources/${1}.png`} />
            <div className="display">{`${clay} (50/s)`}</div>
          </div>
          <div className="inner">
            <img className="icon" src={`${process.env.PUBLIC_URL}/resources/${2}.png`} />
            <div className="display">{`${iron} (50/s)`}</div>
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
