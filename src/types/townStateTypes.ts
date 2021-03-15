import {
  BuildingIdType, UnitIdType, UnitIdProductionType, ResourceIdType, UnitIdGathererType,
} from "../app/game/constants";

interface Resource {
  id: ResourceIdType;
  amount: number;
}

export type Resources = Record<ResourceIdType, Resource>;

export interface ResourcesNormalised {
  id: Partial<Resources>,
  all: ResourceIdType[]
}

export interface Unit {
  id: UnitIdType;
  home: number;
  total: number;
}

type Units = Record<UnitIdType, Unit>;

export interface UnitsNormalised {
  id: Partial<Units>,
  all: UnitIdType[]
}
export interface Gatherer {
  id: UnitIdGathererType;
  home: number;
  total: number;
}

type Gatherers = Record<UnitIdGathererType, Gatherer>;

export interface GatherersNormalised {
  id: Partial<Gatherers>,
  all: UnitIdGathererType[]
}

interface Research {
  id: UnitIdProductionType;
  level: number;
}

type Researchs = Record<UnitIdProductionType, Research>;

export interface ResearchNormalised {
  id: Partial<Researchs>,
  all: UnitIdProductionType[]
}

export interface BuildingDataType {
  id: BuildingIdType;
  level: number;
  queuedLevel: number;
}

type Buildings = Record<BuildingIdType, BuildingDataType>;

export interface BuildingsNormalised {
  id: Buildings,
  all: BuildingIdType[]
}

export interface BuildingQueueItem {
  building: BuildingIdType;
  duration: number;
  completionTime: number;
  level: number;
}

export interface UnitQueueItem {
  unit: UnitIdType;
  startTime?: number;
  recruitTimeMs: number;
  amount: number;
  recruited: number;
}

export type Queues = {
  // buildings: { [id in BuildingIdType]?: BuildingQueueItem[]; }
  // units: { [id in BuildingIdType]?: UnitQueueItem[]; }
  buildings: Partial<Record<BuildingIdType, BuildingQueueItem[]>>
  units: Partial<Record<BuildingIdType, UnitQueueItem[]>>
};

export interface BuildingCost {
  resources: ResourcesNormalised;
  population: number;
}

export interface UnitCost {
  resources: ResourcesNormalised;
  population: number;
}
