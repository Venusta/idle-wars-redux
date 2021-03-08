import { Building } from "./building";
import { BuildingIdType } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: Array<BuildingIdType>;
}

export class ProductionBuilding extends Building {
  creates: Array<BuildingIdType>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
