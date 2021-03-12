import { Building } from "./building";
import { UnitIdBarracksType, UnitIdProductionType, UnitIdStableType, UnitIdWorkshopType } from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: readonly UnitIdBarracksType[] | readonly UnitIdStableType[] | readonly UnitIdWorkshopType[];
}

export class UnitProductionBuilding extends Building {
  creates: readonly UnitIdProductionType[];

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = creates;
  }
}
