import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import orderReducer from "../features/orders/orderSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        order: orderReducer
    }   

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch