import { BuildingId } from "../app/game/constants";

export interface Building {
  buildingId: number
  level: number
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

export type Population = number

// export interface BuildingListtest {
//   keys: Array<BuildingId>;
//   [x: BuildingId]: Building;
// }


// export interface BuildingListtest {
//   keys: Array<BuildingId>;
//   [x: BuildingId]: Building;
// }
export type BuildingList = {
  [x in BuildingId]: Building;
};


export interface Town {
  resources: Resources;
  population: number;
  buildings: BuildingList
  buildingKeys: 
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