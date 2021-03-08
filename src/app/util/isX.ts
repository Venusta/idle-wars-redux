/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { BuildingId, ResourceId, UnitId } from "../game/constants";

export const isBuildingId = (x: any): x is BuildingId => Object.values(BuildingId).includes(x);

export const isUnitId = (x: any): x is UnitId => Object.values(UnitId).includes(x);

export const isResourceId = (x: any): x is ResourceId => Object.values(ResourceId).includes(x);

// todo delete this file
