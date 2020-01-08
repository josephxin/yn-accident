<template>
	<div class="dialog-wrap dialog-single">
		<el-dialog :visible.sync="$root.dialogSingle" width='90%' :lock-scroll='false'>
			<div slot="title" class="dialog-title">
				<div class="base-info-tilte">报表格式</div>
				<div class="trapezoid-big"></div>
				<div class="trapezoid-smll"></div>
				<divline></divline>
			</div>
			<div>
				<div class="d_s_commonlyused">
					<el-checkbox-group v-model="checkList" :min="1">
						<!--第一条-->
						<el-radio v-model="main" label="1">常用条件</el-radio>
						<div class="d_s_commonlyused_child">
							<el-checkbox :label="item.label" v-for='(item,index) in singleCommonList' :key="index">{{item.name}}</el-checkbox>
						</div>

						<el-radio v-model="main" label="1" class="more">更多条件</el-radio>
						<div class="d_s_commonlyused_child">
							<el-checkbox :label="item.label" v-for='(item,index) in twoSingleCommonList' :key="index">{{item.name}}</el-checkbox>
						</div>
						<hr style="border: none;border-top: 1px dashed #0C6CF2;display: block;width: 100%;margin-top: .4rem;">
						<div class="d_s_commonlyused_child">
							<el-checkbox :label="item.label" v-for='(item,index) in threeSingleCommonList' :key="index">{{item.name}}</el-checkbox>
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button class="opacity" @click="noReport">取 消</el-button>
		    <el-button class="opacity" type="primary" @click="okReport">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import divline from 'components/divline'
	export default {
		name: '',
		components: {
			divline
		},
		props: {
			dialogChangeList: [Array],
			arr: [Array]
		},
		data() {
			return {
				main: '1',
				checkList: [],
				singleCommonList: [{
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
					name: '直接经济损失',
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
					label: 'isCentralEnterprise',//（0-不是，1-是'）
					index: 12
				}, {
					name: '报送单位',
					label: 'reportDepartmentName',
					index: 13
				}],

				twoSingleCommonList: [{
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
					label: 'isReport',// （0-是，1-不是）
					index: 24
				}],

				threeSingleCommonList: [{
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
					label: 'isLawsuit',//(0-未结案，1-结案)
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
					label: 'unitValidity',//（0-合法、1-非法）
					index: 50
				}]

			}
		},
		watch: {
			/*dialogChangeList:{
				handler(val,olVal){
					this.$debug && console.log('监听父', val);
					this.checkList=val
				}
			},*/
			/*checkList: {
				handler(val, olVal) {
					//this.$debug && console.log('监听子', val);

				}
			},*/
		},
		methods: {
			//确定
			okReport() {
				//父子绑定值
				this.$emit('update:dialogChangeList', this.checkList)
				this.$root.dialogSingle = false
			},
			//取消
			noReport() {
				this.$root.dialogSingle = false
				var resultArr = Object.assign([],this.dialogChangeList)
				this.checkList = resultArr
			}
		},
		mounted() {
			//this.$debug && console.log('初始化赋值', this.dialogChangeList);
			this.checkList = this.dialogChangeList
		}
	}
</script>

<style lang="scss">
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.dialog-single {
		.dialog-title {
			display: flex;
		}
		.el-dialog {
			min-width: 1300px;
			/* For Latest Opera */
			background: -webkit-linear-gradient(rgba(16, 11, 64, 0.8), rgba(16, 11, 64, .9), rgba(16, 11, 64, .9), rgba(16, 11, 64, 0.8));
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(rgba(16, 11, 64, 0.8), rgba(16, 11, 64, .9), rgba(16, 11, 64, .9), rgba(16, 11, 64, 0.8));
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(rgba(16, 11, 64, 0.8), rgba(16, 11, 64, .9), rgba(16, 11, 64, .9), rgba(16, 11, 64, 0.8));
			/* Firefox 3.6 - 15 */
			background: linear-gradient(rgba(16, 11, 64, 0.8), rgba(16, 11, 64, .9), rgba(16, 11, 64, .9), rgba(16, 11, 64, 0.8));
			/* 标准的语法 */
		}
		.el-dialog__body {
			/*height: 575px;*/
		}
		.el-button:hover,
		.el-button {
			background: #1f4677;
			border-color: #3091f3;
			color: #bcdaff;
			&.el-button--primary {
				background: #3091f3;
				color: #fff;
			}
		}
		.d_s_commonlyused {
			margin-bottom: 0px;
			.more {
				margin-top: .6rem;
			}
			.el-checkbox {
				color: #bcdaff;
				font-size:.14rem;
				margin: .3rem 0 0 0;
				width: 10%;
			}
			.el-checkbox__inner {
				background-color: #1f4677;
				border-color: #3091f3;
			}
			.d_s_commonlyused_child {
				margin-left: .25rem;
				>.with {
					display: inline-block;
					margin-right: 1rem;
				}
			}
		}
		.base-info-tilte{
			width: auto;
			white-space: nowrap;
			padding: 4px 20px;
		}
	}
</style>