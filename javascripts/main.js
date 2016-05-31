$(document).ready(function() {

  var searchWikipedia = function() {
    var searchString = $('#search-string').val();
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      data: { action: 'query', list: 'search', srsearch: searchString, format: 'json' },
      dataType: 'jsonp',
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: function(data) {
        console.log(data);
        $('.results').empty();
        var searchResults = data.query.search;
        var individualResult = '';

        for (result in searchResults) {
          individualResult = '<div class="well" id="result'+searchResults.indexOf(result)+'"><a href="http://en.wikipedia.org/wiki/'+searchResults[result].title+'" target="_blank"><h2>'+searchResults[result].title+'</h2><p>'+searchResults[result].snippet+'</p></a></div>'

          $('.results').append(individualResult);
        }
      }
    });
  };

  $('#search-button').on('click', searchWikipedia);
  $('#search-string').on('click', function() {
    $('#search-string').val('');
    $('.results').empty();
  });
  $('#search-string').keyup(function(event){
    if (event.keyCode == 13) {
      searchWikipedia();
    }
  });
});
