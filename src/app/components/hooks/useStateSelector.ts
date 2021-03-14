import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useStateSelector = <Selected>(selector: (state: RootState) => Selected): Selected => useSelector(selector);
