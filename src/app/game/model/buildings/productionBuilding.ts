import { Building } from "./building";
import { BuildingId } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: Array<BuildingId>;
}

export class ProductionBuilding extends Building {
  creates: Array<BuildingId>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
