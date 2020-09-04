const socket = io('/');
let peer = new Peer(); 

peer.on('open' , userId => {
    socket.emit('join-room' , ROOM_ID , userId);
})



const connectNewuser = (userId , stream) => {
    var call = peer.call(userId, stream);
    const videoObj = document.createElement('video');
    call.on('stream', function(userStream) {
      addVideoStream(videoObj , userStream);
    });
  
}
const myViedo = document.createElement('video');
const videoList = document.getElementById('videoList');
myViedo.muted = true;
navigator.mediaDevices.getUserMedia({
    video : true,
    audio : true
}).then(stream => {
    console.log(stream);
    addVideoStream(myViedo , stream);
    peer.on('call' , call => {
        const viedo = document.createElement('video');
        call.answer(stream);
        call.on('stream' , otherVideoStream => {
          addVideoStream(viedo , otherVideoStream);
      })  
    })
    socket.on('user-connected' , userId => {
        connectNewuser(userId , stream);
    });    
    
})

const addVideoStream = (video , stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata' , () => {
            video.play()
    });
    videoList.append(video)
}