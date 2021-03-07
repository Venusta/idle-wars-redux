/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
import produce from "immer";
import { ResourcesTuple } from "../../types/types";
import { ResourceId } from "../game/constants";
import { BuildingCost, ResourcesNormalised } from "../slices/townStateTypes";

type ResList = {
  [id in ResourceId]: {
    id: ResourceId,
    amount: number,
  }
};
export const ex1: ResourcesNormalised = {
  byId: {
    [ResourceId.Timber]: {
      id: ResourceId.Timber,
      amount: 500,
    },
    [ResourceId.Clay]: {
      id: ResourceId.Clay,
      amount: 500,
    },
    [ResourceId.Iron]: {
      id: ResourceId.Iron,
      amount: 500,
    },
  },
  allIds: [
    ResourceId.Timber,
    ResourceId.Clay,
    ResourceId.Iron,
  ],
};

export const xxx = ex1.allIds;

const addProp = (obj: ResourcesNormalised, key: ResourceId): ResourcesNormalised => {
  return {
    ...obj,
    allIds: [...obj.allIds, key],
    byId: {
      ...obj.byId,
      [key]: {
        id: [key],
        amount: 0,
      },
    },
  };
};

export const addPartialResourcesOld = (p: ResourcesNormalised[]): ResourcesNormalised => {
  let newObj: ResourcesNormalised = {
    allIds: [],
    byId: {},
  };
  p.forEach((resObj) => {
    resObj.allIds.forEach((id) => {
      const entry = resObj.byId[id];
      if (entry) {
        if (newObj.byId[id]) {
          newObj.byId[id] = {
            id,
            amount: (newObj.byId[id]?.amount ?? 0) + entry.amount,
          };
        } else {
          newObj = {
            allIds: [
              ...newObj.allIds,
              id,
            ],
            byId: {
              ...newObj.byId,
              [id]: { id, amount: entry.amount },
            },
          };
        }
      }
    });
  });
  return newObj;
};

const INITAL_STATE = {};
const byId = produce((draft, action) => {
  // eslint-disable-next-line default-case
  // switch (action.type) {
  //   case RECEIVE_PRODUCTS:
  //     action.products.forEach((product: { id: string | number; }) => {
  //       draft[product.id] = product;
  //     });
  // }
}, INITAL_STATE);

export const addPartialResources = (state: ResourcesNormalised, toAdd: ResourcesNormalised[]): ResourcesNormalised => {
  return produce(state, (draftState) => {
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
};

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

export const multiplyResources = (resources: ResourcesNormalised, multiplier: number): ResourcesNormalised => {
  return produce(resources, (draftState) => {
    resources.allIds.forEach((id) => {
      const draftResource = draftState.byId[id];
      if (draftResource) {
        draftResource.amount *= multiplier;
      }
    });
  });
};

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

console.log(addPartialResources(ex1, [ex1]));
console.log(addPartialResources(ex1, [ex1, ex1]));
console.log(addPartialResources(ex1, [ex1, ex1, ex1, ex1]));

export const hasPopulation = (maxPop: number, currentPop: number, popCost: number): boolean => {
  if (maxPop - currentPop < popCost) {
    return false;
  }
  return true;
};

export const hasResources = (resources: ResourcesNormalised, resourceCost: ResourcesNormalised): boolean => {
  const y = resourceCost.allIds.reduce((prev, id) => {
    const storageResource = resources.byId[id];
    const costResource = resourceCost.byId[id];

    if (storageResource && costResource) {
      if (storageResource.amount < costResource.amount) {
        return false;
      }
    }
    return prev;
  }, true);
  return y;
  // const x = resources.reduce((prev, [resource, amountInStorage]): boolean => {
  //   const index = resourceCost.findIndex(([id]) => id === resource);
  //   if (index === -1) {
  //     return false;
  //   }
  //   if (amountInStorage < resourceCost[index][RES_AMOUNT_TUPLE]) {
  //     return false;
  //   }
  //   return prev;
  // }, true);
  // return x;
};

export const hasRequirements = (maxPop: number, currentPop: number, resources: ResourcesNormalised, cost: BuildingCost): boolean => {
  // Check available workers
  const hasPop = hasPopulation(maxPop, currentPop, cost.population);
  // Check resources
  const hasRes = hasResources(resources, cost.resources);

  return hasPop && hasRes;
};

interface HasAmountKey {
  amount: number
}
export const assertZeroAmount = <O extends HasAmountKey>(obj: O | undefined): number => {
  return obj?.amount ?? 0;
};

export const calculateTimeUntilResources = (currentResources: ResourcesNormalised, resourcesPerSecond: ResourcesNormalised, cost: BuildingCost): number => {
  return cost.resources.allIds.reduce((timeUntil, resourceId) => {
    const current = assertZeroAmount(currentResources.byId[resourceId]);
    const perSecond = assertZeroAmount(resourcesPerSecond.byId[resourceId]);
    const resource = cost.resources.byId[resourceId];
    if (!resource) {
      return 0;
    }
    const totalNeeded = resource.amount;
    return Math.max(timeUntil, (totalNeeded - current) / perSecond);
  }, 0);
};
