import { Dispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector, useStore, batch } from 'react-redux';
import { Resources } from '../../../../types/types';
import { baseBuildings } from '../../../game/buildings';
import { BuildingId } from '../../../game/constants';
import { selectTown } from '../../../selectors';
import { enqueue } from '../../../slices/queue';
import { startBuildSomething } from "../../../slices/towns"
import { RootState } from '../../../store';
import "./style.css";

interface BuildingTableRowProps {
  actualLevel: number;
  queuedLevel: number;
  buildingId: BuildingId;
  townId: string;
}


export const BuildingTableRow: React.FC<BuildingTableRowProps> = ({ actualLevel, queuedLevel, townId, buildingId }) => {
  const dispatch = useDispatch();

  const store: RootState = useStore().getState()

  const town = useSelector((state: RootState) => selectTown(state, townId))
  const { timber: townTimber, clay: townClay, iron: townIron } = town.resources;

  const building = baseBuildings[buildingId];
  const headquarterLevel = 1; // TODO un-hardcode

  const { resources: { timber, clay, iron }, population } = building.getCost(queuedLevel)
  const constructionTime = building.getBuildTime(queuedLevel, headquarterLevel);
  const formattedTime = new Date(constructionTime * 1000).toISOString().substr(11, 8);


  const reqsMet = (/*store: RootState,*/ townId: string, buildingId: BuildingId): boolean => {
    // todo move / ignore this
    const town = store.towns[townId];
    const building = town.buildings[buildingId]
    const cost = baseBuildings[buildingId].getCost(building.queuedLevel);

    for (const [k, v] of Object.entries(cost.resources)) {
      if (town.resources[k as keyof Resources] < v) {
        return false;
      }
    }

    return false;
  };

  const startConstructionConfusion = (dispatch: Dispatch<any>, townId: string, buildingId: BuildingId, constructionTime: number) => {
    return () => {
      batch(() => {
        dispatch(startBuildSomething({ townId, buildingId }));
        dispatch(enqueue({ townId, buildingId: BuildingId.Headquarters, item: buildingId, duration: constructionTime }));
      })
    }
  }

  const startConstruction = (townId: string, buildingId: BuildingId, constructionTime: number) => {
    dispatch(startBuildSomething({ townId, buildingId }));
    // TODO un-hardcode
    // dispatch(enqueue({ townId, buildingId: BuildingId.Headquarters, item: buildingId, duration: constructionTime }));
  };

  const enoughResource = (buildingResource: number, townResource: number): string => {
    return `${buildingResource >= townResource ? "red" : "blue"}`
  } // todo prob return boolean

  return (
    <tr className="rowColour">
      <td>
        <img src="https://dsuk.innogamescdn.com/asset/ee33fc3d/graphic/buildings/mid/main1.png" title="Headquarters" alt="" className="bmain_list_img" />
        <a href="/game.php?village=3955&amp;screen=main">{building.name}</a>
        <span style={{ fontSize: "0.9em" }}>Level {actualLevel}</span>
      </td>
      <td className={enoughResource(timber, townTimber)}>{Math.round(timber)}</td>
      <td className={enoughResource(clay, townClay)}>{Math.round(clay)}</td>
      <td className={enoughResource(iron, townIron)}>{Math.round(iron)}</td>
      <td>{formattedTime}</td>
      <td className={enoughResource(population, town.maxPopulation - town.population)}>{Math.round(population)}</td>
      <td><button onClick={() => startConstruction(townId, buildingId, constructionTime)}>Construct level {queuedLevel + 1}</button></td>
    </tr>
  );
};

