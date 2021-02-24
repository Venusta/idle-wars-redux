/* eslint-disable @typescript-eslint/no-unused-vars */
import { TownInterface, Resources, ResearchList, UnitList, BuildingList, Building, Army, Queues } from "../../../types/types";
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
  queues: Queues;
  maxPopulation: number;
  storageCapacity: number;
  unlocked: ResearchList;
  units: UnitList;
  buildings: BuildingList;

  constructor(id: string, name: string, resources = defaultResources) {
    this.id = id
    this.name = name // todo random name
    this.resources = resources;
    this.queues = {}
    this.unlocked = this.defaultUnlocks();
    this.units = {
      [UnitId.SpearFighter]: {
        town: 100,
        total: 200,
      },
      [UnitId.Swordsman]: {
        town: 200,
        total: 200,
      },
    }
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

  public addUnit(unit: UnitId, amount = 1) {
    console.log("@@@@@@@@@@");
    const units = this.units
    if (unit in units) {
      const x = units[unit]

      if (x !== undefined) {
        x.total += amount;
        x.town += amount;
      }
      this.units = units;

    } else {
      this.units[unit] = {
        total: amount,
        town: amount,
      }
    }
    console.log(unit, amount);
  }

  public addArmy(army: Army): void { // todo fix this mess   
    console.log("-----------------");
    console.log("Before: ");
    console.log(this.units);
    const mergedDefences = { ...this.units };

    Object.entries((army)).forEach(([unit, amount = 0]) => {
      if (isUnitId(unit)) {
        const newAmounts = { total: 0, town: 0 };
        newAmounts.total += (mergedDefences[unit]?.total ?? 0) + amount;
        newAmounts.town += (mergedDefences[unit]?.town ?? 0) + amount;
        mergedDefences[unit] = { ...newAmounts };
      }
    })

    this.units = mergedDefences;
    console.log("After: ");
    console.log(this.units);
    console.log("-----------------");


    // for (const [unit, amount = 1] of  Object.entries(army)) {
    //   // if(unit === undefined) return;
    //   // if(this === undefined) return;
    //   // if(this.units === undefined) return;
    //   const y = this.units[unit];
    //   if (isUnitId(unit)) {
    //     if (this.units[unit] === undefined) {
    //       // if undefined do this
    //       this.units[unit] = {
    //         total: amount,
    //         town: amount,
    //       }
    //       // else  do this
    //       // this.units[unit].total += amount ?? 0;

    //     }
    //     if(this.units[unit] !== undefined) {
    //       const idk = this.units[unit];
    //       this.units[unit].total += 100;
    //       // this.units[unit]
    //     }
    //   }
    // }
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
          // console.log(`Adding: ${newResourcesPerSecond}`);
          // console.log(`${resource} for ${this.id} is now ${rps[resource]} per second`);
        });
      };
    })
    return rps;
  }

  public toRedux(): TownInterface {
    const {
      id, name, resources, buildings, unlocked, units, rps, population, maxPopulation, storageCapacity, queues
    } = this;

    return {
      id,
      name,
      resources,
      queues,
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
