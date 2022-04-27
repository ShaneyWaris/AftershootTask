import React, { useState } from "react";
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const updateImagesState = (e) => {
    if (e.target.files) {
      const imagesURLArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setImages((previousImages) => previousImages.concat(imagesURLArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  return (
    <div className="App">
        <input type="file" multiple onChange={updateImagesState} />

        <div className="row"> {
              images.map((src) => (
                  <img className="column" src={src} alt=''/>
              ))
          } </div>  
    </div>
  );
}

export default App;