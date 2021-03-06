import { ResourcesTuple } from "../../../types/types";
import { UnitCost } from "../../../types/townStateTypes";
import { tupleToNormalisedResources } from "../../util/tupleToNormalisedResources";
import { BuildingIdType, UnitIdType, WorldSpeed } from "../constants";

interface UnitCostTuple {
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

interface UnitProps {
  id: UnitIdType;
  name: string;
  cost: UnitCostTuple;
  buildTime: number;
  speed: number;
  atkType: number;
  atk: number;
  def: number;
  defCav: number;
  defArc: number;
  carries: number;
  researchCost?: ResearchCost;
  requirements?: UnitRequirements;
}

export class Unit {
  id: UnitIdType;
  name: string;
  cost: UnitCost;
  buildTime: number;
  speed: number;
  atkType: number;
  atk: number;
  def: number;
  defCav: number;
  defArc: number;
  carries: number;
  researchCost?: ResearchCost;
  requirements?: UnitRequirements;

  constructor({
    id, name, cost, buildTime, speed, atkType, atk, def, defCav, defArc, carries, researchCost, requirements,
  }: UnitProps) {
    this.id = id;
    this.name = name;
    this.cost = {
      population: cost.population,
      resources: tupleToNormalisedResources(cost.resources),
    };
    this.buildTime = buildTime;
    this.speed = speed;
    this.atkType = atkType;
    this.atk = atk;
    this.def = def;
    this.defCav = defCav;
    this.defArc = defArc;
    this.carries = carries;
    this.researchCost = researchCost;
    this.requirements = requirements;
  }
  getRecruitTime = (recruitmentBuildingLevel: number): number => (this.buildTime * (2 / 3) * 1.06 ** (-recruitmentBuildingLevel)) / WorldSpeed;
}
