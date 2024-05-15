import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserCreatePayload } from "../types";
import { nextPage } from "../redux/usersSlice";

export const getUsers = createAsyncThunk('users/getUsers',
    async (page: number, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/users?_page=${page}`)
            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(data)
            }
            dispatch(nextPage())
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const updateUser = createAsyncThunk('users/updateUser',
    async ({id, company, department, jobTitle}: UserCreatePayload, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({company: company, department: department, jobTitle: department}),
            });
            if (response.status !== 200) {
                throw new Error()
            }
            return {id: id, changes: {company, department, jobTitle}}
        } catch (e) {
            return rejectWithValue(e)
        }
    })
