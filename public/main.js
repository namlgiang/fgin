var length;
var step = 300;

$(document).ready(function() {
  // updateScroll();
  // $(window).scroll(function() {
  //   updateScroll();
  // });
  length = $(".slide .long > *").length * 250;
  $(".slide .long").css("width", length);

  $(".next").click(function() {
    if(!$(this).hasClass("show")) return;
    var left = parseInt($(".slide .long").css("left"));
    if(-left + $(".slide").outerWidth() < length ) {
      left -= step;
      $(".slide .long").css("left", left + "px");
      $(".prev").addClass("show");
    }
    if(-left + $(".slide").outerWidth() >= length)
      $(".next").removeClass("show");
  });

  $(".prev").click(function() {
    if(!$(this).hasClass("show")) return;
    var left = parseInt($(".slide .long").css("left"));
    if(left < 0) {
      left += step;
      if(left > -50) left = 0;
      $(".slide .long").css("left", left + "px");
      $(".next").addClass("show");
    }
    if(left >= 0)
      $(".prev").removeClass("show");
  });
});

function updateScroll() {
  var top = $("body").scrollTop();
  $(".news").css("transform", "translateY("+ (-top/8) +"px)");
    $(".most-wanted .tile").css("transform", "translateY("+ (-top/6) +"px)");
  $(".top .table").css("top", -300 - top/3);
  $(".top .table ul li .number").css("transform", "translateY("+ (1 + top/20) +"px)");
  $(".top .table ul li .name").css("transform", "translateY("+ (top/20) +"px)");
}
