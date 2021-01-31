import React from 'react';
import { useDispatch } from 'react-redux';
import { resourceCost, constructBuilding } from "../../../slices/towns"

interface BuildingTableRowProps {
  level: number;
  buildingId: number;
  townId: number;
}

export const BuildingTableRow: React.FC<BuildingTableRowProps> = ({ level, townId, buildingId }) => {
  const dispatch = useDispatch();

  const { timber, clay, iron } = resourceCost(level);
  // const formattedTime = new Date(constructionTime * 1000).toISOString().substr(11, 8);
  const formattedTime = new Date(4 * 1000).toISOString().substr(11, 8);

  return (
    <tr>
      <td>
        <img src="https://dsuk.innogamescdn.com/asset/ee33fc3d/graphic/buildings/mid/main1.png" title="Headquarters" alt="" className="bmain_list_img" />
        <a href="/game.php?village=3955&amp;screen=main">{`name`}</a>
        <span style={{ fontSize: "0.9em" }}>Level {level}</span>
      </td>
      <td>{timber}</td>
      <td>{clay}</td>
      <td>{iron}</td>
      <td>{formattedTime}</td>
      <td>{-345893745}</td>
      {/* <td>{-population}</td> */}
      <td><button onClick={() => dispatch(constructBuilding({ townId, buildingId }))}>Construct</button></td>
    </tr>
  );
};