import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const drawerWidth = 280

function Orders() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [dialogId, setDialogId] = useState('')
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as Element
    
    await dispatch(getCustomerById(target.id))
    await dispatch(getByCustomerId(target.id))
    navigate(`/main/customers/orders/${target.id}`)
    
  }

  const handleClickOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
    const target = e.target as HTMLButtonElement
    setDialogId(target.id)
    // await dispatch(removeOrder(target.id))
    // await dispatch(getAllOrders())
  }

  const handleRemove = async () => {
    await dispatch(removeOrder(dialogId))
    await dispatch(getAllOrders())

    handleClose()
  }

  useEffect(() => {
    dispatch(getAllOrders())
    
  }, [])
  const orders = useAppSelector(state => state.order.orders)

  console.log(dialogId)

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
            
            <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper', zIndex: 3 }}>
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
                      <IconButton id={item._id}  onClick={handleClickOpen}  > 
                          <DeleteIcon sx={{zIndex: -999}} id={item._id} color='primary' /> 
                        </IconButton>
                  </ListItem>
                  
                  
                </>
              ))}
              <Divider />
              
            </List>
            
        </Box>  
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this order?
        </DialogTitle>
        
        <DialogActions>
          <Button onClick={handleRemove} autoFocus>
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      
    </>
  )
}

export default Orders