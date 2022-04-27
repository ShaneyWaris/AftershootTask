import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
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
                  <div className="column">
                      <MyCustomImage src={src} />
                  </div>
              ))
          } </div>
    </div>
  );
}


// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const MyCustomImage = ({ src }) => {
  const placeholder = useRef(null);
  const [imageOnViewport, setImageOnViewport] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageOnViewport(true);
          observer.disconnect();
        }
      });
    });
    observer.observe(placeholder.current);
  }, []);

  if (imageOnViewport) return <img src={src} width="450" height="300"/>;
  return <p ref={placeholder}>Loading...</p>;
}

export default App;