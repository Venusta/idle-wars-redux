import { BuildingId } from "../app/game/constants";
import { townSlice } from "../app/slices/towns";

export interface Building {
  buildingId: number;
  level: number;
  queuedLevel: number;
}

export interface Resources {
  timber: number;
  clay: number;
  iron: number;
}

export interface Cost {
  resources: {
    timber: number;
    clay: number;
    iron: number;
  },
  population: number;
}

// export type BuildingList = {
//   [x in BuildingId]: Building;
// } & {
//   keys: Array<BuildingId>;
// };

export type BuildingList = {
  [id in BuildingId]: Building
};

export interface Towns {
  [id: string]: Town
}

export interface Town {
  resources: Resources;
  population: number;
  maxPopulation: number;
  storageCapacity: number;
  buildings: BuildingList
}

export interface ResourcesProps {
  timber?: number;
  clay?: number;
  iron?: number;
  population?: number;
}
export interface ResourceProps {
  id: number;
  name: string;
}

export interface ResourceGenProps {
  timber?: number;
  clay?: number;
  iron?: number;
}

export interface BuildingProps {
  id: number;
  name: string;
  cost: ResourcesProps;
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