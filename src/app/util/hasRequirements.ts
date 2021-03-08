import { BuildingCost, ResourcesNormalised } from "../../types/townStateTypes";

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
};

export const hasRequirements = (maxPop: number, currentPop: number, resources: ResourcesNormalised, cost: BuildingCost): boolean => {
  // Check available workers
  const hasPop = hasPopulation(maxPop, currentPop, cost.population);
  // Check resources
  const hasRes = hasResources(resources, cost.resources);

  return hasPop && hasRes;
};
