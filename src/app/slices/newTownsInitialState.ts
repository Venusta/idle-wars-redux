import { Queues } from "../../types/types";
import { ResourceId, UnitId, BuildingId } from "../game/constants";

interface Resource {
  id: ResourceId;
  amount: number;
}

type Resources = {
  [id in ResourceId]: Resource;
};

export interface ResourcesNormalised {
  byId: Partial<Resources>,
  allIds: ResourceId[]
}

interface Unit {
  id: UnitId;
  town: number;
  total: number;
}

type Units = {
  [id in UnitId]?: Unit;
};

export interface UnitsNormalised {
  byId: Partial<Units>,
  allIds: UnitId[]
}

interface Research {
  id: UnitId;
  level: number;
}

type Researchs = {
  [id in UnitId]: Research;
};

export interface ResearchNormalised {
  byId: Partial<Researchs>,
  allIds: UnitId[]
}

interface Building {
  id: BuildingId;
  level: number;
  queuedLevel: number;
}

type Buildings = {
  [id in BuildingId]: Building
};

export interface BuildingsNormalised {
  byId: Buildings,
  allIds: BuildingId[]
}

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
      level: 0,
    },
    [UnitId.Axeman]: {
      id: UnitId.Axeman,
      level: 0,
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
  ],
};

interface TownInterface {
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

type TownIntersface = {
  [id: string]: TownInterface
};

interface TownsNormalised {
  byId: TownIntersface,
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
