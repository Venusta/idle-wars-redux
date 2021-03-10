import { BuildingId, ResourceId, UnitIdWorkshop } from "../constants";
import { UnitProductionBuilding } from "../model/buildings";

export const workshop = new UnitProductionBuilding({
  id: BuildingId.Workshop,
  name: "Workshop",
  description: "In the workshop you can produce rams and catapults. The higher its level the faster the recruitment will be finished.",
  cost: {
    resources: [
      [ResourceId.Timber, 300],
      [ResourceId.Clay, 240],
      [ResourceId.Iron, 260],
    ],
    population: 8,
  },
  maxLevel: 30,
  buildTime: 300, // ?? fix
  creates: UnitIdWorkshop,
});
