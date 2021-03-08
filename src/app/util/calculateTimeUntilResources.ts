import { assertZeroAmount } from "./assertZeroAmount";
import { BuildingCost, ResourcesNormalised } from "../../types/townStateTypes";

export const calculateTimeUntilResources = (currentResources: ResourcesNormalised, resourcesPerSecond: ResourcesNormalised, cost: BuildingCost): number => cost.resources.allIds.reduce((timeUntil, resourceId) => {
  const current = assertZeroAmount(currentResources.byId[resourceId]);
  const perSecond = assertZeroAmount(resourcesPerSecond.byId[resourceId]);
  const resource = cost.resources.byId[resourceId];
  if (!resource) {
    return 0;
  }
  const totalNeeded = resource.amount;
  return Math.max(timeUntil, (totalNeeded - current) / perSecond);
}, 0);
