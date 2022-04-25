import React, { useState, useEffect } from "react";
import "./styles/main.scss";
import axios from "axios"
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./components/Pages/Gallery";
import Search from "./components/Pages/Search";
import Opening from "./components/Pages/Opening";
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#311b92',
    },
  },

})

function App() {
  const [nav, setNav] = useState(false)
  const [rawData, setRawData] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState(null)
  
  async function loadDataAPI (count = 1) {
    const accessKey = 'fUccPr_-dHJ0hIkUciO_v7VI77hylduIqGM6mpqxGMU'
    let apiRoot = "https://api.unsplash.com";
    let dataURL = `${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`
    
    try {
      let data = await axios.get(dataURL)
      setRawData(data.data)
      setLoadingData(false)
    } catch (err) {
      setError(err)
      console.log(err); // TypeError: failed to fetch
    }        
  }
  console.log("loadingData", loadingData)
  console.log("rawData", rawData)
  console.log('error', error)

  useEffect(() => {
    loadDataAPI()

  }, [])
  

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar nav={nav} setNav={setNav} />}>
            <Route index element={<Opening/>}/>
            <Route path="gallery" element={<Gallery />}/>
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
