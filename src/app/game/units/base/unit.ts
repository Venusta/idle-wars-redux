import { ResourcesProps } from "../../../../types/types";;

interface UnitProps {
  id: number;
  name: string;
  cost: ResourcesProps;
  buildTime: number;
  speed: number;
  atkType: number;
  atk: number;
  def: number; 
  defCav: number;
  defArc: number;
  carries: number;
  researchCost?: ResourcesProps;
  requirements?: any;
}

export class Unit {
  id: number;
  name: string;
  cost: ResourcesProps;
  buildTime: number;
  speed: number;
  atkType: number;
  atk: number;
  def: number; 
  defCav: number;
  defArc: number;
  carries: number;
  researchCost?: ResourcesProps;
  requirements?: any;

  constructor({ id, name, cost, buildTime, speed, atkType, atk, def, defCav, defArc, carries, researchCost, requirements }: UnitProps) {
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
}
