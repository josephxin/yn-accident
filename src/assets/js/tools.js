import { Loading } from 'element-ui'
//转化时间戳(返回yyyy-MM-dd格式或者yyyy-MM-dd HH:mm:ss)
const formatTime = (time, flag) => {
	var now = new Date(time);
	var year = now.getFullYear();
	var month = now.getMonth() + 1 < 10 ?
		"0" + (now.getMonth() + 1) :
		now.getMonth() + 1;
	var date = now.getDate() < 10 ?
		"0" + now.getDate() :
		now.getDate();
	var hour = now.getHours() < 10 ?
		"0" + now.getHours() :
		now.getHours();
	var minute = now.getMinutes() < 10 ?
		"0" + now.getMinutes() :
		now.getMinutes();
	var second = now.getSeconds() < 10 ?
		"0" + now.getSeconds() :
		now.getSeconds();
	if(flag) {
		return year + "-" + month + "-" + date;
	}
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
/**
 * 将中文转换为 ASCII 码
 * @param  {Object} params {key: '汉字'}
 * @return {Object}        {key: '%E6%B1%89%E5%AD%97'}
 */
const handleChinese = function(params) {
	const pattern = new RegExp('[\u4E00-\u9FA5]+') // 正则匹配中文字符
	let newObj = {}
	for(let i in params) {
		if(pattern.test(params[i])) {
			newObj[i] = encodeURI(params[i])
		}
	}
	return newObj
}

// 请求数据添加loading
const BIloading = {
	needLoadingRequestCount: 0,
	loadingInstance: null,
	startLoading() {
		this.loadingInstance = Loading.service({
			lock: true,
			text: '数据加载中……',
			background: 'rgba(255, 255, 255, 0.5)',
			target: '#app',
			customClass: 'BI-loading'
		})
	},
	endLoading() {
		this.loadingInstance.close()
	},
	show() {
		if(this.needLoadingRequestCount === 0) {
			this.startLoading()
		}
		this.needLoadingRequestCount++
	},
	hidde() {
		if(this.needLoadingRequestCount <= 0) {
			return
		}
		this.needLoadingRequestCount--;
		if(this.needLoadingRequestCount === 0) {
			this.endLoading()
		}
	}
}

// 请求数据添加loading
const BIloading2 = {
	needLoadingRequestCount: 0,
	loadingInstance: null,
	startLoading() {
		this.loadingInstance = Loading.service({
			lock: true,
			text: '系统验证中……',
			background: 'rgb(12, 69, 158)',
			target: 'body',
			customClass: 'BI-loading2'
		})
	},
	endLoading() {
		this.loadingInstance.close()
	},
	show() {
		if(this.needLoadingRequestCount === 0) {
			this.startLoading()
		}
		this.needLoadingRequestCount++
	},
	hidde() {
		if(this.needLoadingRequestCount <= 0) {
			return
		}
		this.needLoadingRequestCount--;
		if(this.needLoadingRequestCount === 0) {
			this.endLoading()
		}
	}
}

//导出方法
const  openPostWindow = (url, params)=>{
    //var newWin = window.open(); //打开新窗口    
    var formStr;
    params=JSON.stringify(params)   //转成字符串
    //设置样式为隐藏，打开新标签再跳转页面前，如果有可现实的表单选项，用户会看到表单内容数据
   	formStr = `<form id="formPost" style="visibility:hidden;" method="POST" action="${url}"><input type="hidden" name="params" value=${params} /></form>`;
   	var fromHtml = document.getElementById('from')
   	fromHtml.innerHTML = formStr;
   	var formPost = document.getElementById('formPost');
   	formPost.submit();
   	fromHtml.removeChild(formPost);
   	BIloading.hidde()
   	
 	//newWin.document.body.innerHTML = formStr;
 	//newWin.document.forms[0].submit();		
   	/*setTimeout(()=>{
   		newWin.close()//关闭窗口
   	},3000)*/
    //return newWin;
}

/*const  openPostWindow =(url,params) =>{
	//ie不兼容
    var tempForm = document.createElement("form");
    tempForm.id = "tempForm1";
    tempForm.method = "post";
    tempForm.action = url;
    var hideInput1 = document.createElement("input");
    hideInput1.type = "hidden";
    hideInput1.name="params"; //后台要接受这个参数来取值
    hideInput1.value = params; //后台实际取到的值
    tempForm.appendChild(hideInput1);
    if(document.all){
        tempForm.attachEvent("onsubmit",function(){});        //IE
    }else{
        var subObj = tempForm.addEventListener("submit",function(){},false);    //firefox
    }
    document.body.appendChild(tempForm);
    if(document.all){
        tempForm.fireEvent("onsubmit");
    }else{
        tempForm.dispatchEvent(new Event("submit"));
    }
    tempForm.submit();
    document.body.removeChild(tempForm);
}*/


/*
 //前端导出 ie无效
 base(s) {
	return window.btoa(unescape(encodeURIComponent(s)))
},
execlDownload(html, dom) {
	var worksheet = 'Sheet1'
	var uri = 'data:application/vnd.ms-excel;base64,'
	var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
					<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
					<x:Name>${worksheet}</x:Name>
					<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->        </head><body>${html}</body></html>`
	//下载模板
	//window.location.href = uri + this.base(template)
	var a = document.createElement('a'); //创建一个<a></a>标签
       	a.href = uri + this.base(template)
      	a.download = "事故列表.xls";  //文件名称
       	a.style.display = 'none';
       	document.body.appendChild(a);
       	a.click();
       	a.remove();
	//添加删除的table
	if(dom) {
		setTimeout(() => {
			var parentDom = document.querySelector('.el-table')
			var childrenDom = document.querySelector('.el-table__column-resize-proxy')
			parentDom.insertBefore(dom, childrenDom)
		})
	}
} 
 */


export {
	formatTime,
	handleChinese,
	BIloading,
	BIloading2,
	openPostWindow
}