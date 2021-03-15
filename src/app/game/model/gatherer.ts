import { ResourcesTuple } from "../../../types/types";
import { UnitCost } from "../../../types/townStateTypes";
import { tupleToNormalisedResources } from "../../util/tupleToNormalisedResources";
import { BuildingIdType, UnitIdGathererType, WorldSpeed } from "../constants";

interface GathererCostTuple {
  resources: ResourcesTuple;
  population: number;
}

interface ResearchCost {
  resources: ResourcesTuple;
}

type UnitRequirements = {
  buildings: Partial<Record<BuildingIdType, number>>
  research: boolean;
};

interface GathererProps {
  id: UnitIdGathererType;
  name: string;
  cost: GathererCostTuple;
  buildTime: number;
  speed: number;
  carries: number;
  // researchCost?: ResearchCost;
  // requirements?: UnitRequirements;
}

export class Gatherer {
  id: UnitIdGathererType;
  name: string;
  cost: UnitCost;
  buildTime: number;
  speed: number;
  carries: number;
  // researchCost?: ResearchCost;
  // requirements?: UnitRequirements;

  constructor({
    id, name, cost, buildTime, speed, carries,
  }: GathererProps) {
    this.id = id;
    this.name = name;
    this.cost = {
      population: cost.population,
      resources: tupleToNormalisedResources(cost.resources),
    };
    this.buildTime = buildTime;
    this.speed = speed;
    this.carries = carries;
  }
  getRecruitTime = (recruitmentBuildingLevel: number): number => (this.buildTime * (2 / 3) * 1.06 ** (-recruitmentBuildingLevel)) / WorldSpeed;
}
