import { useEffect } from "react";
import { BuildingIdRecruitType } from "../../game/constants";
import { setCurrentPage } from "../../slices/misc";
import { useAppDispatch } from "../../store";

export const useCurrentpage = (pageId: BuildingIdRecruitType): void => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(`@@@@@      Set current page to: ${pageId}`);
    dispatch(setCurrentPage({ pageId }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
