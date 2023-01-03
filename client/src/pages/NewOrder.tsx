import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import React from 'react'
const drawerWidth = 240
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
            <Typography paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia odio beatae voluptatem pariatur. Quis quod unde libero vel, perferendis perspiciatis corrupti veniam, nisi voluptatem, eos minima vero eligendi magni. Quo temporibus esse est quidem, aut expedita soluta cumque tempora possimus voluptates nemo eaque dolor dolore deserunt sint, magnam cupiditate labore! Vel voluptatum quisquam est doloribus culpa eaque ducimus neque eveniet omnis ab distinctio ipsa rem optio, laudantium iste pariatur. Iure iste, dolor porro maiores voluptatem qui molestiae nihil similique modi debitis beatae corrupti aliquam aut neque laborum quos adipisci. Itaque temporibus assumenda asperiores maiores voluptates! Natus quibusdam ipsum ratione dolor?</Typography>  
        </Box>  
      </Box>
    </>

  )
}


export default NewOrder