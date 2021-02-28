import { selectLastTick } from "../selectors";
import { tick } from "../slices/misc";
import { store } from "../store";

export const gameTick = () => {
  const { dispatch, getState } = store

  const prev = selectLastTick(getState());
  const now = Date.now();

  const difference = now - prev;
  // console.log("Tick!: " + difference);

  dispatch(tick({ difference, now }));

  // setTimeout(() => {
  //   gameTick();
  // }, 1000);
}
