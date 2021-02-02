import React from 'react'
import './style.css';
import { BuildingTableRow } from './BuildingTableRow';
import { selectBuildings } from '../../selectors';
import { RootState } from "../../store";
import { useSelector } from 'react-redux';
import { BuildingList } from '../../../types/types';


export const BuildingTable = ({ townId = "0" }) => {
  const buildings: BuildingList = useSelector((state: RootState) => selectBuildings(state, townId))

  const renderRows = () => {
    return Object.values(buildings).map(({ buildingId, level, queuedLevel }) => (
      <BuildingTableRow
        key={buildingId}
        actualLevel={level}
        queuedLevel={queuedLevel}
        buildingId={buildingId}
        townId={townId}
      />
    ));
  }

  return (
    <div className="tableHeaderColour">
      <table className="test">
        <tbody>
          <tr>
            <th style={{ width: "23%" }}>Buildings</th>
            <th colSpan={5}>Requirements</th>
            <th style={{ width: "30%" }}>Construct</th>
          </tr>
          {renderRows()}
        </tbody>
      </table>
    </div>
  )
};
