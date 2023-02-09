import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';


function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '85vh'
      }}
    >
      <Container maxWidth="xs" sx={{xs:{'marginLeft': '280px'}}}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              The customer you're looking for doesn't exist.
            </Typography>
            <Link to='/main/orders/new'>
              <Button variant="contained">Back</Button>
            </Link>
      </Container>
    </Box>
  )
}

export default NotFound