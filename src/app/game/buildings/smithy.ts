import { BuildingId, ResourceId, UnitId } from "../constants";
import { ResearchBuilding } from "../model/buildings";

export const smithy = new ResearchBuilding({
  id: BuildingId.Smithy,
  name: "Smithy",
  description: "In the smithy you can research and improve weapons. Upgrading the smithy allows the research of better weapons and decreases the research time. The total number of researches is limited. To make room for another research you can revoke research levels, but be careful, resources will not be refunded.",
  cost: {
    resources: [
      [ResourceId.Timber, 270],
      [ResourceId.Clay, 240],
      [ResourceId.Iron, 260],
    ],
    population: 8,
  },
  maxLevel: 30,
  buildTime: 300,
  researches: [
    UnitId.SpearFighter,
    UnitId.Swordsman,
    UnitId.Axeman,
    UnitId.Archer,
    UnitId.Scout,
    UnitId.LightCavalry,
    UnitId.HeavyCavalry,
    UnitId.Ram,
    UnitId.Catapult,
  ],
});
