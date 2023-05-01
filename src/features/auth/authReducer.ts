import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logOut} from 'features/auth/authActions';

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logOut.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}















