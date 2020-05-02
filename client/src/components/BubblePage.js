import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/AxiosWithAuth";


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getData = () =>{
    axiosWithAuth()
    .get("/colors")
    .then(res=>{
      console.log("BUBBLEPAGE.JS RES SUCCESS", res)
       setColorList(res.data)
    })
    .catch(err=>
      console.log("BUBBLEPAGE.JS RES ERROR",err))
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
