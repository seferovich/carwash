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
import { getAllOrders, resetOrder } from './features/orders/orderSlice';
import NotFound from './pages/NotFound';

// This is the main page, that renders everything

function Main() {
  const dispatch = useAppDispatch()

  const {admin} = useAppSelector((state) => state.auth)
  const customers = useAppSelector((state) => state.customer)
  const orders = useAppSelector((state) => state.order)

  // These useEffects track everything.
  // If there is an error it shows a notification.
  // If the operation is a success it also shows a notifications.
  // It resets the state of isLoading, isError and isSuccess after the operation is done.

  useEffect(() => {
    if(customers.isError){
        toast.error(customers.message)
    }

    if(customers.isSuccess){
      toast.success('Success!')
    }

    
   
    dispatch(resetCustomer())
  }, [customers, customers.customer, customers.customers, customers.isError, customers.isSuccess])

  useEffect(() => {
    if(orders.isError){
        toast.error(orders.message)
    }

    if(orders.isSuccess){
      toast.success('Success!')
    }
    dispatch(resetOrder())
  }, [orders, orders.customerOrders, orders.orders, orders.isError, orders.isSuccess])



  return (
    <div className="Main">
     <Sidebar />
      <Routes>
        <Route path='/orders/new' element={<NewOrder />} />
        <Route path='/customers/new' element={<NewCustomer />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/customers/orders/:customerId' element={<CustomerOrders />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/notFound' element={<NotFound />} />
      </Routes>  
    </div>
  )
}

export default Main;
