import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { ICustomer } from '../globals/interfaces';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import {Container} from '@mui/material';
import {TextField, FormControlLabel, Button} from '@mui/material';
import { create, getAll } from '../features/customers/customerSlice'

const drawerWidth = 280



function NewCustomer() {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<ICustomer>({
    name: '',
    dob: '0/0/0000'
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
    dispatch(create(formData))
    dispatch(getAll())
    setFormData({
      name: '',
      dob: '00/00/0000'
    })
  }

  return (
    <>
      <Box sx={{display: 'flex'}}> 
        <CssBaseline />
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, ml: {sm: `${drawerWidth}px`}, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
          <Toolbar />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              <Typography component="h1" variant="h5">
                Create a new customer
              </Typography>

              <Box onSubmit={handleSubmit} component="form"  noValidate sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                  variant='standard'
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  label="Date of birth"
                  type="date"
                  id="date"
                  variant='standard'
                />

                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create
                </Button>
              
              </Box>
            </Box>
          </Container>
        </Box>  
      </Box>
    </>
  )
}

export default NewCustomer