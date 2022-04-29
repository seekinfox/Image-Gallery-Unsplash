import { useTheme } from '@emotion/react'
import { ImageList, ImageListItem, Skeleton, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ImageGrid({rawData}) {
   const theme = useTheme()
   const large = useMediaQuery(theme.breakpoints.up('lg'))
   const [imgSkeleton, setImgSkeleton] = useState(true)

   useEffect(() => {
      const delayInImgLoad = setTimeout(() => {
         setImgSkeleton(false)   
      }, 1000);

     return () => {
       clearTimeout(delayInImgLoad)
     }
   }, [rawData])
   
  return (
   <ImageList 
   sx={{width:'100%', height:'100', padding:'4rem 0'}}  
   cols={large? 4: 2}
   rowHeight='auto'
   gap={2}
   >
      {rawData.map(i=> 
         <ImageListItem key={i.id}>
            {imgSkeleton?
            <Skeleton animation="wave" variant='rectangular' width='100%' sx={{minHeight:'25rem'}}/> 
            :
               <img
               src={`${i.urls.regular}?w=164&h=104&fit=crop&auto=format`}
               srcSet={`${i.urls.regular}?w=164&h=164&fit=crop&auto=format&dpr=2 1x`}
               alt={i.user.name}
               loading="lazy"
               /> 
            }
         </ImageListItem>   
      )
      }
   </ImageList>
  )
}
