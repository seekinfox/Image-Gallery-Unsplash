import { useTheme } from '@emotion/react'
import { Container, ImageList, ImageListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import {MdSignalWifiConnectedNoInternet4} from 'react-icons/md'
import NavToolbar from '../Features/NavToolbar'
import ImageGrid from '../Features/ImageGrid'
import { motion } from 'framer-motion'

const useStyle = makeStyles(theme => ({

   imageGridBox: {
      position: 'relative',
      [theme.breakpoints.up('xs')]: {
         padding: '4rem 0 4rem', 
      },

      [theme.breakpoints.up('sm')]: {
         padding: '5rem 1rem 2rem 5rem', 
      }
   },

   emptyCard: {
      border:'1px solid red',
      padding: '1rem'
   }
}))

export default function Gallery({setShuffle, rawData}) {
   const theme = useTheme()
   const style = useStyle(theme)
   // console.log('raw', rawData)
   const [pageTransition, setPageTransition] = useState(true)


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
   <NavToolbar page='gallery' setShuffle={setShuffle}/>
   <motion.div
   initial={{y:'10vh'}}
   animate={pageTransition? {y:0}:{y:0}}>
   <Box 
    className={style.imageGridBox}
    >
      {rawData !== null ? 
         <ImageGrid rawData={rawData} />
      :
         <Container
         sx={{
            width:'100%',
            minHeight:'90vh',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'3rem',
            opacity:'.7'
         }}
         >
            <MdSignalWifiConnectedNoInternet4/>
            <Typography sx={{fontSize:'1.5rem', lineHeight:'2', letterSpacing:'.2rem'}} variant='span' component='span'>B(0_0)T is Looking for more photos, sit back and take a coffie</Typography>
         </Container>
      }
    </Box>
   </motion.div>
   </>
  )
}
