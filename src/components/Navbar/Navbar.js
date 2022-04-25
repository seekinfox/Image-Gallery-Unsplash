import { Box, IconButton } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@emotion/react'
import { useLocation } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsSearch, BsFillImageFill} from  'react-icons/bs'

const useStyle = makeStyles(theme => ({
   nav: {
      position:'absolute',
      top:"0",
      left:"0",
      width:'4rem',
      height:'100vh',
      padding: '1rem 0',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
         width:'100%',
         top:'0',
         height: '4rem'
      },
      [theme.breakpoints.down('md')]: {
         width:'100%',
         top:'0',
         height: '4rem'
      },
   },
   buttonIcon: {
      color: 'white',
   },
   
   link: {
      display: 'flex',
      justifyContent: 'center',
      padding: '.5rem 0',
      marginBottom: '1rem',
   },

   active: {
      transition: '.1s ease',
      transform: 'scale(1.1)'
   }

}))

export default function Navbar({nav, setNav}) {

   const loacation = useLocation()
   const {pathname} = loacation
   const splitLocation = pathname.split('/')
   const theme = useTheme();

   const style = useStyle(theme)
   const linksData = [
      {
         id: 0,
         path: '/',
         icon: <AiFillHome className={style.buttonIcon}/>,
   
      },
   
      {
         id: 1,
         path: 'gallery',
         icon: <BsFillImageFill className={style.buttonIcon}/>,
   
      },
      {
         id: 2,
         path: 'search',
         icon: <BsSearch className={style.buttonIcon}/>
      },
   ];

  return (
    <>
      <Box 
      backgroundColor='secondary.main'
      className={style.nav}
      component="nav"
      color='white'
      >
      {linksData.map(({id, path, icon}) => 
         <Link
         key={id}
         className={`${style.link} ${
         splitLocation[1] === path ? style.active : ""
         }`}
         to={path}
         >
            <IconButton sx={{borderRadius: 0, width: '100%'}} variant="outlined" size='large'>
               {icon}
            </IconButton>
         </Link>
      )}
      </Box>
      <Outlet />
    </>
  )
}
