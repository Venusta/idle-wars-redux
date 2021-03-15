import { GathererId, ResourceId } from "../../constants";
import { Gatherer } from "../../model/gatherer";

export const lumberjack = new Gatherer({
  id: GathererId.Lumberjack,
  name: "Lumberjack",
  cost: {
    resources: [
      [ResourceId.Timber, 100],
      [ResourceId.Clay, 30],
      [ResourceId.Iron, 60],
    ],
    population: 1,
  },
  buildTime: 1200,
  speed: 18,
  carries: 10,
  // researchCost: {
  //   resources: [
  //     [ResourceId.Timber, 640],
  //     [ResourceId.Clay, 560],
  //     [ResourceId.Iron, 740],
  //   ],
  // },
  // requirements: {
  //   buildings: {
  //     [BuildingId.Smithy]: 5,
  //     [BuildingId.Barracks]: 5,
  //   },
  //   research: true,
  // },
});
