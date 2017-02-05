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
      var input = $(".artist_info").text();
      $.ajax({
        type: "GET",
        data: input,
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
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
    var hits = data[2];
    for (var i=0; i<hits.length; i++){
      if (hits[i].search(/(band|singer|musician)/) != -1){
        showResults(hits[i]);
      }
    }
  }
  function showResults(data){
    $( ".results" ).append( data );
  }
})

//****************************************

























// $( document ).ready(function() {
//     $('.results').on('click','.artist_info', function(e){
//         e.preventDefault();
//         var artistInfo = $(".artist_info").text();
//         var songInfo = $(".song_info").text();
//         var input = artistInfo.concat(songInfo);
//         goToYouTube();

//         function showResponse(response) {
//           var videoId = response.items[0].id.videoId;
//           $('#existing-iframe-example').attr( "src", "https://www.youtube.com/embed/" + videoId );
//         }

//         function goToYouTube() {
//             gapi.client.load('youtube', 'v3', function(){
//                 gapi.client.setApiKey('AIzaSyATNpPM04GxYChGc1wRD9TlCg3m4UG7-oc');
//                 search();
//             })
//         }

//         function search() {
//             var request = gapi.client.youtube.search.list({
//                 part: 'snippet',
//                 q: input
//             });
//             request.execute(showResponse);
//         }

//     })
//     });

// $( document ).ready(function() {
//   $('.results').on('click','.artist_info', function(e){
//       e.preventDefault();
//       var input = $(".artist_info").text();
//       $.ajax({
//         type: "GET",
//         data: input,
//         url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&callback=?",
//         contentType: "application/json; charset=utf-8",
//         async: false,
//         dataType: "json",
//         success: function (data, textStatus, jqXHR) {
//           console.log(data);
//           findMusician(data);
//           // showResults(data[2][0]);
//         },
//         error: function (errorMessage) {
//       }
//     }
//   )


//   });
//   function findMusician(data){
//     var hits = data[2];
//     for (var i=0; i<hits.length; i++){
//       if (hits[i].search(/(band|singer|musician)/) != -1){
//         showResults(hits[i]);
//       }
//     }
//   }
//   function showResults(data){
//     $( ".results" ).append( data );
//   }
// })










// var tag = document.createElement('script');
// tag.id = 'iframe-demo';
// tag.src = 'https://www.youtube.com/iframe_api';
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('existing-iframe-example', {
//         events: {
//           'onReady': onPlayerReady,
//           'onStateChange': onPlayerStateChange
//         }
//   });
// }

// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }

// function stopVideo() {
//   player.stopVideo();
// }

