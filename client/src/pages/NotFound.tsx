import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';


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
      <Container maxWidth="md">
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained">Back Home</Button>
      </Container>
    </Box>
  )
}

export default NotFound