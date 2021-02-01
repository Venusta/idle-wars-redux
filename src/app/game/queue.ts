import { store } from "../../app/store";
import { selectBuilding } from "../selectors/selectBuilding";
// import { selectTownQueue } from "../selectors/selectTownQueue";
import { enqueue } from "../slices/queue";
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

  Object.keys(queue).forEach((townQueue) => {
    console.log(townQueue);

    Object.values(queue[townQueue]).forEach((buildingQueue) => {
      buildingQueue?.forEach((item) => { 
        console.log(item);        
      });
      
    })
    
        
  })

  // state.queue.forEach((individualQueue) => {
  //   // const queues = selectTownQueue(state, townId); // probably shouldn't be used idk
  //   // stuff
  // })

}


