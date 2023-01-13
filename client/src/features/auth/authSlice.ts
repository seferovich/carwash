import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {IAdmin} from '../../globals/interfaces'
import { authServices } from './authServices'


const admin = JSON.parse(localStorage.getItem('jwt') as string)
export interface IState {
    admin: string | null,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string
}

const initialState: IState = {
    admin: admin ? admin : null, 
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const login = createAsyncThunk('auth/login', async (admin: IAdmin, thunkAPI) => {
    try{
        
        return await authServices.login(admin)
        
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try{
        const token = await JSON.parse(localStorage.getItem('jwt') as string)
        return await authServices.logout(token)
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true  
            state.admin = action.payload.token
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
            state.admin = null
        })

        .addCase(logout.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.admin = null
        })
          .addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
            state.admin = null
        })
    }
})


export const { reset } = authSlice.actions
export default authSlice.reducer