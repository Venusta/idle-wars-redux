/* eslint-disable @typescript-eslint/no-unused-vars */
import { TownInterface, Resources, ResearchList, UnitList, BuildingList, Building, Army } from "../../../types/types";
import { BuildingId, UnitId } from "../constants";
import { baseBuildings } from "../buildings";
import { ResourceBuilding } from "./resourceBuilding";
import { isUnitId } from "../utility";

const defaultResources = { timber: 0, clay: 0, iron: 0 };

const defaultBuilding = (id: BuildingId, level = 0) => ({
  id,
  level,
  queuedLevel: level,
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

  constructor({ id, name, resources = defaultResources }: TownInterface) {
    this.id = id
    this.name = name // todo random name
    this.resources = resources;
    this.unlocked = this.defaultUnlocks();
    this.units = {};
    this.buildings = this.defaultBuildings();
    this.rps = this.calculateResourcesPerSecond();
    this.population = this.getPopulation();
    this.maxPopulation = this.calculateMaxPopulation();
    this.storageCapacity = this.calculateStorageCapacity();
  };

  private defaultUnlocks(): ResearchList {
    return {
      [UnitId.SpearFighter]: 1,
      [UnitId.Swordsman]: 1
    }
  }

  public unlockUnits(units: UnitId | Array<UnitId>, researchLevel = 1): void {
    if (Array.isArray(units)) {
      for (const unit of units) {
        this.unlocked[unit] = researchLevel;
      }
    } else {
      this.unlocked[units] = researchLevel;
    }
  }

  private defaultBuildings(): BuildingList {
    return {
      [BuildingId.TimberCamp]: defaultBuilding(BuildingId.TimberCamp),
      [BuildingId.ClayPit]: defaultBuilding(BuildingId.ClayPit),
      [BuildingId.IronMine]: defaultBuilding(BuildingId.IronMine),
      [BuildingId.Barracks]: defaultBuilding(BuildingId.Barracks),
      [BuildingId.Stable]: defaultBuilding(BuildingId.Stable),
      [BuildingId.Farm]: defaultBuilding(BuildingId.Farm, 1),
      [BuildingId.Warehouse]: defaultBuilding(BuildingId.Warehouse, 1),
      [BuildingId.Headquarters]: defaultBuilding(BuildingId.Headquarters, 1),
    }
  }

  public setBuildingLevel(id: BuildingId, level: number): void {
    this.buildings[id].level = level;
    this.buildings[id].queuedLevel = level;
  }

  public addArmy(army: Army): void { // todo fix this mess
    for (const [unit, amount = 1] of  Object.entries(army)) {
      // if(unit === undefined) return;
      // if(this === undefined) return;
      // if(this.units === undefined) return;
      
      if (isUnitId(unit)) {
        if (this.units[unit] === undefined) {
          // if undefined do this
          this.units[unit] = {
            total: amount,
            town: amount,
          }
          // else  do this
          // this.units[unit].total += amount ?? 0;

        } else if (this.units[unit] !== undefined) {
          // this.units[unit]
        }
      }
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
