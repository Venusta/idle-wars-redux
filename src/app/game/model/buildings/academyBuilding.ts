import { UnitIdAcademyType } from "../../constants";
import { Building } from "./building";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: Array<UnitIdAcademyType>;
}

export class AcademyBuilding extends Building {
  creates: Array<UnitIdAcademyType>;

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
