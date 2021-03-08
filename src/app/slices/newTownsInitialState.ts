import { ResourceId, UnitId, BuildingId } from "../game/constants";
import {
  ResourcesNormalised, ResearchNormalised, BuildingsNormalised, UnitsNormalised, Queues,
} from "../../types/townStateTypes";

// interface Normalised<ById, AllIds> {
//   byId: ById,
//   allIds: AllIds[]
// }
const resources: ResourcesNormalised = {
  byId: {
    [ResourceId.Timber]: {
      id: ResourceId.Timber,
      amount: 500,
    },
    [ResourceId.Clay]: {
      id: ResourceId.Clay,
      amount: 500,
    },
    [ResourceId.Iron]: {
      id: ResourceId.Iron,
      amount: 500,
    },
  },
  allIds: [
    ResourceId.Timber,
    ResourceId.Clay,
    ResourceId.Iron,
  ],
};
const rps: ResourcesNormalised = {
  byId: {
    [ResourceId.Timber]: {
      id: ResourceId.Timber,
      amount: 0,
    },
    [ResourceId.Clay]: {
      id: ResourceId.Clay,
      amount: 0,
    },
    [ResourceId.Iron]: {
      id: ResourceId.Iron,
      amount: 0,
    },
  },
  allIds: [
    ResourceId.Timber,
    ResourceId.Clay,
    ResourceId.Iron,
  ],
};

const units = {
  byId: {
    [UnitId.SpearFighter]: {
      id: UnitId.SpearFighter,
      town: 100,
      total: 200,
    },
    [UnitId.Swordsman]: {
      id: UnitId.Swordsman,
      town: 200,
      total: 200,
    },
  },
  allIds: [
    UnitId.SpearFighter,
    UnitId.Swordsman,
  ],
};

const unlocked: ResearchNormalised = { // units / buildings maybe
  byId: {
    [UnitId.SpearFighter]: {
      id: UnitId.SpearFighter,
      level: 1,
    },
    [UnitId.Swordsman]: {
      id: UnitId.Swordsman,
      level: 1,
    },
    [UnitId.Axeman]: {
      id: UnitId.Axeman,
      level: 1,
    },
    [UnitId.Archer]: {
      id: UnitId.Archer,
      level: 1,
    },
  },
  allIds: [
    UnitId.SpearFighter,
    UnitId.Swordsman,
    UnitId.Axeman,
  ],
};

const buildings: BuildingsNormalised = {
  byId: {
    [BuildingId.TimberCamp]: {
      id: BuildingId.TimberCamp,
      level: 0,
      queuedLevel: 0,
    },
    [BuildingId.ClayPit]: {
      id: BuildingId.ClayPit,
      level: 6,
      queuedLevel: 6,
    },
    [BuildingId.IronMine]: {
      id: BuildingId.IronMine,
      level: 30,
      queuedLevel: 30,
    },
    [BuildingId.Headquarters]: {
      id: BuildingId.Headquarters,
      level: 23,
      queuedLevel: 23,
    },
    [BuildingId.Barracks]: {
      id: BuildingId.Barracks,
      level: 15,
      queuedLevel: 15,
    },
    [BuildingId.Stable]: {
      id: BuildingId.Stable,
      level: 0,
      queuedLevel: 0,
    },
    [BuildingId.Farm]: {
      id: BuildingId.Farm,
      level: 0,
      queuedLevel: 0,
    },
    [BuildingId.Warehouse]: {
      id: BuildingId.Warehouse,
      level: 0,
      queuedLevel: 0,
    },
    [BuildingId.Smithy]: {
      id: BuildingId.Smithy,
      level: 0,
      queuedLevel: 0,
    },
    [BuildingId.Workshop]: {
      id: BuildingId.Workshop,
      level: 0,
      queuedLevel: 0,
    },
  },
  allIds: [
    BuildingId.TimberCamp,
    BuildingId.ClayPit,
    BuildingId.IronMine,
    BuildingId.Headquarters,
    BuildingId.Barracks,
    BuildingId.Stable,
    BuildingId.Farm,
    BuildingId.Warehouse,
    BuildingId.Smithy,
    BuildingId.Workshop,
  ],
};

export interface TownInterface {
  id: string;
  name: string;
  resources: ResourcesNormalised;
  rps: ResourcesNormalised;
  queues: Queues;
  population: number;
  maxPopulation: number;
  storageCapacity: number;
  buildings: BuildingsNormalised;
  units: UnitsNormalised;
  unlocked: ResearchNormalised;
}

type TownsInterface = {
  [id: string]: TownInterface
};

export interface TownsNormalised {
  byId: TownsInterface,
  allIds: string[]
}

const testTown: TownInterface = {
  id: "0",
  // coords
  name: "Test village",
  resources,
  rps,
  queues: {
    buildings: {
      // [BuildingId.Headquarters]: [],
      // [BuildingId.Barracks]: [],
      // [BuildingId.Stable]: [],
    },
    units: {},
  },
  population: 400,
  maxPopulation: 900,
  storageCapacity: 20000,
  unlocked,
  units,
  buildings,
};

export const initialState: TownsNormalised = {
  byId: {
    // eslint-disable-next-line quote-props
    "0": testTown,
  },
  allIds: [
    "0",
  ],
};
