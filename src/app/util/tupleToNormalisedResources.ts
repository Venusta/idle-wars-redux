/* eslint-disable no-param-reassign */
import produce from "immer";
import { ResourcesTuple } from "../../types/types";
import { ResourcesNormalised } from "../../types/townStateTypes";

export const tupleToNormalisedResources = (resources: ResourcesTuple): ResourcesNormalised => {
  const initial: ResourcesNormalised = {
    byId: {},
    allIds: [],
  };
  return produce(initial, (draftState) => {
    resources.forEach(([id, amount]) => {
      draftState.allIds.push(id);
      draftState.byId[id] = {
        id,
        amount,
      };
    });
  });
};
