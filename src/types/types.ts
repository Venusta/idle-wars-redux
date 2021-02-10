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

export type BuildingList = {
  [id in BuildingId]: Building;
};

export type ResearchList = {
  [id in UnitId]?: number;
}

export type UnitList = {
  [id in UnitId]?: { town: number, total: number };
}

export interface TownsInterface {
  [id: string]: TownInterface;
}

export interface TownInterface {
  id: string;
  name: string;
  resources: Resources;
  rps: Resources;
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

export interface BuildingProps {
  id: BuildingId;
  name: string;
  description: string;
  cost: BuildingCost;
  maxLevel: number;
  buildTime: number;
  requirements?: any;
}

export interface ResourceBuildingProps extends BuildingProps {
  generate: ResourceGenProps;
}

export interface ProductionBuildingProps extends BuildingProps {
  creates: Array<UnitId | BuildingId>;
}