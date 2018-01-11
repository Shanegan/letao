/**
 * Created by Administrator on 2018/1/11 0011.
 */
$(function () {
  $form = $("form");
  //初始化表单插件
  $form.bootstrapValidator({
    //配置校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则，name属性
    fields: {
      //配置username的校验规则
      username: {
        //可以配置username所有的校验
        validators: {
          //非空校验
          notEmpty: {
            //提示信息
            message: "用户名不能为空哦！"
          },
          callback: {
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"用户密码不能为空哦！"
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码必须是6-12位"
          },
          //是用于校验失败后，提示信息
          callback:{
            message:"密码错误"
          }
        }

      }
    }
  });

  //给表单注册一个检验成功的时件，这个事件在表单校验成功的时候会触发 。success.form.bv
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data: $form.serialize(),
      success:function(info){
        if (info.success){
          location.href = "index.html";
        }
        if (info.error == 1000){
          // $form.data("bootstrapValidator") 用于获取插件实例，通过这个实例可以调用方法
          //使用updateStatus方法，把用户名改成失败即可
          //3个参数：
          //1. 字段名，，，，，username
          //2. 状态  ： VALID   INVALID
          //3. 显示哪个校验的内容
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error == 1001){
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    });
  })

  $("[type='reset']").on('click',function(){
    $form.data("bootstrapValidator").resetForm();
  });

});