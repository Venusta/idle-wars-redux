export const WorldSpeed = 1;
export const HeadquartersQueueSlots = 5;

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