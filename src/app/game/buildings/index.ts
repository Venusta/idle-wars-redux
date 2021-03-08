import { BuildingId } from "../constants";
import { FarmBuilding } from "../model/farmBuilding";
import { ProductionBuilding } from "../model/productionBuilding";
import { ResourceBuilding } from "../model/resourceBuilding";
import { StorageBuilding } from "../model/storageBuilding";
import { UnitProductionBuilding } from "../model/unitProductionBuilding";
import { ResearchBuilding } from "../model/researchBuilding";
import { timberCamp } from "./timberCamp";
import { clayPit } from "./clayPit";
import { ironMine } from "./ironMine";
import { stable } from "./stable";
import { barracks } from "./barracks";
import { headquarters } from "./headquarters";
import { warehouse } from "./warehouse";
import { farm } from "./farm";
import { smithy } from "./smithy";
import { workshop } from "./workshop";

interface BaseBuildings {
  timbercamp: ResourceBuilding;
  claypit: ResourceBuilding;
  ironmine: ResourceBuilding;
  headquarters: ProductionBuilding;
  barracks: UnitProductionBuilding;
  stable: UnitProductionBuilding;
  warehouse: StorageBuilding;
  farm: FarmBuilding;
  smithy: ResearchBuilding;
  workshop: UnitProductionBuilding;
}

export const baseBuildings: BaseBuildings = {
  [BuildingId.TimberCamp]: timberCamp,
  [BuildingId.ClayPit]: clayPit,
  [BuildingId.IronMine]: ironMine,
  [BuildingId.Headquarters]: headquarters,
  [BuildingId.Barracks]: barracks,
  [BuildingId.Stable]: stable,
  [BuildingId.Warehouse]: warehouse,
  [BuildingId.Farm]: farm,
  [BuildingId.Smithy]: smithy,
  [BuildingId.Workshop]: workshop,
};
