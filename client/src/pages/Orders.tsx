import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getCustomerById } from '../features/customers/customerSlice';
import { getAllOrders, getByCustomerId, removeOrder } from '../features/orders/orderSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const drawerWidth = 280

function Orders() {
 
  const dispatch = useAppDispatch()
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault()
    const target = e.target as Element

    dispatch(getCustomerById(target.id))
    dispatch(getByCustomerId(target.id))
    
  }

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const target = e.target as HTMLButtonElement

    dispatch(removeOrder(target.id))
    dispatch(getAllOrders())
  }

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])
  const orders = useAppSelector(state => state.order.orders)

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
              <Typography sx={{fontSize: '33px'}} variant='h1'>All orders</Typography>
            
              
            </Box>
            
            <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
              <ListItem
                disableGutters
                secondaryAction={
                  <ListItemText primary={'Total'} />
                }
                  >
                    
                    <ListItemText primary={'Created at'} />
                    
                  </ListItem>
                  <Divider />
              {orders!.map((item, i) => (
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
                    
                    <Link to={`/main/customers/orders/${item.customer}`}>
                        <Button id={item.customer as string} variant="outlined" onClick={handleClick}>
                          See customer
                        </Button>
                      </Link> 
                      <IconButton id={item._id} onClick={handleRemove}  > 
                          <DeleteIcon sx={{zIndex: 1}} id={item._id} color='primary' /> 
                        </IconButton>
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

export default Orders