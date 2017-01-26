    $('.search_value').keypress(function (e) {
      if (e.which == 13)
        {
        console.log("inside");
        e.preventDefault();
        var input = $(".search_value").val();
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
    )};