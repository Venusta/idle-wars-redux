import { UnitCost, ResearchCost, UnitRequirements } from "../../../types/types";
import { UnitId, WorldSpeed } from "../constants";

interface UnitProps {
  id: UnitId;
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
}

export class Unit {
  id: UnitId;
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
    this.cost = cost;
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
