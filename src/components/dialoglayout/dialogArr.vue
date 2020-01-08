<template>
	<div class="dialog_arr">
		<div class="dialog-casualties" v-if="type == 'casualties'">
			<el-form ref="casualties" :rules="rules" :model="form" size="mini">
				<el-form-item label="姓名:" label-width="1.35rem" prop="name">
					<el-input v-model="form.name" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="身份证号:" label-width="1.35rem" prop="idCard">
					<el-input v-model="form.idCard" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否为企业人员" label-width="1.35rem" prop="enterprisePerson">
					<el-radio-group v-model="form.enterprisePerson">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="伤亡类型:" label-width="1.35rem" prop="casualtiesType">
					<el-select v-model="form.casualtiesType" placeholder="请选择活动区域">
						<el-option label="死亡" value="死亡"></el-option>
						<el-option label="失联" value="失联"></el-option>
						<el-option label="重伤" value="重伤"></el-option>
						<el-option label="轻伤" value="轻伤"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="经济损失(万元):" label-width="1.35rem" prop="economicLosses">
					<el-input v-model="form.economicLosses" autocomplete="off" maxlength='15'></el-input>
				</el-form-item>

				<el-form-item v-show="false" label="" label-width="1.35rem" prop="id">
					<el-input v-model="form.id" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
		</div>
		
		
		<!---->
		<div class="dialog-casualties" v-if="type == 'investigation'">
			<el-form ref="investigation" :rules="formInvestigationRules" :model="formInvestigation" size="mini">
				<el-form-item label="姓名:" label-width="1rem" prop="name">
					<el-input v-model="formInvestigation.name" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="工作单位:" label-width="1rem" prop="workUnit">
					<el-input v-model="formInvestigation.workUnit" autocomplete="off" maxlength='200'></el-input>
				</el-form-item>
				<el-form-item label="单位职务:" label-width="1rem" prop="unitDuty">
					<el-input v-model="formInvestigation.unitDuty" autocomplete="off" maxlength='120'></el-input>
				</el-form-item>
				<el-form-item label="调查组职务:" label-width="1rem" prop="investigationTeamDuty">
					<el-input v-model="formInvestigation.investigationTeamDuty" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="办公电话:" label-width="1rem" prop="workPhone">
					<el-input v-model="formInvestigation.workPhone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机:" label-width="1rem" prop="mobilePhone">
					<el-input v-model="formInvestigation.mobilePhone" autocomplete="off"></el-input>
				</el-form-item>

				<!--清除id-->
				<el-form-item v-show="false" label="" label-width="1.2rem" prop="id">
					<el-input v-model="formInvestigation.id" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
		</div>

		<!--被处理企业及人员信息-->
		<div class="dialog-casualties" v-if="type == 'sgclPersonInfoServicePage'">
			<el-form ref="coverHandle" :rules="forCoverHandleRules" :model="forCoverHandle" size="mini">
				<el-form-item label="单位名称:" label-width="1.35rem" prop="unitName">
					<el-input v-model="forCoverHandle.unitName" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="法定代表人:" label-width="1.35rem" prop="statutoryAgent">
					<el-input v-model="forCoverHandle.statutoryAgent" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="姓名:" label-width="1.35rem" prop="name">
					<el-input v-model="forCoverHandle.name" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="职务:" label-width="1.35rem" prop="duty">
					<el-input v-model="forCoverHandle.duty" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="处罚金额(万元):" label-width="1.35rem" prop="penaltyAmount">
					<!-- onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"-->
					<el-input v-model="forCoverHandle.penaltyAmount" autocomplete="off" maxlength='15'></el-input>
				</el-form-item>
				<el-form-item label="责任落实单位:" label-width="1.35rem" prop="responsibleUnit">
					<el-input v-model="forCoverHandle.responsibleUnit" autocomplete="off" maxlength='200'></el-input>
				</el-form-item>
				<el-form-item label="落实结果:" label-width="1.35rem" prop="workableResult">
					<el-select v-model="forCoverHandle.workableResult" placeholder="" :disabled="IsReadOnly.enterprise">
						<el-option label="落实中" value="落实中"></el-option>
						<el-option label="已落实" value="已落实"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="实际落实时间:" label-width="1.35rem" prop="actualImplementationTime">
					<el-date-picker v-model="forCoverHandle.actualImplementationTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="" :clearable="false"></el-date-picker>
				</el-form-item>

				<!--清除id-->
				<el-form-item v-show="false" label="" label-width="1.35rem" prop="id">
					<el-input v-model="forCoverHandle.id" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
		</div>

		<!--被处理行政人员信息-->
		<div class="dialog-casualties" v-if="type == 'coverPersonnel'">
			<el-form ref="coverPersonnel" :rules="forCoverPersonnelRules" :model="forCoverPersonnel" size="mini">
				<el-form-item label="部门名称:" label-width="1.35rem" prop="deptName">
					<el-input v-model="forCoverPersonnel.deptName" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="级别:" label-width="1.35rem" prop="level">
					<el-select v-model="forCoverPersonnel.level" placeholder="">
						<el-option label="省部级" value="省部级"></el-option>
						<el-option label="厅局级" value="厅局级"></el-option>
						<el-option label="县处级" value="县处级"></el-option>
						<el-option label="乡科级" value="乡科级"></el-option>
						<el-option label="其他" value="其他"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名:" label-width="1.35rem" prop="name">
					<el-input v-model="forCoverPersonnel.name" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="职务:" label-width="1.35rem" prop="duty">
					<el-input v-model="forCoverPersonnel.duty" autocomplete="off" maxlength='60'></el-input>
				</el-form-item>
				<el-form-item label="责任落实单位:" label-width="1.35rem" prop="responsibleUnit">
					<el-input v-model="forCoverPersonnel.responsibleUnit" autocomplete="off" maxlength='200'></el-input>
				</el-form-item>
				<el-form-item label="处罚金额(万元):" label-width="1.35rem" prop="penaltyAmount">
					<el-input v-model="forCoverPersonnel.penaltyAmount" autocomplete="off" maxlength='15'></el-input>
				</el-form-item>
				<el-form-item label="落实结果:" label-width="1.35rem" prop="implementationResults">
					<el-select v-model="forCoverPersonnel.implementationResults" placeholder="" :disabled="IsReadOnly.clericalStaff">
						<el-option label="落实中" value="落实中"></el-option>
						<el-option label="已落实" value="已落实"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="实际落实时间:" label-width="1.35rem" prop="actualImplementationTime">
					<el-date-picker type="date" v-model="forCoverPersonnel.actualImplementationTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="" :clearable="false"></el-date-picker>
				</el-form-item>

				<!--清除id-->
				<el-form-item v-show="false" label="" label-width="1.35rem" prop="id">
					<el-input v-model="forCoverPersonnel.id" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
		</div>

		<!--结案-->
		<div class="dialog-casualties" v-if="type == 'settle'">
			<el-form ref="forSettle" :rules="forSettleRules" :model="forSettle" size="mini">
				<el-form-item label="实际结案时间:" label-width="1.2rem" prop="closingTime">
					<el-date-picker v-model="forSettle.closingTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结案时间"></el-date-picker>
				</el-form-item>
			</el-form>
		</div>

	</div>

</template>

<script>
	export default {
		components: {},
		props: {
			type: String, //判断是那个的新增
		},
		data() {
			var idCardCheckAge = (rule, value, callback) => {
				var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //验证身份证
				if(!regIdNo.test(value)) {
					callback(new Error("请正确填写身份证"))
				} else {
					callback()
				}
				//身份证正则表达式(15位)
				//isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
				//身份证正则表达式(18位)
				//isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
			}
			//验证手机号码
			var phoneCheckAge = (rule, value, callback) => {
				var phone = /^1(3|4|5|7|8)\d{9}$/; //验证手机号码
				if(!phone.test(value)) {
					callback(new Error("请正确填写手机号码"))
				} else {
					callback()
				}

			}
			//验证固定号码
			var workPhoneCheckAge = (rule, value, callback) => {
				var workPhone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/; //验证固定号码
				if(!workPhone.test(value)) {
					callback(new Error("请正确填写固定号码"))
				} else {
					callback()
				}

			}
			//     /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){0,4})?$/
			var isNumber = (rule, value, callback) => { //纯数字  浮点数
				var regIdNo = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d)+)?$/; //
				if(!regIdNo.test(value)) {
					callback(new Error("必须是数字"))
				} else {
					callback()
				}

			}

			return {
				//结案时落实只能看  且只有已落实选项
				IsReadOnly: {
					clericalStaff: false, //被处理行政人员
					enterprise: false, //被处理企业
				},

				form: { //伤亡的人
					casualtiesType: '死亡', //伤亡类型
					economicLosses: '', //经济损失
					enterprisePerson: '是', //是否为企业人员
					idCard: '', //身份证号码
					name: '', //姓名
					id: '', //用来确定是新增还是修改
				},
				rules: { //伤亡的人 验证
					economicLosses: [{
						required: true,
						message: '请输入金额',
						trigger: 'change'
					}, {
						validator: isNumber,
						trigger: 'change'
					}],
					idCard: [{
						required: true,
						message: '请输入身份证号码',
						trigger: 'change'
					}, {
						validator: idCardCheckAge,
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}]
				},

				formInvestigation: { //调查人员
					id: '',
					investigationTeamDuty: "", //调查组职务
					mobilePhone: "", //手机
					name: "", //姓名
					unitDuty: "", //单位职务
					workPhone: "", //办公电话
					workUnit: "" //工作单位
				},
				formInvestigationRules: { //调查人员 验证
					investigationTeamDuty: [{
						required: true,
						message: '请输入调查组职务',
						trigger: 'change'
					}],
					mobilePhone: [{
						required: true,
						message: '请输入手机',
						trigger: 'change'
					}, {
						validator: phoneCheckAge,
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
					unitDuty: [{
						required: true,
						message: '请输入单位职务',
						trigger: 'change'
					}],
					workPhone: [{
						required: true,
						message: '请输入办公电话',
						trigger: 'change'
					}, {
						validator: workPhoneCheckAge,
						trigger: 'change'
					}],
					workUnit: [{
						required: true,
						message: '请输入工作单位',
						trigger: 'change'
					}]
				},

				forCoverHandle: { //被处理企业及人员信息
					id: '',
					duty: "", //职务
					name: "", //姓名
					penaltyAmount: "", //处罚金额
					responsibleUnit: "", //责任落实单位
					statutoryAgent: "", //法定代表人
					unitName: "", //单位名称
					workableResult: "落实中",
					actualImplementationTime: "" //实际落实时间
				},
				forCoverHandleRules: { //被处理企业及人员信息 验证
					duty: [{
						required: true,
						message: '请输入职务',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
					penaltyAmount: [{
							required: true,
							message: '请输入处罚金额',
							trigger: 'change'
						},
						{
							validator: isNumber,
							trigger: 'change'
						}
					],
					responsibleUnit: [{
						required: true,
						message: '请输入责任落实单位',
						trigger: 'change'
					}],
					statutoryAgent: [{
						required: true,
						message: '请输入法定代表人',
						trigger: 'change'
					}],
					unitName: [{
						required: true,
						message: '请输入单位名称',
						trigger: 'change'
					}],
					/*actualImplementationTime: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}]*/

				},

				forCoverPersonnel: { //被处理行政人员信息
					id: "",
					deptName: "", //部门名称
					level: "省部级",
					name: "", //姓名
					duty: "", //职务
					responsibleUnit: "", //责任落实单位
					penaltyAmount: "", //处罚金额
					implementationResults: "落实中",
					actualImplementationTime: "" //时间
				},
				forCoverPersonnelRules: { //被处理行政人员信息 验证
					deptName: [{
						required: true,
						message: '请输入部门名称',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
					duty: [{
						required: true,
						message: '请输入职务',
						trigger: 'change'
					}],
					responsibleUnit: [{
						required: true,
						message: '请输入责任落实单位',
						trigger: 'change'
					}],
					penaltyAmount: [{
						required: true,
						message: '请输入处罚金额',
						trigger: 'change'
					}, {
						validator: isNumber,
						trigger: 'change'
					}],
					//actualImplementationTime:[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
				},

				forSettle: {
					closingTime: ''
				},
				forSettleRules: {
					closingTime: [{
						required: true,
						message: '请输入结案时间',
						trigger: 'change'
					}]
				}
			}
		},
		computed: {
			status() {
				return this.$store.state.status
			}
		},
		watch: {
			status: {
				handler(val, olVal) {
					//this.$debug && console.log("status",val)
					if(val == 1) {
						this.IsReadOnly.clericalStaff = true
						this.IsReadOnly.enterprise = true
						this.forCoverPersonnel.implementationResults = "已落实"
						this.forCoverHandle.workableResult = "已落实"
					}
				},
				deep: true
			}
		},
		methods: {
			getTime() {
				var dateTime = new Date() //获取当前系统时间
				var year = dateTime.getFullYear(); //获取完整的年份(4位,1970-????)
				var month = dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1; //获取当前的月份
				var day = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate(); //获取当前的日期
				this.forCoverPersonnel.actualImplementationTime = year + "-" + month + "-" + day; //
				this.forCoverHandle.actualImplementationTime = year + "-" + month + "-" + day;
			}
		},

		created() {

		},
		mounted() {
			this.getTime()
			//this.$debug && console.log(this.$parent.$parent)
			if(this.$parent.$parent.baseInfo.base.status == 1) { //结案
				this.IsReadOnly.clericalStaff = true
				this.IsReadOnly.enterprise = true
				this.forCoverPersonnel.implementationResults = "已落实"
				this.forCoverHandle.workableResult = "已落实"
			}

		},
		beforeDestroy() {

		}
	}
</script>

<style lang="scss">
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.dialog_arr {
		.el-form {
			.el-form-item__label {
				color: #B9D7FC;
			}
			.el-select {
				width: 100%;
			}
			.el-form-item--mini .el-form-item__content,
			.el-form-item--mini .el-form-item__label {
				/*line-height: .24rem;*/
				line-height: 32px;
			}
			.el-input__inner {
				color: $cl-txt;
				/*height: .24rem!important;
				line-height: .24rem;*/
				height: 32px!important;
				line-height: 32px;
				padding-right: .15rem;
				border: 1px solid #0d5b8e;
				border-radius: 0;
				background-color: rgba(11, 187, 255, 0.2);
				&:focus {
					border-color: #0d5b8e;
				}
			}
			.el-input.is-disabled .el-input__inner {
				background-color: rgba(11, 187, 255, .2);
				border-color: #0d5b8e;
				color: #f0f2f7;
			}
			.el-date-editor.el-input,
			.el-date-editor.el-input__inner {
				width: 100%;
			}
			.el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
				box-shadow: 0 0 0px 0px #409EFF;
			}
			.el-input.is-focus .el-input__inner {
				border-color: #0d5b8e;
			}
			.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
				content: ""
			}
		}
	}
	
	.dialog-casualties {
		display: flex;
		flex-direction: column;
		color: #fff;
		.dialog-casualties-item {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			margin-top: .01rem;
			input {
				background-color: rgba(11, 187, 255, 0.2);
				border: 1px solid #00a2ff;
			}
		}
	}
	
	@media screen and (max-width: 1366px) {
		.dialog_arr {
			.el-form {
				.el-form-item--mini .el-form-item__content,
				.el-form-item--mini .el-form-item__label {
					line-height: 24px;
				}
				.el-input__inner {
					height: 24px!important;
					line-height: 24px;
				}
			}
		}
	}
</style>