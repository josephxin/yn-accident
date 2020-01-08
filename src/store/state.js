const state = {
	themeCls: '',
	tableExcel: {}, //自定义报表中导出参数时需要用的参数
	status: null, //判断是否结案 0未结案  1结案
	statisicsGolistparam: {}, //事故统计跳转到事故列表需要的参数
	accidentList: [],//事故信息弹窗数据
	isLocal:false,
	token:'',//登录信息
}

export default state