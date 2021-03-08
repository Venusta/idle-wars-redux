import { Building } from "./building";
import { UnitId } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: Array<UnitId>;
}

export class UnitProductionBuilding extends Building {
  creates: Array<UnitId>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
