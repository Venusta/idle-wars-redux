import { timber } from "./timber"
import { clay } from "./clay"
import { iron } from "./iron"
import { ResourceId } from "../constants"

export const baseResources = {
  [ResourceId.Timber]: timber,
  [ResourceId.Clay]: clay,
  [ResourceId.Iron]: iron,
}