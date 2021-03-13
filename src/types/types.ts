/* eslint-disable @typescript-eslint/no-unused-vars */
import { UnitIdType, ResourceIdType } from "../app/game/constants";

export type ResourcesTuple = [ResourceIdType, number][];

// TODO NORMALISE!
export type Army = {
  [id in UnitIdType]?: number;
};

// TODO NORMALISE!
export type UnitLosses = {
  [id in UnitIdType]?: {
    total: number;
    loss?: number;
  }
};

const getKeys = Object.keys as <T extends Record<string, unknown>>(obj: T) => Array<keyof T>;

type RequireSome<T, K extends keyof T> = Required<Pick<T, K>> & T;
