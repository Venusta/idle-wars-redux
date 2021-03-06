/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  BuildingId, BuildingIdType, ResourceId, ResourceIdType, UnitId, UnitIdType,
} from "../game/constants";

export const isBuildingId = (x: any): x is BuildingIdType => Object.values(BuildingId).includes(x);

export const isUnitId = (x: any): x is UnitIdType => Object.values(UnitId).includes(x);

export const isResourceId = (x: any): x is ResourceIdType => Object.values(ResourceId).includes(x);

// todo delete this file
