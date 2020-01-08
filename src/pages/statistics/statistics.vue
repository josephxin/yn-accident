<template>
	<div class="cont">
		<div class="condition-wrap">
			<div>
				<label class="header_name">行政区域：</label>
				<div class="select-wrap">
					<!--placeholder="不限"-->
					<el-select v-model="paramsData.cityAreaId" @change="citychange">
						<el-option v-for="item in customdata.cityAreaId" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<label class="margin_left">市/自治州</label>
				<!-- placeholder="不限"-->
				<div class="select-wrap margin_left2">
					<el-select v-model="paramsData.districtAreaId">
						<el-option v-for="item in customdata.districtAreaId" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<label class="margin_left">区/县</label>
			</div>
			<div>
				<label class="header_name">事故类型：</label>
				<div class="select-wrap">
					<el-select v-model="paramsData.typeId" placeholder="不限">
						<el-option v-for="item in customdata.typeId" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div>
				<label class="header_name">事故级别：</label>
				<div class="select-wrap">
					<el-select v-model="paramsData.grade" placeholder="不限">
						<el-option v-for="item in customdata.grade" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div>
				<label class="header_name">管理分类：</label>
				<div class="select-wrap">
					<el-select v-model="paramsData.managementTypeId" placeholder="不限">
						<el-option v-for="item in customdata.managementTypeId" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div>
				<label class="header_name">事故行业：</label>
				<div class="select-wrap">
					<el-select v-model="paramsData.departmentIndustryId" placeholder="不限">
						<el-option v-for="item in customdata.departmentIndustryId" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>
		<div class="condition-wrap">
			<div>
				<label class="header_name">自定义时间：</label>
				<div class="date-picker-box">
					<el-date-picker v-model="paramsData.startDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间" :picker-options="endDates"></el-date-picker>
				</div>
				<!--style="margin: 0 0.11rem;"-->
				<label class="trans">-</label>
				<div class="date-picker-box">
					<el-date-picker v-model="paramsData.endDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间" :picker-options="endDates"></el-date-picker>
				</div>

				<div style="margin-left: .6rem">
					<ul>
						<li v-for="(item,index) in btndata" style="list-style: none;float: left">
							<div type="button" @click="changeTime(index)" class="router-btn" :class="[(btnindex==index)?'active':'']">
								{{item}}
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<button type="button" class="btn-add btn" @click.stop="searchfn">
          <i class="iconfont icon-artboard9-copy"></i>
          查询
        </button>
				<button type="button" class="btn-add opacity" @click.stop="compare">
          <i class="iconfont icon-yuanxingbuju"></i>
          同比
        </button>
				<button type="button" class="btn-add opacity" @click.stop="refreshparamdata">
          <i class="iconfont icon-huanyihuan"></i>
          重置
        </button>
			</div>
		</div>
		<div class="main-bottom clearfix">
			<div class="main-bottom-left">
				<!--地图-->
				<newmap :mapSet="mapSet" :accident-num="total" @mapcallback="maplistenback"></newmap>
			</div>
			<div class="main-bottom-right">
				<!--<contentBox style="width: 100%;height: 100%" :titleHide="titleHide" title="决策分析结果">
					<div class="analyze-content-wrap">
						<ul>
							<li v-for="(item,index) in analyzes" @click="selectAnalyzeItem(item.params)">
								<div style="margin-right: .14rem;font-size:.14rem;">{{index+1}}</div>
								<div v-if="iscompare" style="font-size:.14rem">
									{{item.content}}
								</div>
								<div v-if="!iscompare" style="display: flex;justify-content: space-between;width: 100%;">
									<div style="font-size:.14rem;flex:6.5;">
										{{item.content}}
									</div>
									<div style="font-size:.14rem;text-align: end;flex:2;">
										{{item.value}}起
									</div>
									<div style="font-size:.14rem;text-align: end;flex:2;">
										占比：
									</div>
									<div style="font-size:.14rem;text-align: left;flex:2;">
										{{item.percent}}
									</div>
								</div>
							</li>
						</ul>
					</div>
				</contentBox>-->
				<panel>
					<div class="content">
						<div class="content-bg">
							<ul class="content-head clearfix" v-if="!iscompare">
								<li></li>
								<li></li>
								<li class="tips" @click="sortClick(0)"><i class='down' :class="sortActive == 0 ? 'active' : '' "></i>总起数</li>
								<li>占比</li>
								<li>未处理</li>
								<li>处理中</li>
								<li>已结案</li>
								<li class="tips" @click="sortClick(1)"><i class='down' :class="sortActive == 1 ? 'active' : '' "></i>结案率</li>
							</ul>
							<div class="content-cont" :class="{'compare-height':iscompare}">
								<ul>
									<li v-for="(item,index) in analyzes" @click="selectAnalyzeItem(item.params)">
										<div v-if="iscompare" class="content-yoy">
											<span>{{index+1}}</span>
											{{item.content}}
										</div>
										<div v-if="!iscompare" class="c-specific clearfix">
											<span>{{index+1}}</span>
											<span :title="item.content">{{item.content}}</span>
											<span>{{item.value}}</span>
											<span>{{item.percent}}</span>
											<span>{{item.weivalue ? item.weivalue : 0}}</span>
											<span>{{item.chulizvalue ? item.chulizvalue : 0}}</span>
											<span>{{item.jievalue ? item.jievalue : 0 }}</span>
											<span>{{item.jiepercent ? item.jiepercent + '%' : 0}}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</panel>
			</div>
		</div>
	</div>
</template>

<script>
	import contentBox from 'components/content-box/content-box'
	import panel from 'components/panel/panel'
	import newmap from './echarts/newmap'
	import dialoglayout from 'components/dialoglayout/dialoglayout'
	import { getWeekStartDate, getWeekEndDate, getnowMonth, formatDate, isGoYear } from 'assets/js/common/dateUtil'

	export default {
		name: 'statistics',
		components: {
			contentBox,
			newmap,
			dialoglayout,
			panel
		},
		data() {
			return {
				sortActive:0,
				warningstr: '',
				analyzes: [],
				titleHide: false,
				value: null,
				iscompare: false, //判断是同比还是查询 同比点击不能跳转
				conditionNum: false,
				conditionlimit: false,
				typeLimit: false,
				endDates: {
					disabledDate: (time) => {
						return time.getTime() > Date.now();
					}
				},
				customdata: {
					grade: [{ //事故等级
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
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
						}
					], //事故级别
					typeId: [{
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
							label: '全部'
						}
					], //事故类型
					departmentIndustryId: [{
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
							label: '全部'
						}
					], //事故行业
					managementTypeId: [{
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
							label: '全部'
						}
					], //管理分类
					cityAreaId: [
						/*{
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
							label: '全市'
						}*/
					], //事故地点：市/自治州
					districtAreaId: [
						/*{
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
							label: '全区/县'
						}*/
					] //      ：区/县
				},

				pData: { //请求参数
					startDate: '', //开始时间
					endDate: '', //结束时间
					grade: null, //事故级别
					typeId: null, //事故类型
					managementTypeId: null, //管理分类
					departmentIndustryId: null, //事故行业
					cityAreaId: null, //事故地点：市/自治州
					districtAreaId: null //      ：区/县
				},

				paramsData: { //请求参数
					startDate: '', //开始时间
					endDate: '', //结束时间
					grade: null, //事故级别
					typeId: 'ALL', //事故类型
					managementTypeId: null, //管理分类
					departmentIndustryId: null, //事故行业
					cityAreaId: null, //事故地点：市/自治州
					districtAreaId: null //      ：区/县
				},
				btnindex: -1,
				btndata: ['本周', '本月'],//'今日',
				curParams: {},
				total: 0,
				mapSet: {},
				isMapclick: false,
				flagDate: true, //用于控制自定义时间发生改变时，取消今日、本周、本月高亮状态
				userLevel:'10086', //用户的权限  3是省级  5是市级  7是区县级   10086 是本地环境
			}
		},
		computed: {
			startDate() {
				return this.paramsData.startDate
			},
			endDate() {
				return this.paramsData.endDate
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
			paramsData: {
				handler: function(val, oldVal) {
					let num = 0,
						nullNum = 0,
						typeNum = 0
					for(let key in val) {
						//各个维度不能都为不限
						if((key != 'endDate') && (key != 'startDate')) {
							if(val[key] == null) {
								nullNum++
							}
							if(nullNum > 5) {
								this.conditionlimit = true
							} else {
								this.conditionlimit = false
							}
							//事故行业，管理分类不能同时选择
							if((key == 'departmentIndustryId') || (key == 'managementTypeId')) {
								if(val[key] != null) {
									typeNum++
								}
								if(typeNum > 1) {
									this.typeLimit = true
								} else {
									this.typeLimit = false
								}
							}
							//筛选条件只能有一个全部
							if((key != 'cityAreaId') && (key != 'districtAreaId')) {
								if(val[key] == 'ALL') {
									num++
								}
								if(num > 1) {
									this.conditionNum = true
								} else {
									this.conditionNum = false
								}
							}
						}
					}
				},
				deep: true //增加deep 观察对象的子对象变化
			}
		},
		methods: {
			maplistenback(val) {
				//console.log(val,'我点击地图？？？')
				this.isMapclick = true
				this.pData = JSON.parse(JSON.stringify(this.paramsData))
				if(val.rank == 2) {
					this.pData.cityAreaId = val.areacode
				} else if(val.rank == 3) {
					this.pData.cityAreaId = null
					this.pData.districtAreaId = val.areacode
				}
				if(this.iscompare) {
					let isgo = isGoYear(this.paramsData.startDate, this.paramsData.endDate)
					if(isgo) {
						this.warningstr = '同比不能跨年'
						this.messageBox()
					} else {
						this.iscompare = true
						this.getMapList()
					}
				} else {
					this.iscompare = false
					this.getMapList()
				}
			},
			//查询
			searchfn() {
				if(this.conditionlimitFn()) {
					return false
				}
				//console.log(this.paramsData)
				if(this.paramsData.startDate == '' || this.paramsData.startDate == null){
					this.$message({
						message: '请输入开始时间',
						type: 'error',
						duration: 1000
					})
					return false
				}
				if(this.paramsData.endDate == '' || this.paramsData.endDate == null){
					this.$message({
						message: '请输入结束时间',
						type: 'error',
						duration: 1000
					})
					return false
				}
				var startDate = new Date(this.paramsData.startDate)
				var endDate = new Date(this.paramsData.endDate)
				if(startDate > endDate){
					this.$message({
						message: '开始时间不能大于结束时间',
						type: 'error',
						duration: 2000
					})
					return false
				}
				this.isMapclick = false
				this.iscompare = false
				this.pData = JSON.parse(JSON.stringify(this.paramsData))
				//console.log(this.pData)
				this.getMapList()
			},

			conditionlimitFn() {
				let climit = false
				if(this.conditionNum) {
					this.warningstr = '筛选条件，只能包含一个全部'
					this.messageBox()

					climit = true
				}
				if(this.conditionlimit) {
					this.warningstr = '各个维度，不能都为不限'
					this.messageBox()

					climit = true
				}
				if(this.typeLimit) {
					this.warningstr = '管理分类、事故行业，不可同时选择'
					this.messageBox()

					climit = true
				}
				return climit
			},
			//点击同比
			compare() {
				if(this.conditionlimitFn()) {
					return
				}
				this.isMapclick = false
				let isgo = isGoYear(this.paramsData.startDate, this.paramsData.endDate)
				if(isgo) {
					this.warningstr = '同比不能跨年'
					this.messageBox()
				} else {
					this.iscompare = true
					this.pData = JSON.parse(JSON.stringify(this.paramsData))
					this.getMapList()
				}
			},
			//重置
			refreshparamdata() {
				this.paramsData = { //请求参数
					startDate: '', //开始时间
					endDate: '', //结束时间
					grade: null, //事故级别
					typeId: 'ALL', //事故类型
					managementTypeId: null, //管理分类
					departmentIndustryId: null, //事故行业
					cityAreaId:null, //事故地点：市/自治州
					districtAreaId: null // ：区/县
				}
				switch(this.userLevel){
					case '3': 
						//不变
						this.customdata.districtAreaId = [{
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
							label: '全区/县'
						}]
						break;
					case '5':
						//市级用户
						if(this.customdata.cityAreaId[0].value){
							this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value
						}
						//区县要有数据 数组不然重置后昆明市在也选不到数据了
						break;
					case '7':
						//区县级用户
						if(this.customdata.cityAreaId[0].value){
							this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value
							this.paramsData.districtAreaId = this.customdata.districtAreaId[0].value
						}
						break;
					default:
						break;
				}
				
				this.initconditiondata()
				this.pData = JSON.parse(JSON.stringify(this.paramsData))
			},
			changeTime(index) {
				this.btnindex = index
				this.flagDate = false
				setTimeout(() => {
					this.flagDate = true
				})
				if(index == 0) { //本周
					let myDate = new Date() //获取系统当前时间
					let datevalue = formatDate(myDate)
					this.paramsData.startDate = getWeekStartDate()
					this.paramsData.endDate = datevalue
				} else if(index == 1) { //本周
					let myDate = new Date() //获取系统当前时间
					let datevalue = formatDate(myDate)
					this.paramsData.startDate = getnowMonth()
					this.paramsData.endDate = datevalue
				}
				/*if(index == 0) { //今日
					let myDate = new Date() //获取系统当前时间
					let datevalue = formatDate(myDate)
					this.paramsData.startDate = datevalue
					this.paramsData.endDate = datevalue
				} else if(index == 1) { //本周
					let myDate = new Date() //获取系统当前时间
					let datevalue = formatDate(myDate)
					this.paramsData.startDate = getWeekStartDate()
					this.paramsData.endDate = datevalue
				} else if(index == 2) { //本月
					let myDate = new Date() //获取系统当前时间
					let datevalue = formatDate(myDate)
					this.paramsData.startDate = getnowMonth()
					this.paramsData.endDate = datevalue
				}*/
				this.searchfn()
			},
			//排序
			sortClick(type){
				//调接口？
				if(this.sortActive != type){
					this.sortActive = type
					if(type == 0){
						this.analyzes.sort(this.compareByOne("value"))
					}else if(type == 1){
						//字段
						this.analyzes.sort(this.compareByOne("jiepercent"))
					}
				}
			},
			compareByOne(property) {
				return(a, b) => {
					let value1 = a[property]
					let value2 = b[property]
					//a-b输出从小到大排序，b-a输出从大到小排序。
					return value2 - value1
				}
			},
			
			//事件委托，性能优化，减少绑定事件
			selectAnalyzeItem(val) {
				if(!this.iscompare) {
					let paramdata = JSON.parse(JSON.stringify(this.pData))
					if(val.cityAreaId != ''){
						paramdata.cityAreaId = parseInt(val.cityAreaId)
					}
					if(val.districtAreaId != ''){
						if(val.districtAreaId == 'ng'){
							paramdata.districtAreaId = val.districtAreaId
						}else{
							paramdata.districtAreaId = parseInt(val.districtAreaId)
						}
						
					}
					if(val.typeId != '') {
						paramdata.typeId = parseInt(val.typeId)
					} else {
						paramdata.typeId = null
					}
					if(val.grade != '') {
						paramdata.grade = parseInt(val.grade)
					} else {
						paramdata.grade = null
					}
					if(val.managementTypeId != '') {
						paramdata.managementTypeId = parseInt(val.managementTypeId)
					} else {
						paramdata.managementTypeId = null
					}
					this.$store.commit('SET_SPARAMS', paramdata)
					this.$router.push({
						name: 'accidentlist'
					})
				}
			},
			citychange(val) {
				this.paramsData.districtAreaId = null
				if(val == null) {
					this.customdata.districtAreaId = [{
							value: null,
							label: '不限'
						},
						{
							value: 'ALL',
							label: '全区/县'
						}
					]
				} else {
					this.customdata.districtAreaId = [{
						value: null,
						label: '不限'
					}]
					if(val != 'ALL') {
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
								})
							}
						})
					}
				}
			},
			initconditiondata() {
				let firstdate = new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1)
				let date = new Date()
				let day = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
				let enddate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, day)
				this.paramsData.startDate = formatDate(firstdate)
				this.paramsData.endDate = formatDate(enddate)
				this.pData = JSON.parse(JSON.stringify(this.paramsData))
				//console.log('pData:',this.pData, 'paramsData:',this.paramsData )
			},
			//获取城市信息和事故信息的下拉框
			getstaticCdtn() {
				var user = JSON.parse(sessionStorage.getItem('loginData'))//获取用户的信息 只能在各个页面获取不能写成统一的不然登出时换人登入拿到的是登出的人的信息
				if(user){
					this.userLevel = user.organization.organizationLevel
				}
				this.$xhr.getstaticCdtn().then(res => {
					//console.log(res, '下拉框的获取')
					if(res.content) {
						//城市的选择有权限要求  省级用户能看全部  市级用户只能看当前市（没有全市选项没有不限选项）  区级用户只能看当前区
						//默认没有？    如何分辨是市用户还是 区用户  还是省用户
						// 3 省级用户   5 市、州级用户   7区、县级用户
						//城市数据
						res.content.cityList.forEach(data => {
							for(let key in data) {
								this.customdata.cityAreaId.push({
									label: key,
									value: data[key]
								})
							}
						})
						let otherlist = res.content.ynDictionaries
						otherlist[0].list.forEach(item => {
							this.customdata.typeId.push({
								value: item.id,
								label: item.name
							})
						})
						otherlist[1].list.forEach(item => {
							this.customdata.managementTypeId.push({
								value: item.id,
								label: item.name
							})
						})
						otherlist[2].list.forEach(item => {
							this.customdata.departmentIndustryId.push({
								value: item.id,
								label: item.name
							})
						})
						
						
						if(this.userLevel == '3') {
							//省级用户
							this.customdata.cityAreaId.unshift({
									value: null,
									label: '不限'
								},
								{
									value: 'ALL',
									label: '全市'
								})
							//子级是那些
							this.customdata.districtAreaId.unshift({
									value: null,
									label: '不限'
								},
								{
									value: 'ALL',
									label: '全区/县'
								}) 
						} else if(this.userLevel == '5') {
							//市级用户 直接就有了区级数据
							this.customdata.districtAreaId.unshift({
								value: null,
								label: '不限'
							})
							this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value
							this.paramsData.districtAreaId = this.customdata.districtAreaId[0].value
							this.citychange(this.paramsData.cityAreaId)
							
						} else if(this.userLevel == '7') {
							//区县级用户带着字段
							res.content.districtList.forEach((item,i)=>{
								for(let key in item) {
									this.customdata.districtAreaId.push({
										label: key,
										value: item[key]
									})
								}
							})
							this.paramsData.cityAreaId = this.customdata.cityAreaId[0].value
							this.paramsData.districtAreaId = this.customdata.districtAreaId[0].value
							

						}else if(this.userLevel=='10086'){
							//本地查看
							this.customdata.cityAreaId = [{
									value: null,
									label: '不限'
								},
								{
									value: 'ALL',
									label: '全市'
								}
							]
							//子级是那些
							this.customdata.districtAreaId = [{
									value: null,
									label: '不限'
								},
								{
									value: 'ALL',
									label: '全区/县'
								}
							]
						}
						//console.log(this.customdata.cityAreaId)
						
						//在这调用接口
						//有权限必须在里面写不然查询的是所以的不是当前选中的市
						//先把时间给上
						this.initconditiondata()
						//默认进来查询一次
						this.getMapList()
					}
				})
			},
			//查询 同比调用的接口
			getMapList() {
				this.analyzes = []
				//判断是查询还是同比
				if(!this.iscompare) {
					//查询
					this.$xhr.getMapList(this.pData).then(res => {
						if(res.content) {
							this.setmaplist(res.content)
						}
					})
				} else {
					//同比
					this.$xhr.getMapListOther(this.pData).then(res => {
						//console.log('同比',res)
						if(res.content) {
							this.setmaplist(res.content)
						}
					})
				}
			},
			//给地图赋值？
			setmaplist(valdata) {
				//未排序
				this.analyzes = this.isListObj(valdata.list)
				//this.analyzes = this.isListObj(this.list())
				//还得判断数组对象中是不是存在某个对象 不存在还的加上 
				this.total = valdata.total
				if(!this.isMapclick) {
					let datas = {}
					datas.mapData = valdata.mapData
					datas.markData = valdata.markData
					this.mapSet = datas
				}
			},
			//判断数组中是不是存在字段 不存加上且赋值为0  
			isListObj(arr){
				//排序默认按照 value 总数排序
				arr.sort(this.compareByOne("value"))
				
				arr.forEach((item,i)=>{
					if(!item.hasOwnProperty('jiepercent')){
						//结案率
						item.jiepercent = 0
					}
					if(!item.hasOwnProperty('jievalue')){
						//已结案
						item.jievalue = 0
					}
					if(!item.hasOwnProperty('chulizvalue')){
						//处理中
						item.chulizvalue = 0
					}
					if(!item.hasOwnProperty('weivalue')){
						//未处理
						item.weivalue = 0
					}
				})
				return arr
			},
			messageBox() {
				this.$alert(this.warningstr, '提示', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {})
			}
		},
		created(){
			//获取下拉框的选择
			this.getstaticCdtn()
		},
		mounted() {
			this.$nextTick(() => {
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.cont {
		height: 100%;
		width: calc(100% - 4%);
		margin: 0;
		/*padding: 0 2%;*/
		padding: 0 30px;
		.condition-wrap {
			margin-top: 0.21rem;
			display: flex;
			justify-content: space-between;
			font-size:.16rem;
			div {
				display: flex;
			}
			.trans{
				margin: 0 0.11rem;
				line-height: .32rem;
			}
			.margin_left {
				margin-left: 0.11rem;
				line-height: .32rem;
			}
			.margin_left2 {
				margin-left: .19rem;
				line-height: .32rem;
			}
			.router-btn {
				display: block;
				color: $cl-txt;
				cursor: pointer;
				/*font-size: 0.154rem;
				padding: .014rem 0.252rem;*/
				font-size: .16rem;
				padding:.03rem .25rem;
				
				margin-right: 0.2rem;
				text-align: center;
				border: 1px solid #3091f3;
				background-color: rgba(83, 147, 200, 0.3);
				&:hover {
					background-color: #0C6CF2;
				}
			}
			.active {
				background-color: #0C6CF2;
			}
			.btn-add {
				cursor: pointer;
				margin-left: 0.14rem;
				background-color: rgba(11, 187, 255, 0.4);
				color: $cl-txt;
				text-align: center;
				padding: .014rem .21rem;
				border: 1px solid #0C6CF2;
				font-size: .16rem;
			}
			.header_name {
				width: 1rem;
				text-align: right;
				/*font-size: .14rem;*/
				
				line-height: .32rem;
			}
		}
		.btn-save {
			margin-right: .14rem;
			background-color: rgba(11, 187, 255, 0.7);
			color: white;
			padding: .028rem .14rem;
			border: 1px solid #0C6CF2;
		}
		.main-bottom {
			box-sizing: border-box;
			position: relative;
			height: 80%;
			margin-top: 20px;
			/*padding-bottom: .2rem;*/
		}
		.main-bottom-left {
			float: left;
			width: 55vw;
			/*width:63%;*/
			min-width: 9rem;
			height: 80vh;
			/*min-height: 7.4rem;*/
		}
		.main-bottom-right {
			float: right;
			margin-top: 4.3vw;
			/*width: 28vw;*/
			width:39vw;
			/*width: 29%;*/
			min-width: 3.76rem;
			height: 64vh;
			/*min-height: 5.76rem;*/
			box-sizing: border-box;
			.analyze-content-wrap {
				color: #B9D7FC;
				margin: .07rem;
				/*padding: 1.5rem;*/
				box-sizing: border-box;
				-moz-box-sizing: border-box;
				/* Firefox */
				-webkit-box-sizing: border-box;
				/* Safari */
				height: 100%;
				background-color: rgba(16, 11, 64, 0.2);
				border: 1px solid #00a2ff;
				border-radius: 0;
				-moz-box-shadow: 2px -2px 2px rgba(11, 184, 251, 0.5) inset;
				/* For Firefox3.6+ */
				-webkit-box-shadow: 2px -2px 2px rgba(11, 187, 255, 0.5) inset;
				/* For Chrome5+, Safari5+ */
				box-shadow: 2px -2px 2px rgba(11, 187, 255, 0.3) inset;
				/* For Latest Opera */
				background: -webkit-linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
				/* Safari 5.1 - 6.0 */
				background: -o-linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
				/* Opera 11.1 - 12.0 */
				background: -moz-linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
				/* Firefox 3.6 - 15 */
				background: linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
				/* 标准的语法 */
				ul {
					cursor: default;
					padding: .28rem 0;
					height: 100%;
					box-sizing: border-box;
					-moz-box-sizing: border-box;
					/* Firefox */
					-webkit-box-sizing: border-box;
					/* Safari */
					overflow-y: scroll;
				}
				ul li {
					list-style: none;
					width: 100%;
					display: flex;
					box-sizing: border-box;
					-moz-box-sizing: border-box;
					/* Firefox */
					-webkit-box-sizing: border-box;
					/* Safari */
					padding: .07rem 0.28rem;
					&:hover {
						color: #e0cf06;
						background-color: rgba(11, 141, 200, 0.4);
					}
				}
				.sanjiao {
					position: relative;
					height: 0px;
					width: 0px;
					top: .07rem;
					margin-right: .14rem;
					border-width: .056rem;
					border-style: solid;
					border-color: transparent transparent transparent #e0cf06;
				}
			}
			
			
			
			.content{
				box-sizing: border-box;
				padding: .31rem .09rem .09rem;
				height: 100%;
				width: 100%;
				.content-bg{
					height:100%;
					border: 1px solid #00a2ff;
					box-sizing: border-box;
					-moz-box-sizing: border-box;
					-webkit-box-sizing: border-box;
					background-color: rgba(16, 11, 64, 0.2);
					border-radius: 0;
					-moz-box-shadow: 2px -2px 2px rgba(11, 184, 251, 0.5) inset;
					-webkit-box-shadow: 2px -2px 2px rgba(11, 187, 255, 0.5) inset;
					box-shadow: 2px -2px 2px rgba(11, 187, 255, 0.3) inset;
					background: -webkit-linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
					background: -o-linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
					background: -moz-linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
					background: linear-gradient(rgba(132, 162, 254, 0.2), rgba(16, 11, 64, 0.3), rgba(16, 11, 64, 0.3), rgba(166, 187, 241, 0.2));
				}
				.content-head{
					display:flex;
					padding: .3rem .2rem 0;
					li{
						background: #0066e5;
						height: .35rem;
						line-height: .35rem;
						text-align: center;
						font-size: .16rem;
						/*padding: 0 .2rem;*/
						width: 1rem;
						position: relative;
						i{
							display: inline-block;
							height: .2rem;
							width: .2rem;
							vertical-align:middle;
							position: absolute;
							left: 0;
							top: .08rem;
						}
						i.down{
							background-image:url(../../assets/images/ash.png) ;
							background-size: 100% 100%;
						}
						i.active{
							background-image:url(../../assets/images/white.png) ;
							background-size: 100% 100%;
						}
					}
					li.tips{
						cursor: pointer;
					}
					li:nth-child(1){
						width:0.3rem;
					}
					li:nth-child(2){
						/*width: 2.07rem;*/
						width:1.77rem;
					}
					li:nth-child(3){
						width: 1.06rem;
					}
					li:nth-last-child(1){
						width: 1.06rem;
					}
				}
				.content-cont{
					height: calc(100% - 0.68rem);
					box-sizing: border-box;
					overflow-y:auto;
					/*padding:0 0.14rem 0 0.2rem;*/
					margin-right:0.2rem ;
					ul {
						padding-left:0.2rem ;
						li{
							cursor:pointer;
							.c-specific{
								display: flex;
								height: .35rem;
								line-height: .35rem;
								text-align: center;
								font-size: .14rem;
								span{
									width: 1rem;
								}
								span:nth-child(1){
									width: .3rem;
								}
								span:nth-child(2){
									width: 1.77rem;
									text-align: left;
									padding-left: 5px;
									box-sizing: border-box;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
								span:nth-child(3){
									width: 1.06rem;
								}
							}
							&:hover {
								color: #e0cf06;
								background-color: rgba(11, 141, 200, 0.4);
							}
							.content-yoy{
								height: .4rem;
								line-height: .4rem;
								span{
									display: inline-block;
									text-align: center;
									width: .3rem;
								}
							}
						}
					}
				}
				.compare-height{
					height: 100%;
					padding:0.1rem 0;
					margin-right:0;
				}
			}
		}
		.echarts-wrap {
			display: flex;
			justify-content: center;
			text-align: center;
			height: calc(100% - 1.12rem);
			margin-top: .28rem;
		}
	}
@media screen and (max-width: 1366px) {
   .cont{
   		padding: 0 20px;
   		.condition-wrap {
			font-size:12px;
			.trans{
				line-height:24px;
			}
			.margin_left {
				line-height: 24px;
			}
			.margin_left2 {
				line-height:24px;
			}
			.router-btn {
				font-size:12px;
				padding:2px 20px;
			}
			.btn-add {
				font-size: 12px;
			}
			.header_name {
				line-height: 24px;
			}
		}
		/*.main-bottom-right .content{
			height: 5rem;
		}*/
   }
}
</style>