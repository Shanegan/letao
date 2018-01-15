/**
 * Created by Administrator on 2018/1/13 0013.
 */
$(function () {
  var page = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var result = template("tmp", info);
        $("tbody").html(result);


        //渲染分页
        //如果引入的bootstrap的版本是3+，
        // 1. 分页的盒子必须是ul元素
        // 2. 还需要指定一个属性：bootstrapMajorVersion指定bootstrap的版本
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//设置bootstrap的版本
          //设置当前页
          currentPage: page,
          //设置总页数，根据返回结果的总数除每页的条数
          totalPages: Math.ceil(info.total / info.size),
          numberOfPages: 5,//空件上显示的条数
          onPageClicked: function (a, b, c, p) {
            //让当前页码编程p
            page = p;
            render();
          }

        })


      }
    });
  }

  $("tbody").on("click", ".btn", function () {
    $("#userModal").modal("show");

    var id = $(this).parent().data("id");

    //利用按钮上的类名判断是启用还是禁用
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;

    $(".btn_confirm").off().on("click", function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          console.log(info);
          if(info.success){
            $("#userModal").modal('hide');
            render();
          }
        }

      })
    })

  })

})
