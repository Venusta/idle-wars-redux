import { BuildingId, ResourceId, UnitId } from "./constants";

export const isBuildingId = (x: any): x is BuildingId => {
  return Object.values(BuildingId).includes(x);
};

export const isUnitId = (x: any): x is UnitId => {
  return Object.values(UnitId).includes(x);
};

export const isResourceId = (x: any): x is ResourceId => {
  return Object.values(ResourceId).includes(x);
};
