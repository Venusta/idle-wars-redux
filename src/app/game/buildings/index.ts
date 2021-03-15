import { BuildingId } from "../constants";
import { FarmBuilding } from "../model/buildings/farmBuilding";
import { ProductionBuilding } from "../model/buildings/productionBuilding";
import { ResourceBuilding } from "../model/buildings/resourceBuilding";
import { StorageBuilding } from "../model/buildings/storageBuilding";
import { UnitProductionBuilding } from "../model/buildings/unitProductionBuilding";
import { ResearchBuilding } from "../model/buildings/researchBuilding";
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
import { statue } from "./statue";
import { academy } from "./academy";
import { lumberCamp } from "./lumberCamp";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BaseBuildings { // TODO FIX useless :(
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

// type BaseBuildings = Record<BuildingIdType, ???>;

export const baseBuildings = {
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
  [BuildingId.Statue]: statue,
  [BuildingId.Academy]: academy,
  [BuildingId.LumberCamp]: lumberCamp,
};
