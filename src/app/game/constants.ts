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

export const BasicBuildingId = {
  Headquarters: "headquarters",
  Warehouse: "warehouse",
  Farm: "farm",
  Smithy: "smithy",
  Statue: "statue", // special
  Academy: "academy", // special
} as const;

export const BuildingId = {
  ...UnitProductionBuildingId,
  ...ResourceProductionBuildingId,
  ...BasicBuildingId,
} as const;

export type BuildingIdType = typeof BuildingId[keyof typeof BuildingId];
export type UnitProductionBuildingIdType = typeof UnitProductionBuildingId[keyof typeof UnitProductionBuildingId];
export type ResourceProductionBuildingIdType = typeof ResourceProductionBuildingId[keyof typeof ResourceProductionBuildingId];
export type BasicBuildingIdType = typeof BasicBuildingId[keyof typeof BasicBuildingId];

export const UnitIdBarracks = {
  SpearFighter: "spearfighter",
  Swordsman: "swordsman",
  Axeman: "axeman",
  Archer: "archer",
} as const;

export const UnitIdStable = {
  Scout: "scout",
  LightCavalry: "lightcavalry",
  HeavyCavalry: "heavycavalry",
  MountedArcher: "mountedarcher",
} as const;

export const UnitIdWorkshop = {
  Ram: "ram",
  Catapult: "catapult",
} as const;

export const UnitIdAcademy = {
  Nobleman: "nobleman",
} as const;

export const UnitIdStatue = {
  Paladin: "paladin",
} as const;

export const UnitId = {
  ...UnitIdBarracks,
  ...UnitIdStable,
  ...UnitIdWorkshop,
  ...UnitIdAcademy,
  ...UnitIdStatue,
} as const;

export type UnitIdType = typeof UnitId[keyof typeof UnitId];
export type UnitIdBarracksType = typeof UnitIdBarracks[keyof typeof UnitIdBarracks];
export type UnitIdStableType = typeof UnitIdStable[keyof typeof UnitIdStable];
export type UnitIdWorkshopType = typeof UnitIdWorkshop[keyof typeof UnitIdWorkshop];
export type UnitIdAcademyType = typeof UnitIdAcademy[keyof typeof UnitIdAcademy];
export type UnitIdStatueType = typeof UnitIdStatue[keyof typeof UnitIdStatue];

export type UnitIdProductionType = UnitIdBarracksType | UnitIdStableType | UnitIdWorkshopType;

export const ResourceId = {
  Timber: "timber",
  Clay: "clay",
  Iron: "iron",
} as const;

export type ResourceIdType = typeof ResourceId[keyof typeof ResourceId];
