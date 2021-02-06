import { Dispatch } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { store } from "../../app/store";
import { pop } from "../slices/queue";
import { incrementActualBuildingLevel } from "../slices/towns";
import { BuildingId } from "./constants";
import { isBuildingId } from "./utility";

const levelBuildingAndRemoveFromQueue = (townId: string, buildingWithQueue: BuildingId, queuedBuilding: BuildingId) => {  
  return (dispatch: Dispatch<any>) => {
    batch(() => {
      dispatch(pop({ townId, buildingId: buildingWithQueue }));
      dispatch(incrementActualBuildingLevel({ townId, buildingId: queuedBuilding }));
    })
  }
};

export const updateQueue = () => {
  const state = store.getState();
  const dispatch = store.dispatch;
  
  const { queue } = state

  Object.keys(queue).forEach((townId) => {

    Object.values(queue[townId]).forEach((buildingQueue) => {
      buildingQueue?.forEach((queueItem) => { 
        if (Date.now() > queueItem.completionTime) {
          console.log(queueItem);
          // TODO BATCH THIS
          // dispatch(pop({ townId, buildingId: BuildingId.Headquarters }));
          // dispatch(incrementActualBuildingLevel({ townId, buildingId: queueItem.item }));
          if (isBuildingId(queueItem.item)) {
            levelBuildingAndRemoveFromQueue(townId, BuildingId.Headquarters, queueItem.item)(dispatch);
          }
        }
      });      
    })    
  })
}



