import { Building } from "./building";
import { BuildingProps } from "./types";
import { ResourceId, WorldSpeed } from "../../constants";

interface Props extends BuildingProps {
  creates: ResourceId[]
}

export class ResourceBuilding extends Building {
  creates: ResourceId[];

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
  // todo move this function
  // eslint-disable-next-line class-methods-use-this
  getResourceGeneration(level: number): number {
    let resourceAmount = 5;
    if (level > 0) {
      resourceAmount = (30 * 1.163118 ** (level - 1));
    }
    return (resourceAmount * WorldSpeed) / 3600;
  }
}
