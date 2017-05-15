$(document).ready(function() {
  updateScroll();
  $(window).scroll(function() {
    updateScroll();
  });
});

function updateScroll() {
  var top = $("body").scrollTop();
  if(top > 5) $(".header").addClass("collapse");
    else $(".header").removeClass("collapse");

  $(".news").css("transform", "translateY("+ (-top/8) +"px)");
  $(".most-wanted .tile").css("transform", "translateY("+ (-top/12) +"px)");
  $(".top .table").css("top", -300 - top/3);
  $(".top .table ul li .number").css("transform", "translateY("+ (1 + top/20) +"px)");
  $(".top .table ul li .name").css("transform", "translateY("+ (top/20) +"px)");
}
