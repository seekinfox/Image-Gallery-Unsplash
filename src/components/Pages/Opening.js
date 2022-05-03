import React, { useEffect, useState } from 'react'
import { Button, Container, Stack, Typography } from '@mui/material'
import img from '../../Assets/bg.webp'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavToolbar from '../Features/NavToolbar'
import { Box } from '@mui/system'

const useStyle = makeStyles(theme => ({
   opening: {
      background: `linear-gradient(180deg, rgba(0,0,0,.8) ,rgba(0,0,0,.5) 0%, rgba(0,0,0,.8)), url(${img})`,
      backgroundSize:'cover',
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
   <>
   <NavToolbar page="" />
   <motion.section
   initial={{y:'30vh'}}
   animate={pageTransition? {y:0}:{y:0}}>

   <Container
      component='header'
      className={style.opening}
      maxWidth='xxl'
      sx={{
         justifyContent:'center',
         display:'flex',
         minHeight:'40rem',
         alignItems: 'center'
      }}
   > 
   <Stack alignItems={'center'}>
      <Box mb={2}>
      <Typography
         variant='h5'
         component='h1'
         letterSpacing='.5rem'
         fontWeight='900' 
         className={style.typo}
      >
         Photo Gallery
      </Typography>
      <Typography
         variant='subtitle1'
         letterSpacing='.5rem'
         fontWeight='900' 
         className={style.typo}
      >
      </Typography>
      </Box>
      <Box>
         <Button color='secondary' variant='outlined'>Create Your Collection</Button>
      </Box>
   </Stack>
   </Container>   
   </motion.section > 
   </>
   )     
}
