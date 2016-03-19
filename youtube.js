  // 2. This code loads the IFrame Player API code asynchronously.

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'hzBCI13rJmA',
      playerVars: {
                'autoplay': 0,
                'controls': 0
            },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  var playerReady = false;
  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    playerReady = true;

    }

  // 5. When the player state changes a notification is sent to the console and send via rtc + Jquery slider is bound to state 1 - playing in the Youtube API.

  function onPlayerStateChange(event) {

    if (player.getPlayerState() == 2) {
      var sendPause = "- paused the Youtube video";
      peer.send(sendPause);
      console.log("Paused the video");
    }

    if (player.getPlayerState() == 1) {
      var sendPlay = "- started the Youtube video";
      var crerf = player.getDuration();

      var timethen2 = setInterval(secondTime, 1000);
      function secondTime() {
        var time24 = h24(player.getCurrentTime());
        document.getElementById('timein24').innerHTML = time24;
       }
      var h24 = function secondsToHms(d) {
         d = Number(d);
         var h = Math.floor(d / 3600);
         var m = Math.floor(d % 3600 / 60);
         var s = Math.floor(d % 3600 % 60);
         return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); }
      $(function () {
var slider = $("#slider").slider({
            max: crerf,
  start: function( event, ui ) {
    $(ui.handle).find('.ui-slider-tooltip').show();
    console.log(ui);
  },

  slide: function(event, ui) {
    $(ui.handle).find('.ui-slider-tooltip').text(h24(ui.value));
  },
  create: function( event, ui ) {
    var tooltip = $('<div class="ui-slider-tooltip" />').css({
        position: 'absolute',
        top: -25,
        left: -10
    });
    $(event.target).find('.ui-slider-handle').append(tooltip);
  },
  stop: function( event, ui ) {
    $(ui.handle).find('.ui-slider-tooltip').hide();
    $( "#amount" ).val( ui.value );
                player.seekTo(ui.value);
                peer.send("peer went to second: " + ui.value);
  }
});
});
peer.send(sendPlay);
        console.log("Started the video");
    }
}
// 6. Modifies the input of the URL, checks for parameters, saves the youtube id to cache and loads the video.

$("#loadyt").on("click", function() {
  var pre_url= "https://www.youtube.com/watch?v=";
  var thelink = document.getElementById("youtube_link").value;
  if (thelink == ""){
    alert("No input - Please insert a Youtube link");
  }
  else if (!thelink.includes(pre_url)){
    alert("Insert a Youtube link");
  }
  else{
  var ytid = thelink.replace(pre_url,"");
      sessionStorage['myKey'] = ytid;

      console.log("Loaded link");
    }
  });

// 7. Shares the link with the connected peer(s).

  document.getElementById('shareyt').addEventListener('click', function () {
    var myVar = sessionStorage['myKey'];
    var myVar2 = "shared youtube link https://www.youtube.com/watch?v="+myVar;
    player.loadVideoById(myVar, 0, "default");
    peer.send(myVar2);
    console.log("Played and shared the video with current session");
  })

//8. Mute/unmute button

  $('.mutebtn').click(function(){
      var $this = $(this);
      $this.toggleClass('mutebtn');
      if($this.hasClass('mutebtn')){
          $this.text('mute');
          player.unMute();
      } else {
          $this.text('sound');
          player.mute();
      }
  });
