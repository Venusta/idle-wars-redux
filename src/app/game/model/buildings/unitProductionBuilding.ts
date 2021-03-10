import { Building } from "./building";
import { UnitIdProduction } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: Array<UnitIdProduction>;
}

export class UnitProductionBuilding extends Building {
  creates: Array<UnitIdProduction>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
