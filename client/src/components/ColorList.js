import React, { useState } from "react";

import { axiosWithAuth } from "../utils/AxiosWithAuth" 

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("LIST OF COLORS IN COLORLIST",colors);
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [fields,setFields] = useState({
    code:{hex:""},
    color: "",
    id: Date.now()
  })
  const index = colorFindIndex => colors.indexOf(colorFindIndex)
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // console.log(" COLOREDIT ID IN COLORLIST.JS",color.id)
  };

  // function getIndex(value,arr,prop) {
  //   for(let i = 0;i++;i<=arr.length)
  //   {
  //     if(arr[i][prop]===value){
  //       return i
  //     } 
  //   }
  //   return -1
  // }
  // NOT SURE WHY THE ABOVE DIDN'T WORK, FORGOT THERE WAS INDEXOF()
  // let INDEX = getIndex(colorToEdit.id,colors,'id')

  
  const saveEdit = e => {
    e.preventDefault();
    
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/:${colorToEdit.id}`,colorToEdit)
    .then(res=>{
      console.log("SUCCESSFUL PUT TO API, COLORLIST.JS", res)
      // updateColors(res.data)})
      // updateColors(...colors)})
      // updateColors(  [...colors,{...colors[index],
      //     code:res.data.code,color:res.data.color,id:res.data.id}])})
      // updateColors(...colors,res.data)
      updateColors([ ...colors.filter((color) => color.id !== colorToEdit.id), res.data
      ])})
      setEditing(false)
    .catch(err=>
      console.log("ERROR IN PUT TO API COLORLIST.JS", err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
      // const colorArr = [...colors.splice(index(color),1)]
      const colorArr = [...colors]
      colorArr.splice(index(color),1) //finally figured out that splice will return the element that you removed, so just remove it, and return the array
    // delete colorArr[index];

    // console.log("COLORARR", colorArr)
    console.log("INDEX OF COLOR TO BE EDITED", index(color))
    console.log("COLOR PARAM IN DELETE",color)
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/:${color.id}`)
    .then(res=>{
      console.log("DELETE SUCCESS",res)
      
      //  updateColors([...colors.splice(index,1)])
      updateColors([...colorArr])
    })
    .catch(err=>{
      console.log("DELETE ERROR",err)
    })

   
    
  };
  const changeHandler = (e) =>{
    setFields({
      ...fields,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    addColor(fields)
    setFields({
      code:{hex:""},
      color: "",
      id: Date.now()
    })
  }

  const addColor = (colorData) =>{
    axiosWithAuth()
    .post("/colors",colorData)
    .then((res)=>{
       // updateColors(  [...colors,{...colors[index],
      //     code:res.data.code,color:res.data.color,id:res.data.id}])})
      console.log("POST SUCCESS", res)
      updateColors([...colors,{...colors[colors.length-1],
        code:res.data.code,color:res.data.color,id:res.data.id}])
    })
    .catch(err=>console.log("POST ERROR", err))
  }
  console.log("ALL COLORS FOR SCIENCE IN COLORLIST.JS", colors)
  console.log("COLORTOEDIT NEW INFO IN COLORLIST.JS", colorToEdit.id)
  
  
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <label>Add a color
        <input
        name = "code"
        onChange = {changeHandler}
        type = "text"
        value = {fields.code.hex}
        placeholder = "hex value"
        />
        <input
        name = "color"
        onChange = {changeHandler}
        type = "text"
        value = {fields.color}
        placeholder = "Color name"
        />
        <button type = 'submit' onClick = {handleSubmit}>Add a color</button>
      </label>

    </div>
  );
};

export default ColorList;
