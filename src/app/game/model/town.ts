import { TownInterface, Resources, ResearchList, UnitList, BuildingList } from "../../../types/types";
import { BuildingId } from "../constants";
import { baseBuildings } from "../buildings";
import { ResourceBuilding } from "./resourceBuilding";

const defaultResources = { timber: 0, clay: 0, iron: 0 };

export class Town {
  name: string;
  id: string;
  resources: Resources;
  rps: Resources;
  population: number;
  maxPopulation: number;
  storageCapacity: number;
  unlocked: ResearchList;
  units: UnitList;
  buildings: BuildingList;

  constructor({ id, name, resources = defaultResources, unlocked, units, buildings }: TownInterface) {
    this.id = id
    this.name = name // todo random name
    this.resources = resources;
    this.buildings = buildings;
    this.unlocked = unlocked;
    this.units = units;
    this.rps = this.calculateResourcesPerSecond();
    this.population = this.getPopulation();
    this.maxPopulation = this.calculateMaxPopulation();
    this.storageCapacity = this.calculateStorageCapacity();
  };

  private getPopulation(): number {
    let totalWorkers = 0;
    Object.values(this.buildings).forEach((building) => {
      const buildingData = baseBuildings[building.id];
      totalWorkers += buildingData.getCost(building.level).population;
    });
    return totalWorkers;
  }

  private calculateMaxPopulation(): number {
    const farmData = baseBuildings[BuildingId.Farm];
    return farmData.getMaxPopulation(this.buildings[BuildingId.Farm].level);
  }

  private calculateStorageCapacity(): number {
    const warehouseData = baseBuildings[BuildingId.Warehouse];
    return warehouseData.getStorageCapacity(this.buildings[BuildingId.Warehouse].level);
  }

  private calculateResourcesPerSecond(): Resources {

    // Object.values(this.buildings).forEach(({ id, level }) => { // TODO FIX
    //   const buildingData = baseBuildings[id];

    //   if (buildingData instanceof ResourceBuilding) {
    //     const newResourcesPerSecond = buildingData.getResourceGeneration(level);
    //     buildingData.creates.forEach((resource) => {
    //       this.rps[resource] += newResourcesPerSecond;
    //       console.log(`Adding: ${newResourcesPerSecond}`);
    //       console.log(`${resource} is now ${this.rps[resource]} per second`);
    //     });
    //   };

    // })

    return { timber: 0, clay: 0, iron: 0 };
  }

  public toRedux(): TownInterface {
    const {
      id, name, resources, buildings, unlocked, units, rps, population, maxPopulation, storageCapacity
    } = this;

    return {
      id,
      name,
      resources,
      buildings,
      unlocked,
      units,
      rps,
      population,
      maxPopulation,
      storageCapacity,
    }
  }

};
