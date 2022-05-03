import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@emotion/react'
import camera from '../../Assets/camera.gif'
import {AiFillEye, AiFillHeart,AiOutlineDownload} from 'react-icons/ai'
import {ImCloudDownload} from 'react-icons/im'

const useStyle = makeStyles(theme => ({

   imageBox: {
      minHeight:'100vh',
      [theme.breakpoints.up('xs')]: {
         padding: '0 0 5rem', 
      },

      [theme.breakpoints.up('sm')]: {
         padding: '1rem 1rem 2rem 5rem', 
      },

   },
   gifBox : {
      width: '29rem',
      overflow: 'hidden',
   },
   stack : {
      width:'100%',
   },
   imageMain : {
      width:'100%',
      display:'flex',
      overflow:'hidden',
      position:'relative',
      
      justifyContent:'center'
   },
   img : {
      width:'auto',
      height:'100%',
   },
   infoBox : {
      width: '100%',
   },
   imgMeta : {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bolder',
      opacity:'.8'
   }
}))



export default function ImageDetails({unsplash}) {
   const theme = useTheme()
   const style = useStyle(theme)

   const [loadingData, setLoadingData] = useState(true)
   const [DataById, setDataById] = useState({})
   const [photoData , setPhotoData] =useState({
       date: {t: '', d: ''},
       dim: {t: '', d: ''},
       cam: {t: '', d: ''},
       focal: {t: '', d: ''},
       apar: {t: '', d: ''},
   })
   
   const  { id } = useParams()
   const [pageTransition, setPageTransition] = useState(true)

   async function searchAPI() {
      try {
         const data = await unsplash.photos.get({photoId: id})
         setDataById(data.response)
         setLoadingData(false)
         setPhotoData({
            date:{t: `Posted on`, d: `${data.response.created_at.slice(0,10)}`},
            dim: {t: 'Dimensions', d: `${data.response.width} x ${data.response.height}`},
            cam: {t: 'Camera', d: `${data.response.exif.name}`},
            focal: {t: 'Focal', d:`${ data.response.exif.focal_length}mm`},
            apar: {t: 'Aperture', d: `ƒ/${data.response.exif.aperture}`},
            iso: {t: 'ISO', d: `${data.response.exif.iso}`},

         })

      } catch (error) {
         console.log(error)
      }
   }
   // console.log(DataById)
   useEffect(() => {
      const loading = setTimeout(() => {
         searchAPI()
      }, 1000);
      const pageTransitionTimeout = setTimeout(() => {
       setPageTransition(false)
      }, 500);
   
      return () => {
         clearTimeout(loading)
         clearTimeout(pageTransitionTimeout)
      }
   }, [])


   return (
   <motion.section
      initial={{x:'100vw'}}
      animate={pageTransition? {x:0}:{x:0}}>
      <Box 
      sx={{
      width:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
     }} 
     className={style.imageBox}
     >
      {
         loadingData ?
         <Box className={style.gifBox}>
            <img width='100%' src={camera} alt='' />
         </Box>
         :
         <Stack
            className={style.stack}
            component='div' direction='column'>
            <Box className={style.imageMain} bgcolor='primary.main'>
               <img className={style.img} src={DataById.urls.regular} alt={DataById.alt_description}/>
               <Box sx={{width:'100%', height:'100%',position:'absolute', top:0, left:0,}}>
                  <IconButton 
                  color='secondary'
                  size='large'
                  sx={{
                     position:'absolute',
                     bottom:'1rem',
                     right:'2rem',
                     border:'2px solid white'
                     }}>
                     <AiOutlineDownload/>
                  </IconButton>
               </Box>
            </Box>

            <Stack 
            color='secondary.main' 
            direction={'row'} 
            justifyContent='space-between' 
            className={style.infoBox} 
            py={4} px={{xs:3, sm:3}} 
            sx={{backgroundColor:'primary.main'}}
            >
               <Stack 
               direction={{xs:'column', lg:'row'}} 
               alignItems={{xs: 'flex-start',lg:'center'}}
               >
                  <Box 
                  mb={{xs: 1,sm: 0}} 
                  sx={{width:'5rem', height:'5rem',borderRadius:'50%', border:'4px solid white', overflow:'hidden'}}
                  >
                     <img width='100%' src={DataById.user.profile_image.medium} alt={DataById.user.username}/>
                  </Box>
                  <Stack ml={2}>
                  <Typography 
                  fontSize='.7em' 
                  letterSpacing='.1rem' 
                  variant='subtitle1' >
                     created By
                  </Typography>
                     <Typography fontSize='1.5em' fontWeight={900} letterSpacing='.1rem' variant='subtitle1' >{DataById.user.username}</Typography>
                  </Stack>
               </Stack>

               <Stack 
               justifyContent={'center'} 
               direction={{xs:'column', lg:'row'}}
               >
                  <Typography fontWeight={700} mr={3} className={style.imgMeta} variant='subtitle1' >
                     <Typography className={style.imgMeta} mr={1} variant='span'><AiFillEye/></Typography> {DataById.views} Views
                  </Typography>
                  <Typography fontWeight={700} mr={3} className={style.imgMeta} variant='subtitle1' >
                     <Typography className={style.imgMeta} mr={1} variant='span'><ImCloudDownload/></Typography> {DataById.downloads} Downloads
                  </Typography>
                  <Typography fontWeight={700} className={style.imgMeta} variant='subtitle1' >
                     <Typography className={style.imgMeta} mr={1} variant='span'><AiFillHeart/></Typography> {DataById.likes} Likes
                  </Typography>
               </Stack>
            </Stack>
            
            <Box sx={{ minWidth:'100%', backgroundColor:'primary.main'}}>
               <Typography py={1} px={{xs:3, sm:3}} color='secondary' variant='h5'>Photo details</Typography>

               <Grid 
               container
               color='secondary.main' 
               py={2} px={{xs:3, sm:3}}
               sx={{backgroundColor:'primary.main'}}
               columns={10}
               maxWidth='50rem'
               justifyContent='start'
               rowSpacing={3}
               >
                  {Object.values(photoData).map((item, index) => 
                     <Grid p={0} xs={5} md={3} key={index} item > 
                        <Typography fontWeight={700} variant='subtitle1' sx={{letterSpacing:'.1rem', opacity: .7}}>
                           {item.t}
                        </Typography>
                        <Typography variant='subtitle1'>
                           {item.d}
                        </Typography>
                     </Grid>
                  )}
               </Grid>
            </Box>
         </Stack>
      }
      </Box>
   </motion.section>
  )
}
