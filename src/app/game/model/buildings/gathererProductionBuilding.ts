import { Building } from "./building";
import { UnitIdGathererType } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: readonly UnitIdGathererType[];
}

export class GathererProductionBuilding extends Building {
  creates: readonly UnitIdGathererType[];

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
