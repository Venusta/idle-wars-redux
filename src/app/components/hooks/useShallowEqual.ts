/* eslint-disable arrow-body-style */
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store";

export const useShallowEqualSelector = <Selected>(selector: (state: RootState) => Selected): Selected => {
  return useSelector(selector, shallowEqual);
};
