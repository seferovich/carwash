import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import {ICustomer} from '../../globals/interfaces'
import { customerServices } from './customerServices'


const token = JSON.parse(localStorage.getItem('jwt') as string)

export interface IState {
    customers: ICustomer[] | null,
    customer: ICustomer | null,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string
}

const initialState: IState = {
    customers: null, 
    customer: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const create = createAsyncThunk<ICustomer, ICustomer, {state: RootState}>('customers/create', async (customer: ICustomer, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.admin!
        return await customerServices.create(customer, token)
        
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAll = createAsyncThunk<ICustomer[], undefined, {state: RootState}>('customers/getAll', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.admin!
        return await customerServices.getAll(token)
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getCustomerById = createAsyncThunk<ICustomer, number | string, {state: RootState}>('customers/getById', async (customerId: string | number, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.admin!
        return await customerServices.getById(customerId, token)

    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const removeCustomer = createAsyncThunk<ICustomer, number | string, {state: RootState}>('customers/remove', async (customerId: string | number, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.admin!
        return await customerServices.remove(customerId, token)
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// The isSuccess will only apply on creating and removing the customer
export const customerSlice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {
        resetCustomer: (state) => {
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
            state.customers = action.payload
        })
        .addCase(getAll.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
            state.customers = null
        })

        .addCase(getCustomerById.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCustomerById.fulfilled, (state, action) => {
            state.isLoading = false
            state.customer = action.payload
        })
        .addCase(getCustomerById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
            state.customer = null
        })

        .addCase(removeCustomer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(removeCustomer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(removeCustomer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })
    }
})


export const { resetCustomer } = customerSlice.actions
export default customerSlice.reducer