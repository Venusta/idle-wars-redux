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

export interface Cost {
  resources: Resources;
  population?: number;
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

export interface Towns {
  [id: string]: Town;
}

export interface Town {
  resources: Resources;
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
  cost: Cost;
  maxLevel: number;
  buildTime: number;
  requirements?: any;
}

export interface ResourceBuildingProps extends BuildingProps {
  generate: ResourceGenProps;
}

export interface ProductionBuildingProps extends BuildingProps {
  creates: ResourceGenProps;
}