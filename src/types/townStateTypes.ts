import { ResourceId, UnitId, BuildingId } from "../app/game/constants";

interface Resource {
  id: ResourceId;
  amount: number;
}

export type Resources = {
  [id in ResourceId]: Resource;
};

export interface ResourcesNormalised {
  byId: Partial<Resources>,
  allIds: ResourceId[]
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
  byId: Partial<Units>,
  allIds: UnitId[]
}

interface Research {
  id: UnitId;
  level: number;
}

type Researchs = {
  [id in UnitId]: Research;
};

export interface ResearchNormalised {
  byId: Partial<Researchs>,
  allIds: UnitId[]
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
  byId: Buildings,
  allIds: BuildingId[]
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
