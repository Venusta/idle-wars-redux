import { ResourcesTuple } from "../../../../types/types";
import { BuildingId } from "../../constants";

export type BuildingRequirements = {
  [id in BuildingId]?: number
};

interface BuildingCostTuple {
  resources: ResourcesTuple;
  population: number;
}

export interface BuildingProps {
  id: BuildingId;
  name: string;
  description: string;
  cost: BuildingCostTuple;
  maxLevel: number;
  buildTime: number;
  requirements?: BuildingRequirements;
}
