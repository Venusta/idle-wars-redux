import { BuildingId, UnitId, ResourceId } from "../app/game/constants";

export interface Building {
  id: BuildingId;
  level: number;
  queuedLevel: number;
}

export type ResourceTuple = [ResourceId, number];
export type ResourcesTuple = ResourceTuple[];

export interface UnitCostTuple {
  resources: ResourcesTuple;
  population: number;
}

export interface ResearchCost {
  resources: ResourcesTuple;
}

export type Army = {
  [id in UnitId]?: number;
};

export interface ResourceProps {
  id: ResourceId;
  name: string;
}

export interface ResourceGenProps {
  timber?: number;
  clay?: number;
  iron?: number;
}

export type UnitLosses = {
  [id in UnitId]?: {
    total: number;
    loss?: number;
  }
};

const getKeys = Object.keys as <T extends Record<string, unknown>>(obj: T) => Array<keyof T>;

type RequireSome<T, K extends keyof T> = Required<Pick<T, K>> & T;
