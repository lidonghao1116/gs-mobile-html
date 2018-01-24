/**
 * Created by Administrator on 2016/1/18.
 */
//var publicPath=window.location.host.indexOf("localhost")>-1?"http://www.jiacer.com/jiacerapps":"http://"+window.location.host+"/jiacerapps";
try {
  var publicPath = "http://" + window.location.host + "/fbeeWebConsole_web";
  window.global_config = {
    auth: publicPath + "/api/WechatInfo/auth/url",
    weChatInfo: publicPath + "/api/WechatInfo/info",
    getMemberInfo: publicPath + "/profile/api/member/getMemberInfo",
  }
}catch (e){
  console.log(e)
}