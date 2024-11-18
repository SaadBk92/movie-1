import React, { useState } from 'react'
import '../../src/App.scss'
import {register} from '../services/authService'
import { useNavigate } from 'react-router-dom';
import './AddUpdate.scss'
import { useDropzone } from 'react-dropzone';


const AddUpdate = (route) => {

    const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file)); // Preview the dropped image
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });


const registerHandler =async (e) => {
    e.preventDefault()
    if(checkValues()){
      await register(values.email,values.password)
      navigate("/login" , {
        replace : true
      })
    }
  }

console.log('route',route);


  return (
    <div className="create-movie-page">
    <h1>Create a new movie</h1>
    <div className="form-container">
      <div className="image-drop-area" {...getRootProps()}>
        <input {...getInputProps()} />
        {image ? (
          <img src={image} alt="Preview" className="preview-image" />
        ) : (
          <>
            <p>📂</p>
            <span>{isDragActive ? 'Drop the image here...' : 'Drop an image here'}</span>
          </>
        )}
      </div>
      <div className="form-inputs">
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Publishing year" />
        <div className="button-group">
          <button className="cancel-button">Cancel</button>
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  </div>
   
  )
}

export default AddUpdate