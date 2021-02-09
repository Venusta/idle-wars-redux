import { timberCamp } from "./timberCamp"
import { clayPit } from "./clayPit";
import { ironMine } from "./ironMine";
import { stable } from "./stable";
import { barracks } from "./barracks";
import { headquarters } from "./headquarters";
import { BuildingId } from "../constants";
import { warehouse } from "./warehouse";
import { farm } from "./farm";

export const baseBuildings = {
  [BuildingId.TimberCamp]: timberCamp,
  [BuildingId.ClayPit]: clayPit,
  [BuildingId.IronMine]: ironMine,
  [BuildingId.Headquarters]: headquarters,
  [BuildingId.Barracks]: barracks,
  [BuildingId.Stable]: stable,
  [BuildingId.Warehouse]: warehouse,
  [BuildingId.Farm]: farm,
}
