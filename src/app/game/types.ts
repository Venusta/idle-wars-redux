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