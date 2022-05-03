import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@emotion/react'
import { useLocation } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsSearch, BsFillImageFill} from  'react-icons/bs'

const useStyle = makeStyles(theme => ({
   nav: {
      position:'fixed',
      left:"0",
      bottom: 0,
      width:'4rem',
      height:'100vh',
      padding: '1rem 0',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 -10px 20px rgba(0,0,0,0.05)',

      [theme.breakpoints.down('sm')]: {
         left:"0",
         width:'100%',
         height: '4rem',
         flexDirection: 'row',
         justifyContent: 'space-evenly',
      },
     
      [theme.breakpoints.up('md')]: {
         boxShadow: '10px 0 20px rgba(0,0,0,0.15)',
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
      transition: '.3s ease',
      boxShadow: '6px 0 0 #9a1e00',

      [theme.breakpoints.down('sm')]:{
        boxShadow: '0 -5px 0 #9a1e00',
        height:'100%',
      }
      
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
         title:'Home'
   
      },
   
      {
         id: 1,
         path: 'gallery',
         icon: <BsFillImageFill className={style.buttonIcon}/>,
         title:'Gallery'
      },
      {
         id: 2,
         path: 'search',
         icon: <BsSearch className={style.buttonIcon}/>,
         title: 'Search'
      },
      
   ];

  return (
    <>
      <Box 
      backgroundColor='primary.main'
      className={style.nav}
      component="nav"
      color='secondary.main'
      zIndex={2000}
      >
      {linksData.map(({id, path, icon, title}) => 
         <Link
         key={id}
         className={`${style.link} ${
         splitLocation[1] === path ? style.active : ""
         }`}
         to={path}
         >
            <Tooltip arrow disableFocusListener title={title}>
               <IconButton sx={{borderRadius: 0, width: '100%'}} variant="outlined" size='large'>
                  {icon}
               </IconButton>
            </Tooltip>
         </Link>
      )}
      </Box>
      <Outlet />
    </>
  )
}
