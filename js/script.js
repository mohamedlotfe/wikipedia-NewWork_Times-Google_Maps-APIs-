
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetstr = $('#street').val();
    var citystr =$('#city').val();
    var address =streetstr + ', ' + citystr;

    $greeting.text('you want to live it '+ address+' now sir ?!');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='
    + address + '';
    $body.append('<img class="bgimg" src="'+ streetviewUrl + '">');

    // New Yourk times API
  var nytimesUrl ='http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+citystr +
       '&sort=newest&api-key=a5af52efe8634841a56177558b9f9af4';

    $.getJSON(nytimesUrl,function(data){
    $nytHeaderElem.text('new york times about '+citystr);
    articles =data.response.docs;
    for (var i=0; i<articles.length ;i++)
        {
              $nytElem.append('<li class="article">' + '<a href="' + articles[i].web_url + '">' +
              articles[i].headline.main + '</a>' + '<p>' + articles[i].snippet + '</p>' + '</li>');


        };
    }).error(function(e){
    $nytHeaderElem.text('new york times will not loaded ');
    });

    // wikipedia  API
    var wikiLink='http://en.wikipedia.org/w/api.php?action=opensearch&search='+
    citystr +'&format=json&callback=wikiCallback';
    var wikiFail = setTimeout(function(){
    $wikiElem.text("failed to get Wikipedia resources");
    }, 8000);

    $.ajax({
     url: wikiLink,
      dataType: "jsonp",
      success: function(response){
        var articleList = response[1];
        for (var i = 0; i < articleList.length; i++){
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + url + '">' + articleStr +
                '</a></li>');
            };
              clearTimeout(wikiFail);
       }
    });


return false;
};

$('#form-container').submit(loadData);
