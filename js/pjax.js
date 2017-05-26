$(function(){
  $(".hotsinger").click(function(){
    $.pjax({
      url:"./hotsinger.html",
      container:"#songs"
    });
  });
  // 
});

