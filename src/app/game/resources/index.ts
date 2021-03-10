import { timber } from "./timber";
import { clay } from "./clay";
import { iron } from "./iron";
import { ResourceId, ResourceIdType } from "../constants";
import { Resource } from "../model/resource";

type BaseResources = Record<ResourceIdType, Resource>;

export const baseResources: BaseResources = {
  [ResourceId.Timber]: timber,
  [ResourceId.Clay]: clay,
  [ResourceId.Iron]: iron,
};
