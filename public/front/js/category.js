/**
 * Created by Administrator on 2018/1/15 0015.
 */
$(function(){
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategory",
      success:function(info){
        console.log(info);
        $(".lt_category_l .mui-scroll").html(template("tmp",info));
        renderSecond(info.rows[0].id);
      }
    });
  }
  render();
  function renderSecond(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      success:function(info){
        console.log(info);
        $(".lt_category_r .mui-scroll").html(template("tpl",info));
      }
    })
  }
  $(".lt_category_l .mui-scroll").on("click","li",function(){
    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    renderSecond(id);
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);
  })
})