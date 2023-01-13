import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IAdmin } from '../globals/interfaces';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { login} from '../features/auth/authSlice'
import CircularProgress from '@mui/material/CircularProgress';





function Login() {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<IAdmin>({
    username: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value
    }))
  }

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const adminData = {username, password}
    dispatch(login(adminData))
  }

  const {username, password} = formData

  const navigate = useNavigate()
 

  const {admin, isLoading, isError, isSuccess, message} = useAppSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
        toast.error(message)
    }

    if(isSuccess || admin){
      navigate('/main/orders/new')
    }

  }, [admin, isError, isSuccess, message, navigate, dispatch])


  if(isLoading){
    return (
      <Container maxWidth='xs'>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: '40vh'
        }}
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }
  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: {xl: 30, xs: 20},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome to CarwashUI!
        </Typography>
        <Typography component="h1" variant="h6">
          Please login to continue:
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login