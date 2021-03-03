/* eslint-disable arrow-body-style */
import { Resources } from "../../types/types";
import { ResourceId } from "./constants";

type ResMap = Map<ResourceId, number>;

export const addResourceArrays = (resArray1: Resources, resArray2: Resources): Resources => {
  const merged = [...resArray1, ...resArray2];
  const testMap: ResMap = new Map([]);
  merged.forEach(([resId, amount]) => {
    testMap.set(resId, (testMap.get(resId) ?? 0) + amount);
  });
  return Array.from(testMap.entries());
};

export const multiplyResourcesArray = (resArray: Resources, multi: number): Resources => resArray.map(([id, amt]) => ([id, amt * multi]));

/**
 * * assumptions, townResources will have enough to be removed from
 * * both arrays won't contain "all" types of resource but array1 should have all of array2
 * * if not we can check it in this method but I think we should check it before it ever reaches here
 *
 * * maybe index the arrays somehow so we know which resource is in what index
 * * letting us only loop over each array once instead of however many resources there are
 *  */
export const subResources = (townResources: Resources, resourcesToSub: Resources): Resources => {
  return townResources.map(([resourceId, amount]) => {
    const index = resourcesToSub.findIndex(([townResource]) => townResource === resourceId); // ? cache this later

    if (index === -1) {
      // ? Nothing to subtract from this resource so just return the original amount
      console.warn(`[subResources] No resource found: ${resourceId}`);
      return [resourceId, amount];
    }

    const [, amountToRemove] = resourcesToSub[index];

    return [resourceId, amount - amountToRemove];
  });
};
