/**
 * Created by Administrator on 2018/1/13 0013.
 */
$(function(){
  function render (){
    var currentPage = 1;
    var pageSize = 10;
    $.ajax({
      type:'get',
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        $('tbody').html( template("tmp",info) );
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total / pageSize),
          onPageClicked:function (a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  render();

  $(".btn_add").on("click",function(){
    $("#addModal").modal("show");
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        $(".dropdown-menu").html(template("tpl",info));
      }
    });
  });

  //给下拉框所有的a标签注册点击事件
  $(".dropdown-menu").on("click","a",function(){
    $(".dropdown-text").text($(this).text());

    $("[name='categoryId']").val($(this).data("id"));



  });


  //初始化图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      console.log(data.result.picAddr);
      //通过data.result.picAddr可以获取到图片上传后的路径
      $(".img_box img").attr("src",data.result.picAddr);

      $("[name='brandLogo']").val(data.result.picAddr);

      //把brandLogo改成成功
      $form.data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  })


  //表单校验功能
  var $form = $("form");
  $form.bootstrapValidator({
    excluded: [],//不校验的内容
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌图片"
          }
        }
      }
    }
  });
  //给表单注册校验成功事件
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
        //重置内容和样式
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          //重置下拉框组件和图片
          $(".dropdown-text").text("请选择一级分类");
          $("[name='categoryId']").val('');
          $(".img_box img").attr("src", "images/none.png");
          $("[name='brandLogo']").val();
        }
      }
    })
  })


})
