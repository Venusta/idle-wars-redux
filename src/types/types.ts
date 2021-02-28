import { BuildingId, UnitId, ResourceId } from "../app/game/constants";

export interface Building {
  id: BuildingId;
  level: number;
  queuedLevel: number;
}

export interface Resources {
  timber: number;
  clay: number;
  iron: number;
}

export interface BuildingCost {
  resources: Resources;
  population: number;
}

export interface UnitCost {
  resources: Resources;
  population: number;
}

export interface ResearchCost {
  resources: Resources;
}

export type UnitRequirements = {
  buildings: {
    [id in BuildingId]?: number;
  },
  research: boolean;
};

export type BuildingList = {
  [id in BuildingId]: Building;
};

export type ResearchList = {
  [id in UnitId]?: number;
};

export type UnitList = {
  [id in UnitId]?: {
    town: number
    total: number
  };
};

export type Army = {
  [id in UnitId]?: number;
};

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

export interface TownsInterface {
  [id: string]: TownInterface;
}

export interface TownInterface {
  id: string;
  name: string;
  resources: Resources;
  rps: Resources;
  queues: Queues;
  population: number;
  maxPopulation: number;
  storageCapacity: number;
  buildings: BuildingList;
  units: UnitList;
  unlocked: ResearchList;
}

export interface ResourceProps {
  id: ResourceId;
  name: string;
}

export interface ResourceGenProps {
  timber?: number;
  clay?: number;
  iron?: number;
}

export type BuildingRequirements = {
  [id in BuildingId]?: number
};

export interface BuildingProps {
  id: BuildingId;
  name: string;
  description: string;
  cost: BuildingCost;
  maxLevel: number;
  buildTime: number;
  requirements?: BuildingRequirements;
}

export interface ResourceBuildingProps extends BuildingProps {
  generate: ResourceGenProps;
}

export interface ProductionBuildingProps extends BuildingProps {
  creates: Array<BuildingId>;
}

export interface UnitProductionBuildingProps extends BuildingProps {
  creates: Array<UnitId>;
}

export interface ResearchBuildingProps extends BuildingProps {
  researches: Array<UnitId>;
}

export type UnitLosses = {
  [id in UnitId]?: {
    total: number;
    loss?: number;
  }
};
