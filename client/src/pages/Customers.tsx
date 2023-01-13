

import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAll, getCustomerById, removeCustomer } from '../features/customers/customerSlice';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getByCustomerId } from '../features/orders/orderSlice';


const drawerWidth = 280


function Customers() {
  const dispatch = useAppDispatch()
  

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as Element

    dispatch(getCustomerById(target.id))
    dispatch(getByCustomerId(target.id))
    
  }
  const customers = useAppSelector(state => state.customer.customers)

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const target = e.target as HTMLButtonElement

    dispatch(removeCustomer(target.id))
    dispatch(getAll())
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
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography sx={{fontSize: '33px'}} variant='h1'>All customers</Typography>
          </Box>
            
          <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
            {customers!.map((item, i) => (
              <>
                <ListItem
                  id={item._id}
                  disableGutters
                  secondaryAction={
                    <> 
                      <Link to={`/main/customers/orders/${item._id}`}>
                        <Button id={item._id} variant="outlined" onClick={handleClick}>
                          See orders
                        </Button>
                      </Link>
                      <IconButton id={item._id} onClick={handleRemove} > 
                        <DeleteIcon sx={{zIndex: -999}} id={item._id} color='primary' /> 
                      </IconButton>
                    </>
                    }
                  > 
                    <ListItemText id={item._id} primary={item.name} secondary={`${String(item.dob).replace('T00:00:00.000Z', '')}, ${item.points} Points` } /> 
                  </ListItem>  
              </>
            ))}
          </List>
        </Box>  
      </Box>

      
    </>
  )
}

export default Customers