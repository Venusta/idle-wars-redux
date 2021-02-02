import { store } from "../../app/store";
import { pop } from "../slices/queue";
import { incrementActualBuildingLevel } from "../slices/towns";
import { BuildingId } from "./constants";

export const updateQueue = () => {
  const state = store.getState();
  const dispatch = store.dispatch;

  const { queue } = state

  Object.keys(queue).forEach((townId) => {

    Object.values(queue[townId]).forEach((buildingQueue) => {
      buildingQueue?.forEach((queueItem) => { 
        if (Date.now() > queueItem.completionTime) {
          console.log(queueItem);
          dispatch(pop({ townId, buildingId: BuildingId.Headquarters }));
          dispatch(incrementActualBuildingLevel({ townId, buildingId: queueItem.item }));
        }
      });      
    })    
  })
}


