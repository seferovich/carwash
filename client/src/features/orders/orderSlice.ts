import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import {IOrder} from '../../globals/interfaces'
import { orderServices } from './orderServices'
// import { customerServices } from './customerServices'


const token = JSON.parse(localStorage.getItem('jwt') as string)

export interface IState {
    orders: IOrder[] | null,
    customerOrders: IOrder[] | null
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string
}

const initialState: IState = {
    orders: null, 
    customerOrders: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const createOrder = createAsyncThunk('orders/create', async (order: IOrder, thunkAPI) => {
    try{
        return await orderServices.create(order, token)
        
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllOrders = createAsyncThunk<IOrder[], undefined, { state: RootState }>('orders/getAll', async (_, thunkAPI) => {
    try{
        // return await customerServices.getAll(token)
        const token = thunkAPI.getState().auth.admin!
        return await orderServices.getAll(token)
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const getByCustomerId = createAsyncThunk('orders/getByCustomerId', async (customerId: string | number, thunkAPI) => {
    try{
        // return await customerServices.getAll(token)
        return await orderServices.getByCustomerId(customerId, token)
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const removeOrder = createAsyncThunk('orders/removeOrder', async (customerId: string | number, thunkAPI) => {
    try{
        // return await customerServices.getAll(token)
        return await orderServices.remove(customerId, token)
    }catch(error: any){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const orderSlice = createSlice({
    name: 'Order',
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
        .addCase(createOrder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })
        
        .addCase(getAllOrders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.orders = action.payload
        })
        .addCase(getAllOrders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
            state.orders = null
        })
        
        .addCase(getByCustomerId.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getByCustomerId.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.customerOrders = action.payload
        })
        .addCase(getByCustomerId.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
            state.orders = null
        })
    }
})


export const { reset } = orderSlice.actions
export default orderSlice.reducer