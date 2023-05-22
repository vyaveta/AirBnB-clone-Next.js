import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface authTypes {
    userData: any,
    isLoading: boolean,
    isLoggedIn: boolean,
    errorMessage: string,
    successMessage: string,
}

const initialState: authTypes = {
    userData: null,
    isLoading: false,
    isLoggedIn: false,
    errorMessage: '',
    successMessage: '',
}

export const authSlice : Slice<authTypes> = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoading: (state,action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setisLoggedIn: (state,action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setErrorMessage: (state,action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        },
        setSuccessMessage: (state,action: PayloadAction<string>) => {
            state.successMessage = action.payload
        },
    }
})

export const {setIsLoading, setisLoggedIn, setErrorMessage, setSuccessMessage} = authSlice.actions

export default authSlice.reducer 