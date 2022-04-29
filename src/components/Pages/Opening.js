import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import img from '../../Assets/cornered-stairs.svg'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'

const useStyle = makeStyles(theme => ({
   opening: {
      background: `url(${img}) no-repeat`,
      backgroundSize: 'cover',
      
      [theme.breakpoints.down('sm')]: {
         backgroundPositionY: '-.9rem'
      },
   },
   typo: {
      textTransform:'uppercase',
      align:'center',
      color:"white",
      [theme.breakpoints.down('sm')]: {
         fontSize: '1em',
      },
   }

}))

export default function Opening() {
   const [pageTransition, setPageTransition] = useState(true)
   const theme = useTheme()
   const style = useStyle(theme)
   useEffect(() => {
     const pageTransitionTimeout = setTimeout(() => {
      setPageTransition(false)
     }, 500);
   
     return () => {
       clearTimeout(pageTransitionTimeout)
     }
   }, [])
   

return (
   <motion.div
   initial={{y:'30vh'}}
   animate={pageTransition? {y:0}:{y:0}}>

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
         variant='h1'
         component='h1'
         letterSpacing='.5rem'
         fontWeight='900' 
         fontSize={{
            xs:'3rem',
            md: '3.5rem',
            lg: '4.5rem'
         }}
         className={style.typo}
      >
         Gallery
      </Typography>
   </Container>
   </motion.div > 
   )     
}
