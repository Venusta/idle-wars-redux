import React from 'react'
import './style.css';
import { BuildingTableRow } from './BuildingTableRow';
import { selectBuildings } from '../../selectors';
import { RootState } from "../../store";
import { useSelector } from 'react-redux';
import { BuildingList } from '../../../types/types';


export const Headquarters = ({ townId = "0" }) => {
  const buildings: BuildingList = useSelector((state: RootState) => selectBuildings(state, townId))

  const renderRows = () => {
    return Object.values(buildings).map(({ buildingId, level, queuedLevel }) => (
      <BuildingTableRow
        key={buildingId}
        level={level}
        queuedLevel={queuedLevel}
        buildingId={buildingId}
        townId={townId}
      />
    ));
  }

  const Header = () => {
    return (
      <thead>
        <tr>
          <th style={{ width: "23%" }}>Buildings</th>
          <th colSpan={5}>Requirements</th>
          <th style={{ width: "30%" }}>Construct</th>
        </tr>
      </thead>
    )
  }

  return (
    <div className="tableHeaderColour">
      <table>
        <Header />
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  )
};
