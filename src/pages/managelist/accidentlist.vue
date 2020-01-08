<template>
	<div class="cont accident-list">
		<!--<ul>
			<li>
				<span type="button" v-for="(item,index) in btndata" @click="changeTime(index)" :class="[(btnindex==index)?'router-btn active':'router-btn']">{{item}}</span>
			</li>
		</ul>-->
		<div class="input-group">
			<div style="display: flex">
				<div style="display: flex">
					<label class="input-group-label">事故单位：</label><input type="text" v-model="paramsData.departmentName" class="input-search" placeholder="请输入事故名称或关键词">
				</div>
				<div style="margin-left: 0.56rem;display: flex">
					<label class="input-group-label">事故时间：</label>
					<div class="date-picker-box">
						<el-date-picker v-model="paramsData.accidentStartDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="endDates"></el-date-picker>
					</div>
					<!-- style="margin: 0 0.11rem;line-height: .24rem;"-->
					<label class="time">-</label>
					<div class="date-picker-box">
						<el-date-picker v-model="paramsData.accidentEndDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="endDates"></el-date-picker>
					</div>
				</div>
			</div>
			<div class="i-g-left">
				<ul>
					<li>
						<span type="button" v-for="(item,index) in btndata" @click="changeTime(index)" :class="[(btnindex==index)?'router-btn active':'router-btn']">{{item}}</span>
					</li>
				</ul>
				<button type="button" class="btn btn-report opacity" @click="reminding">
					未入库提醒上报
        		</button>
				<button type="button" class="btn btn-save opacity" @click="queryfn">
					<i class="iconfont icon-artboard9-copy"></i>
					查询
        		</button>
				<button type="button" class="btn btn-add opacity" @click="refreshdata">
					<i class="iconfont icon-huanyihuan"></i>
					重置
        		</button>
			</div>

		</div>
		<!--上报提醒弹窗-->
		<div class="dialog-wrap" v-if="isShowReminding">
			<el-dialog :visible.sync="isShowReminding" width="68%" center :lock-scroll="false" :before-close="accidentlistDialogNo">
				<div slot="title" class="dialog-title">
					<div class="base-info-tilte">选择科室</div>
					<div class="trapezoid-big"></div>
					<div class="trapezoid-smll"></div>
					<divline></divline>
				</div>
				<div class="accidentlist_dialog">
					<dialog-offices ref="dialogOffices" :dialogArr='dialogArr'></dialog-offices>

					<div class="dialog-footer">
						<el-button type="primary" @click="accidentlistDialogAdd">确 定</el-button>
						<el-button @click="accidentlistDialogNo">取 消</el-button>
					</div>
				</div>

			</el-dialog>
		</div>

		<div class="reportForm">
			<el-form ref="form" :model="customdata" label-width="1rem" size="mini" :inline="true">
				<el-collapse v-model="activeNames" class="accidentlist_collapse">
					<el-collapse-item name="1">
						<template slot="title">
							<div class="collapse_one"></div>
							<div class="collapse_two"></div>
						</template>

						<div class="condition-wrap clearfix">

							<el-form-item label="事故等级:">
								<el-select v-model="paramsData.grade" placeholder="全部">
									<el-option v-for="item in customdata.grade" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="事故类型:">
								<el-select v-model="paramsData.typeId" placeholder="全部">
									<el-option v-for="item in customdata.typeId" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="事故地点:" class="form_two">

								<el-form-item class="form_two_place" prop="cityAreaId">
									<el-select v-model="paramsData.cityAreaId" @change="citychange" placeholder="全部">
										<el-option v-for="(item,index) in customdata.cityAreaId" :key="index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									<label class="form_two_label form_two_label2">市/州</label>
								</el-form-item>
								<el-form-item class="form_two_place" prop="districtAreaId">
									<el-select v-model="paramsData.districtAreaId" placeholder="全部">
										<el-option v-for="(item,index) in customdata.districtAreaId" :key="index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									<label class="form_two_place_county">区/县</label>
								</el-form-item>

							</el-form-item>
							<el-form-item label="致害物:">
								<el-select v-model="paramsData.harmfulThingId" placeholder="全部">
									<el-option v-for="item in customdata.harmfulThingId" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="起因物:">
								<el-select v-model="paramsData.causedThingId" placeholder="全部">
									<el-option v-for="item in customdata.causedThingId" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="不安全行为:">
								<el-select v-model="paramsData.unsafeBehaviorId" placeholder="全部">
									<el-option v-for="item in customdata.unsafeBehaviorId" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="不安全状态:">
								<el-select v-model="paramsData.unsafeStatusId" placeholder="全部">
									<el-option v-for="item in customdata.unsafeStatusId" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="管理分类:">
								<el-select v-model="paramsData.managementTypeId" placeholder="全部">
									<el-option v-for="item in customdata.managementTypeId" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="报送状态:">
								<el-select v-model="paramsData.reportStatusId" placeholder="全部">
									<el-option v-for="item in customdata.reportStatusId" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="上报时间:" prop="accidentStartDate" :required='false'>
								<el-date-picker v-model="paramsData.firstReportTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="上报时间" :picker-options="endDates"></el-date-picker>
							</el-form-item>
							<el-form-item label="入库时间:" prop="accidentEndDate" :required='false'>
								<el-date-picker v-model="paramsData.firstStorageTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="入库时间" :picker-options="endDates"></el-date-picker>
							</el-form-item>
							<el-form-item label="处理状态:">
								<el-select v-model="paramsData.status" placeholder="全部">
									<el-option v-for="item in customdata.status" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="报送单位:">
								<el-input placeholder="请输入内容" v-model="paramsData.reportDepartmentName" clearable></el-input>
							</el-form-item>
						</div>
					</el-collapse-item>
				</el-collapse>
			</el-form>
		</div>
		<!--style="width: 100%;height:3.65rem" -->
		<div class="table-wrap table-wrap-accident">
			<el-table ref="multipleTable" :data="contentData.list" tooltip-effect="dark" header-align="center" @selection-change="handleSelectionChange" stripe :border="true" :row-class-name="cellcb">

				<el-table-column type="selection" :selectable="checkSelectable" min-width="48" align="center">
				</el-table-column>

				<el-table-column label="序号" type='index' :index="xuhao" align="center" width="48">
				</el-table-column>
				<el-table-column prop="base.happenTime" label="事故发生时间" min-width="95" align="center">
				</el-table-column>
				<el-table-column prop="base.cityAreaName" label="发生地市" min-width="120" align="center" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="base.districtAreaName" label="发生区县" min-width="120" align="center" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="typeName" label="事故类型" align="center" min-width="80" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="grade" label="事故等级" min-width="80" align="center">
				</el-table-column>
				<el-table-column prop="reportStatusName" label="报送状态" min-width="90" align="center">
				</el-table-column>

				<el-table-column label="死亡" min-width="40" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						{{JSON.stringify(scope.row) !='{}' ? scope.row.death || "0" :''}}
					</template>
				</el-table-column>
				<el-table-column label="重伤" min-width="40" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						{{JSON.stringify(scope.row) !='{}' ? scope.row.serious || "0" : ''}}
					</template>
				</el-table-column>
				<el-table-column label="轻伤" min-width="40" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						{{JSON.stringify(scope.row) !='{}' ? scope.row.injured || "0" : ''}}
					</template>
				</el-table-column>
				<el-table-column prop="economicLosses" label="经济损失(万元)" min-width="90" align="center">
				</el-table-column>
				<el-table-column prop="departmentName" label="事故单位" min-width="190" align="center" :show-overflow-tooltip="true" :visible-arrow="false">
				</el-table-column>
				<el-table-column prop="managementTypeName" label="管理分类" min-width="90" align="center">
				</el-table-column>
				<el-table-column prop="base.status" label="处理状态" min-width="70" align="center">
					<template slot-scope="scope">
						{{JSON.stringify(scope.row) !='{}' ? scope.row.base.status==0?'未处理': scope.row.base.status==1? '已结案' : '处理中' : ''}}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" min-width="70">
					<template slot-scope="scope">
						<span class="caozuo" @click="handleEdit(scope.$index, scope.row)">{{JSON.stringify(scope.row) !='{}' ?'查看':''}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="table-wrap" v-show="false" ref="accidentListAjax">
			<table class="table-box">
				<tr>
					<th>序号</th>
					<th>事故发生时间</th>
					<th>发生地市</th>
					<th>发生区县</th>
					<th>事故类型</th>
					<th>事故等级</th>
					<th>死亡</th>
					<th>重伤</th>
					<th>轻伤</th>
					<th>经济损失(万元)</th>
					<th>事故单位</th>
					<th>管理分类</th>
					<th>处理状态</th>
				</tr>
				<tr v-for="(item,index) in contentDataExecle">
					<td>{{index+1}}</td>
					<td>{{item.base.happenTime}}</td>
					<td>{{item.base.cityAreaName}}</td>
					<td>{{item.base.districtAreaName}}</td>
					<td>{{item.typeName}}</td>
					<td>{{item.grade}}</td>
					<td>{{item.death||0}}</td>
					<td>{{item.serious||0}}</td>
					<td>{{item.injured||0}}</td>
					<td>{{item.economicLosses||0}}</td>
					<td>
						<el-tooltip v-if="item.departmentName.length>12" :content="item.departmentName" placement="top">
							<span>{{item.departmentName}}</span>
						</el-tooltip>
						<span v-if="!(item.departmentName.length>12)">{{item.departmentName}}</span>
					</td>
					<td>{{item.managementTypeName}}</td>
					<td>{{
						item.base.status==0?'未处理': item.base.status == 1? '已结案' : '处理中'
						}}</td>
				</tr>
			</table>
		</div>

		<div class="footer-wrap">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="contentData.pageNum" :page-size="contentData.pageSize" layout="prev, pager, next, jumper, total" :total="contentData.totalCount">
				<!--slot-->
				<!--<span class="sure">确定</span>-->
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import routerBtn from 'components/router-btn/router-btn'
	import divline from 'components/divline'
	import tablefooter from 'components/tablefooter'

	import dialogOffices from 'components/dialoglayout/dialogOffices'
	import { getWeekStartDate, getWeekEndDate, getnowMonth, formatDate } from 'assets/js/common/dateUtil'
	import { openPostWindow, BIloading } from '@/assets/js/tools'

	export default {
		name: 'accidentlist',
		components: {
			routerBtn,
			divline,
			tablefooter,
			dialogOffices
		},
		data() {
			return {
				isShowReminding: false, //上报提醒的弹窗
				activeNames: ['1'],
				currentPage: 5,
				datevalue: '',
				btnindex: 3,
				endDates: {
					disabledDate: (time) => {
						return time.getTime() > Date.now();
					}
				},
				customdata: { //所有筛选条件数据
					departmentName: '', //事故单位
					accidentStartDate: '', //开始时间
					accidentEndDate: '', //结束时间
					grade: [{ //事故等级
						value: null,
						label: '全部'
					}, {
						value: 1,
						label: '一般事故'
					}, {
						value: 2,
						label: '较大事故'
					}, {
						value: 3,
						label: '重大事故'
					}, {
						value: 4,
						label: '特别重大事故'
					}],
					typeId: [{
						value: null,
						label: '全部'
					}], //事故类型
					cityAreaId: [
						/*{
							value: null,
							label: '全部'
						}*/
					], //事故地点：市/自治州
					districtAreaId: [
						/*{
							value: null,
							label: '全部'
						}*/
					], //      ：区/县
					causedThingId: [{
						value: null,
						label: '全部'
					}], //致害物
					harmfulThingId: [{
						value: null,
						label: '全部'
					}], //起因物
					unsafeBehaviorId: [{
						value: null,
						label: '全部'
					}], //不安全行为
					unsafeStatusId: [{
						value: null,
						label: '全部'
					}], //不安全状态
					managementTypeId: [{
						value: null,
						label: '全部'
					}], //管理分类
					reportStatusId: [{
						value: null,
						label: '全部'
					}], //报送状态
					firstReportTime: '', //上报时间
					firstStorageTime: '', //入库时间
					reportDepartmentName: '', //报送单位
					status: [{
						value: null,
						label: '全部'
					}, {
						value: 0,
						label: '未处理'
					}, {
						value: 1,
						label: '已结案'
					},{
						value: 3,
						label: '处理中'
					}] //处理状态
				},

				paramsData: { //请求参数
					departmentName: null, //事故单位
					accidentStartDate: '', //开始时间
					accidentEndDate: '', //结束时间
					grade: null,
					typeId: null, //事故类型
					cityAreaId: null, //事故地点：市/自治州
					districtAreaId: null, //      ：区/县
					causedThingId: null, //起因物
					harmfulThingId: null, //致害物
					unsafeBehaviorId: null, //不安全行为
					unsafeStatusId: null, //不安全状态
					managementTypeId: null, //管理分类
					reportStatusId: null, //报送状态
					firstReportTime: null, //上报时间
					firstStorageTime: null, //入库时间
					reportDepartmentName: null, //报送单位
					status: null, //处理状态
					pageSize: 10,
					pageNum: 1
				},
				btndata: ['本周', '本月'], //'今日',

				contentData: {},
				contentDataExecle: [],
				flagDate: true, //用于控制自定义时间发生改变时，取消今日、本周、本月高亮状态
				multipleSelection: [],
				dialogArr: [],
				token: '',
				reallyIndex: 0,
				userLevel: '10086',
			}
		},
		computed: {
			routeparam() {
				return this.$store.state.statisicsGolistparam
			},
			startDate() {　　　　
				return this.paramsData.accidentStartDate　　
			},
			endDate() {　　　　
				return this.paramsData.accidentEndDate　　
			},
		},
		watch: {
			startDate(newValue, oldValue) {　　　　
				//this.$debug && console.log('startDate', newValue)
				if(this.flagDate) {
					this.btnindex = -1
				}
			},
			endDate(newValue, oldValue) {　　　　
				//this.$debug && console.log('endDate', newValue)　　
				if(this.flagDate) {
					this.btnindex = -1
				}
			},
		},
		methods: {
			cellcb(row) {
				var rows = JSON.stringify(row.row)
				if(rows == '{}') {
					return 'mycheckbox'
				}
			},
			//序号
			xuhao(index) {
				if(index >= this.reallyIndex) {
					return '';
				} else {
					return index + 1
				}
			},
			//table 的查看 跳转
			handleEdit(index, row) {
				let baseId = row.accidentId
				let infoId = row.id
				if(baseId && infoId) {
					// this.$debug && console.log('todetail :', text)
					this.$router.push({
						name: 'information',
						params: {
							baseId: baseId,
							infoId: infoId
						}
					})
				}
			},
			//表格选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
				//this.$debug && console.log(val)
			},
			//表格是否可以勾选
			checkSelectable(row, index) {
				//this.$debug && console.log(row)
				if(row.reportStatusName == "县级入库" || row.reportStatusName == "部门入库") {
					return true;
				} else {
					return false;
				}
			},
			//上报提醒
			reminding() {
				//判断是不是同一区县 如果不是给提示
				if(this.multipleSelection && this.multipleSelection.length > 0) {
					let arr = this.multipleSelection
					let oneArr = arr[0]
					let arrFalg = false
					for(var i = 0; i < arr.length; i++) {
						if(arr[i].base.districtAreaId != oneArr.base.districtAreaId) {
							arrFalg = false
							break;
						} else {
							arrFalg = true
						}
					}
					//console.log(arrFalg)
					if(arrFalg) {
						this.isShowReminding = arrFalg
						this.dialogArr = this.multipleSelection
					} else {
						this.$message('请选择同一区县进行上报');
					}
					//this.$debug && console.log(this.multipleSelection)		
				} else {
					this.$message('请选择需要提醒的事故');
				}

			},
			//弹窗确定
			accidentlistDialogAdd() {
				if(this.multipleSelection && this.multipleSelection.length > 0) {
					this.token = localStorage.getItem("token")
					if(this.token) {
						//let departmentLevelID = this.$refs.dialogOffices.positionID.departmentLevelID //科室id
						//let departmentLevelName = this.$refs.dialogOffices.positionName.departmentLevelName //科室名字
						let departmentLevelID, departmentLevelName

						let id = this.$refs.dialogOffices.positionID
						let name = this.$refs.dialogOffices.positionName

						//cityStateLevelID  城市
						//districtAndCountyLevelID 区县
						//departmentLevelID 科室
						//console.log(this.$refs.dialogOffices.positionID)
						//console.log(this.$refs.dialogOffices.positionName)

						if(id.departmentLevelID != '') {
							//如果有科室
							departmentLevelID = id.departmentLevelID
							departmentLevelName = name.departmentLevelName
						} else if(id.districtAndCountyLevelID != '' && id.departmentLevelID == '') {
							//如果有区县
							departmentLevelID = id.districtAndCountyLevelID
							departmentLevelName = name.districtAndCountyLevelName
						} else if(id.cityStateLevelID != '' && id.districtAndCountyLevelID == '' && id.departmentLevelID == '') {
							//如果有城市
							departmentLevelID = id.cityStateLevelID
							departmentLevelName = name.cityStateLevelName
						}
						console.log(departmentLevelID, departmentLevelName)

						if(departmentLevelID) {
							this.$xhr.report({
								token: this.token,
								total: this.multipleSelection.length, //条数
								keshi: departmentLevelName, //科室名字
								organizationId: departmentLevelID, //科室id
							}).then((res) => {
								if(res.code == 0) {
									this.$message('上报成功')
									this.isShowReminding = false
									this.$refs.multipleTable.clearSelection() //清空选中的
								} else if(res.code == 1) {
									this.$message('请重新登录')
								} else {
									this.$message(res.message + '请刷新页面')
								}
							})
						} else {
							this.$message('请选择需要上报的部门')
						}
					} else {
						//本地
						this.isShowReminding = false
					}
				} else {
					this.$debug && console.log("失败")
				}
			},
			//弹窗取消
			accidentlistDialogNo() {
				this.isShowReminding = false
				this.$refs.dialogOffices.positionID = {
					cityStateLevelID: '', //市州级选中ID
					districtAndCountyLevelID: "", //区县级选中ID
					departmentLevelID: "", //科室选中ID
				} //各个级别的id 
				this.$refs.dialogOffices.positionIndex = {
					cityStateLevelIndex: -1, //市州级选中
					districtAndCountyLevelIndex: -1, //区县级选中
					departmentLevelIndex: -1, //科室选中
				} //各个级别的选中
				this.$refs.dialogOffices.positionName = {
					cityStateLevelName: '', //市州级选中的名字
					districtAndCountyLevelName: "", //区县级选中的名字
					departmentLevelName: "", //科室选中的名字
				} //各个级别选中的名字

				this.$refs.dialogOffices.districtAndCountyLevel = [] //区县级
				this.$refs.dialogOffices.departmentLevel = [] //科室
				//this.multipleSelection = [] //清空选中的
			},

			//标签跳转
			changeTime(index) {
				this.btnindex = index
				this.flagDate = false
				setTimeout(() => {
					this.flagDate = true
				})
				if(index == 0) {
					this.conditionWeekdate()
				} else if(index == 1) {
					this.conditionMonthdate()
				}
				/*if(index == 0) {
					this.conditionDaydate()
				} else if(index == 1) {
					this.conditionWeekdate()
				} else if(index == 2) {
					this.conditionMonthdate()
				}*/
				this.queryfn() //今日   本周 本月
			},
			//分页条数变化
			handleSizeChange(val) {
				this.$debug && console.log(`每页${val}条`)
			},
			//分页页码变化
			handleCurrentChange(val) {
				this.paramsData.pageNum = val
				this.accidentList()
			},
			//重置
			refreshdata() {
				this.paramsData = { //请求参数
					departmentName: null, //事故单位
					accidentStartDate: '', //开始时间
					accidentEndDate: '', //结束时间
					grade: null,
					typeId: null, //事故类型
					cityAreaId: null, //事故地点：市/自治州
					districtAreaId: null, //      ：区/县
					causedThingId: null, //致害物
					harmfulThingId: null, //起因物
					unsafeBehaviorId: null, //不安全行为
					unsafeStatusId: null, //不安全状态
					managementTypeId: null, //管理分类
					reportStatusId: null, //报送状态
					firstReportTime: null, //上报时间
					firstStorageTime: null, //入库时间
					reportDepartmentName: null, //报送单位
					status: null, //处理状态
					pageSize: 10,
					pageNum: 1
				}
				switch(this.userLevel) {
					case '3':
						//其余的用户不能为空
						this.customdata.districtAreaId = [];
						break;
					case '5':
						//市级用户
						this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value
						break;
					case '7':
						//区县级用户
						this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value
						this.paramsData.districtAreaId = this.customdata.districtAreaId[0].value
						break;
					default:
						break;
				}

				// this.paramsData.districtAreaId = null;
				//this.conditionMonthdate() //重置成本月的时间
				this.conditePrevMonthdate() //重置成前6个月的时间
			},
			//查询
			queryfn() {

				//console.log(this.paramsData)
				if(this.paramsData.accidentStartDate == '' || this.paramsData.accidentStartDate == null) {
					this.$message({
						message: '请输入开始时间',
						type: 'success',
						duration: 1000
					})
					return false
				}
				if(this.paramsData.accidentEndDate == '' || this.paramsData.accidentEndDate == null) {
					this.$message({
						message: '请输入结束时间',
						type: 'success',
						duration: 1000
					})
					return false
				}
				var startDate = new Date(this.paramsData.accidentStartDate)
				var endDate = new Date(this.paramsData.accidentEndDate)
				if(startDate > endDate) {
					this.$message({
						message: '开始时间不能大于结束时间',
						type: 'error',
						duration: 2000
					})
					return false
				}
				this.fndetroy()
				this.paramsData.pageNum = 1
				this.accidentList()
			},
			//获取表格数据
			accidentList() {
				this.$xhr.accidentList(this.paramsData).then(res => {
					if(res && res.code == 0) {
						//this.$debug && console.log(res)
						this.contentData = res.content
						if(this.contentData.list != null && this.contentData.list.length > 0) {
							this.reallyIndex = this.contentData.list.length
							this.contentData.list.forEach(item => {
								if(item.grade == 1) {
									item.grade = '一般事故'
								} else if(item.grade == 2) {
									item.grade = '较大事故'
								} else if(item.grade == 3) {
									item.grade = '重大事故'
								} else if(item.grade == 4) {
									item.grade = '特别重大事故'
								} else {
									this.$debug && console.log('异常')
								}
							})
							//不足10条补上少的
							if(this.contentData.list.length < 10) {
								var index = 10 - this.contentData.list.length;
								for(var i = 0; i < index; i++) {
									var obj = {}
									this.contentData.list.push(obj)
								}
							}
						} else {
							this.$message({
								message: '您查询的条件暂无数据',
								type: 'success',
								duration: 1000
							})
						}
					} else {
						console.error(res.message)
					}
				})
			},

			//上个月  上6个月
			conditePrevMonthdate() {
				let firstdate = new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1)
				let date = new Date()
				let day = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
				let enddate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, day)
				this.paramsData.accidentStartDate = formatDate(firstdate)
				this.paramsData.accidentEndDate = formatDate(enddate)
			},

			//本月
			conditionMonthdate() {
				let myDate = new Date() //获取系统当前时间
				let datevalue = formatDate(myDate)
				this.paramsData.accidentStartDate = getnowMonth()
				this.paramsData.accidentEndDate = datevalue
			},

			//本周
			conditionWeekdate() {
				let myDate = new Date() //获取系统当前时间
				let datevalue = formatDate(myDate)
				this.paramsData.accidentStartDate = getWeekStartDate()
				this.paramsData.accidentEndDate = datevalue
			},

			//今日
			conditionDaydate() {
				let myDate = new Date() //获取系统当前时间
				let datevalue = formatDate(myDate)
				this.paramsData.accidentStartDate = datevalue
				this.paramsData.accidentEndDate = datevalue
			},
			//获取条件数据(下拉宽)
			getConditionList() {
				var user = JSON.parse(sessionStorage.getItem('loginData')) //获取用户的信息 只能在各个页面获取不能写成统一的不然登出时换人登入拿到的是登出的人的信息
				if(user) {
					this.userLevel = user.organization.organizationLevel
				}
				this.$xhr.getConditionList().then(res => {
					if(res.content) {
						//console.log('获取条件数据',res)
						let contentval = res.content
						if(contentval.cityList) {
							let paramdt = [];
							contentval.cityList.forEach(item => {
								for(let key in item) {
									paramdt.push({
										label: key,
										value: item[key]
									})
								}
							})
							this.customdata.cityAreaId = paramdt
							//选中第一项
							if(this.userLevel == '3') {
								//省级
								this.customdata.cityAreaId.unshift({
									value: null,
									label: '全部'
								})
								this.customdata.districtAreaId.unshift({
									value: null,
									label: '全部'
								})
							} else if(this.userLevel == '5') {
								//市级用户
								this.customdata.districtAreaId.unshift({
									value: null,
									label: '全部'
								})
								this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value //市
								this.paramsData.districtAreaId = this.customdata.districtAreaId[0].value //区
								this.citychange(this.paramsData.cityAreaId)
							} else if(this.userLevel == '7') {
								//区级用户
								res.content.districtList.forEach((item, i) => {
									for(let key in item) {
										this.customdata.districtAreaId.push({
											label: key,
											value: item[key]
										})
									}
								})
								this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value
								this.paramsData.districtAreaId = this.customdata.districtAreaId[0].value
							}

							//先赋值在使用跳转过来的再次赋值 不然会出问题
							this.getroutedata()
						}

						let condList = contentval.ynDictionaries
						if(condList[0].code == 'accidenType') {
							let accidentype = condList[0].list
							accidentype.forEach(item => {
								this.customdata.typeId.push({
									label: item.name,
									value: item.id
								})
							})
							if(this.routeparam.typeId != null) {
								this.paramsData.typeId = this.routeparam.typeId
							}
						}
						if(condList[1].code == 'manageType') {
							let dataArr = condList[1].list
							dataArr.forEach(item => {
								this.customdata.managementTypeId.push({
									label: item.name,
									value: item.id
								})
							})
							if(this.routeparam.managementTypeId != null) {
								this.paramsData.managementTypeId = this.routeparam.managementTypeId
							}
						}
						if(condList[2].code == 'causeThing') {
							let dataArr = condList[2].list
							dataArr.forEach(item => {
								this.customdata.causedThingId.push({
									label: item.name,
									value: item.id
								})
							})
						}
						if(condList[3].code == 'harmfulThing') {
							let dataArr = condList[3].list
							dataArr.forEach(item => {
								this.customdata.harmfulThingId.push({
									label: item.name,
									value: item.id
								})
							})
						}
						if(condList[4].code == 'inseCurity') {
							let dataArr = condList[4].list
							dataArr.forEach(item => {
								this.customdata.unsafeBehaviorId.push({
									label: item.name,
									value: item.id
								})
							})
						}
						if(condList[5].code == 'inseState') {
							let dataArr = condList[5].list
							dataArr.forEach(item => {
								this.customdata.unsafeStatusId.push({
									label: item.name,
									value: item.id
								})
							})
						}
						if(condList[6].code == 'submittedState') {
							let dataArr = condList[6].list
							dataArr.forEach(item => {
								this.customdata.reportStatusId.push({
									label: item.name,
									value: item.id
								})
							})
						}
						//this.paramsData.districtAreaId = this.routeparam.districtAreaId
						//省级用户从首页进来时选不中区
						if(this.routeparam.districtAreaId) {
							this.paramsData.districtAreaId = this.routeparam.districtAreaId
						}
						this.accidentList()
					}
				})
			},
			// 获取区县字典表
			citychange(val) {
				//this.$debug && console.log(val)
				this.customdata.districtAreaId = [{
					value: null,
					label: '全部'
				}]
				this.paramsData.districtAreaId = null
				if(val != null) {
					this.$xhr.distractList({
						cityId: val
					}).then(res => {
						if(res.content) {
							res.content.distractList.forEach(data => {
								for(let key in data) {
									this.customdata.districtAreaId.push({
										label: key,
										value: data[key]
									})
								}
								// this.$debug && console.log(this.customdata.districtAreaId)
							})
							//不知道什么意思
							/*if(this.routeparam.districtAreaId != null) {
								this.paramsData.districtAreaId = this.routeparam.districtAreaId
							}*/
						}
					})
				} else {
					this.paramsData.districtAreaId = null
				}
			},
			//导出
			exportExecleAjax() { //先调用接口
				BIloading.show()
				let newParamsData = Object.assign({}, this.paramsData);
				delete newParamsData.pageSize;
				delete newParamsData.pageNum;
				openPostWindow(window.baseUrl1 + '/exportAccidentListExcel', newParamsData)
			},
			getroutedata() {
				// this.routeparam = this.$route.params
				/*let jsparam = JSON.parse(sessionStorage.getItem('params'))
				if(jsparam != null) {
					this.$store.commit('SET_SPARAMS', jsparam)
				}*/
				if(this.routeparam.startDate) {
					sessionStorage.setItem('params', JSON.stringify(this.routeparam))
					this.paramsData.districtAreaId = this.routeparam.districtAreaId
					this.paramsData.cityAreaId = this.routeparam.cityAreaId
					if(this.routeparam.districtAreaId == 'ng') {
						this.customdata.districtAreaId.push({
							value: 'ng',
							label: '无对应区县'
						})
					} else {
						//省级才需要去跳转时查一下区县   其余的在获取下拉框的时候就调用了
						if(this.userLevel == '3') {
							this.citychange(this.paramsData.cityAreaId)
						}
					}
					// this.paramsData.managementTypeId = this.routeparam.managementTypeId
					this.paramsData.accidentStartDate = this.routeparam.startDate
					this.paramsData.accidentEndDate = this.routeparam.endDate
					this.paramsData.grade = this.routeparam.grade
					// this.paramsData.typeId = this.routeparam.typeId
				}
			},
			fndetroy() {
				sessionStorage.setItem('params', null)
				this.$store.commit('SET_SPARAMS', {})
			}
		},
		beforeDestroy() {
			this.fndetroy()
		},
		mounted() {
			this.$nextTick(() => {
				this.conditePrevMonthdate()
				this.getConditionList()
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.cont {
		margin: 0;
		padding: 0;
		width: 100%;
		.router-btn {
			display: inline-block;
			width: .8rem;
			/*height:.26rem;
			line-height:.26rem;*/
			height: .32rem;
			line-height: .32rem;
			color: $cl-txt;
			font-size: .16rem;
			cursor: pointer;
			/*padding: .021rem 0.252rem;*/
			margin-right: 0.21rem;
			text-align: center;
			border: 1px solid #0C6CF2;
			background-color: rgba(83, 147, 200, 0.3);
			&:hover {
				background-color: #0C6CF2;
			}
		}
		.condition-wrap {
			margin-top: .14rem;
		}
		.active {
			background-color: #0C6CF2;
		}
		.table-wrap {
			margin-top: .25rem;
			border: 1px solid #2158ab;
			/*height: 3.65rem;*/
		}
		.input-group {
			display: flex;
			justify-content: space-between;
			/*margin-top: .3rem;
			margin-bottom: .14rem;*/
			margin-bottom: .07rem;
			.input-search {
				width: 2.8rem;
				/*height: 0.22rem;*/
				height: .30rem;
				background-color: rgba(11, 187, 255, 0.2);
				border: solid 1px #164F9B;
				padding-left: 0.1rem;
				color: #fff;
			}
			.input-group-label {
				display: block;
				/*height: .24rem;
				line-height: .24rem;*/
				height: .32rem;
				line-height: .32rem;
				font-size: .16rem;
				width: 1rem;
				text-align: right;
			}
			.time {
				margin: 0 0.11rem;
				/*line-height: .24rem;*/
				line-height: .32rem;
			}
		}
		/*弹窗*/
		.dialog-title {
			display: flex;
		}
		.accidentlist_dialog {
			border: 1px solid #00a2ff;
			.dialog-footer {
				text-align: center;
				margin: .22rem 0;
			}
		}
		.condition-arrow-icon {
			position: absolute;
			left: 50%;
			cursor: pointer;
			height: auto;
			margin-top: -0.168rem;
			font-size: 0.224rem;
			color: $cl-txt;
			&:hover {
				color: #EBB161;
			}
		}
		.arrow-column {
			display: flex;
			flex-wrap: wrap;
			margin-top: .14rem;
			justify-content: space-between;
			.arrow-item {
				display: flex;
				justify-content: flex-end;
			}
		}
		.footer-wrap {
			color: #b8d7ff;
			margin-top: 0.21rem;
			display: flex;
			justify-content: flex-end;
			text-align: center;
			/*line-height: 0.35rem*/
		}
		.btn-add {
			cursor: pointer;
			margin-left: .14rem;
			text-align: center;
			padding: 0 .24rem;
			line-height: .24rem;
		}
		.btn-save {
			cursor: pointer;
			text-align: center;
			padding: 0 .24rem;
			line-height: .24rem;
		}
		.btn-report {
			cursor: pointer;
			text-align: center;
			padding: 0 .24rem;
			line-height: .24rem;
			margin-right: .14rem;
		}
		.caozuo {
			cursor: pointer;
			color: #EBB161
		}
	}
	
	.dialog-wrap {
		.base-info-tilte {
			width: auto;
			white-space: nowrap;
			padding: .04rem .15rem;
		}
	}
	
	.collapse_one {
		width: 48%;
		height: 1px;
		background: #0760a0;
		position: absolute;
		top: 50%;
		left: 0;
	}
	
	.collapse_two {
		width: 48%;
		height: 1px;
		background: #0760a0;
		position: absolute;
		top: 50%;
		right: 0;
	}
	
	.i-g-left {
		display: flex;
	}
	
@media screen and (max-width: 1366px) {
	.cont {
		.router-btn {
			height:22px;
			line-height:22px;
			font-size:12px;
		}
		.input-group {
			margin-bottom: 5px;
			.input-search {
				height:22px;
			}
			.input-group-label {
				height:24px;
				line-height:24px;
				font-size:12px;
			}
			.time {
				line-height:24px;
			}
		}
	}
}
</style>