import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {ICustomer} from '../../globals/interfaces'
import { customerServices } from './customerServices'


const token = JSON.parse(localStorage.getItem('jwt') as string)

export interface IState {
    customers: ICustomer[] | null,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string
}

const initialState: IState = {
    customers: null, 
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const create = createAsyncThunk('customers/create', async (customer: ICustomer, thunkAPI) => {
    try{
        return await customerServices.create(customer, token)
        
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAll = createAsyncThunk('customers/getAll', async (_, thunkAPI) => {
    try{
        // return await customerServices.getAll(token)
        return await customerServices.getAll(token)
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const customerSlice = createSlice({
    name: 'Customer',
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
        .addCase(create.pending, (state) => {
            state.isLoading = true
        })
        .addCase(create.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(create.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })
        .addCase(getAll.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAll.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.customers = action.payload
        })
        .addCase(getAll.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
            state.customers = null
        })
    }
})


export const { reset } = customerSlice.actions
export default customerSlice.reducer