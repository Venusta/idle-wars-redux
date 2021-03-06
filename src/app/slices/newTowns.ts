/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResourceId } from "../game/constants";
import { addPartialResources } from "../util/normalisedZone";
import { initialState, ResourcesNormalised } from "./newTownsInitialState";

interface AddResource {
  townId: string
  resourceId: ResourceId
  amount: number
}

interface AddResources {
  townId: string
  resources: ResourcesNormalised
}

export const newTowns = createSlice({
  name: "misc",
  initialState,
  reducers: {
    addResource: (state, { payload: { townId, resourceId, amount } }: PayloadAction<AddResource>) => {
      const resource = state.byId[townId].resources.byId[resourceId];
      if (resource === undefined) {
        state.byId[townId].resources.byId[resourceId] = {
          id: resourceId,
          amount,
        };
        state.byId[townId].resources.allIds.push(resourceId);
      } else {
        resource.amount += amount;
      }
    },
    addResources: (state, { payload: { townId, resources } }: PayloadAction<AddResources>) => {
      state.byId[townId].resources = addPartialResources([state.byId[townId].resources, resources]);
    },
  },
});

export const {
  addResource,
} = newTowns.actions;
