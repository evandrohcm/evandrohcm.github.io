$(function(){

  /* --- Responsive nav menu --- */

  var nav       = $("#main-nav"),
      navButton = $("#nav-button");

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

  $("#load-more-button").on('click', loadMorePosts);

  function loadMorePosts (event) {

    event.preventDefault();

    var _this          = this,
        $blogContainer = $(".post-list"),
        nextPage       = parseInt($blogContainer.attr("data-page")) + 1,
        totalPages     = parseInt($blogContainer.attr("data-totalPages"));

    $(this).addClass("loading");

    $.get("/page" + nextPage, function (data) {

      var htmlData  = $.parseHTML(data),
          $articles = $(htmlData).find("article.post-item");

      $blogContainer.attr("data-page", nextPage).append($articles);

      if ($blogContainer.attr("data-totalPages") == nextPage) {
        $(".load-more").remove();
      }

      $(_this).removeClass("loading");

    });

  };


  /* --- Active nav item --- */

  var active = $("#main-nav").data("active");

  $("#main-nav .nav-list-item").each(function () {

    $this = $(this);

    if(active == $this.data("menu"))
      $this.addClass("active");

  });

});
