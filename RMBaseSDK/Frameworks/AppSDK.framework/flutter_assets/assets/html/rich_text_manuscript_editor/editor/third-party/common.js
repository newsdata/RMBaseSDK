;!function () {
  var layer = layui.layer,
      element = layui.element,
      form = layui.form,
      upload = layui.upload;
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
      layer.open({
          type: 1,
          area: ['500px'],
          shade: 0.4,
          title: false,
          content: '<div class="browser_main"><div class="browser_page"><p>你正在使用的浏览器内核版本过低，<a href="https://www.microsoft.com/zh-cn/WindowsForBusiness/End-of-IE-support" target="_blank">96微信编辑器已经不再提供技术支持</a>，为避免可能存在的安全隐患，请尽快升级你的浏览器或者安装更安全的浏览器访问' + SiteName + '。</p></div><div class="browser_list"><a class="browser_item chrome" href="http://xiazai.sogou.com/detail/34/0/6262355089742005676.html?uID=04583CB73B70900A0000000057318502&w=2295" target="_blank"><i class="browser_icon"></i><strong class="browser_name">Chrome</strong></a><a class="browser_item qqbrowser" href="http://browser.qq.com/" target="_blank"><i class="browser_icon"></i><strong class="browser_name">QQ浏览器</strong></a><a class="browser_item sogou_browser" href="http://ie.sogou.com/" target="_blank"><i class="browser_icon"></i><strong class="browser_name">搜狗浏览器</strong></a></div><div class="browser_tips"><p>如果你正在使用的是双核浏览器，比如QQ浏览器、搜狗浏览器、猎豹浏览器、世界之窗浏览器、傲游浏览器、360浏览器等，可以使用浏览器的极速模式来继续访问' + SiteName + '。</p></div></div>'
      });
  }
  $('body').css('background-color', '#dfdfdf');
  var right_click = document.getElementById("right-click");
  document.addEventListener("contextmenu", function (b) {
      b = b || document.window.event;
      for (var i = 0; i < b.path.length; i++) {
          if ($(b.path[i]).hasClass('CodeMirror-lines')) return true;
      }
      b.preventDefault();
      b.stopPropagation();
      var w = $(window).width(),
          h = $(window).height();
      x = b.clientX;
      y = b.clientY;
      var e = x,
          g = y,
          w = w - $('.u-click-right-wrap').width() - 10,
          h = h - $('.u-click-right-wrap').height() - 10;
      x >= w && (e = w);
      y >= h && (g = h);
      right_click.style.display = "block";
      right_click.style.left = e + "px";
      right_click.style.top = g + "px";
  }, false);
  document.addEventListener("click", function () {
      right_click.style.display = "none"
  }, false);
  $(document).keydown(function (e) {
      if ((e.ctrlKey || e.metaKey) && e.keyCode == 83) {
          $('#btn_save').trigger('click');
          return false;
      }
  });
  $(".header-log").click(function () {
      $('.header-loglist').show();
  });
  $(".header-loglist .layui-layer-close2").click(function () {
      $('.header-loglist').hide();
  });
  //改编容器高度
  $(window).resize(function () {
      auto_height();
  });

  //编辑器
  var editor = UE.getEditor('editor_content', {
      initialFrameHeight: ($(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - 80 < 600 ? 600 : $(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - 80) - 119
  });
  editor.addListener('ready', function () {
      var html = UE.getEditor('editor_content').getContent();
      if (html.length > 0) {
          editor.setContent('', true);
      } else {
          editor.setContent(UE.getEditor('editor_content').execCommand("getlocaldata"));
      }
      editor.focus(true);
  });
  editor.ready(function () {
      auto_height();
      /*初始化首页皮肤*/
      !function skin_init(){
          var skin=getCookie('96weixin_skin')?getCookie('96weixin_skin'):''
          var dark_state=getCookie('96weixin_skin_dark')?getCookie('96weixin_skin_dark'):0
          window.index=1
          editor.execCommand('skin_change',skin,dark,window.index,editor);
          setCookie('96weixin_skin',skin,730)
          $('body').removeClass().addClass(skin)
          if(dark_state!=0){
              $('body').attr('id','skin_dark')
              $('body').attr('data-dark',1)
              dark('content-style',1)
          }
          else{
              $('body').attr('id',' ')
              $('body').attr('data-dark',0)
              dark_clear('content-style')
          }
          if(skin=='skin_background_git'){
            ele_num=$('#background_git').length
            if(ele_num==0){
              var ele = document.createElement('script');
              ele.setAttribute('type','text/javascript')
              ele.setAttribute('color','255,0,0')
              ele.setAttribute('pointColor','255,0,0')
              ele.setAttribute('opacity','0.7')
              ele.setAttribute('zIndex','-2')
              ele.setAttribute('count','100')
              ele.setAttribute('src',public_url+'/js/background/canvas-nest.js')
              document.body.appendChild(ele)
            }
            else{
              $('#background_git').show()
            }
          }
          else{
            $('#background_git').hide()
          }
          if(skin=='skin_juji'){
            ele_num=$('#juji').length
            if(ele_num==0){
              var ele = document.createElement('canvas');
              ele.id='juji'
              document.body.appendChild(ele)
              var ele = document.createElement('script');
              ele.setAttribute('type','text/javascript')
              ele.setAttribute('src',public_url+'/js/background/juji.js')
              document.body.appendChild(ele)
            }
            else{
              $('#juji').show()
            }
          }
          else{
            $('#juji').hide()
          }
          if(skin=='skin_qipao'){
            ele_num=$('#qipao').length
            if(ele_num==0){
              var ele = document.createElement('canvas');
              ele.id='qipao'
              document.body.appendChild(ele)
              var ele = document.createElement('script');
              ele.setAttribute('type','text/javascript')
              ele.setAttribute('src',public_url+'/js/background/qipao.js')
              document.body.appendChild(ele)

            }
            else{
              $('#qipao').show()
            }
          }
          else{
            $('#qipao').hide()
          }
      }();
      //监听应用素材
      var material_interval = setInterval(function () {
          if (localStorage.getItem('material') != null) {
              editor.undoManger.save();
              var add_html = window.parseInsertPasteSetHtml(localStorage.getItem('material')),
                  old_html = editor.getContent(),
                  htmlObj = $('<div>' + add_html + '</div>'),
                  style_item = htmlObj.find('> ._editor:first'),
                  html = style_item.size() ? $.trim(htmlObj.html()) : "<section class=\"_editor\">" + $.trim(htmlObj.html()) + "</section>";
              editor.setContent(html + old_html);
              localStorage.removeItem('material');
          }
      }, 1000);
      //编辑器提示层
      $(".edui-toolbar .edui-button-wrap .edui-button-body").mouseover(function (e) {
          $("body").append("<div class='editor-tooltip'><div class='tooltip-arrow'></div><div class='tooltip-inner'>" + $(this).attr('title') + "</div></div>");
          $(".editor-tooltip").css({
              "top": ($(this).offset().top - 33) + "px",
              "left": ($(this).offset().left - ($('.editor-tooltip').width() / 2) + ($(this).width() / 2)) + "px",
          })
          $(".editor-tooltip").fadeIn("slow");
      }).mouseout(function () {
          $(".editor-tooltip").remove();
      })
      $(".edui-toolbar .edui-splitbutton .edui-splitbutton-body,.edui-toolbar .edui-menubutton .edui-menubutton-body,.edui-toolbar .edui-combox .edui-combox-body").mouseover(function (e) {
          $("body").append("<div class='editor-tooltip'><div class='tooltip-arrow'></div><div class='tooltip-inner'>" + $(this).parent().attr('title') + "</div></div>");
          $(".editor-tooltip").css({
              "top": ($(this).offset().top - 33) + "px",
              "left": ($(this).offset().left - ($('.editor-tooltip').width() / 2) + ($(this).width() / 2)) + "px",
          })
          $(".editor-tooltip").fadeIn("slow");
      }).mouseout(function () {
          $(".editor-tooltip").remove();
      });
      $.ajaxSetup({
          ifModified: true,
          cache: true
      });

      if (hasUsableFlash()) {
$.getScript(UEDITOR_CONFIG.UEDITOR_HOME_URL + 'third-party/zeroclipboard/ZeroClipboard.min.js', function () {
          ZeroClipboard.config({
              cacheBust: false,
              swfPath: UEDITOR_CONFIG.UEDITOR_HOME_URL + 'third-party/zeroclipboard/ZeroClipboard.swf'
          });
          if ($('#btn_copy_wx').length > 0) {
              var btn_copy_wx = new ZeroClipboard($('#btn_copy_wx'));
              btn_copy_wx.on('copy', function (event) {
                  event.clipboardData.setData('text/html', getEditorHtml(true));
                  layer.msg("内容已经复制,试试Ctrl+V粘贴", {
                      icon: 1
                  })
              });
              btn_copy_wx.on('error', function (event) {
                  $("#btn_copy_wx").click(function () {
                      try {
                          var temp_Content = editor.getContent(); //原始内容
                          UE.getEditor('editor_content').setContent(getEditorHtml(true)); //设置新内容
                          editor.execCommand('selectall'); //全选内容
                          editor.document.execCommand('copy');
                          UE.getEditor('editor_content').setContent(temp_Content); //还原老内容
                      } catch (err) {
                          layer.msg("复制失败，您是否屏蔽Flash，请查看帮助或者全选后“Ctrl+C”复制", {
                              icon: 0
                          });
                      }
                  });
              });
          }
          if ($('#btn_copy').length > 0) {
              var btn_copy = new ZeroClipboard($('#btn_copy'));
              btn_copy.on('copy', function (event) {
                  event.clipboardData.setData('text/html', getEditorHtml());
                  layer.msg("内容已经复制,试试Ctrl+V粘贴2", {
                      icon: 1
                  })
              });
              btn_copy.on('error', function (event) {
                  $("#btn_copy").click(function () {
                      try {
                          var temp_Content = editor.getContent(); //原始内容
                          UE.getEditor('editor_content').setContent(getEditorHtml()); //设置新内容
                          editor.execCommand('selectall'); //全选内容
                          editor.document.execCommand('copy');
                          UE.getEditor('editor_content').setContent(temp_Content); //还原老内容
                      } catch (err) {
                          layer.msg("复制失败，您是否屏蔽Flash，请查看帮助或者全选后“Ctrl+C”复制", {
                              icon: 0
                          });
                      }
                  });

              });
          }
      });
      } else {
           $('#btn_copy_wx').click(function(){
              copy_ueditor_html();
              layer.msg("内容已经复制,试试Ctrl+V粘贴", {
                  icon: 1
              })
          });
      }





      $(editor.selection.document).keydown(function (e) {
          if ((e.ctrlKey || e.metaKey) && e.keyCode == 83) {
              $('#btn_save').trigger('click');
              return false;
          }
      });
  });
  var formatHtml_switch = function (tpl) {
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('请添加内容后使用一键排版', {
              icon: 0
          });
          return !1;
      }
      var ueditor_obj = document.getElementById('ueditor_0').contentWindow.document,
          ueditor_obj_save = ueditor_obj.body.innerHTML,
          DBC2SBC = html = '',
          tmp_img = new Array(),
          imgs = ueditor_obj.images,
          format_check = false
      if (imgs != null && imgs.length > 0) {
          for (i = 0; i < imgs.length; i++) {
              var img = document.createElement("IMG");
              img.src = imgs[i].src;
              tmp_img[tmp_img.length] = img;
          }
          var formatImgCount = 0;
          for (j = 0; j < imgs.length;) {
              imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
              formatImgCount++;
          }
      }
      var texts = ueditor_obj.body.innerText;
      for (var l = 0; l < texts.length; l++) {
          var code = texts.charCodeAt(l);
          if (code >= 65281 && code < 65373 && code != 65292 && code != 65306) {
              DBC2SBC += String.fromCharCode(texts.charCodeAt(l) - 65248);
          } else {
              DBC2SBC += texts.charAt(l);
          }
      }
      var tmps = DBC2SBC.split("\n");
      for (var n = 0; n < tmps.length; n++) {
          var tmp = tmps[n].trim();
          if (tmp.length > 0) {
              if (tmp.indexOf("<<") == 0 && tmp.length == 2 || tmp.indexOf(">>") == 0 && tmp.length == 2 || tmp.indexOf("!head") == 0 && tmp.length == 5 || tmp.indexOf("!end") == 0 && tmp.length == 4 || tmp.indexOf("#head") == 0 && tmp.length == 5 || tmp.indexOf("#end") == 0 && tmp.length == 4 || tmp.indexOf("#") == 0 && tmp.indexOf("#FormatImgID_") != 0 || tmp.indexOf("##") == 0 || tmp.indexOf(">") == 0 || tmp.indexOf("---") == 0 || tmp.indexOf("%#FormatImgID_") >= 0) {
                  format_check = true
              }
          }
      }
      editor.setContent(ueditor_obj_save);
      if (format_check) {
          formatHtml_code(tpl)
      }
      else {
          formatHtml(tpl)
      }
  }
  //代码一键排版
  var formatHtml_code = function (tpl) {
      /*检测编辑器内是否有内容*/
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('请添加内容后使用一键排版', {
              icon: 0
          });
          return !1;
      }
      editor.undoManger.save();
      /*初始变量定义*/
      var titlelen_code = $('#format-title').val() || 20,
          ueditor_obj = document.getElementById('ueditor_0').contentWindow.document,
          ueditor_obj_save = ueditor_obj.body.innerHTML,
          tmp_img = tmp_table = tmp_iframe = new Array(),
          imgs = ueditor_obj.images,
          tables = ueditor_obj.getElementsByTagName("table"),
          iframe = ueditor_obj.getElementsByTagName("iframe"),
          switch_bg = $('.format_switch_bg')[0].checked,
          switch_head = $('.format_switch_head')[0].checked,
          switch_qrcode = $('.format_switch_qrcode')[0].checked,
          title_num = title_sec_num = border_num = 0,
          num_0 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          num_1 = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'],
          num_2 = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹', '拾贰', '拾叁', '拾肆', '拾伍', '拾陆', '拾柒', '拾捌', '拾玖', '贰拾'],
          title_num_switch = title_sec_num_switch = border_num_switch = false,
          DBC2SBC = html = '',
          TitleId;
      editor.setContent(ueditor_obj_save);
      /*将图片替换为标签*/
      if (imgs != null && imgs.length > 0) {
          for (i = 0; i < imgs.length; i++) {
              var img = document.createElement("IMG");
              img.src = imgs[i].src;
              tmp_img[tmp_img.length] = img;
          }
          var formatImgCount = 0;
          for (j = 0; j < imgs.length;) {
              imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
              formatImgCount++;
          }
      }
      /*将表格替换为标签*/
      if (tables != null && tables.length > 0) {
          var formatTableCount = 0;
          for (var k = 0; k < tables.length;) {
              tmp_table[tmp_table.length] = tables[k].outerHTML;
              tables[k].outerHTML = "\n#FormatTableID_" + formatTableCount + "#\n";
              formatTableCount++;
          }
      }
      if (iframe != null && iframe.length > 0) {
          var formatIframeCount = 0;
          for (var k = 0; k < iframe.length;) {
              tmp_iframe[tmp_iframe.length] = iframe[k].outerHTML;
              iframe[k].outerHTML = "\n#FormatIframeID_" + formatIframeCount + "#\n";
              formatIframeCount++;
          }
      }
      /*获取编辑器内文本*/
      var texts = ueditor_obj.body.innerText;
      /*获取数据库内模板样式*/
      tpl = JSON.parse(tpl);
      tpl.forEach(function (val, index) {
          if (val.indexOf('_editor') == -1) {
              tpl[index] = tpl[index].slice(0, 8) + ' class="_editor"' + tpl[index].slice(8);
          }
      });
      if (tpl[0].indexOf('_num') >= 0) {
          title_num_switch = true;
          type = tpl[0].match(/data-form=".*?"/)[0].substring(11, tpl[0].match(/data-form=".*?"/)[0].length - 1)
          switch (type) {
              case '0':
                  title_num_list = num_0
                  break;
              case '1':
                  title_num_list = num_1
                  break;
              case '2':
                  title_num_list = num_2
                  break;
          }
      }
      if (tpl[4].indexOf('_num') >= 0) {
          title_sec_num_switch = true;
          type = tpl[4].match(/data-form=".*?"/)[0].substring(11, tpl[4].match(/data-form=".*?"/)[0].length - 1)
          switch (type) {
              case '0':
                  title_sec_num_list = num_0
                  break;
              case '1':
                  title_sec_num_list = num_1
                  break;
              case '2':
                  title_sec_num_list = num_2
                  break;
          }
      }
      if (tpl[10].indexOf('_num') >= 0) {
          border_num_switch = true;
          type = tpl[10].match(/data-form=".*?"/)[0].substring(11, tpl[10].match(/data-form=".*?"/)[0].length - 1)
          switch (type) {
              case '0':
                  border_num_list = num_0
                  break;
              case '1':
                  border_num_list = num_1
                  break;
              case '2':
                  border_num_list = num_2
                  break;
          }
      }
      /*字符过滤处理？（猜）*/
      for (var l = 0; l < texts.length; l++) {
          var code = texts.charCodeAt(l);
          if (code >= 65281 && code < 65373 && code != 65292 && code != 65306) {
              DBC2SBC += String.fromCharCode(texts.charCodeAt(l) - 65248);
          } else {
              DBC2SBC += texts.charAt(l);
          }
      }
      /*将文本按照换行符分隔成数组*/
      var tmps = DBC2SBC.split("\n");
      /*标题与正文处理*/
      var border_check = false
      var html_head = switch_head ? true : false
      for (var n = 0; n < tmps.length; n++) {
          var tmp = tmps[n].trim();
          if (tmp.length > 0) {
              if (tmp.indexOf("<<") == 0 && tmp.length == 2) {
                  if (border_check) {
                      tpl_text = tpl[1].replace('class="_editor"', 'class="_editor text_content"')
                      border_html += tpl_text.replace("FormatReplaceName", tmp) + "\n";
                  }
                  else {
                      border_check = true
                      border_html = ''
                  }
              }
              else if (tmp.indexOf(">>") == 0 && tmp.length == 2) {
                  if (border_check) {
                      if (border_num_switch) {
                          html += tpl[10].replace("FormatReplaceName", border_html).replace("FormatReplaceNumber", border_num_list[border_num % 20]) + "\n";
                          border_check = false
                          border_num++
                      }
                      else {
                          html += tpl[10].replace("FormatReplaceName", border_html) + "\n";
                          border_check = false
                      }
                  }
                  else {
                      tpl_text = tpl[1].replace('class="_editor"', 'class="_editor text_content"')
                      html += tpl_text.replace("FormatReplaceName", tmp) + "\n";
                  }
              }
              else if (tmp.indexOf("FormatImgID") > 0 || tmp.indexOf("FormatTableID") > 0 || tmp.indexOf("FormatIframeID") > 0) {
                  if (border_check) {
                      border_html += tmp + "\n";
                  }
                  else {
                      html += tmp + "\n";
                  }
              }
              else if (tmp.indexOf("!head") == 0 && tmp.length == 5) {
                  html_head = false
              }
              else if (tmp.indexOf("!end") == 0 && tmp.length == 4) {
                  html_end = false
              }
              else if (tmp.indexOf("#head") == 0 && tmp.length == 5) {
                  if (border_check) {
                      border_html += tpl[8].replace() + "\n";
                  }
                  else {
                      html += tpl[8].replace() + "\n";
                  }
                  html_head = false
              }
              else if (tmp.indexOf("#end") == 0 && tmp.length == 4) {
                  if (border_check) {
                      border_html += tpl[9].replace() + "\n";
                  }
                  else {
                      html += tpl[9].replace() + "\n";
                  }
                  html_end = false
              }
              /*标题*/
              else if (tmp.indexOf("#") == 0 && tmp.indexOf("##") != 0 && tmp.indexOf("#end") != 0 && tmp.indexOf("#head") != 0) {
                  if (border_check) {
                      if (title_num_switch) {
                          border_html += tpl[0].replace("FormatReplaceName", tmp.substr(1).trim()).replace("FormatReplaceNumber", title_num_list[title_num % 20]) + "\n";
                          title_num++
                      }
                      else {
                          border_html += tpl[0].replace("FormatReplaceName", tmp.substr(1).trim()) + "\n";
                      }
                  }
                  else {
                      if (title_num_switch) {
                          html += tpl[0].replace("FormatReplaceName", tmp.substr(1).trim()).replace("FormatReplaceNumber", title_num_list[title_num % 20]) + "\n";
                          title_num++
                      }
                      else {
                          html += tpl[0].replace("FormatReplaceName", tmp.substr(1).trim()) + "\n";
                      }
                  }
              }
              /*副标题*/
              else if (tmp.indexOf("##") == 0) {
                  if (border_check) {
                      if (title_sec_num_switch) {
                          border_html += tpl[4].replace("FormatReplaceName", tmp.substr(2).trim()).replace("FormatReplaceNumber", title_sec_num_list[title_sec_num % 20]) + "\n";
                          title_sec_num++
                      }
                      else {
                          border_html += tpl[4].replace("FormatReplaceName", tmp.substr(2).trim()) + "\n";
                      }
                  }
                  else {
                      if (title_sec_num_switch) {
                          html += tpl[4].replace("FormatReplaceName", tmp.substr(2).trim()).replace("FormatReplaceNumber", title_sec_num_list[title_sec_num % 20]) + "\n";
                          title_sec_num++
                      }
                      else {
                          html += tpl[4].replace("FormatReplaceName", tmp.substr(2).trim()) + "\n";
                      }
                  }
              }
              /*引用*/
              else if (tmp.indexOf(">") == 0) {
                  if (border_check) {
                      tpl_text = tpl[5].replace('class="_editor"', 'class="_editor text_content"')
                      border_html += tpl_text.replace("FormatReplaceName", tmp.substr(1).trim()) + "\n";
                      // border_html+=tpl[5].replace("FormatReplaceName", tmp.substr(2)) + "\n";
                  }
                  else {
                      tpl_text = tpl[5].replace('class="_editor"', 'class="_editor text_content"')
                      html += tpl_text.replace("FormatReplaceName", tmp.substr(1).trim()) + "\n";
                      // html += tpl[5].replace("FormatReplaceName", tmp.substr(2)) + "\n";
                  }
              }
              /*分割线*/
              else if (tmp.indexOf("---") == 0) {
                  if (border_check) {
                      border_html += tpl[6].replace() + "\n";
                  }
                  else {
                      html += tpl[6].replace() + "\n";
                  }
              }
              /*正文*/
              else if (tmp.length > 0 && tmp.charCodeAt(0) != 8203) {
                  tpl_text = tpl[1].replace('class="_editor"', 'class="_editor text_content"')
                  if (border_check) {
                      border_html += tpl_text.replace("FormatReplaceName", tmp) + "\n";
                  }
                  else {
                      html += tpl_text.replace("FormatReplaceName", tmp) + "\n";
                  }
              }
          }
      }
      if (html_head) {
          html = tpl[8].replace() + "\n" + html
      }
      /*处理图片样式*/
      if (tmp_img != null && tmp_img.length > 0) {
          for (var m = 0; m < tmp_img.length; m++) {
              var image_name = "#FormatImgID_" + m + "#"
              if (html.indexOf('%' + image_name + '%') >= 0) {
                  var imghtml = tpl[7].replace("FormatReplaceName", tmp_img[m].src);
                  html = html.replace("%#FormatImgID_" + m + "#%", imghtml);
                  switch_qrcode = false
              }
              // else if('{{'+image_name){
              //   images=html.match(/{{#FormatImgID.*?}}/)[0]
              //   images=images.substring(3,images.length-3)
              //   images=images.split('##');
              //   images_length=images.length
              //   m+=images_length-1
              //   console.log(tpl[10])
              //   // for (var m_i = 0; m_i < images_length; m_i++) {
              //   //
              //   // }
              // }
              else {
                  var imghtml = tpl[2].replace("FormatReplaceName", tmp_img[m].src);
                  html = html.replace("#FormatImgID_" + m + "#", imghtml);
              }
          }
      }
      if (switch_qrcode) {
          html += tpl[7].replace("FormatReplaceName", 'http://img.96weixin.com/ueditor/20200108/1578448292894777.png');
      }
      /*处理背景样式*/
      if (switch_bg) {
          if (tpl[3]) html = tpl[3].replace("FormatReplaceName", html);
      }
      else {
          html = '<section style="box-sizing: border-box;">FormatReplaceName</section>'.replace("FormatReplaceName", html);
      }
      editor.setContent(ueditor_obj_save);
      window.preview_html_code(html);
  };
  /*一键排版预览*/
  window.preview_html_code = function (body, title) {
      title = title || '';
      var htmlObj = $('<div>' + body + '</div>');
      htmlObj.find('.tool-border').remove();
      var content = '<div class="rich_media_inner" style="margin-top:0;height:100%;overflow:scroll;"><div class="rich_media_area_primary"><div class="rich_media_content">' + htmlObj.html() + '</div><div class="rich_media_tool"><div class="meta_primary"><a href="javascript:;">阅读原文</a></div><div class="meta_primary">阅读 <span>100000+</span></div><div class="meta_primary"><i class="fa fa-thumbs-o-up"></i><span>999</span></div><div class="meta_extra">投诉</div></div></div></div>';
      $('#content_view').slideDown(0, function () {
          $('#content_view_content').html(content)
      })
      $('#content_view_content').html(content)
      var span = $('#content_view_content').find('.text_content span')
      p = $('#content_view_content').find('.text_content p')
      if (parseInt(span.css('font-size')) > 0) {
          font_size = parseInt(span.css('font-size'))
          window['slider_font_size'].setValue(font_size - 12)
          $('.slider_box').find('.font_size').val(font_size)
      }
      else {
          font_size = parseInt(p.css('font-size'))
          window['slider_font_size'].setValue(font_size - 12)
          $('.slider_box').find('.font_size').val(font_size)
      }
      if (parseInt(span.css('line-height')) > 0) {
          line_height = parseInt(span.css('line-height'))
          window['slider_line_height'].setValue(line_height)
          $('.slider_box').find('.line_height').val(line_height)
      }
      else {
          line_height = parseInt(p.css('line-height'))
          window['slider_line_height'].setValue(line_height)
          $('.slider_box').find('.line_height').val(line_height)
      }
      if (parseInt(span.css('letter-spacing')) > 0) {
          letter_spacing = parseInt(span.css('letter-spacing'))
          window['slider_letter_spacing'].setValue(letter_spacing)
          $('.slider_box').find('.letter_spacing').val(letter_spacing)
      }
      else {
          letter_spacing = parseInt(p.css('letter-spacing'))
          window['slider_letter_spacing'].setValue(letter_spacing)
          $('.slider_box').find('.letter_spacing').val(letter_spacing)
      }
      margin_bottom = parseInt($('#content_view_content').find('._editor').css('margin-bottom'), 0)
      window['slider_margin_bottom'].setValue(margin_bottom)
      $('.slider_box').find('.margin_bottom').val(margin_bottom)
  }
  /*一键排版关闭*/
  $(document).on('click', '#content_view_close,#content_view_close_btn', function () {
      $('#content_view').slideUp(0, function () {
          $('#content_view_content').html('')
      })
  })
  //样式生成监听操作
  $(document).on('click', '#content_view_post', function () {
      var html = $('#content_view_content .rich_media_content').html()
      editor.setContent(html);
      editor.undoManger.save();
      editor.focus(true);
      $('#content_view').slideUp(0, function () {
          $('#content_view_content').html('')
      })
      return !1;
  })
  //代码排版监听操作
  $(document).on('click', '.code_view', function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if ($('#user_vip').data('vip') < $(this).parent().parent().parent().data('vip') && $(this).parent().parent().parent().data('free') * 1000 < $.now()) {
          // buy_vip_tips();
          // return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">你的VIP等级无法使用一键排版</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      $.post("/indexajax/formatclick", {
          id: $(this).parent().parent().parent().data('id')
      });
      formatHtml_switch($(this).parent().parent().parent().find('textarea').val());
      $('#content_view').attr('data-id', $(this).parent().parent().parent().data('id'))
      $('#content_view').attr('data-type', '2')
  })
  //代码排版按钮监听操作
  $(document).on('click', '.layui-btn-format', function () {
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('请添加内容后使用排版按钮', {icon: 0});return !1;
      }
      formatBottom(this);
  });
  var formatBottom = function (_this) {
      var bot = $(_this).data('type');

      editor.undoManger.save();

      var ueditor_obj = document.getElementById('ueditor_0').contentWindow.document,

          tmp_img = tmp_table = tmp_iframe = new Array(),
          imgs = ueditor_obj.images,
          ueditor_obj_save = ueditor_obj.body.innerHTML,
          tables = ueditor_obj.getElementsByTagName("table"),
          iframe = ueditor_obj.getElementsByTagName("iframe"),
          DBC2SBC = html  = typeName = '', text_list = ['format','space','indent'],
          formatName = '快速排版',
          spaceName =  ['添加空格','去除空格'],
          indentName = ['首行缩进','取消缩进'],
          adaptName = ['图片适应','取消适应'];

      if(bot == "format") {
          var space = '<section class="_editor"><p><br/></p></section>';
          var indent =  '　　';
          var adapt =  '';
          typeName = formatName;
      }else{
          var td = parseInt($(_this).attr('data-td')) ? 0 : 1;
          if(bot == 'space')  typeName = spaceName[td];
          if(bot == 'indent') typeName = indentName[td];
          if(bot == 'adapt')  typeName = adaptName[td];
          $(_this).attr('data-td', td);
          $(_this).html(typeName);
          var space =  parseInt($('button[data-type="space"]').attr('data-td')) ?  '' : '<section class="_editor"><p><br/></p></section>';
          var indent = parseInt($('button[data-type="indent"]').attr('data-td')) ? '' : '　　';
          var adapt =  parseInt($('button[data-type="adapt"]').attr('data-td')) ?  'width:100%;margin:0 auto;': '' ;
      }


      editor.setContent(ueditor_obj_save);
      if (imgs != null && imgs.length > 0) {
          for (i = 0; i < imgs.length; i++) {
              var img = document.createElement("IMG");
              img.src = imgs[i].src;
              tmp_img[tmp_img.length] = img;
          }
          var formatImgCount = 0;
          for (j = 0; j < imgs.length;) {
              imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
              formatImgCount++;
          }
      }
      if(tables != null && tables.length > 0) {
          var formatTableCount = 0;
          for(var k = 0;k < tables.length;){
              tmp_table[tmp_table.length] = tables[k].outerHTML;
              tables[k].outerHTML = "\n#FormatTableID_"+formatTableCount+"#\n";
              formatTableCount++;
          }
      }
      if(iframe != null && iframe.length > 0) {
          var formatIframeCount = 0;
          for(var k = 0;k < iframe.length;){
              tmp_iframe[tmp_iframe.length] = iframe[k].outerHTML;
              iframe[k].outerHTML = "\n#FormatIframeID_"+formatIframeCount+"#\n";
              formatIframeCount++;
          }
      }

      var texts = ueditor_obj.body.innerText;
      for (var l = 0; l < texts.length; l++) {
          var code = texts.charCodeAt(l);
          if (code >= 65281 && code < 65373 && code != 65292 && code != 65306){
              DBC2SBC += String.fromCharCode(texts.charCodeAt(l) - 65248);
          } else {
              DBC2SBC += texts.charAt(l);
          }
      }

      var tmps = DBC2SBC.split("\n");
      for (var n = 0; n < tmps.length; n++) {
          var tmp = tmps[n].trim();
          if (tmp.length > 0) {
              /*indexOf查询字符串首次出现在字符串内的位置*/
              if (tmp.indexOf("FormatImgID") > 0 || tmp.indexOf("FormatTableID") > 0 || tmp.indexOf("FormatIframeID") > 0) {
                  html += tmp + "\n";
              } else {
                  html +=  '<section class="_editor" style="font-size:16px;"><p>'+ indent + tmp + '</p></section>' + space + "\n";
              }
          }
      }

      /*处理图片样式*/
      if (tmp_img != null && tmp_img.length > 0) {
          for (var m = 0; m < tmp_img.length; m++) {
              var imghtml = '<section class="_editor" style="text-align:center;"><img style="'+adapt+'" src="'+tmp_img[m].src+'"></section>' + space + "\n";

              html = html.replace("#FormatImgID_" + m + "#", imghtml);
          }
      }
      /*处理表格样式*/
      if (tmp_table != null && tmp_table.length > 0) {
          for (var o = 0; o < tmp_table.length; o++) {
              html = html.replace("#FormatTableID_" + o + "#", tmp_table[o]);
          }
      }
      /*处理iframe样式*/
      if (tmp_iframe != null && tmp_iframe.length > 0) {
          for (var p = 0; p < tmp_iframe.length; p++) {
              html = html.replace("#FormatIframeID_" + p + "#", tmp_iframe[p]);
          }
      }
      /*提交*/
      editor.setContent(html);
      editor.undoManger.save();
      editor.focus(true);
      layer.msg('执行'+typeName+ '成功，误点请点击撤退按钮', {
          icon: 1
      })
      return !1;
  }
  //一键排版
  var formatHtml = function (tpl) {
      /*检测编辑器内是否有内容*/
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('请添加内容后使用一键排版', {
              icon: 0
          });
          return !1;
      }
      editor.undoManger.save();
      /*初始变量定义*/
      var titlelen = $('#format-title').val() || 20,
          ueditor_obj = document.getElementById('ueditor_0').contentWindow.document,
          tmp_img = tmp_table = tmp_iframe = new Array(),
          imgs = ueditor_obj.images,
          ueditor_obj_save = ueditor_obj.body.innerHTML,
          tables = ueditor_obj.getElementsByTagName("table"),
          iframe = ueditor_obj.getElementsByTagName("iframe"),
          switch_bg = $('.format_switch_bg')[0].checked,
          switch_head = $('.format_switch_head')[0].checked,
          switch_qrcode = $('.format_switch_qrcode')[0].checked,
          title_num = border_num = 0,
          num_0 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          num_1 = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'],
          num_2 = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹', '拾贰', '拾叁', '拾肆', '拾伍', '拾陆', '拾柒', '拾捌', '拾玖', '贰拾'],
          title_num_switch = title_sec_num_switch = border_num_switch = false,
          DBC2SBC = html = '',
          TitleId;
      editor.setContent(ueditor_obj_save);
      /*将图片替换为标签*/
      if (imgs != null && imgs.length > 0) {
          for (i = 0; i < imgs.length; i++) {
              var img = document.createElement("IMG");
              img.src = imgs[i].src;
              tmp_img[tmp_img.length] = img;
          }
          var formatImgCount = 0;
          for (j = 0; j < imgs.length;) {
              imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
              formatImgCount++;
          }
      }
      /*将表格替换为标签*/
      if (tables != null && tables.length > 0) {
          var formatTableCount = 0;
          for (var k = 0; k < tables.length;) {
              tmp_table[tmp_table.length] = tables[k].outerHTML;
              tables[k].outerHTML = "\n#FormatTableID_" + formatTableCount + "#\n";
              formatTableCount++;
          }
      }
      if (iframe != null && iframe.length > 0) {
          var formatIframeCount = 0;
          for (var k = 0; k < iframe.length;) {
              tmp_iframe[tmp_iframe.length] = iframe[k].outerHTML;
              iframe[k].outerHTML = "\n#FormatIframeID_" + formatIframeCount + "#\n";
              formatIframeCount++;
          }
      }
      /*获取编辑器内文本*/
      var texts = ueditor_obj.body.innerText;
      /*获取数据库内模板样式*/
      tpl = JSON.parse(tpl);
      if (tpl[0].indexOf('_num') >= 0) {
          title_num_switch = true;
          type = tpl[0].match(/data-form=".*?"/)[0].substring(11, tpl[0].match(/data-form=".*?"/)[0].length - 1)
          switch (type) {
              case '0':
                  title_num_list = num_0
                  break;
              case '1':
                  title_num_list = num_1
                  break;
              case '2':
                  title_num_list = num_2
                  break;
          }
      }
      if (tpl[10].indexOf('_num') >= 0) {
          border_num_switch = true;
          type = tpl[10].match(/data-form=".*?"/)[0].substring(11, tpl[10].match(/data-form=".*?"/)[0].length - 1)
          switch (type) {
              case '0':
                  border_num_list = num_0
                  break;
              case '1':
                  border_num_list = num_1
                  break;
              case '2':
                  border_num_list = num_2
                  break;
          }
      }
      /*字符过滤处理？（猜）*/
      for (var l = 0; l < texts.length; l++) {
          var code = texts.charCodeAt(l);
          if (code >= 65281 && code < 65373 && code != 65292 && code != 65306) {
              DBC2SBC += String.fromCharCode(texts.charCodeAt(l) - 65248);
          } else {
              DBC2SBC += texts.charAt(l);
          }
      }
      /*将文本按照换行符分隔成数组*/
      var tmps = DBC2SBC.split("\n");
      /*标题与正文处理*/
      for (var n = 0; n < tmps.length; n++) {
          var tmp = tmps[n].trim();
          if (tmp.length > 0) {
              /*indexOf查询字符串首次出现在字符串内的位置*/
              if (tmp.indexOf("FormatImgID") > 0 || tmp.indexOf("FormatTableID") > 0 || tmp.indexOf("FormatIframeID") > 0) {
                  html += tmp + "\n";
              } else {
                  /*如果不检测标题则文本全为正文*/
                  if (titlelen == 0) {
                      html += tpl[1].replace("FormatReplaceName", tmp) + "\n";
                  }
                  else {
                      if (tmp.length > titlelen) {
                          /*替换正文*/
                          tpl_text = tpl[1].replace('class="_editor', 'class="_editor text_content')
                          if(tpl[1].indexOf('_border') != -1){
                              if(border_num_switch){
                                  html += tpl[10].replace("FormatReplaceName", tpl_text.replace("FormatReplaceName", tmp)).replace("FormatReplaceNumber", border_num_list[border_num % 20]) + "\n";
                                  border_num++
                              }
                              else{
                                  html += tpl[10].replace("FormatReplaceName", tpl_text.replace("FormatReplaceName", tmp)) + "\n";
                              }
                          }
                          else{
                              html += tpl_text.replace("FormatReplaceName", tmp) + "\n";
                          }
                      }
                      /*处理标题*/
                      else if (tmp.length > 1) {
                          /*如果上一个文本是标题或者这是第一条标题*/
                          if ((TitleId + 1) != n || TitleId === 'undefined') {
                              /*标题不需要序号*/
                              if (tpl[0].indexOf('FormatReplaceIndent') == -1) {
                                  /*套用标题模板*/
                                  if (title_num_switch) {
                                      html += tpl[0].replace("FormatReplaceName", tmp).replace("FormatReplaceNumber", title_num_list[title_num % 20]) + "\n";
                                      title_num++
                                  }
                                  else {
                                      html += tpl[0].replace("FormatReplaceName", tmp) + "\n";
                                  }
                              }
                              /*将标题的前两个字符作为序号*/
                              else {
                                  html += tpl[0].replace("FormatReplaceIndent", tmp.substr(0, 2)).replace("FormatReplaceName", tmp.substr(2)) + "\n";
                              }
                          }
                          /*正常标题（会居中）*/
                          else {
                              html += tpl[1].replace("FormatReplaceName", tmp).replace('style="', 'style="text-align:center;');
                          }
                          TitleId = n;
                      }
                  }
              }
          }
      }
      if (switch_head) {
          html = tpl[8].replace() + "\n" + html
      }
      if (switch_qrcode) {
          html += tpl[7].replace("FormatReplaceName", 'http://img.96weixin.com/ueditor/20200108/1578448292894777.png');
      }
      /*处理背景样式*/
      if (switch_bg) {
          if (tpl[3]) html = tpl[3].replace("FormatReplaceName", html);
      }
      else {
          html = '<section style="box-sizing: border-box;">FormatReplaceName</section>'.replace("FormatReplaceName", html);
      }
      /*处理图片样式*/
      if (tmp_img != null && tmp_img.length > 0) {
          for (var m = 0; m < tmp_img.length; m++) {
              var imghtml = tpl[2].replace("FormatReplaceName", tmp_img[m].src);
              html = html.replace("#FormatImgID_" + m + "#", imghtml);
          }
      }
      /*处理表格样式*/
      if (tmp_table != null && tmp_table.length > 0) {
          for (var o = 0; o < tmp_table.length; o++) {
              html = html.replace("#FormatTableID_" + o + "#", tmp_table[o]);
          }
      }
      /*处理iframe样式*/
      if (tmp_iframe != null && tmp_iframe.length > 0) {
          for (var p = 0; p < tmp_iframe.length; p++) {
              html = html.replace("#FormatIframeID_" + p + "#", tmp_iframe[p]);
          }
      }
      /*提交*/
      editor.setContent(ueditor_obj_save);
      window.preview_html_code(html);
      return
      editor.setContent(html);
      editor.undoManger.save();
      editor.focus(true);
      return !1;
  };
  var form_format = layui.form;
  form_format.on('switch(format_switch_bg)', function (data) {
      var scroll_position= $('.rich_media_inner').scrollTop()
      var id = $('#content_view').attr('data-id')
      var ele = $('.content-format-list').find('li[data-id=' + id + '] textarea').text()
      var type = $('#content_view').data('type')
      if (type == 1) {
          formatHtml_switch(ele);
      }
      else if (type == 2) {
          formatHtml_switch(ele);
      }
      $('.rich_media_inner').scrollTop(scroll_position)
  })
  form_format.on('switch(format_switch_head)', function (data) {
      var scroll_position= $('.rich_media_inner').scrollTop()
      var id = $('#content_view').attr('data-id')
      var ele = $('.content-format-list').find('li[data-id=' + id + '] textarea').text()
      var type = $('#content_view').data('type')
      if (type == 1) {
          formatHtml_switch(ele);
      }
      else if (type == 2) {
          formatHtml_switch(ele);
      }
      $('.rich_media_inner').scrollTop(scroll_position)
  })
  form_format.on('switch(format_switch_qrcode)', function (data) {
      var scroll_position= $('.rich_media_inner').scrollTop()
      var id = $('#content_view').attr('data-id')
      var ele = $('.content-format-list').find('li[data-id=' + id + '] textarea').text()
      var type = $('#content_view').data('type')
      if (type == 1) {
          formatHtml_switch(ele);
      }
      else if (type == 2) {
          formatHtml_switch(ele);
      }
      $('.rich_media_inner').scrollTop(scroll_position)
  })
  //编辑器插入内容
  var insertHtml = window.insert_Html = function (html) {
      html = window.parseInsertPasteSetHtml(html);
      var select_html = $.trim(window.getSelectionHtml());
      if (select_html != "") {
          select_html = strip_tags(select_html, '<br><p><h1><h2><h3><h4><h5><h6><img>');
          var select_obj = $('<div>' + select_html + '</div>');
          select_obj.find('*').each(function () {
              $(this).removeAttr('style');
              $(this).removeAttr('class');
          });
          var obj = $('<div>' + html + '</div>');
          obj.find('> ._editor').siblings('p').each(function (i) {
              if ($(this).html() == "" || $(this).html() == "&nbsp;" || $(this).html() == "<br>" || $(this).html() == "<br/>") {
                  if (typeof $(this).attr('style') == 'undefined') {
                      $(this).remove();
                  }
              }
          });
          select_obj.find('h1,h2,h3,h4,h5,h6').each(function (i) {
              var title = obj.find('._title').eq(i);
              if (title && title.size() > 0) {
                  title.html($.trim($(this).text()));
                  $(this).remove();
              } else {
                  $(this).replaceWith('<p>' + $(this).text() + '</p>');
              }
          });
          select_obj.find('img').each(function (i) {
              var bgimg = obj.find('._bg').eq(i);
              if (bgimg && bgimg.size() > 0) {
                  var e = $(this).attr('src');
                  if (0 <= e.indexOf("//mmbiz.qlogo.cn") || 0 <= e.indexOf("//mmbiz.qpic.cn") || 0 <= e.indexOf("//mmsns.qpic.cn")) e = RemoteUrl + e.replace('https:/', '').replace('http:/', '').replace('mmbiz.qpic.cn', 'mmbiz.qlogo.cn');
                  bgimg.css('background-image', 'url(' + e + ')');
                  $(this).remove();
              }
          });
          var img_i = 0;
          select_obj.find('img').each(function () {
              var img = obj.find('img').eq(img_i);
              while (img.hasClass('assistant')) {
                  img_i++;
                  img = obj.find('img').eq(img_i);
              }
              if (img && img.size() > 0 && $(img).parents('._brush').size() == 0) {
                  var e = $(this).attr('src');
                  if (0 <= e.indexOf("//mmbiz.qlogo.cn") || 0 <= e.indexOf("//mmbiz.qpic.cn") || 0 <= e.indexOf("//mmsns.qpic.cn")) e = RemoteUrl + e.replace('https:/', '').replace('http:/', '').replace('mmbiz.qpic.cn', 'mmbiz.qlogo.cn');
                  img.attr('src', e);
                  if (img.parent().attr('data-role') == 'circle' || img.parent().attr('data-role') == 'square' || img.parent().attr('data-role') == 'bgmirror') {
                      img.parent().css('backgroundImage', 'url(' + e + ')');
                  }
                  img_i++;
                  $(this).remove();
              }
          });
          var brushs = obj.find('._brush');
          var total = brushs.size();
          if (total > 0) {
              if (total == 1) {
                  var brush_item = obj.find('._brush:first');
                  select_obj.contents().each(function (i) {
                      var $this = this;
                      if (this.tagName == "IMG") {
                          return;
                      }
                      ;
                      if ($.trim($($this).text()) == "" || this.tagName == 'BR' || $(this).html() == "" || $(this).html() == "&nbsp;" || $(this).html() == "<br>" || $(this).html() == "<br/>") {
                          $(this).remove();
                      }
                  });
                  var style = brush_item.data('style');
                  if (style) {
                      select_obj.find('*').each(function () {
                          $(this).attr('style', style);
                      });
                  }
                  var html = select_obj.html();
                  if (html != "") {
                      brush_item.html(html);
                  }
              } else {
                  select_obj.contents().each(function (i) {
                      var $this = this;
                      if ($this.nodeType == 3) {
                          $this = $('<p>' + $(this).text() + '</p>').get(0);
                      }
                      if (i < total) {
                          var brush_item = brushs.eq(i);
                          var style = brush_item.data('style');
                          if (style) {
                              $($this).attr('style', style);
                          }
                          brush_item.empty().append($($this));
                      } else {
                          var brush_item = brushs.eq(total - 1);
                          var style = brush_item.data('style');
                          if (style) {
                              $($this).attr('style', style);
                          }
                          brush_item.append($($this));
                      }
                  });
              }
          } else { //20180320秒刷
              //文字处理
              html = obj.html();
              var ret = /.*[\u4e00-\u9fa5]{3,}.*/,
                  txt = html.replace(/<[^>]*>/g, '#_#_').split('#_#_'),
                  txt_replace = select_html.replace(/<\/?span[^>]*>/g, '').replace(/<\/?a[^>]*>/g, '').replace(/<\/?strong[^>]*>/g, '').replace(/<.*?>/g, '#_#_').split('#_#_');
              txt_replace = $.grep(txt_replace, function (n) {
                  return $.trim(n).length > 0;
              });
              for (var i = 0; i < txt.length; i++) {
                  if (ret.test(txt[i]) || txt[i].length > 4 || txt[i] == '标题' || txt[i] == '内容') {
                  } else {
                      txt[i] = '';
                  }
              }
              txt = $.grep(txt, function (n) {
                  return $.trim(n).length > 0;
              });
              if (txt.length >= txt_replace.length) {
                  for (var i = 0; i < txt.length; i++) {
                      if (typeof(txt_replace[i]) == 'undefined') continue;
                      html = html.replace(txt[i], txt_replace[i]);
                  }
              } else {
                  if (txt.length == 1) {
                      var txt_str = '';
                      for (var i = 0; i < txt_replace.length; i++) {
                          if (txt[0].length > 10 || txt[0].indexOf('内容') != -1) {
                              txt_str += txt_replace[i] + '<br/>';
                          } else {
                              txt_str += txt_replace[i];
                          }
                      }
                      html = html.replace(txt[0], txt_str);
                  } else if (txt.length > 1) {
                      var e = [],
                          f = [];
                      f[0] = 0, f[1] = max = txt[0];
                      for (var i = 1; i < txt.length; i++) {
                          if (max.length < txt[i].length) {
                              max = txt[i];
                              f[0] = i;
                              f[1] = max;
                          }
                      }
                      if (f[1].length > 10 || f[1].indexOf('内容') != -1) {
                          for (var i = 0; i < txt_replace.length; i++) {
                              if (i < f[0]) {
                                  e[i] = txt_replace[i];
                              } else {
                                  if (typeof e[f[0]] == 'undefined') e[f[0]] = txt_replace[i];
                                  else e[f[0]] += '<br />' + txt_replace[i];
                              }
                          }
                      } else {
                          for (var i = 0; i < txt_replace.length; i++) {
                              if (i < f[0]) {
                                  e[i] = txt_replace[i];
                              } else {
                                  if (typeof e[f[0]] == 'undefined') e[f[0]] = txt_replace[i];
                                  else e[f[0]] += txt_replace[i];
                              }
                          }
                      }
                      for (var i = 0; i < txt.length; i++) {
                          if (typeof(e[i]) == 'undefined') continue;
                          html = html.replace(txt[i], e[i]);
                      }
                  }
              }
              obj = $('<div>' + html + '</div>');
          }
          html = obj.html();
      }
      editor.execCommand('insertHtml', html);
      editor.undoManger.save();
      editor.isFocus() ? editor.fireEvent("selectionchange", !1, !0) : editor.focus(true);
      return true;
  }
  var getEditorHtml = function (outer) {
      $(editor.selection.document).find('p').each(function () {
          if ($.trim(strip_tags($(this).html())) == "&nbsp;") {
              $(this).html('<br/>');
          } else if ($.trim(strip_tags($(this).html())) == "") {
              if ($(this).find('img,audio,iframe,mpvoice,video').size() > 0) {
                  return;
              }
              if ($(this).find('br').size() > 0) {
                  $(this).html('<br/>');
              } else {
                  if (!this.style.clear) $(this).remove();
              }
          }
      });
      while ($(editor.selection.document).find('._editor_bg').size() > 1) {
          $(editor.selection.document).find('._editor_bg').each(function (i) {
              if (i > 0) {
                  if (this.style.backgroundColor && this.style.backgroundColor != "" || $(this).css('background-image') && $(this).css('background-image') != 'none') {
                      $(this).removeAttr('class');
                      $(this).removeAttr('label');
                  } else {
                      $(this).replaceWith($(this).html());
                  }
              }
          });
      }
      var copyEditor = $(document.getElementById('ueditor_0').contentWindow.document.body).clone();
      var html = copyEditor.html();
      html = parseEditorHtml(html, outer);
      return $.trim(html);
  }
  var strip_stack_span = function (html) {
      var docObj = $('<div>' + html + '</div>'),
          has_secspan = false;
      docObj.find('li,colgroup,a').each(function () {
          if ($.trim($(this).text()) == "" && $(this).find('img').size() == 0) {
              $(this).remove();
          }
      });
      do {
          has_secspan = false;
          docObj.find('span:has(span)').each(function (i) {
              var innerobj = $(this).find('> span');
              if (innerobj.size() > 1) {
                  $(this).find('span').each(function () {
                      if ($.trim($(this).text()) == "") {
                          $(this).replaceWith($(this).html());
                      }
                  });
                  return;
              } else if (innerobj.size() == 0) {
                  return;
              }
              if ($.trim($(this).text()) == $.trim(innerobj.text())) {
                  has_secspan = true;
                  var style = $(this).attr('style'),
                      innserstyle = innerobj.attr('style'),
                      newStyle = '',
                      new_html = '';
                  if (style && style != "") {
                      newStyle += ';' + style;
                  }
                  if (innserstyle && innserstyle != "") {
                      newStyle += ';' + innserstyle;
                  }
                  $(this).find('> *').each(function () {
                      if (this.tagName == "SPAN") {
                          new_html += $(innerobj).html();
                      } else {
                          new_html += $(this).prop('outerHTML');
                      }
                  });
                  $(this).attr('style', newStyle).html(new_html);
              }
          });
      } while (has_secspan);
      return docObj.html();
  }
  var strip_tags = function (input, allowed) {
      allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
          commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
          return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
  }
  var parseEditorHtml = function (html, outer) {
      if (outer) html = html.replace(new RegExp(RemoteUrl, 'g'), 'https:/');
      var htmlObj = $('<div>' + $.trim(html) + '</div>');
      htmlObj.find('.tool-border').remove();
      htmlObj.find('*').each(function () {
          $(this).removeAttr("referrerpolicy").removeAttr("data-w").removeAttr("data-type").removeAttr("data-ratio");
          if (this.style.width) {
              if (this.style.width.indexOf("%") >= 0) {
                  $(this).attr("data-width", this.style.width);
              }
          }
          if (this.style.fontFamily) {
              var sty = $(this).attr('style');
              $(this).attr('style', sty.replace(/\"/g, "'"));
          }
          if (this.style.transform) {
              setElementTransform(this, this.style.transform);
              return;
          }
          if (this.tagName == "SECTION") {
              var style = $(this).attr('style');
              if (style) {
                  style = style.toLowerCase();
                  if (style.indexOf('box-sizing') >= 0) {
                      return;
                  } else if (style.indexOf('padding') >= 0 || style.indexOf('border') >= 0) {
                      $(this).css('box-sizing', 'border-box');
                  }
              }
              if ($(this).hasClass("_editor") && $(this).hasClass("active")) $(this).removeClass("active");
          } else if (this.tagName == "IMG" || this.tagName == "BR" || this.tagName == "TSPAN" || this.tagName == "TEXT" || this.tagName == "IMAGE") {
              // if (this.tagName == "IMG") {
              //     $(this).attr('src',  $(this).attr('src').replace(new RegExp(RemoteUrl, 'g'), 'https:/') );
              // }
              return;
          } else if (this.tagName == "STRONG" || this.tagName == "SPAN" || this.tagName == "B" || this.tagName == "EM" || this.tagName == "I") {
              return;
          } else if (this.tagName == "P") {
              return;
          } else if (this.tagName == "H1" || this.tagName == "H2" || this.tagName == "H3" || this.tagName == "H4" || this.tagName == "H5" || this.tagName == "H6") {
              $(this).css('font-weight', 'bold');
              if (!this.style.fontSize) $(this).css({
                  'font-size': '16px'
              });
              if (!this.style.lineHeight) $(this).css({
                  'lineHeight': '1.6em'
              });
              return;
          } else if (this.tagName == "OL" || this.tagName == "UL" || this.tagName == "DL") {
              $(this).css({
                  'margin': '0px',
                  'padding': '0 0 0 30px'
              });
              return;
          }
          if ((this.tagName == "TD" || this.tagName == "TH") && this.style.padding == "" && this.style.paddingLeft == "" && this.style.paddingRight == "" && this.style.paddingTop == "" && this.style.paddingBottom == "") $(this).css({
              'margin': '5px 10px'
          });
      });
      var html = $.trim(htmlObj.html().replace(/mso-[^:|^"|^;]+:[^:|^"|^;]+;?/g, '').replace(/lang="[^"]+"/g, '').replace(/title="[^"]+"/g, '').replace(new RegExp('class="MsoNormal"', "gm"), ''));

      // LGD 2020-03-24 添加QQ音乐
      html = html.replace(/class="([\s]*?)((?!([\s]*?)[js_editor_qqmusic|qqmusic_iframe|res_iframe|js_uneditable|custom_select_card_editor_editor|_editor_bg|_brush|_bg|_num|_ul|_li])[\s\S]*?)([\s]*?)"/ig, '');
      html = html.replace(/(http|https):\/\/mmbiz.qlogo.cn/g, "mpweixinimg").replace(/mpweixinimg/g, "https://mmbiz.qpic.cn");
      return html;
  }
  var setElementTransform = function (dom, transform) {
      if (transform == "none") return;
      var sty = $(dom).attr('style') || '';
      sty = sty.replace('transform:', 'transform :');
      sty = sty.replace(/;\s*transform\s*:[A-Za-z0-9_%,.\-\(\)\s]*;/gim, ';');
      sty = sty.replace(/\s*\-[a-z]+\-transform\s*:[A-Za-z0-9_%,.\-\(\)\s]*;/gim, '');
      sty = sty.replace(/transform\s*:[A-Za-z0-9_%,.\-\(\)\s]*;/gim, '');
      sty = sty + ';transform: ' + transform + ';-webkit-transform: ' + transform + ';-moz-transform: ' + transform + ';-ms-transform: ' + transform + ';-o-transform: ' + transform + ';';
      $(dom).attr('style', sty.replace(';;', ';'));
  }
  //时间转时间戳
  var timetrans = window.time_trans = function (date) {
      var date = new Date(date * 1000);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y + M + D + h + m + s;
  }
  //登录
   var floatlogin = window.float_login = function () {
      var loading = layer.load(2, {
          shade: [.2, '#000']
      });
      layer.open({
          type: 2,
          title: false,
          area:['795px','470px'],
          shade: 0.4,
          closeBtn: 0,
          content: '/login?t=' + new Date().getTime(),
          success: function (layero, index) {
              layer.close(loading);
          }
      });
  }


  $("#float-login").click(function () {
      floatlogin();
  });
  //注册
   var floatregister = function () {
      var loading = layer.load(2, {
          shade: [.2, '#000']
      });
      layer.open({
          type: 2,
          area:['795px','470px'],
          shade: 0.4,
          closeBtn: 0,
          title: false,
          content: ['/register?t=' + new Date().getTime(), 'no'],
          success: function (layero, index) {
              layer.close(loading);
          }
      });
  }


  $("#float-register").click(function () {
      floatregister();
  });
  //鼠移tips
  $(".set-tips").mouseenter(function () {
      if (typeof $(this).data('tips') != "undefined") layer.tips($(this).data('tips'), this, {
          tips: [2, '#555']
      });
  }).mouseleave(function () {
      layer.closeAll('tips');
  });
  //公告
  $(".header-notice").click(function () {
      notice_list();
      $('.header-notice .dot').remove();
  });

  /*cookie操作*/
  function getCookie(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
      else
          return null;
  }

  function setCookie(key,value,t){
      if (typeof t == 'undefined') {
          document.cookie = key+"="+value;
      } else {
          var oDate=new Date();
          oDate.setDate(oDate.getDate()+t);
          document.cookie = key+"="+value+"; expires=" + oDate.toGMTString();
      }
  }

  /*皮肤操作*/
  $(".header-skin").click(function () {
      var loading = layer.load(2, {shade: [.2, '#000']});
      $.post('/userajax/skin_list', {}, function (json) {
          json = json || {};
          layer.close(loading);
          if (json.status == 1) {
              var skin=getCookie('96weixin_skin')?getCookie('96weixin_skin'):''
              var data = json.data
              var path = json.path
              html='<div class="skin_box"><ul>'
              // skin
              for(var index in data){
                  var data_this=data[index]
                  if(data_this.class==skin){
                      select='select'
                  }
                  else{
                      select=''
                  }
                  html+='<li class="'+select+'" data-skin="'+data_this.class+'" data-dark="'+data_this.dark+'"><div class="skin_img"><img src="'+path+'/'+data_this.thumb+'"><div class="skin_shadow"></div><div class="skin_use"><div class="skin_use_text">立即使用</div></div><div class="skin_choose"><i class="fa fa-check"></i></div></div>'+data_this.name+'</li>'
              }
              html+='</ul></div>'
              layer.open({
                  type: 1,
                  area: ['920px','490px'],
                  shade: 0.4,
                  skin: 'float-drafts',
                  btn: false,
                  shadeClose :true,
                  title: '皮肤',
                  content: html,
                  success: function (layero, index) {}
              });
          }
          else if(json.status == -1){
              layer.msg('必须登录后才能执行该操作', {time: 1000,anim: 6}, function () {floatlogin()});
              return !1
          }
          else {
              layer.msg(json.info, {icon: 5,anim: 6})
              return !1
          }
      }).fail(function () {
          layer.close(loading);
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
          return !1
      });
  });

  $(document).on('mouseenter','.skin_box li', function () {
      check = $(this).hasClass('select')
      if(!check){
          $(this).find('.skin_shadow').show()
          $(this).find('.skin_use').css('display','flex')
      }
  })
  $(document).on('mouseleave','.skin_box li', function () {
      $(this).find('.skin_shadow').hide()
      $(this).find('.skin_use').hide()
  })

  $(document).on('click','.skin_box li', function () {
      var dark_state=$(this).data('dark')?$(this).data('dark'):0
      var skin=$(this).data('skin')?$(this).data('skin'):''
      window.index=1
      editor.execCommand('skin_change',skin,dark,window.index,editor);
      setCookie('96weixin_skin',skin,730)
      $('body').removeClass().addClass(skin)
      if(skin=='skin_background_git'){
        ele_num=$('#background_git').length
        if(ele_num==0){
          var ele = document.createElement('script');
          ele.setAttribute('type','text/javascript')
          ele.setAttribute('color','255,0,0')
          ele.setAttribute('pointColor','255,0,0')
          ele.setAttribute('opacity','0.7')
          ele.setAttribute('zIndex','-2')
          ele.setAttribute('count','100')
          ele.setAttribute('src',public_url+'/js/background/canvas-nest.js')
          document.body.appendChild(ele)
        }
        else{
          $('#background_git').show()
        }
      }
      else{
        $('#background_git').hide()
      }
      if(skin=='skin_juji'){
        ele_num=$('#juji').length
        if(ele_num==0){
          var ele = document.createElement('canvas');
          ele.id='juji'
          document.body.appendChild(ele)
          var ele = document.createElement('script');
          ele.setAttribute('type','text/javascript')
          ele.setAttribute('src',public_url+'/js/background/juji.js')
          document.body.appendChild(ele)
        }
        else{
          $('#juji').show()
        }
      }
      else{
        $('#juji').hide()
      }
      if(skin=='skin_qipao'){
        ele_num=$('#qipao').length
        if(ele_num==0){
          var ele = document.createElement('canvas');
          ele.id='qipao'
          document.body.appendChild(ele)
          var ele = document.createElement('script');
          ele.setAttribute('type','text/javascript')
          ele.setAttribute('src',public_url+'/js/background/qipao.js')
          document.body.appendChild(ele)

        }
        else{
          $('#qipao').show()
        }
      }
      else{
        $('#qipao').hide()
      }
      if(dark_state!=0){
          $('body').attr('id','skin_dark')
          $('body').attr('data-dark',1)
          dark('content-style',1)
          setCookie('96weixin_skin_dark',1,730)
      }
      else{
          $('body').attr('id','')
          $('body').attr('data-dark',0)
          dark_clear('content-style')
          setCookie('96weixin_skin_dark',0,730)
      }
      $(this).addClass('select').siblings().removeClass('select')
      $(this).find('.skin_shadow').hide()
      $(this).find('.skin_use').hide()


      $.get('/tongji/skin?skin=' + $(this).data('skin'));

  })



  var notice_list = function (e) {
      var loading = layer.load(2, {
              shade: [.2, '#000']
          }),
          content = '';
      $.post('/notice', {}, function (json) {
          json = json || {};
          layer.close(loading);
          if (json.status == 1) {
              for (var i = 0; i < json.data.length; i++) {
                  if (json.data[i]['link'] == '') {
                      content += "<li data-id='" + json.data[i]['id'] + "'><a href='javascript:;'><div class='notice-title'>" + json.data[i]['title'] + "</div><div class='notice-time'>" + json.data[i]['addtime'] + "</div></a></li>";
                  } else {
                      content += "<li><a href='" + json.data[i]['link'] + "' target='_blank'><div class='notice-title'>" + json.data[i]['title'] + "</div><div class='notice-time'>" + json.data[i]['addtime'] + "</div></a></li>";
                  }
              }
              if (content == '') {
                  layer.msg("暂无公告", {
                      icon: 6
                  })
                  return !1
              }
              layer.open({
                  type: 1,
                  area: ['800px'],
                  shade: 0.4,
                  title: '站点公告',
                  content: '<ul class="notice-list">' + content + '</ul>',
                  success: function (layero, index) {
                      notice_info(index);
                  }
              });
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
              return !1
          }
      }).fail(function () {
          layer.close(loading);
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
          return !1
      });
  }
  var notice_info = function (e) {
      $(".notice-list li").click(function () {
          var notice_id = $(this).data('id');
          if (typeof(notice_id) != "undefined") {
              var loading = layer.load(2, {
                      shade: [.2, '#000']
                  }),
                  content = '';
              $.post('/notice/info', {
                  id: notice_id
              }, function (json) {
                  json = json || {};
                  layer.close(loading);
                  if (json.status == 1) {
                      layer.close(e);
                      layer.open({
                          type: 1,
                          area: ['800px'],
                          shade: 0.4,
                          maxHeight: 600,
                          title: json.title,
                          content: '<time class="notice-time">' + json.addtime + '</time><div class="notice-info">' + json.content + '</div>',
                          btn: ['返回'],
                          yes: function (index, layero) {
                              layer.close(index);
                              notice_list();
                          }
                      });
                  } else {
                      layer.msg(json.info, {
                          icon: 5,
                          anim: 6
                      })
                      return !1
                  }
              }).fail(function () {
                  layer.close(loading);
                  layer.msg("服务器连接失败", {
                      icon: 2,
                      anim: 6
                  })
                  return !1
              });
          }
      });
  }
  //微信群
  $(".group-qrcode").click(function () {
      layer.open({
          type: 1,
          area: ['400px', '555px'],
          shade: 0.4,
          skin: 'float-feedback',
          title: '加入微信群',
          content: '<form class="layui-form layui-form-pane"><div class="layui-form-item layui-form-text"><img style="width: 352px;" src="' + group_qrcode_img + '"/></div></form>',
      });
  });
  $(".bbt_qrcode").click(function () {
      $.get("/logfun?id=1", function (result) {
      });
      layer.open({
          type: 1,
          area: ['330px', '500px'],
          shade: 0.4,
          skin: 'float-feedback',
          title: '帮帮投免费投票小程序',
          content: '<style>.pay-qrcode,.pay-qrcode h2{width:300px}.layui-elem-quote{margin-bottom:10px;padding:15px;line-height:22px;border-left:5px solid #009688;border-radius:0 2px 2px 0;background-color:#f2f2f2}.layui-elem-quote{border-color:#FFB800;margin-bottom:20px}.pay-qrcode #bbt_img{width:250px;margin:0 auto;}</style><div class="pay-qrcode"><h2 style="color:red;">帮帮投-免费投票小程序</h2><h2><a style="font-size:16px;color: blue;" href="https://mp.weixin.qq.com/s/QudJhWU_Ox2KKxBKzOHIQA" target="_blank">➙点击查看帮帮投使用教程</a></h2><blockquote class="layui-elem-quote">微信扫描下方二维码，进入帮帮投。</blockquote><div id="bbt_img"><img width="250" height="250" src="http://public.96weixin.com/images/bbt_qr.jpg"/></div></div>',
      });
  });
  $(".hhtw_qrcode").click(function () {
      $.get("/logfun?id=3", function (result) {
      });
      layer.open({
          type: 1,
          area: ['330px', '500px'],
          shade: 0.4,
          skin: 'float-feedback',
          title: '好好图文--免费小程序编辑器',
          content: '<style>.pay-qrcode,.pay-qrcode h2{width:300px}.layui-elem-quote{margin-bottom:10px;padding:15px;line-height:22px;border-left:5px solid #009688;border-radius:0 2px 2px 0;background-color:#f2f2f2}.layui-elem-quote{border-color:#FFB800;margin-bottom:20px}.pay-qrcode #bbt_img{width:250px;margin:0 auto;}</style><div class="pay-qrcode"><h2 style="color:red;">好好图文--免费图文编辑器小程序</h2><h2><a style="font-size:16px;color: blue;" href="https://mp.weixin.qq.com/s/x5aVGKp-TvKgeQFWdUiAUA" target="_blank">➙点击查看好好图文使用教程</a></h2><blockquote class="layui-elem-quote">可以直接发文预览的小程序。<br/>微信扫描下方二维码，进入好好图文。</blockquote><div id="bbt_img"><img width="250" height="250" src="http://public.96weixin.com/images/hhtw_qr.jpg"/></div></div>',
      });
  });
  $(".train").click(function () {
      $.get("/logfun?id=train", function (result) {
      });
      layer.open({
          type: 1,
          area: ['360px', '640px'],
          shade: 0.4,
          skin: 'float-feedback',
          title: false,
          shadeClose: true,
          //content: '<style>.pay-qrcode,.pay-qrcode h2{width:300px}.layui-elem-quote{margin-bottom:10px;padding:15px;line-height:22px;border-left:5px solid #009688;border-radius:0 2px 2px 0;background-color:#f2f2f2}.layui-elem-quote{border-color:#FFB800;margin-bottom:20px}.pay-qrcode #bbt_img{width:250px;margin:0 auto;}</style><div class="pay-qrcode"><h2 style="color:red;">专业96新媒体交易代售公众号</h2><h2><a style="font-size:16px;color: blue;" href="http://www.96weixin.com" target="_blank">➙点击查看已出售公众号</a></h2><blockquote class="layui-elem-quote">扫描下方二维码,可直接联系公众号交易经纪人。</blockquote><div id="bbt_img"><img width="250" height="250" src="http://io.pic.96weixin.com/kefu/2019-02-24/5c72a09c5cbe1.jpg"/></div></div>',
          content: '<img style="width: 100%;" src="http://upload.96weixin.com/wximg/train.jpg">'
      });
  });
  // LGD 01-02 96 名片弹窗
  /*$(".mingpian_qrcode").click(function(e) {
   $.get("/logfun?id=2", function(result){});
   var obj = e.currentTarget;
   layer.open({
   type: 1,
   area: ['330px','500px'],
   shade: 0.4,
   skin: 'float-feedback',
   title: '96名片小程序',
   content: '<style>.pay-qrcode,.pay-qrcode h2{width:300px}.layui-elem-quote{margin-bottom:10px;padding:15px;line-height:22px;border-left:5px solid #009688;border-radius:0 2px 2px 0;background-color:#f2f2f2}.layui-elem-quote{border-color:#FFB800;margin-bottom:20px}.pay-qrcode #bbt_img{width:250px;margin:0 auto;}</style><div class="pay-qrcode"><h2 style="color:red;">96名片小程序</h2><blockquote class="layui-elem-quote">微信扫描下方二维码，进入96名片。</blockquote><div id="bbt_img"><img width="250" height="250" src="http://public.96weixin.com/images/mingpian.jpg"/></div></div>',
   end: function(){
   $(obj).removeClass('layui-this');
   }
   });
   });
   */
  //反馈
  $(".footer-feedback").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      var layedit = layui.layedit,
          feedback_content;
      layer.open({
          type: 1,
          area: ['500px', '515px'],
          shade: 0.4,
          skin: 'float-feedback',
          btn: ['提交', '取消'],
          title: '问题反馈',
          content: '<form class="layui-form layui-form-pane" onkeydown="if(event.keyCode==13){return false;}"><blockquote class="layui-elem-quote"">' + SiteName + '会员您好！请写下您的宝贵意见。&nbsp;&nbsp;或到<a href="/help" target="_blank">帮助中心</a>查看</blockquote><div class="layui-form-item layui-form-text"><label class="layui-form-label">反馈内容</label><div class="layui-input-block"><textarea class="layui-textarea" id="feedback-content" style="display:none"></textarea></div></div></form>',
          success: function (layero, index) {
              feedback_content = layui.layedit.build('feedback-content', {
                  tool: ['strong', 'italic', 'underline', 'del', '|', 'left', 'center', 'right', 'link', 'unlink', 'face'],
                  height: 240
              });
          },
          yes: function (layero, index) {
              var feedback_info = layedit.getContent(feedback_content);
              if (feedback_info == "") {
                  layer.tips('请输入要反馈的内容', '.float-feedback .layui-layedit', {
                      tips: [3, '#FF5722']
                  });
              } else if (feedback_info.length < 10) {
                  layer.tips('反馈的内容太短了', '.float-feedback .layui-layedit', {
                      tips: [3, '#FF5722']
                  });
              } else {
                  var loading = layer.load(2, {
                      shade: [.2, '#000']
                  });
                  $.post('/indexajax/feedback', {
                      content: feedback_info
                  }, function (json) {
                      json = json || {};
                      layer.close(loading);
                      if (json.status == -1) {
                          layer.close(layero);
                          layer.msg("登录超时，请重新登录", {
                              time: 1000,
                              anim: 6
                          }, function () {
                              floatlogin();
                          })
                      } else if (json.status == 1) {
                          layer.close(layero);
                          layer.alert('提交成功,感谢您的反馈。我们将以站内消息回复你的问题！', {
                              icon: 1
                          })
                      } else {
                          layer.msg(json.info, {
                              icon: 5,
                              anim: 6
                          })
                      }
                  }).fail(function () {
                      layer.close(loading);
                      layer.msg("服务器连接失败", {
                          icon: 2,
                          anim: 6
                      })
                  })
              }
          }
      });
  });
  //清Cookie
  $(".footer-cookie").click(function () {
      var cookie_arr = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (cookie_arr) {
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          for (var i = cookie_arr.length; i--;) {
              document.cookie = cookie_arr[i] + '=;domain=' + document.domain + ';path=/;expires=' + exp.toGMTString();
          }

      }
      layer.msg('Cookie清除成功', {
          icon: 1
      }, function () {
          location.reload();
      });
  });
  //左侧操作
  /*$(".content-tab ul li").mouseenter(function() {
   if($(this).hasClass("tab-not")){
   $(this).parent().find(".tab-not").removeClass('active');
   $(this).addClass('active');
   }else{
   if(!$(this).hasClass("tab-open")) $(this).parent().find(".tab-not").removeClass('active');
   }
   });*/
  $(".content-tab ul li").click(function () {
      if ($(this).hasClass("tab-open")) return !1;
      var action = $(this).data('action');
      if (typeof action == "undefined" && !AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      $(".float-color,.float-recent,.float-brush").remove();
      $(".content-tab ul li").removeClass('active');
      $(this).addClass('active');
      if (typeof action == "undefined") {
          $(".content-tab ul li").find("a").removeClass('active');
          $('.content-l').find('> *').hide();
          $(this).next().find("a").eq(0).addClass('active');
          var _this = $(this).next().find("a").eq(0);
          module_tab(_this.data('action'), _this.data('module'));
      } else if (action == "gif" || action == "art" || action == "zhaotu") {
          if (!AlreadyLogin) {
              layer.msg('必须登录后才能执行该操作', {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin()
              });
              return !1
          }
          $('.content-l').find('> *').hide();
          module_tab(action);
      } else {
          $(".content-tab ul li").find("a").removeClass('active');
          $('.content-l').find('> *').hide();
          $('.content-l').find('.tab-' + action + ',.content-' + action).show();
          if (typeof $(this).data('info') != "undefined") {
              var info = $(this).data('info'),
                  info_arr = info.split(",");
              for (i = 0; i < info_arr.length; i++) {
                  var data_arr = info_arr[i].split("|");
                  $('.tab-' + action).data(data_arr[0], data_arr[1]);
                  if (data_arr[0] == 'did') {
                      $('.layui-nav-did').removeClass('active');
                      $('#' + action + '_did_' + data_arr[1]).addClass('active');
                  } else if (data_arr[0] == 'xid') {
                      $('.layui-nav-did dd').removeClass('active').removeClass('layui-this');
                      if (data_arr[1] == 0) {
                          $('.layui-nav-did.active dd:first').addClass('active').addClass('layui-this');
                      } else {
                          $('#' + action + '_xid_' + data_arr[1]).addClass('active').addClass('layui-this');
                      }
                  } else if (data_arr[0] == 'fengge' || data_arr[0] == 'jieri' || data_arr[0] == 'hangye') {
                      $('#' + action + '_' + data_arr[0] + ' dd').removeClass('active').removeClass('layui-this');
                      if (data_arr[1] == 0) {
                          $('#' + action + '_' + data_arr[0]).removeClass('active');
                          $('#' + action + '_' + data_arr[0] + ' dd:first').addClass('active').addClass('layui-this');
                      } else {
                          $('#' + action + '_' + data_arr[0]).addClass('active');
                          $('#' + action + '_' + data_arr[0] + '_' + data_arr[1]).addClass('active').addClass('layui-this');
                      }
                  } else if (data_arr[0] == 'sort') {
                      $('#' + action + '_' + data_arr[0] + ' span').removeClass('active');
                      $('#' + action + '_' + data_arr[0] + '_' + data_arr[1]).addClass('active');
                  }
              }

              if (action == 'styleFestival') { // LGD 2019-06-17
                  if ($('.content-' + action + '-list').html() == '') reloadMaterial(action);
                  return false;
              }

              $('.tab-' + action).data('page', '1');
              reloadMaterial(action);
          } else {
              if ($('.content-' + action + '-list').html() == '') reloadMaterial(action);
          }
      }
  });
  $(".layui-tab-title li").each(function (i) {
      $(this).click(function () {
          $('.layui-tab-title').find('> *').removeClass("layui-this");
          $('.layui-tab-content').find('> *').hide();
          $(".layui-tab-title>li").eq(i).addClass("layui-this");
          $(".layui-tab-content>div").eq(i).show();
          $('.tab-' + $(this).data('type')).data('page', '1');
          reloadMaterial($(this).data('type'));
      });
  });
  $(".content-tab ul li a").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      $('.content-l').find('> *').hide();
      $(".float-color,.float-recent,.float-brush").remove();
      $(".content-tab ul li").removeClass('active');
      $(".content-tab ul li a").removeClass('active');
      $(this).parent().prev().addClass('active');
      $(this).addClass('active');
      module_tab($(this).data('action'), $(this).data('module'));
  });
  var module_tab = function (action, module) {
      var AjaxUrl = typeof module != "undefined" ? '/' + module : '';

      if (action =='zhaotu') {
          AjaxUrl =   action + '?t=1';
      } else {
          AjaxUrl = AjaxUrl + '/' + action + '?t=1';
      }

      //AjaxUrl = AjaxUrl + '/' + action + '?t=1';
      $('.content-iframe').show();
      if (action != $('.content-iframe').data('action')) {
          $('.content-iframe').data('action', action);
          $('.content-iframe').find("iframe").remove();
          $('<iframe scrolling="auto" id="iframe_' + action + '" allowtransparency="true" frameborder="0" onload="this.className=\'\';" class="layui-layer-load" style="height:' + $('.content-l').height() + 'px;" src="' + AjaxUrl + '"></iframe>').prependTo('.content-iframe');
          if (action == 'save_art') {
              $("#iframe_save_art").on("load", function (event) {
                  // 自定义分类
                  $("#edit-cate", this.contentDocument).click(function () {
                      editCate(function () {
                      });
                  });

                  // 同步公众号
                  $("#btn_sync_weixin", this.contentDocument).click(function () {
                      layer.open({
                          type: 2,
                          area: ['625px', '600px'],
                          shade: 0.4,
                          skin: 'float-sync',
                          title: '同步到微信',
                          content: '/user/sync_art?t=1',
                          success: function (layero, index) {
                          }
                      });
                  });


              });
          }
      }
  };
  //最近使用
  $("#style_recent").click(function () {
      if ($(".float-recent").length > 0) return false;
      if (localStorage.getItem('stylerecent') == null) {
          layer.msg(' 无最近使用样式', {
              time: 1000,
              anim: 6
          });
          return !1
      }
      var scrollWidth = document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth,
          scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
          height = $(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - 82,
          left = scrollWidth / 2 - 472,
          top = (scrollTop) ? 50 - scrollTop + $('.topa-ds').height() : 50 + $('.topa-ds').height();
      if (height < 600) height = 600;
      var offset_left = $('.content-box').position().left;
      layer.open({
          type: 2,
          area: ['461px', height + 'px'],
          offset: [top + 'px', offset_left + 100 + 'px'],
          shade: 0,
          zIndex: 998,
          skin: 'float-recent',
          title: '最新使用',
          fixed: false,
          resize: false,
          move: false,
          content: '/material/style_recent?ids=' + localStorage.getItem('stylerecent'),
          success: function (layero, index) {
          }
      });
  });


  var search_click = function (e) {
      if ($(e).prev().val() == '' && $(e).attr('data-type') != 'format') {
          layer.tips('请输入要搜索的内容', $(this).prev(), {
              tips: [3, '#999']
          });
          return !1
      }
      $('.tab-' + $(e).data('type')).data('did', '0');
      $('.tab-' + $(e).data('type')).data('xid', '0');
      $('.tab-' + $(e).data('type')).data('fengge', '0');
      $('.tab-' + $(e).data('type')).data('jieri', '0');
      $('.tab-' + $(e).data('type')).data('hangye', '0');
      $('.tab-' + $(e).data('type')).data('sort', 'addtime');
      $('.tab-' + $(e).data('type')).data('page', '1');
      $('.tab-' + $(e).data('type')).find(".active").removeClass('active').removeClass('layui-this');
      if ($(e).data('type') == 'format') {
          $('.content-format').find('.layui-tab-title li').eq(0).addClass('layui-this').siblings().removeClass('layui-this')
          $('.content-format').find('.layui-tab-item').eq(0).addClass('layui-show').css('display', 'block').siblings().removeClass('layui-show').css('display', 'none')
      }
      reloadMaterial($(e).data('type'));
  };
  $(".search_span button").click(function (e) {
      search_click(e.currentTarget);
  });

  $(".format_search_div button").click(function(e) {
      search_click(e.currentTarget);
  });


  $('.search_span').bind('keyup', function (event) { // lGD 01-04 20:24
      if (event.keyCode == "13") {
          //回车执行查询
          search_click($('.search_span button'));
      }
  });
  //是否收藏
  form.on('switch(fav)', function (data) {
      if (!AlreadyLogin) {
          $(this).removeAttr('checked');
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          form.render('checkbox');
          return !1;
      }
      style_choice_one('fav');
      if (data.elem.checked == true) {
          // 移除 会员和精选
          $(this).parent().data('fav', '1');
      } else {
          $(this).parent().data('fav', '0');
      }
      $('.tab-style').data('page', '1');
      reloadMaterial('style');

  });
  // 会员
  form.on('switch(free)', function (data) {
      style_choice_one('free');
      if (data.elem.checked == true) {
          $(this).parent().data('free', '1');
      } else {
          $(this).parent().data('free', '0');
      }
      $('.tab-style').data('page', '1');
      reloadMaterial('style');
  });
  // 精选样式
  form.on('switch(choice)', function (data) {
      style_choice_one('choice');
      if (data.elem.checked == true) {
          $(this).parent().data('choice', '1');
      } else {
          $(this).parent().data('choice', '0');
      }
      $('.tab-style').data('page', '1');
      reloadMaterial('style');
  });


  form.on('switch(mianfei)', function (data) {
      style_choice_one('mianfei');
      if (data.elem.checked == true) {
          $(this).parent().data('mianfei', '1');
      } else {
          $(this).parent().data('mianfei', '0');
      }
      $('.tab-style').data('page', '1');
      reloadMaterial('style');
  });

  // 收藏，精选和 会员只能三选一
  var style_choice_one = function (style) {
      var arr = ['fav', 'choice', 'free','mianfei'];
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== style) {
              var obj = $('#style-' + arr[i]);
              obj.removeAttr('checked');
              obj.parent().data(arr[i], 0);
          }
      }
      form.render('checkbox');
  }

  //节日跳转
  $(".style_transfer").each(function (i) {
      $(this).click(function () {
          $(".content-tab ul li").eq(i + 2).click();
      });
  });
  //样式操作
  $(".tab-style li a,.tab-style .layui-nav-px span").click(function () {
      switch ($(this).data('type')) {
          case 'sort':
              if ($('.tab-style').data('sort') == $(this).data('sort')) return !1;
              $('.tab-style').data('sort', $(this).data('sort'));
              $(this).parent().find("span").removeClass('active');
              $(this).addClass('active');
              break;
          case 'did':
              if ($('.tab-style').data('did') == $(this).data('id') && $('.tab-style').data('xid') == 0) return !1;
              $('.tab-style').data('did', $(this).data('id'));
              $('.tab-style').data('xid', '0');
              $(".tab-style .layui-nav-did").removeClass('active');
              $(".tab-style .layui-nav-did dd").removeClass('active');
              $(this).parent().addClass('active');
              $(this).next().find("dd").eq(0).addClass('active');
              break;
          case 'xid':
              if ($('.tab-style').data('did') == $(this).data('tid') && $('.tab-style').data('xid') == $(this).data('id')) return !1;
              $('.tab-style').data('did', $(this).data('tid'));
              $('.tab-style').data('xid', $(this).data('id'));
              $(".tab-style .layui-nav-did").removeClass('active');
              $(this).parent().parent().parent().addClass('active');
              $(".tab-style .layui-nav-did dd").removeClass('active');
              $(this).parent().addClass('active');
              break;
          default:
              if (typeof $(this).data('type') == "undefined") return !1;
              if ($('.tab-style').data($(this).data('type')) == $(this).data('id')) return !1;
              $('.tab-style').data($(this).data('type'), $(this).data('id'));
              $(this).parent().parent().find("dd").removeClass('active');
              $(this).parent().addClass('active');
              if ($(this).data('id') == 0) {
                  $(this).parent().parent().parent().removeClass('active');
              } else {
                  $(this).parent().parent().parent().addClass('active');
              }
      }
      $('.tab-style').data('page', '1');
      reloadMaterial('style');
  });
  $("#colorSelect").change(function(){
      var colorSelectVal = $("#colorSelect").val();
      $("#color-select").val(colorSelectVal);
      form.render('select');
  });
  form.on('select(color-select)', function(data){
      var colorSelectVal = $("#colorSelect");
      for (var i = 0; i < colorSelectVal[0].options.length; i++){
          if (colorSelectVal[0].options[i].value == data.value){
              colorSelectVal[0].options[i].selected = true;
              break;
          }
      }
  });
  //模板操作
  $(".tab-tpl li a,.tab-tpl .layui-nav-px span").click(function() {
      switch ($(this).data('type')) {
          case 'sort':
              if ($('.tab-tpl').data('sort') == $(this).data('sort')) return !1;
              $('.tab-tpl').data('sort', $(this).data('sort'));
              $(this).parent().find("span").removeClass('active');
              $(this).addClass('active');
              break;
          default:
              if (typeof $(this).data('type') == "undefined") return !1;
              if ($('.tab-tpl').data($(this).data('type')) == $(this).data('id')) return !1;
              $('.tab-tpl').data($(this).data('type'), $(this).data('id'));
              $(this).parent().parent().find("dd").removeClass('active');
              $(this).parent().addClass('active');
              if ($(this).data('id') == 0) {
                  $(this).parent().parent().parent().removeClass('active');
              } else {
                  $(this).parent().parent().parent().addClass('active');
              }
      }
      $('.tab-tpl').data('page', '1');
      reloadMaterial('tpl');
  });
  //设计师操作
  $(".tab-design .layui-nav-px span").click(function () {
      $('.search_span').find('input').val('');
      switch ($(this).data('type')) {
          case 'type':
              if ($('.tab-design').data('type') == $(this).data('value') & $(this).data('value') != '') return !1;
              if ($(this).data('value') != '' && !AlreadyLogin) {
                  layer.msg('必须登录后才能执行该操作', {
                      time: 1000,
                      anim: 6
                  }, function () {
                      floatlogin()
                  });
                  return !1
              }
              $('.tab-design').data('type', $(this).data('value'));
              $(this).parent().find("span").removeClass('active');
              $(this).addClass('active');
              break;
      }
      $('.tab-design').data('page', '1');
      reloadMaterial('design');
  });
  var stop_load = pause_load = false,
      reloadMaterial = function (type, append) {
          append = append || false;
          var param = {},
              masonry = false;
          switch (type) {
              case 'style':
                  param['did'] = $('.tab-style').data('did');
                  param['xid'] = $('.tab-style').data('xid');
                  param['fengge'] = $('.tab-style').data('fengge');
                  param['jieri'] = $('.tab-style').data('jieri');
                  param['hangye'] = $('.tab-style').data('hangye');
                  param['sort'] = $('.tab-style').data('sort');
                  param['p'] = $('.tab-style').data('page');
                  param['q'] = $('.tab-style').find('.search_span').find('input').val();
                  param['fav'] = $(".top_style_fav").data('fav');
                  param['choice'] = $('.top_style_choice').data('choice');
                  param['free'] = $('.top_style_free').data('free');
                  param['mianfei'] = $('.top_style_mianfei').data('mianfei');
                  param['color'] = $('#material_style_color').val();
                  break;
              case 'tpl':
                  //if($('.tab-tpl').data('page') > 5) return !1;
                  param['jieri'] = $('.tab-tpl').data('jieri');
                  param['hangye'] = $('.tab-tpl').data('hangye');
                  param['sort'] = $('.tab-tpl').data('sort');
                  param['p'] = $('.tab-tpl').data('page');
                  param['q'] = $('.tab-tpl').find('.search_span').find('input').val();

                  masonry = true;
                  break;
              case 'design':
                  param['type'] = $('.tab-design').data('type');
                  param['p'] = $('.tab-design').data('page');
                  param['q'] = $('.tab-design').find('.search_span').find('input').val();
                  masonry = true;
                  break;
              case 'format':
                  param['p'] = $('.tab-format').data('page');
                  param['q'] = $('.tab-format').find('.search_div').find('input').val();
                  masonry = true;
                  break;
              case 'styleFestival': // LGD 06-17
                  param['jieri'] = $('.tab-styleFestival').data('jieri');
                  param['p'] = $('.tab-styleFestival').data('page');
                  param['hangye'] = $('.tab-styleFestival').data('hangye');
                  break;
              case 'tplFestival': // LGD 06-17
                  param['jieri'] = $('.tab-tplFestival').data('jieri');
                  param['hangye'] = $('.tab-styleFestival').data('hangye');
                  param['p'] = $('.tab-tplFestival').data('page');

                  break;
          }
          $.ajax({
              url: '/material/' + type + '?t=1',
              data: param,
              type: 'post',
              cache: false,
              dataType: 'html',
              beforeSend: function () {
                  $('.content-' + type + '-more .load').show();
                  $('.content-' + type + '-more .more').hide();
              },
              success: function (html) {
                  var html_new = $('<div>' + html + '</div>').find('li'),
                      $container = $('.content-' + type + '-list');
                  $('.content-' + type + '-more .load').hide();
                  $('.content-' + type + '-more .more').show();
                  if (!append) {
                      $container.html('');
                      $container.scrollTop(0);
                      $container.html(html);
                      /*if(masonry && type!= 'tpl' ){ // LGD 07-27
                       if($container.hasClass("masonry")) $container.masonry('destroy');
                       $container.imagesLoaded(function(){
                       $container.masonry({
                       itemSelector: '.content-' + type + '-list li'
                       });
                       });
                       }*/
                      $('.tab-' + type).data('page', '2');
                      stop_load = (html_new.size() < 20) ? true : false;

                  } else {
                      if (html_new.size() > 0) {
                          $container.append(html);
                          /*列表深色模式处理*/
                          if(type=="style"){
                              dark_state=$('body').data('dark')
                              if(dark_state){
                                  dark('content-style',1)
                              }
                              else{
                                  dark_clear('content-style')
                              }
                          }

                          if (masonry) {
                              $container.imagesLoaded(function () {
                                  $container.masonry('reload');
                              });
                          }
                          $('.tab-' + type).data('page', parseInt($('.tab-' + type).data('page')) + 1);
                          stop_load = (html_new.size() < 20) ? true : false;
                      } else {
                          stop_load = true;
                      }
                  }

                  _hmt.push(['_trackEvent', type, JSON.stringify(param), '']);
              }
          });
          setTimeout(function () {
              pause_load = false;
          }, 500);
          return !1;
      }
  $(document).ready(function () {
      reloadMaterial('style');
      $('.content-l').find('.tab-style,.content-style').show();
      $('.content-style').on('scroll', function () {
          if (!stop_load && !pause_load && $('.content-style-more').position().top < $('.content-style').height() + 300 + $('.tab-style').height()) {
              pause_load = true;
              reloadMaterial('style', true);
          }
      });
      $('.content-tpl').on('scroll', function () {
          if (!stop_load && !pause_load && $('.content-tpl-more').position().top < $('.content-tpl').height() + 80) {
              pause_load = true;
              reloadMaterial('tpl', true);
          }
      });
      // LGD 2019-06-17
      $('.content-styleFestival').on('scroll', function () {
          if (!stop_load && !pause_load && $('.content-styleFestival-more').position().top < $('.content-styleFestival').height() + 300 + $('.tab-styleFestival').height()) {
              pause_load = true;
              reloadMaterial('styleFestival', true);
          }
      });

      $('.content-design').on('scroll', function () {
          if (!stop_load && !pause_load && $('.content-design-more').position().top < $('.content-design').height() + 80) {
              pause_load = true;
              reloadMaterial('design', true);
          }
      });
      $('.content-format').on('scroll', function () {
          if ($('.content-format-list').css('display') != 'none') {
              if (!stop_load && !pause_load && $('.content-format-more').position().top < $('.content-format').height() + 80) {
                  pause_load = true;
                  reloadMaterial('format', true);
              }
          }
      });
  });
  // LGD 12-18
  $(document).on('mousewheel', '.inc_number', function (event, data) {
      var _obj = $(this);
      var num = $.trim(_obj.text());
      var zero = num.match(/^[0]*/) + '';
      num = parseInt(num);
      if (event.deltaY > 0) {
          if (num > 8)
              _obj.text(String(num + 1));
          else
              _obj.text(zero + String(num + 1));
      } else {
          if (num > 1) {
              _obj.text(zero + String(num - 1));
          }
      }
      event.preventDefault();
  }).on('mouseenter', '.inc_number', function () {
      layer.tips('上下滚动鼠标，可调整数字大小', this, {
          tips: [2],
          skin: 'inc-number-tip'
      });
  }).on('mouseleave', '.inc_number', function () {
      layer.closeAll('tips');
  });
  //样式监听操作
  $(document).on('mouseenter', "li.rich_media_content", function () {
      var tips = $(this).data('title');
      tips += '<br>素材编号：' + $(this).data('id');
      tips += '<br>已被使用：' + $(this).data('click') + ' 次';
      tips += '<br>已被收藏：' + $(this).data('fav') + ' 次';
      tips += '<br>是否原创：' + $(this).data('original');
      //tips+= '<br>添加时间：'+timetrans($(this).data('time'));
      if (typeof $(this).data('free') != "undefined" && $(this).data('free') * 1000 > $.now()) tips += '<br>限免至：' + timetrans($(this).data('free'));
      layer.tips(tips, this, {
          tips: [2, '#999']
      });
  }).on('mouseleave', "li.rich_media_content", function () {
      layer.closeAll('tips');
  }).on('click'," li.rich_media_content", function () {
      if (!AlreadyLogin) {
          if ( !click_free_material($(this).data('vip')) ) {
              layer.msg('必须登录后才能执行该操作', {time: 1000,anim: 6}, function () {floatlogin()});return !1
          }
      }
      if ($(this).data('vip') > 1) {
          if ($('#user_vip').data('vip') < $(this).data('vip') && $(this).data('free') * 1000 < $.now()) {
              layer.open({
                  type: 1,
                  shade: 0.4,
                  title: false,
                  content: '<p style="padding:20px 20px 0">你的VIP等级无法使用此样式</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
              });
              return !1;
          }
      }
      //noticeToLogin();
      $(this).contents().filter(function () {return this.nodeType === 3 && $.trim($(this).text()) == "";}).remove();
      $(this).find('p').each(function () {if ($.trim($(this).html()) == "&nbsp;") {$(this).html('<br/>');}});
      $(this).find('*').each(function () {
          if ($(this).attr('data-width')) {return;}
          if (this.style.width && this.style.width != "" && this.style.width.search('%') > 0) {$(this).attr('data-width', this.style.width);}
      });
      var num_1 = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];
      var num_2 = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹', '拾贰', '拾叁', '拾肆', '拾伍', '拾陆', '拾柒', '拾捌', '拾玖', '贰拾'];
      $(this).find('._num').each(function () {
          if (typeof $(this).attr('data-num') == "undefined") $(this).attr('data-num', 1);
          if (typeof $(this).attr('data-form') == "undefined") $(this).attr('data-form', 0);
      });
      var htmlObj = $('<div>' + $(this).html() + '</div>'),
          ret = false;
      $(this).find('._num').each(function () {
          if ($(this).attr('data-form') == 0 && typeof $(this).attr('data-digit') == "undefined" && $.trim($(this).text()).length == 1) $(this).attr('data-digit', 1);
          if ($(this).attr('data-num') == 99 && $(this).attr('data-form') == 0) $(this).attr('data-num', 1);
          else if ($(this).attr('data-num') == 20 && $(this).attr('data-form') > 0) $(this).attr('data-num', 1);
          else $(this).attr('data-num', parseInt($(this).attr('data-num')) + 1);
          if ($(this).attr('data-form') == 1) {
              var num_0 = parseInt($(this).attr('data-num')) - 1;
              $(this).text(num_1[num_0]);
          } else if ($(this).attr('data-form') == 2) {
              var num_0 = parseInt($(this).attr('data-num')) - 1;
              $(this).text(num_2[num_0]);
          } else {
              if ($.trim($(this).text()).substr(0, 1) == 0) {
                  if ($.trim($(this).text()).substr(1, 1) == 9) $(this).text('10');
                  else $(this).text('0' + parseInt($(this).attr('data-num')));
              } else $(this).text(parseInt($(this).attr('data-num')));
          }
      });
      htmlObj.find("i.cursor-fav").remove();
      htmlObj.find("i.cursor-vip").remove();
      var style_item = htmlObj.find('> ._editor:first'),html = style_item.size() ? $.trim(htmlObj.html()) : "<section class=\"_editor\">" + $.trim(htmlObj.html()) + "</section>";
      // LGD 2019-07-06 样式添加 data-tools data-id
      var _style_id = $(this).data('id');
      var _regx = /class="[\s]*?_editor[\s]*?"/;
      var _result = _regx.exec(html);
      if (_result.length > 0) {
          html = html.replace(_result[0], _result[0] + ' data-support="96编辑器" data-style-id="' + _style_id + '"');
      }
      ret = insertHtml($.trim(html));
      if (ret) {
          $.post("/indexajax/styleclick", {
              id: $(this).data('id')
          });
          var stylerecent = (localStorage.getItem('stylerecent') != null ? localStorage.getItem('stylerecent').split(",") : []),
              newstylerecent = ',' + $(this).data('id');
          for (var t = i = 0; i < stylerecent.length; i++) {
              if (i > 49 && !t) break;
              if (i > 49) break;
              if (stylerecent[i] == $(this).data('id')) {
                  t++;
                  continue;
              }
              newstylerecent += ',' + stylerecent[i];
          }
          localStorage.setItem('stylerecent', newstylerecent.substr(1));
      }
  });
  //模板监听操作
  $(document).on('mouseenter', ".content-tpl-list li", function () {
      $(this).find(".tpl-mask").show();
      var tips = $(this).data('title');
      tips += '<br>模板编号：' + $(this).data('id');
      tips += '<br>已被使用：' + $(this).data('click') + ' 次';
      tips += '<br>已被收藏：' + $(this).data('fav') + ' 次';
      tips += '<br>是否原创：' + ( $(this).data('original') == 1 ? '是':'否' );
      //tips+= '<br>添加时间：'+timetrans($(this).data('time'));
      if (typeof $(this).data('free') != "undefined" && $(this).data('free') * 1000 > $.now()) tips += '<br>限免至：' + timetrans($(this).data('free'));
      layer.tips(tips, this, {
          tips: [2, '#999']
      });
  }).on('mouseleave', ".content-tpl-list li", function () {
      $(this).find(".tpl-mask").hide();
      layer.closeAll('tips');
  }).on('click', ".content-tpl-list li i.insert-tpl-content", function () {
      if ($(this).data('vip') > 1) {
          if (!AlreadyLogin) {
              layer.msg('必须登录后才能执行该操作', {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin()
              });
              return !1
          }
          if ($('#user_vip').data('vip') < $(this).data('vip') && $(this).data('free') * 1000 < $.now()) {
              // buy_vip_tips();
              // return false;
              layer.open({
                  type: 1,
                  shade: 0.4,
                  title: false,
                  content: '<p style="padding:20px 20px 0">你的VIP等级无法使用此模板</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
              });
              return !1;
          }
      }
      var _this = $(this).data('id');
      $.post('/indexajax/tplinfo', {
          id: $(this).data('id')
      }, function (json) {
          json = json || {};
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == 1) {
              var htmlObj = $('<div>' + json.info + '</div>'),
                  ret = false;
              htmlObj.contents().filter(function () {
                  return this.nodeType === 3 && $.trim($(this).text()) == "";
              }).remove();
              htmlObj.find('p').each(function () {
                  if ($.trim($(this).html()) == "&nbsp;") {
                      $(this).html('<br/>');
                  }
              });
              var style_item = htmlObj.find('> ._editor:first'),
                  html = style_item.size() ? $.trim(htmlObj.html()) : "<section class=\"_editor\">" + $.trim(htmlObj.html()) + "</section>";
              ret = insertHtml(html);
              if (ret) $.post("/indexajax/tplclick", {
                  id: _this
              });
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
  }).on('click', ".content-tpl-list li i.open-tpl-brush", function () {
      if (!AlreadyLogin) {
          if ( !click_free_material($(this).data('vip')) ) {
              layer.msg('必须登录后才能执行该操作', {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin()
              });
              return !1
          }
      }
      if ($('#user_vip').data('vip') < $(this).data('vip') && $(this).data('free') * 1000 < $.now()) {
          //  buy_vip_tips();
          // return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">你的VIP等级无法使用此模板</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      var _this = $(this).data('id');
      $.post('/indexajax/tplinfo', {
          id: $(this).data('id')
      }, function (json) {
          json = json || {};
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == 1) {
              var htmlObj = $('<div>' + json.info + '</div>'),
                  ret = false;
              htmlObj.contents().filter(function () {
                  return this.nodeType === 3 && $.trim($(this).text()) == "";
              }).remove();
              htmlObj.find('p').each(function () {
                  if ($.trim($(this).html()) == "&nbsp;") {
                      $(this).html('<br/>');
                  }
              });
              var scrollWidth = document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth,
                  scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                  height = $(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - 81,
                  left = scrollWidth / 2 - 472,
                  top = (scrollTop) ? 50 - scrollTop + $('.topa-ds').height() : 50 + $('.topa-ds').height();
              if (height < 600) height = 600;
              layer.open({
                  type: 1,
                  area: ['461px', height + 'px'],
                  offset: [top + 'px', left + 'px'],
                  shade: 0,
                  zIndex: 998,
                  skin: 'float-brush',
                  title: '模板秒刷',
                  fixed: false,
                  resize: false,
                  move: false,
                  content: '<div class="rich_media_content">' + $.trim(htmlObj.html()) + '</div>',
                  success: function (layero, index) {
                      $('.float-brush').find('._editor').hover(function () {
                          $(this).prepend('<section class="tool-border"><section></section><section></section><section></section><section></section></section>');
                          layer.tips('点击单独使用此样式', this, {
                              tips: [3, '#999']
                          });
                      }, function () {
                          $(this).find('.tool-border').remove();
                      });
                      $('.float-brush').find('._editor').click(function () {
                          $(this).find('.tool-border').remove();
                          insertHtml($(this).prop('outerHTML'));
                          return !1;
                      });

                  }
              });
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
  });
  $(document).on('mouseenter', ".content-tplFestival-list li", function () {
      $(this).find(".tpl-mask").show();
      var tips = $(this).data('title');
      tips += '<br>模板编号：' + $(this).data('id');
      tips += '<br>已被使用：' + $(this).data('click') + ' 次';
      tips += '<br>已被收藏：' + $(this).data('fav') + ' 次';
      //tips+= '<br>添加时间：'+timetrans($(this).data('time'));
      if (typeof $(this).data('free') != "undefined" && $(this).data('free') * 1000 > $.now()) tips += '<br>限免至：' + timetrans($(this).data('free'));
      layer.tips(tips, this, {
          tips: [2, '#999']
      });
  }).on('mouseleave', ".content-tplFestival-list li", function () {
      $(this).find(".tpl-mask").hide();
      layer.closeAll('tips');
  }).on('click', ".content-tplFestival-list li i.insert-tpl-content", function () {
      if ($(this).data('vip') > 1) {
          if (!AlreadyLogin) {
              layer.msg('必须登录后才能执行该操作', {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin()
              });
              return !1
          }
          if ($('#user_vip').data('vip') < $(this).data('vip') && $(this).data('free') * 1000 < $.now()) {
              //   buy_vip_tips();
              //  return false;
              layer.open({
                  type: 1,
                  shade: 0.4,
                  title: false,
                  content: '<p style="padding:20px 20px 0">你的VIP等级无法使用此模板</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
              });
              return !1;
          }
      }
      var _this = $(this).data('id');
      $.post('/indexajax/tplinfo', {
          id: $(this).data('id')
      }, function (json) {
          json = json || {};
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == 1) {
              var htmlObj = $('<div>' + json.info + '</div>'),
                  ret = false;
              htmlObj.contents().filter(function () {
                  return this.nodeType === 3 && $.trim($(this).text()) == "";
              }).remove();
              htmlObj.find('p').each(function () {
                  if ($.trim($(this).html()) == "&nbsp;") {
                      $(this).html('<br/>');
                  }
              });
              var style_item = htmlObj.find('> ._editor:first'),
                  html = style_item.size() ? $.trim(htmlObj.html()) : "<section class=\"_editor\">" + $.trim(htmlObj.html()) + "</section>";
              ret = insertHtml(html);
              if (ret) $.post("/indexajax/tplclick", {
                  id: _this
              });
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
  }).on('click', ".content-tplFestival-list li i.open-tpl-brush", function () {
      if (!AlreadyLogin) {
          if ( !click_free_material($(this).data('vip')) ) {
              layer.msg('必须登录后才能执行该操作', {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin()
              });
              return !1
          }
      }
      if ($('#user_vip').data('vip') < $(this).data('vip') && $(this).data('free') * 1000 < $.now()) {
          //   buy_vip_tips();
          //   return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">你的VIP等级无法使用此模板</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      var _this = $(this).data('id');
      $.post('/indexajax/tplinfo', {
          id: $(this).data('id')
      }, function (json) {
          json = json || {};
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == 1) {
              var htmlObj = $('<div>' + json.info + '</div>'),
                  ret = false;
              htmlObj.contents().filter(function () {
                  return this.nodeType === 3 && $.trim($(this).text()) == "";
              }).remove();
              htmlObj.find('p').each(function () {
                  if ($.trim($(this).html()) == "&nbsp;") {
                      $(this).html('<br/>');
                  }
              });
              var scrollWidth = document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth,
                  scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                  height = $(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - 81,
                  left = scrollWidth / 2 - 472,
                  top = (scrollTop) ? 50 - scrollTop + $('.topa-ds').height() : 50 + $('.topa-ds').height();
              if (height < 600) height = 600;
              layer.open({
                  type: 1,
                  area: ['461px', height + 'px'],
                  offset: [top + 'px', left + 'px'],
                  shade: 0,
                  zIndex: 998,
                  skin: 'float-brush',
                  title: '模板秒刷',
                  fixed: false,
                  resize: false,
                  move: false,
                  content: '<div class="rich_media_content">' + $.trim(htmlObj.html()) + '</div>',
                  success: function (layero, index) {
                      $('.float-brush').find('._editor').hover(function () {
                          $(this).prepend('<section class="tool-border"><section></section><section></section><section></section><section></section></section>');
                          layer.tips('点击单独使用此样式', this, {
                              tips: [3, '#999']
                          });
                      }, function () {
                          $(this).find('.tool-border').remove();
                      });
                      $('.float-brush').find('._editor').click(function () {
                          $(this).find('.tool-border').remove();
                          insertHtml($(this).prop('outerHTML'));
                          return !1;
                      });
                  }
              });
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
  });
  //设计师模板
  $(document).on('mouseenter', ".content-design-list li", function () {
      $(this).find(".design-mask").show();
      var tips = $(this).data('title');
      tips += '<br>模板编号：' + $(this).data('id');
      tips += '<br>已被使用：' + $(this).data('click') + ' 次';
      tips += '<br>已被收藏：' + $(this).data('fav') + ' 次';
      tips += '<br>添加时间：' + timetrans($(this).data('time'));
      tips += '<br>是否原创：' + ( $(this).data('original') == 1 ? '是':'否' );
      layer.tips(tips, this, {
          tips: [2, '#999']
      });
  }).on('mouseleave', ".content-design-list li", function () {
      $(this).find(".design-mask").hide();
      layer.closeAll('tips');
  }).on('click', ".content-design-list li i.insert-design-content", function () {
      var _this = $(this).data('id');
      $.post('/indexajax/designinfo', {
          id: $(this).data('id')
      }, function (json) {
          json = json || {};
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == 1) {
              var htmlObj = $('<div>' + json.info + '</div>'),
                  ret = false;
              htmlObj.contents().filter(function () {
                  return this.nodeType === 3 && $.trim($(this).text()) == "";
              }).remove();
              htmlObj.find('p').each(function () {
                  if ($.trim($(this).html()) == "&nbsp;") {
                      $(this).html('<br/>');
                  }
              });
              var style_item = htmlObj.find('> ._editor:first'),
                  html = style_item.size() ? $.trim(htmlObj.html()) : "<section class=\"_editor\">" + $.trim(htmlObj.html()) + "</section>";
              ret = insertHtml(html);
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
  }).on('click', ".content-design-list li i.design-buy", function () {
      var id = $(this).data('id');
      window.open("/material/design/" + id + ".html");
  }).on('click', ".content-design-list li i.design-look", function () {
      $.post('/indexajax/designinfo', {
          id: $(this).data('id')
      }, function (json) {
          json = json || {};
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == 1) {
              window.preview_html($.trim(json.info));
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
  }).on('click', ".content-design-list li i.open-design-brush", function () {
      if (!AlreadyLogin) {
          if ( !click_free_material($(this).data('vip')) ) {
              layer.msg('必须登录后才能执行该操作', {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin()
              });
              return !1
          }

      }
      if ($('#user_vip').data('vip') < $(this).data('vip') && $(this).data('free') * 1000 < $.now()) {
          //  buy_vip_tips();
          //  return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">你的VIP等级无法使用此模板</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      var _this = $(this).data('id');
      $.post('/indexajax/designinfo', {
          id: $(this).data('id')
      }, function (json) {
          json = json || {};
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == 1) {
              var htmlObj = $('<div>' + json.info + '</div>'),
                  ret = false;
              htmlObj.contents().filter(function () {
                  return this.nodeType === 3 && $.trim($(this).text()) == "";
              }).remove();
              htmlObj.find('p').each(function () {
                  if ($.trim($(this).html()) == "&nbsp;") {
                      $(this).html('<br/>');
                  }
              });
              var scrollWidth = document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth,
                  scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                  height = $(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - 81,
                  left = scrollWidth / 2 - 472,
                  top = (scrollTop) ? 50 - scrollTop + $('.topa-ds').height() : 50 + $('.topa-ds').height();
              if (height < 600) height = 600;
              layer.open({
                  type: 1,
                  area: ['461px', height + 'px'],
                  offset: [top + 'px', left + 'px'],
                  shade: 0,
                  zIndex: 998,
                  skin: 'float-brush',
                  title: '模板秒刷',
                  fixed: false,
                  resize: false,
                  move: false,
                  content: '<div class="rich_media_content">' + $.trim(htmlObj.html()) + '</div>',
                  success: function (layero, index) {
                      $('.float-brush').find('._editor').hover(function () {
                          $(this).prepend('<section class="tool-border"><section></section><section></section><section></section><section></section></section>');
                          layer.tips('点击单独使用此样式', this, {
                              tips: [3, '#999']
                          });
                      }, function () {
                          $(this).find('.tool-border').remove();
                      });
                      $('.float-brush').find('._editor').click(function () {
                          $(this).find('.tool-border').remove();
                          insertHtml($(this).prop('outerHTML'));
                          return !1;
                      });

                  }
              });
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
  });
  //排版监听操作
  $(document).on('mouseenter', ".content-format-list li,.content-format_tpl-list li,.content-format_code-list li", function () {
      var tips = $(this).data('title');
      tips += '<br>排版编号：' + $(this).data('id');
      tips += '<br>已被使用：' + $(this).data('click') + ' 次';
      //tips+= '<br>添加时间：'+timetrans($(this).data('time'));
      if (typeof $(this).data('free') != "undefined" && $(this).data('free') * 1000 > $.now()) tips += '<br>限免至：' + timetrans($(this).data('free'));
      layer.tips(tips, this, {
          tips: [3, '#999']
      });
      $(this).find('.format-mask').show()
  }).on('mouseleave', ".content-format-list li,.content-format_tpl-list li,.content-format_code-list li", function () {
      layer.closeAll('tips');
      $(this).find('.format-mask').hide()
  }).on('click', ".content-format-list li .click_view,.content-format_tpl-list li .click_view,.content-format_code-list li .click_view", function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if ($('#user_vip').data('vip') < $(this).parent().parent().parent().data('vip') && $(this).parent().parent().parent().data('free') * 1000 < $.now()) {
          //buy_vip_tips();
          // return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">你的VIP等级无法使用一键排版</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      $.post("/indexajax/formatclick", {
          id: $(this).parent().parent().parent().data('id')
      });
      formatHtml_switch($(this).parent().parent().parent().find('textarea').val());
      $('#content_view').attr('data-id', $(this).parent().parent().parent().data('id'))
      $('#content_view').attr('data-type', '1')
  }).on('click', ".content-format .layui-tab-content li img", function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if ($('#user_vip').data('vip') < $(this).data('vip') && $(this).data('free') * 1000 < $.now()) {
          //buy_vip_tips();
          // return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">你的VIP等级无法使用一键排版</p><div class="layui-layer-btn"><a class="buy-vip-tips layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      $.post("/indexajax/formatclick", {
          id: $(this).data('id')
      });
      formatHtml_switch($(this).find('textarea').val());
      $('#content_view').attr('data-id', $(this).data('id'))
      $('#content_view').attr('data-type', '1')
  }).on('click', '.content-format-list li .tpl_view,.content-format_tpl-list li .tpl_view,.content-format_code-list li .tpl_view', function () {
      var id = $(this).data('tpl-id')
      $.post('/index/format_detail', {
          id: id
      }, function (result) {
          if (result.status == 1) {
              result = JSON.parse(result.url);
              window.preview_html_view(result.htmlcode);
          }
          else {
              layer.msg('未找到数据', {
                  time: 1000,
                  anim: 6
              });
          }
      })
  }).on('click', '.format-mask .code_list,.format-mask .code_style', function () {
      var id = $(this).parent().parent().parent().data('id');
      $('.content-format-style-list').attr('data-id',id)
      var type = $(this).data('type');
      $('.content-format-style-list').attr('data-type',type)
      var style = $(this).parent().parent().parent().find('textarea').text()
      var data = JSON.parse(style)
      html = '<div class="content-format-style-list-close">X</div><div style="font-size:20px;text-align:center;font-weight:bold;">样式列表</div><div style="color:red;font-size:16px;line-height:25px;margin-top:10px;font-weight:normal;text-align:center;">tips:为保证代码解析准确，所有代码请单独占一行</div>'
      for (var i = 0; i < data.length; i++) {
          if (i == 0) {
              html += '<div class="code_list_title code_list_ele">#标题</div><div class="code_list_title code_list_ele">'
              if (data[i].indexOf('_num') >= 0) {
                  type = data[i].match(/data-form=".*?"/)[0].substring(11, data[i].match(/data-form=".*?"/)[0].length - 1)
                  switch (type) {
                      case '0':
                          html += data[i].replace("FormatReplaceName", '标题').replace("FormatReplaceNumber", '01') + '</div>'
                          break;
                      case '1':
                          html += data[i].replace("FormatReplaceName", '标题').replace("FormatReplaceNumber", '一') + '</div>'
                          break;
                      case '2':
                          html += data[i].replace("FormatReplaceName", '标题').replace("FormatReplaceNumber", '壹') + '</div>'
                          break;
                  }
              }
              else {
                  html += data[i].replace("FormatReplaceName", '标题') + '</div>'
              }
          }
          else if (i == 4 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_title_sec code_list_ele">##副标题</div><div class="code_list_title_sec code_list_ele">'
              if (data[i].indexOf('_num') >= 0) {
                  type = data[i].match(/data-form=".*?"/)[0].substring(11, data[i].match(/data-form=".*?"/)[0].length - 1)
                  switch (type) {
                      case '0':
                          html += data[i].replace("FormatReplaceName", '副标题').replace("FormatReplaceNumber", '01') + '</div>'
                          break;
                      case '1':
                          html += data[i].replace("FormatReplaceName", '副标题').replace("FormatReplaceNumber", '一') + '</div>'
                          break;
                      case '2':
                          html += data[i].replace("FormatReplaceName", '副标题').replace("FormatReplaceNumber", '壹') + '</div>'
                          break;
                  }
              }
              else {
                  html += data[i].replace("FormatReplaceName", '副标题') + '</div>'
              }
          }


          else if (i == 1 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_main code_list_ele">正文</div><div class="code_list_main code_list_ele">'
              html += data[i].replace("FormatReplaceName", '正文') + '</div>'
          }
          else if (i == 2 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_image code_list_ele">图片</div><div class="code_list_image code_list_ele">'
              html += data[i].replace("FormatReplaceName", 'http://newcdn.96weixin.com/mmbiz.qlogo.cn/mmbiz_png/Ljib4So7yuWjfl5d0J5NiaNZMO5oYkQnMqlwBR4X0uibiaibf3C27tgflyeB17u2EXBBQiclnUiacM2nwfibhEz5lOPqwg/0?wx_fmt=png') + '</div>'
          }



          else if (i == 5 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_quote code_list_ele">&gt;引用</div><div class="code_list_quote code_list_ele">'
              html += data[i].replace("FormatReplaceName", '引用') + '</div>'
          }
          else if (i == 6 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_divide code_list_ele">---</div><div class="code_list_divide code_list_ele">'
              html += data[i] + '</div>'
          }
          else if (i == 7 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_follow code_list_ele">%图片%</div><div class="code_list_follow code_list_ele">'
              html += data[i].replace("FormatReplaceName", 'http://img.96weixin.com/ueditor/20200108/1578448292894777.png') + '</div>'
          }
          else if (i == 8 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_head code_list_ele">#head</div><div class="code_list_head code_list_ele">'
              html += data[i] + '</div>'
          }
          else if (i == 9 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_end code_list_ele">#end</div><div class="code_list_end code_list_ele">'
              html += data[i] + '</div>'
          }
          else if (i == 10 && data[i] != null && data[i] != '') {
              html += '<div class="code_list_border code_list_ele">&lt;&lt;<br />边框样式,内部支持写入文本、图片或上方所有样式代码<br />&gt;&gt;</div><div class="code_list_border code_list_ele">'
              if (data[i].indexOf('_num') >= 0) {
                  type = data[i].match(/data-form=".*?"/)[0].substring(11, data[i].match(/data-form=".*?"/)[0].length - 1)
                  switch (type) {
                      case '0':
                          html += data[i].replace("FormatReplaceName", '边框样式,内部支持写入文本、图片或上方所有样式代码').replace("FormatReplaceNumber", '01') + '</div>'
                          break;
                      case '1':
                          html += data[i].replace("FormatReplaceName", '边框样式,内部支持写入文本、图片或上方所有样式代码').replace("FormatReplaceNumber", '一') + '</div>'
                          break;
                      case '2':
                          html += data[i].replace("FormatReplaceName", '边框样式,内部支持写入文本、图片或上方所有样式代码').replace("FormatReplaceNumber", '壹') + '</div>'
                          break;
                  }
              }
              else {
                  html += data[i].replace("FormatReplaceName", '边框样式,内部支持写入文本、图片或上方所有样式代码') + '</div>'
              }
          }
      }
      window.content_format_top = $('.content-format').scrollTop()
      $('.content-format .layui-tab-content').hide()
      $('.content-format-style-list').html(html).show()
  }).on('click', '.content-format .code_list_title', function () {
      format_style_list_insert(0,'标题',$(this))
  }).on('click', '.content-format .code_list_title_sec', function () {
      format_style_list_insert(4,'副标题',$(this))
  }).on('click', '.content-format .code_list_main', function () {
      format_style_list_insert(1,'正文')
  }).on('click', '.content-format .code_list_image', function () {
      format_style_list_insert(2,'http://newcdn.96weixin.com/mmbiz.qlogo.cn/mmbiz_png/Ljib4So7yuWjfl5d0J5NiaNZMO5oYkQnMqlwBR4X0uibiaibf3C27tgflyeB17u2EXBBQiclnUiacM2nwfibhEz5lOPqwg/0?wx_fmt=png')
  }).on('click', '.content-format .code_list_quote', function () {
      format_style_list_insert(5,'引用')
  }).on('click', '.content-format .code_list_divide', function () {
      format_style_list_insert(6)
  }).on('click', '.content-format .code_list_follow', function () {
      format_style_list_insert(7,'http://img.96weixin.com/ueditor/20200108/1578448292894777.png')
  }).on('click', '.content-format .code_list_head', function () {
      format_style_list_insert(8)
  }).on('click', '.content-format .code_list_end', function () {
      format_style_list_insert(9)
  }).on('click', '.content-format .code_list_border', function () {
      format_style_list_insert(10,'边框样式,内部支持写入文本、图片或上方所有样式代码',$(this))
  }).on('click', '.content-format-style-list-close', function () {
      $('.content-format-style-list').hide()
      $('.content-format .layui-tab-content').show()
      $('.content-format').scrollTop(window.content_format_top)
  });
  function format_style_list_insert(index,text,ele){
      var id = $('.content-format-style-list').attr('data-id')
      var type = $('.content-format-style-list').data('type');
      if(type==1){
          switch (index) {
              case '0':
                  insertHtml('<p>#标题</p>')
                  break;
              case '4':
                  insertHtml('<p>##副标题</p>')
                  break;
              case '1':
                  insertHtml('<p>正文</p>')
                  break;
              case '2':
                  insertHtml('<p><img src="http://newcdn.96weixin.com/mmbiz.qlogo.cn/mmbiz_png/Ljib4So7yuWjfl5d0J5NiaNZMO5oYkQnMqlwBR4X0uibiaibf3C27tgflyeB17u2EXBBQiclnUiacM2nwfibhEz5lOPqwg/0?wx_fmt=png"></p>')
                  break;
              case '5':
                  insertHtml('<p>>引用</p>')
                  break;
              case '6':
                  insertHtml('<p>---</p>')
                  break;
              case '7':
                  insertHtml('<p>%<img src="http://img.96weixin.com/ueditor/20200108/1578448292894777.png" _src="http://img.96weixin.com/ueditor/20200108/1578448292894777.png" style="width:30%;">%</p>')
                  break;
              case '8':
                  insertHtml('<p>#head</p>')
                  break;
              case '9':
                  insertHtml('<p>#end</p>')
                  break;
              case '10':
                  insertHtml('<p>&lt;&lt;<br />边框样式,内部支持写入文本、图片或上方所有样式代码<br />&gt;&gt;</p>')
                  break;
          }
      }
      else{
          var style = $(".content-format-list [data-id="+id+"]").eq(0).find('textarea').text()
          var data = JSON.parse(style)
          if(index==0||index==4||index==10){
              if (data[index].indexOf('_num') >= 0) {
                  var num_0 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
                      num_1 = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'],
                      num_2 = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹', '拾贰', '拾叁', '拾肆', '拾伍', '拾陆', '拾柒', '拾捌', '拾玖', '贰拾'],
                      num_now=ele.attr('data-index')?ele.attr('data-index'):0
                  ele.attr('data-index',parseInt(num_now)+1)
                  type = data[index].match(/data-form=".*?"/)[0].substring(11, data[index].match(/data-form=".*?"/)[0].length - 1)
                  switch (type) {
                      case '0':
                          html = data[index].replace("FormatReplaceName", text).replace("FormatReplaceNumber", num_0[num_now % 20])
                          break;
                      case '1':
                          html = data[index].replace("FormatReplaceName", text).replace("FormatReplaceNumber", num_1[num_now % 20])
                          break;
                      case '2':
                          html = data[index].replace("FormatReplaceName", text).replace("FormatReplaceNumber", num_2[num_now % 20])
                          break;
                  }
              }
              else {
                  html = data[index].replace("FormatReplaceName", text)
              }
          }
          else if(index==6||index==8||index==9){
              html = data[index]
          }
          else if(index==1||index==2||index==5||index==7){
              html = data[index].replace("FormatReplaceName", text)
          }
          insertHtml(html)
      }
  }
  window.preview_html_view = function (body, title) {
      title = title || '';
      var htmlObj = $('<div>' + body + '</div>');
      htmlObj.find('.tool-border').remove();
      layer.open({
          type: 1,
          area: ['360px', '660px'],
          shade: 0.4,
          skin: 'float-preview',
          title: false,
          shadeClose: true,
          content: '<div class="rich_media_inner"><div class="rich_media_area_primary"><div class="rich_media_title">' + (title ? title : '文章的标题文字') + '</div><div class="rich_media_meta_list"><em class="rich_media_meta rich_media_meta_text">2018-12-12</em><span class="rich_media_meta rich_media_meta_nickname">公众号名称</span></div><div class="rich_media_content">' + htmlObj.html() + '</div><div class="rich_media_tool"><div class="meta_primary"><a href="javascript:;">阅读原文</a></div><div class="meta_primary">阅读 <span>100000+</span></div><div class="meta_primary"><i class="fa fa-thumbs-o-up"></i><span>999</span></div><div class="meta_extra">投诉</div></div></div></div>',
          success: function (layero, index) {
          }
      });
  }
  //收藏取消收藏
  $(document).on('click', ".cursor-fav", function () {
      if (typeof $(this).parent().data('id') == "undefined") return !1;
      if (typeof $(this).parent().parent().data('type') == "undefined") return !1;
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if ($('#user_vip').data('vip') < $(this).parent().data('vip') && $(this).parent().data('free') * 1000 < $.now() && $(this).hasClass('fa-heart-o')) {
          //  buy_vip_tips();
          //  return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">你的VIP等级无法收藏此' + ($(this).parent().parent().data('type') == 'style' ? '样式' : '模板') + '</p><div class="layui-layer-btn"><a class="layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      var loading = layer.load(2, {
              shade: [.2, '#000']
          }),
          _this = $(this),
          Ajaxurl = $(this).hasClass('fa-heart') ? 'favdel' : 'favadd';
      $.post('/indexajax/' + $(this).parent().parent().data('type') + Ajaxurl, {
          id: $(this).parent().data('id')
      }, function (json) {
          json = json || {};
          layer.close(loading);
          if (json.status == -1) {
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == -2) {
              //  buy_vip_tips();
              //  return false;
              layer.open({
                  type: 1,
                  shade: 0.4,
                  title: false,
                  content: '<p style="padding:20px 20px 0">收藏数已经超过VIP授权</p><div class="layui-layer-btn"><a class="layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
              });
          } else if (json.status == 1) {
              if (_this.hasClass('fa-heart')) {
                  _this.removeClass("fa-heart").addClass("fa-heart-o");
              } else {
                  _this.removeClass("fa-heart-o").addClass("fa-heart");
              }
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              })
          }
      }).fail(function () {
          layer.close(loading);
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      });
      return !1;
  });
  //插入签名
  $(".signature").click(function () {
      $(document.getElementById('ueditor_0').contentWindow.document.body).find('.editor_sign').remove();
      var prefix = $(this).parent().find('.prefix').html(),
          suffix = $(this).parent().find('.suffix').html(),
          content = editor.getContent();
      editor.setContent('<section class="_editor editor_sign">' + prefix + '</section>' + content + '<section class="_editor editor_sign">' + suffix + '</section>');
  });
  $(".notsignature").click(function () {
      $(document.getElementById('ueditor_0').contentWindow.document.body).find('.editor_sign').remove();
  });
  //二维码设计
  $("#float-qrcode").click(function () {
      layer.open({
          type: 2,
          area: ['960px', '541px'],
          shade: 0.4,
          skin: 'float-qrcode',
          title: false,
          shadeClose: true,
          content: 'https://mh.cli.im/?isdialog=1&datanow=20141111&isapi=1',
          success: function (layero, index) {
              $(layero).find(".layui-layer-setwin").before('<div style="width:250px;height:40px;position:absolute;left:20px;top:0px;background:-webkit-gradient(linear,0 0, 0 100%,from(#f4f4f4),to(#e1e1e1));font-size:16px;line-height:40px">草料二维码美化器</div><div style="width:75px;height:40px;position:absolute;right:0px;top:0px;background:-webkit-gradient(linear,0 0, 0 100%,from(#f4f4f4),to(#e1e1e1))"></div>');
          }
      });
  });
  //调色盘
  var setBackgroundColor = window.setBackgroundColor = function(bgcolor, color, newColor) {
      if (isGreyColor(bgcolor)) return false;
      switch($("#color-select").val()){
          case "1":
              var active_item = editor.currentActiveItem();
              if(active_item){
                  editor.undoManger.save();
                  parseObject(active_item, bgcolor, color, newColor);
                  active_item.attr('data-color', bgcolor);
                  editor.undoManger.save();
              }
              break;
          case "2":
              editor.undoManger.save();
              parseObject($(editor.selection.document), bgcolor, color, newColor);
              $(editor.selection.document).find('._editor').each(function(){
                  $(this).attr('data-color',bgcolor);
              });
              editor.undoManger.save();
              break;
          case "3":
              parseObject($('.content-style-list'), bgcolor, color, newColor);
              $('.content-style-list').find('._editor').each(function(){
                  $(this).attr('data-color',bgcolor);
              });
              break;
      }
      return false;
  }
  var spectrum_interval = null;
  $("#color-input").spectrum({
      showInput: true,
      allowEmpty: true,
      showPalette: true,
      showInitial: true,
      showSelectionPalette: true,
      localStorageKey: true,
      showAlpha: true,
      maxSelectionSize: 10,
      palette: [],
      preferredFormat: "hex3",
      cancelText: "取消",
      chooseText: "选择",
      togglePaletteMoreText: "更多选项",
      togglePaletteLessText: "隐藏",
      clearText: "清除",
      noColorSelectedText: "尚未选择任何颜色",
      show: function () {
          spectrum_interval = setInterval(function () {
              if ($('.sp-preview-inner:first').css('background-color') != 'rgba(0, 0, 0, 0)') {
                  setBackgroundColor($('.sp-preview-inner:first').css('background-color'), '#fff');
              }
          }, 500);
      },
      hide: function () {
          setTimeout(function () {
              clearInterval(spectrum_interval);
          }, 600);
      },
      change: function () {
          setBackgroundColor($("#color-input").val(), '#fff');
      }
  });
  $(".color-list li").click(function () {
      var bgcolor = $(this).css('backgroundColor');
      var color = $(this).data('color') ? $(this).data('color') :  $(this).css('backgroundImage');
      if(bgcolor == 'rgba(0, 0, 0, 0)'){
          var newColor = color;
          var color = color.substring(color.lastIndexOf('#'));
          var bgcolor = hex2rgb(color);
      }
      $("#color-input").spectrum("set", bgcolor);
      setBackgroundColor(bgcolor, color, newColor);
  });

  $(".layui-tab-item td").click(function() {
      var color = $(this)[0].firstChild.title;                //背景颜色
      var newColor = "";
      if(color.indexOf('linear-gradient')==0){            //混色
          $("#changeColor").css('background-image',color);
          var newColor = color.substr(color.indexOf('(')+1,color.lastIndexOf(')')-color.indexOf('(')-1);
          var color = $.trim(color.substr(color.lastIndexOf(',')+1,8));
      }else{
          if(color.indexOf("#")==-1)
              var color = "#"+color;
          $("#changeColor").css('background-image','');
          //$("#changeColor").css('background-color',color);
          $("#colorInput").spectrum("set",color);
      }
      var bgcolor = hex2rgb(color);
      setBackgroundColor(bgcolor,color,newColor);
  });


  //$(".color-more").click(function() {
  //  if(!AlreadyLogin){layer.msg('必须登录后才能执行该操作',{time:1000,anim:6}, function(){floatlogin()});return !1}
  //  if($(".float-color").length > 0) return false;
  //  var scrollWidth = document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth,scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,height = $(window).height()-$('.topa-ds').height()-$('.bottoma-ds').height()-82,left = scrollWidth/2-472,top = (scrollTop) ? 50-scrollTop+$('.topa-ds').height() : 50+$('.topa-ds').height();
  //  if(height < 600) height = 600;
  //  layer.open({
  //      type: 2,
  //      area: ['461px',height + 'px'],
  //      offset: [top + 'px', left + 'px'],
  //      shade: 0,
  //      zIndex: 998,
  //      skin: 'float-color',
  //      title: '配色方案',
  //      fixed: false,
  //      resize: false,
  //      move: false,
  //      content: '/material/color?t=1',
  //      success: function(layero, index){}
  //  });
  //});
  //右侧操作
  //预览
  $("#btn_preview").click(function () {
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('没有可预览的内容', {
              icon: 0
          });
          return !1;
      }
      window.preview_html(editor.getContent());
  });
  // $("#btn_preview").click(function() {
  //  if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
  //      layer.msg('没有可预览的内容', {icon: 0});
  //      return !1;
  //  }
  //  var index = layer.load(1, {shade: [0.1,'#fff']});
  //  var content = editor.getContent();
  //  $.ajax({
  //      url: '/preview/phonepreview',
  //      type: 'post',
  //      data: {content: content},
  //      dataType: 'json',
  //      beforeSend: function(){},
  //      success: function(res){
  //          if(res.status == 1){
  //              window.preview_html( editor.getContent() );
  //              jQuery('#preview-img').qrcode({text: res.url, width: 100,height: 100});
  //          }else if(res.status == 0 ){
  //              window.preview_html( editor.getContent() );
  //              $('#qrcode').remove();
  //          }
  //      },
  //      fail: function(){
  //          window.preview_html( editor.getContent() );
  //          $('#qrcode').remove();
  //      },
  //      complete: function(){
  //          layer.close(index);
  //      }
  //  });
  // });
  window.preview_html = function (body, title) {
      title = title || '';
      var htmlObj = $('<div>' + body + '</div>');
      htmlObj.find('.tool-border').remove();
      var code = '<div id="qrcode">';
      code += '<img src="" class="wx_preview_img" style="display: none;">';
      code += '<button id="wx_preview_button" class="layui-btn layui-btn-normal layui-btn-sm">手机预览二维码</button>';
      code += '</div>';
      layer.open({
          type: 1,
          area: ['360px', '660px'],
          shade: 0.4,
          skin: 'float-preview',
          title: false,
          shadeClose: true,
          content: '<div class="rich_media_inner">' + code + '<div class="rich_media_area_primary"><div class="rich_media_title">' + (title ? title : '文章的标题文字') + '</div><div class="rich_media_meta_list"><em class="rich_media_meta rich_media_meta_text">2018-12-12</em><span class="rich_media_meta rich_media_meta_nickname">公众号名称</span></div><div class="rich_media_content">' + htmlObj.html() + '</div><div class="rich_media_tool"><div class="meta_primary"><a href="javascript:;">阅读原文</a></div><div class="meta_primary">阅读 <span>100000+</span></div><div class="meta_primary"><i class="fa fa-thumbs-o-up"></i><span>999</span></div><div class="meta_extra">投诉</div></div></div></div>',
          success: function (layero, index) {
          }
      });
  }

  // 清空编辑器
  $("#btn_trash").click(function () {
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('没有需要清空的内容', {
              icon: 0
          });
          return !1;
      }
      layer.confirm('确定要清空编辑器的内容吗？', {
          btn: ['确定', '取消']
      }, function () {
          // LGD 2020-02-20 执行一次快速保存
          // fast_save(function(){});
          $('#btn_fast_save').attr('data-id',0);

          editor.setContent('<section class="_editor"><p><br/></p></section>');
          layer.msg('内容已清空', {
              icon: 1
          });
      });
  });
  //生成图片

  /*window.onload = function () {
      var headHTML = document.getElementsByTagName('head')[0].innerHTML;
      headHTML    += '<link rel="stylesheet" href="https://fonts.loli.net/css?family=Noto+Sans+SC:100,300,400,500,700,900">';
      document.getElementsByTagName('head')[0].innerHTML = headHTML;
  }*/
  var t1 = null;
  $("#btn_art_image").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      var html = editor.getContent();
      if (html.length == 0 && html == '') {
          layer.msg('编辑器内容为空', {
              icon: 0
          });
          return !1;
      }
      var htmlObj = $('<div>' + html + '</div>');

         // 内容
       var _create_content = '<div class="rich_media_inner rich_media_artimage" style="font-family: Noto Sans SC;"><div class="rich_media_content">' + htmlObj.html() +
          '<div class="clearfix rich_media_watermark" style="margin:10px 0 0;padding:0 5px;border-top:1px solid #e3e3e3;">' +
          '<small style="color:#8c8c8c;clear:both;line-height:30px"><span style="float:right;">'
          + SiteName + '提供技术支持</span><span style="float:left;">'+ document.domain +
          '</span></small></div></div></div><form class="layui-form layui-form-pane" id="form_artimage" onkeydown="if(event.keyCode==13){return false;}">' +
          '<div class="layui-form-item" id="create-image-type" style="border:1px solid #e6e6e6"><label class="layui-form-label" >类型</label>' +
          ' <div class="layui-input-block"><input type="radio" name="sex" value="img" title="图片" lay-filter="create-image-type" checked>' +
          '<input type="radio" name="sex" value="pdf" title="pdf"  lay-filter="create-image-type" ></div></div>' +

          '<div class="layui-form-item" id="html-pdf-width"  style="display: none;" ><label class="layui-form-label">图片宽度</label><div class="layui-input-block">' +
          '<select name="mm-width"><option value="120" selected>120mm</option>' +
          '<option value="150">150mm</option><option value="170">170mm</option>' +
          '</select></div></div>' +

          '<div class="layui-form-item" data-type="img"><label class="layui-form-label">图片宽度</label><div class="layui-input-block">' +
          '<select name="width" lay-filter="width"><option value="480" selected>480px</option>' +
          '<option value="640">640px</option><option value="720">720px</option><option value="960">960px</option>' +
          '</select></div></div>' +
          '<div class="layui-form-item" data-type="img"><label class="layui-form-label">左右间距</label>' +
          '<div class="layui-input-block"><select name="pw" lay-filter="pw"><option value="0">0px</option>' +
          '<option value="5" selected>5px</option><option value="10">10px</option>' +
          '<option value="15">15px</option><option value="20">20px</option>' +
          '<option value="25">25px</option><option value="30">30px</option></select>' +
          '</div></div><div class="layui-form-item" data-type="img"><label class="layui-form-label">上下间距</label>' +
          '<div class="layui-input-block">' +
          '<select name="ph" lay-filter="ph"><option value="0">0px</option>' +
          '<option value="5" selected>5px</option><option value="10">10px</option>' +
          '<option value="15">15px</option><option value="20">20px</option><option value="25">25px</option>' +
          '<option value="30">30px</option></select></div></div>' +
          '<div class="layui-form-item" data-type="img"><label class="layui-form-label">字体选择</label>' +
          '<div class="layui-input-block"><select name="font" lay-filter="font">' +
          '<option value="1"  selected >微软雅黑</option>' +
          '<option value="2">宋体</option><option value="3">黑体</option>' +
          '<option value="4">仿宋</option><option value="5">楷体</option></select>' +
          '</div></div><div class="layui-form-item" pane data-type="img">' +
          '<label class="layui-form-label">技术支持</label><div class="layui-input-block"><input type="checkbox" checked="" name="watermark" id="watermark_artimage" lay-skin="switch" lay-filter="watermark" lay-text="显示|隐藏" disabled checked></div></div><div class="layui-form-item"><div class="layui-form-mid layui-word-aux">温馨提示：(虚线内为图片可视区域)<br>1. 暂不支持动态样式、滑动样式；<br>2. 暂不支持视频、GIF图；<br>3. 少量样式渲染支持不是很完美。</div></div><div class="layui-form-item"><button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="artimage">生成</button></div></form>';


      htmlObj.find('.tool-border').remove();
      layer.open({
          type: 1,
          area: ['850px', '580px'],
          move: false,
          shade: 0.4,
          skin: 'float-artimage',
          btn: false,
          title: '生成图片&nbsp;<a href="/help/60.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="art_iamge_help"></i></a>',
          content: _create_content,
          success: function (layero, index) {
              form.render('radio');
              //var headHTML = document.getElementsByTagName('head')[0].innerHTML;
              //headHTML    += '<link rel="stylesheet" href="https://fonts.loli.net/css?family=Noto+Sans+SC:100,300,400,500,700,900">';
              //document.getElementsByTagName('head')[0].innerHTML = headHTML;
              //lca 0507 弹窗加载数据
              $("#list_image").click(function () {
                  if ($('#lmyList').html() == "") {
                      myImglist();
                  } else {
                      $('#limglist').show();
                  }
              });
              //关闭
              $("#limglist .layui-layer-ico").click(function () {
                  $('#limglist').hide();
              });
              form.render('select');
              if ($('#user_vip').data('vip') > 0) $('#watermark_artimage').removeAttr("disabled");
              form.render('checkbox');
              form.on('select(width)', function (data) {
                  $('.float-artimage').css("left", (($(window).width() - parseInt(data.value) - 350) / 2) + "px");
                  $('.float-artimage').width(parseInt(data.value) + 350);
                  $('.float-artimage .rich_media_artimage').width(parseInt(data.value) + 5);
              });
              form.on('select(pw)', function (data) {
                  $('.rich_media_artimage .rich_media_content').css("padding-left", parseInt(data.value));
                  $('.rich_media_artimage .rich_media_content').css("padding-right", parseInt(data.value));
              });
              form.on('select(ph)', function (data) {
                  $('.rich_media_artimage .rich_media_content').css("padding-top", parseInt(data.value));
                  $('.rich_media_artimage .rich_media_content').css("padding-bottom", parseInt(data.value));
                  $('.rich_media_artimage .rich_media_content').css("min-height", 497 - parseInt(data.value) * 2);
              });
              form.on('select(font)', function (data) {
                  switch (parseInt(data.value)) {
                      case 10: // 思源雅黑
                          $('.rich_media_artimage').css("font-family", 'Noto Sans SC');
                          break;
                      case 2:
                          $('.rich_media_artimage').css("font-family", '宋体, SimSun');
                          break;
                      case 3:
                          $('.rich_media_artimage').css("font-family", '黑体, SimHei');
                          break;
                      case 4:
                          $('.rich_media_artimage').css("font-family", '仿宋, 仿宋_GB2312, SimFang');
                          break;
                      case 5:
                          $('.rich_media_artimage').css("font-family", '楷体, 楷体_GB2312, SimKai');
                          break;
                      default:
                          $('.rich_media_artimage').css("font-family", '"Microsoft YaHei"');
                  }
              });
              form.on('switch(watermark)', function (data) {
                  if (data.elem.checked) {
                      $('.rich_media_watermark').show();
                  } else {
                      $('.rich_media_watermark').hide();
                  }
              });
              //ajax 请求生成图片
              form.on('submit(artimage)', function (data, layero) {
                  if (!AlreadyLogin) {
                      layer.msg('必须登录后才能执行该操作', {
                          time: 1000,
                          anim: 6
                      }, function () {
                          floatlogin()
                      });
                      return false
                  }

                  if ($('#create-image-type').find('input:radio:checked').val() == 'pdf') {
                      layer.load(2, {
                          shade: [.2, '#000']
                      });
                      w = $('#form_artimage').find('select[name=mm-width]').val();
                      a = Base64.encode('<div class="rich_media_area_primary"><div class="rich_media_content">' + htmlObj.html() + '</div></div>');

                      $.ajax({
                          type: "POST",
                          url: "/htmltopdf/pdf?x=1",
                          data: {rich_media: a, width: w},
                          success: function(res, status, req) {
                              layer.closeAll();
                              var url = "/htmltopdf/getpdf?url=" + res.fname;
                              window.location.href = url;
                          }
                      });
                      return false;
                  }


                  if (t1 != null) {
                      layer.msg("图片正在生成中，请稍后", {
                          icon: 5
                      });
                      return false
                  }




                  $('#form_artimage').append("<textarea name='content' class='none'>" + htmlObj.html() + "</textarea>");
                  $.ajax({
                      url: "/createimage/makepic" +
                          "",
                      type: 'post',
                      data: {
                          width: $('#form_artimage').find('select[name=width]').val(),
                          pw: $('#form_artimage').find('select[name=pw]').val(),
                          ph: $('#form_artimage').find('select[name=ph]').val(),
                          font: $('#form_artimage').find('select[name=font]').val(),
                          watermark: $('#watermark_artimage').next().hasClass('layui-form-onswitch') == true ? 1 : 0,
                          content: htmlObj.html()
                      },
                      beforeSend: function () {
                          this.layerIndex = layer.load(0, {
                              shade: [0.5, '#393D49']
                          });
                      },
                      success: function (data) {
                          if (data.status == '-1') {
                              layer.msg(data.msg, {
                                  icon: 5
                              });
                              return;
                          } else if (data.status == '1') {
                              layer.msg(data.msg, {
                                  icon: 6,
                                  time: 3000
                              });
                              t1 = window.setInterval('checkFile("' + data.data + '","' + data.time + '")', 2000);
                          }
                      },
                      complete: function () {
                          layer.close(this.layerIndex);
                      },
                  });
                  layer.close(layero);
                  return !1;
              });

              form.on('radio(create-image-type)', function(data){
                  if (data.value == 'img') {
                      $('#html-pdf-width').hide();
                      $('.float-artimage').find('div[data-type=img]').show();
                  } else if (data.value == 'pdf' ) {
                      $('#html-pdf-width').show();
                      $('.float-artimage').find('div[data-type=img]').hide();
                  }
              });

              /*form.on('submit(artimage)', function(data,layero){
               $('#form_artimage').attr('action','/createimage');
               $('#form_artimage').attr('method','post');
               $('#form_artimage').attr('target','_blank');
               $('#form_artimage').append("<textarea name='content' class='none'>"+htmlObj.html()+"</textarea>");
               $('#form_artimage').submit();
               layer.close(layero);
               return !1;
               });*/
          }
      });
  });
  //lca 定时查询文件
  window.checkFile = function (_file, time) {
      $.ajax({
          type: "POST",
          url:  '/Createimaget/checkFile',
          data: {
              'filepath': _file,
              'time': time
          },
          success: function (r) {
              if (r.status == 1) {
                  window.clearInterval(t1);
                  t1 = null; //去掉定时器的方法加标识
                  url = r.data;
                  if ("下载" != $(".myrepeat").text()) { //防止重复弹窗

                      if ($('select[name=font]').find('option:selected').val() == 1) {
                          var downImgTips = '<span style="    color: red;font-size: 14px; margin-left: 6px;">(您使用了微软雅黑字体,图片用于商业活动涉及到版权问题)</span>';
                      }  else {
                          var downImgTips = '';
                      }
                      layer.open({
                          //title: '生成图片下载'
                          title: false,
                          content: "<div >您已生成图片 <a class='myrepeat' href='" + url + "' style='font-size: 18px;color: #4464e2;text-decoration: underline;'>下载"+downImgTips+"</a></div>",
                          btn: ['确定'],
                          btn1: function () {
                              $('.myrepeat')[0].click();
                          }
                      });
                  }
              }
          }
      });
  }
  //lca 保存的图片
  function myImglist() {
      $('#limglist').show();
      function myImgLoad() {
          //分页
          $('#lmyList .page a').click(function () {
              if ($(this).attr('href') == 'javascript:;') return false;
              $('#lmyList').html('');
              $.ajax({
                  url: "/ueditor/listcreimg",
                  type: 'get',
                  cache: false,
                  dataType: 'html',
                  xhrFields: {
                      withCredentials: true
                  },
                  success: function (json) {

                      $('#lmyList').html(json);
                      myImgLoad();
                  }
              });
              return !1;
          });
          //删除
          $('#lmyList .delcreimg').click(function () {
              var creimgid = $(this).attr('data-id');
              if (parseFloat(creimgid).toString() == "NaN") {
                  return false
              }
              $.ajax({
                  url: makePicDomain + "/Createimaget/delcreimg",
                  type: 'post',
                  cache: false,
                  data: {
                      creimgid: creimgid
                  },
                  dataType: 'json',
                  success: function (json) {
                      if (json.status == 1) {
                          layer.msg(json.msg, {
                              icon: 6
                          });
                          myImglist();
                      } else {
                          layer.msg(json.msg, {
                              icon: 5
                          });
                      }
                  }
              });
          });
      }

      //列表
      $.ajax({
          url: "/ueditor/listcreimg",
          type: 'get',
          cache: false,
          dataType: 'html',
          xhrFields: {
              withCredentials: true
          },
          success: function (json) {
              $('#lmyList').html(json);
              myImgLoad();
          }
      });
      return !1;
  }
  //提取封面
  $(".btn_import_cover").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 1,
          area: ['500px','auto'],
          shade: 0.4,
          move: false,
          skin: 'float-cover',
          title: '提取封面&nbsp;',
          content: '<form class="layui-form layui-form-pane" style="padding: 10px 20px 0;" onkeydown="if(event.keyCode==13){return false;}"><div class="layui-form-item"><label class="layui-form-label">文章地址</label><div class="layui-input-inline"  style="width:272px"><input type="text" name="title" id="cover_url" autocomplete="off" placeholder="http(s)://mp.weixin.qq.com" class="layui-input"></div><button type="button" style="height:37px" class="layui-btn layui-btn-sm layui-btn-normal layui-btn-cover">点击提取</button></div><div class="layui-input-return"><div class="layui-form-item"><label class="layui-form-label">封面地址</label><div class="layui-input-inline"  style="width:272px"><input type="text"  autocomplete="off"  class="layui-input layui-cover-input"></div><button type="button" style="height:37px" class="layui-btn layui-btn-sm layui-btn-normal layui-cover-copy"  data-clipboard-text="111-从属性复制">复制使用</button></div></div><div class="layui-form-mid layui-word-aux">1、微信文章必须是以https://mp.weixin.qq.com开头的才可以<br/>2、点击"提取图片"按钮，提取微信图文中的封面图片，首/次图文都可以<br/>3、本提取功能，支持微信已群发文章消息和素材管理里的文章</div></form>',
          success: function (layero, index) {
              $(".layui-btn-cover").click(function () {
                  var cover_url = $('#cover_url').val(),
                      urlregexp = /^((https|http)?:\/\/)mp\.weixin\.qq\.com\/[^\s]+/;
                  if (cover_url == "") {layer.tips('文章地址不能为空', '#cover_url', {tips: [1, '#FF5722']});}
                  if (!urlregexp.test(cover_url)) {layer.tips('文章地址不正确，链接必须以：http(s):// 开头', '#cover_url', {tips: [1, '#FF5722']});}

                  var loading = layer.load(2, {
                      shade: [.2, '#000']
                  });
                  $.post('/indexajax/remoteart', {
                      url: cover_url,type: 1,
                  }, function (json) {
                      json = json || {};
                      layer.close(loading);

                      if (json.status == -1) {
                          layer.msg("登录超时，请重新登录", {time: 1000,anim: 6}, function () { floatlogin();})
                      } else if (json.status == 1) {
                          $('.layui-cover-input').val(json.info);
                          $('.layui-cover-copy').attr("data-clipboard-text",json.info);
                      } else {
                          layer.msg(json.info, { icon: 5,anim: 6})
                      }
                  }).fail(function () {
                      layer.close(loading);
                      layer.msg("服务器连接失败", {
                          icon: 2,
                          anim: 6
                      })
                  })
              });

              var clipboard = new Clipboard('.layui-cover-copy');
              clipboard.on('success', function(e) {layer.msg("复制成功",{"time":1500});});
              clipboard.on('error', function(e) {layer.msg("复制失败",{"time":1500});});
          }
      });
  });
  //提取视频
  $(".btn_import_video").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 1,
          area: ['500px','220px'],
          shade: 0.4,
          move: false,
          skin: 'float-video',
          title: '提取视频&nbsp;',
          content: '<form class="layui-form layui-form-pane" style="padding: 10px 20px 0;" onkeydown="if(event.keyCode==13){return false;}"><div class="layui-form-item"><label class="layui-form-label">文章地址</label><div class="layui-input-inline"  style="width:256px"><input type="text" name="title" id="video_url" autocomplete="off" placeholder="http(s)://mp.weixin.qq.com" class="layui-input"></div><button type="button" style="height:37px" class="layui-btn layui-btn-sm layui-btn-normal layui-btn-video">点击提取</button></div><div class="layui-video-list"></div><div class="layui-form-mid layui-word-aux">微信文章必须是以https://mp.weixin.qq.com开头的才可以<br/>因公众号限制视频在96编辑器暂时无法播放</div></form>',
          success: function (layero, index) {
              $(".layui-btn-video").click(function () {
                  var video_url = $('#video_url').val(),
                      urlregexp = /^((https|http)?:\/\/)mp\.weixin\.qq\.com\/[^\s]+/;
                  if (video_url == "") {layer.tips('文章地址不能为空', '#video_url', {tips: [1, '#FF5722']});}
                  if (!urlregexp.test(video_url)) {layer.tips('文章地址不正确，链接必须以：http(s):// 开头', '#video_url', {tips: [1, '#FF5722']});}

                  var loading = layer.load(2, {
                      shade: [.2, '#000']
                  });
                  $.post('/indexajax/remoteart', {
                      url: video_url,type: 2,
                  }, function (json) {
                      json = json || {};
                      layer.close(loading);

                      if (json.status == -1) {
                          layer.msg("登录超时，请重新登录", {time: 1000,anim: 6}, function () { floatlogin();})
                      } else if (json.status == 1) {

                          for (var i=0;i<json.list.length; i++){
                              console.log(json.list.length);
                              $('.layui-video-list').append('<div class="layui-form-item"><label class="layui-form-label">视频地址</label><div class="layui-input-inline"  style="width:226px"><input type="text"  autocomplete="off" value="'+json.list[i]+'"  class="layui-input layui-video-input"></div><button type="button" style="height:37px" class="layui-btn layui-btn-sm layui-btn-normal layui-video-copy"  data-clipboard-text="'+json.list[i]+'">复制</button><button type="button" style="height:37px" class="layui-btn layui-btn-sm layui-btn-normal layui-video-insert" data-video="'+json.list[i]+'">插入</button></div>');
                          }
                          var clipboard = new Clipboard('.layui-video-copy');
                          clipboard.on('success', function(e) {layer.msg("复制成功",{icon: 1,"time":1500});});
                          clipboard.on('error', function(e) {layer.msg("复制失败",{icon: 1,"time":1500});});
                      } else {
                          layer.msg(json.info, { icon: 5,anim: 6})
                      }
                  }).fail(function () {
                      layer.close(loading);
                      layer.msg("服务器连接失败", {
                          icon: 2,
                          anim: 6
                      })
                  })
              });
              //插入至编辑器
              $(document).on("click",".layui-video-insert",function(){
                  const video = $(this).data('video');
                  content = editor.getContent();
                  editor.setContent(content+'<iframe class="video_iframe" frameborder="0" src="'+video+'" allowfullscreen="1" style="height:280px; width:100%; "></iframe>');
                  layer.msg("插入编辑器成功",{icon: 1,"time":1500})
              });


          }
      });
  });
  //生成PDF
  $("#btn_pdf_word").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      var html = editor.getContent();
      if (html.length == 0 && html == '') {
          layer.msg('编辑器内容为空', {
              icon: 0
          });
          return !1;
      }
      var htmlObj = $('<div>' + html + '</div>');
      htmlObj.find('.tool-border').remove();
      layer.open({
          type: 1,
          area: ['760px', '570px'],
          move: false,
          shade: 0.4,
          skin: 'float-artimage',
          btn: false,
          title: '生成PDF/word&nbsp;<a href="/help/60.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="art_iamge_help"></i></a>',
          content: '<style>#form_PDF_word .layui-form-label{width:90px;}#form_PDF_word .layui-input-block{margin-left:90px;}#form_PDF_word .layui-form-radio{margin: 6px 0px 0 10px;padding-right: 5px;}#form_PDF_word .layui-form-radio i{margin-right: 3px;}</style><div class="rich_media_inner rich_media_artimage"><div class="rich_media_content">' + htmlObj.html() + '</div></div><form class="layui-form layui-form-pane" id="form_PDF_word" onkeydown="if(event.keyCode==13){return false;}"><div class="layui-form-item"><label class="layui-form-label">转换类型</label><div class="layui-input-block"><input type="radio" name="type" value="1" title="PDF" checked=""><input type="radio" name="type" value="2" title="word"></div></div><div class="layui-form-item"><label class="layui-form-label">是否分页</label><div class="layui-input-block"><input type="radio" name="page" value="0" title="否" checked=""><input type="radio" name="page" value="1" title="是"></div></div><div class="layui-form-item"><label class="layui-form-label">文章宽度</label><div class="layui-input-block"><select name="width" lay-filter="width"><option value="480" selected>480px</option><option value="640">640px</option><option value="720">720px</option><option value="960">960px</option></select></div></div><div class="layui-form-item"><div class="layui-form-mid layui-word-aux">温馨提示：(虚线内为图片可视区域)<br>1. 暂不支持动态样式、滑动样式；<br>2. 暂不支持视频、GIF图；<br>4. 少量样式渲染支持不是很完美。<br>5. 普通会员每日可下载1次<br>6. 钻石会员每日可下载5次<br>5. 皇冠会员每日可下载50次。</div></div><div class="layui-form-item"><button class="layui-btn layui-btn-normal" lay-submit="artPDFword" lay-filter="artPDFword">开始转换</button></div></form>',
          success: function (layero, index) {
              form.render('select');
              form.render('radio');
              form.render('checkbox');
              form.on('select(width)', function (data) {
                  $('.float-artimage').css("left", (($(window).width() - parseInt(data.value) - 280) / 2) + "px");
                  $('.float-artimage').width(parseInt(data.value) + 280);
                  $('.float-artimage .rich_media_artimage').width(parseInt(data.value) + 5);
              });
              form.on('submit(artPDFword)', function (data, layero) {
                  var htmlObj = $('<div>' + UE.getEditor('editor_content').getContent() + '</div>');
                  htmlObj.find('.tool-border').remove();
                  var htmlcode = htmlObj.html();
                  var loading = layer.load(2, {
                      shade: [.2, '#000']
                  });
                  var type = data.field.type;
                  var page = data.field.page;
                  $.post('/createPDFword', {
                      content: htmlcode,
                      width: data.field.width,
                      type: type,
                      page: page
                  }, function (json) {
                      json = json || {};
                      layer.close(loading);
                      if (json.state == -1) {
                          layer.msg("登录超时，请重新登录", {
                              time: 1000,
                              anim: 6
                          }, function () {
                              floatlogin();
                          })
                      } else if (json.state == 1) {
                          layer.closeAll();
                          if (type == 2) {
                              var content = '<li class="active"><a href="' + json.doc + '" target="_blank"><span class="icon icon-word"></span><span class="pt_title">下载WORD</span></a></li>';
                          } else {
                              var content = '<li class="active"><a href="' + json.pdf + '" target="_blank"><span class="icon icon-pdf"></span><span class="pt_title">下载PDF</span></a></li>'
                          }
                          layer.open({
                              type: 1,
                              area: ['250px', '300px'],
                              move: false,
                              shade: 0.4,
                              btn: false,
                              content: '<style>.platform .active{width:100%;height:320px;line-height:30px;padding:10px 10px 0 20px;box-shadow:0 0 6px 4px#e5e5e5;letter-spacing:1px;opacity:1;z-index:100}.platform .pf_lt{width:100%;margin:44px 0 0;text-align:center}.platform .pf_lt li{width:120px;height:120px;display:inline-block;border:1px solid#e5e5e5;text-align:center;padding-top:28px;cursor:pointer;border-radius:3px;margin:8px 40px 8px 0;vertical-align:top;transition:all.3s ease}.platform .pf_lt li.active{width:136px;height:136px;border:1px solid#2dda9d;box-shadow:0 0 5px 1px#e5e5e5;margin:0 12px 0 0;padding-top:26px}.platform .pf_lt li span.pt_title{line-height:24px}.platform .pf_lt li .icon-word{background:url("http://public.96weixin.com/images/DOC.png")}.platform .pf_lt li .icon-pdf{background:url("http://public.96weixin.com/images/PDF.png")}.platform .pf_lt li .icon {width: 100px;height: 100px;display: block;background-size: 100px;margin-left: 15px;}</style><div class="platform active"><ul class="pf_lt">' + content + '</ul></div>',
                          });
                      } else {
                          layer.msg(json.info, {
                              icon: 5,
                              anim: 6
                          })
                      }
                  }).fail(function () {
                      layer.msg('服务器连接失败,请稍后再试', {
                          icon: 5,
                          anim: 6
                      })
                  });

                  layer.close(layero);
                  return !1;
              });
          }
      });
  });
  //导入文章
  $("#btn_remote_art,.btn_remote_art").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 1,
          area: ['500px'],
          shade: 0.4,
          move: false,
          skin: 'float-remoteart',
          btn: ['确定', '取消'],
          title: '导入文章&nbsp;<a href="/help/21.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="remote_art_help"></i></a>',
          content: '<form class="layui-form layui-form-pane" onkeydown="if(event.keyCode==13){return false;}"><div class="layui-form-item"><label class="layui-form-label">文章地址</label><div class="layui-input-block"><input type="text" name="title" id="remoteart_url" autocomplete="off" placeholder="http(s)://" class="layui-input"></div><div class="layui-form-mid layui-word-aux">从网址导入文章内容，避免复制不全或复制多余部分造成格式排版错乱。目前已支持 : 今日头条、 微信公众号文章、天天快报、一点资讯、百家号、网易号、新浪看点</div></div></form>',
          yes: function (layero, index) {
              var remoteart_url = $('#remoteart_url').val(),
                  urlregexp = /^((https|http)?:\/\/)[^\s]+/;
              if (remoteart_url == "") {
                  layer.tips('文章地址不能为空', '#remoteart_url', {
                      tips: [1, '#FF5722']
                  });
              } else if (!urlregexp.test(remoteart_url)) {
                  layer.tips('文章地址不正确，链接必须以：http(s):// 开头', '#remoteart_url', {
                      tips: [1, '#FF5722']
                  });
              } else {
                  var loading = layer.load(2, {
                      shade: [.2, '#000']
                  });
                  $.post('/indexajax/remoteart', {
                      url: remoteart_url
                  }, function (json) {
                      json = json || {};
                      layer.close(loading);
                      if (json.status == -1) {
                          layer.close(layero);
                          layer.msg("登录超时，请重新登录", {
                              time: 1000,
                              anim: 6
                          }, function () {
                              floatlogin();
                          })
                      } else if (json.status == -2) {
                          layer.close(layero);
                          // buy_vip_tips();
                          //   return false;
                          layer.open({
                              type: 1,
                              shade: 0.4,
                              title: false,
                              content: '<p style="padding:20px 20px 0">月导入文章次数已经超过VIP授权</p><div class="layui-layer-btn"><a class="layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
                          });
                      } else if (json.status == 1) {
                          layer.close(layero);
                          editor.setContent(json.info);
                      } else {
                          layer.msg(json.info, {
                              icon: 5,
                              anim: 6
                          })
                      }
                  }).fail(function () {
                      layer.close(loading);
                      layer.msg("服务器连接失败", {
                          icon: 2,
                          anim: 6
                      })
                  })
              }
          }
      });
  });
  $(".btn_import_word").click(function () {
      var text = '<form class="layui-form layui-form-pane">';
      text += '<div class="layui-form-item">';
      text += '<div class="layui-upload-drag" id="ImportWord">';
      text += '<i class="layui-icon"></i>';
      text += '<p>点击上传，或将word文件拖拽到此处</p>';
      text += '<input type="file" id="uploadWord" accept=".docx,.doc">';
      text += '</div><div class="layui-form-mid layui-word-aux">上传word次数无限，大小限制10MB以内,需要注意的是，图片会上传到你的图片库，并占用你图片上传和存储数量，超过限制将只上传文字。</div>';
      text += '</div></form>';
      layer.open({
          type: 1,
          area: ['330px'],
          shade: 0.4,
          move: false,
          skin: 'float-remoteart',
          title: '导入word&nbsp;<a href="/help/21.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="remote_art_help"></i></a>',
          content: text,
          success: function (layero, index) {

          }
      });
  });
  $(document).on('change', '#uploadWord', function () {
      // cors 上传文件
      var fdata = new FormData();
      var file = $('#uploadWord')[0].files[0];
      if (file.size > 10 * 1024 * 1024) {
          layer.msg('文件大小不能超过10M', {
              icon: 5,
              time: 1800
          });
          return false;
      }
      fdata.append('file', file);
      var time = Date.parse(new Date());
      $.ajax({
          data: {
              flag: time
          },
          type: 'post',
          url: '/indexajax/uploadword',
          beforeSend: function () {
              var pop = layer.msg('正在上传中', {
                  icon: 16,
                  time: 0,
                  shade: 0.1
              });
          },
          success: function (res) {
              if (res.status == 1) {
                  // 上传文件
                  fdata.append('id', res.info.save_id);
                  var xhr = new XMLHttpRequest();
                  xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                          layer.closeAll();
                          var response = $.parseJSON(xhr.responseText);
                          if (response.status == 1) {
                              // 提示正在转换中，并开启轮询
                              layer.msg('上传成功，文件正在转换中，转换成功后将自动保存到 “ 我的文章 ” ', {
                                  icon: 1,
                                  time: 3500
                              }, function () {
                                  var intervalID = window.setInterval(function () {
                                      $.get('/indexajax/checkWordToHtml', {
                                          id: res.info.save_id
                                      }, function (check_res) {
                                          if (check_res.status == -1) {
                                              clearInterval(intervalID);
                                              layer.confirm('word转换失败，失败原因: ' + check_res.info, {
                                                  skin: 'word-to-html',
                                                  title: '转换失败提示',
                                                  btn: ['确定']
                                              });
                                          } else if (check_res.status == 1) {
                                              clearInterval(intervalID);
                                              layer.confirm("word 转换成功，已经保存到 '我的文章'，现在是否要替换编辑器里的内容？", {
                                                  title: '转换成功提示',
                                                  skin: 'word-to-html',
                                                  btn: ['替换', '取消'],
                                                  btn1: function () {
                                                      UE.getEditor('editor_content').setContent(check_res.info);
                                                      layer.closeAll();
                                                  },
                                                  btn2: function () {
                                                      layer.closeAll();
                                                  }
                                              });
                                          }
                                      });
                                  }, 3000);
                              }); //@msg
                          } else {
                              layer.msg(response.info, {
                                  icon: 5,
                                  time: 2500
                              });
                          }
                      }
                  }
                  xhr.open("POST", "/convert", true);
                  xhr.send(fdata);
              } else if (res.status == -1) {
                  layer.msg('必须登录后才能执行该操作', {
                      time: 1000,
                      anim: 5
                  }, function () {
                      floatlogin()
                  });
              } else {
                  layer.confirm(res.info, {
                      skin: 'word-to-html',
                      title: '转换提示',
                      btn: ['确定'],
                      btn1: function () {
                          layer.closeAll();
                      }
                  });
              }
          },
          error: function () {
              layer.msg('系统出错了，请稍后重试~');
          }
      });
      $('#uploadWord').val('');
  });

  /***************************      pdf  转html    *******************************/
  $(".btn_import_pdf").click(function () {
      var text = '<form class="layui-form layui-form-pane">';
      text += '<div class="layui-form-item">';
      text += '<div class="layui-upload-drag" id="ImportWord">';
      text += '<i class="layui-icon"></i>';
      text += '<p>点击上传，或将pdf文件拖拽到此处</p>';
      text += '<input type="file" id="uploadPdf" accept=".pdf">';
      text += '</div><div class="layui-form-mid layui-word-aux">pdf大小限制10MB以内,需要注意的是，图片会上传到你的图片库，并占用你图片上传和存储数量，超过限制将只上传文字。</div>';
      text += '</div></form>';
      layer.open({
          type: 1,
          area: ['330px'],
          shade: 0.4,
          move: false,
          skin: 'float-remoteart',
          // title: '导入pdf&nbsp;<a href="/help/21.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="remote_art_help"></i></a>',
          title: '导入pdf&nbsp;',
          content: text,
          success: function (layero, index) {

          }
      });
  });

  var check_pdf_interval_id = 0;
  function checkPdfTohtml(user_pdf_id) {
      $.get('/indexajax/checkPdfToHtml', {
          id: user_pdf_id
      }, function (check_res) {
          if (check_res.status == 0) {
              clearInterval(check_pdf_interval_id);
              layer.confirm('pdf转换失败，失败原因: ' + check_res.info, {
                  skin: 'word-to-html',
                  title: '转换失败提示',
                  btn: ['确定']
              });
          } else if (check_res.status == 1) {
              clearInterval(check_pdf_interval_id);
              layer.confirm("pdf 转换成功，已经保存到 '我的文章'，现在是否要替换编辑器里的内容？", {
                  title: '转换成功提示',
                  skin: 'word-to-html',
                  btn: ['替换', '取消'],
                  btn1: function () {
                      UE.getEditor('editor_content').setContent(check_res.info);
                      layer.closeAll();
                  },
                  btn2: function () {
                      layer.closeAll();
                  }
              });
          }
      });
  }
  $(document).on('change', '#uploadPdf', function () {
      layer.load(1);
      var fdata = new FormData();
      $.ajax({
          url: '/indexajax/uploadPdf',
          type: 'get',
          success: function(data) {
              if (data.status == -1) {
                  layer.closeAll('loading');
                  layer.msg("请先登录", {
                      time: 1000,
                      anim: 6
                  }, function () {
                      floatlogin();
                  })
              } else if(data.status == -2) {
                  layer.closeAll('loading');
                  layer.confirm('今日转pdf已到达上限次数（<span style="font-size: 12px;">普通会员每日一次，皇冠会员每日30次，终身会员不限制次数</span>）',{
                      title: false,
                      btn: ['升级VIP','取消'],
                      btn1: function() {
                          var a = $("<a href='/product' target='_blank'></a>").get(0);
                          var e = document.createEvent('MouseEvents');
                          e.initEvent( 'click', true, true );
                          a.dispatchEvent(e);
                      }
                  });
              } else if (data.status == 1) {
                  var file = $('#uploadPdf')[0].files[0];
                  if (file.size > 10 * 1024 * 1024) {
                      layer.msg('文件大小不能超过10M', {
                          icon: 5,
                          time: 1800
                      });
                      return false;
                  }

                  fdata.append('file', file);
                  //var time = Date.parse(new Date());

                  fdata.append('id',data.info.save_id);

                  var xhr = new XMLHttpRequest();
                  xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                          layer.closeAll();
                          var response = $.parseJSON(xhr.responseText);
                          if (response.status == 1) {
                              checkPdfTohtml(data.info.save_id);
                              check_pdf_interval_id = window.setInterval(function () {
                                  checkPdfTohtml(data.info.save_id);
                              }, 3000); //  开始查询
                              layer.msg('上传成功，pdf正在转换中，转换成功后将自动保存到 “ 我的文章 ” ', {
                                  icon: 1,
                                  time: 3500
                              }); //@msg

                          } else {
                              layer.msg(response.info, {
                                  icon: 5,
                                  time: 2500
                              });
                          }
                      }
                  }

                  // LGD 修改 改成 ip 地址
                  //xhr.open("POST", "http:123.207.14.223//convert", true);
                  // wordtohtml = 'http://convert.96weixin.com';

                  // xhr.open("POST", wordtohtml + "/convert", true);
                  xhr.open("POST",'/convertPdf',true);
                  // xhr.open("POST", wordtohtml + "/convert", true);
                  xhr.send(fdata);


              }

              $('#uploadPord').val('');
          },
          error: function() {

          }


      });


  });

  /*******************************  pdf end  ***************************************/
  //同步微信
  $("#btn_sync_weixin").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 2,
          area: ['625px', '600px'],
          shade: 0.4,
          move: false,
          skin: 'float-sync',
          title: '同步到微信&nbsp;<a href="/help/61.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="sync_weixin_help"></i></a>',
          content: '/user/sync_art?t=1',
          success: function (layero, index) {
          }
      });
  });
  //保存文章
  function myCover() {
      function myCoverLoad() {
          $('#form_saveart #imgManager').show();
          $('#form_saveart #myList .page a').click(function () {
              if ($(this).attr('href') == 'javascript:;') return false;
              $('#myList').html('');
              $.ajax({
                  url: editor.getActionUrl(editor.getOpt('imageManagerActionName')) + $(this).attr('href'),
                  type: 'get',
                  cache: false,
                  dataType: 'html',
                  xhrFields: {
                      withCredentials: true
                  },
                  success: function (json) {
                      $('#form_saveart #myList').html(json);
                      myCoverLoad();
                  }
              });
              return !1;
          });
          $('#form_saveart #myList .icon').click(function () {
              var $parent = $(this).parents('li:first');
              var src = $parent.find('img').attr('src');
              $("#saveart_thumbnail").val(src);
              $('#form_saveart #imgManager').hide();
          });
      }

      $.ajax({
          url: editor.getActionUrl(editor.getOpt('imageManagerActionName')) + '?fm=1',
          type: 'get',
          cache: false,
          dataType:'html',
          xhrFields:{withCredentials: true},
          success:function(json){
              $('#form_saveart #myList').html(json);
              myCoverLoad();
          }
      });
      return !1;
  }
  $(document).on('click','.form_saveart .delimg',function(e){
      if (confirm('确认要删除吗？删除后已同步微信的内容不受影响。但编辑器中使用过此图片的将无法显示。')) {
          var url = editor.getActionUrl(editor.getOpt('backgroundActionName')),
              isJsonp = UE.utils.isCrossDomainUrl(url),
              _this = $(this);
          $.ajax({
              url: editor.getActionUrl(editor.getOpt('imageDeleteActionName')),
              data: {
                  id: $(this).data('id')
              },
              type: 'get',
              cache: false,
              dataType: isJsonp ? 'jsonp' : 'json',
              xhrFields: {
                  withCredentials: true
              },
              error: function () {
                  layer.closeAll('loading');
              },
              beforeSend: function () {
                  var loading = layer.load(2, {
                      shade: [.2, '#000']
                  });
              },
              success: function (json) {
                  layer.closeAll('loading');
                  json = json || {};
                  if (json.state == 'SUCCESS') {
                      _this.parent().remove();
                  } else {
                      layer.msg(json.state, {
                          icon: 5,
                          anim: 6
                      });
                  }
              }
          });
          return !1;
      }
      e.stopPropagation();
  });
  //云端草稿
  $("#btn_drafts").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 2,
          area: ['650px', '600px'],
          shade: 0.4,
          skin: 'float-drafts',
          btn: false,
          move: false,
          title: '云端草稿&nbsp;<a href="/help/64.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="drafts_help"></i></a>',
          content: '/user/drafts?t=1',
          success: function (layero, index) {
          }
      });
  });
  var drafts_htmlcode, drafts_time = $("#btn_drafts").data('time');
  window.drafts = function () {
      var htmlObj = $('<div>' + UE.getEditor('editor_content').getContent() + '</div>');
      htmlObj.find('.tool-border').remove();
      var htmlcode = htmlObj.html();
      setTimeout(function () {
          window.drafts();
      }, drafts_time * 1000);
      if (drafts_htmlcode != htmlcode && htmlcode.length > 60) {
          $.post('/indexajax/drafts', {
              content: htmlcode
          }, function (json) {
              json = json || {};
              if (json.status == -1) {
                  layer.tips('登录后才能缓存哦', '#btn_drafts');
              } else if (json.status == 1) {
                  drafts_htmlcode = htmlcode;
                  layer.tips('缓存成功', '#btn_drafts');
              } else {
                  layer.tips(json.info, '#btn_drafts');
              }
          }).fail(function () {
          });
      }
  }
  editor.addListener('ready', function () {
      if (drafts_time && AlreadyLogin) setTimeout(function () {
          window.drafts();
      }, drafts_time * 1000);
  });
  $("#btn_save").click(function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('没有可保存的内容', {
              icon: 0
          });
          return !1;
      }
      // LGD 微信公众平台相关 01-16
      if ($('#btn_save').attr('data-wechat-cover')) {
          var save_art_storage_type = '<div class="layui-form-item" pane id="save_art_storage_type">';
          save_art_storage_type += '<label class="layui-form-label">存储类型</label>';
          save_art_storage_type += '<div class="layui-input-block">';
          save_art_storage_type += '<input type="checkbox" name="update_wxMaterial" lay-skin="primary" title="更新微信公众平台上的此文章" checked lay-filter="storage-mode">';
          save_art_storage_type += '<input type="hidden" id="thumb_media_id">';
          save_art_storage_type += '</div>';
          save_art_storage_type += '</div>';
          var save_art_storage_option = 'none"';
          var save_art_wechat_select = 'disabled';
          var save_art_drafting = 'none';
          var save_art_wxImg = '';
          var save_art_wechat_cate = 'none';
          var save_art_name = '更新微信文章';
      } else {
          var save_art_storage_type = '';
          var save_art_storage_option = '';
          var save_art_wechat_select = '';
          var save_art_drafting = '';
          var save_art_wxImg = 'none';
          var save_art_wechat_cate = '';
          var save_art_name = '保存到我的文章';
      }
      var save_type = $(this).attr('data-type'),
          save_id = $(this).attr('data-id'),
          save_name = $(this).attr('data-name'),
          save_thumbnail = $(this).attr('data-thumbnail'),
          save_summary = $(this).attr('data-summary'),
          save_link = $(this).attr('data-link'),
          save_author = $(this).attr('data-author'),
          save_artcover = $(this).attr('data-artcover'),
          save_wechat = 0;
      var save_cate_id = $(this).attr('data-cate-id'); // LGD 文章分类
      var save_article_cate = '<label class="layui-form-label ' + save_art_wechat_cate + '">文章分类</label><div class="layui-input-inline ' + save_art_wechat_cate + '" style="width: 182px !important;margin-right: 0px;"><select id="article_cate" lay-filter="select-articleCate"><option value="0">默认</option><option value="dd">++添加文章分类++</option></select></div>'; // 文章分类列表 LGD 11-07
      // LGD 01-16
      var save_wechat = $(this).attr('data-save-wechat');
      if (typeof save_wechat == 'undefined' || !save_wechat) save_wechat = 0;
      var save_cover = $(this).attr('data-save-cover');
      var chooseWxImg = '<div id="choose-wx-img-div" class="layui-form-mid ' + save_art_wxImg + '" ><button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="chooseWxImg">从微信素材库选择图片</button></div>'; // 从微信素材库选择图片 LGD 01-16
      layer.open({
          type: 1,
          area: ['640px', '605px'],
          shade: 0.4,
          skin: 'float-saveart',
          move: false,
          btn: false,
          title: '保存文章 / 模板&nbsp;<a href="/help/49.html" target="_blank"><i class="fa fa-question-circle-o" aria-hidden="true" id="save_art_help"></i></a>',
          content: '<form class="layui-form layui-form-pane" style="padding: 10px 20px 0;" id="form_saveart" onkeydown="if(event.keyCode==13){return false;}">' + save_art_storage_type + '<div class="layui-form-item ' + save_art_storage_option + '" pane ><label class="layui-form-label">存储选项</label><div class="layui-input-block"><input lay-filter="save_type" type="radio" name="type" value="art" title="我的文章"' + (save_type == 'art' ? ' checked' : '') + '><input lay-filter="save_type" type="radio" name="type" value="tpl" title="我的模板"' + (save_type == 'tpl' ? ' checked' : '') + '><div class="save-cover-original"' + (save_id ? '' : ' style="display:none"') + '><input type="checkbox"' + (save_id ? ' checked' : '') + ' name="original" id="saveart_original" lay-skin="primary" title="覆盖原文&nbsp;ID:' + save_id + '"></div></div></div><div class="layui-form-item"><label class="layui-form-label">图文标题</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" id="saveart_name" autocomplete="off" class="layui-input" value="' + save_name + '"></div></div><div class="layui-form-item"><label class="layui-form-label">封面图片</label><div class="layui-input-block"><input type="text" name="thumbnail" id="saveart_thumbnail" style="width: 200px !important;display: inline-block !important" autocomplete="off" class="layui-input" value="' + save_thumbnail + '" readonly><div class="layui-input-inline" style="display: inline-block;float: none !important;vertical-align: top;margin-left: 10px;margin-left: 30px;"><input type="checkbox" name="artcover" id="saveart_artcover" lay-skin="primary" title="正文中显示封面"' + (save_artcover == 1 ? ' checked' : '') + '></div><div class="layui-form-mid  image_choose_web' + save_art_drafting + '" ><button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="choose_cover">选择封面</button><button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="choose_pixabay">无版权封面</button><div class="layui-btn layui-btn-normal layui-btn-sm design_web_choose chuangkit-design-button" style="position:relative;" data-access="032630c84bb14830856ce5a95fb6d389" data-exp="1893456000000" data-zIndex="2147483647" data-kind="20" signType="md5">设计封面首图<ul style="display:none;"><li class="chuangkit-design-button" data-access="032630c84bb14830856ce5a95fb6d389" data-exp="1893456000000" data-zIndex="2147483647" data-kind="20" signType="md5">创客贴</li><li class="design_web_zhaotu zhaotu-design-button" data-access="032630c84bb14830856ce5a95fb6d389" data-mode="2" data-auth="d8a4BYlh31dUYHNQ3%5Ba%5Dl2cIzUbVNo2GKRyrjnoyWYW4fpmNJH8v08%5Bc%5DWlTQmBY3SMZRGVFsSl7id%5Bc%5DQezmSRg" data-type="20" signtype="md5">找图设计</li></ul></div><div class="layui-btn layui-btn-normal layui-btn-sm design_web_choose chuangkit-design-button" style="position:relative;" data-access="032630c84bb14830856ce5a95fb6d389" data-exp="1893456000000" data-zIndex="2147483647" data-kind="40" signType="md5">设计封面次图<ul style="display:none;"><li class="chuangkit-design-button" data-access="032630c84bb14830856ce5a95fb6d389" data-exp="1893456000000" data-zIndex="2147483647" data-kind="40" signType="md5">创客贴</li><li class="design_web_zhaotu zhaotu-design-button" data-access="032630c84bb14830856ce5a95fb6d389" data-mode="2" data-auth="d8a4BYlh31dUYHNQ3%5Ba%5Dl2cIzUbVNo2GKRyrjnoyWYW4fpmNJH8v08%5Bc%5DWlTQmBY3SMZRGVFsSl7id%5Bc%5DQezmSRg" data-type="11" signtype="md5">找图设计</li>--></ul></div><button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="cover_upload">上传封面</button></div>' + chooseWxImg + '</div></div><div class="save-type-tpl"' + (save_type == 'art' ? ' style="display:none"' : '') + '><div class="layui-form-item"><div class="layui-input-block"><button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="savetpl">保存到我的模板</button></div></div></div><div class="save-type-art"' + (save_type == 'tpl' ? ' style="display:none"' : '') + '><div class="layui-form-item"><label class="layui-form-label">图文作者</label><div class="layui-input-inline"><input type="text" name="author" id="saveart_author" autocomplete="off" class="layui-input" value="' + save_author + '" style="width: 190px !important;"></div>' + save_article_cate + '</div><div class="layui-form-item"><label class="layui-form-label">原文链接</label><div class="layui-input-block"><input type="text" name="link" id="saveart_link" autocomplete="off" class="layui-input" value="' + save_link + '"></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">图文摘要</label><div class="layui-input-block"><textarea name="summary" id="saveart_summary" class="layui-textarea" placeholder="如果不填写会默认抓取正文前54个字">' + save_summary + '</textarea></div></div><div class="layui-form-item"><div class="layui-input-inline"><button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="saveart">' + save_art_name + '</button></div><div class="layui-inline"><div class="layui-form-mid layui-word-aux">保存时同步到第三方</div><div class="layui-input-inline" style="width:180px"><select ' + save_art_wechat_select + ' name="wechat" id="saveart_wechat" lay-filter="wechat"><option value="0">选择平台</option><option value="-1">++ 添加公众号授权 ++</option></select></div></div></div></div><div id="imgManager"><a class="layui-layer-ico" href="javascript:;"></a><div id="myList"></div></div></form>',
          success: function (layero, index) {
              $('.chuangkit-design-button').click(function(){
                  $.get('/advertise?id=39');
                  let title='*本功能由创客贴在线设计平台提供技术支持，使用更多设计场景和模板请访问官网<a style="color:#C3C3C3;" target="_blank" href="https://www.chuangkit.com">www.chuangkit.com</a>'
                  $('#apiexplain').html(title);
              })

              window.zhaotuIframe = function(option) {
                  var data = {
                      access_id: option['data-access'],
                      type_id: option['data-template-id'],
                      width: option['data-width'],
                      height: option['data-height'],
                      unit: option['data-unit'],
                      z_index: option['data-zIndex'],
                      auth: option['data-auth'],
                      mode: option['data-mode'],
                      title:
                          '*本功能由找图设计在线设计平台提供技术支持，使用更多设计场景和模板请访问官网<a style="color:#C3C3C3;" target="_blank" href="https://www.zhaotu.com">www.zhaotu.com</a>',
                  }
                  this.option = data
              }

              $('.zhaotu-design-button').click(function(){
                  event.stopPropagation();
                  zhaotuOpenIframe(this)
              })

              zhaotuAddEvent(window, 'message', function(eve) {
                  if (eve && eve.data) {
                      if(eve.data.value&&eve.data.value.msg&&eve.data.value.msg == "export"){
                          zhaotuCloseIframe()
                          let imgurl = eve.data.value.url
                          var loading = layer.load(2, {shade: [.2,'#000']});
                          $.post(editor.getActionUrl(editor.getOpt('imageActionName'))+'?sj=1',{url:imgurl},function(res) {
                              layer.closeAll('loading');
                              if(res.state == 'SUCCESS' && res.url){
                                  var imgurl = editor.getOpt('imageUrlPrefix') + (res.url.substr(0,1) == '/' ? res.url : '/' + res.url);
                                  $("#saveart_thumbnail").val(imgurl);
                                  $("#form_saveart #myList").html('');
                              }else{
                                  layer.msg(res.state,{icon:5,anim:6});
                              }
                          }, "json").fail(function() {
                              layer.close(loading);
                              layer.msg("服务器连接失败", {icon: 2,anim: 6})
                          })
                      }else if(eve.data.value != undefined && eve.data.value.msg == "close"){
                          zhaotuCloseIframe()
                      }
                  }
              })

              function zhaotuOpenIframe(_this) {
                  var option
                  if (_this.getAttribute) {
                      option = {
                          access: _this.getAttribute('data-access'),
                          type: _this.getAttribute('data-type'),
                          width: _this.getAttribute('data-width'),
                          height: _this.getAttribute('data-height'),
                          unit: _this.getAttribute('data-unit'),
                          z_index: _this.getAttribute('data-zIndex'),
                          auth: _this.getAttribute('data-auth'),
                          mode: _this.getAttribute('data-mode'),
                          title:
                              '*本功能由找图设计提供技术支持，使用更多设计场景和模板请访问官网<a style="color:#C3C3C3;" target="_blank" href="https://www.zhaotu.com">www.zhaotu.com</a>',
                      }
                  } else {
                      option = _this
                  }
                  zhaotu_api_option = option
                  if (!option.access || !option.type) {
                      console.error('缺少必要参数！')
                      return
                  }
                  // api的路径
                  var iframe_src = '//www.zhaotu.com/dist/#/express'
                  var urlPms = {
                      access: option.access,
                      zindex: option.z_index,
                      type: option.type,
                      width: option.width,
                      height: option.height,
                      unit: option.unit,
                      auth: option.auth,
                      mode: option.mode,
                  }
                  iframe_src = buildUrl(iframe_src, urlPms)
                  zhaotu_iframe = document.getElementById('zhaotu-design-iframe')
                  // 当前iframe没有加载
                  if (zhaotu_iframe == null) {
                      zhaotu_iframe = document.createElement('iframe')
                      zhaotu_iframe.id = 'zhaotu-design-iframe'
                      zhaotu_iframe.style.position = 'fixed'
                      zhaotu_iframe.style.top = '50px'
                      zhaotu_iframe.style.left = '50px'
                      zhaotu_iframe.setAttribute('frameborder', '0')
                      // console.log(iframe_src)
                      document.body.appendChild(zhaotu_iframe)
                  }
                  $("#iframe_zhaotu", parent.document).attr('_height', $("#iframe_zhaotu", parent.document).height()).attr('style', 'width:100%;height:100%;overflow:hidden;position:absolute;top:0;right:0;background-color:#fff;z-index:2147483646').attr('scrolling', 'no');
                  var draw_frame_z_index = option.z_index || 2147483647
                  var window_width = document.documentElement.clientWidth
                  var window_height = parent.document.documentElement.clientHeight
                  zhaotu_iframe.width = window_width - 100
                  zhaotu_iframe.height = window_height - 100
                  zhaotu_iframe.style.zIndex = draw_frame_z_index
                  zhaotu_iframe.src = iframe_src
                  zhaotu_iframe.style.display = 'block'
                  // 覆盖层
                  pop_black = document.createElement('div')
                  pop_black.style.width = window_width + 'px'
                  pop_black.style.height = window_height + 'px'
                  pop_black.style.position = 'fixed'
                  pop_black.style.top = '0px'
                  pop_black.style.left = '0px'
                  pop_black.style.zIndex = parseFloat(draw_frame_z_index) - 1
                  pop_black.style.backgroundColor = '#000'
                  pop_black.style.opacity = '.7'
                  document.body.appendChild(pop_black)
                  // 广告层
                  pop_ad = document.getElementById('apiexplain')
                  if (pop_ad == null) {
                      pop_ad = document.createElement('div')
                      pop_ad.id = 'apiexplain'
                      if (option.style != 'acfun') {
                          pop_ad.style.fontSize = '13px'
                          pop_ad.style.position = 'fixed'
                          pop_ad.style.top = '27px'
                          pop_ad.style.left = '50px'
                          pop_ad.style.color = '#A3A3A3'
                          pop_ad.style.zIndex = draw_frame_z_index
                          pop_ad.innerHTML = option.title
                      } else {
                          pop_ad.style.fontSize = '15px'
                          pop_ad.style.position = 'fixed'
                          pop_ad.style.bottom = '12px'
                          pop_ad.style.left = '50px'
                          pop_ad.style.color = '#A3A3A3'
                          pop_ad.style.zIndex = draw_frame_z_index
                          pop_ad.innerHTML =
                              'Powered&nbsp;by&nbsp;<img src="https://www.zhaotu.com/img/static/logo.svg">&nbsp;<a style="color:#C3C3C3;" target="_blank" href="https://www.zhaotu.com">www.zhaotu.com</a>'
                      }
                      document.body.appendChild(pop_ad)
                  }
                  else{
                      $('#apiexplain').html(option.title);
                  }
                  if (option.close_copyright != 1) {
                      pop_ad.style.display = 'block'
                  } else {
                      pop_ad.style.display = 'none'
                  }
                  // 退出按钮
                  close_btn = document.createElement('div')
                  close_btn.setAttribute('class', 'zhaotu-api-close')
                  close_btn.style.fontSize = '13px'
                  close_btn.style.width = '50px'
                  close_btn.style.textAlign = 'right'
                  close_btn.style.position = 'fixed'
                  close_btn.style.right = '53px'
                  close_btn.style.top = '27px'
                  close_btn.style.color = '#A2A2A2'
                  close_btn.style.cursor = 'pointer'
                  close_btn.style.zIndex = draw_frame_z_index
                  // close_btn.style.backgroundImage = 'url(https://www.zhaotu.com/img/static/api-03.svg)'
                  // close_btn.style.backgroundRepeat = 'no-repeat'
                  close_btn.innerHTML = '退出'
                  if (option.style == 'acfun') {
                      close_btn.innerHTML = '关闭'
                  }
                  document.body.appendChild(close_btn)
                  zhaotuAddEvent(close_btn, 'click', function(eve) {
                      zhaotuCloseIframe.call(this)
                  })
              }

              function zhaotuAddEvent(obj, ev, fn) {
                  if (obj == null) return
                  if (document.addEventListener) {
                      obj.addEventListener(ev, fn, false)
                  } else {
                      obj.attachEvent('on' + ev, fn)
                  }
              }

              function buildUrl(url, urlPms) {
                  for (var key in urlPms) {
                      if (urlPms[key] !== null && urlPms[key] !== undefined) {
                          if (url.indexOf('?') > 0) {
                              url += '&'
                          } else {
                              url += '?'
                          }
                          url += key + '=' + urlPms[key]
                      }
                  }
                  return url
              }

              function zhaotuCloseIframe() {
                  // 隐藏操作
                  $("#iframe_zhaotu", parent.document).removeAttr("style").attr("scrolling",'auto').height($("#iframe_zhaotu", parent.document).attr('_height')).removeAttr("_height"),
                  zhaotu_iframe.parentNode && zhaotu_iframe.parentNode.removeChild(zhaotu_iframe)
                  // 隐藏广告
                  pop_ad.style.display = 'none'
                  // 删除遮罩
                  document.body.removeChild(pop_black)
                  // 删除退出
                  document.body.removeChild(close_btn)
              }

              $('.design_web_choose').mouseenter(function(){
                  $(this).find('ul').show();
              })
              $('.design_web_zhaotu').click(function(){

              })
              $('.design_web_choose').mouseleave(function(){
                  $(this).find('ul').hide();
              })
              $(".chuangkit-design-button").click(function () {
                  return !1;
              });
              $("#choose_cover").click(function () {
                  if ($('#form_saveart #myList').html() == "") {
                      myCover();
                  } else {
                      $('#form_saveart #imgManager').show();
                  }
              });
              $("#choose_pixabay").click(function () {
                  if (!AlreadyLogin) {
                      layer.msg('必须登录后才能执行该操作', {
                          time: 1000,
                          anim: 6
                      }, function () {
                          floatlogin()
                      });
                      return !1
                  }
                  layer.open({
                      type: 2,
                      area: ['900px', '600px'],
                      shade: 0.4,
                      skin: 'float-sync',
                      title: '无版权封面',
                      content: '/material/pixabay?t=2',
                      success: function (layero, index) {
                      }
                  });
              });
              $("#form_saveart .layui-layer-ico").click(function () {
                  $('#form_saveart #imgManager').hide();
              });
              $.ajaxSetup({
                  ifModified: true,
                  cache: true
              });
              $.getScript('https://static.chuangkit.com/api/v4.js', function () {
                  $(".chuangkit-design-button").each(function () {
                      event.stopPropagation();
                      var chuangkit_sign = CryptoJS.MD5('data-access=032630c84bb14830856ce5a95fb6d389&data-exp=1893456000000&data-kind=' + $(this).attr('data-kind') + '&data-zIndex=2147483647DBA93BFB2E5F6BE950D25F82966E637F').toString().toUpperCase();
                      $(this).attr('sign', chuangkit_sign);
                  });
                  /**创客贴**/
                  chuangkitComplate = function (eve) {
                      if (eve.cktMessage && eve['thumb-urls']) {
                          var loading = layer.load(2, {
                              shade: [.2, '#000']
                          });
                          $.post(editor.getActionUrl(editor.getOpt('imageActionName')) + '?fm=1', {
                              url: 'http:' + eve['thumb-urls'][0]
                          }, function (res) {
                              layer.closeAll('loading');
                              if (res.state == 'SUCCESS' && res.url) {
                                  var imgurl = editor.getOpt('imageUrlPrefix') + (res.url.substr(0, 1) == '/' ? res.url : '/' + res.url);
                                  $("#saveart_thumbnail").val(imgurl);
                                  $("#form_saveart #myList").html('');
                              } else {
                                  layer.msg(res.state, {
                                      icon: 5,
                                      anim: 6
                                  });
                              }
                          }, "json").fail(function () {
                              layer.close(loading);
                              layer.msg("服务器连接失败", {
                                  icon: 2,
                                  anim: 6
                              })
                          });
                      }
                  }
              });
              layui.upload.render({
                  elem: '#cover_upload',
                  url: editor.getActionUrl(editor.getOpt('imageActionName')) + '?fm=1',
                  exts: 'jpg|jpeg|gif|png',
                  field: 'upfile',
                  size: parseInt(editor.getOpt('imageMaxSize') / 1024),
                  number: 1,
                  before: function (obj) {
                      var loading = layer.load(2, {
                          shade: [.2, '#000']
                      });
                  },
                  done: function (res) {
                      layer.closeAll('loading');
                      if (res.state == 'SUCCESS' && res.url) {
                          var imgurl = editor.getOpt('imageUrlPrefix') + (res.url.substr(0, 1) == '/' ? res.url : '/' + res.url);
                          $("#saveart_thumbnail").val(imgurl);
                          $("#form_saveart #myList").html('');
                          // LGD 图片裁剪
                          layer.open({
                              type: 2,
                              title: '图片裁剪',
                              area: ['800px', '450px'],
                              content: '/crop/index?img_url=' + imgurl, //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                              success: function (layero, index) {
                                  // 监听子页面的确定按钮
                                  var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                                  iframeWin.$('.crop-confirm').click(function () {
                                      layer.load(1, {
                                          shade: [0.1]
                                      });
                                      postData = {
                                          x: iframeWin.$('#x').val(),
                                          y: iframeWin.$('#y').val(),
                                          h: iframeWin.$('#h').val(),
                                          w: iframeWin.$('#w').val(),
                                          boundx: iframeWin.$('#boundx').val(),
                                          img_url: imgurl
                                      }
                                      $.post('/crop/crop', postData, function (res) {
                                          layer.closeAll('loading');
                                          if (res.status == 1) {
                                              layer.msg('裁剪成功', {
                                                  time: 1800,
                                                  icon: 1
                                              }, function () {
                                                  var imgurl = editor.getOpt('imageUrlPrefix') + (res.data.substr(0, 1) == '/' ? res.data : '/' + res.data);
                                                  $("#saveart_thumbnail").val(imgurl);
                                                  $("#form_saveart #myList").html('');
                                                  layer.close(index);
                                              });
                                          } else {
                                              layer.msg(res.msg, {
                                                  time: 1800,
                                                  icon: 2
                                              }, function () {
                                                  layer.close(index);
                                              });
                                          }
                                      });

                                  });
                              }
                          });
                      } else {
                          layer.msg(res.state, {
                              icon: 5,
                              anim: 6
                          });
                      }
                  },
                  error: function () {
                      layer.closeAll('loading');
                  }
              });
              $.post('/wechat', {}, function (json) {
                  json = json || {};
                  if (json.data) {
                      var btn_save_wechat_id = $('#btn_save').attr('data-wechat-id'); // LGD 01-16
                      $.each(json.data, function (index, data) {
                          if (data.id == btn_save_wechat_id)
                              var select = 'selected';
                          else
                              var select = '';
                          $("#saveart_wechat").prepend("<option " + select + " value='" + data.id + "' id='func_" + data.id + "' data-func='" + data.func_info + "'>" + data.nick_name + "</option>");
                      });
                      form.render('select');
                      $(".save-type-art .layui-anim-upbit dd:last").attr("onclick", "window.open('/wechat?add=1');");
                      form.on('select(wechat)', function (data) {
                          if (data.value == -1) {
                              $('.layui-form').find('select').val(0);
                              form.render('select');
                              $(".save-type-art .layui-anim-upbit dd:last").attr("onclick", "window.open('/wechat?add=1');");

                              save_wechat = 0
                              return !1
                          } else {
                              save_wechat = data.value;
                              if (data.value > 0) {
                                  var htmlObj = $('<div>' + $.trim(editor.getContent()) + '</div>'),
                                      layer_tips = '';
                                  ;
                                  if (htmlObj.find('audio').length > 0) layer_tips += ' Audio';
                                  if (htmlObj.find('video').length > 0) layer_tips += ' Video';
                                  if (htmlObj.find('embed').length > 0) layer_tips += ' Embed';
                                  if (layer_tips) layer.tips('<span style="font-size:12px">内容包含' + layer_tips + ',同步后将自动过滤</span>', $(data.elem).next(), {
                                      tips: [1, '#FF5722']
                                  });
                                  $('#saveart_wechat').parent().parent().find('.layui-btn').remove();
                                  var func = $('#func_' + data.value).data('func');
                                  if ($.inArray("11", func.split(",")) < 0) {
                                      layer.alert('此公众号未授权素材管理权限，无法同步！<br>请重新<a href="/wechat?add=1" target="_blank" style="color:#01AAED">授权绑定</a>公众号', {
                                          icon: 5
                                      });
                                      $('.layui-form').find('select').val(0);
                                      form.render('select');
                                      $(".layui-anim-upbit dd:last").attr("onclick", "window.open('/wechat?add=1');");
                                      save_wechat = 0
                                  }
                              }
                          }
                      });
                  }
              });
              // LGD 11-07 文章分类
              getUserCate(function (content) {
                  $('#article_cate option:first-child').after(content);
                  form.render('select');
              });
              // LGD
              form.on('select(select-articleCate)', function (data) {
                  var id = data.value;
                  if (id == 'dd') { // selected 为选择分类时
                      $('#article_cate option:first-child').attr('selected', true);
                      form.render('select');
                      editCate(function () { // 分类编辑
                          $('#article_cate').html('<option value="0">默认</option>');
                          getUserCate(function (content) {
                              $('#article_cate option:first-child ').after(content); // 添加
                              $('#article_cate option:last-child').after('<option value="dd">++添加文章分类++</option>');
                              form.render('select');
                          });
                      });
                  }
              });
              form.render('radio');
              form.render('checkbox');
              form.on('radio(save_type)', function (data) {
                  if (save_id) {
                      if (data.value != save_type) {
                          $('.save-cover-original').hide();
                      } else {
                          $('.save-cover-original').show();
                      }
                  }
                  if (data.value == 'tpl') {
                      $('.save-type-art').hide();
                      $('.save-type-tpl').show();
                      $('#save_art_storage_type').hide(); // LGD 01-16
                  } else {
                      $('.save-type-tpl').hide();
                      $('.save-type-art').show();
                      $('#save_art_storage_type').show(); // LGD 01-16
                  }
              });
              form.on('submit(savetpl)', function (data) {
                  if (!$('.save-cover-original').is(':hidden') && $('#saveart_original').is(':checked')) {
                      layer.confirm('你正在进行覆盖原文操作，确定继续吗？', function () {
                          window.confirm_savetpl(data, save_id, index);
                      });
                  } else {
                      window.confirm_savetpl(data, save_id, index);
                  }
                  return !1;
              });
              form.on('submit(saveart)', function (data, layero) {
                  if (!$('.save-cover-original').is(':hidden') && $('#saveart_original').is(':checked')) {
                      layer.confirm('你正在进行覆盖原文操作，确定继续吗？', function () {
                          window.confirm_saveart(data, save_id, index, save_wechat);
                      });
                  } else {
                      window.confirm_saveart(data, save_id, index, save_wechat);
                  }
                  return !1;
              });
          }
      });
  });
  window.confirm_savetpl = function (data, save_id, index) {
      $(data.elem).attr('disabled', true);
      save_name = $('#saveart_name').val(), save_thumbnail = $('#saveart_thumbnail').val();
      var loading = layer.load(2, {
              shade: [.2, '#000']
          }),
          htmlObj = $('<div>' + $.trim(editor.getContent()) + '</div>'),
          save_original = $('#saveart_original').is(':checked');
      //save_cate_id = $('#article_cate').find('option:selected').val();// LGD 文章分類
      htmlObj.find('.tool-border').remove();
      $.post('/indexajax/savetpl', {
          id: save_id,
          name: save_name,
          thumbnail: save_thumbnail,
          original: $('.save-cover-original').is(':hidden') ? 'false' : $('#saveart_original').is(':checked'),
          content: htmlObj.html()
      }, function (json) {
          json = json || {};
          layer.close(loading);
          if (json.status == -1) {
              layer.close(index);
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == -2) {
              layer.close(index);
              // buy_vip_tips();
              // return false;
              layer.open({
                  type: 1,
                  shade: 0.4,
                  title: false,
                  content: '<p style="padding:20px 20px 0">保存的模板数已经超过VIP授权</p><div class="layui-layer-btn"><a class="layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
              });
          } else if (json.status == 1) {
              $("#btn_save").attr('data-type', 'tpl');
              $("#btn_save").attr('data-id', json.id);
              $("#btn_save").attr('data-name', save_name);
              $("#btn_save").attr('data-thumbnail', save_thumbnail);
              layer.msg("保存成功", {
                  icon: 1,
                  time: 1E3
              }, function () {
                  layer.close(index);
                  if ($("#iframe_save_tpl", parent.document).length) {
                      $("#iframe_save_tpl", parent.document).attr('src', $("#iframe_save_tpl", parent.document).attr('src'));
                  }
              })
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              }, function () {
                  $(data.elem).attr('disabled', false);
              })
          }
      }).fail(function () {
          layer.close(loading);
          layer.msg("\u670d\u52a1\u5668\u8fde\u63a5\u5931\u8d25", {
              icon: 2,
              anim: 6
          }, function () {
              $(data.elem).attr('disabled', false);
          })
      })
  }
  window.confirm_saveart = function (data, save_id, index, save_wechat) {
      $(data.elem).attr('disabled', true);
      save_name = $('#saveart_name').val(), save_summary = $('#saveart_summary').val(), save_thumbnail = $('#saveart_thumbnail').val(), save_link = $('#saveart_link').val(), save_author = $('#saveart_author').val(), save_artcover = $('#saveart_artcover').is(':checked') ? 1 : 0;
      save_cate_id = $('#article_cate').find('option:selected').val(); // LGD 文章分類
      var loading = layer.load(2, {
              shade: [.2, '#000']
          }),
          htmlObj = $('<div>' + $.trim(editor.getContent()) + '</div>');
      htmlObj.find('.tool-border').remove();
      ;
      $.post('/indexajax/saveart', {
          thumb_media_id: $('#thumb_media_id').val(),
          cate_id: save_cate_id,
          id: save_id,
          name: save_name,
          summary: save_summary,
          thumbnail: save_thumbnail,
          link: save_link,
          author: save_author,
          artcover: save_artcover,
          original: $('.save-cover-original').is(':hidden') ? 'false' : $('#saveart_original').is(':checked'),
          content: htmlObj.html()
      }, function (json) {
          json = json || {};
          layer.close(loading);
          if (json.status == -1) {
              layer.close(index);
              layer.msg("登录超时，请重新登录", {
                  time: 1000,
                  anim: 6
              }, function () {
                  floatlogin();
              })
          } else if (json.status == -2) {
              layer.close(index);
              // buy_vip_tips();
              // return false;

              layer.open({
                  type: 1,
                  shade: 0.4,
                  title: false,
                  content: '<p style="padding:20px 20px 0">保存的文章数已经超过VIP授权</p><div class="layui-layer-btn"><a class="layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
              });
          } else if (json.status == 1) {
              $("#btn_save").attr('data-type', 'art');
              $("#btn_save").attr('data-id', json.id);
              $("#btn_save").attr('data-name', save_name);
              $("#btn_save").attr('data-summary', json.summary);
              $("#btn_save").attr('data-thumbnail', save_thumbnail);
              $("#btn_save").attr('data-link', save_link);
              $("#btn_save").attr('data-author', save_author);
              $("#btn_save").attr('data-artcover', save_artcover);
              layer.msg("保存成功", {
                  icon: 1,
                  time: 1E3
              }, function () {
                  layer.close(index);
                  if ($("#iframe_save_art", parent.document).length) {
                      $("#iframe_save_art", parent.document).attr('src', $("#iframe_save_art", parent.document).attr('src'));
                  }
                  // LGD 01-16
                  if (save_wechat) {
                      var data_wechat_cover = $('#btn_save').attr('data-wechat-cover');
                      if (typeof data_wechat_cover != 'undefined' && data_wechat_cover && (save_wechat = $('#btn_save').attr('data-save-wechat'))) { // LGD 01-09
                          layer.msg('更新中...', {
                              icon: 16,
                              shade: 0.05,
                              time: 100000
                          });
                          $.ajax({ // LGD 更新 01-09
                              type: "post",
                              url: "/wechat/updateUserWxMaterial",
                              data: {
                                  art_id: json.id,
                                  wechat_id: save_wechat,
                                  media_id: $('#btn_save').attr('data-media-id'),
                                  thumb_media_id: $('#btn_save').attr('data-thumb-media-id'),
                                  'item_id': $('#btn_save').attr('data-item-id')
                              },
                              timeout: 90000,
                              dataType: 'json',
                              success: function (datasync) {
                                  layer.closeAll();
                                  if (datasync["status"] == 0) {
                                      if (datasync['info'].indexOf('61023') != -1) {
                                          layer.alert('公众号授权过期,请从新授权公众号!');
                                      } else {
                                          layer.alert('[同步出错]失败原因:' + datasync.info);
                                      }
                                  } else if (datasync["status"] == 1) {
                                      // 此处 ?
                                      /*$('#btn_save').removeAttr('data-wechat-cover')
                                       $('#btn_save').removeAttr('data-media-id');
                                       $('#btn_save').removeAttr('data-thumb-media-id');
                                       $('#btn_save').removeAttr('data-save-wechat');
                                       $('#btn_save').removeAttr('data-wechat-id');
                                       */
                                      layer.msg('更新成功', {
                                          icon: 1,
                                          time: 1800
                                      });
                                  } else if (datasync["status"] == -1) {
                                      layer.msg("登录超时，请重新登录", {
                                          time: 1000,
                                          anim: 6
                                      }, function () {
                                          floatlogin();
                                      })
                                  } else {
                                      layer.alert('更新出错,未知原因');
                                  }
                              },
                              error: function (XMLHttpRequest, status) {
                                  layer.closeAll();
                                  layer.alert('更新超时，同步图片过多，请从同步微信中继续同步！');
                              }
                          });
                      } else {
                          layer.msg('同步中...', {
                              icon: 16,
                              shade: 0.05,
                              time: 100000
                          });
                          $.ajax({
                              type: "post",
                              url: "/wechat/sync",
                              data: {
                                  art_id: json.id,
                                  wechat_id: save_wechat
                              },
                              timeout: 90000,
                              dataType: 'json',
                              success: function (datasync) {
                                  layer.closeAll();
                                  if (datasync["status"] == 0) {
                                      layer.alert(datasync.info);
                                  } else if (datasync["status"] == 1) {
                                      var loading = layer.msg('同步中...', {
                                          icon: 16,
                                          shade: 0.05,
                                          time: 100000
                                      });
                                      $.post('/wechat/sync', {
                                          art_id: json.id,
                                          wechat_id: save_wechat,
                                          access_token: datasync.access_token,
                                          articles: datasync.articles
                                      }, function (data_sync) {
                                          layer.close(loading);
                                          data_sync = data_sync || {};
                                          if (data_sync.status == -1) {
                                              layer.msg("登录超时，请重新登录", {
                                                  time: 1000,
                                                  anim: 6
                                              }, function () {
                                                  floatlogin();
                                              })
                                          } else if (data_sync.status == 1) {
                                              layer.open({
                                                  type: 2,
                                                  area: ['600px', '600px'],
                                                  move: false,
                                                  shade: 0.4,
                                                  skin: 'float-sync',
                                                  title: '同步到微信',
                                                  content: "/wechat/syncdone/media_id/" + data_sync.media_id + "/wechat_id/" + data_sync.wechat_id,
                                                  success: function (layero, index) {
                                                  }
                                              });
                                          } else {
                                              layer.msg(data_sync.info, {
                                                  icon: 5,
                                                  anim: 6
                                              })
                                          }
                                      }).fail(function () {
                                          layer.close(loading);
                                          layer.msg("服务器连接失败", {
                                              icon: 2,
                                              anim: 6
                                          });
                                      });
                                  } else if (datasync["status"] == 2) {
                                      layer.open({
                                          type: 2,
                                          area: ['600px', '600px'],
                                          shade: 0.4,
                                          skin: 'float-sync',
                                          title: '同步到微信',
                                          content: "/wechat/syncdone/media_id/" + datasync.media_id + "/wechat_id/" + datasync.wechat_id,
                                          success: function (layero, index) {
                                          }
                                      });
                                  } else if (datasync["status"] == -1) {
                                      layer.msg("登录超时，请重新登录", {
                                          time: 1000,
                                          anim: 6
                                      }, function () {
                                          floatlogin();
                                      })
                                  } else {
                                      layer.alert('同步出错,未知原因');
                                  }
                              },
                              error: function (XMLHttpRequest, status) {
                                  layer.closeAll();
                                  layer.alert('同步超时，同步图片过多，请从同步微信中继续同步！');
                              }
                          });
                      }
                  }
              })
          } else {
              layer.msg(json.info, {
                  icon: 5,
                  anim: 6
              }, function () {
                  $(data.elem).attr('disabled', false);
              })
          }
      }).fail(function () {
          layer.close(loading);
          layer.msg("\u670d\u52a1\u5668\u8fde\u63a5\u5931\u8d25", {
              icon: 2,
              anim: 6
          }, function () {
              $(data.elem).attr('disabled', false);
          })
      })
  }
  window.chuangkit_Complate = function (eve) {
      if (eve.cktMessage && eve['thumb-urls']) {
          var loading = layer.load(2, {
              shade: [.2, '#000']
          });
          $.post(editor.getActionUrl(editor.getOpt('imageActionName')) + '?sj=1', {
              url: 'http:' + eve['thumb-urls'][0]
          }, function (res) {
              layer.closeAll('loading');
              if (res.state == 'SUCCESS' && res.url) {
                  var imgurl = editor.getOpt('imageUrlPrefix') + (res.url.substr(0, 1) == '/' ? res.url : '/' + res.url);
                  editor.execCommand('insertimage', {
                      src: imgurl,
                      _src: imgurl
                  });
              } else {
                  layer.msg(res.state, {
                      icon: 5,
                      anim: 6
                  });
              }
          }, "json").fail(function () {
              layer.close(loading);
              layer.msg("服务器连接失败", {
                  icon: 2,
                  anim: 6
              })
          });
      }
  }
  window.zhaotu_Complate = function(url){
      var loading = layer.load(2, {shade: [.2,'#000']});
      $.post(editor.getActionUrl(editor.getOpt('imageActionName'))+'?sj=1',{url:url}, function(res) {
          layer.closeAll('loading');
          if(res.state == 'SUCCESS' && res.url){
              var imgurl = editor.getOpt('imageUrlPrefix') + (res.url.substr(0,1) == '/' ? res.url : '/' + res.url);
              editor.execCommand('insertimage',{src:imgurl,_src:imgurl});
          }else{
              layer.msg(res.state,{icon:5,anim:6});
          }
      }, "json").fail(function() {
          layer.close(loading);
          layer.msg("服务器连接失败", {icon: 2,anim: 6})
      })
  }
  window.fonttoimg_Complate = function (url) {
      var loading = layer.load(2, {
          shade: [.2, '#000']
      });
      $.post(editor.getActionUrl(editor.getOpt('imageActionName')) + '?sj=1', {
          url: 'http:' + url
      }, function (res) {
          layer.closeAll('loading');
          if (res.state == 'SUCCESS' && res.url) {
              var imgurl = editor.getOpt('imageUrlPrefix') + (res.url.substr(0, 1) == '/' ? res.url : '/' + res.url);
              editor.execCommand('insertimage', {
                  src: imgurl,
                  _src: imgurl
              });
              layer.msg("图片成功插入", {
                  icon: 1
              });
              layer.closeAll('iframe');
          } else {
              layer.msg(res.state, {
                  icon: 5,
                  anim: 6
              });
          }
      }, "json").fail(function () {
          layer.close(loading);
          layer.msg("服务器连接失败", {
              icon: 2,
              anim: 6
          })
      })
  }
  window.fonttoimg = function (id) {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if ($('#user_vip').data('vip') < 2) {
          // buy_vip_tips();
          // return false;
          layer.open({
              type: 1,
              shade: 0.4,
              title: false,
              content: '<p style="padding:20px 20px 0">收费会员才可以使用此功能</p><div class="layui-layer-btn"><a class="layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
          });
          return !1;
      }
      layer.open({
          type: 2,
          area: ['689px', '600px'],
          shade: 0.4,
          skin: 'float-fonttoimg',
          title: '字体设计(VIP)',
          content: '/material/fonttoimg?t=1&id=' + id,
          success: function (layero, index) {
          }
      });
  }

  /*
  window.meitu_image = function (img) {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 1,
          area: ['600px', '500px'],
          shade: 0.4,
          skin: 'float-meitu',
          title: '美图编辑',
          content: '<div id="MeituContent">正在加载美图秀秀编辑器，请稍候重试...</div>',
          success: function (layero, index) {
              xiuxiu.setLaunchVars("titleVisible", 0);
              xiuxiu.embedSWF("MeituContent", 1, "100%", "100%");
              xiuxiu.setUploadURL(editor.getActionUrl(editor.getOpt('imageActionName')) + '?mt=1');
              xiuxiu.setUploadType(2);
              xiuxiu.setUploadDataFieldName("upfile");
              xiuxiu.onBeforeUpload = function (data) {
                  if (data.size > editor.getOpt('imageMaxSize')) {
                      layer.msg('图片大小超出限制', {
                          icon: 0
                      });
                      return false;
                  }
              }
              xiuxiu.onInit = function () {
                  if (img.indexOf('.' + document.domain) < 0) img = editor.getActionUrl(editor.getOpt('xiuxiuActionName')) + '?url=' + encodeURIComponent(img);
                  xiuxiu.loadPhoto(img);
              }
              xiuxiu.onUploadResponse = function (data) {
                  editor.undoManger.save(true);
                  var json = eval('(' + data + ')');
                  if (typeof json.state == "undefined") {
                      layer.msg(data, {
                          icon: 2,
                          anim: 6
                      });
                  } else if (json.state == 'SUCCESS' && json.url) {
                      var imgurl = editor.getOpt('imageUrlPrefix') + (json.url.substr(0, 1) == '/' ? json.url : '/' + json.url);
                      editor.execCommand('insertimage', {
                          src: imgurl,
                          _src: imgurl
                      });
                      editor.undoManger.save(true);
                      layer.close(index);
                  } else {
                      layer.msg(json.state, {
                          icon: 5,
                          anim: 6
                      });
                  }
              }
              xiuxiu.onClose = function () {
                  layer.close(index);
              }
          }
      });
  }
  */
  window.meitu_image = function(img) {
     /* var ext = img.split('.');
      ext = ext[ext.length - 1];
      console.log(ext);
      return false;
      var filename = 'gaoding.' + ext;
      filename = filename.replace('?','');*/

      var filename = 'gaoding.jpg';
      var gdEditor = new GdEditorSdk({
          appId: 'bj_96weixin_com',
          autoClose: false,
          buttonText: '完成',
          onCompleted: function (params) {
            layer.load(1, {
                      shade: [0.1]
              });
              const form = new FormData();
              form.append('upfile', params.blob,filename);
              $.ajax({
                  url: '/ueditor/uploadimage?fm=mt',
                  type: 'post',
                  contentType: false,
                  processData:false,
                  data: form,
                  success: function (json) {
                      json = $.parseJSON(json);
                      if (typeof json.state == "undefined") {
                        layer.closeAll();
                        gdEditor.close();
                          layer.msg(json.errorCode, {
                              icon: 2,
                              anim: 6
                          });
                      } else if (json.state == 'SUCCESS' && json.url) {
                          var imgurl = editor.getOpt('imageUrlPrefix') + (json.url.substr(0, 1) == '/' ? json.url : '/' + json.url);
                          editor.execCommand('insertimage', {
                              src: imgurl,
                              _src: imgurl
                          });
                          editor.undoManger.save(true);
                          layer.closeAll();
                          gdEditor.close();
                      } else {
                        layer.closeAll();
                        gdEditor.close();
                          layer.msg(json.state, {
                              icon: 5,
                              anim: 6
                          });
                      }
                  },
                  error: function() {
                    layer.closeAll();
                    gdEditor.close();
                    layer.msg('网络出错');
                  }
              });
          },
          style: {}
      });
      gdEditor.open({
          ext: {
              url: img
          }
      });
  }


  window.pintu_image = function (img) {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 1,
          area: ['600px', '500px'],
          shade: 0.4,
          skin: 'float-meitu',
          title: '拼图编辑',
          content: '<div id="PintuContent">正在加载美图秀秀编辑器，请稍候重试...</div>',
          success: function (layero, index) {
              xiuxiu.setLaunchVars("titleVisible", 0);
              xiuxiu.embedSWF("PintuContent", 2, "100%", "100%");
              xiuxiu.setUploadURL(editor.getActionUrl(editor.getOpt('imageActionName')) + '?mt=1');
              xiuxiu.setUploadType(2);
              xiuxiu.setUploadDataFieldName("upfile");
              xiuxiu.onBeforeUpload = function (data) {
                  if (data.size > editor.getOpt('imageMaxSize')) {
                      layer.msg('图片大小超出限制', {
                          icon: 0
                      });
                      return false;
                  }
              }
              xiuxiu.onInit = function () {
                  if (img.indexOf('.' + document.domain) < 0) img = editor.getActionUrl(editor.getOpt('xiuxiuActionName')) + '?url=' + encodeURIComponent(img);
                  xiuxiu.loadPhoto(img);
              }
              xiuxiu.onUploadResponse = function (data) {
                  editor.undoManger.save(true);
                  var json = eval('(' + data + ')');
                  if (typeof json.state == "undefined") {
                      layer.msg(data, {
                          icon: 2,
                          anim: 6
                      });
                  } else if (json.state == 'SUCCESS' && json.url) {
                      var imgurl = editor.getOpt('imageUrlPrefix') + (json.url.substr(0, 1) == '/' ? json.url : '/' + json.url);
                      editor.execCommand('insertimage', {
                          src: imgurl,
                          _src: imgurl
                      });
                      editor.undoManger.save(true);
                      layer.close(index);
                  } else {
                      layer.msg(json.state, {
                          icon: 5,
                          anim: 6
                      });
                  }
              }
              xiuxiu.onClose = function () {
                  layer.close(index);
              }
          }
      });
  }
  window.meitu_upload = function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 1,
          area: ['1000px', '80%'],
          shade: 0.4,
          skin: 'float-meitu',
          title: '美图编辑上传',
          content: '<div id="MeituAllContent">正在加载美图秀秀编辑器，请稍候重试...</div>',
          success: function (layero, index) {
              xiuxiu.setLaunchVars("titleVisible", 0);
              xiuxiu.setLaunchVars("customMenu", ["decorate", "facialMenu"]);
              xiuxiu.embedSWF("MeituAllContent", 3, "100%", "100%");
              xiuxiu.setUploadURL(editor.getActionUrl(editor.getOpt('imageActionName')) + '?mt=1');
              xiuxiu.setUploadType(2);
              xiuxiu.setUploadDataFieldName("upfile");
              xiuxiu.onBeforeUpload = function (data) {
                  if (data.size > editor.getOpt('imageMaxSize')) {
                      layer.msg('图片大小超出限制', {
                          icon: 0
                      });
                      return false;
                  }
              }
              xiuxiu.onUploadResponse = function (data) {
                  var json = eval('(' + data + ')');
                  if (typeof json.state == "undefined") {
                      layer.msg(data, {
                          icon: 2,
                          anim: 6
                      });
                  } else if (json.state == 'SUCCESS' && json.url) {
                      var imgurl = editor.getOpt('imageUrlPrefix') + (json.url.substr(0, 1) == '/' ? json.url : '/' + json.url);
                      editor.execCommand('insertimage', {
                          src: imgurl,
                          _src: imgurl
                      });
                      layer.close(index);
                  } else {
                      layer.msg(json.state, {
                          icon: 5,
                          anim: 6
                      });
                  }
              }
              xiuxiu.onClose = function () {
                  layer.close(index);
              }
          }
      });
  }
  // LGD 添加图片裁剪功能 11-27
  window.crop_image = function (imgurl) {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      /*if( imgurl.indexOf(editor.getOpt('imageUrlPrefix')) < 0 && imgurl.indexOf('newcdn') < 0){
       layer.msg('此图片不支持裁剪',{icon: 2,time: 1800});
       return false;
       }*/
      imgurl = imgurl.replace(/&/g, '%lgddgl%'); // 全局替换&
      layer.open({
          type: 2,
          title: '裁剪图片',
          skin: 'editcrop',
          area: ['450px', '520px'],
          content: '/crop/editorImgCrop?img_url=' + imgurl, //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
          success: function (layero, index) {
              // 监听子页面的确定按钮
              var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
              iframeWin.$('#confirm').click(function () {
                  layer.load(1, {
                      shade: [0.1]
                  });
                  postData = {
                      x: iframeWin.$('#x').val(),
                      y: iframeWin.$('#y').val(),
                      h: iframeWin.$('#h').val(),
                      w: iframeWin.$('#w').val(),
                      boundx: iframeWin.$('#boundx').val(),
                      img_url: imgurl,
                      log: 1
                  }
                  if (imgurl.indexOf(editor.getOpt('imageUrlPrefix')) >= 0) {
                      var postUrl = '/crop/crop';
                  } else { //if(imgurl.indexOf('newcdn') >= 0)
                      var postUrl = '/crop/upload';
                  }
                  $.post(postUrl, postData, function (res) {
                      layer.closeAll('loading');
                      if (res.status == 1) {
                          var imgurl = editor.getOpt('imageUrlPrefix') + (res.data.substr(0, 1) == '/' ? res.data : '/' + res.data);
                          /*layer.msg('裁剪成功',{icon: 1,time: 1800},function(){*/
                          editor.execCommand('insertimage', {
                              src: imgurl,
                              _src: imgurl
                          });
                          editor.undoManger.save(true);
                          layer.close(index);
                          /*});*/
                      } else {
                          layer.msg(res.msg, {
                              time: 1800,
                              icon: 2
                          }, function () {
                              layer.close(index);
                          });
                      }
                  });
              });
          }
      });
  }
  window.pintu_upload = function (img) {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      layer.open({
          type: 1,
          area: ['1000px', '80%'],
          shade: 0.4,
          skin: 'float-meitu',
          title: '拼图编辑上传',
          content: '<div id="PintuAllContent">正在加载美图秀秀编辑器，请稍候重试...</div>',
          success: function (layero, index) {
              xiuxiu.setLaunchVars("titleVisible", 0);
              xiuxiu.setLaunchVars("customMenu", ["puzzle"]);
              xiuxiu.embedSWF("PintuAllContent", 3, "100%", "100%");
              xiuxiu.setUploadURL(editor.getActionUrl(editor.getOpt('imageActionName')) + '?mt=1');
              xiuxiu.setUploadType(2);
              xiuxiu.setUploadDataFieldName("upfile");
              xiuxiu.onBeforeUpload = function (data) {
                  if (data.size > editor.getOpt('imageMaxSize')) {
                      layer.msg('图片大小超出限制', {
                          icon: 0
                      });
                      return false;
                  }
              }
              xiuxiu.onUploadResponse = function (data) {
                  var json = eval('(' + data + ')');
                  if (typeof json.state == "undefined") {
                      layer.msg(data, {
                          icon: 2,
                          anim: 6
                      });
                  } else if (json.state == 'SUCCESS' && json.url) {
                      var imgurl = editor.getOpt('imageUrlPrefix') + (json.url.substr(0, 1) == '/' ? json.url : '/' + json.url);
                      editor.execCommand('insertimage', {
                          src: imgurl,
                          _src: imgurl
                      });
                      layer.close(index);
                  } else {
                      layer.msg(json.state, {
                          icon: 5,
                          anim: 6
                      });
                  }
              }
              xiuxiu.onClose = function () {
                  layer.close(index);
              }
          }
      });
  }
  window.phone_upload = function () {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      $.ajaxSetup({
          ifModified: true,
          cache: true
      });
      $.getScript('//cdn.staticfile.org/jquery.qrcode/1.0/jquery.qrcode.min.js', function () {
          var ajax_interval = null;
          layer.open({
              type: 1,
              area: ['640px', '552px'],
              shade: 0.4,
              skin: 'float-phoneimage',
              title: '手机传图',
              btn: ['插入图片', '取消'],
              content: '<div id="myList"><ul class="list"></ul></div><div class="phone-upload-qrcode"><div id="qr_code"></div><p>扫码上传手机照片</p></div>',
              success: function (layero, index) {
                  var loading = layer.load(2, {
                          shade: [.2, '#000']
                      }),
                      content = '';
                  $.post('/ueditor/login', {}, function (json) {
                      json = json || {};
                      layer.close(loading);
                      if (json.status == -1) {
                          layer.close(index);
                          layer.msg("登录超时，请重新登录", {
                              time: 1000,
                              anim: 6
                          }, function () {
                              floatlogin();
                          })
                      } else if (json.status == 1) {
                          $('.float-phoneimage #qr_code').qrcode({
                              width: 140,
                              height: 140,
                              text: json.url
                          });
                          setTimeout(function () {
                              ajax_interval = setInterval(function () {
                                  if ($('.float-phoneimage').length) {
                                      $.get('/ueditor/phoneimage', {}, function (json) {
                                          json = json || {};
                                          if (json.status == -1) {
                                              layer.close(index);
                                              layer.msg("登录超时，请重新登录", {
                                                  time: 1000,
                                                  anim: 6
                                              }, function () {
                                                  floatlogin();
                                              })
                                          } else if (json.status == 1) {
                                              $(json.url).each(function (index, item) {
                                                  $(".float-phoneimage ul.list").append('<li><div class="cover"><img src="' + editor.getOpt('imageUrlPrefix') + (item.substr(0, 1) == '/' ? item : '/' + item) + '"></div></li>');
                                              });
                                              if ($("#iframe_picture", parent.document).length) {
                                                  $("#iframe_picture", parent.document).attr('src', $("#iframe_picture", parent.document).attr('src'));
                                              }
                                          }
                                      });
                                  } else {
                                      clearInterval(ajax_interval);
                                  }
                              }, 3000);
                          }, 8000);
                      } else {
                          layer.msg(json.info, {
                              icon: 5,
                              anim: 6
                          })
                      }
                  }).fail(function () {
                      layer.close(loading);
                      layer.msg("服务器连接失败", {
                          icon: 2,
                          anim: 6
                      })
                      return !1
                  });
              },
              yes: function (index, layero) {
                  var list = [];
                  $('.float-phoneimage #myList li').each(function () {
                      var img = $(this).find('img:first');
                      list.push({
                          src: img.attr('src'),
                          _src: img.attr('src'),
                          alt: img.attr('src').substr(img.attr('src').lastIndexOf('/') + 1)
                      });
                  });
                  if (list.length > 0) {
                      editor.execCommand('insertimage', list);
                      layer.close(index);
                  } else {
                      layer.msg("还没有上传图片呢", {
                          icon: 2,
                          anim: 6
                      })
                  }
              }
          });
      });
  }
  window.layermsg = function (content, icon) {
      if (icon == 2 || icon == 5) {
          layer.msg(content, {
              icon: icon,
              anim: 6
          })
      } else if (typeof icon != 'undefined') {
          layer.msg(content, {
              icon: icon
          })
      } else {
          layer.msg(content, {
              icon: 1
          })
      }
  }
  window.layermsglogin = function () {
      layer.msg('必须登录后才能执行该操作', {
          time: 1000,
          anim: 6
      }, function () {
          floatlogin()
      });
      return !1
  }
  window.layermsgupgrade = function (content) {
      //  buy_vip_tips();
      // return false;
      layer.open({
          type: 1,
          shade: 0.4,
          title: false,
          content: '<p style="padding:20px 20px 0">' + content + '</p><div class="layui-layer-btn"><a class="layui-layer-btn0" href="/product" target="_blank">升级VIP</a></div>',
      });
      return !1
  }
  window.getSelectionHtml = function () {
      var range = editor.selection.getRange();
      if (range.startContainer.tagName == 'BODY' && range.startContainer === range.endContainer && range.endOffset > 0 && range.endOffset === range.startContainer.childNodes.length) {
          return (OuterCopy != 1) ? getEditorHtml(true) : getEditorHtml();
      } else {
          range.select();
          var selectionObj = editor.selection.getNative();
          var rangeObj = selectionObj.getRangeAt(0);
          var docFragment = rangeObj.cloneContents();
          var testDiv = document.createElement("div");
          testDiv.appendChild(docFragment);
          return (testDiv.innerHTML == "") ? "" : (OuterCopy != 1 ? parseEditorHtml(testDiv.innerHTML, true) : parseEditorHtml(testDiv.innerHTML));
      }
  }
  window.parseInsertPasteSetHtml = function (outer) {
      var htmlObj = $('<div>' + strip_stack_span(outer) + '</div>');
      if (0 < htmlObj.find("[donone]").size()) { //ipaiban
          htmlObj.find("[donone]").removeAttr("id").removeAttr("donone").attr("class", "_editor");
          htmlObj.find(".color,.shifubrush,.wihudong").removeClass("color").removeClass("shifubrush").removeClass("wihudong");
          htmlObj.find("#wrap_node:first").each(function () {
              $(this).replaceWith($(this).html());
          });
      }
      if (0 < htmlObj.find(".yead_editor").size()) { //wxeditor
          htmlObj.find(".yead_editor").removeClass("yead_editor").removeClass("yead-selected").removeAttr("id").attr("class", "_editor");
          htmlObj.find(".wx-bg").each(function () {
              var bgurl = $(this).attr("data-wxsrc");
              this.style.backgroundImage = 'url("' + RemoteUrl + bgurl.replace('https:/', '').replace('http:/', '') + '")';
              $(this).removeClass("wx-bg").removeAttr("data-wxsrc").addClass("_bg");
          });
          htmlObj.find("article._editor").each(function () {
              $(this).replaceWith('<section class="_editor"' + (typeof $(this).attr('style') == "undefined" ? '' : ' style="' + $(this).attr('style') + '"') + '>' + $(this).html() + '</section>');
          });
          htmlObj.find("section[data-author=Wxeditor]:first").each(function () {
              $(this).replaceWith($(this).html());
          });
      }
      if (0 < htmlObj.find("._xmyeditor").size()) { //xmyeditor
          htmlObj.find("._xmyeditor").removeClass("_xmyeditor").attr("class", "_editor");
          htmlObj.find(".wxqq-bg").removeClass("_wxqq-bg").removeAttr("id").attr("class", "_bg");
          htmlObj.find(".xmyeditor:first").each(function () {
              $(this).replaceWith($(this).html());
          });
      }
      if (0 < htmlObj.find(".videaba").size()) { //videaba
          htmlObj.find(".videaba").removeClass("videaba").removeClass("videabanow").removeAttr("id").removeAttr("data-color").attr("class", "_editor");
          htmlObj.find(".videababg").each(function () {
              if (this.style.backgroundImage) this.style.backgroundImage = 'url("' + $(this).attr("data-wxurl") + '")';
              $(this).removeClass("videababg").removeAttr("data-wxurl").addClass("_bg");
          });
          htmlObj.find("img[data-wxurl]").each(function () {
              $(this).attr('src', $(this).attr('data-wxurl')).removeAttr("data-wxurl");
          });
          htmlObj.find(".videabaArticle:first").each(function () {
              $(this).replaceWith($(this).html());
          });
      }
      if (0 < htmlObj.find(".RankEditor").size()) { //newrank
          htmlObj.find(".RankEditor").removeClass("RankEditor").attr("class", "_editor");
          htmlObj.find(".RankEditor-Select").remove();
          htmlObj.find(".brush,.title").removeClass("brush").removeClass("title").removeClass("white").removeClass("active").addClass("_brush");
      }
      if (0 < htmlObj.find(".editor").size()) { //96&zhubian
          htmlObj.find(".editor").removeClass("editor").removeClass("selected").attr("class", "_editor");
          htmlObj.find(".96wx-chbg,.96wx-img,.96wx-bgpic").removeClass("96wx-chbg").removeClass("96wx-img").removeClass("96wx-bgpic").addClass("_bg");
          htmlObj.find(".96wx-layout").removeClass("96wx-layout").addClass("_layout");
          htmlObj.find(".96wx-bdbc").removeClass("96wx-bdbc").addClass("_brush");
      }
      if (0 < htmlObj.find("._appeditor").size() || 0 < htmlObj.find(".appeditor").size()) { //135
          htmlObj.find(".article135:first,section[data-role=outer]:first").each(function () {
              $(this).css("background-color") || $(this).css("background-image") ? $(this).removeAttr("class").addClass("_editor_bg") : $(this).replaceWith($(this).html());
          });
          htmlObj.find("._appeditor,.appeditor").removeClass("_appeditor").removeClass("active").removeClass("appeditor").attr("class", "_editor");
          htmlObj.find(".135bg").removeClass("135bg").addClass("_bg");
          htmlObj.find(".135brush").removeClass("135brush").removeAttr("data-brushtype").addClass("_brush");
          htmlObj.find(".article135").removeClass("article135").addClass("_editor_bg");
          htmlObj.find(".layout,.135layout").removeClass("layout").removeClass("135layout").addClass("_layout");
      }
      //xiumi
      htmlObj.find(".Powered-by-XIUMI").removeClass("Powered-by-XIUMI").removeClass("V5").attr("class", "_editor");
      //全局
      htmlObj.find("[label],[powered-by],[data-role],[data-by],[data-id],[data-tools],[data-author],[data-remoteid]").removeAttr("label").removeAttr("powered-by").removeAttr("data-role").removeAttr("data-by").removeAttr("data-id").removeAttr("data-tools").removeAttr("data-author").removeAttr("data-remoteid");
      htmlObj.find(".tool-border").remove();
      htmlObj.find('*').each(function () {
          $(this).removeAttr("referrerpolicy").removeAttr("data-w").removeAttr("data-type").removeAttr("data-ratio");
          if ($(this).attr('class') == "") $(this).removeAttr("class");
          if ($(this).hasClass("_editor") && this.style.position) this.style.position = '';
          if ($(this).attr('style') == "" || $(this).attr('style') == ";") $(this).removeAttr("style");
          if ($(this).attr('data-width')) this.style.width = $(this).attr('data-width');
          if ("IMG" == this.tagName.toUpperCase()) {
              var e = (this.src && "" != this.src) ? this.src : $(this).attr("data-src");
              $(this).removeAttr("data-src").removeAttr("crossorigin").removeAttr("_width").removeAttr("data-fail").removeAttr("title");
              if ("undefined" == typeof e || "" == e) {
                  $(this).remove();
                  return
              }
              e = e.replace("&amp;", "&");
              e = e.replace(/&wxfrom=\d+/g, "");
              e = e.replace(/wxfrom=\d+/g, "");
              e = e.replace(/&wx_lazy=\d+/g, "");
              e = e.replace(/wx_lazy=\d+/g, "");
              e = e.replace(/&tp=[a-z]+/g, "");
              e = e.replace(/tp=[a-z]+/g, "");
              e = e.replace(/&fr=[0-9a-z]+/g, "");
              e = e.replace(/fr=[0-9a-z]+/g, "");
              e = e.replace(/&rd=[0-9a-zA-Z]+/g, "");
              e = e.replace(/rd=[0-9a-zA-Z]+/g, "");
              e = e.replace(/\?&/g, "?");
              e = e.replace(/\?$/g, "");
              if (0 <= e.indexOf("//mmbiz.qlogo.cn") || 0 <= e.indexOf("//mmbiz.qpic.cn") || 0 <= e.indexOf("//mmsns.qpic.cn")) e = RemoteUrl + e.replace('https:/', '').replace('http:/', '').replace('mmbiz.qpic.cn', 'mmbiz.qlogo.cn');
              $(this).attr("src", e);
              $(this).attr("_src", e)
          } else if ("SECTION" == this.tagName.toUpperCase() && (e = $(this).attr("style")) && (e = e.replace("&amp;", "&")) && (0 <= e.indexOf("//mmbiz.qlogo.cn") || 0 <= e.indexOf("//mmbiz.qpic.cn") || 0 <= e.indexOf("//mmsns.qpic.cn"))) {
              var b = null,
                  f = /['|"|\(]\s*(https?:\/\/mmbiz\.qlogo\.cn\/([^;\\)]+?))['|"|\)]/i;
              (f = e.match(f)) && f[0] ? b = f[1] : (f = /['|"|\(]\s*(https:\/\/mmbiz\.qpic\.cn\/([^;\\)]+?))['|"|\)]/i, (f = e.match(f)) && f[0] ? b = f[1] : (f = /['|"|\(]\s*(https?:\/\/mmsns\.qpic\.cn\/([^;\\)]+?))['|"|\)]/i, (f = e.match(f)) && f[0] && (b = f[1])));
              b && (b = b.replace(/&wxfrom=\d+/g, ""), b = b.replace(/wxfrom=\d+/g, ""), b = b.replace(/&wx_lazy=\d+/g, ""), b = b.replace(/wx_lazy=\d+/g, ""), b = b.replace(/&tp=[a-z]+/g, ""), b = b.replace(/tp=[a-z]+/g, ""), b = b.replace(/&fr=[0-9a-z]+/g, ""), b = b.replace(/fr=[0-9a-z]+/g, ""), b = b.replace(/&tp=[a-z]+/g, ""), b = b.replace(/tp=[a-z]+/g, ""), b = b.replace(/&fr=[0-9a-zA-Z]+/g, ""), b = b.replace(/fr=[0-9a-zA-Z]+/g, ""), b = b.replace(/&rd=[0-9a-zA-Z]+/g, ""), b = b.replace(/rd=[0-9a-zA-Z]+/g, ""), b = b.replace(/\?&/g, "?"), b = b.replace(/\?&/g, "?"), $(this).attr("style", e.replace(f[1], RemoteUrl + b.replace('https:/', '').replace('http:/', ''))));
              var b = null,
                  f = /['|"|\(]\s*(https?:\/\/mmbiz\.qpic\.cn\/([^;\\)]+?))['|"|\)]/i;
              (f = e.match(f)) && f[0] ? b = f[1] : (f = /['|"|\(]\s*(https:\/\/mmbiz\.qlogo\.cn\/([^;\\)]+?))['|"|\)]/i, (f = e.match(f)) && f[0] ? b = f[1] : (f = /['|"|\(]\s*(https?:\/\/mmsns\.qpic\.cn\/([^;\\)]+?))['|"|\)]/i, (f = e.match(f)) && f[0] && (b = f[1])));
              b && (b = b.replace(/&wxfrom=\d+/g, ""), b = b.replace(/wxfrom=\d+/g, ""), b = b.replace(/&wx_lazy=\d+/g, ""), b = b.replace(/wx_lazy=\d+/g, ""), b = b.replace(/&tp=[a-z]+/g, ""), b = b.replace(/tp=[a-z]+/g, ""), b = b.replace(/&fr=[0-9a-z]+/g, ""), b = b.replace(/fr=[0-9a-z]+/g, ""), b = b.replace(/&tp=[a-z]+/g, ""), b = b.replace(/tp=[a-z]+/g, ""), b = b.replace(/&fr=[0-9a-zA-Z]+/g, ""), b = b.replace(/fr=[0-9a-zA-Z]+/g, ""), b = b.replace(/&rd=[0-9a-zA-Z]+/g, ""), b = b.replace(/rd=[0-9a-zA-Z]+/g, ""), b = b.replace(/\?&/g, "?"), b = b.replace(/\?&/g, "?"), $(this).attr("style", e.replace(f[1], RemoteUrl + b.replace('https:/','').replace('http:/','').replace('mmbiz.qpic.cn','mmbiz.qlogo.cn'))));
          }
      });
      return htmlObj.html();
  }

  // LGD 2020-02-20 快速保存方法
  window.fast_save = function(cb) {
      // 缓存文章的前五个字，20~30个字，第一图片地址
      $.ajax({
          url: '/indexajax/fastSave',
          data: {
              content: editor.getContent(),
              article_id: $('#btn_fast_save').attr('data-id'),
          },
          type: 'post',
          success: function(data) {
              if (data.status == 200) {
                  if (cb) {
                      cb && cb(data);
                  } else {
                      layer.msg(data.msg,{icon: 6,time: 1500});
                  }

                  // 刷新我的保存页面
                  if ($("#iframe_save_art", parent.document).length) {
                      $("#iframe_save_art", parent.document).attr('src', $("#iframe_save_art", parent.document).attr('src'));
                  }
              }else if (data.status == -1 ) {
                  floatlogin();
              } else {
                  layer.msg(data.msg,{icon: 5,time: 1500});
              }
          },
          error: function() {

          }
      });
  }


  // LGD 2020-03-23 音乐播放
  window.play_music = function(e) {
      if (e.hasClass('playing')) {
          $(e.css('backgroundPositionY','0px')).removeClass('playing');
          $('embed').remove();      //  移除音乐
          return false;
      }
      var qqmusic = $(e).parents('._editor').find('qqmusic');

      if(qqmusic != null){
          var audiourl = qqmusic.attr('audiourl');
          if(typeof audiourl != "undefined"){
              var time = new Date().getUTCMilliseconds(), guid = Math.round(2147483647 * Math.random()) * time % 1e10, songmid = qqmusic.attr('mid'), fileName = "C400" + songmid + ".m4a",audio_url = '';
              var that = this;
              if($(this).parent().hasClass("qqmusic_playing")){
                  $(this).parent().removeClass('qqmusic_playing');
                  $('embed').remove();
              }else if(audio_url){
                  $(this).parent().addClass('qqmusic_playing');
                  $('body').append('<embed allowfullscreen="false" src="' + audio_url + '" style="position:absolute;left:-2000px;width:1px;height:1px" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" scale="noborder">');
              }else{
                  var  url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?uin=0&&format=json&callback=player_\n' +
                      'jsonp_1&data={%22url_mid%22:{%22module%22:%22vkey.GetVkeyServer%22,%22method%22:%22CgiGetVkey%22,%22param%22:\n' +
                      '{%22guid%22:%22'+ guid +'%22,%22songmid%22:[%22'+ songmid +'%22],%22songtype%22:[0],%22uin%22:%220%22,%22loginflag%22:%220%22,%22platform%22:%2223%22}}}';

                  $.ajax({
                      type: 'get',
                      //url: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg',
                      // url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
                      url: url,
                      dataType: 'jsonp',
                      jsonpCallback: 'player_jsonp_1',
                      success: function (res) {

                          if (res.code == 0) {
                              var vkey = res.url_mid.data.midurlinfo[0].vkey;
                              if (vkey) {
                                  audio_url = 'https://isure.stream.qqmusic.qq.com/' + res.url_mid.data.midurlinfo[0].filename + '?fromtag=50&uin=0&guid=' + guid + '&vkey=' + vkey;

                                  e.addClass('playing').css('backgroundPositionY','-36px'); // 切换按钮
                                  $('body').append('<embed allowfullscreen="false" src="' + (audio_url ? audio_url : audiourl) + '" style="position:absolute;left:-2000px;width:1px;height:1px" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" scale="noborder">');
                              } else {
                                  alert('收费歌曲无法播放，复制或同步到公众号可试听一分钟');
                                  return;
                              }

                          } else {
                              console.log('获取歌曲失败');
                          }


                      },
                      error: function (data) {}
                  });
              }

          }
      }
  }

  window.hasUsableFlash = function() {
      var flashObj;
      if(typeof window.ActiveXObject != "undefined"){
          flashObj= new  ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      }else{
          flashObj= navigator.plugins['Shockwave Flash'];
      }
      return flashObj? true : false;
  }


  window.copy_ueditor_html = function(html){
      console.log('new copy');

      console.log(typeof html);
      if (!html || typeof html == 'undefined') {
          var _copy_html =  getEditorHtml(true);
      } else {
           var _copy_html = html;
      }


      var dt = new clipboard.DT();
      dt.setData("text/html", _copy_html);
      clipboard.write(dt)
  }



  function loadjs(url) {
      var loadjs = document.createElement('script');
      loadjs.src = url;
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(loadjs, s);
  }

  setTimeout(function(){
      loadjs('//open.web.meitu.com/sources/xiuxiu.js');
  }, 2000);
  // 分类编辑页面 LGD 11-12
  function editCate(callback) {
      layer.open({
          type: 2,
          area: ['819px', '620px'],
          title: '分类编辑',
          content: '/user/articlecate?t=1',
          success: function () {
          },
          end: function () {
              callback();
          }
      });
  }

  function getUserCate(callback){
      $.get('/indexajax/getUserCate', {}, function (data) {
          if (data.code == 1 && data.data) {
              var content = '';
              $.each(data.data, function (key, item) {
                  if (typeof(save_cate_id) != 'undefined' && save_cate_id == item.id)
                      var selected = 'selected';
                  else
                      var selected = '';
                  content += '<option ' + selected + ' value="' + item.id + '" >' + item.name + '</option>';
              });
              callback(content);
          }
      });
  }

  // LGD 2020-02-18  快速保存
  $('#btn_fast_save').click(function() {
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if ((editor.getContentTxt().length == 0 && editor.getContent() == '') || editor.getContent() == '<section class="_editor"><p><br/></p></section>') {
          layer.msg('没有可保存的内容', {
              icon: 0
          });
          return !1;
      }

      fast_save();
  });


  // 保存文章 提示
  $('body').on('mouseenter', '#save_art_help', function(){
      layer.tips('如何保存文章？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#save_art_help', function () {
      layer.closeAll('tips');
  });
  // 调色盘 提示
  $('body').on('mouseenter', '#palette_help', function () {
      layer.tips('如何调整文章颜色？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#palette_help', function () {
      layer.closeAll('tips');
  });
  // 同步文章提示
  $('body').on('mouseenter', '#sync_weixin_help', function () {
      layer.tips('如何同步到微信？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#sync_weixin_help', function () {
      layer.closeAll('tips');
  })
  // 生成图片提示
  $('body').on('mouseenter', '#art_iamge_help', function () {
      layer.tips('如何生成图片？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#art_iamge_help', function () {
      layer.closeAll('tips');
  })
  // 云端草稿提示
  $('body').on('mouseenter', '#drafts_help', function () {
      layer.tips('什么是云端草稿？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#drafts_help', function () {
      layer.closeAll('tips');
  })
  // 历史版本提示
  $('body').on('mouseenter', '#history_help', function () {
      layer.tips('什么是历史版本？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#history_help', function () {
      layer.closeAll('tips');
  })
  // 一键排版提示
  $('body').on('mouseenter', '#paiban_help', function () {
      layer.tips('什么是一键排版？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#paiban_help', function () {
      layer.closeAll('tips');
  })
  // 导入文章提示
  $('body').on('mouseenter', '#remote_art_help', function () {
      layer.tips('如何导入文章？', this, {
          tips: [2, '#555'],
          skin: 'help-tip'
      });
  }).on('mouseleave', '#remote_art_help', function () {
      layer.closeAll('tips');
  })
  // 保存文章预览 LGD
  $('body').on('mouseenter', '#saveart_thumbnail', function () {
      var img_url = $(this).val();
      var pattern = /mmbiz.qlogo.cn/;
      var result = pattern.test(img_url);
      if (img_url) { // LGD 01-16
          if (!result)
              layer.tips('<img src="' + img_url + '" class="tip-saveart-thumbnail">', this, {
                  tips: [3, '#555'],
                  time: 180000,
                  skin: 'saveart-thumbnail-preview'
              });
          else
              layer.tips('<img src="/wechat/showpic?url=' + img_url + '" class="tip-saveart-thumbnail">', this, {
                  tips: [3, '#555'],
                  time: 180000,
                  skin: 'saveart-thumbnail-preview'
              });
      }
  }).on('mouseleave', '#saveart_thumbnail', function () {
      layer.closeAll('tips');
  });
  $(document).on('click', '.style-search-del', function () {
      $('.search_span').find('input').val('');
      $('.tab-style').data('page', 1); // 第一页
      reloadMaterial('style');
  }).on('mouseenter', '.style-search-del', function () {
      $(this).css('cursor', 'pointer');
  });
  // LGD 01-16
  form.on('checkbox(storage-mode)', function (data) {
      var _obj = $(data.elem);
      if (_obj.attr('name') == 'update_wxMaterial') {
          if (data.elem.checked == true) {
              // 隐藏文章分类
              $('#article_cate').parent('div').hide().prev().hide();
              // 隐藏上传图片等按钮
              $('#choose_cover').parent('div').hide();
              // 显示从微信素材库选择图片按钮
              $('#choose-wx-img-div').show();
              // 隐藏存储选项
              $('#save_art_storage_type').next('div').addClass('none');
              // 公众号选择
              var _wechat_id = $('#btn_save').attr('data-wechat-id');
              $('#saveart_wechat').find('option[value=' + _wechat_id + ']').prop('selected', 'selected');
              $('#saveart_wechat').prop('disabled', 'disabled');
              form.render('select');
              $('#btn_save').attr('data-wechat-cover', 1);
              $('button[lay-filter=saveart]').text('更新微信文章');
          } else {
              // 显示文章分类
              $('#article_cate').parent('div').show().prev().show();
              // 显示上传图片等按钮
              $('#choose_cover').parent('div').show();
              // 隐藏从微信素材库选择图片按钮
              $('#choose-wx-img-div').hide();
              // 显示存储选项
              $('#save_art_storage_type').next('div').removeClass('none');
              // 公众号选择
              $('#saveart_wechat').removeAttr('disabled');
              form.render('select');
              $('#btn_save').removeAttr('data-wechat-cover');
              $('button[lay-filter=saveart]').text('保存到我的文章');
          }
      } else {
          return false;
      }
  });
  // LGD 01-16
  $(document).on('click', '#chooseWxImg', function () {
      var wechat_id = $('#btn_save').attr('data-wechat-id');
      layer.open({
          type: 2,
          title: '微信素材库图片',
          content: '/wechat/user_wx_pic/wechat_id/' + wechat_id,
          area: ['600px', '800px'],
          success: function (layero, index) {
          }
      });
  });
  // LGD 05-25 支付成功後刷新頁面
  if (window.localStorage) {
      window.addEventListener("storage", function (event) {
          if (event.key == 'pay_success' && event.newValue == 1) {
              window.localStorage.removeItem(event.key);
              window.location.reload();
          }
      });
  }
  // LGD 06-17 返回全部样式
  $(document).on('click', '.styleFestival-all', function () {
      $('.content-tab li:first').trigger('click');
  });
  // LGD 06-17 返回全部模板
  $(document).on('click', '.tplFestival-all', function () {
      $('.content-tab li:nth-child(2)').trigger('click');
  });
  // LGD 06-17
  $(document).on('click', '.tab-styleFestival li:nth-child(2)', function () {
      $('.tab-tplFestival li:nth-child(1)').removeClass('layui-this');
      $('.tab-tplFestival li:nth-child(2)').addClass('layui-this');
  });
  // 06-17
  $(document).on('click', '.tab-tplFestival li:nth-child(1)', function () {
      $('.tab-tplFestival li:nth-child(1)').addClass('layui-this');
      $('.tab-tplFestival li:nth-child(2)').removeClass('layui-this');
  });
  $(".festival-tab li").click(function () {
      if ($(this).hasClass("tab-open")) return !1;
      var action = $(this).data('action');
      if (typeof action == "undefined" && !AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      $(".float-color,.float-recent,.float-brush").remove();


      $('.content-l').find('> *').hide();
      $('.content-l').find('.tab-' + action + ',.content-' + action).show();
      var info = $('li.active').data('info');
      var _festival_id = info.split("|");
      $('.tab-' + action).attr('data-' + _festival_id[0], _festival_id[1]);
      if ($('.content-' + action + '-list').html() == '') reloadMaterial(action);
  })
  // LGD 2019-07-24
  $('.content-r').on('click', '.editor_to_login', function () {
      floatlogin();
  });
  // LGD 2019-07-24
  $('.content-r').on('click', '.ediort_cancel_login', function () {
      // 销毁flag
      $('.editor_not_login').remove();
  });
  // LGD 2019-07-24
  /*function noticeToLogin() {
   if (!AlreadyLogin && typeof not_login_flag == 'undefined') {
   var _not_login = '<div class="editor_not_login"><span class="editor_not_login_tip">目前您未登录 内容可能丢失，请 <span class="editor_to_login">登录</span><span class="ediort_cancel_login">╳</span></span></div>';
   $('.content-r').prepend(_not_login);
   not_login_flag = true;
   }
   }*/
  // LGD 2019-07-26 删除全部图片提示
  window.delPicAllPopup = function () {
      var content = '<div class="wechat-del" style="padding: 0px 8px;"><fieldset class="layui-elem-field" style="margin-top: 30px;"><legend>删除图片注意事项</legend><div class="layui-field-box"><p style="line-height: 30px;">一、文章引用了图片,会造成预览时图片出错</p><p style="line-height: 30px;">二、图片复制到微信公众号,会提示图片保存失败,已发布的微信公众号文章不受影响</p></div></fieldset></div>';
      layer.open({
          type: 1,
          area: ['500px'],
          shade: 0.4,
          title: false,
          skin: 'delpicpropup',
          content: content,
          /*btn: ['确定删除','取消'],*/
          btn: ['取消', '确定删除'],
          btn2: function (index, layero) {
              document.getElementById('iframe_picture').contentWindow.delPicAll();
          }
      });
  }
  // LGD 2019-07-26 删除单个图片提示
  window.delPicOnePopup = function (id) {
      var content = '<div class="wechat-del" style="padding: 0px 8px;"><fieldset class="layui-elem-field" style="margin-top: 30px;"><legend>删除图片注意事项</legend><div class="layui-field-box"><p style="line-height: 30px;">一、文章引用了图片,会造成预览时图片出错</p><p style="line-height: 30px;">二、图片复制到微信公众号,会提示图片保存失败,已发布的微信公众号文章不受影响</p></div></fieldset></div>';
      layer.open({
          type: 1,
          area: ['500px'],
          shade: 0.4,
          title: '删除图片提示',
          skin: 'delpicpropup',
          content: content,
          btn: ['取消', '确定删除'],
          btn2: function (index, layero) {
              document.getElementById('iframe_picture').contentWindow.delPicOne(id);
          }
      });
  }
  // 点击预览
  $(document).on('click', '#wx_preview_button', function () {
      //var content = editor.getContent();
      var content = $('.layui-layer-content .rich_media_content').prop('outerHTML');
      if (!$(this).hasClass('disabled_click')) {
          $(this).addClass('disabled_click');
          $.ajax({
              url: '/shows/previewCache',
              data: {
                  content: content
              },
              type: 'post',
              success: function (data) {
                  if (data.status == 1) {
                      $('.wx_preview_img').show();
                      //$('#qrcode').append('<img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=\' + data.data">');
                      $('.wx_preview_img').attr('src', 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + data.data);
                  } else {
                      $('#wx_preview_button').removeClass('disabled_click');
                      layer.msg(data.msg, {
                          icon: 5,
                          time: 1800
                      });
                  }
              },
              error: function () {
                  layer.msg('网络出错，请稍后重试~');
              }
          });
      }
  });

  $(".videoBtn").on("click", function () {
      layer.open({
          type: 2,
          title: '祝福视频',
          shadeClose: true,
          shade: 0.8,
          area: ['860px', '550px'],
          content: '/product/video' //iframe的url
      });
  })

  /* 判断页面是否缩放 */

  var isZoom = 0;
  var zoom_proportion = detectZoom();
  if (zoom_proportion < 100 || zoom_proportion > 100) {
      // isZoom_fun();
  }

  $(".videoBtn").on("click", function() {
      layer.open({
          type: 2,
          title: '祝福视频',
          shadeClose: true,
          shade: 0.8,
          area: ['860px', '550px'],
          content: '/product/video' //iframe的url
      });
  })
  /* 判断页面是否缩放 */
  var isZoom = 0;
  var zoom_proportion = detectZoom();
  if (zoom_proportion < 100 || zoom_proportion > 100) {
      // isZoom_fun();
  }
  /* 监听页面缩放 */
  /*  window.onresize = function(){
   if ( detectZoom() == 100 ) {
   layer.close(isZoom);
   }else {
   if (isZoom ==0) {
   isZoom_fun();
   }
   }
   }*/

  function isZoom_fun() {
      var content = '<div class="wechat-del" style="padding: 0px 8px;"><fieldset class="layui-elem-field" style="margin-top: 30px;"><legend>页面缩放比例不正确</legend><div class="layui-field-box"><p style="line-height: 30px;">一、请尝试调整浏览器缩放比例为100%，快捷键ctrl+0（数字零）</p><p style="line-height: 30px;">二、请尝试调整系统显示比例为100%（控制面板\\显示 设置）</p></div></fieldset></div>';
      isZoom = layer.open({
          type: 1,
          area: ['500px', '210px'],
          shade: 0.4,
          title: false,
          content: content,
          btn: ['确定'],
          end: function () {
              isZoom = 0;
          }
      });
  }


  // LGD 2020-02-21 配色方案
  $('.color-plan').click(function(){
      if(!AlreadyLogin){layer.msg('必须登录后才能执行该操作',{time:1000,anim:6}, function(){floatlogin()});return !1}
      if($(".float-color").length > 0) return false;
      var scrollWidth = document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth,scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,height = $(window).height()-$('.topa-ds').height()-$('.bottoma-ds').height()-82,left = scrollWidth/2 - 475,top = (scrollTop) ? 50-scrollTop+$('.topa-ds').height() : 50+$('.topa-ds').height();
      if(height < 600) height = 600;
      layer.open({
          type: 2,
          area: ['461px',height + 'px'],
          offset: [top + 'px', left + 'px'],
          shade: 0,
          zIndex: 998,
          skin: 'float-color',
          title: '配色方案',
          fixed: false,
          resize: false,
          move: false,
          content: '/material/color?t=1',
          success: function(layero, index){}
      });
  });


  // LGD  2020-03-16 收藏网址
  $(document).keydown(function(e){
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;

      var metaKey = e.metaKey;
      if(ctrlKey && keyCode == 68)
      {
          if (AlreadyLogin) {
              $.ajax({
                  url: '/indexajax/collectWebsite',
                  type: 'get',
                  success: function(data) {
                      //console.log(data);
                  },
                  error: function() {
                      layer.msg('系统出错，请联系客服',{icon: 6,time: 1800});
                  }
              });
          }

      }
  })


  // 文章内容检测
  $(document).on('click','#tort',function(){
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }

      text_tort();

  });
  var text_tort_index = '';
  function text_tort() {
      var content = editor.getContentTxt();
      layer.load(1);
      $.ajax({
          url: '/indexajax/text_tort',
          type: 'post',
          data: {
              content: content
          },
          success: function(data) {
              layer.closeAll('loading');

              if (data.status == -1) {
                  if (!AlreadyLogin) {
                      layer.msg('必须登录后才能执行该操作', {
                          time: 1000,
                          anim: 6
                      }, function () {
                          floatlogin()
                      });
                      return !1
                  }
              }else if (data.status == -2) {
                  var update_vip = layer.confirm('使用次数已用完，升级会员继续使用',{
                      btn: ['取消','去升级'],
                      title: false,
                      btn1: function() {
                          layer.close(update_vip);
                      },
                      btn2: function() {
                          window.open('/product','_blank');
                      }
                  });
              }else if (data.status == 1) {
                  var _html = '<div class="text-tort" id="text-tort">';
                  _html += '<div class="tort-content">';
                  _html += '<h3>违规检测</h3>';
                  _html += '<p class="status">';

                  if (data.info.tort == 1) {
                      _html += '<span class="fail">存在违规</span>';
                      _html += '<span >检测完成，发现内容存在违规风险，发文前请及时处理</span>';
                  } else {
                      _html += '<span class="success">检测通过</span>';
                      _html += '<span>检测完成，未发现违规风险</span>';
                  }

                  _html += '</p>';
                  _html += '<div class="result-wrap-box">';
                  _html += '<div class="result-wrap">';
                  _html += '<p class="result-cate"><span class="vertical"></span>百度云API检测结果</p>';
                  _html += '<div class="detection-result-li" style="" >';
                  _html += '<ul class="desc-list hide">';

                  $.each(data.info.baidu.data,function(k,v){
                      _html += '<div class="detection-result-inner">';
                      _html += '<div class="left-box">';

                      if (v.hits)
                          _html += '<img src="https://cdn.yiban.io/web/mpa-web-editor/violation-detection-dialog_fail.d08ebeeea1ec.svg" class="res-icon ">';
                      else
                          _html += '<img src="https://cdn.yiban.io/web/mpa-web-editor/violation-detection-dialog_success.55dd1f2bc767.svg" class="res-icon ">';

                      _html += '<span>'+v.type_zh+'</span>';
                      _html += '</div>';

                      _html += '<div class="right-box">';
                      if (v.hits)
                          _html += '<span class="tort-result-detail" style="color: #b15151">违规内容<i class="fa fa-angle-double-down" aria-hidden="true"></i>';
                      else
                          _html += '<span class="tort-result-detail">未发现';

                      _html += '</span>';
                      _html += '</div>';
                      _html += '<div class="result-word">';

                      if (typeof v.hits == "object") {
                          $.each(v.hits[0].words,function(k1,v1){
                              _html += '<span>'+v1+'</span>';
                          });
                      }

                      _html += '</div>';
                      _html += '</div>';
                  });

                  _html += '</ul>';
                  _html += '</div>';
                  _html += '</div>';
                  _html += '<div class="result-wrap">';
                  _html += '<p  class="result-cate"><span class="vertical"></span>微信API检测结果</p>';
                  _html += '<div class="detection-result-li" style="">';

                  _html += '<div class="detection-result-inner">';
                  _html += '<div class="left-box">';

                  if (data.info.wx.tort == 0) {
                      _html += '<img src="https://cdn.yiban.io/web/mpa-web-editor/violation-detection-dialog_success.55dd1f2bc767.svg" class="res-icon ">';
                  } else {
                      _html += '<img src="https://cdn.yiban.io/web/mpa-web-editor/violation-detection-dialog_fail.d08ebeeea1ec.svg" class="res-icon ">';
                  }

                  _html += '<span>含有违规内容</span>';
                  _html += '</div>';

                  if (data.info.wx.tort == 0) {
                      _html += ' <span style="float: right">未发现</span>';
                  } else {
                      _html += ' <span style="float: right">有违规内容，请自查</span>';
                  }

                  _html += ' </div>';
                  _html += ' </div>';
                  _html += ' </div>';
                  _html += '<div class="btn-wrap"> <button class="btn" id="text-tort-again">重新检测</button> <button  id="tort-btn-success" class="btn primary">完成</button> </div>';
                  _html += ' </div> </div>';
                  _html += '</div> </div>';

                  text_tort_index = layer.open({
                      type: 1,
                      area: ['461px','500px'],
                      zIndex: 998,
                      closeBtn: 0,
                      skin: 'text-tort-popup',
                      shade: [0.3, '#393D49'],
                      shadeClose: true,
                      title: false,
                      fixed: false,
                      resize: false,
                      move: false,
                      content: _html,
                      success: function(layero, index){

                      },
                  });

              } else {
                  layer.msg(data.info);
              }
          },
          error: function() {
              layer.closeAll('loading');
              layer.msg('请求接口失败，请联系客服~');
          }
      });
  }

  $(document).on('click','#tort-btn-success',function() {
      layer.close(text_tort_index);
  });

  $(document).on('click','#text-tort-again',function(){
      layer.close(text_tort_index);
      text_tort();
  });

  $(document).on('click','#text-tort .right-box',function (k,v) {
      var _class = $(this).find('i').hasClass('fa-angle-double-down');
      if (_class) {
          $(this).find('i').removeClass('fa-angle-double-down').addClass("fa-angle-double-up");
          $(this).next().show();
      } else {
          $(this).find('i').removeClass('fa-angle-double-up').addClass("fa-angle-double-down");
          $(this).next().hide();
      }
  });

  $('.left-advertise').click(function(){
      var id = $(this).attr('data-id'); // id

      if (id == 36) {
          window.open("/advertise/index_jump?id=36");
         //window.location.href='/advertise/index_jump?id=36';
      }else {
         $.ajax({
          url: '/advertise/index',
          type: 'get',
          data: {id: id},
          success: function() {
          },
          error: function(){
          }
      });
      }

  });


  $('#index_go_buy').click(function(){
      setCookie('active_click_source','index_buy');
  });

  $('.tobevip_now').click(function(){
      setCookie('active_click_source','index_buy2');
  });

  $(document).on('click','.buy-vip-tips',function(){
      setCookie('active_click_source','buy_vip_tips');
  });

  $('.color-more').click(function(){
      if ($('#mixedColor').css('display') != 'none') {
          $('.button-tools').css({top: '280px'});
      } else {
          $('.button-tools').css({top: '320px'});
      }
  });

  $(" .material-color").mouseover(function (e) {
      $('.material-color-ul').show();

  }).mouseout(function () {
      $('.material-color-ul').hide();
  })

  $('.material-style-ul-color li').click(function(){
      if (!AlreadyLogin) {
          layer.msg('必须登录后才能执行该操作', {
              time: 1000,
              anim: 6
          }, function () {
              floatlogin()
          });
          return !1
      }
      if($(this).data('id') == 0){
          $('.material-style-ul-color li').html('');
          $(this).html('<i class="fa fa-check"></i>');
          $('.material-color').addClass('material-color-default');
          $('#material_style_color').val(0);
          $('.tab-style').data('page', '1');
          reloadMaterial('style');
      }
      else if($(this).find('.fa-check').length > 0) {
          $(this).html('');
          $('.material-color').addClass('material-color-default');
          $('#material_style_color').val(0);
          $('.tab-style').data('page', '1');
          reloadMaterial('style');
      } else {
          var _this = this;
          $('.material-color').removeClass('material-color-default');
          $('.material-color').css({
              'backgroundColor': $(_this).css('backgroundColor')
          });
          $('.material-style-ul-color li').html('');
          $(this).html('<i class="fa fa-check"></i>');
          $('#material_style_color').val($(this).data('id') );
          $.get('/advertise/color?id=' + $(this).data('id') );
          $('.tab-style').data('page', '1');
          reloadMaterial('style');
      }
  });

}();


function buy_vip_tips() {
  layer.open({
      type: 2,
      area: ['960px','570px'],
      shadeClose:true,
      title: false,
      content: '/pay/buy_vip_popup'
  });
}

function setCookie(key,value,t){
  if (typeof t == 'undefined') {
      document.cookie = key+"="+value;
  } else {
      var oDate=new Date();
      oDate.setDate(oDate.getDate()+t);
      document.cookie = key+"="+value+"; expires=" + oDate.toDateString();
  }
}


var auto_height = function () {
  if ($('.footer').css('display') == 'none')
      var _height = 0;
  else
      var _height = 80;
  var box_height = $(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - _height;
  if (box_height < 636) {
      $('.button-tools button').css('margin-bottom', '1px');
  } else if (box_height < 644) {
      $('.button-tools button').css('margin-bottom', '2px');
  } else if (box_height < 652) {
      $('.button-tools button').css('margin-bottom', '3px');
  } else if (box_height < 660) {
      $('.button-tools button').css('margin-bottom', '4px');
  } else {
      $('.button-tools button').css('margin-bottom', '5px');
  }
  if (box_height < 604) {
      $('#service_QRcode').css('height', '72px');
  } else if (box_height < 608) {
      $('#service_QRcode').css('height', '76px');
  } else if (box_height < 612) {
      $('#service_QRcode').css('height', '80px');
  } else if (box_height < 616) {
      $('#service_QRcode').css('height', '84px');
  } else if (box_height < 620) {
      $('#service_QRcode').css('height', '88px');
  } else if (box_height < 624) {
      $('#service_QRcode').css('height', '92px');
  } else if (box_height < 628) {
      $('#service_QRcode').css('height', '96px');
  } else {
      $('#service_QRcode').css('height', '100px');
  }
  if (box_height < 600) {
      box_height = 600;
      $('body').css('overflow-y', 'visible');
  } else {
      $('body').css('overflow-y', 'hidden');
  }
  $('.content-box,.content-r,.content-l,.float-color,.float-recent,.content-iframe iframe').css('height', box_height);
  $('.content-style').css('height', box_height - $('.tab-style').height() - 11);
  $('.content-tpl').css('height', box_height - 92);
  $('.content-design').css('height', box_height - 92);
  $('.content-format').css('height', box_height);
  $('.content-styleFestival').css('height', box_height - 50);
  $('.content-tplFestival').css('height', box_height - 50);
  if ($(".float-recent").length > 0) {
      $('.float-recent').css('height', box_height - 2);
      $('.float-recent .layui-layer-content,.float-recent .layui-layer-content iframe').css('height', box_height - $('.float-recent .layui-layer-title').height() - 3 + $('.topa-ds').height());
      $('.float-recent').css('left', (document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth) / 2 - 472);
  }
  if ($(".float-color").length > 0) {
      $('.float-color').css('height', box_height - 2);
      $('.float-color .layui-layer-content,.float-color .layui-layer-content iframe').css('height', box_height - $('.float-color .layui-layer-title').height() - 3 + $('.topa-ds').height());
      $('.float-color').css('left', (document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth) / 2 - 472);
  }
  if ($(".float-brush").length > 0) {
      $('.float-brush').css('height', box_height - 1);
      $('.float-brush .layui-layer-content').css('height', box_height - $('.float-brush .layui-layer-title').height() - 3 + $('.topa-ds').height());
      $('.float-brush').css('left', (document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth) / 2 - 472);
  }
  $('.edui-editor-iframeholder').css('height', box_height - $('.edui-editor-toolbarboxouter').height() - $('.edit-tools').height() - 2);
}

$('#article_editing').click(function(){
  $('[data-action="art"]').trigger('click');
});

$('#span-festival').click(function(){
$('#left-cFestival').click()
});




/* LGD 检测页面缩放方法 */
function detectZoom() {
  var ratio = 0,
      screen = window.screen,
      ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth;
  }
  if (ratio) {
      ratio = Math.round(ratio * 100);

  }

  return ratio;
};

var trade_popup_index = 0;
if (trade_popup == 1) {
  $.post('/user/userTrade',{},function(data) {
      if (data.status == 1) {
          trade_popup_index = layer.open({
              skin:'choose_style',
              type: 2,
              area: ['840px','470px'],
              shadeClose:true,
              title: false,
              content: '/user/tradePopup'
          });
      }
  });
}
var trade_popup_index = 0;
if (trade_popup == 1) {
  $.post('/user/userTrade', {}, function (data) {
      if (data.status == 1) {
          trade_popup_index = layer.open({
              skin: 'choose_style',
              type: 2,
              area: ['840px', '470px'],
              shadeClose: true,
              title: false,
              content: '/user/tradePopup'
          });
      }
  });
}

function click_free_material(material_vip) {
  var  free_material_num =   parseInt(sessionStorage.getItem('click_free_material'));
  free_material_num = isNaN(free_material_num) ? 0: free_material_num;

  if (material_vip > 1) {
      return false;
  } else {
      if (free_material_num >= 10 ) {
          return false;
      } else {
          sessionStorage.setItem('click_free_material', free_material_num + 1);
          return true;
      }
  }



}

window.onbeforeunload = function()
{
  sessionStorage.removeItem('click_free_material');
}



$(function () {
  /*一键排版预览滑块控制*/
  var inputWidth = parseInt($(".inputNumber").innerWidth(), 10);
  $(".slider").width(inputWidth);
  function slider_reset(id, func) {
      var id_e = '#' + id
      var parent = $(id_e).parent().parent();
      var inputMin = parseInt($(parent).find('.input').attr("min"), 10);
      var inputMax = parseInt($(parent).find('.input').attr("max"), 10);
      var slider = layui.slider;
      window['slider_' + id] = slider.render({
          elem: id_e,  //绑定元素
          min: inputMin,
          max: inputMax,
          step: 1,
          tips: true,
          change: func
      });
  }

  slider_reset('font_size', font_size)
  slider_reset('letter_spacing', letter_spacing)
  slider_reset('line_height', line_height)
  slider_reset('margin_bottom', margin_bottom)
  function font_size(value) {
      $(".font_size").val(value);
      $('#content_view_content').find('.text_content p').css('font-size', value + 'px')
      $('#content_view_content').find('.text_content span').css('font-size', value + 'px')
  }

  function letter_spacing(value) {
      $(".letter_spacing").val(value);
      $('#content_view_content').find('.text_content p').css('letter-spacing', value + 'px')
      $('#content_view_content').find('.text_content span').css('letter-spacing', value + 'px')
  }

  function line_height(value) {
      $(".line_height").val(value);
      $('#content_view_content').find('.text_content p').css('line-height', value + 'px')
      $('#content_view_content').find('.text_content span').css('line-height', value + 'px')
  }

  function margin_bottom(value) {
      $(".margin_bottom").val(value);
      $('#content_view_content').find('._editor ').css('margin-bottom', value + 'px')
  }
});