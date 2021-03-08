/* eslint-disable arrow-body-style */
import { BuildingCost, ResourcesNormalised } from "../../types/townStateTypes";

export const hasPopulation = (maxPop: number, currentPop: number, popCost: number): boolean => {
  if (maxPop - currentPop < popCost) {
    return false;
  }
  return true;
};

export const hasResources = (resources: ResourcesNormalised, resourceCost: ResourcesNormalised): boolean => {
  return resourceCost.all.reduce((prev: boolean, id) => {
    const storageResource = resources.id[id];
    const costResource = resourceCost.id[id];

    if (storageResource && costResource) {
      if (storageResource.amount < costResource.amount) {
        return false;
      }
    }
    return prev;
  }, true);
};

export const hasRequirements = (maxPop: number, currentPop: number, resources: ResourcesNormalised, cost: BuildingCost): boolean => {
  const hasPop = hasPopulation(maxPop, currentPop, cost.population);
  const hasRes = hasResources(resources, cost.resources);

  return hasPop && hasRes;
};
