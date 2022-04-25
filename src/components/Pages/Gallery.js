import { Container } from '@mui/material'
import React from 'react'

export default function Gallery() {
  return (
    <Container 
    maxWidth="xl"
    sx={{
      justifyContent:'center',
      display:'flex',
      height:"100vh", 
      alignItems: 'center'
      }}
    >
       Gallery
    </Container>
  )
}
