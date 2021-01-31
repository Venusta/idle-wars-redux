import React from 'react';

export const buildingData = (level = 1) => { // TODO move this
  level = level + 1
  const timber = 7 * level;
  const clay = 5 * level;
  const iron = 2 * level;
  const population = -2;
  const constructionTime = 50 * level

  return { cost: { timber, clay, iron, population }, constructionTime }
};

export enum BuildingType {
  Headquarters = 0,
  TimberCamp = 1,
  ClayPit = 2,
  IronMine = 3
}

const buildingNames = {
  [BuildingType.Headquarters]: "Headquarters",
  [BuildingType.TimberCamp]: "Timber camp",
  [BuildingType.ClayPit]: "Clay pit",
  [BuildingType.IronMine]: "Iron mine"
}

interface BuildingTableRowProps {
  level: number;
  type: number;
  townId: number;
}

export const BuildingTableRow: React.FC<BuildingTableRowProps> = (props) => {

  const { cost: { timber, clay, iron, population }, constructionTime } = buildingData(props.level);
  const formattedTime = new Date(constructionTime * 1000).toISOString().substr(11, 8)

  return (
    <tr>
      <td>
        <img src="https://dsuk.innogamescdn.com/asset/ee33fc3d/graphic/buildings/mid/main1.png" title="Headquarters" alt="" className="bmain_list_img" />
        <a href="/game.php?village=3955&amp;screen=main">{`name`}</a>
        <span style={{ fontSize: "0.9em" }}>Level {props.level}</span>
      </td>
      <td>{timber}</td>
      <td>{clay}</td>
      <td>{iron}</td>
      <td>{formattedTime}</td>
      <td>{-population}</td>
      {/* <td><button onClick={() => userStore.constructBuilding2(props.townId, props.type)}>Construct</button></td> */}
    </tr>
  );
};