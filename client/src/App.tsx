import React, {useEffect} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './pages/Login';
import Main from './Main';
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const dispatch = useAppDispatch()
  const {admin, isLoading, isError, isSuccess, message} = useAppSelector((state) => state.auth)


  useEffect(() => {
 
    if(!admin){
      navigate('/login')
    }else if(location.pathname === '/'){
      navigate('/main/orders/new')
    }
    
  }, [admin, isError, isSuccess, message, navigate])
  
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/main/*' element={<Main />} />
          {/* <Route path='/' element={<NotFound />} /> */}
        </Routes>
        <ToastContainer />
      </div>
    </ThemeProvider>
  )
}

export default App;
