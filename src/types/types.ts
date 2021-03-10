import { BuildingIdType, UnitIdType, ResourceIdType } from "../app/game/constants";

export interface Building {
  id: BuildingIdType;
  level: number;
  queuedLevel: number;
}

export type ResourceTuple = [ResourceIdType, number];
export type ResourcesTuple = ResourceTuple[];

export interface UnitCostTuple {
  resources: ResourcesTuple;
  population: number;
}

export interface ResearchCost {
  resources: ResourcesTuple;
}

export type Army = {
  [id in UnitIdType]?: number;
};

export interface ResourceProps {
  id: ResourceIdType;
  name: string;
}

export interface ResourceGenProps {
  timber?: number;
  clay?: number;
  iron?: number;
}

export type UnitLosses = {
  [id in UnitIdType]?: {
    total: number;
    loss?: number;
  }
};

const getKeys = Object.keys as <T extends Record<string, unknown>>(obj: T) => Array<keyof T>;

type RequireSome<T, K extends keyof T> = Required<Pick<T, K>> & T;
