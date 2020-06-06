let videoStream = './public/uploads/6.mp4';

function setVideoStreem(video ){
  
    videoStream = './public/uploads/'+video;
}
function getVideo(){
    return videoStream;
}

module.exports = {setVideoStreem,getVideo};