import { EStatus, IUser } from "../types";
import { getUsers, updateUser } from "../api/api";
import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const usersAdapter = createEntityAdapter<IUser>()

interface IInitialState {
    status: EStatus,
    error: string | null,
    page: number,
    saveStatus: boolean | null
}

const initialState: IInitialState = {
    status: EStatus.idle,
    error: null,
    page: 1,
    saveStatus: null
}

export const userSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(initialState),
    reducers: {
        clearError (state) {
            state.error = null
        },
        upsertUser (state, action: PayloadAction<IUser>) {
            usersAdapter.upsertOne
            updateUser(action.payload)
        },
        throwError (state, action: PayloadAction<Error>) {
            state.error = action.payload.message
        },
        clearPage (state) {
            state.page = 1
        },
        clearUsers (state) {
            usersAdapter.setAll(state, [])
        },
        nextPage (state) {
            state.page += 1
        },
        clearSaveStatus (state) {
            state.saveStatus = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = EStatus.loading
                state.error = null
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                usersAdapter.upsertMany(state, action.payload)
                state.status = EStatus.success
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = EStatus.failed
                state.error = action.error.message
            })

            .addCase(updateUser.fulfilled, (state, {payload: {id, changes}}) => {
                usersAdapter.updateOne(state, {id: id, changes: changes})
                state.saveStatus = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.saveStatus = false
            })
    }
})

export const {clearError, upsertUser, throwError, clearPage, clearUsers, nextPage, clearSaveStatus} = userSlice.actions