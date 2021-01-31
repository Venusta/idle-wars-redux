import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { selectTown } from "../../selectors"

export const ResourceDisplay = () => {
  const town = useSelector((state: RootState) => selectTown(state, 0))
  const { timber, clay, iron } = town.resources;
  const population = town.population;
  //  storageCapacity, population, maxPopulation
  // const population: number = useSelector((state: RootState) => selectPopulation(state, 0))

  return (
    <div>
      <table className="Buildings">
        <tbody>
          <tr>
            <td>{timber}</td>
            <td>{clay}</td>
            <td>{iron}</td>
            {/* <td>{storageCapacity}</td> */}
            <td>{`${population}/${500}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
