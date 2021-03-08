/* eslint-disable arrow-body-style */
import { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store";

export const useMemoSelector = <Selected>(selector: (state: RootState) => Selected): Selected => {
  const select = useMemo(() => selector, [selector]);
  return useSelector(select, shallowEqual);
};
