import { ResourceId, UnitId, BuildingId } from "../app/game/constants";

interface Resource {
  id: ResourceId;
  amount: number;
}

export type Resources = Record<ResourceId, Resource>;

export interface ResourcesNormalised {
  id: Partial<Resources>,
  all: ResourceId[]
}

interface Unit {
  id: UnitId;
  town: number;
  total: number;
}

type Units = Record<UnitId, Unit>;

export interface UnitsNormalised {
  id: Partial<Units>,
  all: UnitId[]
}

interface Research {
  id: UnitId;
  level: number;
}

type Researchs = Record<UnitId, Research>;

export interface ResearchNormalised {
  id: Partial<Researchs>,
  all: UnitId[]
}

export interface Building {
  id: BuildingId;
  level: number;
  queuedLevel: number;
}

type Buildings = Record<BuildingId, Building>;

export interface BuildingsNormalised {
  id: Buildings,
  all: BuildingId[]
}

export interface BuildingQueueItem {
  building: BuildingId;
  duration: number;
  completionTime: number;
  level: number;
}

export interface UnitQueueItem {
  unit: UnitId;
  startTime?: number;
  recruitTimeMs: number;
  amount: number;
  recruited: number;
}

export type Queues = {
  buildings: { [id in BuildingId]?: BuildingQueueItem[]; }
  units: { [id in BuildingId]?: UnitQueueItem[]; }
};

export interface BuildingCost {
  resources: ResourcesNormalised;
  population: number;
}

export interface UnitCost {
  resources: ResourcesNormalised;
  population: number;
}
