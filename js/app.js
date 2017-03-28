/*
Please add all Javascript code to this file.
GA SF JSD6
Melanie Kirschner
*/


'use strict';


$(document).ready(function(){

  $('#newsApi').on('click', function(){

    function getNews() {
      var newsUrl='https://newsapi.org/v1/articles?source=buzzfeed&sortBy=latest&apiKey=5cbc2a25619e40ea83176153ae1785b0'; 
      callNewsApi(newsUrl);
    }

    function callNewsApi(newsUrl) {
      $.ajax({
        url : newsUrl,
        dataType: "json",
          success: function(response) {
            console.log(response);
            $('#main').empty();
            appendNewsContent(response);    
        },
          error: function(error){
          console.log(error);
          alert('I cannot connect to this news source');
          }
      });
    }

    getNews();


    function appendNewsContent(response) {
      var newsObject = response.articles;
      console.log("this is news Api info");
// $('#main').empty();
// .articles.length
      var arrayLength = newsObject.length;
      console.log(arrayLength);

      $.each(newsObject, function(i, item){
// $(newsObject).slice(0,4);
        var createArticle= $('<article></article>').addClass('article');
        var imageSection =$('<section class="featuredImage"><img src="'+item.urlToImage+'" alt =""></section>');
        var titleSection =$('<section class="articleContent"><a href=""><h3>'+item.title+'</h3></a><h6>'+item.author+'</h6></section>');
        var impressionSection= $('<section class ="impressions">'+item.title.length+'</section>');
        var clearSection= $('<div class ="clearfix"></div>');
        $('#main').append(createArticle);
        $(createArticle).append(imageSection, titleSection, impressionSection, clearSection);

          $(createArticle).on('click', function(e) {
            e.preventDefault();
            $('#popUp').show().removeClass('hidden loader');
            $('#popUp').find('h1').text(item.title);
            $('#popUp').find('p').html(item.description);
            $('.popUpAction').attr('href', item.url);


          });
        return i < 3;
      });

    }
// }
  });

  $('#guardianSource').on('click', function(){

    function getGuardianArticles() {
      var guardUrl = 'https://content.guardianapis.com/search?q=recipes&show-fields=all&page-size=4&format=json&&api-key=97e82b2f-3c7c-4583-b55a-19240d8730bc';
      callGuardianApi(guardUrl);
    }

    function callGuardianApi(guardUrl) {
      $.ajax({
        url : guardUrl,
        dataType: "jsonp",

        success: function(response) {
         $('#main').empty();
         appendGuardianContent(response);
       }, 
        error: function(error){
          console.log(error);
          alert('I cannot connect to this news source');
          }
     });
    }

    getGuardianArticles();

    function appendGuardianContent(response) {
      var guardianObject = response.response.results;
      $.each(guardianObject, function(i, item){

        var createArticle= $('<article></article>').addClass('article');
        var imageSection =$('<section class="featuredImage"><img src="'+item.fields.thumbnail+'" alt =""></section>');
        var titleSection =$('<section class="articleContent"><a href=""><h3>'+item.webTitle+'</h3></a><h6>'+item.sectionName+'</h6></section>');
        var impressionSection= $('<section class ="impressions">'+item.fields.charCount+'</section>');
        var clearSection= $('<div class ="clearfix"></div>');
        $('#main').append(createArticle);
        $(createArticle).append(imageSection, titleSection, impressionSection, clearSection);

          $(createArticle).on('click', function(e) {
            e.preventDefault();
            $('#popUp').show().removeClass('hidden loader');
            $('#popUp').find('h1').text(item.webTitle);
            $('#popUp').find('p').html(item.fields.standfirst);
            $('.popUpAction').attr('href', item.webUrl);
          });
      });
    }
  });

  function getRedditArticles() {
    var url = 'https://www.reddit.com/r/AnimalsBeingDerps.json?limit=4';
    callRedditApi(url);
    $('#redditSource').on('click', function() {
      $('#main').empty();
      callRedditApi(url);
    });
  }

  function callRedditApi(url) {
    $.ajax({
      url : url,
      dataType: "jsonp",
      jsonp: "jsonp", 
      success: function(response) {
                appendRedditContent(response);

      }
    });
  } 
  getRedditArticles();

  function appendRedditContent(response) {
    console.log("this is Reddit news info");
    var redditObject = response.data.children;
    $.each(redditObject, function(i, item){
      var createArticle= $('<article></article>').addClass('article');
      var imageSection =$('<section class="featuredImage"><img src="'+item.data.thumbnail+'" alt =""></section>');
      var titleSection =$('<section class="articleContent"><a href=""><h3>'+item.data.title+'</h3></a><h6>'+item.data.subreddit+'</h6></section>');

      var impressionSection= $('<section class ="impressions">'+item.data.score+'</section>');
      var clearSection= $('<div class ="clearfix"></div>');
      $('#main').append(createArticle);
      $(createArticle).append(imageSection, titleSection, impressionSection, clearSection);
      $('#popUp').addClass('hidden');
      $(createArticle).on('click', function(e) {
        e.preventDefault();
        $('#popUp').show().removeClass('hidden loader');
        $('#popUp').find('h1').text(item.data.title);
        $('#popUp').find('p').text("There is no summary field but here is the author"+ " "+item.data.author);
        $('.popUpAction').attr('href', "https://www.reddit.com"+item.data.permalink);
      }); 

    });

  }


  $('.closePopUp').on('click', function(){
    $('#popUp').hide();
  });

  $('.searchIcon').on('click', function() {
    $('#search').toggleClass('active');
  });


  $('header').find('h1').on('click', function() {
    location.reload();

  });
});

