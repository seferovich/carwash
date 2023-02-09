import React, {useState, useEffect} from 'react'
import {Container, TextField, Button, Autocomplete, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel} from '@mui/material'
import { toast } from 'react-toastify';
import { IOrder } from '../globals/interfaces';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../hooks/hooks';
import { ICustomer } from '../globals/interfaces';
import { useAppDispatch } from '../hooks/hooks';
import { resetCustomer, getAll} from '../features/customers/customerSlice';
import {createOrder,resetOrder, getAllOrders} from '../features/orders/orderSlice';


const drawerWidth = 280



function NewOrder() {
  const dispatch = useAppDispatch()

  const {admin} = useAppSelector((state) => state.auth)
  const {customers, message} = useAppSelector((state) => state.customer)
  const {isLoading, isSuccess, isError} = useAppSelector((state) => state.order)
  const [formData, setFormData] = useState<IOrder>({
    orders: [
      {
        name: 'TyreWash',
        price: 12,
        selected: false
      },
      {
        name: 'BodyWash',
        price: 12,
        selected: false
      },
      {
        name: 'InteriorCleaning',
        price: 12,
        selected: false
      },
      {
        name: 'IneriorVacuuming',
        price: 12,
        selected: false
      }
    ],
    customer: undefined
  })

  // 
  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setFormData((prevState) => {

      let updatedOrder: IOrder['orders'] = [...prevState.orders]
      if (target.name === 'FullWash') {
        updatedOrder[0].selected = true
        updatedOrder[1].selected = true
        updatedOrder[2].selected = true
        updatedOrder[3].selected = true
        target.value = String(true)
      } else if (target.name === 'ExteriorWash') {
        updatedOrder[0].selected = true
        updatedOrder[1].selected = true
        updatedOrder[2].selected = false
        updatedOrder[3].selected = false
        target.value = String(true)
      } else if (target.name === 'InteriorWash') {
        updatedOrder[0].selected = false
        updatedOrder[1].selected = false
        updatedOrder[2].selected = true
        updatedOrder[3].selected = true
        target.value = String(true)
      }
      return {
        ...prevState,
        orders: updatedOrder,
      }
    })
  }


  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    dispatch(createOrder(formData))
    
    if(isSuccess) {
      toast.success('Created!')
      dispatch(resetOrder)
    }
     
    setFormData({
      orders: [
        {
          name: 'TyreWash',
          price: 12,
          selected: false
        },
        {
          name: 'BodyWash',
          price: 12,
          selected: false
        },
        {
          name: 'InteriorCleaning',
          price: 12,
          selected: false
        },
        {
          name: 'IneriorVacuuming',
          price: 12,
          selected: false
        }
      ],
      customer: undefined
    })

    
    
  }

  // Fetch all orders and customer on load
  useEffect(() => {
    dispatch(getAllOrders())
    dispatch(getAll())

  }, [])

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
    <>
    <Box sx={{display: 'flex'}}> 
      <CssBaseline />
      <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, ml: {sm: `${drawerWidth}px`}, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        <Toolbar />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              Create a new order
            </Typography>

            <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>

              <Autocomplete
                disablePortal
                options={customers as ICustomer[]}
                defaultValue={undefined}
                fullWidth
                sx={{width: 310}} 
                getOptionLabel={(option) => option?.name}
                renderInput={(params) => <TextField {...params} label="Choose a customer" />}

                onChange={(e, newValue) => {
                  e.preventDefault()
                  // I had to do this because I was getting an error 'cant read properties of null'
                  if(newValue === null || newValue!._id === null){
                    return setFormData(prevFormData => ({
                      ...prevFormData,
                      customer: undefined
                    }))
                  }else{
                    return setFormData(prevFormData => ({
                      ...prevFormData,
                      customer: newValue!._id
                    }))
                  }
                }}
              />
              <FormControl >
                <FormLabel id="demo-controlled-radio-buttons-group">Select the order</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={formData.orders[0]}
                  onChange={handleRadioButtonChange}

                >
                  <FormControlLabel name='FullWash' control={<Radio checked={formData.orders[0].selected && formData.orders[3].selected }/>} label="Full Wash" />
                  <FormControlLabel name='InteriorWash' control={<Radio checked={formData.orders[3].selected && !formData.orders[0].selected} />} label="Interior Wash" />
                  <FormControlLabel name='ExteriorWash' control={<Radio checked={formData.orders[0].selected && !formData.orders[3].selected} />} label="Exterior Wash" />
                </RadioGroup>
              </FormControl>
              
              
              

              
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
  )}

export default NewOrder

