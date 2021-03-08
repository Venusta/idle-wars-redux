import { assertZeroAmount } from "./assertZeroAmount";
import { BuildingCost, ResourcesNormalised } from "../../types/townStateTypes";

export const calculateTimeUntilResources = (currentResources: ResourcesNormalised, resourcesPerSecond: ResourcesNormalised, cost: BuildingCost): number => cost.resources.all.reduce((timeUntil, resourceId) => {
  const current = assertZeroAmount(currentResources.id[resourceId]);
  const perSecond = assertZeroAmount(resourcesPerSecond.id[resourceId]);
  const resource = cost.resources.id[resourceId];
  if (!resource) {
    return 0;
  }
  const totalNeeded = resource.amount;
  return Math.max(timeUntil, (totalNeeded - current) / perSecond);
}, 0);
