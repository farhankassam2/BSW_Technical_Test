import { applyMiddleware, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import peopleSlice from "./controller/reducers/peopleSlice";
import { ApplicationState, reducers } from "./controller/rootReducer";

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // default middleware already contains ThunkApi for async actions
});

// Infer the `RootState` and `AppDispatch` types from the store itself --> via store.getState
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {people: PeopleState, Person: PersonState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;