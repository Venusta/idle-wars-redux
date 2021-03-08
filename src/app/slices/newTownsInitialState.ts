/* eslint-disable quote-props */
import { ResourceId, UnitId, BuildingId } from "../game/constants";
import {
  ResourcesNormalised, ResearchNormalised, BuildingsNormalised, UnitsNormalised, Queues,
} from "../../types/townStateTypes";

// interface Normalised<ById, AllIds> {
//   byId: ById,
//   allIds: AllIds[]
// }
const resources: ResourcesNormalised = {
  id: {
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
  all: [
    ResourceId.Timber,
    ResourceId.Clay,
    ResourceId.Iron,
  ],
};
const rps: ResourcesNormalised = {
  id: {
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
  all: [
    ResourceId.Timber,
    ResourceId.Clay,
    ResourceId.Iron,
  ],
};

const units: UnitsNormalised = {
  id: {
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
  all: [
    UnitId.SpearFighter,
    UnitId.Swordsman,
  ],
};

const unlocked: ResearchNormalised = { // units / buildings maybe
  id: {
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
  all: [
    UnitId.SpearFighter,
    UnitId.Swordsman,
    UnitId.Axeman,
  ],
};

const buildings: BuildingsNormalised = {
  id: {
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
  all: [
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
  id: TownsInterface,
  all: string[]
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

const testTown2: TownInterface = {
  ...testTown,
  id: "1",
  name: "Second village",
};
const testTown3: TownInterface = {
  ...testTown,
  id: "2",
  name: "Third village",
};

export const initialState: TownsNormalised = {
  id: {
    "0": testTown,
    "1": testTown2,
    "2": testTown3,
  },
  all: ["0", "1", "2"],
};
