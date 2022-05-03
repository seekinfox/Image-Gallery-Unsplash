import React, { useState, useEffect } from 'react'
import NavToolbar from '../Features/NavToolbar'
import { Box } from '@mui/system'
import { useTheme } from '@emotion/react'
import { makeStyles } from '@mui/styles'
import imgbg from "../../Assets/abstract-timekeeper.svg"
import { Button, Container, InputBase, Pagination, Paper, Stack, Typography } from '@mui/material'
import imgbg1 from '../../Assets/flat-mountains.svg'
import {BsSearch} from "react-icons/bs"
import { createApi } from 'unsplash-js';
import ImageGrid from '../Features/ImageGrid'
import camera from '../../Assets/camera.gif'
import { motion } from 'framer-motion'


const useStyle = makeStyles(theme => ({
   imageGridBox: {
      [theme.breakpoints.up('xs')]: {
         padding: '0 0 4rem', 
      },
      [theme.breakpoints.up('sm')]: {
         padding: '0 1rem 0 5rem',
      }
   },
   inputBox : {
      width: '100%',
      background:`url(${imgbg1}) no-repeat`,
      backgroundSize:'cover',
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      transition:'.3s ease',

      [theme.breakpoints.up('xs')]: {
         backgroundPositionX: '50%',
         backgroundSize:'300%',
         backgroundPositionY:'50%'
      },
      [theme.breakpoints.up('md')]: {
         backgroundPositionX: '40%',
         backgroundSize:'130%'
      },

      [theme.breakpoints.up('lg')]: {
         backgroundSize:'cover',
         backgroundPositionY: '12%',
      },
   },
   gifBox : {
      width: '29rem',
      overflow: 'hidden',
   },
   loading: {
      border: '2px solid red'
   },
   searchInfo : {
      padding: '.5rem 1rem',
      [theme.breakpoints.up('lg')]: {
         padding:'.5rem 0 .5rem 5rem'
      },
   }
}))

export default function Search({unsplash}) {
   const theme = useTheme()
   const style = useStyle(theme)
   const [searchValue,setSearchValue] = useState('')
   const [sError, setSError] = useState(null)
   const [inputErorr, setInputError] = useState(false)
   const [searchData, setSearchData] = useState([])
   const [dataLoading, setDataLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [pageCount, setPageCount] = useState(0)
   const [searchInfo, setSearchInfo] = useState({
      total:0,
      total_pages: 0,
   })
   const [pageTransition, setPageTransition] = useState(true)


   useEffect(() => {
      const pageTransitionTimeout = setTimeout(() => {
       setPageTransition(false)
      }, 500);
    
      return () => {
        clearTimeout(pageTransitionTimeout)
      }
    }, [])

   const handleSubmit =(e)=> {
      e.preventDefault()
      // console.log(searchValue)
      searchValue !== '' ? SearchAPI(searchValue) : setInputError(true)
      setDataLoading(true)
      setCurrentPage(1)
   }
   function handleChange(e) {
      setSearchValue(e.target.value)
   }

   async function SearchAPI(query) {
      try {
         let data = await unsplash.search.getPhotos({
            query: query,
            page: currentPage,
            perPage: 20,
         })
         setSearchData(data.response.results)
         // console.log('search', data.response)
         setDataLoading(false)
         setPageCount(data.response.total_pages)
         setSearchInfo({
            total: data.response.total,
            total_pages: data.response.total_pages
         })
         
      } catch (error) {
         setSError(error)
      }
   }

   function handlePageChange(e, value){
      setCurrentPage(value)
      setDataLoading(true)
   }
   
   useEffect(() => {
     SearchAPI(searchValue)
      setDataLoading(false)
   }, [currentPage])

   
  return (
   <>
   <NavToolbar page='search'/>
   <motion.div
   initial={{y:'30vh'}}
   animate={pageTransition? {y:0}:{y:0}}>
   <Box
   component='section'
   sx={{
      justifyContent:'center',
      minHeight:'100vh'
     }}
   >
      <Box 
      sx={{height: searchValue === '' ? '100vh': '15rem'}}
      className={style.inputBox}>
        <Paper onSubmit={(e) => handleSubmit(e)} component='form' sx={{pl:'1rem', display: 'flex', alignItems: 'center', width: 400}} >
         <InputBase 
         autoFocus 
         fullWidth 
         placeholder='Search image...'
         onChange={(e) => handleChange(e)}
         value={searchValue}
         />
         <Button type="submit" sx={{ fontSize: '1.5rem', p: '1rem'}} aria-label="search">
            <BsSearch />
         </Button>
        </Paper>
     </Box>

     {searchData !== null && searchData.length !== 0 ?
      <Stack 
      className={style.searchInfo}
      direction='row'
      alignItems='center' 
      component='div'
      color='secondary.main' 
      sx={{backgroundColor:'primary.main'}}>
         <Typography variant="overline" display="block" mr='2rem'>
            Found {searchInfo.total} images, showing 20
         </Typography>
         <Typography variant="overline" display="block">
            Page {currentPage} of {searchInfo.total_pages}
         </Typography>
      </Stack>
      :
         null
      }

     <Box 
     sx={{
      width:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
     }} 
     pt={2}
     className={style.imageGridBox}
     >
      {searchData !== null && searchData.length !== 0 ?

        (dataLoading ? 
         <Box className={style.gifBox}>
            <img width='100%' src={camera} alt='' />
         </Box>
           :
         <ImageGrid unsplash={unsplash} rawData={searchData} />)

         :
         // can be made reusable

         <Container
         sx={{
            width:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'3rem',
            opacity:'1'
         }}
         >
           <Box className={style.gifBox} sx={{ filter:' grayscale(200%)'}}>
              <img width='90%' src={camera} alt='' />
           </Box>
         </Container>
      }
     </Box>
     {searchData.length !== 0 ?
      <Container sx={{padding:'2rem', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Pagination 
      count={pageCount} 
      page={currentPage}
      onChange={handlePageChange} 
      size="large" />
      </Container>
      :
      null
      }
   </Box>
   </motion.div>
   </>
  )
}
