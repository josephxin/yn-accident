<template>
	<div class="statistics-report">
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

		<report-form ref="forms" v-show="isShowbase" :dateShow="true"></report-form>

		<div>
			<div style="display:flex;margin:0.21rem 0;">
				<div class="base-info-tilte">
					综合统计
				</div>
				<div class="trapezoid-big"></div>
				<div class="trapezoid-smll"></div>
				<divline></divline>
				<div class="show-base-info" @click="showCom">
					<i :class="[isShowCom?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
				</div>
			</div>
			<div v-show="isShowCom">
				<div class="s_r_root">
					<el-radio v-model="main" label="1">主栏选择</el-radio>
					<div class="s_r_root_child">
						<el-radio-group v-model="mainChild">
							<el-radio :label='item.label' v-for='(item,index) in mainColumn' :disabled="item.label == 'oldSystem' || item.label == 'newSystem'" :key='index'>{{item.name}}</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div class="s_r_root">
					<el-radio v-model="vice" label="1">副栏选择</el-radio>
					<div class="s_r_root_child">
						<el-checkbox-group v-model="viceChild">
							<el-checkbox :label='item.label' v-for='(item,index) in viceColumn' :key='index'>{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
				<div class="s_r_root">
					<el-radio v-model="other" label="1">其他条件</el-radio>
					<div class="s_r_root_child">
						<div class="with">
							同比：
							<el-radio-group v-model="otherChild">
								<el-radio :label='item.label' v-for='(item,index) in otherColumn' :key='index'>{{item.name}}</el-radio>
							</el-radio-group>
						</div>
						<div class="with">
							同比(%)：
							<el-radio-group v-model="otherChildPercent">
								<el-radio :label='item.label' v-for='(item,index) in otherColumn' :key='index'>{{item.name}}</el-radio>
							</el-radio-group>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="button_go">
			<button class="btn-save btn" @click="queryData"><i class="el-icon-search"></i>查询</button>
			<button class="btn-add btn" @click="reset"><i class="el-icon-refresh"></i>重置</button>
		</div>
		<!-- 报表-->
		<div class="table-wrap" id="table-wrap2">
			<el-table :data="tableData" style="width: 100%" header-align="center" ref="tableExecl">
				<el-table-column prop="type" label="" width="150" fixed="left" :resizable="false"></el-table-column>
				<el-table-column :label="oneItem.label" align="center" v-for='(oneItem,oneIndex) in tableOneHeaderFilters' :key='oneIndex' >
					<el-table-column :label="twoItem.label" align="center" v-for='(twoItem,twoIndex) in oneItem.tableTwoHeader' :key='twoIndex' v-if="twoIndex ? (twoIndex == 1 ?(otherChildTwo==1?true:false):(twoIndex == 2? (otherChildPercentTwo == 1? true: false):false) ): true">
						<el-table-column :label="threeItem.label" align="center" :min-width="(threeItem.label == '直接经济损失(万元)' ) ? '150' : '90'" v-for='(threeItem,threeIndex) in twoItem.tableThreeHeader' :key='threeIndex'>
							<template slot-scope="scope">
								{{scope.row[threeItem.name] | decimal}}
								<i class="iconfont icon-jiantou" v-if="twoIndex != 0 && scope.row[threeItem.name] > 0"></i>
								<i class="iconfont icon-xiajiantou" v-if="twoIndex != 0 && scope.row[threeItem.name] < 0"></i>
							</template>
						</el-table-column>
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>

	</div>
</template>

<script>
	import divline from 'components/divline'
	import reportForm from 'components/reportForm/reportForm'
	import horizontalScrollBarDrag from './horizontalScrollBarDrag.js'
	import {openPostWindow,BIloading } from '@/assets/js/tools'
	export default {
		name: 'statistics-report',
		components: {
			reportForm,
			divline
		},
		data() {
			return {
				tableData: [], //总体数据
				tableOneHeader: [{
					label: '总计',
					index:0,
					tableTwoHeader: [{
						label: '总计',
						tableThreeHeader: [{
							label: '起数',
							name: "tnumber"
						}, {
							label: '死亡',
							name: "tdeath"
						}, {
							label: '受伤',
							name: "tinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "teloss"
						}]
					}, {
						label: '同比±',
						tableThreeHeader: [{
							label: '起数',
							name: "tynumber"
						}, {
							label: '死亡',
							name: "tydeath"
						}, {
							label: '受伤',
							name: "tyinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "tyeloss"
						}]
					}, {
						label: '同比±%',
						tableThreeHeader: [{
							label: '起数',
							name: "tpnumber"
						}, {
							label: '死亡',
							name: "tpdeath"
						}, {
							label: '受伤',
							name: "tpinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "tpeloss"
						}]
					}]
				}, {
					label: '一般事故',
					index:1,
					tableTwoHeader: [{
						label: '总计',
						tableThreeHeader: [{
							label: '起数',
							name: "cnumber"
						}, {
							label: '死亡',
							name: "cdeath"
						}, {
							label: '受伤',
							name: "cinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "celoss"
						}]
					}, {
						label: '同比±',
						tableThreeHeader: [{
							label: '起数',
							name: "cynumber"
						}, {
							label: '死亡',
							name: "cydeath"
						}, {
							label: '受伤',
							name: "cyinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "cyeloss"
						}]
					}, {
						label: '同比±%',
						tableThreeHeader: [{
							label: '起数',
							name: "cpnumber"
						}, {
							label: '死亡',
							name: "cpdeath"
						}, {
							label: '受伤',
							name: "cpinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "cpeloss"
						}]
					}]
				}, {
					label: '较大事故',
					index:2,
					tableTwoHeader: [{
						label: '总计',
						tableThreeHeader: [{
							label: '起数',
							name: "jnumber"
						}, {
							label: '死亡',
							name: "jdeath"
						}, {
							label: '受伤',
							name: "jinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "jeloss"
						}]
					}, {
						label: '同比±',
						tableThreeHeader: [{
							label: '起数',
							name: "jynumber"
						}, {
							label: '死亡',
							name: "jydeath"
						}, {
							label: '受伤',
							name: "jyinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "jyeloss"
						}]
					}, {
						label: '同比±%',
						tableThreeHeader: [{
							label: '起数',
							name: "jpnumber"
						}, {
							label: '死亡',
							name: "jpdeath"
						}, {
							label: '受伤',
							name: "jpinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "jpeloss"
						}]
					}]
				}, {
					label: '重大事故',
					index:3,
					tableTwoHeader: [{
						label: '总计',
						tableThreeHeader: [{
							label: '起数',
							name: "znumber"
						}, {
							label: '死亡',
							name: "zdeath"
						}, {
							label: '受伤',
							name: "zinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "zeloss"
						}]
					}, {
						label: '同比±',
						tableThreeHeader: [{
							label: '起数',
							name: "zynumber"
						}, {
							label: '死亡',
							name: "zydeath"
						}, {
							label: '受伤',
							name: "zyinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "zyeloss"
						}]
					}, {
						label: '同比±%',
						tableThreeHeader: [{
							label: '起数',
							name: "zpnumber"
						}, {
							label: '死亡',
							name: "zpdeath"
						}, {
							label: '受伤',
							name: "zpinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "zpeloss"
						}]
					}]
				}, {
					label: '特别重大事故',
					index:4,
					tableTwoHeader: [{
						label: '总计',
						tableThreeHeader: [{
							label: '起数',
							name: "mnumber"
						}, {
							label: '死亡',
							name: "mdeath"
						}, {
							label: '受伤',
							name: "minjured"
						}, {
							label: '直接经济损失(万元)',
							name: "meloss"
						}]
					}, {
						label: '同比±',
						tableThreeHeader: [{
							label: '起数',
							name: "mynumber"
						}, {
							label: '死亡',
							name: "mydeath"
						}, {
							label: '受伤',
							name: "myinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "myeloss"
						}]
					}, {
						label: '同比±%',
						tableThreeHeader: [{
							label: '起数',
							name: "mpnumber"
						}, {
							label: '死亡',
							name: "mpdeath"
						}, {
							label: '受伤',
							name: "mpinjured"
						}, {
							label: '直接经济损失(万元)',
							name: "mpeloss"
						}]
					}]
				}],
				main: '1', //主栏选择
				mainChild: 'manageType', //主栏具体选择
				vice: '1', //副栏选择
				viceChild: [0], //副栏具体选择
				viceChildTwo: [0], //点击查询后赋值这是副栏
				other: '1', //其他条件
				otherChild: 1, //其他条件的同比条件
				otherChildPercent: 1, //其他条件的同比百分之

				otherChildTwo: 1, //点击查询后赋值这是同比条件
				otherChildPercentTwo: 1, //点击查询后赋值这是同比百分之

				isShowbase: true, //查询
				isShowCom: false, //综合统计
				mainColumn: [{
					label: 'manageType',
					name: '按管理分类'
				}, {
					label: 'departmentIndustry',
					name: '按所属行业分类'
				}, {
					label: 'areaType',
					name: '按地区分类'
				}, {
					label: 'accidentType',
					name: '按事故类型'
				}, {
					label: 'monthType',
					name: '按事故发生月份'
				}, {
					label: 'oldSystem',
					name: '旧体系'
				}, {
					label: 'newSystem',
					name: '新体系'
				}, {
					label: 'collieryAccidentType',
					name: '按煤矿事故分类'
				}, {
					label: 'accidentCause',
					name: '按事故原因'
				}, {
					label: 'accumulatedMonth',
					name: '按累计月份统计'
				}],
				viceColumn: [{
					label: 0,
					name: '总计'
				}, {
					label: 1,
					name: '一般事故'
				}, {
					label: 2,
					name: '较大事故'
				}, {
					label: 3,
					name: '重大事故'
				}, {
					label: 4,
					name: '特别重大事故'
				}],
				otherColumn: [{
					label: 1,
					name: "有"
				}, {
					label: 0,
					name: "无"
				}],
				tableScrollX:0,//按下时的位置
				tableWrapper:0, //按下时当前的滚轴位置
			}
		},
		computed: {
			tableOneHeaderFilters(){
				return  this.tableOneHeader.filter((table)=> {					
      				 if(this.viceChildTwo.indexOf(table.index) != -1){
      				 	return table
      				 }
    			})
			}
		},
		watch: {},
		//过滤器
		filters: {　　　　　　
			decimal: (myNum) => {
//				return myNum
				if(Number(myNum) != 0) {
					return myNum
				} else {
					return '--'
				}　　　　　　
			}　　　　
		},
		methods: { 
			//鼠标按下事件
			tableDown(e){
				//开关  打开 记录x  y轴
				this.tableScrollX = e.pageX;
				var  table = this.$refs.tableExecl.$el
				this.tableWrapper = document.getElementsByClassName("el-table__body-wrapper")[0].scrollLeft				
				table.addEventListener('mousemove', this.tableMove, false)
				document.addEventListener('mouseup', this.tableUp, false)
			},
			//鼠标移动
			tableMove(e){
				//this.$debug && console.log(this.tableScrollX - e.pageX)
				var tableWrapper = document.getElementsByClassName("el-table__body-wrapper")[0]
				tableWrapper.scrollLeft = this.tableWrapper + (this.tableScrollX - e.pageX)
			},
			//鼠标抬起
			tableUp(e){
				e.preventDefault();
				var  tableOn = this.$refs.tableExecl.$el
				tableOn.removeEventListener('mousemove', this.tableMove, false);
				document.removeEventListener('mouseup', this.tableUp, false);
			},
			
			showbasecondition() { //查询条件的打开关闭按钮
				this.isShowbase = !this.isShowbase
			},
			showCom() { //综合统计的打开关闭按钮
				this.isShowCom = !this.isShowCom
			},
			reset() { //点击重置
				this.$refs.forms.formResetFields()
			},
			//点击查询按钮
			queryData() {
				this.$refs.forms.$refs.form.validate((valid) => {
					if(valid) {
						this.statisticsAjax()
					} else {
						this.$message.error('查询条件有错误');
						return false;
					}
				});
			},
			//调用接口
			statisticsAjax() {
				var statisticsParams = this.parameterAssignment()
				//调用接口
				this.$xhr.getCustomReport(statisticsParams).then(data => {
					//this.$debug && console.log(data)
					if(data.code == 0) {
						if(data.content.length > 0) {
							//调用接口 显示table  这样就不会时时变换table  必须点击查询才会显示table
							this.$parent.disState = false //父级导出按钮能点击
							var resultArr = Object.assign([], this.viceChild)
							this.viceChildTwo = resultArr //副栏
							this.otherChildTwo = this.otherChild //其他条件的同比条件
							this.otherChildPercentTwo = this.otherChildPercent //其他条件的同比百分之
							//赋值
							this.tableData = data.content
						} else {
							this.$message({
								message: '您查询的条件暂无数据',
								type: 'success',
								duration: 1000
							});
						}

					}
				}).catch(err => {
					this.$debug && console.log(err)
				})
			},

			//导出
			exportTableData() {
				BIloading.show();
				var params = 	this.parameterAssignment()
				openPostWindow(window.baseUrl1+'/exportCustomExcel',params)
				//后台导出
				/*this.$xhr.exportCustomExcel(params).then(data=>{
					console.log(data)
					 var blob = new Blob([res.json()]); //创建一个blob对象
	                 var a = document.createElement('a'); //创建一个<a></a>标签
	                 a.href = URL.createObjectURL(blob); // response is a blob
	                 a.download = "用户列表2.xls";  //文件名称
	                 a.style.display = 'none';
	                 document.body.appendChild(a);
	                 a.click();
	                 a.remove();
				})*/
			},
			parameterAssignment(){
				var childForm = this.$refs.forms.form //子级的form
				return {
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

					mainBarSelct: this.mainChild, // 主栏选择
					sidebarSelect: this.viceChild, //副栏选择
					//otherCondition:,//其他选择
					yearOnYear: this.otherChild, //同比
					yearOnYearPercent: this.otherChildPercent, //同比%
				}
			}
		},
		created() {

		},
		mounted() {
			this.$parent.disState = true
			horizontalScrollBarDrag("table-wrap2","el-table__body-wrapper")
			this.queryData()
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.statistics-report {
		.base-info-tilte {
			width: auto;
			position: relative;
			text-align: center;
			margin-top: 0.014rem;
			/*color: #82A1D6;
			padding: 0.055rem 0.32rem;*/
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
			width: 0.14rem;
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
		.button_go {
			display: flex;
			justify-content: flex-end;
			margin: 0.15rem 0;
			.btn-add {
				cursor: pointer;
				padding: 0.045rem .27rem;
			}
			.btn-save {
				margin-right: .14rem;
				cursor: pointer;
				padding: 0.045rem .27rem;
			}
		}
		.s_r_root {
			margin-left: 0.1rem;
			margin-bottom: .6rem;
			&:first-child {
				margin-top: .4rem;
			}
			&:last-child {
				margin-bottom: 0px;
			}
			.s_r_root_child {
				margin-top: .3rem;
				margin-left: .25;
				>.with {
					font-size:12px;
					color: #B9D7FC;
					display: inline-block;
					margin-right: 1rem;
				}
			}
		}
		.iconfont {
			font-size: 0.12rem;
		}
		.icon-jiantou {
			color: #f83757;
		}
		.icon-xiajiantou {
			color: #4cbf86;
		}
		.table-wrap{
			cursor:move;
			user-select: none;
		}
	}
</style>