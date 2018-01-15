/**
 * Created by Administrator on 2018/1/13 0013.
 */
$(function () {
  var page = 1;
  var pageSize = 5;
  var render = function () {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info);
        $("tbody").html(template("tmp", info));

        //分页渲染

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }
  render();

  $('.btn_add').on("click", function () {
    $('#addModal').modal('show');
  });

  //表单校验
  var $form = $("#form");
  console.log($form);
  $form.bootstrapValidator({
    //配置校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类的名称不能为空"
          }
        }
      }
    }
  });

  //给表单注册校验成功的事件
  $form.on("success.form.bv", function (e) {
    //阻止默认提交
    e.preventDefault();
    console.log("hehe");
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success: function (info) {
        console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
          //重置模态框的数据
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();
        }
      }
    })

  })

})
