import React, {useState} from 'react'
import {Container, TextField, Button, Autocomplete, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel} from '@mui/material'
import { users } from '../globals/users';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 280

interface IFormData {
  order: [
    {
      name: string,
      price: number,
      selected: boolean
    },
    {
      name: string,
      price: number,
      selected: boolean
    },
    {
      name: string,
      price: number,
      selected: boolean
    },
    {
      name: string,
      price: number,
      selected: boolean
    }
  ],
  customer?: number | string | null
}


function NewOrder() {
  const [formData, setFormData] = useState<IFormData>({
    order: [
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


  const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value
    }))
  }

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element
    e.preventDefault()
    console.log(target.id)
  }

  // const handleChangeAutocomplete = 

  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setFormData((prevState) => {
      console.log(target.ariaSelected)
      let updatedOrder: IFormData['order'] = [...prevState.order];
      if (target.name === 'FullWash') {
        updatedOrder[0].selected = true
        updatedOrder[1].selected = true
        updatedOrder[2].selected = true
        updatedOrder[3].selected = true
        target.checked = true
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
        order: updatedOrder,
      }
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

            <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>

              <Autocomplete
                disablePortal
                onClick={handleClick}
                options={users}
                defaultValue={undefined}
                fullWidth
                sx={{width: 310}} 
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Choose a customer" />}

                onChange={(e, newValue) => {
                  e.preventDefault()
                  // I had to do this because I was getting an error 'cant read properties of null'
                  if(newValue === null || newValue!.id === null){
                    return setFormData(prevFormData => ({
                      ...prevFormData,
                      customer: undefined
                    }))
                  }else{
                    return setFormData(prevFormData => ({
                      ...prevFormData,
                      customer: newValue!.id
                    }))
                  }
                }}
              />
              <FormControl >
                <FormLabel id="demo-controlled-radio-buttons-group">Select the order</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={formData.order[0]}
                  onChange={handleRadioButtonChange}

                >
                  <FormControlLabel name='FullWash' control={<Radio checked={formData.order[0].selected && formData.order[3].selected }/>} label="Full Wash" />
                  <FormControlLabel name='InteriorWash' control={<Radio checked={formData.order[3].selected && !formData.order[0].selected} />} label="Interior Wash" />
                  <FormControlLabel name='ExteriorWash' control={<Radio checked={formData.order[0].selected && !formData.order[3].selected} />} label="Exterior Wash" />
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

