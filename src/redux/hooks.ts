import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"
import { usersAdapter } from "./usersSlice"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const usersSelector = usersAdapter.getSelectors<RootState>((state) => state.users)

export const statusSelector = (state: RootState) => state.users.status
export const errorSelector = (state: RootState) => state.users.error
export const pageSelector = (state: RootState) => state.users.page
export const saveStatusSelector = (state: RootState) => state.users.saveStatus