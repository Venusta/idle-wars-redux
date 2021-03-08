import { ResourceId, UnitId, BuildingId } from "../app/game/constants";

interface Resource {
  id: ResourceId;
  amount: number;
}

export type Resources = {
  [id in ResourceId]: Resource;
};

export interface ResourcesNormalised {
  id: Partial<Resources>,
  all: ResourceId[]
}

interface Unit {
  id: UnitId;
  town: number;
  total: number;
}

type Units = {
  [id in UnitId]?: Unit;
};

export interface UnitsNormalised {
  id: Partial<Units>,
  all: UnitId[]
}

interface Research {
  id: UnitId;
  level: number;
}

type Researchs = {
  [id in UnitId]: Research;
};

export interface ResearchNormalised {
  id: Partial<Researchs>,
  all: UnitId[]
}

interface Building {
  id: BuildingId;
  level: number;
  queuedLevel: number;
}

type Buildings = {
  [id in BuildingId]: Building
};

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
