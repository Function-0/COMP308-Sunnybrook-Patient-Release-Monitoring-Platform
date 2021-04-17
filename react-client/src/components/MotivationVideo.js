import React from "react";

function MotivationVideo(prob) {
   
  const url1 = "https://www.youtube.com/embed/PgQ3sW0BWfI";
  const url2 = "https://www.youtube.com/embed/XSo1brg8pT0";
  const url3 = "https://www.youtube.com/embed/T1XLHsz4r_M";
  const gameurl = "https://dami908.github.io/Micro-Garrisson/"; 
  return (
    <div className="App"> 
       {/* <video    
        src={url}
        width='50%'
            height='50%'
            controls = {true}s
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen    />    */}
        {/* <video width="320" height="240" controls> 
        <source src={url}/> </video> */}
      <div>
      <iframe title="very exercise motivational game copywrite emmanuel ajay" width="1100" height="900" src={gameurl}> </iframe>
      </div>
      <div>
      <iframe title="generic exercise motivation 1" width="1100" height="900" src={url1}> </iframe>
      </div>
      <div>
      <iframe title="genric exercise motivation 2" width="1100" height="900" src={url2}> </iframe>
      </div>
      <div>
      <iframe title="genric exercise motivation 3" width="1100" height="900" src={url3}> </iframe>
      </div>
  </div>
  );
    
    
}
export default MotivationVideo;