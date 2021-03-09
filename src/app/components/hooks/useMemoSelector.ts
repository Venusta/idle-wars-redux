/* eslint-disable arrow-body-style */
import { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store";

export const useMemoSelector = <Selected>(selector: (state: RootState) => Selected): Selected => {
  const select = useMemo(() => selector, [selector]);
  const x = useSelector(select, shallowEqual);
  return x;
};

export const useMemoSelector2 = <Selected>(selector: () => (state: RootState) => Selected): Selected => {
  const select = useMemo(selector, [selector]);
  return useSelector(select, shallowEqual);
};

export const useMemoSelector3 = <Selector>(selector: () => (state: RootState) => Selector): Selector => {
  console.log("ahjjjj");

  const select = useMemo(selector, [selector]);
  const x = useSelector((state: RootState) => select(state), shallowEqual);
  return x;
};

export const useMemoSelector4 = <S>(makeS: () => (state: RootState) => S): S => {
  const select = useMemo(makeS, [makeS]);
  const x = useSelector(select);
  return x;
};

// const s = useMemo(selectUnitAmounts, []);
// const x = useSelector((state: RootState) => s(state, townId, unitId), shallowEqual);

// const selectUnitAmounts = () => createSelector(
//   (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId],
//   (idk) => {
//     console.log(`selectUnitAmount unitId: ${idk?.id}`);
//     return idk ?? { town: 0, total: 0 };
//   },
// );
