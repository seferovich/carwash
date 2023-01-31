

import React, { useEffect, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import { getByCustomerId } from '../features/orders/orderSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const drawerWidth = 280


function Customers() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {customers, isSuccess} = useAppSelector(state => state.customer)
  const [dialogId, setDialogId] = useState('')
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false)
  }

  // const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const target = e.target as Element
    
  //   await dispatch(getCustomerById(target.id))
  //   await dispatch(getByCustomerId(target.id))
  //   navigate(`/main/customers/orders/${target.id}`)
    
  // }

  const handleClickOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
    const target = e.target as HTMLButtonElement
    setDialogId(target.id)
    // await dispatch(removeOrder(target.id))
    // await dispatch(getAllOrders())
  }

  const handleRemove = async () => {
    await dispatch(removeCustomer(dialogId))
    await dispatch(getAll())

    handleClose()
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as Element

    await dispatch(getCustomerById(target.id))
    await dispatch(getByCustomerId(target.id))
    navigate(`/main/customers/orders/${target.id}`)
    
  }
  

  // const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()

  //   const target = e.target as HTMLButtonElement

  //   await dispatch(removeCustomer(target.id))
  //   await dispatch(getAll())

    
  //   // if(isSuccess) {
  //   //   dispatch(getAll())
  //   // }
  //   // dispatch(getAll())
  // }
  useEffect(() => {
    dispatch(getAll())    
  }, [])

  
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
                      {/* <Link to={`/main/customers/orders/${item._id}`}> */}
                        <Button id={item._id} variant="outlined" onClick={handleClick}>
                          See orders
                        </Button>
                      {/* </Link> */}
                      <IconButton id={item._id} onClick={handleClickOpen} > 
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this customer?
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

export default Customers