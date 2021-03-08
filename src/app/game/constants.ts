export const WorldSpeed = 50;
export const HeadquartersQueueSlots = 5;

export const UnitProductionBuildingId = {
  Barracks: "barracks",
  Stable: "stable",
  Workshop: "workshop",
} as const;

export const ResourceProductionBuildingId = {
  TimberCamp: "timbercamp",
  ClayPit: "claypit",
  IronMine: "ironmine",
} as const;

export const Pleb = {
  Headquarters: "headquarters",
  Warehouse: "warehouse",
  Farm: "farm",
  Smithy: "smithy",
  Statue: "statue", // special
  Academy: "academy", // special
} as const;

export const BuildingId = { ...UnitProductionBuildingId, ...ResourceProductionBuildingId, ...Pleb };
export type BuildingIdType = typeof BuildingId[keyof typeof BuildingId];

export type UnitProductionBuildingIdType = typeof UnitProductionBuildingId[keyof typeof UnitProductionBuildingId];

export enum UnitId {
  SpearFighter = "spearfighter",
  Swordsman = "swordsman",
  Axeman = "axeman",
  Archer = "archer",
  Scout = "scout",
  LightCavalry = "lightcavalry",
  HeavyCavalry = "heavycavalry",
  Ram = "ram",
  Catapult = "catapult",
  Paladin = "paladin",
  Nobleman = "nobleman",
  MountedArcher = "mountedarcher",
}

export enum ResourceId {
  Timber = "timber",
  Clay = "clay",
  Iron = "iron",
}
