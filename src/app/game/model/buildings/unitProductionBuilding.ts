import { Building } from "./building";
import {
  UnitIdProductionType, UnitIdStable, UnitIdBarracks, UnitIdWorkshop,
} from "../../constants";
import { BuildingProps } from "./types";

interface Props extends BuildingProps {
  creates: typeof UnitIdStable | typeof UnitIdBarracks | typeof UnitIdWorkshop;
}

export class UnitProductionBuilding extends Building {
  creates: UnitIdProductionType[];

  constructor({
    id, name, description, cost, maxLevel, buildTime, creates,
  }: Props) {
    super({
      id, name, description, cost, maxLevel, buildTime,
    });
    this.creates = Object.values(creates).map((value) => value);
  }
}
