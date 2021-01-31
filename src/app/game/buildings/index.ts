import { timberCamp } from "./timberCamp"
import { clayPit } from "./clayPit";
import { ironMine } from "./ironMine";
import { BuildingId } from "../constants";

const buildings = [
  timberCamp,
  clayPit,
  ironMine
]

export const getBuildingData = (id: BuildingId) => {
  return buildings.find(building => building.id === id);
};