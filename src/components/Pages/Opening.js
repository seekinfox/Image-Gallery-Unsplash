import React from 'react'
import { Container, Typography } from '@mui/material'
import img from '../../Assets/slanted-gradient.svg'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles({
   opening: {
      background: `url(${img}) no-repeat`,
      backgroundSize: 'cover',
      backgroundPositionX: '3.9rem'
   }
})

export default function Opening() {
const style = useStyle()

return (
   <Container
      className={style.opening}
      maxWidth='xxl'
      sx={{
         justifyContent:'center',
         display:'flex',
         height:"100vh", 
         alignItems: 'center'
      }}
   >
      <Typography
         fontSize='5rem'
         letterSpacing='.5rem'
         fontWeight='900' 
         align='center'
         color="white"
         variant='h1'
         component='h1'
      >
         Gallery
      </Typography>
    </Container>
  )
}
