import { Building } from "./building";
import { BuildingProps } from "../../../types/types";
import { ResourceId } from "../constants"

interface Props extends BuildingProps {
  creates: ResourceId[]
}

export class ResourceBuilding extends Building {
  creates: ResourceId[];

  constructor({ id, name, description, cost, maxLevel, buildTime, creates }: Props) {
    super({ id, name, description, cost, maxLevel, buildTime })
    this.creates = creates;
  }

  getResourceGeneration(level: number): number {
    let resourceAmount = 5;
    if (level > 0) {
      resourceAmount = 30 * 1.163118 ^ (level - 1)
    }
    return resourceAmount;
  }
};
