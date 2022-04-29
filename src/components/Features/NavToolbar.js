import { useTheme } from '@emotion/react'
import { AppBar, Box, Button, Stack, Toolbar, useMediaQuery } from '@mui/material'
import React from 'react'
import {BsImageAlt} from 'react-icons/bs'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles(theme => ({
   innerBox: {
      color:'black',

      '&:nth-of-type(1)':{
         fontSize:'2rem',

         [theme.breakpoints.up('xs')]: {
            marginLeft:'0rem',
         },
         [theme.breakpoints.up('lg')]:{
            marginLeft: '4rem',
         }
      }
   },
  
}))

export default function NavToolbar({page,setShuffle}) {
   const theme = useTheme()
   const style = useStyle(theme)
   const large = useMediaQuery(theme.breakpoints.up('lg'))

  return (
   <AppBar 
   position='fixed'
   component='div'
   sx={{zIndex:900, boxShadow:0, background:'linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(0,0,0,1) 10%)'}}>
         <Toolbar variant="regular">
            <Stack 
            width='100%'
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
               <Box className={style.innerBox}>
                  <BsImageAlt/>
               </Box>
               <Box className={style.innerBox}>
                  {page === 'gallery' &&
                     <Button 
                     onClick={() => setShuffle(prev => !prev)}
                     sx={{borderRadius:0, letterSpacing:'.1rem'}} variant='contained' 
                     color='secondary'
                     >shuffle
                     </Button>
                  }
               </Box>
            </Stack>
         </Toolbar>
   </AppBar>
  )
}
