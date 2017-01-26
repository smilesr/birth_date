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