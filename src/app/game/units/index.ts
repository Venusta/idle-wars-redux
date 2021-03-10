import { UnitId, UnitIdType } from "../constants";
import { axeman } from "./axeman";
import { spearFighter } from "./spearFighter";
import { swordsman } from "./swordsman";
import { archer } from "./archer";
import { scout } from "./scout";
import { lightCavalry } from "./lightCavalry";
import { heavyCavalry } from "./heavyCavalry";
import { ram } from "./ram";
import { catapult } from "./catapult";
import { Unit } from "../model/unit";
import { paladin } from "./paladin";
import { nobleman } from "./nobleman";
import { mountedarcher } from "./mountedArcher";

type BaseUnits = Record<UnitIdType, Unit>;

export const baseUnits: BaseUnits = {
  [UnitId.SpearFighter]: spearFighter,
  [UnitId.Axeman]: axeman,
  [UnitId.Swordsman]: swordsman,
  [UnitId.Archer]: archer,
  [UnitId.Scout]: scout,
  [UnitId.LightCavalry]: lightCavalry,
  [UnitId.HeavyCavalry]: heavyCavalry,
  [UnitId.Ram]: ram,
  [UnitId.Catapult]: catapult,
  [UnitId.Paladin]: paladin,
  [UnitId.Nobleman]: nobleman,
  [UnitId.MountedArcher]: mountedarcher,
};
