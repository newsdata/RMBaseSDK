UE.registerUI('addimage addvideo', (editor, uiName) => {
  //注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand: function () {
          //这里可以不用执行命令,做你自己的操作也可
          if(uiName=='addimage'){
            console.log('charutu')
            window.__UE__.addImg&&window.__UE__.addImg();
          }else{
            window.__UE__.addVideo&&window.__UE__.addVideo();
          }
    }
  });
  //创建一个button
  var btn = new window.UE.ui.Button({
    //按钮的名字
    name: uiName,
    //提示
    title: uiName,
    //添加额外样式,指定icon图标,这里默认使用一个重复的icon
    cssRules: `background-position: ${uiName=='addimage'?'-380px 0px':'-320px -20px'};`,//-320px -20px
    //点击时执行的命令
    onclick: function () {
      if(!window.config_disableUpload){
        editor.execCommand(uiName);
      }
    }
  });
  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener('selectionchange', function () {
    var state = editor.queryCommandState(uiName);
    if (state === -1) {
      btn.setDisabled(true);
      btn.setChecked(false);
    } else {
      btn.setDisabled(false);
      btn.setChecked(state);
    }
  });
  //因为你是添加button,所以需要返回这个button
  return btn;
},0);