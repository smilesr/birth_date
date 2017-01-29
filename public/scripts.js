$( document ).ready(function() {
    $('.results').on('click','.artist_info', function(e){
        console.log("inside");

        e.preventDefault();
        var input = $(".artist_info").text();
        goToYouTube();

        function showResponse(response) {
          var responseString = JSON.stringify(response, '', 2);
          document.querySelector('.showIt').innerHTML += responseString;
          console.log("showresponse");
        }

        function goToYouTube() {
            gapi.client.load('youtube', 'v3', function(){
                gapi.client.setApiKey();
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



    //     $.ajax({
    //       type: "GET",
    //       data: input,
    //       url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&callback=?",
    //       contentType: "application/json; charset=utf-8",
    //       async: false,
    //       dataType: "json",
    //       success: function (data, textStatus, jqXHR) {
    //         console.log(data);
    //         showResults(data);
    //       },
    //       error: function (errorMessage) {
    //       }
    //     })
    // });

