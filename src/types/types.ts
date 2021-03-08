import { BuildingId, UnitId, ResourceId } from "../app/game/constants";

export interface Building {
  id: BuildingId;
  level: number;
  queuedLevel: number;
}

// export interface Resources {
//   timber: number;
//   clay: number;
//   iron: number;
// }

export type ResourceTuple = [ResourceId, number];
export type ResourcesTuple = ResourceTuple[];

export interface BuildingCostTuple {
  resources: ResourcesTuple;
  population: number;
}

export interface UnitCostTuple {
  resources: ResourcesTuple;
  population: number;
}

export interface ResearchCost {
  resources: ResourcesTuple;
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

// export interface TownsInterface {
//   [id: string]: TownInterface;
// }

// export interface TownInterface {
//   id: string;
//   name: string;
//   resources: ResourcesTuple;
//   rps: ResourcesTuple;
//   queues: Queues;
//   population: number;
//   maxPopulation: number;
//   storageCapacity: number;
//   buildings: BuildingList;
//   units: UnitList;
//   unlocked: ResearchList;
// }

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
  cost: BuildingCostTuple;
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

const getKeys = Object.keys as <T extends Record<string, unknown>>(obj: T) => Array<keyof T>;

type RequireSome<T, K extends keyof T> = Required<Pick<T, K>> & T;