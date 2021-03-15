import { GathererId, UnitIdGathererType } from "../../constants";
import { Gatherer } from "../../model/gatherer";
import { lumberjack } from "./lumberjack";

type BaseGatherers = Record<UnitIdGathererType, Gatherer>;

export const baseGatherers: BaseGatherers = {
  [GathererId.Lumberjack]: lumberjack,
};
