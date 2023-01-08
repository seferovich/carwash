import React, {useEffect} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Customers from './pages/Customers';
import NewCustomer from './pages/NewCustomer';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';
import Statistics from './pages/Statistics';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './pages/Login';
import Main from './Main';
import NotFound from './pages/NotFound';
import { useAppDispatch, useAppSelector } from './hooks/hooks'

const theme = createTheme({
  palette: {
    primary: {
      main: '#028090' 
    },
    secondary: {
      main: '#F0F3BD' 
    } 
  },
  typography: {
    fontFamily: 'Roboto Condensed',
    fontSize: 16
  }
})



function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const {admin, isLoading, isError, isSuccess, message} = useAppSelector((state) => state.auth)
  useEffect(() => {
    

    if(!admin || location.pathname === '/'){
      navigate('/login')
    }

    

  }, [admin, isError, isSuccess, message, navigate])
  

  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/main/*' element={<Main />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App;
