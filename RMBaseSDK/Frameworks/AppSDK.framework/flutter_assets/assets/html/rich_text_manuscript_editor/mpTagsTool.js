/**
 * parse 展示时需要调用此方法
 * out 存储到服务端时调用此方法
 */
  window.mpTagsTool={
  /**
   * 
   * @param wxTagName 'QQMUSIC'|'MPVOICE'|'MPPOI'|'MPVIDEOSNAP'|'MP-MINIPROGRAM'|'REDPACKET-COVER'|'MPPROFILE' 
   * @param element  Element
   * @returns 
   */
  parseDoms(element) {
    var wxTagName=element.tagName;
    element?.remove();
    return false;
    switch (wxTagName) {
      case 'QQMUSIC':
        element.innerHTML = `<section class="music_card appmsg_card_context appmsg_card_active">
        <section class="music_card_bd">
          <strong class="music_card_title">${element.getAttribute("music_name") || ""}</strong>
          <section class="music_card_desc">${element.getAttribute("singer")}</section>
          <span class="music_card_source "></span>
        </section>
        <span class="music_card_ft">
          <em class="weui-play-btn"></em>
          <img class="music_card_thumb js_nocatch js_noimgpopup js_noimgselected" src="${element.getAttribute("albumurl")||''}" data-ratio="1" data-w="90" data-imgqrcoded="1">
        </span>
        <section class="pages_mask_msg js_mask" style="display:none;">该音乐因版权失效无法播放，请<a href="javascript:;" _href="javascript:;">更换音乐</a>
        </section>
      </section>`;
        break;
      case 'MPVOICE':
        element.innerHTML = `<section class="appmsg_card_context appmsg_card_active audio_card js_audio_card">
        <strong class="audio_card_title">${element.getAttribute('name')}</strong>
        <span class="weui-flex">
          <span class="weui-flex__item">
            <span class="audio_card_opr">
              <span class="audio_card_progress_wrp">
                <span class="audio_card_progress">
                  <span class="audio_card_progress_inner"></span>
                </span>
              </span>
            </span>
            <span class="audio_card_tips" aria-labelledby="时长">
              <em class="audio_card_length_current">00:00</em>
              <em class="audio_card_length_total">${element.getAttribute('play_length')||''}</em>
            </span>
          </span>
          <span aria-labelledby="播放开关" class="audio_card_switch">
            <em class="weui-audio-btn" role="button"></em>
          </span>
          </span>
          <span class="audio_album_null js_no_album">未加入话题</span>
          <span class="audio_album_null js_album_name" style="display: none;"></span>
          <span class="audio_action js_audio_action" style="display: none;">
            <span class="audio_action_item js_replace_album" style="display: none;">
              <em class="audio_action_icon_switch"></em>修改话题
            </span>
            <span class="audio_action_item js_add_album"><em class="audio_action_icon_add"></em>添加话题</span>
          </span>
          </section>`;
        break;
      case 'MPPOI':
        element.innerHTML = `<span class="appmsg_card_context appmsg_card_active appmsg_geography_loc_card">
          <span class="location_title line-clamp1">${decodeURIComponent(element.getAttribute('data-name'))}</span>
          <span class="location_detail line-clamp1">${decodeURIComponent(element.getAttribute('data-address'))}</span>
          <span class="location_img js_nocatch js_noimgpopup js_noimgselected" style="background-image: url('${element.getAttribute('data-img')}');"></span>
        </span>`;
        break;
      case 'MPVIDEOSNAP':
        element.innerHTML = `
    <section>
      <section class="wxw_wechannel_card appmsg_card_context js_wechannel_card">
        <section class="wxw_wechannel_card_inner">
        <section class="wxw_wechannel_card_bd">
        <section class="wxw_wechannel_video_context" style="background-image:url(${element.getAttribute('data-url')})">
        <i class="weui-play-btn_primary"></i>
        </section>
        <section class="wxw_wechannel_profile weui-flex">
        <img class="wxw_wechannel_avatar" src="${element.getAttribute('data-headimgurl')}" data-ratio="1" data-w="640" data-imgqrcoded="1">
        <strong class="wxw_wechannel_nickname">${element.getAttribute('data-nickname')}</strong>
        </section>
        <section class="wxw_wechannel_desc">${element.getAttribute('data-desc')}</section></section>
        <section class="wxw_wechannel_card_ft weui-flex">
        <i class="wxw_wechannel_logo"></i>视频号</section>
        </section>
        <section class="wxw_wechannel_msg js_wechannel_msg" style="display: none;">
        <section class="wxw_wechannel_msg_inner js_wechannel_msg_text">该视频号不可引用</section>
        </section>
      </section>
    </section>`;
        break;
      case 'MP-MINIPROGRAM':
        element.innerHTML = `<section class="weapp_display_element js_weapp_display_element">
          <section role="option" class="weapp_card app_context pages_reset appmsg_card_context appmsg_card_">
            <section class="weapp_card_bd">
              <section class="weapp_card_profile flex_context">
                <section class="radius_avatar weapp_card_avatar">
                  <img referrerpolicy="no-referrer" src="${element.getAttribute('data-miniprogram-avatar')}" data-ratio="1" data-w="140"/>
                </section>
                <section class="flex_bd">
                  <section class="weapp_card_nickname_wrp">
                    <section class="weapp_card_nickname">${element.getAttribute('data-miniprogram-nickname')||''}</section>
                  </section>
                </section>
              </section>
              <section class="weapp_card_info">
                <section class="weapp_card_title">')${element.getAttribute('data-miniprogram-title')||''}</section>
                <section class="weapp_card_thumb_wrp">
                  <img src="${element.getAttribute('data-miniprogram-imageurl')||''}" referrerpolicy="no-referrer" >
                </section>
              </section>
            </section>
            <section class="weapp_card_ft" aria-hidden="true">
              <section class="weapp_card_logo">                小程序            </section>
            </section>
          </section>
        </section>`;
        break;
      case 'REDPACKET-COVER':
        element.innerHTML = `<section class="js_wap_redpacketcover red_package_cover_wrp" data-coveruri="${element.getAttribute('data-coveruri')}">
        <section class="red_package_cover__inner">
          <section class="red_package_cover__inner__main">
            <section class="red_package_cover__body">
              <span class="red_package_cover_img" style="background-image: url('${element.getAttribute('data-receiveimg')}')"></span>
            </section>
            <section class="red_package_cover__foot">
              <span class="red_package_cover__access-link">领取红包封面</span>
            </section>
          </section>
          <section class="red_package_cover__extend">
            <span class="red_package_cover__extend_icon"></span>
            <span class="red_package_cover__extend_info">红包复制到微信后台需重新插入</span>
          </section>
        </section>
        </section>`;
        break;
      case 'MPPROFILE':
        element.innerHTML = `<section class="appmsg_card_context wx_profile_card js_card">
        <section class="wx_profile_card_inner">
          <section class="wx_profile_card_bd">
            <section class="wx_profile weui-flex">
              <section class="wx_profile_hd">
                <img class="wx_profile_avatar" src="${element.getAttribute('data-headimg')||''}" alt="${element.getAttribute('data-nickname')||''}" data-type="png" data-ratio="1" data-w="132">
              </section>
              <section class="wx_profile_bd weui-flex__item">
                <strong class="wx_profile_nickname">${element.getAttribute('data-nickname')||''}</strong>
                <section class="wx_profile_desc">${element.getAttribute('data-signature')||''}</section>
              </section>
            <section class="wx_profile_ft">
              <i class="weui-icon-arrow"></i>
            </section>
            </section>
          </section>
          <section class="wx_profile_card_ft weui-flex">公众号</section>
        </section>
        <section class="wx_profile_msg js_msg_container" style="display: none;">
          <section class="wx_profile_msg_inner js_msg_text">该公众号已被封禁</section>
        </section>
      </section>`;
        default:
        break;
  
    }
  },
  /**
   * 
   * @param {*} wxTagName 'QQMUSIC'|'MPVOICE'|'MPPOI'|'MPVIDEOSNAP'|'MP-MINIPROGRAM'|'REDPACKET-COVER'|'MPPROFILE'
   * @param {*} element Element
   */
  postDoms( element) {
    var wxTagName=element.tagName;
    switch (wxTagName) {
      case 'MPVIDEOSNAP':
      case 'MPPOI':
        element.innerHTML=''
        break;
      default:
        element.innerHTML=''
        break;
    }
  },
  /**
   * 是否对特殊微信标签进行实现或者直接过滤
   * @param {*} domContainer Element
   * @param {*} user  'pcEditor'|'pcView'|'mEditor'|'mView'
   * @param {*} returnHtmlStr boolean 
   * @returns 
   */
  decodeTags(domContainer,user,returnHtmlStr=false){
    //iframe.js_editor_qqmusic,iframe.js_editor_audio,iframe.video_iframe,iframe.js_editor_profil,,[data-pluginname="poi"],[data-pluginname="videosnap"],a[data-miniprogram-appid],
    const mpElements = domContainer.querySelectorAll(`
    qqmusic,
    mpvoice,
    mppoi,
    mpvideosnap,
    mp-miniprogram,
    mpprofile,
    REDPACKET-COVER
    `);
    Array.from(mpElements).forEach(s=>this.parseDoms(s));
    if(returnHtmlStr){
      return domContainer.innerHTML;
    }
  },
  /**
   * 对特殊微信标签进行过滤掉修饰内容，使发往外部的数据纯净
   * @param {*} domContainer Element
   * @param {*} user 'pcEditor'|'pcView'|'mEditor'|'mView'
   * @param {*} returnHtmlStr boolean
   * @returns 
   */
  encodeTags(domContainer,user,returnHtmlStr=false){
    //iframe.js_editor_qqmusic,iframe.js_editor_audio,iframe.video_iframe,iframe.js_editor_profil,,[data-pluginname="poi"],[data-pluginname="videosnap"],a[data-miniprogram-appid],
    const mpElements = domContainer.querySelectorAll(`
    qqmusic,
    mpvoice,
    mppoi,
    mpvideosnap,
    mp-miniprogram,
    mpprofile,
    REDPACKET-COVER
    `);
    Array.from(mpElements).forEach(s=>this.postDoms(s));
    if(returnHtmlStr){
      return domContainer.innerHTML;
    }
  },
}