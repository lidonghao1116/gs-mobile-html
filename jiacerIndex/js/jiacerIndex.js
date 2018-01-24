var publicPathIndex="http://"+window.location.host+"/fbeeWebConsole_web/";
$(document).ready(function(){
	getRecords("","");
	$("body").scrollTop("0");
	//滚动页面
	var headHeight = $(".head").outerHeight(true);
	var bannerHeight = $(".banner").outerHeight(true);
	var ttHeight = $(".search_tt").outerHeight();
	var inquireHeight =$(".inquire_box").outerHeight(true);
	var fixHeight = bannerHeight+ttHeight;
	var windowHeight = $(window).height();
	var bodyHeight = $("body").outerHeight(true);
	var companyMinHeight = windowHeight-inquireHeight-headHeight;
	// var timeout; 
	  /*  $(window).on('touchmove',function(){
            if ($("body").scrollTop() < fixHeight) {
				 $(".inquire_box").removeClass("inquire_box_fix");
				$(".inquire").removeClass("inquire_fix");
				$(".search_tt").removeClass("search_tt_fix");
				$(".company_list").css("minHeight","0");
			} else {
				$(".inquire_box").addClass("inquire_box_fix");
				$(".inquire").addClass("inquire_fix");
				$(".search_tt").addClass("search_tt_fix");
				$(".company_list").css("minHeight",companyMinHeight);
		   };
        }); */
	$(window).scroll(function(){
		// clearTimeout(timeout);
		// timeout = setTimeout(function(){	
		if ($("body").scrollTop() < fixHeight) {
				 $(".inquire_box").removeClass("inquire_box_fix");
				$(".inquire").removeClass("inquire_fix");
				$(".search_tt").removeClass("search_tt_fix");
				$(".company_list").css("minHeight","0");
			} else {
				$(".inquire_box").addClass("inquire_box_fix");
				$(".inquire").addClass("inquire_fix");
				$(".search_tt").addClass("search_tt_fix");
				$(".company_list").css("minHeight",companyMinHeight);
		   };
	   // })
	});
	//展开选城市区域
	$(".sel").click(function(){
		if($("body").outerHeight(true)<(windowHeight+fixHeight)){
			$(".company_list").css("minHeight",companyMinHeight);
		};
		if(!$(".inquire_box").hasClass("inquire_box_fix")){
			$("body").scrollTop(fixHeight+1);
		}
		$(this).siblings().show();
		$(this).parent(".sel_box").siblings(".sel_box").children(".sel_con_box").hide();
		$("#layer").show();
		$('body').on('touchmove',function(event){event.preventDefault();});
	});
	//选择
	$(".sel_con_box").on("click","li",function(){
		if($(this).parents(".sel_con").hasClass("hot_city")){
		  $(".area_in").text("所有区域");
		};
		$(".sel").addClass("sel_color");
		$(this).parents(".sel_con_box").hide();
		$("#layer").hide();
		var text = $(this).text();
		var areaName = "";
		var area = $(this).attr("area-code");
		if(area==undefined){
			area="";
		}else{
			areaName = text;
		}
		getRecords("2",area);
		$(this).parents(".sel_box").children(".sel").text(text);
		$("#area_in").attr("data-areacode",area);
		scorll();
	});
	$(".inquire_bt").click(function(){
		var area =$("#area_in").attr("data-areacode");
		getRecords("2",area);
		scorll();
	});
	//关闭
	$("#layer").click(function(){
		$(".sel_con_box").hide();
		$("#layer").hide();
		scorll();
	});
	$(".head .my").click(function(){
		window.location.href="http://"+window.location.host+"/center.html";
	});
	
})
	//关闭弹窗后
	function scorll(){
		var bannerHeight = $(".banner").outerHeight(true);
		var ttHeight = $(".search_tt").outerHeight();
		var windowHeight = $(window).height();
		var fixHeight = bannerHeight+ttHeight;
		$('body').off('touchmove');
		$(".company_list").css("minHeight","0");
		if ($("body").outerHeight(true)<(windowHeight+fixHeight)) {
			$(".inquire_box").removeClass("inquire_box_fix");
			$(".inquire").removeClass("inquire_fix");
			$(".search_tt").removeClass("search_tt_fix");
			} else {
			$(".inquire_box").addClass("inquire_box_fix");
			$(".inquire").addClass("inquire_fix");
			$(".search_tt").addClass("search_tt_fix");
			$("body").scrollTop(fixHeight+1);
		   };
	}
	//总条数
	function getRecords(privince,area){
		$.ajax({
			url:publicPathIndex+"/api/custServer/queryNearbyCompany",
			type:"post",
      headers: {
        'token': params.token,
        'uid': params.uid
      },
			data: {
				more:"01",
				privince:privince,
				city:area
			},
			dataType: "json",
			success: function success(data) {
				if(data.success) {
					if(data.code==0){
						var dataJD = data.jsonData;
						console.log(dataJD.records);
						var records=dataJD.records;
						console.log(data.msg);
						if(records==0){
							 var noFound ="<div class='no_found'>"+
											"<p>您搜索的地方暂无家政公司<br/>换个地方试试吧~</p>"+
										"</div>";
							 $(".company_list ul").html(noFound);
						}else{
							queryNearbyCompany(records,privince,area);
							
						}
						
					}
				}else{
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	};
	//展示家政公司列表
	function queryNearbyCompany(records,privince,area){
		$.ajax({
			url:publicPathIndex+"/api/custServer/queryNearbyCompany",
			type:"post",
      headers: {
        'token': params.token,
        'uid': params.uid
      },
			data: {
				pageNumber:"1",
				pageSize:records,
				more:"01",
				privince:privince,
				city:area
			},
			dataType: "json",
			success: function success(data) {
				if(data.success) {
					if(data.code==0){
						var dataJD = data.jsonData;
						proObj=data.jsonData;
						console.info(proObj);
						var html = '';
						//判断是否是数组
						if(proObj instanceof Array == false){
							var result = "";
							for(var i=0;i<proObj.rows.length;i++){
								var array = proObj.rows[i].serviceCode.split(",");
								var websiteUrl = proObj.rows[i].websiteUrl;
								var websiteName = proObj.rows[i].websiteName;
								var privince = proObj.rows[i].privince;
								var city = proObj.rows[i].area;
								var domain=proObj.rows[i].domain;
								for(var j=0;j<array.length;j++){
									result+="<span>"+array[j]+"</span>"
								}
								html+="<li>"+
									"<a href='http://"+window.location.host+"/"+domain+"/index.html"+"'>"+
										"<div class='company_info'>"+
											"<div class='com_top'>"+
												"<img src='img/mendianlogo.png'/>"+
												"<div class='top_right'>"+
													"<h2>"+websiteName+"</h2>"+
													"<p>"+privince+"-"+city+"</p>"+
												"</div>"+
											"</div>"+
											"<div class='type'>"+
												"<p>"+result+"</p>"+
											"</div>"+
										"</div>"+
									"</a>"+
								"</li>";
								result = "";
							}
							$(".company_list ul").html(html);
							return ;
						}
						$.each(proObj, function(i,item) {
							var serviceCode = item.serviceCode;
							var array = serviceCode.split(",");
							var result = "";
							for(var i=0;i<array.length;i++){
								result+="<span>"+array[i]+"</span>"
							}
							html+="<li>"+
										"<a href='http://"+window.location.host+"/"+item.domain+"/index.html"+"'>"+
											"<div class='company_info'>"+
												"<div class='com_top'>"+
													"<img src='img/mendianlogo.png'/>"+
													"<div class='top_right'>"+
														"<h2>"+item.websiteName+"</h2>"+
														"<p>"+item.privince+"-"+item.area+"</p>"+
													"</div>"+
												"</div>"+
												"<div class='type'>"+
													"<p>"+result+"</p>"+
												"</div>"+
											"</div>"+
										"</a>"+
									"</li>";
						});
						 $(".company_list ul").html(html);
					}
				} else {
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	};
