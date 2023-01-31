import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import CustomerOrders from './pages/CustomerOrders';
import Customers from './pages/Customers';
import NewCustomer from './pages/NewCustomer';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';
import {toast} from 'react-toastify'
import { resetCustomer } from './features/customers/customerSlice';
import { resetOrder } from './features/orders/orderSlice';



function Main() {
  const dispatch = useAppDispatch()

  const {admin} = useAppSelector((state) => state.auth)
  const customers = useAppSelector((state) => state.customer)
  const orders = useAppSelector((state) => state.order)

  useEffect(() => {
    if(customers.isError){
        toast.error(customers.message)
    }
   
    dispatch(resetCustomer())
  }, [customers, customers.customer, customers.customers, customers.isError])

  useEffect(() => {
    if(orders.isError){
        toast.error(orders.message)
    }
   
    dispatch(resetOrder())
  }, [orders, orders.customerOrders, orders.orders, orders.isError])



  return (
    <div className="Main">
     <Sidebar />
      <Routes>
        <Route path='/orders/new' element={<NewOrder />} />
        <Route path='/customers/new' element={<NewCustomer />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/customers/orders/:customerId' element={<CustomerOrders />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>  
    </div>
  )
}

export default Main;
