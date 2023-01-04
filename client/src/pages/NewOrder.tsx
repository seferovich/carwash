import React from 'react'
import {Container, TextField, Button} from '@mui/material'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 280
function NewOrder() {
  return (
    <>
      <Box sx={{display: 'flex'}}> 
      <CssBaseline />
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, ml: {sm: `${drawerWidth}px`}, width: { sm: `calc(100% - ${drawerWidth}px)` }, zIndex: -99 }}
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

              
            </Box>
          </Container>  
        </Box>  
      </Box>
    </>

  )
}


export default NewOrder