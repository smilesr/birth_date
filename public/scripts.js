$( document ).ready(function() {
    $('.results').on('click','.artist_info', function(e){
        console.log("inside");

        e.preventDefault();
        var artistInfo = $(".artist_info").text();
        var songInfo = $(".song_info").text();
        var input = artistInfo.concat(songInfo);
        goToYouTube();

        function showResponse(response) {
          var videoId = response.items[0].id.videoId;
          $('#existing-iframe-example').attr( "src", "https://www.youtube.com/embed/" + videoId );
          console.log("showresponse");
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

  //     var tag = document.createElement('script');

  //     tag.src = "https://www.youtube.com/iframe_api";
  //     var firstScriptTag = document.getElementsByTagName('script')[0];
  //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //     var player;
  //     function onYouTubeIframeAPIReady() {
  //       player = new YT.Player('player', {
  //         height: '390',
  //         width: '640',
  //         videoId: 'M7lc1UVf-VE',
  //         events: {
  //           'onReady': onPlayerReady,
  //           'onStateChange': onPlayerStateChange
  //         }
  //       });
  //     }
  //     function onPlayerReady(event) {
  //       event.target.playVideo();
  //     }

  //     var done = false;
  //     function onPlayerStateChange(event) {
  //       if (event.data == YT.PlayerState.PLAYING && !done) {
  //         setTimeout(stopVideo, 6000);
  //         done = true;
  //       }
  //     }
  //     function stopVideo() {
  //       player.stopVideo();
  //     }
  // })

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
//*********************//
$( document ).ready(function() {
    $('.results').on('click','.artist_info', function(e){
        console.log("inside");

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
            showResults(data);
          },
          error: function (errorMessage) {
        }
      }
    )});

    function showResults(data){
      $( ".results" ).append( data );

    }
  })

