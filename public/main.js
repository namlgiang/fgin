$(document).ready(function() {
  $(window).scroll(function() {
    var top = $("body").scrollTop();
    if(top > 5) $(".top").addClass("collapse");
      else $(".top").removeClass("collapse");
  });
});
