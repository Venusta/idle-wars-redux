import React from 'react'
import './style.css';
import { BuildingTableRow } from './BuildingTableRow';
import { selectBuildings } from '../../selectors';
import { RootState } from "../../store";
import { useSelector } from 'react-redux';
import { Building } from '../../../types/types';


export const BuildingTable = ({ townId = 0 }) => {
  const buildings: Building[] = useSelector((state: RootState) => selectBuildings(state, townId))

  const renderRows = () => {
    return buildings.map(({ buildingType, level }) => (
      <BuildingTableRow
        key={buildingType}
        level={level}
        buildingId={buildingType}
        townId={townId}
      />
    ));
  }

  return (
    <div>
      <table className="Buildings">
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
