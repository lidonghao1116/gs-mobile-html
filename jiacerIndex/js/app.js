var token = localStorage.getItem('token');
var params = {
  token: localStorage.getItem('token'),
  uid:localStorage.getItem('uid'),
}
// var params = {
//   uid:"68",
//   token:"4_bzFLH7QCmr_c-zYQVSc-TnKL2tBjLhE7yrMIfP5vsVfwQezUv4q2nqHwyxk6z2JnYwJwLHk05gTmhr3kgq-WBA"
// }
//判断是否为空
function isEmpty(param) {
  if ($.trim(param) != "" && $.trim(param) != null&&param!="null") {
    return false;
  } else {
    return true;
  }
};

if(isEmpty(params.token)){
  /*$.ajax({
    url: window.global_config.auth,
    async: false,
    type: "get",
    success: function success(data) {
      if (data.code==0) {
        var url=encodeURIComponent(window.location.href);
        var redirect=data.jsonData;
        if(redirect.indexOf('@REDIRECT@')!=-1){
          redirect=redirect.replace(/@REDIRECT@/,url)
        }
        window.location.href=redirect;
        return;
      }  else {
        console.log()
      }
    },
    error: function (err) {
      console.log(err);
    }
  });*/
  auth();
}

function auth() {
  $.ajax({
    url: window.global_config.auth,
    async: false,
    dataType: "json",
    headers:{},
    type: "get",
    success: function success(data) {
      if (data.code==0) {
        var url=encodeURIComponent(window.location.href);
        var redirect=data.jsonData;
        if(redirect.indexOf('@REDIRECT@')!=-1){
          redirect=redirect.replace(/@REDIRECT@/,url)
        }
        window.location.href=redirect;
        return;
      }  else {
        console.log(data.msg)
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function checkAuth(code) {
  if(code===20002){
    localStorage.clear();
    auth();
  }else if(code===20004){
    localStorage.removeItem('uid')
  }
}