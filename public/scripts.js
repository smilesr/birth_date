$( document ).ready(function() {
    $('.music_info').on('click','.song_info', function(e){
        e.preventDefault();
        $( "div#well3" ).addClass( "weller" );
        var artistInfo = $(".artist_info").text();
        var songInfo = $(".song_info").text();
        var input = artistInfo.concat(songInfo);
        goToYouTube();

        function showResponse(response) {
          var videoId = response.items[0].id.videoId;
          $('#existing-iframe-example').attr( "src", "https://www.youtube.com/embed/" + videoId );
        }

        function goToYouTube() {
            gapi.client.load('youtube', 'v3', function(){
                gapi.client.setApiKey('');
                search();
            })
        }

        function search() {
            var request = gapi.client.youtube.search.list({
                part: 'snippet',
                q: input
            });
            request.execute(showResponse);
        }
    })
    });

var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('existing-iframe-example', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

$( document ).ready(function() {
  $('form#date_submit').on('submit', function(e){
    $( "div#well1" ).addClass( "weller" );
  });
  $('.music_info').on('click','.artist_info', function(e){
      e.preventDefault();
      var fullArtist = $(".artist_info").text();
      var input = artistName(fullArtist);

      function artistName(fullArtist){
        var arr = fullArtist.split(" ");
        var reg2 = /\s|\./;
        var i = arr.length;
        while (i--){
          if (arr[i].search(reg2) === 0 || arr[i] == false){
            arr.splice(i,1);
            continue;
          }
          arr;
        }
        var newStr = "";
        for (var i=0; i<arr.length; i++){
          if (i === 0){
            newStr += (arr[i] + " ");
          } else if (arr[i][0] !== arr[i][0].toUpperCase()) {
            break;
          } else {
            newStr += (arr[i] + " ");
          }
        }
        return newStr;
      }
      $.ajax({
        type: "GET",
        data: input,
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&limit=20&search=" + input + "&callback=?",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
          console.log(data);
          findMusician(data);
        },
        error: function (errorMessage) {
      }
    }
  )
  });
  function findMusician(data){
    var titles = data[1];
    var hits = data[2];
    var wikiUrl = data[3];
    var beatlesBlurb = "The Beatles were an English rock band, formed in Liverpool in 1960. With members John Lennon, Paul McCartney, George Harrison and Ringo Starr, they became widely regarded as the foremost and most influential act of the rock era";
    if (titles[0] == "Beatles"){
      showResults(beatlesBlurb,0,wikiUrl);
      return
    }
    if (titles.length === 1){
      showResults(hits[0],0,wikiUrl);
      return;
    }
    var candidates = [];
    var candidatesUrlOrder =[];
    var musicians = [];
    var musiciansUrlOrder = [];
    var urlOrder = [];
    var urlOrderChoice;
  
    var likelySelection = {};
    for (var i=0; i<hits.length; i++){
      if (titles[i].includes("discography")) {
          likelySelection = {};
          if (hits[0].search(/(band|singer|musician|music|rapper|album|group)/) != -1 && titles[0] != '') {
          likelySelection[0] = hits[0];
          urlOrderChoice = 0;
          } else {
            likelySelection[0] = hits[1];
            urlOrderChoice = 1;
          }
          break;
      }
      if (titles[i].includes("singer") || titles[i].includes("band")){
        candidates.push(hits[i]);
        candidatesUrlOrder.push(i);
      }
      if (hits[i].search(/(band|singer|musician|rapper|album|group)/) != -1){
        musicians.push(hits[i]);
        musiciansUrlOrder.push(i);
      }
    }
    if (Object.keys(likelySelection).length === 0 && likelySelection.constructor === Object){
      if (candidates.length === 1){
        showResults(candidates[0],candidatesUrlOrder[0], wikiUrl);
        return;
      } else if (musicians.length === 1) {
        showResults(musicians[0],musiciansUrlOrder[0], wikiUrl);
        return;
      } else {
        var songName = $('.song_info').text();
        likelySelection[0] = musicians[0];
        for (var j=0; j<musicians.length; j++){
          var m = musicians[j].toLowerCase();
          var n = songName.toLowerCase().trim();

          if (m.includes(n) || m.includes("american")) {
            likelySelection = {};
            likelySelection[j] = musicians[j];
            urlOrderChoice = urlOrder[j];
          }
        }
      }
    }

    var v = Object.values(likelySelection);
    // if (v === "")
    showResults(v,urlOrderChoice,wikiUrl);
  }
  function showResults(profile,k,wikiUrl){
    $('#well2').addClass("well");
    $('#well2').append(`<a id="go_to_wiki_page" href="${wikiUrl[k]}" target="_blank">Learn More >> </a>`);
    $( ".results" ).append( profile );
  }
})

function validateForm() {
    var x = document.forms["myForm"]["birthdate"].value;
   
    var regForm = /\d\d\d\d-\d\d-\d\d/;
    if (x.search(regForm) == -1) {
      var errorMsg = document.getElementById("error_message");
      errorMsg.className = "alert alert-warning alert-dismissable";
      errorMsg.innerHTML = "<a href='#'' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Wrong date format.  Enter date in this format yyyy-mm-dd.  For example, September 10, 2015, would be 2015-09-10.</strong>";
      return false;
    }
}
