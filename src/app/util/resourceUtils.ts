/* eslint-disable no-param-reassign */
import produce from "immer";
import { ResourcesNormalised } from "../../types/townStateTypes";

export const addPartialResources = (state: ResourcesNormalised, toAdd: ResourcesNormalised[]): ResourcesNormalised => produce(state, (draftState) => {
  toAdd.forEach((resources) => {
    resources.all.forEach((id) => {
      const amount = resources.id[id]?.amount ?? 0;
      const draftResource = draftState.id[id];
      if (draftResource) {
        draftResource.amount += amount;
      } else {
        draftState.all.push(id);
        draftState.id[id] = {
          id,
          amount,
        };
      }
    });
  });
});

export const subResourcesFromTown = (townResources: ResourcesNormalised, resourcesToSub: ResourcesNormalised): ResourcesNormalised => {
  // not sure if this is the correct way round
  const test = resourcesToSub.all.every((id) => townResources.all.includes(id));
  if (!test) {
    console.log("We don't have every resource type!!!");
    return townResources;
  }

  return produce(townResources, (draftState) => {
    townResources.all.forEach((id) => {
      const resource = draftState.id[id];
      if (resource) {
        resource.amount -= resourcesToSub.id[id]?.amount ?? 0;
      }
    });
  });
};

export const multiplyResources = (resources: ResourcesNormalised, multiplier: number): ResourcesNormalised => produce(resources, (draftState) => {
  resources.all.forEach((id) => {
    const draftResource = draftState.id[id];
    if (draftResource) {
      draftResource.amount *= multiplier;
    }
  });
});
