$(function(){

  /* --- Responsive nav menu --- */

  var nav       = $('#main-nav'),
      navButton = $('#nav-button');

  navButton.on('click', toggleMenu);

  function toggleMenu () {

    if (nav.is(":visible")) {

      nav.slideUp({
        duration: 200,
        complete: function () {
          $(this).css('display','')
        }
      });

    }
    else
      nav.slideDown(200);

  };


  /* --- Load more button --- */

  $("#load-more-button").click(loadMorePosts);

  function loadMorePosts (event) {

    event.preventDefault();

    var $loadMore      = $(this).parents(".load-more"),
        $blogContainer = $(".post-list"),
        nextPage       = parseInt($blogContainer.attr("data-page")) + 1,
        totalPages     = parseInt($blogContainer.attr("data-totalPages"));

    $loadMore.append('<i class="fa fa-refresh fa-spin loading-spinner"></i>');

    $.get("/page" + nextPage, function (data) {

      var htmlData  = $.parseHTML(data),
          $articles = $(htmlData).find("article.post-item");

      $blogContainer.attr("data-page", nextPage).append($articles);

      if ($blogContainer.attr("data-totalPages") == nextPage) {
        $(".load-more").remove();
      }

      $loadMore.remove('.loading-spinner');

    });

  };

});
