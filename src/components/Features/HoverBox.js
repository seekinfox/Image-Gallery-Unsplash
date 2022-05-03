import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import {AiFillHeart} from 'react-icons/ai'
import {MdDownload} from 'react-icons/md'
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({

   imageInnerContainer: {
      position:'absolute',
      top:0,
      left:0,
      width:'100%',
      height:'100%',
      background:'linear-gradient(180deg, rgba(0,0,0,.1), rgba(0,0,0,.7)90%)',
      opacity: 0,
      transition: '.3s ease',
      cursor:'pointer',

      '&:hover' : {
         opacity:1
      }
   },
   stack : {
      position: 'absolute',
      bottom:0,
      left:0, 
      padding:'1rem',
      height: 'max-content',
      width:'100%',
   }
})

export default function HoverBox({unsplash, data}) {
   const style = useStyles()

   async function handleDownload(e, id) {
      try {
         let downloadData = await unsplash.photos.get({photoId:id })
         
         const photo = downloadData.response
         // console.log('download', photo)

         unsplash.photos.trackDownload({
            downloadLocation: photo.links.download_location
         })
         
         saveAs(photo.links.download, 'image.jpg')
         
      } catch (error) {
         console.log('hey, got error!', error)
      }
   }

  return (

   <Link to={`/image_details/${data.id}`}>
      <Box className={style.imageInnerContainer}>
         <Stack 
         direction='row' 
         alignItems='center' 
         justifyContent='space-between'
         className={style.stack}
         >
            <Stack 
            direction='row'>
               <Avatar 
               sx={{width:50, height:50}} 
               alt={data.user.username}
               src={data.user.profile_image.medium}/>
               <Stack ml='.6rem'>   
                  <Typography 
                  sx={{fontSize: '1em', opacity:.8, textTransform:'capitalize'}}color='secondary' 
                  variant="subtitle1" 
                  display="block">
                     {data.user.first_name} {data.user.last_name}
                  </Typography>
                  <Typography 
                  sx={{fontSize: '.8em',textTransform:'capitalize', display:'flex', alignItems:'center'}} color='secondary' 
                  variant="subtitle1" 
                  display="block">
                     <Typography 
                     sx={{display:'flex', alignItems:'center'}} 
                     variant='span' 
                     mr='.2rem'>
                        <AiFillHeart/>
                     </Typography> {data.likes} Likes
                  </Typography>
               </Stack>
            </Stack>
            <Box sx={{border:'2px solid white', borderRadius:'50%'}}>
            <Tooltip title="Download" arrow>
               <IconButton 
               onClick={(e) => handleDownload(e, data.id)} color='secondary' 
               aria-label='download'>
                  <MdDownload/>
               </IconButton>
               </Tooltip>
            </Box>
         </Stack>
      </Box>
   </Link>
  )
}
