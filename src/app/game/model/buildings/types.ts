import { ResourcesTuple } from "../../../../types/types";
import { BuildingIdType } from "../../constants";

export type BuildingRequirements = {
  [id in BuildingIdType]?: number
};

interface BuildingCostTuple {
  resources: ResourcesTuple;
  population: number;
}

export interface BuildingProps {
  id: BuildingIdType;
  name: string;
  description: string;
  cost: BuildingCostTuple;
  maxLevel: number;
  buildTime: number;
  requirements?: BuildingRequirements;
}
