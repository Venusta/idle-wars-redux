import {
  configureStore, ThunkAction, Action, AnyAction, Dispatch,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { reducer } from "./slices/index";

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();
