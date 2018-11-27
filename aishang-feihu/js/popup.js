function getUrlParms(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	var r = window.location.search.substr(1).match(reg)
	if (r != null)
		return decodeURI(r[2])
	return null
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2]);
	return null
}

function handle(param) {
	var strlen = param.length;
	if (strlen < 9) {
		return strlen;
	}
	return param.replace(/^(.{6})(?:\d+)(.{4})$/, "$1******$2");
}
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

// 返回100200 则成功  其他则失败跳转 404页面
function checkUserToken(userid,checkToken){
	$.ajax({
		type: "POST",
		url: UserAPIPost + "crp-user/user/checkUserToken",
		dataType: 'json',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {
			userid: userid,
			checkToken: checkToken
		},
		success: function (data) {
			if (data.retCode !== '100200') {
				window.location.href = '404drop.html?__hbt=1528165390166'
			}
		},
		error: function (error) {
			$.toast(error.retMsg);
			window.location.href = '404drop.html?__hbt=1528165390166'
		}
	});
}

// 取 checkToken  
function getToken(){
	var checkToken = $.fn.cookie("checkToken");
	return checkToken;
}
	// 编码判断
	function retcode(code) {
		if (code === '100901') {
			$.toast('手机号已经存在')
		} else if (code === '100902') {
			$.toast('商户已经存在')
		} else if (code === '100903') {
			$.toast('商户已命中黑名单')
		} else if (code === '100904') {
			$.toast('商户已被限制推送')
		} else if (code === '100905') {
			$.toast('暂无该商户信息')
		} else if (code === '100906') {
			$.toast('手机号格式不对')
		} else if (code === '100907') {
			$.toast('身份证格式不对')
		} else if (code === '100908') {
			$.toast('没有此银行卡信息')
		} else if (code === '100909') {
			$.toast('此银行卡已被使用')
		} else if (code === '100910') {
			$.toast('手机号已被注册')
		} else if (code === '100911') {
			$.toast('身份证号已被注册')
		} else if (code === '100912') {
			$.toast('通讯录不满2人')
		} else if (code === '100913') {
			$.toast('已有在申请的审批')
		} else if (code === '100914') {
			$.toast('当前商户未存在任何操作记录!')
		} else if (code === '100915') {
			$.toast('请求参数有误')
		} else if (code === '100916') {
			$.toast('运营商认证失败')
		} else if (code === '100917') {
			$.toast('已有在做订单')
		} else if (code === '100918') {
			$.toast('已提交过手动还款申请')
		} else if (code === '100500') {
			$.toast('服务器异常')
		}
	}

//立即执行函数
(function(window , undefined ){ 
	var Ygtoast = function(){ //构造函数大驼峰命名法
	};
	Ygtoast.prototype={  //prototype 属性使您有能力向对象添加属性和方法。
		create: function(str,duration) {
			let self = this;
			var toastHtml = '';
			var toastText = '<div class="yg-toast-text">'+str+'</div>';
			toastHtml = '<div class="yg-toast">'+toastText+'</div>';
			if(document.querySelector(".yg-toast"))return;    //当还没hide时禁止重复点击
			document.body.insertAdjacentHTML('beforeend', toastHtml);
			duration == null ? duration=2000 : '';  //如果toast没有加上时间，默认2000毫秒；
			self.show();
			setTimeout(function(){
				self.hide();
			}, duration);
		},
		show:function(){
			let self = this;
			document.querySelector(".yg-toast").style.display = "block";
			document.querySelector(".yg-toast").style.marginTop =  "-"+Math.round(document.querySelector(".yg-toast").offsetHeight/2)+"px";
			if(document.querySelector(".yg-toast"))return;
		},
		hide:function(){
			var self = this;
			if(document.querySelector(".yg-toast")){
				document.querySelector(".yg-toast").parentNode.removeChild(document.querySelector(".yg-toast"));
			}
		},
		toast:function(str,duration){
			var self = this;
			return self.create(str,duration);
		}
	};
	window.Ygtoast = Ygtoast;
}(window));
// $(function () {
//     var u = navigator.userAgent, app = navigator.appVersion;
//     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
//     var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//     if (isAndroid) {
//        //这个是安卓操作系统
//     }
//     if (isIOS) {
// 　　　　//这个是ios操作系统
//     }
// });

	// var UserAPIPost = 'http://dao-yan.uicp.io:26399/'
	// var UserAPIPost = 'http://119.3.14.163:8080/'
	// var OrderAPIPost='http://119.3.14.163:8080/'
	// var OrderAPIPost = 'http://dao-yan.uicp.io:26399/'
	// var UserAPIPost = 'http://192.168.0.94:8080/'
	// var OrderAPIPost='http://192.168.0.94:8080/'
	// var UserAPIPost = 'http://192.168.0.166:19380/'
	// var OrderAPIPost='http://192.168.0.166:19380/'
    //
    // var UserAPIPost = 'http://xzszhg.picp.io/'
    //var OrderAPIPost='http://xzszhg.picp.io/'
	var UserAPIPost = 'http://wap.life.hzjieniu.com/'
	var OrderAPIPost='http://wap.life.hzjieniu.com/'
