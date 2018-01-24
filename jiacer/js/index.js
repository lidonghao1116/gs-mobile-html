//	路径
var domain_name=window.location.pathname;
var domain=domain_name.split("/")[1];
var publicPath="http://"+window.location.host+"/fbeeWebConsole_web/"+domain;
var publicPathCmn="http://"+window.location.host+"/fbeeWebConsole_web";
var publicIndex="http://"+window.location.host;

//金额千位分隔
function RetainedDecimalPlaces(num) {
　　num = parseFloat(num).toFixed(2);
　　var source = String(num).split(".");
　　source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
　　return source.join(".");
};

//金额千位分隔2
function RetainedDecimalPlacesNF(num) {
　　var source = String(num).split(".");
　　source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
　　return source[0];
};
//        截取url后面的参数
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
	}
//			区域选择
function serviceProvice(){
	$.ajax({
        url: publicPath+"/api/common/getAreaData/c001",
        type: "post",
        data: {},
        dataType: "json",
        async:false,
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var dataJD = data.jsonData;
                	var html = "";
                	$.each(dataJD, function(i,item) {
                		html += "<li data-code='"+item.areaCode+"'>"+item.areaName+"</li>";
                	});
                	$("#area .provice ul").html(html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });
}

function serviceCity(pcode){
	$.ajax({
        url: publicPath+"/api/common/getAreaData/c002",
        type: "post",
        data: {pcode:pcode},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var dataJD = data.jsonData;
                	var html = "";
                	$.each(dataJD, function(i,item) {
                		html += "<li data-code='"+item.areaCode+"'>"+item.areaName+"</li>";
                	});
                	$("#area .city ul").html(html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });
}

function serviceCountry(pcode){
	$.ajax({
        url: publicPath+"/api/common/getAreaData/c003",
        type: "post",
        data: {pcode:pcode},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var dataJD = data.jsonData;
                	var html = "";
                	$.each(dataJD, function(i,item) {
                		html += "<li data-code='"+item.areaCode+"'>"+item.areaName+"</li>";
                	});
                	$("#area .country ul").html(html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });
}
$(function(){

//				地区选择
	$("input[name='serviceArea']").focus(function(){
		serviceProvice();
		$("body").append("<div class='newLayer' style='position: fixed;top: 0;left: 0;right:0;bottom:0;background-color:#000000;z-index:115;-moz-opacity: 0.2;opacity:.20;filter: alpha(opacity=20);'></div>");
		$("#area").animate({"bottom":0});
		$("#area .provice").show().siblings().hide();
	});

	$("#area").on("click","li",function(){
		$(this).addClass("area-on").siblings().removeClass("area-on");
		var pcode=$(this).data("code")
		if ($(this).parents("div").hasClass("provice")){
			serviceCity(pcode);
			$("#area .city").show();
			$("#area .country").hide();
		} else if ($(this).parents("div").hasClass("city")) {
			serviceCountry(pcode);
			$("#area .country").show();
		} else {
			var html = "";
			$(".area-on").each(function(){
				html+=$(this).text()+" ";
			})
			$("input[name='serviceArea']").val(html);
			$(".newLayer").remove();
			$("#area").animate({"bottom":"-30rem"});
			$("input[name='serviceProvice']").val($("#area .provice .area-on").data("code"));
			$("input[name='serviceCity']").val($("#area .city .area-on").data("code"));
			$("input[name='serviceCounty']").val($("#area .country .area-on").data("code"));
				onSuccess();
		}

	})
//	用户登录信息
//	$.ajax({
//	    url: publicPath+"/api/common/isLogin",
//		type: "post",
//		data: {},
//		dataType: "json",
//		success: function success(data) {
//			if(data.success) {
//				if(data.code==0){
//					var dataJD=data.jsonData;
//					var html="";
//					if(dataJD.name != null&&dataJD.name != ""){
////							html="<a href='myProfile.html' target='_self'>"+dataJD.name+"</a>";
//						$(".head_r ul li:eq(0) a").html(dataJD.name);
//					}else{
////							html="<a href='myProfile.html' target='_self'>"+dataJD.mobile+"</a>";
//						$(".head_r ul li:eq(0) a").html(dataJD.mobile);
//					}
//				}
//			} else {
//				console.log(data.msg);
//			}
//		},
//		error: function(err) {
//			console.log(err);
//		}
// });

   //登录显示
//	$.ajax({
//		url: publicPath+"/api/common/isLogin",
//		type: "post",
//		data: {},
//		dataType: "json",
//		success: function success(data) {
//			if(data.success) {
//				if(data.code==0){
//				}
//			} else {
//				console.log(data.msg);
//			}
//		},
//		error: function(err) {
//			console.log(err);
//		}
//	});
})
