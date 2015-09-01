$(function(){

  /* --- Responsive nav menu --- */
  var nav = $('#main-nav'),
      navButton = $('#nav-button');

  navButton.on('click', toggleMenu);

  function toggleMenu () {
    if (nav.is(":visible"))
        nav.slideUp({
          duration: 200,
          complete: function () {
            $(this).css('display','')
          }
        });
    else
        nav.slideDown(200);
  };

});
