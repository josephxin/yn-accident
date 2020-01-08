<template>
	<div class="cont-wrap onely-report">
		<div style="display:flex;margin:0.21rem 0;">
			<div class="base-info-tilte">
				查询条件
			</div>
			<div class="trapezoid-big"></div>
			<div class="trapezoid-smll"></div>
			<divline></divline>
			<div class="show-base-info" @click="showbasecondition">
				<i :class="[isShowbase?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
			</div>
		</div>

		<report-form ref="forms" v-show="isShowbase" :dateShow="false"></report-form>

		<div class="button_go">
			<button class="btn btn-save btn-report" @click="$root.dialogSingle = true"><i class="el-icon-document"></i>报表格式</button>
			<button class="btn btn-save" @click="queryData"><i class="el-icon-search"></i>查询</button>
			<button class="btn btn-add" @click="reset"><i class="el-icon-refresh"></i>重置</button>
		</div>
		<!--弹窗-->
		<dialog-single ref="dialog" :dialogChangeList.sync="changeList"></dialog-single>

		<div class="table-wrap onely_report" id="table-wrap">
			<el-table :data="tableData" stripe  header-align="center">
				<!--fixed="left"-->
				<el-table-column type="index" :index="xuhao" label="序号" align="center" width="60" :resizable="false"></el-table-column>
				<!--v-if="changeList.indexOf(index) != -1"-->
				<el-table-column :prop="item.label" :label="item.name" header-align="center" :resizable="false" :align="(item.label == 'departmentName' || item.label == 'location' || item.label == 'reportDepartmentName' || item.label == 'departmentAddress' || item.label == 'unsafeBehavior' || item.label=='accidentAddress' || item.label=='industryBigCategories' || item.label=='industryCenterCategories' || item.label=='industrySmallCategories') ? 'left' :'center'" v-for="(item,index) in tableHanderFilter" :key="index"  :min-width="(item.label=='departmentName' || item.label=='location' || item.label=='reportDepartmentName' || item.label=='departmentIndustry' || item.label=='departmentAddress' || item.label=='unsafeBehavior' || item.label=='accidentAddress' || item.label=='industryBigCategories' || item.label=='industryCenterCategories' || item.label=='industrySmallCategories') ? '350' : '170'" :show-overflow-tooltip="true">
					
				</el-table-column>
			</el-table>
		</div>
		<!--
			<template slot-scope="scope">
				{{scope.row[item.label]}}
			</template>
		-->
		<!--v-if="tableData.length > 0"-->
		<div style="color: #b8d7ff;margin-top:0.21rem;display: flex;justify-content:flex-end;text-align: center;line-height: 0.35rem">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="sizePage" layout="prev, pager, next, jumper, total" :total="total">
			</el-pagination>
		</div>

		<!--导出要用到的隐藏的tale-->
		<div class="table-wrap" v-show="false">
			<el-table :data="tableDataExport" stripe style="width: 100%" header-align="center" border ref="onelyExecl">
				<!--fixed="left"-->
				<el-table-column type="index" label="序号" align="center"></el-table-column>
				<!--v-if="changeList.indexOf(index) != -1"-->

				<el-table-column :prop="item.label" :label="item.name" align="center" v-for="(item,index) in tableHanderFilter" :key="index"  :min-width="(item.label=='departmentName' || item.label=='location' || item.label=='reportDepartmentName' || item.label=='departmentIndustry' || item.label=='departmentAddress' || item.label=='unsafeBehavior') ? '310' : '110'"></el-table-column>

			</el-table>
		</div>

	</div>
</template>

<script>
	import divline from 'components/divline'
	import reportForm from 'components/reportForm/reportForm'
	import dialogSingle from 'components/dialoglayout/dialogSingle'
	import horizontalScrollBarDrag from './horizontalScrollBarDrag.js'
	import { openPostWindow,BIloading } from '@/assets/js/tools'
	export default {
		name: 'onely',
		components: {
			divline,
			reportForm,
			dialogSingle
		},
		data() {
			return {
				currentPage: 1, //当前的页码
				sizePage: 10, //每页的条数
				total: 0, //总条数
				isShowbase: true,
				value: '1',
				parameter: {}, //参数
				//changeList: [0, 1, 2, 3,4,5,6,7],//默认选择哪些
				changeList: ['reportStatusName', 'grade', 'departmentName', 'typeName', 'accidentIdentification', 'happenTime', 'managementTypeName'],
				//4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50
				tableDataExport: [], //导出
				exportExecl: false,
				tableData: [],
				tableHander: [{
						name: '报送状态',
						label: 'reportStatusName',
						index: 0
					}, {
						name: '事故级别', //（1-一般事故、2-较大事故、3-重大事故、4特别重大事故）
						label: 'grade',
						index: 1,
					}, {
						name: '事故发生单位',
						label: 'departmentName',
						index: 2
					}, {
						name: '事故类型',
						label: 'typeName',
						index: 3
					}, {
						name: '事故标识',
						label: 'accidentIdentification',
						index: 4
					}, {
						name: '发生时间',
						label: 'happenTime',
						index: 5
					},
					{
						name: '管理分类',
						label: 'managementTypeName',
						index: 6
					}, {
						name: '事故地点',
						label: 'location',
						index: 7
					},
					{
						name: '所属行业',
						label: 'departmentIndustry',
						index: 8
					}, {
						name: '直接经济损失(万元)',
						label: 'economicLosses',
						index: 9
					}, {
						name: '初次入库时间',
						label: 'firstStorageTime',
						index: 10
					}, {
						name: '初次上报时间',
						label: 'firstReportTime',
						index: 11
					}, {
						name: '是否为中央企业',
						label: 'isCentralEnterprise', //（0-不是，1-是'）
						index: 12
					}, {
						name: '报送单位',
						label: 'reportDepartmentName',
						index: 13
					}, {
						name: '单位规模',
						label: 'departmentScale',
						index: 14
					}, {
						name: '死亡人数',
						label: 'death',
						index: 15
					}, {
						name: '受伤人数',
						label: 'injured',
						index: 16
					}, {
						name: '重伤人数',
						label: 'serious',
						index: 17
					}, {
						name: '事故单位地址',
						label: 'departmentAddress',
						index: 18
					}, {
						name: '起因物',
						label: 'causedThing',
						index: 19
					}, {
						name: '致害物',
						label: 'harmfulThing',
						index: 20
					}, {
						name: '不安全行为',
						label: 'unsafeBehavior',
						index: 21
					}, {
						name: '不安全状态',
						label: 'unsafeStatus',
						index: 22
					}, {
						name: '单位类型名称',
						label: 'departmentType',
						index: 23
					}, {
						name: '是否为举报事故',
						label: 'isReport', // （0-是，1-否）
						index: 24
					}, {
						name: '非本企业死亡人数',
						label: 'isNotEnterpriseDeathPerson',
						index: 25
					}, {
						name: '非本企业受伤人数',
						label: 'isNotEnterpriseInjuredPerson',
						index: 26
					}, {
						name: '非本企业重伤人数',
						label: 'isNotEnterpriseSeriousPerson',
						index: 27
					}, {
						name: '损失工作日',
						label: 'loseWorkday',
						index: 28
					}, {
						name: '事故单位详细地址',
						label: 'accidentAddress',
						index: 29
					}, {
						name: '单位代码',
						label: 'unitCode',
						index: 30
					}, {
						name: '联系电话',
						label: 'phone',
						index: 31
					}, {
						name: '职工人数',
						label: 'personNum',
						index: 32
					}, {
						name: '评估分类',
						label: 'evaluationType',
						index: 33
					}, {
						name: '控股分类',
						label: 'holdType',
						index: 34
					}, {
						name: '主管部门',
						label: 'competentDepartment',
						index: 35
					}, {
						name: '子企业名称',
						label: 'subEnterpriseName',
						index: 36
					}, {
						name: '企业部门',
						label: 'businessEnterprise',
						index: 37
					}, {
						name: '事故原因',
						label: 'accidentCause',
						index: 38
					}, {
						name: '是否结案',
						label: 'isLawsuit', //(0-未结案，1-结案)
						index: 39
					}, {
						name: '行业大类',
						label: 'industryBigCategories',
						index: 40
					}, {
						name: '行业中类',
						label: 'industryCenterCategories',
						index: 41
					}, {
						name: '行业小类',
						label: 'industrySmallCategories',
						index: 42
					},
					{
						name: '煤矿类别',
						label: 'collieryType',
						index: 43
					}, {
						name: '煤矿事故类型',
						label: 'collieryAccidentType',
						index: 44
					}, {
						name: '煤矿致害原因',
						label: 'collieryDamageCause',
						index: 45
					}, {
						name: '煤矿统计类别',
						label: 'collieryCountType',
						index: 46
					}, {
						name: '危险品事故分类',
						label: 'hazardousAccidentType',
						index: 47
					}, {
						name: '危化事故环节',
						label: 'hazardousAccidentLink',
						index: 48
					}, {
						name: '危险化学品类别',
						label: 'dangerousChemicalType',
						index: 49
					}, {
						name: '单位合法性',
						label: 'unitValidity', //（0-合法、1-非法）
						index: 50
					}
				],	
				reallyIndex:0,
			}
		},
		computed:{
			tableHanderFilter(){	//过滤选中的			
				return this.tableHander.filter((user)=> {					
      				 if(this.changeList.indexOf(user.label) != -1){
      				 	return  user
      				 }
    			})
			}
		},
		watch: {
			//当前页
			currentPage: {
				handler(val, olVal) {
					if(val) {
						this.onelyReportAjax() //调用接口
					}
				},
				deep: true
			},
			//每页的条数
			sizePage: {
				handler(val, olVal) {
					if(val) {
						this.onelyReportAjax() //调用接口
					}
				},
				deep: true
			},
			//当前选中的筛选条件
			/*changeList: {
				handler(val, olVal) {
					this.$debug && console.log(val);
				},
				deep: true
			}*/
		},
		//过滤器
		filters: {　　　　　　
			decimal: (myNum) => {
				//this.$debug && console.log(myNum)
				if(myNum){
					return myNum　　
				}else{
					return "--"
				}
				　
			}　　　　
		},
		methods: {
			xuhao(index){
				if(index >= this.reallyIndex){
					return '';
				}else{
					return index + 1
				}
			},
			//过滤
			handleCurrentChange(val) {
				//this.$debug && console.log(`当前页: ${val}`);
				this.currentPage = val

			},
			handleSizeChange(val) {
				//this.$debug && console.log(`每页 ${val} 条`);
				this.sizePage = val
			},
			showbasecondition() {
				this.isShowbase = !this.isShowbase
			},
			reset() { //点击重置
				this.$refs.forms.formResetFields()
			},
			//查询
			queryData() {
				this.$refs.forms.$refs.form.validate((valid) => {
					if(valid) {
						this.currentPage = 1; //每次查询都是第一页
						this.onelyReportAjax()
					} else {
						this.$message.error('查询条件有错误');
						return false;
					}
				});
			},
			//查询接口
			onelyReportAjax() {
				//获取查询条件
				var params = this.parameterAssignment()
				//var childForm = this.$refs.forms.form //子级的form
				//调用接口
				this.$xhr.getDanYiCustomReport(params).then(data => {
					//this.$debug && console.log("分页", data)
					if(data.code == 0) {
						//赋值
						this.tableData = Object.assign([], data.list)
						this.reallyIndex = this.tableData.length
						if(this.tableData.length > 0) {
							this.$parent.disState = false //父级导出按钮能点击
							this.total = data.totalCount //总条数
							var arr = []
							this.tableData.forEach((item, i) => {
								//（1-一般事故、2-较大事故、3-重大事故、4特别重大事故）
								switch(item.grade) {
									case 1:
										item.grade = "一般事故"
										break;
									case 2:
										item.grade = "较大事故"
										break;
									case 3:
										item.grade = "重大事故"
										break;
									case 4:
										item.grade = "特别重大事故"
										break;
								}
								//isCentralEnterprise（0-否，1-是'）
								switch(item.isCentralEnterprise) {
									case 0:
										item.isCentralEnterprise = "否"
										break;
									case 1:
										item.isCentralEnterprise = "是"
										break;
								}
								//isReport （0-是，1-否）
								switch(item.isReport) {
									case 0:
										item.isReport = "是"
										break;
									case 1:
										item.isReport = "否"
										break;
								}
								//isLawsuit          (0-未结案，1-结案)
								switch(item.isLawsuit) {
									case 0:
										item.isLawsuit = "未结案"
										break;
									case 1:
										item.isLawsuit = "结案"
										break;
								}

								//unitValidity（0-合法、1-非法）
								switch(item.unitValidity) {
									case 0:
										item.unitValidity = "合法"
										break;
									case 1:
										item.unitValidity = "非法"
										break;
								}
							})
							
							//不足10条时补上少的
							if(this.tableData.length < 10){
								
								var index = 10-this.tableData.length;
								for(var i = 0; i<index;i++){
									var obj = {}
									this.tableData.push(obj)
								}
							}
						} else {
							this.$parent.disState = true //父级导出按钮不能点击
							this.$message({
								message: '您查询的条件暂无数据',
								type: 'success',
								duration: 1000
							});
						}
					}
				}).catch(err => {
					this.$message.error(err);
					//this.$debug && console.log(err)
				})
			},
			//导出时是导出当前显示的所有数据
			exportTableData() {
				BIloading.show()
				var params = this.parameterAssignment()
				params.pageNum = '' //页码
				params.pageSize = '' //每页的条数
				params.head = this.changeList
				openPostWindow(window.baseUrl1+'/exportSingleExcel',params)
				//后台导出
				/*this.$xhr.exportSingleExcel(params).then(data=>{
					console.log(data)
					//var blob = new Blob([res.json()]); //创建一个blob对象
                 	//var a = document.createElement('a'); //创建一个<a></a>标签
                 	//a.href = URL.createObjectURL(blob); // response is a blob
                	//a.download = "用户列表.xlsx";  //文件名称
                 	//a.style.display = 'none';
                 	//document.body.appendChild(a);
                 	//a.click();
                 	//a.remove();
					
					
				})*/
				
				/*this.$xhr.getDanYiCustomReport(params).then(data => {
					//this.$debug && console.log("导出", data)
					if(data.code == 0) {
						//赋值
						this.tableDataExport = Object.assign([], data.list)
						if(this.tableDataExport.length > 0) {
							this.$parent.disState = false //父级导出按钮能点击
							this.exportExecl = true //父级判断是不是导出
							var arr = []
							this.tableDataExport.forEach((item, i) => {
								//（1-一般事故、2-较大事故、3-重大事故、4特别重大事故）
								switch(item.grade) {
									case 1:
										item.grade = "一般事故"
										break;
									case 2:
										item.grade = "较大事故"
										break;
									case 3:
										item.grade = "重大事故"
										break;
									case 4:
										item.grade = "特别重大事故"
										break;
								}
								//isCentralEnterprise（0-不是，1-是'）
								switch(item.isCentralEnterprise) {
									case 0:
										item.isCentralEnterprise = "否"
										break;
									case 1:
										item.isCentralEnterprise = "是"
										break;
								}
								//isReport （0-是，1-不是）
								switch(item.isReport) {
									case 0:
										item.isReport = "是"
										break;
									case 1:
										item.isReport = "否"
										break;
								}
								//isLawsuit          (0-未结案，1-结案)
								switch(item.isLawsuit) {
									case 0:
										item.isLawsuit = "未结案"
										break;
									case 1:
										item.isLawsuit = "结案"
										break;
								}

								//unitValidity（0-合法、1-非法）
								switch(item.unitValidity) {
									case 0:
										item.unitValidity = "合法"
										break;
									case 1:
										item.unitValidity = "非法"
										break;
								}
							})

							setTimeout(() => {
								var HTML = this.$refs.onelyExecl.$el.innerHTML
								this.execlDownload(HTML)
							})

						} else {
							this.$debug && console.log(data.message)
						}
					}
				})*/
			},
			//导出
			base(s) {
				return window.btoa(unescape(encodeURIComponent(s)))
			},
			execlDownload(html, dom) {
				//前台导出,不兼容ie
				var worksheet = 'Sheet1'
				var uri = 'data:application/vnd.ms-excel;base64,';
				var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
								<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>        
								<x:Name>${worksheet}</x:Name>     
								<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->        </head><body>${html}</body></html>`;
				//下载模板     
				window.location.href = uri + this.base(template)

				//添加删除的table
				/*if(dom) {
					setTimeout(() => {
						var parentDom = document.querySelector('.el-table')
						var childrenDom = document.querySelector('.el-table__column-resize-proxy')
						parentDom.insertBefore(dom, childrenDom)
					})
				}*/
			},
			//参数赋值
			parameterAssignment() {
				var childForm = this.$refs.forms.form //子级的form
				return {
					pageNum: this.currentPage, //页码
					pageSize: this.sizePage, //每页的条数
					reportStatusId: childForm.reportStatusId, //报送状态
					grade: childForm.grade, //事故级别
					departmentName: childForm.departmentName, //事故发生单位
					typeId: childForm.typeId, //事故类型
					accidentIdentificationId: childForm.accidentIdentificationId, //事故标识
					accidentStartDate: childForm.accidentStartDate, //发生时间
					accidentEndDate: childForm.accidentEndDate, //截止时间
					managementTypeId: childForm.managementTypeId, //管理分类
					cityAreaId: childForm.cityAreaId, //事故地点(市)
					districtAreaId: childForm.districtAreaId, //事故地点（县）
					departmentIndustryId: childForm.departmentIndustryId, //所属行业
					economicLosses: childForm.economicLosses, //直接经济损失
					firstStorageTime: childForm.firstStorageTime, //初次入库时间
					firstReportTime: childForm.firstReportTime, //初次上报时间
					isCentralEnterprise: childForm.isCentralEnterprise, //单位性质 对应是否为中央企业
					unitCityAreaId: childForm.unitCityAreaId, //报送单位（市）
					unitDistrictAreaId: childForm.unitDistrictAreaId, //报送单位（县）
					departmentScaleId: childForm.departmentScaleId, //单位规模
					deathStart: childForm.deathStart, //死亡人数(小)
					deathEnd: childForm.deathEnd, //死亡人数(大)
					injuredStart: childForm.injuredStart, //受伤人数(小)
					injuredEnd: childForm.injuredEnd, //受伤人数(大)
					seriousStart: childForm.seriousStart, //重伤人数(小)
					seriousEnd: childForm.seriousEnd, //重伤人数(大)
					addressCityAreaId: childForm.addressCityAreaId, //事故单位地址（市）
					addressDistrictAreaId: childForm.addressDistrictAreaId, //事故单位地址（县）
					causedThingId: childForm.causedThingId, //起因物
					harmfulThingId: childForm.harmfulThingId, //致害物
					unsafeBehaviorId: childForm.unsafeBehaviorId, //不安全行为
					unsafeStatusId: childForm.unsafeStatusId, //不安全状态
					departmentTypeId: childForm.departmentTypeId, //单位类型名称
					isReport: childForm.isReport, //是否为举报事故
					isNotEnterpriseDeathPersonStart: childForm.isNotEnterpriseDeathPersonStart, //非本企业死亡人数（小）
					isNotEnterpriseDeathPersonEnd: childForm.isNotEnterpriseDeathPersonEnd, //非本企业死亡人数（大）
					isNotEnterpriseInjuredPersonStart: childForm.isNotEnterpriseInjuredPersonStart, //非本企业受伤人数（小）
					isNotEnterpriseInjuredPersonEnd: childForm.isNotEnterpriseInjuredPersonEnd, //非本企业受伤人数（大）
					isNotEnterpriseSeriousPersonStart: childForm.isNotEnterpriseSeriousPersonStart, //非本企业重伤人数（小）
					isNotEnterpriseSeriousPersonEnd: childForm.isNotEnterpriseSeriousPersonEnd, //非本企业重伤人数（大）
					loseWorkday: childForm.loseWorkday, //损失工作日
					accidentAddress: childForm.accidentAddress, //事故单位详细地址
					unitCode: childForm.unitCode, //单位代码
					phone: childForm.phone, //联系电话
					personNum: childForm.personNum, //职工人数
					evaluationTypeId: childForm.evaluationTypeId, //评估分类
					holdTypeId: childForm.holdTypeId, //控股分类
					competentDepartment: childForm.competentDepartment, //主管部门
					subEnterpriseName: childForm.subEnterpriseName, //子企业名称
					businessEnterprise: childForm.businessEnterprise, //企业部门
					accidentCauseId: childForm.accidentCauseId, //事故原因
					isLawsuit: childForm.isLawsuit, //是否结案
					industryBigCategoriesId: childForm.industryBigCategoriesId, //行业大类
					industryCenterCategoriesId: childForm.industryCenterCategoriesId, //行业中类
					industrySmallCategoriesId: childForm.industrySmallCategoriesId, //行业小类
					//collieryLackPapersId: '', //煤矿缺少何种证件
					collieryTypeId: childForm.collieryTypeId, //煤矿类别
					collieryAccidentTypeId: childForm.collieryAccidentTypeId, //煤矿事故类型
					collieryDamageCauseId: childForm.collieryDamageCauseId, //煤矿致害原因
					collieryCountTypeId: childForm.collieryCountTypeId, //煤矿统计类别
					hazardousAccidentTypeId: childForm.hazardousAccidentTypeId, //危险品事故分类
					hazardousAccidentLinkId: childForm.hazardousAccidentLinkId, //危化事故环节
					dangerousChemicalTypeId: childForm.dangerousChemicalTypeId, //危险化学品类别
					unitValidity: childForm.unitValidity, //单位合法性

				}

			}

		},
		mounted() {
			this.$parent.disState = true
			//this.list = this.$refs.dialog.checkList
			horizontalScrollBarDrag("table-wrap","el-table__body-wrapper")
			this.queryData()
		}

	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.cont-wrap {
		margin: 0;
		padding: 0;
		.base-info-tilte {
			width: auto;
			position: relative;
			text-align: center;
			margin-top: 0.014rem;
			/*color: #82A1D6;
			padding: 0.055rem 0.52rem;*/
			color: #FFF;
			padding:4px 52px;
			
			white-space: nowrap;
			&:after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background-color: rgba(11, 187, 255, 0.2);
				border: 1px solid #0C6CF2;
				transform: perspective(.7em) rotateX(1.2deg);
				transform-origin: left;
			}
		}
		.trapezoid-big {
			background-color: rgba(11, 187, 255, 0.2);
			border: 1px solid #0C6CF2;
			margin-left: 0.084rem;
			margin-right: 0.035rem;
			width: .14rem;
			-webkit-transform: skewX(15deg);
		}
		.trapezoid-smll {
			background-color: rgba(11, 187, 255, 0.2);
			border: 1px solid #0C6CF2;
			width: 0.07rem;
			-webkit-transform: skewX(15deg);
		}
		.show-base-info {
			position: absolute;
			right: .14rem;
			color: #0C6CF2;
			&:hover {
				color: #EBB161;
			}
		}
		.condition-wrap {
			margin: .14rem .28rem;
			display: flex;
			/*justify-content: space-between;*/
			flex-wrap: wrap;
		}
		.condition-wrap-item {
			width: 23%;
			margin-bottom: .14rem;
			display: flex;
			justify-content: flex-end;
			flex-wrap: nowrap;
			.el-select {
				width: 1.26rem;
			}
		}
		.button_go {
			display: flex;
			justify-content: flex-end;
			margin: .15rem 0;
			.btn-add {
				cursor: pointer;
				/*width: .98rem;
				height: .32rem;*/
				/*padding: 0.028rem .14rem;*/
				padding:4.5px 14px;
			}
			.btn-save {
				margin-right: .14rem;
				cursor: pointer;
				/*width: .98rem;
				height: .32rem;*/
				/*padding: 0.028rem .14rem;*/
				padding:4.5px 14px;
			}
			.btn-report{
				/*width: 1.28rem;*/
			}
		}
		.table-wrap{
			cursor:move;
			user-select: none;
			border: 1px solid #2158ab;
		}
	}
	@media screen and (max-width: 1366px) {
	    .onely-report{
	    	.base-info-tilte{
	    		padding:3px 40px;
	    	}
	    }
	}
</style>