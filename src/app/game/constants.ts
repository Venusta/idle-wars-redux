export const TIMBER = 0;
export const CLAY = 1;
export const IRON = 2;
export const POPULATION = 3;

export const WorldSpeed = 1;

export enum BuildingId {
  Headquarters = "headquarters",
  TimberCamp = "timbercamp",
  ClayPit = "claypit",
  IronMine = "ironmine",
  Barracks = "barracks",
  Stable = "stable",
  Warehouse = "warehouse",
  Farm = "farm",
}

export enum UnitId {
  SpearFighter = "spear",
  Swordsman = "sword",
  Axeman = "axe",
}

export enum ResourceId {
  Timber = "timber",
  Clay = "clay",
  Iron = "iron",
}

export type ResourceId2 = "timber" | "clay" | "iron"

// export const BuildingNamesDictionary = {
//   [BuildingId.Headquarters]: "Headquarters",
//   [BuildingId.TimberCamp]: "Timber camp",
//   [BuildingId.ClayPit]: "Clay pit",
//   [BuildingId.IronMine]: "Iron mine",
//   [BuildingId.Barracks]: "Bararcks",
//   [BuildingId.Stable]: "Stable"
// }