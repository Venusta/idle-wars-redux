import React from 'react'
import { useSelector } from 'react-redux'
import { Resources } from '../../../types/types'
import { selectPopulation } from '../../selectors/selectPopulation';
import { selectResources } from '../../selectors/selectResources'
import { RootState } from '../../store';

export const ResourceDisplay = () => {
  const { timber, clay, iron, }: Resources = useSelector((state: RootState) => selectResources(state, 0))
  //  storageCapacity, population, maxPopulation
  const population: number = useSelector((state: RootState) => selectPopulation(state, 0))
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
