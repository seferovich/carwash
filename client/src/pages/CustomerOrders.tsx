import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useAppSelector } from '../hooks/hooks';
import NotFound from './NotFound';



const drawerWidth = 280


function CustomerOrders() {

  const customerState = useAppSelector(state => state.customer)
  const ordersState = useAppSelector(state => state.order)
  


  if(customerState.isLoading || ordersState.isLoading){
    return (
      <Container maxWidth='xs'>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: '40vh'
        }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }



  return (
    <>
      <Box sx={{display: 'flex', zIndex: '-2'}}> 
        <CssBaseline />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, ml: {sm: `${drawerWidth}px`}, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        > 
          <Toolbar />
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <Typography sx={{fontSize: '33px'}} variant='h1'>{customerState!.customer!.name}</Typography>
            
            <Typography sx={{fontSize: '18px'}} variant='h1'>{`Date of birth: ${String(customerState!.customer!.dob).substring(0,10)}`}</Typography>
            <Typography sx={{fontSize: '18px'}} variant='h1'>{`Points: ${customerState!.customer!.points}`}</Typography>
          </Box>
            
          <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
            <ListItem
              disableGutters
              secondaryAction={
                <> 
                  <ListItemText primary={'Total'} />
                </>
              }
            >       
              <ListItemText primary={'Created at'} />     
            </ListItem>
              <Divider />
              {ordersState.customerOrders!.map((item, i) => (
                <>
                  <ListItem
                    key={i}
                    disableGutters
                    secondaryAction={
                      <> 
                        <ListItemText primary={`${item.total}$`} />
                      </>
                    }
                  >     
                    <ListItemText primary={String(item.createdAt).substring(0, 10)}   />
                  </ListItem>
                </>
              ))}
              <Divider />
            </List>
        </Box>  
      </Box>
    </>
  )
}

export default CustomerOrders