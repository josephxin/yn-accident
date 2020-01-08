import $api from './api'
//import { baseURL } from './config'
//console.log(baseURL);

window.baseUrl1 = window.baseURL
window.baseUrl2 = window.baseURL
window.baseUrl3 = window.baseURL
window.baseUrl4 = window.baseURL


/*
 *判断token
 * 是否登录
 */
///auth/token      ///sgLogin/sgYnPingtaiLogin
const getSgYnPingtaiLogin = (params) => {
	return $api.get({
		url: baseUrl2 + '/sgLogin/sgYnPingtaiLogin',
		params
	})
}
/*
 *上报提醒
 *
 */
//获取科室
const organizationList = (params) => {
	return $api.get({
		url: baseUrl2 + '/report/organizationList',
		params
	})
}
//上报提醒点击确定
const report = (params) => {
	return $api.get({
		url: baseUrl2 + '/report/report',
		params
	})
}

//事故调查处理导出
const exportAccidentListExcel = (params) => {
	return $api.post({
		url: baseUrl2 + '/exportAccidentListExcel',
		params
	})
}

/*
 * 卷宗档案接口
 * */
//卷宗档案列表
const getDossiersList = (params) => {
	return $api.get({
		url: baseUrl2 + '/fileArchive/selectAll',
		params
	})
}
//删除文件
const deleteFile = (params) => {
	return $api.get({
		url: baseUrl2 + '/fileArchive/delete',
		params
	})
}

const getMapList = (params) => {
	return $api.get({
		url: baseUrl1 + '/sgclAccidentBase/getMapList',
		params
	})
}

const getMapListOther = (params) => {
	return $api.get({
		url: baseUrl1 + '/sgclAccidentBase/getMapListOther',
		params
	})
}

const distractList = (params) => {
	return $api.get({
		url: baseUrl1 + '/ynDictionary/distractList',
		params
	})
}

const getstaticCdtn = () => {
	return $api.get({
		url: baseUrl1 + '/ynDictionary/ynDictionaryGeoList'
	})
}

const getConditionList = () => {
	return $api.get({
		url: baseUrl2 + '/ynDictionary/ynDictionaryList'
	})
}

const accidentList = (params) => {
	return $api.get({
		url: baseUrl2 + '/accidentInfoList/accidentList',
		params
	})
}

//accidentListDetail//

const accidentListDetail = (params) => {
	return $api.get({
		url: baseUrl2 + '/accidentInfoList/accidentListDetail',
		params
	})
}

///sgclCasualties/save 伤亡人员新增
const casualtiesSave = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclCasualties/insert',
		params
	})
}
//casultData 伤亡人员列表     GET /sgclCasualties/sgclCasualtiesList
const sgclCasualtiesList = (params) => {
	return $api.get({
		url: baseUrl2 + '/sgclCasualties/sgclCasualtiesList',
		params
	})
}

//伤亡人员列表  删除
const sgclCasualtiesDelete = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclCasualties/delete',
		params
	})
}
//伤亡人员列表  修改
const sgclCasualtiesUpdate = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclCasualties/update',
		params
	})
}

//调查组信息
//sgclInvestgationTeamInfo/saveOrUpdate
const saveOrUpdate = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclInvestgationTeamInfo/saveOrUpdate',
		params
	})
}

//调查组人员信息 新增
const saveSgclInspectorInfo = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclInspectorInfo/insert',
		params
	})
}
//调查组人员列表list
const sgclInspectorInfoList = (params) => {
	return $api.get({
		url: baseUrl2 + '/sgclInspectorInfo/sgclInspectorInfoList',
		params
	})
}
//修改
const updateSgclInspectorInfo = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclInspectorInfo/update',
		params
	})
}

//删除
const deleteSgclInspectorInfo = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclInspectorInfo/delete',
		params
	})
}

//调查报告属性信息
//修改添加
const reportSaveOrUpdate = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclInvestReports/saveOrUpdate',
		params
	})
}

///sgclPunlishedEntAndPersonInfo/save  被处理行政及人员信息 新增
const sgclPunlishedEntAndPersonInfoSave = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclPunlishedEntAndPersonInfo/insert',
		params
	})
}
///sgclPunlishedEntAndPersonInfo/personInfoList 所有数据

const personInfoList = (params) => {
	return $api.get({
		url: baseUrl2 + '/sgclPunlishedEntAndPersonInfo/personInfoList',
		params
	})
}

///sgclPunlishedEntAndPersonInfo/update  修改
const sgclPunlishedEntAndPersonInfoUpdate = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclPunlishedEntAndPersonInfo/update',
		params
	})
}

//POST /sgclPunlishedEntAndPersonInfo/delete 删除
const sgclPunlishedEntAndPersonInfoDelete = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclPunlishedEntAndPersonInfo/delete',
		params
	})
}

//被处理行政人员信息
//list
//GET /sgclPunlishedAdminisstrativeStaffInfo/sgclStaffInfoList
const sgclStaffInfoList = (params) => {
	return $api.get({
		url: baseUrl2 + '/sgclPunlishedAdminisstrativeStaffInfo/sgclStaffInfoList',
		params
	})
}
//新增  /sgclPunlishedAdminisstrativeStaffInfo/insert
const sgclStaffInfoInsert = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclPunlishedAdminisstrativeStaffInfo/insert',
		params
	})
}
//修改 /sgclPunlishedAdminisstrativeStaffInfo/update
const sgclStaffInfoUpdate = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclPunlishedAdminisstrativeStaffInfo/update',
		params
	})
}
//删除  POST /sgclPunlishedAdminisstrativeStaffInfo/delete
const sgclStaffInfoDelete = (params) => {
	return $api.post({
		url: baseUrl2 + '/sgclPunlishedAdminisstrativeStaffInfo/delete',
		params
	})
}

//结案  /accidentInfoList/updateTime
const accidentInfoListUpdateTime = (params) => {
	return $api.get({
		url: baseUrl2 + '/accidentInfoList/updateTime',
		params
	})
}

//  事故列表导出
///accidentInfoList/accidentListOutput
const accidentListOutput = (params) => {
	return $api.get({
		url: baseUrl2 + '/accidentInfoList/accidentListOutput',
		params
	})
}

/*
 *自定义报表
 * */
//单一报表 查询
const getDanYiCustomReport = (params) => {
		return $api.post({
			url: baseUrl4 + '/intelligent-analysis/getDanYiCustomReport',
			params
		})
	}
//单一报表导出
/*const exportSingleExcel = (params) => {
		return $api.post({
			url: baseUrl4 + '/exportSingleExcel',
			params
		})
}*/

//统计报表 查询   
const getCustomReport = (params) => {
	return $api.post({
		url: baseUrl1 + '/sgclAccidentBase/getCustomReport',
		params
	})
}
//统计导出
const exportCustomExcel = (params) => {
	return $api.post({
		url: baseUrl1 + '/exportCustomExcel',
		params
	})
}

// 公共的下拉框数据
const ynDictionaryReportList = (params) => {
	return $api.get({
		url: baseUrl1 + '/ynDictionary/ynDictionaryReportList',
		params
	})
}

//县级数据
const ynDdistractList = (params) => {
	return $api.get({
		url: baseUrl1 + '/ynDictionary/distractList',
		params
	})
}

//行业数据
const ynDictionaryIndustry = (params) => {
	return $api.get({
		url: baseUrl1 + '/ynDictionary/ynDictionaryIndustry',
		params
	})
}

/*弹窗-事故动态接口*/
//事故信息弹窗，卷宗档案弹窗(公用一个)
const selectSg = (params) => {
	return $api.get({
		url: baseUrl1 + '/sgclDynamicRecord/selectSg',
		params
	})
}

/*数据源管理*/
//数据源-文件列表
const pageList = (params) => {
	return $api.get({
		url: baseUrl1 + '/sgclFileNote/pageList',
		params
	})
}
//数据源-文件删除
const deleteDataSource = (params) => {
	return $api.get({
		url: baseUrl1 + '/sgclFileNote/delete',
		params
	})
}
//数据源-文件上传(post请求)
const uploadBack = (params) => {
	return $api.post({
		url: baseUrl1 + '/uploadExcel/uploadBack',
		params
	})
}

export {
	//判断登录
	getSgYnPingtaiLogin,
	//上报提醒
	organizationList,
	//导出
	exportAccidentListExcel,
	//上报提醒点击确定
	report,
	//卷宗档案接口
	getDossiersList,
	deleteFile,

	/*
	 * 事故统计
	 * */
	//地图渲染查询数据
	getMapList,
	//地图渲染同比数据
	getMapListOther,
	//区县
	distractList,
	//条件选择数据
	getstaticCdtn,

	//事故详情
	accidentListDetail,
	//  伤亡人员
	sgclCasualtiesList,
	casualtiesSave,
	sgclCasualtiesDelete,
	sgclCasualtiesUpdate,

	//调查组信息
	saveOrUpdate,
	//调查组人员信息
	//新增
	saveSgclInspectorInfo,
	//修改
	updateSgclInspectorInfo,
	//删除
	deleteSgclInspectorInfo,
	//调查人员列表
	sgclInspectorInfoList,
	//调查报告属性添加修改
	reportSaveOrUpdate,

	//被处理企业及人员信息 新增
	sgclPunlishedEntAndPersonInfoSave,
	//list
	personInfoList,
	//修改
	sgclPunlishedEntAndPersonInfoUpdate,
	//删除
	sgclPunlishedEntAndPersonInfoDelete,

	//被处理行政人员信息
	//list
	sgclStaffInfoList,
	//新增
	sgclStaffInfoInsert,
	//修改
	sgclStaffInfoUpdate,
	//删除
	sgclStaffInfoDelete,

	//结案时间
	accidentInfoListUpdateTime,

	//事故列表
	getConditionList,
	//事故列表表格数据
	accidentList,
	//事故列表导出
	accidentListOutput,

	//自定义报表
	//单一查询
	getDanYiCustomReport,
	//单一导出
	//exportSingleExcel,
	//统计查询
	getCustomReport,
	//统计导出
	exportCustomExcel,
	//公共的下拉框数据
	ynDictionaryReportList,
	//县级数据
	ynDdistractList,
	//行业数据
	ynDictionaryIndustry,
	
	//事故信息弹窗
	selectSg,
	
	//数据源管理
	pageList,
	deleteDataSource,
	uploadBack,
}