/* eslint-disable @typescript-eslint/no-unused-vars */
import { TownInterface, Resources, ResearchList, UnitList, BuildingList, Building } from "../../../types/types";
import { BuildingId, UnitId } from "../constants";
import { baseBuildings } from "../buildings";
import { ResourceBuilding } from "./resourceBuilding";

const defaultResources = { timber: 0, clay: 0, iron: 0 };

const defaultBuilding = (id: BuildingId, level = 0, queuedLevel = 0) => ({
  id,
  level,
  queuedLevel,
})

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

  constructor({ id, name, resources = defaultResources, unlocked, units }: TownInterface) {
    this.id = id
    this.name = name // todo random name
    this.resources = resources;
    this.unlocked = unlocked;
    this.units = units;
    this.buildings = this.defaultBuildings();
    this.rps = this.calculateResourcesPerSecond();
    this.population = this.getPopulation();
    this.maxPopulation = this.calculateMaxPopulation();
    this.storageCapacity = this.calculateStorageCapacity();
  };

  private defaultUnlocks(): ResearchList {
    return {
      [UnitId.SpearFighter]: 1,
      
    }
  }

  private defaultBuildings(): BuildingList {
    return {
      [BuildingId.TimberCamp]: defaultBuilding(BuildingId.TimberCamp),
      [BuildingId.ClayPit]: defaultBuilding(BuildingId.ClayPit),
      [BuildingId.IronMine]: defaultBuilding(BuildingId.IronMine),
      [BuildingId.Barracks]: defaultBuilding(BuildingId.Barracks),
      [BuildingId.Stable]: defaultBuilding(BuildingId.Stable),
      [BuildingId.Farm]: defaultBuilding(BuildingId.Farm),
      [BuildingId.Warehouse]: defaultBuilding(BuildingId.Warehouse),
      [BuildingId.Headquarters]: defaultBuilding(BuildingId.Headquarters),
    }
  }

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
    const rps: Resources = { timber: 0, clay: 0, iron: 0 }
    Object.values(this.buildings).forEach(({ id, level }) => {
      const buildingData = baseBuildings[id];

      if (buildingData instanceof ResourceBuilding) {
        const newResourcesPerSecond = buildingData.getResourceGeneration(level);
        buildingData.creates.forEach((resource) => {
          rps[resource] += newResourcesPerSecond;
          console.log(`Adding: ${newResourcesPerSecond}`);
          console.log(`${resource} for ${this.id} is now ${rps[resource]} per second`);
        });
      };
    })
    return rps;
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
