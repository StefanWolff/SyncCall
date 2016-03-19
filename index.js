var getUserMedia = require('getusermedia')

// 1. Start streaming audio
getUserMedia({ video: false, audio: true }, function (err, stream) {
  if (err) return console.error(err)

  var Peer = require('simple-peer')
    peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })

// 1. If peer gets signal get JSON data

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })

// 2. Connect to peer with SDP info from textarea "otherId"

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

// 3. Sends text parsed into "yourMessage" textarea

  document.getElementById('send').addEventListener('click', function () {
   var yourMessage = document.getElementById('yourMessage').value
   peer.send(yourMessage)
 })

// 4. Inserts _all_ recieved data into "messages"

 peer.on('data', function (data) {
   document.getElementById('messages').textContent += data + '\n'
 })

// 5. Checks incoming data and fires function depending on the value

  peer.on('data', function (data) {

    if (data.includes("shared youtube link https://www.youtube.com/watch?v=")){
      var myVar2 = data.replace("shared youtube link https://www.youtube.com/watch?v=","");
      player.loadVideoById(myVar2, 0, "default");
      console.log("Loading other session youtube link");

  }
    else if (data == "- paused the Youtube video"){
      player.pauseVideo()
  }
    else if (data == "- started the Youtube video") {
      player.playVideo();
  }
    else if (data.includes("peer went to second: ")) {
      var seeks = data.replace("peer went to second: ","");
      player.seekTo(seeks)
  }
      else {
      console.log("Text message recieved");
  }
  })

// 6. Create audio stream and play

  peer.on('stream', function (stream) {
    var audio = document.createElement('audio')
    document.body.appendChild(audio)
    audio.src = window.URL.createObjectURL(stream)
    audio.play()
  })
})
