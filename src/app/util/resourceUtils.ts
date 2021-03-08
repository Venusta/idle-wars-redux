/* eslint-disable no-param-reassign */
import produce from "immer";
import { ResourcesNormalised } from "../../types/townStateTypes";

export const addPartialResources = (state: ResourcesNormalised, toAdd: ResourcesNormalised[]): ResourcesNormalised => produce(state, (draftState) => {
  toAdd.forEach((resources) => {
    resources.allIds.forEach((id) => {
      const amount = resources.byId[id]?.amount ?? 0;
      const draftResource = draftState.byId[id];
      if (draftResource) {
        draftResource.amount += amount;
      } else {
        draftState.allIds.push(id);
        draftState.byId[id] = {
          id,
          amount,
        };
      }
    });
  });
});

export const subResources = (townResources: ResourcesNormalised, resourcesToSub: ResourcesNormalised): ResourcesNormalised => {
  // not sure if this is the correct way round
  const test = townResources.allIds.every((id) => resourcesToSub.allIds.includes(id));
  if (!test) {
    console.log("We don't have every resource type!!!");
    return townResources;
  }

  return produce(townResources, (draftState) => {
    townResources.allIds.forEach((id) => {
      const resource = draftState.byId[id];
      if (resource) {
        resource.amount -= resourcesToSub.byId[id]?.amount ?? 0;
      }
    });
  });
};

export const multiplyResources = (resources: ResourcesNormalised, multiplier: number): ResourcesNormalised => produce(resources, (draftState) => {
  resources.allIds.forEach((id) => {
    const draftResource = draftState.byId[id];
    if (draftResource) {
      draftResource.amount *= multiplier;
    }
  });
});
