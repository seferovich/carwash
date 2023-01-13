import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import CustomerOrders from './pages/CustomerOrders';
import Customers from './pages/Customers';
import NewCustomer from './pages/NewCustomer';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';



function Main() {
  
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
