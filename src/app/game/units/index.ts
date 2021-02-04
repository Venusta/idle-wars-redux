import { UnitId } from "../constants"
import { axeman } from "./axeman"
import { spearFighter } from "./spearFighter"
import { swordsman } from "./swordsman"

export const baseUnits = {
  [UnitId.SpearFighter]: spearFighter,
  [UnitId.Axeman]: axeman,
  [UnitId.Swordsman]: swordsman
};