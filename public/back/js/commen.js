/**
 * Created by Administrator on 2018/1/11 0011.
 */
$(function () {
  NProgress.configure({
    showSpinner: false//关闭进度环
  });
  $(document).ajaxStart(function () {
    NProgress.start();
  });

  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 1000);
  });



  //在飞登录页面，发送ajax请求，询问用户是否登录，如果没有登录。。。。
  if (location.href.indexOf("login.html") == -1) {
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function(info){
        if(info.error == 400){
          location.href = "login.html";
        }
      }
    });
  }


  //二级菜单显示隐藏功能
  $(".second").prev().on("click",function(){
    $(this).next().slideToggle();
  });

  $(".icon_menu").on("click",function(){
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass('now');
  });

  $(".icon_loginout").on("click",function(){
    $("#logoutModal").modal('show');
  });
  $(".btn_logout").off().on("click",function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function(info){
        console.log(info);
        if(info.cuccess){
          location.href = "login.html";
        }
      }
    })
  });

})