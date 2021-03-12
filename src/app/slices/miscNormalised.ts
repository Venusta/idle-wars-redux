/* eslint-disable no-useless-computed-key */
import {
  BuildingId, UnitId, UnitIdBarracksType, UnitIdProductionType, UnitIdStableType, UnitIdType, UnitIdWorkshopType, UnitProductionBuildingIdType,
} from "../game/constants";

const form = {
  recruit: {
    id: {
      [BuildingId.Barracks]: {
        id: BuildingId.Barracks,
        units: {
          id: {
            [UnitId.Archer]: {
              unitId: UnitId.Archer,
              amount: 1,
            },
            [UnitId.Swordsman]: {
              unitId: UnitId.Swordsman,
              amount: 1,
            },
          },
          all: [UnitId.Archer, UnitId.Swordsman],
        },
      },
      [BuildingId.Stable]: {
        id: BuildingId.Stable,
        units: {
          id: {

            [UnitId.HeavyCavalry]: {
              unitId: UnitId.HeavyCavalry,
              amount: 2,
            },
          },
          all: [UnitId.HeavyCavalry],
        },
      },
      [BuildingId.Workshop]: {
        id: BuildingId.Workshop,
        units: {
          id: {},
          all: [],
        },
      },
    },
    all: [BuildingId.Barracks, BuildingId.Stable, BuildingId.Workshop],
  },
};

interface FBData {
  id: UnitProductionBuildingIdType
  units: UnitIdType[]
}

interface FBNormalised {
  id: Record<UnitProductionBuildingIdType, FBData>
}

interface FormNew {
  buildings: {
    id: Record<
    UnitProductionBuildingIdType, {
      id: UnitProductionBuildingIdType
      units: UnitIdBarracksType[] | UnitIdStableType[] | UnitIdWorkshopType[]
    }>,
    all: UnitProductionBuildingIdType[]
  },
  units: {
    id: Partial<Record<
    UnitIdProductionType, {
      id: UnitIdProductionType
      amount: number
    }>>
    all: UnitIdProductionType[]
  }
}

const formNew: FormNew = {
  // recruit: {
  buildings: {
    id: {
      // [RecruitBuilding]: {
      //   id: RecruitBuilding,
      //   units: [UnitId.Archer, UnitId.Swordsman, UnitId.HeavyCavalry],
      // },
      [BuildingId.Barracks]: {
        id: BuildingId.Barracks,
        units: [UnitId.Archer, UnitId.Swordsman],
      },
      [BuildingId.Stable]: {
        id: BuildingId.Stable,
        units: [UnitId.HeavyCavalry],
      },
      [BuildingId.Workshop]: {
        id: BuildingId.Workshop,
        units: [],
      },
    },
    all: [BuildingId.Barracks, BuildingId.Stable, BuildingId.Workshop],
  },
  units: {
    id: {
      [UnitId.Archer]: {
        id: UnitId.Archer,
        amount: 2,
      },
      [UnitId.Swordsman]: {
        id: UnitId.Swordsman,
        amount: 1,
      },
      [UnitId.HeavyCavalry]: {
        id: UnitId.HeavyCavalry,
        amount: 1,
      },
    },
    all: [UnitId.Archer, UnitId.Swordsman, UnitId.HeavyCavalry],
  },
  // },
};

const getAllBuildingForms = formNew.buildings.all.map((id) => {
  const x = formNew.buildings.id[id];
  return formNew.buildings.id[id];
});

interface FormsRecruitUnits {
  id: Record<UnitIdProductionType, {
    id: UnitIdProductionType
    amount?: number
  }>
  all: UnitIdProductionType[]
}

interface FormsRecruit {
  recruit: {
    units: FormsRecruitUnits
  }
}

const formsUnits: FormsRecruit = {
  recruit: {
    units: {
      id: {
        [UnitId.Archer]: {
          id: UnitId.Archer,
        },
        [UnitId.Swordsman]: {
          id: UnitId.Swordsman,
          amount: 1,
        },
        [UnitId.SpearFighter]: {
          id: UnitId.SpearFighter,
        },
        [UnitId.HeavyCavalry]: {
          id: UnitId.HeavyCavalry,
          amount: 1,
        },
        [UnitId.Scout]: {
          id: UnitId.Scout,
          amount: 1,
        },
        [UnitId.Axeman]: {
          id: UnitId.Axeman,
        },
        [UnitId.LightCavalry]: {
          id: UnitId.LightCavalry,
          amount: 1,
        },
        [UnitId.Ram]: {
          id: UnitId.Ram,
          amount: 1,
        },
        [UnitId.Catapult]: {
          id: UnitId.Catapult,
          amount: 1,
        },
        [UnitId.MountedArcher]: {
          id: UnitId.MountedArcher,
          amount: 1,
        },
      },
      all: [UnitId.Archer, UnitId.Swordsman, UnitId.HeavyCavalry],
    },
  },
};
