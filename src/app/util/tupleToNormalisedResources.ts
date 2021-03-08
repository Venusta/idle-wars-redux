/* eslint-disable no-param-reassign */
import produce from "immer";
import { ResourcesTuple } from "../../types/types";
import { ResourcesNormalised } from "../../types/townStateTypes";

export const tupleToNormalisedResources = (resources: ResourcesTuple): ResourcesNormalised => {
  const initial: ResourcesNormalised = {
    id: {},
    all: [],
  };
  return produce(initial, (draftState) => {
    resources.forEach(([id, amount]) => {
      draftState.all.push(id);
      draftState.id[id] = {
        id,
        amount,
      };
    });
  });
};
