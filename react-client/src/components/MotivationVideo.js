import React from "react";

function MotivationVideo(prob) {

   
   const url = "https://youtu.be/y8FsQTPqwUA";
  return (
    <div className="App">      
        src={url}
        width='100%'
            height='100%'
            controls = {true}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen       
    </div>
  );
}
export default MotivationVideo;