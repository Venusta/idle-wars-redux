import React from 'react';
import { useDispatch } from 'react-redux';
import { buildings } from '../../../game/buildings';
import { BuildingId } from '../../../game/constants';
import { enqueue } from '../../../slices/queue';
import { constructBuilding } from "../../../slices/towns"

interface BuildingTableRowProps {
  level: number;
  buildingId: BuildingId;
  townId: number;
}

export const BuildingTableRow: React.FC<BuildingTableRowProps> = ({ level, townId, buildingId }) => {
  const dispatch = useDispatch();
  const buildingData = buildings[buildingId];
  const headquarterLevel = 1;

  const { resources: { timber, clay, iron }, population } = buildingData.getCost(level)
  const constructionTime = buildingData.getBuildTime(level, headquarterLevel);
  const formattedTime = new Date(constructionTime * 1000).toISOString().substr(11, 8);


  const payload = { townId, buildingId: BuildingId.Headquarters, item: buildingId, completionTime: constructionTime }

  return (
    <tr>
      <td>
        <img src="https://dsuk.innogamescdn.com/asset/ee33fc3d/graphic/buildings/mid/main1.png" title="Headquarters" alt="" className="bmain_list_img" />
        <a href="/game.php?village=3955&amp;screen=main">{buildingData.name}</a>
        <span style={{ fontSize: "0.9em" }}>Level {level}</span>
      </td>
      <td>{Math.round(timber)}</td>
      <td>{Math.round(clay)}</td>
      <td>{Math.round(iron)}</td>
      <td>{formattedTime}</td>
      <td>{Math.round(population)}</td>
      <td><button onClick={() => {dispatch(constructBuilding({ townId, buildingId })); dispatch(enqueue(payload))}}>Construct</button></td>
    </tr>
  );
};