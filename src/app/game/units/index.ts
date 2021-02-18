import { UnitId } from "../constants"
import { axeman } from "./axeman";
import { spearFighter } from "./spearFighter"
import { swordsman } from "./swordsman"
import { archer } from "./archer";
import { scout } from "./scout";
import { lightCavalry } from "./lightCavalry";

export const baseUnits = {
  [UnitId.SpearFighter]: spearFighter,
  [UnitId.Axeman]: axeman,
  [UnitId.Swordsman]: swordsman,
  [UnitId.Archer]: archer,
  [UnitId.Scout]: scout,
  [UnitId.LightCavalry]: lightCavalry,
}
