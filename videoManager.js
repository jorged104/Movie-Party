const videoStream = './public/6.mp4';

function setVideoStreem(video ){
    videoStream = video;
}
function getVideo(){
    return videoStream;
}

module.exports = {setVideoStreem,getVideo};