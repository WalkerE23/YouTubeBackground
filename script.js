//This script will play a playlist of youtube videos wherever a div with the specified tag is placed in the html.

//tv is the main ytp object, DO NOT remove. 
var tv;

//THIS IS WHERE YOU NAME THE YOUTUBE PLAYER. SET THE ID BELOW.
//<div id="[html_tag_id]" class="screen"></div>
var html_tag_id = 'tv';


//here are the player default settings. you can modify or add these, and they pretty much determine what controls are shown on the video.
//you can turn them off and on, and add more settings. 
//a complete list of default settings is here: https://developers.google.com/youtube/player_parameters under the Supported Parameters page.
var playerDefaults = {
  autoplay: 0, 
  autohide: 1, 
  modestbranding: 1, 
  rel: 0, 
  showinfo: 0, 
  controls: 0, 
  disablekb: 1, 
  enablejsapi: 0, 
  iv_load_policy: 3
};
playerDefaults.modestbranding = 1;
// alert(playerDefaults.modestbranding);
//This is your list of videos to play. as you can see, you can change some of the initial settings, such as start and stop times.
//if you dont want stop time (just the end of the vid), remove the 'endSeconds : n,' altogether.
var vid = [
			{'videoId': 'OKfSRcOqy5M', 'startSeconds': 0, 'endSeconds': 15,'suggestedQuality': 'hd720'},
			{'videoId': 'C-y70ZOSzE0', 'startSeconds': 0, 'endSeconds': 15,'suggestedQuality': 'hd720'},
			{'videoId': 'pJ-1G6xerwg', 'startSeconds': 0, 'endSeconds': 15,'suggestedQuality': 'hd720'},
      {'videoId': 'FM3GxWDu_bQ', 'startSeconds': 0, 'endSeconds': 15, 'suggestedQuality': 'hd720'}
		],

//So this is what keeps track of the current video. 
//this is in a format bc of a workaround on something weird. its a bit confusing why, but... I think its a bug with the youtube api
//so ignore this for time being, and if something around it breaks let me know.
currVid = {
  index: 0,
  inc: 0.0,
  playRandom: function(){
    this.index =  Math.floor(Math.random() * vid.length);
  },
  playNextVideo: function(){
    if(this.inc % 1 == 0){
      if((this.index) >= vid.length-1){
        this.index = 0;
      }
      else{
        this.index += 1;
      }
      this.inc += 0.5;
    }
    else{
      this.inc += 0.5;
    }
  }
}


function onYouTubePlayerAPIReady(){
  //create the tv object!
  tv = new YT.Player(html_tag_id, {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  //this starts the player

  //IF YOU WANT TO SHUFFLE THE PLAYLIST, CALL THIS METHOD. IF NOT, JUST COMMENT IT OUT.//
  shufflePlaylist(vid);
  //-------------///

  //load the video
  tv.loadVideoById(vid[currVid.index]);
  tv.mute(); //set to mute. dont call this if you want sound. 

  //this makes it fullscreen
  rescaleFullScreen();
}

function onPlayerStateChange(e) {
  //every time something happens to the video (paused, started, finished, buffering) this function is called. 
  //you can determine what happens at each point (or nothing at all!)

  if(e.data === 0){
    //VIDEO ENDED
    //GRABS ANOTHER VIDEO AND PLAYS IT

    //----------------------------change video here! ----------------------------//
    // currVid.playRandom(); ////<-- Call THIS to just play a totally RANDOM video each time!
    currVid.playNextVideo();   ////<-- Call THIS to play the NEXT video in order

    //Load the video into the tv
    tv.loadVideoById(vid[currVid.index]);
    //--------------------------------------------------------------------------//
  }
  else if (e.data === 1){
    //VIDEO ON AND PLAYING WELL
    //DOES NOTHING (or whatever you want)
  }
  else if(e.data === 2){
    //VIDEO PAUSED
    //DOES NOTHING (or whatever you want)
  }
  else if(e.data === 3){
    //VIDEO BUFFERING
    //DOES NOTHING (or whatever you want)
  }
}

function rescaleFullScreen(){
  //this function will size the video however you want it.

  //--Play around with this, it just puts a little more space on the sides of the video. you may or may not want it.---
  var buffer_w = 0
  var buffer_h = 0
  //-----------------

  var w = $(window).width() + buffer_w,
    h = $(window).height() + buffer_h;

  //keep video ratio correct
  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.' +html_tag_id+'.screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.' + html_tag_id + '.screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}


function shufflePlaylist(a){
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
