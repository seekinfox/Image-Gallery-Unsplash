import React, { useState, useEffect } from "react";
import "./styles/main.scss";
import axios from "axios"
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./components/Pages/Gallery";
import Search from "./components/Pages/Search";
import Opening from "./components/Pages/Opening";
import { createTheme, ThemeProvider } from '@mui/material'
import ImageDetails from "./components/Pages/ImageDetails";
import { createApi } from "unsplash-js";
import Collection from "./components/Features/Collection";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
    },
  },

})
const unsplash = createApi({
  accessKey: "fUccPr_-dHJ0hIkUciO_v7VI77hylduIqGM6mpqxGMU",
});

function App() {
  const [nav, setNav] = useState(false)
  const [rawData, setRawData] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState(null)
  const [shuffle, setShuffle] = useState(true)
  
  async function loadDataAPI (count = 20) {
    const accessKey = 'fUccPr_-dHJ0hIkUciO_v7VI77hylduIqGM6mpqxGMU'
    let apiRoot = "https://api.unsplash.com";
    let dataURL = `${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`
    
    try {
      let data = await axios.get(dataURL)
      setRawData(data.data)
      setLoadingData(false)
    } catch (err) {
      setError(err)
      //console.log(err); // TypeError: failed to fetch
    }        
  }
  // console.log("loadingData", loadingData)
  // console.log("rawData", rawData)
  // console.log('error', error)

  useEffect(() => {
    loadDataAPI()

  }, [shuffle])
  

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar nav={nav} setNav={setNav} />}>
            <Route index element={<Opening/>}/>
            <Route path="gallery" element={<Gallery setShuffle={setShuffle} rawData={rawData} />}/>
            <Route path="search" element={<Search unsplash={unsplash} />} />
            <Route path="/image_details/:id" element={<ImageDetails unsplash={unsplash}/>}/>
            <Route path="collection/:id" element={<Collection/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
