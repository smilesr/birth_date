$( document ).ready(function() {
    $('.music_info').on('click','.artist_info', function(e){
        e.preventDefault();
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
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&callback=?",
        contentType: "application/json; charset=utf-8",
        // async: false,
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
    var musicians = [];
    var urlOrder = [];
  
    var likelySelection = {};
    for (var i=0; i<hits.length; i++){
      if (titles[i].includes("discography")){
          likelySelection = {};
          likelySelection[0] = hits[0];
          break;
      }
      if (hits[i].search(/(band|singer|musician|rapper|album|group)/) != -1){
        musicians.push(hits[i]);
        urlOrder.push(i);
      }
    }
    if (Object.keys(likelySelection).length === 0 && likelySelection.constructor === Object){
      if (musicians.length === 1){
        showResults(musicians[0],0,wikiUrl);
        return;
      } else {
        var songName = $('.song_info').text();
        likelySelection[0] = musicians[0];
        for (var j=0; j<musicians.length; j++){
          var m = musicians[j].toLowerCase();
          var n = songName.toLowerCase().trim();
          // var o = "discography";
          // if (titles[j].includes(o)){
          //   likelySelection = {};
          //   likelySelection[0] = musicians[0];
          //   break;
          // }
          if (m.includes(n) || m.includes("american")) {
            likelySelection = {};
            likelySelection[j] = musicians[j];
          }
        }
      }
    }

    var x = likelySelection;
    var k = parseInt(Object.keys(likelySelection));
    var v = Object.values(likelySelection);
    showResults(v,k,wikiUrl);
      // $('#well2').append(`<button id="go_to_wiki_page"><a href="${wikiUrl[k]}" target="_blank">Learn More</a></button>`);
      // $('#go_to_wiki_page').attr('href', wiki_page);target="_blank"
      
    
  }
  function showResults(data,k,wikiUrl){
    $('#well2').addClass("well");
    // $( ".results" ).append( data );
    var artistName = $(".artist_info").text();
    $('#well2').append(`<button id="go_to_wiki_page"><a href="${wikiUrl[k]}" target="_blank">Learn About ${artistName} </a></button>`);

    // $('.results').append(`<button id="go_to_wiki_page"><a href="${wikiUrl[k]}" target="_blank">Learn more about ${artistName}</a></button>`);
        $( ".results" ).append( data );
  }
})
