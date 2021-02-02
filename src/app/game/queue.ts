import { store } from "../../app/store";
import { selectBuilding } from "../selectors/selectBuilding";
// import { selectTownQueue } from "../selectors/selectTownQueue";
import { enqueue, pop } from "../slices/queue";
import { BuildingId } from "./constants";

const something = () => {
  const state = store.getState();
  const dispatch = store.dispatch;

  const building = selectBuilding(state, 0, 0)

  //example
  const payload = { townId: 0, buildingId: BuildingId.Headquarters, item: 0, completionTime: 0 }

  dispatch(enqueue(payload));
}

export const updateQueue = () => {
  const state = store.getState();
  const dispatch = store.dispatch;

  const { queue } = state

  Object.keys(queue).forEach((townId: number) => {
    console.log(townId);

    Object.values(queue[townId]).forEach((buildingQueue) => {
      buildingQueue?.forEach((item: BuildingId) => { 
        console.log(item);  
        dispatch(pop({ townId, buildingId: item }))      
      });
      
    })   
        
  })
}


