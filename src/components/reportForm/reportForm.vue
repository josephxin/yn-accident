<template>
	<div class="reportForm">
		<el-form ref="form" :model="form" label-width="1.46rem" size="mini" :inline="true" :rules="rules">
			<div class="condition-wrap">
				<!--第一行-->
				<el-form-item label="报送状态:" prop="reportStatusId">
					<el-select v-model="form.reportStatusId" placeholder="全部" class="select-wrap" :popper-append-to-body="false" clearable>
						<el-option v-for="(item,index) in submittedState" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<!--@change = 'selectAll'  multiple-->
				<el-form-item label="事故级别:" prop="grade">
					<el-select v-model="form.grade" placeholder="全部" class="select-wrap" :popper-append-to-body="false" clearable>
						<el-option v-for="(item,index) in sidebarSelect" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事故发生单位:" prop="departmentName">
					<el-input placeholder="请输入内容" v-model="form.departmentName" clearable></el-input>
				</el-form-item>
				<el-form-item label="事故类型:" prop="typeId">
					<!--可能多选 clearable-->
					<el-select v-model="form.typeId" clearable placeholder="全部" class="select-wrap" :popper-append-to-body="false">
						<el-option v-for="(item,index) in accidenType" :label="item.name" :value="item.id" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事故标识:" prop="accidentIdentificationId">
					<el-select v-model="form.accidentIdentificationId" placeholder="全部" clearable>
						<el-option v-for="(item,index) in accidentIdentification" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>

				<!--第二行-->
				<!--<el-form-item prop="date1">
			        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
			      </el-form-item>-->
				<el-form-item label="发生时间:" prop="accidentStartDate" :required='false'>
					<el-date-picker v-model="form.accidentStartDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="发生时间" :picker-options="startDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="截止时间:" prop="accidentEndDate" :required='false'>
					<el-date-picker v-model="form.accidentEndDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="截止时间" :picker-options="endDate"></el-date-picker>
				</el-form-item>

				<el-form-item label="管理分类:" prop="managementTypeId">
					<el-select v-model="form.managementTypeId" placeholder="全部" clearable>
						<el-option v-for="(item,index) in manageType" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事故地点:" class="form_two">
					<el-form-item class="form_two_place" prop="cityAreaId">
						<el-select v-model="form.cityAreaId" placeholder="全部" :clearable="isClearable"  @change="changeCityAreaId(form.cityAreaId,'districtAreaIdArr','districtAreaId')">
							<el-option v-for="(item,index) in cityList" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
						<label class="form_two_label">市/州</label>
					</el-form-item>
					<el-form-item class="form_two_place" prop="districtAreaId">
						<el-select v-model="form.districtAreaId" placeholder="全部" :clearable="isClearableSon">
							<el-option v-for="(item,index) in districtAreaIdArr" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
						<label class="form_two_place_county">区/县</label>
					</el-form-item>

				</el-form-item>

				<!--第三行-->
				<el-form-item label="所属行业:" prop="departmentIndustryId">
					<el-select v-model="form.departmentIndustryId" placeholder="全部" clearable>
						<el-option v-for="(item,index) in departmentIndustry" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="直接经济损失:" prop="economicLosses">
					<el-input placeholder="请输入内容" v-model="form.economicLosses" clearable></el-input>
				</el-form-item>
				<el-form-item label="初次入库时间:" prop="firstStorageTime">
					<el-date-picker v-model="form.firstStorageTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间" :picker-options="endDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="初次上报时间:" prop="firstReportTime">
					<el-date-picker v-model="form.firstReportTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间" :picker-options="endDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="是否为中央企业:" prop="isCentralEnterprise">
					<el-select v-model="form.isCentralEnterprise" placeholder="全部" clearable>
						<el-option v-for="(item,index) in isCentralEnterpriseType" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>

				<!--第四行-->
				<el-form-item label="报送单位:" class="form_Three">
					<el-form-item class="form_two_place" prop="unitCityAreaId">
						<el-select v-model="form.unitCityAreaId" placeholder="全部" :clearable="isClearable" @change="changeCityAreaId(form.unitCityAreaId,'unitDistrictAreaIdArr','unitDistrictAreaId')">
							<el-option v-for="(item,index) in cityList" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
						<label class="form_two_label">市/州</label>
					</el-form-item>
					<el-form-item class="form_two_place" prop="unitDistrictAreaId">
						<el-select v-model="form.unitDistrictAreaId" placeholder="全部" :clearable="isClearableSon">
							<el-option v-for="(item,index) in unitDistrictAreaIdArr" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
						<label class="form_two_place_county">区/县</label>
					</el-form-item>
				</el-form-item>
			</div>

			<!--第二部分需要折叠面板-->
			<el-collapse v-model="activeNames">
				<el-collapse-item name="1">
					<template slot="title">
						<div class="collapse_one"></div>
						<span class="collapse_name">更多</span>
						<div class="collapse_two"></div>
					</template>
					<div class="condition-wrap">
						<!--第一行-->
						<el-form-item label="单位规模:" prop="departmentScaleId">
							<el-select v-model="form.departmentScaleId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in unitSize" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="死亡人数:" :required="false">
							<el-form-item prop='deathStart' class="float-none">
								<el-input class="num_people" v-model="form.deathStart" autocomplete="off"></el-input>
							</el-form-item>
							<label class="transverse">-</label>
							<el-form-item prop='deathEnd' class="float-none">
								<el-input class="num_people" v-model="form.deathEnd"></el-input>
							</el-form-item>
						</el-form-item>
						<el-form-item label="受伤人数:">
							<el-form-item prop='injuredStart' class="float-none">
								<el-input class="num_people" v-model="form.injuredStart"></el-input>
							</el-form-item>
							<label class="transverse">-</label>
							<el-form-item prop='injuredEnd' class="float-none">
								<el-input class="num_people" v-model="form.injuredEnd"></el-input>
							</el-form-item>

						</el-form-item>
						<el-form-item label="重伤人数:">
							<el-form-item prop='seriousStart' class="float-none">
								<el-input class="num_people" v-model="form.seriousStart"></el-input>
							</el-form-item>
							<label class="transverse">-</label>
							<el-form-item prop='seriousEnd' class="float-none">
								<el-input class="num_people" v-model="form.seriousEnd"></el-input>
							</el-form-item>
						</el-form-item>
						<el-form-item label="单位类型名称:" prop='departmentTypeId'>
							<el-select v-model="form.departmentTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in unitTypeName" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<!--第二行-->
						<el-form-item label="事故单位地址:" class="form_two">
							<el-form-item class="form_two_place" prop='addressCityAreaId'>
								<el-select v-model="form.addressCityAreaId" placeholder="全部" @change="changeCityAreaId(form.addressCityAreaId,'addressDistrictAreaIdArr','addressDistrictAreaId')" :clearable="isClearable">
									<el-option v-for="(item,index) in cityList" :key="index" :label="item.name" :value="item.id"></el-option>
								</el-select>
								<label class="form_two_label">市/州</label>
							</el-form-item>
							<el-form-item class="form_two_place" prop='addressDistrictAreaId'>
								<el-select v-model="form.addressDistrictAreaId" placeholder="全部" :clearable="isClearableSon">
									<el-option v-for="(item,index) in addressDistrictAreaIdArr" :key="index" :label="item.name" :value="item.id"></el-option>
								</el-select>
								<label class="form_two_place_county">区/县</label>
							</el-form-item>
						</el-form-item>
						<el-form-item label="起因物:" prop='causedThingId'>
							<el-select v-model="form.causedThingId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in causeThing" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="致害物:" prop='harmfulThingId'>
							<el-select v-model="form.harmfulThingId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in harmfulThing" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="不安全行为:" prop='unsafeBehaviorId'>
							<el-select v-model="form.unsafeBehaviorId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in inseCurity" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<!--这个才是第三行-->
						<el-form-item label="不安全状态:" prop='unsafeStatusId'>
							<el-select v-model="form.unsafeStatusId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in inseState" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<!--<el-form-item label="单位类型名称:" prop='departmentTypeId'>
							<el-select v-model="form.departmentTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in unitTypeName" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>-->
						<el-form-item label="是否为举报事故:" prop='isReport'>
							<el-select v-model="form.isReport" placeholder="全部" clearable>
								<el-option v-for="(item,index) in isReportType" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<hr style="border: none;border-top: 1px dashed #0C6CF2;display: block;width: 100%;margin-bottom: .14rem;">

						<!--虚线后的第一行-->
						<el-form-item label="非本企业死亡人数:">
							<el-form-item prop='isNotEnterpriseDeathPersonStart' class="float-none">
								<el-input class="num_people" v-model="form.isNotEnterpriseDeathPersonStart"></el-input>
							</el-form-item>
							<label class="transverse">-</label>
							<el-form-item prop='isNotEnterpriseDeathPersonEnd' class="float-none">
								<el-input class="num_people" v-model="form.isNotEnterpriseDeathPersonEnd"></el-input>
							</el-form-item>

						</el-form-item>
						<el-form-item label="非本企业受伤人数:">
							<el-form-item prop='isNotEnterpriseInjuredPersonStart' class="float-none">
								<el-input class="num_people" v-model="form.isNotEnterpriseInjuredPersonStart"></el-input>
							</el-form-item>
							<label class="transverse">-</label>
							<el-form-item prop='isNotEnterpriseInjuredPersonEnd' class="float-none">
								<el-input class="num_people" v-model="form.isNotEnterpriseInjuredPersonEnd"></el-input>
							</el-form-item>

						</el-form-item>
						<el-form-item label="非本企业重伤人数:">
							<el-form-item prop='isNotEnterpriseSeriousPersonStart' class="float-none">
								<el-input class="num_people" v-model="form.isNotEnterpriseSeriousPersonStart"></el-input>
							</el-form-item>
							<label class="transverse">-</label>
							<el-form-item prop='isNotEnterpriseSeriousPersonEnd' class="float-none">
								<el-input class="num_people" v-model="form.isNotEnterpriseSeriousPersonEnd"></el-input>
							</el-form-item>

						</el-form-item>
						<el-form-item label="损失工作日:" prop='loseWorkday'>
							<el-input placeholder="请输入内容" v-model="form.loseWorkday" clearable></el-input>
						</el-form-item>
						<el-form-item label="事故单位详细地址:" prop='accidentAddress'>
							<el-input placeholder="请输入内容" v-model="form.accidentAddress" clearable>
							</el-input>
						</el-form-item>

						<!--第二行-->
						<!--<el-form-item label="事故发生详细地址:">
							<el-input placeholder="请输入内容" v-model="value" clearable>
							</el-input>
						</el-form-item>-->
						<el-form-item label="单位代码:" prop='unitCode'>
							<el-input placeholder="请输入内容" v-model="form.unitCode" clearable>
							</el-input>
						</el-form-item>
						<el-form-item label="联系电话:" prop='phone'>
							<el-input placeholder="请输入内容" v-model="form.phone" clearable>
							</el-input>
						</el-form-item>
						<el-form-item label="职工人数:" prop='personNum'>
							<el-input placeholder="请输入内容" v-model="form.personNum" clearable></el-input>
						</el-form-item>
						<el-form-item label="评估分类:" prop="evaluationTypeId">
							<el-select v-model="form.evaluationTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in evaluationClass" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="控股分类:" prop="holdTypeId">
							<el-select v-model="form.holdTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in holdingClass" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<!--第三行-->
						<el-form-item label="主管部门:" prop="competentDepartment">
							<el-input placeholder="请输入内容" v-model="form.competentDepartment" clearable></el-input>
						</el-form-item>
						<el-form-item label="子企业名称:" prop="subEnterpriseName">
							<el-input placeholder="请输入内容" v-model="form.subEnterpriseName" clearable></el-input>
						</el-form-item>
						<el-form-item label="企业部门:" prop="businessEnterprise">
							<el-input placeholder="请输入内容" v-model="form.businessEnterprise" clearable></el-input>
						</el-form-item>
						<el-form-item label="事故原因:" prop="accidentCauseId">
							<el-select v-model="form.accidentCauseId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in accidentCause" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否结案:" prop="isLawsuit">
							<el-select v-model="form.isLawsuit" placeholder="全部" clearable>
								<el-option v-for="(item,index) in isLawsuitType" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<!--第4行-->
						<el-form-item label="行业大类:" prop="industryBigCategoriesId">
							<el-select v-model="form.industryBigCategoriesId" placeholder="全部" clearable @change="changeIndustry(form.industryBigCategoriesId,'industryCenterCategoriesIdArr','industryCenterCategoriesId','industrySmallCategoriesId','industrySmallCategoriesIdArr')">
								<el-option v-for="(item,index) in IndustryCategories" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="行业中类:" prop="industryCenterCategoriesId">
							<el-select v-model="form.industryCenterCategoriesId" placeholder="全部" clearable @change="changeIndustry(form.industryCenterCategoriesId,'industrySmallCategoriesIdArr','industrySmallCategoriesId')">
								<el-option v-for="(item,index) in industryCenterCategoriesIdArr" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="行业小类:" prop="industrySmallCategoriesId">
							<el-select v-model="form.industrySmallCategoriesId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in industrySmallCategoriesIdArr" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<!--<el-form-item label="煤矿缺少何种证件:" prop="collieryLackPapersId">
							<el-select v-model="form.collieryLackPapersId" placeholder="全部">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>-->
						<el-form-item label="煤矿类别:" prop="collieryTypeId">
							<el-select v-model="form.collieryTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in collieryType" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<!--第五行-->
						<el-form-item label="煤矿事故类型:" prop="collieryAccidentTypeId">
							<el-select v-model="form.collieryAccidentTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in collieryAccidentType" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="煤矿致害原因:" prop="collieryDamageCauseId">
							<el-select v-model="form.collieryDamageCauseId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in collieryDamage" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="煤矿统计类别:" prop="collieryCountTypeId">
							<el-select v-model="form.collieryCountTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in collieryCount" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="危险品事故分类:" prop="hazardousAccidentTypeId">
							<el-select v-model="form.hazardousAccidentTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in damageAccidentType" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="危化事故环节:" prop="hazardousAccidentLinkId">
							<el-select v-model="form.hazardousAccidentLinkId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in damageAccidentLink" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<!--第六行-->
						<el-form-item label="危险化学品类别:" prop="dangerousChemicalTypeId">
							<el-select v-model="form.dangerousChemicalTypeId" placeholder="全部" clearable>
								<el-option v-for="(item,index) in chemistryType" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="单位合法性:" prop="unitValidity">
							<el-select v-model="form.unitValidity" placeholder="全部" clearable>
								<el-option v-for="(item,index) in unitValidityType" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</div>

				</el-collapse-item>

			</el-collapse>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {
			dateShow: [Boolean]
		},
		data() {
			//这是判断时间  开始时间选择：结束时间自动选择今天    2结束时间不能小于开始时间  且结束时间不能再下一年 前一年  
			//  结束时间选择    开始时间  一个可以跨年一个不可以
			var accidentStartDateTime = (rule, value, callback) => {
				if(value == "" || value == null) {
					callback(new Error("请输入开始时间"))
				} else {

					if(this.form.accidentEndDate != '' && this.form.accidentEndDate != null) {
						if(this.dateShow) {
							this.$refs.form.validateField('accidentEndDate');
							callback()
						} else {
							callback()
						}
					} else {
						callback()
					}
					callback()
				}
			};
			var accidentEndDateTime = (rule, value, callback) => {
				//this.$debug && console.log('结束时间', rule, value)
				var date = new Date(value);
				var time = date.getTime();
				if(value == "" || value == null) {
					callback(new Error("请输入结束时间"))
				} else {
					if(this.form.accidentStartDate != '' && this.form.accidentStartDate != null) {
						var startDate = new Date(this.form.accidentStartDate)
						var startTime = startDate.getTime()
						if(time < startTime) {
							callback(new Error('必须大于开始时间'))
							//this.form.accidentStartDate = ''
						}
						var endTime = date.getFullYear()
						var endStartTime = startDate.getFullYear()
						if(this.dateShow) {
							if(endTime != endStartTime) {
								callback(new Error('不能跨年'))
							} else {
								callback()
							}
						}
						callback()
					}
					callback()
				}
			};
			var numberHandle = (start, end, callback) => {
				if(start != '' && start != null) {
					var endVal = parseInt(end)
					var startVal = parseInt(start)
					if(endVal < startVal) {
						callback(new Error('应大于开始人数'))
					} else {
						callback()
					}
				} else {
					callback()
				}
			};
			var numberStartBlur = (rule, value, callback) => {
				//死亡人数
				//this.$debug && console.log("起点",rule, value)
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					if(this.form.deathEnd != '' && this.form.deathEnd != null) {
						this.$refs.form.validateField('deathEnd');
						callback()
					}
					callback()
				}
			};
			var numberEndBlur = (rule, value, callback) => {
				//this.$debug && console.log("终点",rule, value)
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					//传入参数 ，起始值，结束值  callback
					numberHandle(this.form.deathStart, value, callback)
				}
			};

			var injuredStartBlur = (rule, value, callback) => {
				//受伤人数
				//this.$debug && console.log("起点",rule, value)
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					if(this.form.injuredEnd != '' && this.form.injuredEnd != null) {
						this.$refs.form.validateField('injuredEnd');
					}
					callback()
				}
			};
			var injuredEndBlur = (rule, value, callback) => {
				//this.$debug && console.log("终点",rule, value)
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					//传入参数 ，起始值，结束值  callback
					numberHandle(this.form.injuredStart, value, callback)
				}
			};

			var seriousStartBlur = (rule, value, callback) => {
				//重伤人数
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					if(this.form.seriousEnd != '' && this.form.seriousEnd != null) {
						this.$refs.form.validateField('seriousEnd');
					}
					callback()
				}
			};
			var seriousEndBlur = (rule, value, callback) => {
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					//传入参数 ，起始值，结束值  callback
					numberHandle(this.form.seriousStart, value, callback)
				}
			};

			var isNotEnterpriseDeathPersonStartBlur = (rule, value, callback) => {
				//非本企业死亡人数
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					if(this.form.isNotEnterpriseDeathPersonEnd != '' && this.form.isNotEnterpriseDeathPersonEnd != null) {
						this.$refs.form.validateField('isNotEnterpriseDeathPersonEnd');
					}
					callback()
				}
			};
			var isNotEnterpriseDeathPersonEndBlur = (rule, value, callback) => {
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					//传入参数 ，起始值，结束值  callback
					numberHandle(this.form.isNotEnterpriseDeathPersonStart, value, callback)
				}
			};

			var isNotEnterpriseInjuredPersonStartBlur = (rule, value, callback) => {
				//非本企业受伤人数
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					if(this.form.isNotEnterpriseInjuredPersonEnd != '' && this.form.isNotEnterpriseInjuredPersonEnd != null) {
						this.$refs.form.validateField('isNotEnterpriseInjuredPersonEnd');
					}
					callback()
				}
			};
			var isNotEnterpriseInjuredPersonEndBlur = (rule, value, callback) => {
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					//传入参数 ，起始值，结束值  callback
					numberHandle(this.form.isNotEnterpriseInjuredPersonStart, value, callback)
				}
			};

			var isNotEnterpriseSeriousPersonStartBlur = (rule, value, callback) => {
				//非本企业重伤人数
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					if(this.form.isNotEnterpriseSeriousPersonEnd != '' && this.form.isNotEnterpriseSeriousPersonEnd != null) {
						this.$refs.form.validateField('isNotEnterpriseSeriousPersonEnd');
					}
					callback()
				}
			};
			var isNotEnterpriseSeriousPersonEndBlur = (rule, value, callback) => {
				if(isNaN(value)) {
					//不是纯数字
					callback(new Error('必须是数字'))
				} else {
					//传入参数 ，起始值，结束值  callback
					numberHandle(this.form.isNotEnterpriseSeriousPersonStart, value, callback)
				}
			};

			return {
				datevalue: '',
				currentPage: 1, //当前的页码
				isShowbase: true,
				activeNames: [],
				startDate: {
					disabledDate: (time) => {
						return time.getTime() > Date.now();
					}
				},
				endDate: {
					disabledDate: (time) => {
						return time.getTime() > Date.now();
					}
				},
				form: {
					reportStatusId: '', //报送状态
					grade: '', //事故级别
					departmentName: '', //事故发生单位
					typeId: '', //事故类型
					accidentIdentificationId: '', //事故标识
					accidentStartDate: '', //发生时间
					accidentEndDate: '', //截止时间
					managementTypeId: '', //管理分类
					cityAreaId: '', //事故地点(市)
					districtAreaId: '', //事故地点（县）
					departmentIndustryId: '', //所属行业
					economicLosses: '', //直接经济损失
					firstStorageTime: '', //初次入库时间
					firstReportTime: '', //初次上报时间
					isCentralEnterprise: '', //单位性质 对应是否为中央企业
					unitCityAreaId: '', //报送单位（市）
					unitDistrictAreaId: '', //报送单位（县）
					departmentScaleId: '', //单位规模
					deathStart: '', //死亡人数(小)
					deathEnd: '', //死亡人数(大)
					injuredStart: '', //受伤人数(小)
					injuredEnd: '', //受伤人数(大)
					seriousStart: '', //重伤人数(小)
					seriousEnd: '', //重伤人数(大)
					addressCityAreaId: '', //事故单位地址（市）
					addressDistrictAreaId: '', //事故单位地址（县）
					causedThingId: '', //起因物
					harmfulThingId: '', //致害物
					unsafeBehaviorId: '', //不安全行为
					unsafeStatusId: '', //不安全状态
					departmentTypeId: '', //单位类型名称
					isReport: '', //是否为举报事故
					isNotEnterpriseDeathPersonStart: '', //非本企业死亡人数（小）
					isNotEnterpriseDeathPersonEnd: '', //非本企业死亡人数（大）
					isNotEnterpriseInjuredPersonStart: '', //非本企业受伤人数（小）
					isNotEnterpriseInjuredPersonEnd: '', //非本企业受伤人数（大）
					isNotEnterpriseSeriousPersonStart: '', //非本企业重伤人数（小）
					isNotEnterpriseSeriousPersonEnd: '', //非本企业重伤人数（大）
					loseWorkday: '', //损失工作日
					accidentAddress: '', //事故单位详细地址
					unitCode: '', //单位代码
					phone: '', //联系电话
					personNum: '', //职工人数
					evaluationTypeId: '', //评估分类
					holdTypeId: '', //控股分类
					competentDepartment: '', //主管部门
					subEnterpriseName: '', //子企业名称
					businessEnterprise: '', //企业部门
					accidentCauseId: '', //事故原因
					isLawsuit: '', //是否结案
					industryBigCategoriesId: '', //行业大类
					industryCenterCategoriesId: '', //行业中类
					industrySmallCategoriesId: '', //行业小类
					//collieryLackPapersId: '', //煤矿缺少何种证件
					collieryTypeId: '', //煤矿类别
					collieryAccidentTypeId: '', //煤矿事故类型
					collieryDamageCauseId: '', //煤矿致害原因
					collieryCountTypeId: '', //煤矿统计类别
					hazardousAccidentTypeId: '', //危险品事故分类
					hazardousAccidentLinkId: '', //危化事故环节
					dangerousChemicalTypeId: '', //危险化学品类别
					unitValidity: '', //单位合法性
				},
				rules: {
					accidentStartDate: [{
						type: 'date',
						trigger: 'change',
						required: false,
						validator: accidentStartDateTime
					}], //发生时间
					accidentEndDate: [{
						type: 'date',
						required: false,
						trigger: 'change',
						validator: accidentEndDateTime,
					}], //截止时间
					deathStart: [{
						validator: numberStartBlur,
						trigger: "blur"
					}], //死亡人数(起点)
					deathEnd: [{
						validator: numberEndBlur,
						trigger: "blur"
					}], //死亡人数(终点)
					injuredStart: [{
						validator: injuredStartBlur,
						trigger: "blur"
					}], //受伤人数（小）
					injuredEnd: [{
						validator: injuredEndBlur,
						trigger: "blur"
					}], //受伤人数（大）
					seriousStart: [{
						validator: seriousStartBlur,
						trigger: "blur"
					}], //重伤人数(小)
					seriousEnd: [{
						validator: seriousEndBlur,
						trigger: "blur"
					}], //重伤人数(大)
					isNotEnterpriseDeathPersonStart: [{
						validator: isNotEnterpriseDeathPersonStartBlur,
						trigger: "blur"
					}], //非本企业死亡人数（小）
					isNotEnterpriseDeathPersonEnd: [{
						validator: isNotEnterpriseDeathPersonEndBlur,
						trigger: "blur"
					}], //非本企业死亡人数(大)
					isNotEnterpriseInjuredPersonStart: [{
						validator: isNotEnterpriseInjuredPersonStartBlur,
						trigger: "blur"
					}], //非本企业受伤人数（小）
					isNotEnterpriseInjuredPersonEnd: [{
						validator: isNotEnterpriseInjuredPersonEndBlur,
						trigger: "blur"
					}], //非本企业受伤人数(大)
					isNotEnterpriseSeriousPersonStart: [{
						validator: isNotEnterpriseSeriousPersonStartBlur,
						trigger: "blur"
					}], //非本企业重伤人数（小）
					isNotEnterpriseSeriousPersonEnd: [{
						validator: isNotEnterpriseSeriousPersonEndBlur,
						trigger: "blur"
					}], //非本企业重伤人数(大)
				},

				cityList: [], //城市数据
				accidenType: [], //事故类型
				manageType: [], //管理分类
				unitSize: [], //单位规模
				causeThing: [], //起因物
				harmfulThing: [], //致害物
				inseCurity: [], //不安全行为
				inseState: [], //不安全状态
				unitTypeName: [], //单位类型名称
				departmentIndustry: [], //所属行业
				submittedState: [], //报送状态
				accidentIdentification: [], //事故标识
				evaluationClass: [], //评估分类
				holdingClass: [], //控股分类
				collieryType: [], //煤矿类别
				collieryAccidentType: [], //煤矿事故类型
				collieryDamage: [], //煤矿致害原因
				collieryCount: [], //煤矿统计类别
				damageAccidentType: [], //危险品事故分类
				damageAccidentLink: [], //危化事故环节
				chemistryType: [], //危险化学品类别
				accidentCause: [], //事故原因
				IndustryCategories: [], //行业大类

				//前端控制
				districtAreaIdArr: [], //事故地点县级
				addressDistrictAreaIdArr: [], //事故单位县级
				unitDistrictAreaIdArr: [], //报送单位县级
				industryCenterCategoriesIdArr: [], //行业中类
				industrySmallCategoriesIdArr: [], //行业小类
				//{id: 0,name: '全选'},
				//oldOptions: [], //测试全选全不选
				sidebarSelect: [{
					id: 1,
					name: '一般事故'
				}, {
					id: 2,
					name: '较大事故'
				}, {
					id: 3,
					name: '重大事故'
				}, {
					id: 4,
					name: '特别重大事故'
				}], //事故等级
				isCentralEnterpriseType: [{
					id: 1,
					name: '是'
				}, {
					id: 0,
					name: '否'
				}], //是否为中央企业
				isReportType: [{
					id: 0,
					name: '是'
				}, {
					id: 1,
					name: '否'
				}], //是否为举报事故
				
				isLawsuitType: [{
					id: 1,
					name: '结案'
				}, {
					id: 0,
					name: '未结案'
				}, {
					id: 2,
					name: '未知'
				}], //是否结案
				unitValidityType: [{
					id: 0,
					name: '合法'
				}, {
					id: 1,
					name: '非法'
				}, {
					id: 2,
					name: '未知'
				}],

				//需要删除
				options: [{
					value: '1',
					label: '不限'
				}, {
					value: '2',
					label: '特别重大事故'
				}, {
					value: '3',
					label: '重大事故'
				}, {
					value: '4',
					label: '较大事故'
				}, {
					value: '5',
					label: '一般事故'
				}],
				//value: '1',
				userLevel:'10086',
				isClearable:true,//市级用户进来市级不能删除
				isClearableSon:true,//区级用户进来区级不能删除
			}
		},

		methods: {
			//重置表单
			formResetFields() {
				this.$refs.form.resetFields()  //重置表单
				
				this.industryCenterCategoriesIdArr= []; //行业中类
				this.industrySmallCategoriesIdArr=[]; //行业小类
				//根据权限来重置
				switch(this.userLevel){
					case '3': 
						//不变
						this.districtAreaIdArr = []; //事故地点县级
						this.addressDistrictAreaIdArr= []; //事故单位县级
						this.unitDistrictAreaIdArr=[]; //报送单位县级
						break;
					case '5':
						//市级用户
						this.form.cityAreaId = this.cityList[0].id  
						this.form.unitCityAreaId = this.cityList[0].id  
						this.form.addressCityAreaId = this.cityList[0].id 
						//调用3次是因为里面有3个市州 选项
						//调用级别
						this.changeCityAreaId(this.form.cityAreaId,'districtAreaIdArr','districtAreaId')
						this.changeCityAreaId(this.form.unitCityAreaId,'unitDistrictAreaIdArr','unitDistrictAreaId')
						this.changeCityAreaId(this.form.addressCityAreaId,'addressDistrictAreaIdArr','addressDistrictAreaId')
						//区县要有数据 数组不然重置后昆明市在也选不到数据了
						//this.customdata.districtAreaId = [] //到时写个数组
						break;
					case '7':
						//区县级用户
						this.form.cityAreaId = this.cityList[0].id  
						this.form.unitCityAreaId = this.cityList[0].id  
						this.form.addressCityAreaId = this.cityList[0].id 
						
						this.form.districtAreaId = this.districtAreaIdArr[0].id  
						this.form.unitDistrictAreaId = this.unitDistrictAreaIdArr[0].id  
						this.form.addressDistrictAreaId = this.addressDistrictAreaIdArr[0].id 
						break;
					default:
						break;
				}
				this.dateTimeSelect() //获取默认时间
				this.$message({
					message: '重置成功',
					type: 'success',
					duration: 1000
				});
			},
			//changeCityAreaId
			//根据市的id查询下面的子级，需要调用接口
			changeCityAreaId(val, arr, type) {
				//this.$debug && console.log(arr, this[arr])  需要存放的数组
				//this.$debug && console.log(type)  //需要跟着变化的
				//this.$debug && console.log("市id", val)
				this.form[type] = ''
				this[arr] = []
				//如果是删除市就不需要调用接口了
				if(val) {
					this.$xhr.ynDdistractList({
						cityId: val
					}).then(data => {
						//this.$debug && console.log('县级数据',data)
						if(data.code == 0) {
							var distractList = data.content.distractList //县级数据需要处理
							var distractListArr = []
							distractList.forEach((item, i) => {
								var obj = {}
								for(var p in item) {
									obj.id = item[p]
									obj.name = p
								}
								distractListArr.push(obj)
							})
							this[arr] = distractListArr
						}

					}).catch(err => {
						this.$debug && console.log(err)
					})
				}
			},
			//行业获取信息
			changeIndustry(val, arr, type, threeType,threeTypeArr) {
				//this.$debug && console.log("val", val)
				//this.$debug && console.log("arr", arr)
				//this.$debug && console.log("type", type)
				//this.$debug && console.log("threeType", threeType)
				this.form[type] = '';
				this[arr] = []
				if(threeType) {
					this.form[threeType] = ''
					this[threeTypeArr] = []
				}
				if(val) {
					this.$xhr.ynDictionaryIndustry({
						industryId: val
					}).then(data => {
						//this.$debug && console.log('行业数据', data)
						if(data.code == 0) {
							var distractList = data.content.industryList //数据需要处理
							var distractListArr = []
							distractList.forEach((item, i) => {
								var obj = {}
								for(var p in item) {
									obj.id = item[p]
									obj.name = p
								}
								distractListArr.push(obj)
							})
							this[arr] = distractListArr
						}

					}).catch(err => {
						this.$debug && console.log(err)
					})
				}
			},
			//全选？？ 暂时不用了
			selectAll(val, ) {
				const allValues = []
				// 保留所有值
				for(const item of this.sidebarSelect) {
					allValues.push(item.id)
				}
				// 用来储存上一次的值，可以进行对比
				const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : []
				// 若是全部选择
				if(val.includes(0)) this.form.grade = allValues
				// 取消全部选中 上次有 当前没有 表示取消全选
				if(oldVal.includes(0) && !val.includes(0)) this.form.grade = []
				// 点击非全部选中 需要排除全部选中 以及 当前点击的选项
				// 新老数据都有全部选中
				if(oldVal.includes(0) && val.includes(0)) {
					const index = val.indexOf(0)
					val.splice(index, 1) // 排除全选选项
					this.form.grade = val
				}
				// 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
				if(!oldVal.includes(0) && !val.includes(0)) {
					if(val.length === allValues.length - 1) this.form.grade = [0].concat(val)
				}

				// 储存当前最后的结果 作为下次的老数据
				this.oldOptions[0] = this.form.grade
			},
			//时间选择
			dateTimeSelect() {
				var dateTime = new Date() //获取当前系统时间
				var year = dateTime.getFullYear(); //获取完整的年份(4位,1970-????)
				var month = dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1; //获取当前的月份
				var day = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate(); //获取当前的日期
				this.form.accidentStartDate = year + "-01-01"; //发生时间
				this.form.accidentEndDate = year + "-" + month + "-" + day; //截止时间
			}
		},
		created() {
			//请求数据 下拉框数据
			var user = JSON.parse(sessionStorage.getItem('loginData'))//获取用户的信息 只能在各个页面获取不能写成统一的不然登出时换人登入拿到的是登出的人的信息
			if(user){
				this.userLevel = user.organization.organizationLevel
			}
			this.$xhr.ynDictionaryReportList().then(data => {
				if(data.code == 0) {
					//成功
					//this.$debug && console.log(data)
					var cityList = data.content.cityList //市级数据  需要处理
					var cityListArr = []
					cityList.forEach((item, i) => {
						var obj = {}
						for(var p in item) {
							obj.id = item[p]
							obj.name = p
						}
						cityListArr.push(obj)
					})
					this.cityList = cityListArr //城市数据
					//this.$debug && console.log(cityListArr)//处理好后的数据
					if(this.userLevel == '3'){
						//省级用户
						//console.log(3)
						//先不变
					}else if(this.userLevel == '5'){
						//市级用户
						//console.log(5)
						this.isClearable = false //市级没有删除
						//默认选中
						this.form.cityAreaId = this.cityList[0].id  
						this.form.unitCityAreaId = this.cityList[0].id  
						this.form.addressCityAreaId = this.cityList[0].id  
						
						//调取子级
						this.changeCityAreaId(this.form.cityAreaId,'districtAreaIdArr','districtAreaId')
						this.changeCityAreaId(this.form.unitCityAreaId,'unitDistrictAreaIdArr','unitDistrictAreaId')
						this.changeCityAreaId(this.form.addressCityAreaId,'addressDistrictAreaIdArr','addressDistrictAreaId')
						
					}else if(this.userLevel == '7'){
						//区县级用户
						//console.log(7)
						this.isClearable = false //市级没有删除
						this.isClearableSon = false; //区级没有删除
						//默认选中调取子级	
						data.content.districtList.forEach((item,i)=>{
							for(let key in item) {
								this.districtAreaIdArr.push({
									name: key,
									id: item[key]
								})
								this.addressDistrictAreaIdArr.push({
									name: key,
									id: item[key]
								})
								this.unitDistrictAreaIdArr.push({
									name: key,
									id: item[key]
								})
							}
						})
						this.form.cityAreaId = this.cityList[0].id  
						this.form.unitCityAreaId = this.cityList[0].id  
						this.form.addressCityAreaId = this.cityList[0].id 
						
						this.form.districtAreaId = this.districtAreaIdArr[0].id  
						this.form.unitDistrictAreaId = this.unitDistrictAreaIdArr[0].id  
						this.form.addressDistrictAreaId = this.addressDistrictAreaIdArr[0].id 
						
						
					}
					
					var ynDictionaries = data.content.ynDictionaries //其余数据

					ynDictionaries.forEach((item, i) => {
						switch(item.code) {
							case "accidenType":
								//事故类型 1;
								this.accidenType = item.list
								break;
							case "manageType":
								//管理分类1;
								this.manageType = item.list
								break;
							case "unitSize":
								//单位规模1;
								this.unitSize = item.list
								break;
							case "causeThing":
								//起因物1;
								this.causeThing = item.list
								break;
							case "harmfulThing":
								//致害物1;
								this.harmfulThing = item.list
								break;
							case "inseCurity":
								//不安全行为1;
								this.inseCurity = item.list
								break;
							case "inseState":
								//不安全状态1;
								this.inseState = item.list
								break;
							case "unitTypeName":
								//单位类型名称;
								this.unitTypeName = item.list
								break;
							case "departmentIndustry":
								//所属行业;
								this.departmentIndustry = item.list

								break;
							case "submittedState":
								//报送状态1;
								this.submittedState = item.list

								break;
							case "accidentIdentification":
								//事故标识1;
								this.accidentIdentification = item.list

								break;
							case "evaluationClass":
								//评估分类1;
								this.evaluationClass = item.list
								break;
							case "holdingClass":
								//控股分类1;
								this.holdingClass = item.list
								break;
							case "collieryType":
								//煤矿类别1;
								this.collieryType = item.list
								break;
							case "collieryAccidentType":
								//煤矿事故类型1;
								this.collieryAccidentType = item.list
								break;
							case "collieryDamage":
								//煤矿致害原因1;
								this.collieryDamage = item.list
								break;
							case "collieryCount":
								//煤矿统计类别1;
								this.collieryCount = item.list
								break;
							case "damageAccidentType":
								//危险品事故分类1;
								this.damageAccidentType = item.list
								break;
							case "damageAccidentLink":
								//危化事故环节1;
								this.damageAccidentLink = item.list
								break;
							case "chemistryType":
								//危险化学品类别1;
								this.chemistryType = item.list
								break;
							case "accidentCause":
								//事故原因;
								this.accidentCause = item.list
								break;
							case "IndustryCategories":
								//行业大类
								this.IndustryCategories = item.list
								break;
						}
					})
				}

			}).catch(err => {
				this.$debug && console.log(err)
			})
		},
		mounted() {
			this.dateTimeSelect()

		}

	}
</script>

<style lang="scss" scoped>
	.float-none {
		float: none;
		width: 44%;
	}
	
	.condition-wrap {
		/*margin: .14rem 0.28rem 0;*/
		margin-top: .14rem;
		display: flex;
		/*justify-content: space-between;*/
		flex-wrap: wrap;
	}
	
	.collapse_one {
		width: 48%;
		height: 1px;
		background: #0760a0;
		position: absolute;
		top: 50%;
		left: 0;
	}
	.collapse_name{
		position: absolute;
	    left: 50%;
	    top: -0.15rem;
	    color: #21c6fc;
	    line-height: 0.48rem;
	    /*font-size: .16rem;*/
	}
	.collapse_two {
		width: 48%;
		height: 1px;
		background: #0760a0;
		position: absolute;
		top: 50%;
		right: 0;
	}
</style>