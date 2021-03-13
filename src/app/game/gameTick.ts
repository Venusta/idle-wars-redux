import { selectLastTick } from "../selectors";
import { tick } from "../slices/misc";
import { store } from "../store";

export const gameTick = (): void => {
  const { dispatch } = store;
  const getState = store.getState();

  const prev = selectLastTick(getState);
  const now = Date.now();

  const difference = now - prev;
  // console.log("Tick!: " + difference);

  dispatch(tick({ difference, now }));

  // setTimeout(() => {
  //   gameTick();
  // }, 1000);
};
