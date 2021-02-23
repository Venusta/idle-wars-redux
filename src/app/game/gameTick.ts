import { selectLastTick } from "../selectors";
import { tick } from "../slices/misc";
import { store } from "../store";


export const gameTick = () => {
  console.log("Tick!");

  const { dispatch, getState } = store
  const prev = selectLastTick(getState());
  const now = Date.now();

  dispatch(tick({ difference: now - prev, now }));

  // setTimeout(() => {
  //   gameTick();
  // }, 5000);

}
