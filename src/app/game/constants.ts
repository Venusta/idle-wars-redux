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

export const SpecialBuildingId = {
  LumberCamp: "lumbercamp",
} as const;

export const BuildingId = {
  ...UnitProductionBuildingId,
  ...ResourceProductionBuildingId,
  ...BasicBuildingId,
  ...SpecialBuildingId,
} as const;

export const RecruitBuilding = "recruit" as const;

export type BuildingIdType = typeof BuildingId[keyof typeof BuildingId];
export type BuildingIdUnitProductionType = typeof UnitProductionBuildingId[keyof typeof UnitProductionBuildingId];
export type BuildingIdResourceProductionType = typeof ResourceProductionBuildingId[keyof typeof ResourceProductionBuildingId];
export type BuildingIdBasicType = typeof BasicBuildingId[keyof typeof BasicBuildingId];

export type BuildingIdRecruitType = BuildingIdUnitProductionType | typeof RecruitBuilding;

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

export const GathererId = {
  Lumberjack: "lumberjack",
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

export type UnitIdGathererType = typeof GathererId[keyof typeof GathererId];

export type UnitIdProductionType = UnitIdBarracksType | UnitIdStableType | UnitIdWorkshopType;
// export type UnitIdRecruitType = UnitIdProductionType[];

export const UnitIdBarracksArray = [
  UnitIdBarracks.SpearFighter,
  UnitIdBarracks.Swordsman,
  UnitIdBarracks.Axeman,
  UnitIdBarracks.Archer,
] as const;

export const UnitIdStableArray = [
  UnitIdStable.Scout,
  UnitIdStable.LightCavalry,
  UnitIdStable.HeavyCavalry,
  UnitIdStable.MountedArcher,
] as const;

export const UnitIdWorkshopArray = [
  UnitIdWorkshop.Ram,
  UnitIdWorkshop.Catapult,
] as const;

export const UnitIdGathererArray = [
  GathererId.Lumberjack,
] as const;

export const UnitIdProductionArray = [
  ...UnitIdBarracksArray,
  ...UnitIdStableArray,
  ...UnitIdWorkshopArray,
] as const;

export const ResourceId = {
  Timber: "timber",
  Clay: "clay",
  Iron: "iron",
} as const;

export type ResourceIdType = typeof ResourceId[keyof typeof ResourceId];

// ? below to new file

type FormsRecruitBuildings = Record<
BuildingIdRecruitType, {
  id: BuildingIdRecruitType
  units: readonly UnitIdProductionType[]
}>;

export const FormUiStuff: FormsRecruitBuildings = {
  [RecruitBuilding]: {
    id: RecruitBuilding,
    units: UnitIdProductionArray,
  },
  [BuildingId.Barracks]: {
    id: BuildingId.Barracks,
    units: UnitIdBarracksArray,
  },
  [BuildingId.Stable]: {
    id: BuildingId.Stable,
    units: UnitIdStableArray,
  },
  [BuildingId.Workshop]: {
    id: BuildingId.Workshop,
    units: UnitIdWorkshopArray,
  },
} as const;

export const navBarBuildings = [
  BuildingId.LumberCamp,
  BuildingId.Headquarters,
  BuildingId.Barracks,
  BuildingId.Stable,
  BuildingId.Workshop,
  BuildingId.Smithy,
] as const;
