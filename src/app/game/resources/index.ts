import { timber } from "./timber";
import { clay } from "./clay";
import { iron } from "./iron";
import { ResourceId } from "../constants";
import { Resource } from "./base/resource";

type BaseResources = {
  [id in ResourceId]: Resource;
};

export const baseResources: BaseResources = {
  [ResourceId.Timber]: timber,
  [ResourceId.Clay]: clay,
  [ResourceId.Iron]: iron,
};
