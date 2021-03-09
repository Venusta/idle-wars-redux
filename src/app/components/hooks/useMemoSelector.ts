/* eslint-disable arrow-body-style */
import { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { UnitId } from "../../game/constants";
import { makeSelectUnitAmounts } from "../../selectors/selectUnitAmounts";
import { RootState } from "../../store";

export const useMemoSelector = <Selected>(selector: (state: RootState) => Selected): Selected => {
  const select = useMemo(() => selector, [selector]);
  return useSelector(select, shallowEqual);
};

export const useMemoSelector2 = <Selected>(selector: () => (state: RootState) => Selected): Selected => {
  const select = useMemo(selector, [selector]);
  return useSelector(select, shallowEqual);
};

// export const useMemoSelector3 = <Selected>(selector: () => (state: RootState) => Selected): Selected => {
//   console.log("ahjjjj");

//   const select = useMemo(selector, [selector]);
//   const x = useSelector((state: RootState) => select(state, "0", UnitId.Archer), shallowEqual);
//   return x;
// };

// const s = useMemo(selectUnitAmounts, []);
// const x = useSelector((state: RootState) => s(state, townId, unitId), shallowEqual);

// const selectUnitAmounts = () => createSelector(
//   (state: RootState, townId: string, unitId: UnitId) => state.towns.id[townId].units.id[unitId],
//   (idk) => {
//     console.log(`selectUnitAmount unitId: ${idk?.id}`);
//     return idk ?? { town: 0, total: 0 };
//   },
// );
