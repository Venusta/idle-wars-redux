import { Resources } from "../../../types/types";
import { addResources } from "../../slices/towns";
import { store } from "../../store";
import { baseBuildings } from "../buildings";
import { ResourceBuilding } from "../model/resourceBuilding";

export const handleResourceGeneration = () => {
  const state = store.getState();
  const dispatch = store.dispatch;
  const towns = state.towns;
  Object.entries(towns).forEach(([townId, town]) => {
    const generated: Resources = { timber: 0, clay: 0, iron: 0 };
    Object.values(town.buildings).forEach((building) => {
      const buildingData = baseBuildings[building.id];
      if (buildingData instanceof ResourceBuilding) {
        buildingData.creates.forEach((resource) => {
          generated[resource] += buildingData.getResourceGeneration(building.level); // per second
        });
      };
    });
    dispatch(addResources({ townId, resources: generated }));
  })
};
