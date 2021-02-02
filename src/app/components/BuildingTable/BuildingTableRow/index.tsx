import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { buildings } from '../../../game/buildings';
import { BuildingId } from '../../../game/constants';
import { enqueue } from '../../../slices/queue';
import { removeResources, increasePopulation, incrementQueuedBuildingLevel } from "../../../slices/towns"

interface BuildingTableRowProps {
  actualLevel: number;
  queuedLevel: number;
  buildingId: BuildingId;
  townId: string;
}

export const BuildingTableRow: React.FC<BuildingTableRowProps> = ({ actualLevel, queuedLevel, townId, buildingId }) => {
  const dispatch = useDispatch();
  const buildingData = buildings[buildingId];
  const headquarterLevel = 1;

  const { resources: { timber, clay, iron }, population } = buildingData.getCost(queuedLevel)
  const constructionTime = buildingData.getBuildTime(queuedLevel, headquarterLevel);
  const formattedTime = new Date(constructionTime * 1000).toISOString().substr(11, 8);

  return (
    <tr>
      <td>
        <img src="https://dsuk.innogamescdn.com/asset/ee33fc3d/graphic/buildings/mid/main1.png" title="Headquarters" alt="" className="bmain_list_img" />
        <a href="/game.php?village=3955&amp;screen=main">{buildingData.name}</a>
        <span style={{ fontSize: "0.9em" }}>Level {actualLevel}</span>
      </td>
      <td>{Math.round(timber)}</td>
      <td>{Math.round(clay)}</td>
      <td>{Math.round(iron)}</td>
      <td>{formattedTime}</td>
      <td>{Math.round(population)}</td>
      <td><button onClick={() => startConstruction(dispatch, townId, buildingId, queuedLevel, constructionTime)}>Construct level {queuedLevel + 1}</button></td>
    </tr>
  );
};

const startConstruction = (dispatch: Dispatch<any>, townId: string, buildingId: BuildingId, level: number, constructionTime: number) => {
  const buildingCost = buildings[buildingId].getCost(level);
  // TODO VVV move all of this shit to a reducer, it's not UI logic
  // Check if there is enough resources + population
  // Check if any building/research requirements are met
  dispatch(removeResources({ townId, resources: buildingCost.resources })); 
  dispatch(increasePopulation({ townId, value: buildingCost.population }));
  dispatch(enqueue({ townId, buildingId: BuildingId.Headquarters, item: buildingId, duration: constructionTime }));
  dispatch(incrementQueuedBuildingLevel({ townId, buildingId }));
};