<template>
	<div class="cont">
		<dossiers-title :name="reportTitle[0]" :isShow.sync="isShowwrit"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowwrit">
				<report :list="reportList[0]" name="事故快报：" type="document" :accept="acceptDocument" :uploadData="{'baseId':	accidentId, 'firstName': reportTitle[0], 'fileStructureId': 1}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[1]" :isShow.sync="isShowyingji"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowyingji">
				<report :list="reportList[1]" name="事故快报：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[1], 'fileStructureId': 2}"></report>
				<dashed></dashed>
				<report :list="reportList[2]" name="领导批示：" type="document" :accept="acceptDocument" :uploadData="{'baseId':	accidentId, 'firstName': reportTitle[1], 'fileStructureId': 3}"></report>
				<dashed></dashed>
				<report :list="reportList[3]" name="应急救援情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[1], 'fileStructureId': 4}"></report>
				<dashed></dashed>
				<report :list="reportList[4]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[1], 'fileStructureId': 5}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[2]" :isShow.sync="isShowlvzhi"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowlvzhi">
				<report :list="reportList[5]" name="政府部门“三定方案”情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[2], 'fileStructureId': 6}"></report>
				<dashed></dashed>
				<report :list="reportList[6]" name="政府部门监督检查情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[2], 'fileStructureId': 7}"></report>
				<dashed></dashed>
				<report :list="reportList[7]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[2], 'fileStructureId': 8}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[3]" :isShow.sync="isShowyinyong"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowyinyong">
				<report :list="reportList[8]" name="法律法规（名称、条目、内容）：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[3], 'fileStructureId': 9}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[4]" :isShow.sync="isShowmeeting"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowmeeting">
				<report :list="reportList[9]" name="事故调查工作会议纪要：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[4], 'fileStructureId': 10}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[5]" :isShow.sync="isShowauthenticate"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowauthenticate">
				<report :list="reportList[10]" name="事故调查技术鉴定专家成员名单：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[5], 'fileStructureId': 11}"></report>
				<dashed></dashed>
				<report :list="reportList[11]" name="事故调查技术鉴定报告：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[5], 'fileStructureId': 12}"></report>
				<dashed></dashed>
				<report :list="reportList[12]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[5], 'fileStructureId': 13}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[6]" :isShow.sync="isShowWork"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowWork">
				<report :list="reportList[13]" name="事故调查组各工作小组书面报告：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[6], 'fileStructureId': 14}"></report>
				<dashed></dashed>
				<report :list="reportList[14]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[6], 'fileStructureId': 15}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[7]" :isShow.sync="isShowReply"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowReply">
				<report :list="reportList[15]" name="有关部门向政府申请批复事故调查报告请示：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[7], 'fileStructureId': 16}"></report>
				<dashed></dashed>
				<report :list="reportList[16]" name="政府对事故调查报告的批复文件：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[7], 'fileStructureId': 17}"></report>
				<dashed></dashed>
				<report :list="reportList[17]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[7], 'fileStructureId': 18}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[8]" :isShow.sync="isShowPublish"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowPublish">
				<report :list="reportList[18]" name="在本级辖区主流媒体或安全监管部门的门户网站公布事故处理结果的新闻稿件：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[8], 'fileStructureId': 19}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[9]" :isShow.sync="isShowZRZJ"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowZRZJ">
				<report :list="reportList[19]" name="各部门落实政府批复文件的通知：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[9], 'fileStructureId': 20}"></report>
				<dashed></dashed>
				<report :list="reportList[20]" name="各部门落实政府批复文件的回函及相关责任追究落实的档案材料：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[9], 'fileStructureId': 21}"></report>
				<dashed></dashed>
				<report :list="reportList[21]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[9], 'fileStructureId': 22}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[10]" :isShow.sync="isShowSBBA"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowSBBA">
				<report :list="reportList[22]" name="市向省上报备案材料：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[10], 'fileStructureId': 23}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[11]" :isShow.sync="isShowCLSGDCZ"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowCLSGDCZ">
				<report :list="reportList[23]" name="有关部门成立事故调查组的请示：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[11], 'fileStructureId': 24}"></report>
				<dashed></dashed>
				<report :list="reportList[24]" name="市、区政府关于成立事故调查组的批复文件：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[11], 'fileStructureId': 25}"></report>
				<dashed></dashed>
				<report :list="reportList[25]" name="事故调查组人员名单：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[11], 'fileStructureId': 26}"></report>
				<dashed></dashed>
				<report :list="reportList[26]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[11], 'fileStructureId': 27}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[12]" :isShow.sync="isShowGPDB"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowGPDB">
				<report :list="reportList[27]" name="市对区级辖区发生一次死亡2人的一般事故挂牌督办材料：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[12], 'fileStructureId': 28}"></report>
				<dashed></dashed>
				<report :list="reportList[28]" name="省对市较大生产安全事故挂牌督办材料：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[12], 'fileStructureId': 29}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[13]" :isShow.sync="isShowXMQK"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowXMQK">
				<report :list="reportList[29]" name="事故项目或工程概况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[13], 'fileStructureId': 30}"></report>
				<dashed></dashed>
				<report :list="reportList[30]" name="项目或工程许可情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[13], 'fileStructureId': 31}"></report>
				<dashed></dashed>
				<report :list="reportList[31]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[13], 'fileStructureId': 32}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[14]" :isShow.sync="isShowDWQK"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowDWQK">
				<report :list="reportList[32]" name="资质证书：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[14], 'fileStructureId': 33}"></report>
				<dashed></dashed>
				<report :list="reportList[33]" name="单位简介：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[14], 'fileStructureId': 34}"></report>
				<dashed></dashed>
				<report :list="reportList[34]" name="合同情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[14], 'fileStructureId': 35}"></report>
				<dashed></dashed>
				<report :list="reportList[35]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[14], 'fileStructureId': 36}"></report>
			</section>
		</transition>

		<!--事故相关单位安全生产组织管理情况-->
		<dossiers-title :name="reportTitle[15]" :isShow.sync="isShowAQSCGL"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowAQSCGL">
				<div v-for="(item, index) in arrAQSCGL" :key="index">
					<report :list="reportList[36+index]" :name="item.name" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[15], 'fileStructureId': 37+index}"></report>
					<dashed v-if="arrAQSCGL.length!=index+1"></dashed>
				</div>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[16]" :isShow.sync="isShowDCXWBL"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowDCXWBL">
				<report :list="reportList[61]" name="调查询问笔录：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[16], 'fileStructureId': 62}"></report>
				<dashed></dashed>
				<report :list="reportList[62]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[16], 'fileStructureId': 63}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[17]" :isShow.sync="isShowQZCS"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowQZCS">
				<report :list="reportList[63]" name="控制事故相关人员情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[17], 'fileStructureId': 64}"></report>
				<dashed></dashed>
				<report :list="reportList[64]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[17], 'fileStructureId': 65}"></report>
			</section>
		</transition>

		<!--事故影音资料-->
		<dossiers-title :name="reportTitle[18]" :isShow.sync="isShowYYZL"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowYYZL">
				<report :list="reportList[65]" name="事故调查相关图片：" type="img" :accept="acceptImg" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[18], 'fileStructureId': 66}"></report>
				<dashed></dashed>
				<report :list="reportList[66]" name="事故调查相关录音：" type="audio" :accept="acceptAudio" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[18], 'fileStructureId': 67}"></report>
				<dashed></dashed>
				<report :list="reportList[67]" name="事故调查组人员名单：" type="video" :accept="acceptVideo" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[18], 'fileStructureId': 68}"></report>
				<dashed></dashed>
				<report :list="reportList[68]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[18], 'fileStructureId': 69}"></report>
			</section>
		</transition>

		<dossiers-title :name="reportTitle[19]" :isShow.sync="isShowRYSW"></dossiers-title>
		<transition name="fade">
			<section v-show="isShowRYSW">
				<report :list="reportList[69]" name="伤亡人员身份证信息：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[19], 'fileStructureId': 70}"></report>
				<dashed></dashed>
				<report :list="reportList[70]" name="法医学死亡证明书：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[19], 'fileStructureId': 71}"></report>
				<dashed></dashed>
				<report :list="reportList[71]" name="受伤人员就诊病例：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[19], 'fileStructureId': 72}"></report>
				<dashed></dashed>
				<report :list="reportList[72]" name="善后处理费用情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[19], 'fileStructureId': 73}"></report>
				<dashed></dashed>
				<report :list="reportList[73]" name="直接经济损失情况：" type="document" :accept="acceptDocument" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[19], 'fileStructureId': 74}"></report>
				<dashed></dashed>
				<report :list="reportList[74]" name="其他：" :uploadData="{'baseId': accidentId, 'firstName': reportTitle[19], 'fileStructureId': 75}"></report>
			</section>
		</transition>
	</div>
</template>

<script>
	import dashed from 'components/line/dashed'
	import dossiersTitle from './dossiersTitle'
	import report from './report'

	export default {
		name: 'dossiers',
		components: {
			dashed,
			dossiersTitle,
			report,
		},
		data() {
			return {
				isShowwrit: true,
				isShowyingji: true,
				isShowlvzhi: false,
				isShowyinyong: false,
				isShowmeeting: false,
				isShowauthenticate: false,
				isShowWork: false,
				isShowReply: false,
				isShowPublish: false,
				isShowZRZJ: false,
				isShowSBBA: false,
				isShowCLSGDCZ: false,
				isShowGPDB: false,
				isShowXMQK: false,
				isShowDWQK: false,
				isShowAQSCGL: false,
				isShowDCXWBL: false,
				isShowQZCS: false,
				isShowYYZL: false,
				isShowRYSW: false,

				accidentId: 0, // 事故id
				reportTitle: ['执法文书', '事故报告和应急处置', '政府相关部门履职情况', '该事故引用的法律法规情况', '事故调查工作会议情况', '事故调查技术鉴定情况', '事故调查组各工作小组工作情况', '事故调查报告批复结案情况', '向社会公布事故处理结果的情况', '责任追究落实情况', '事故上报备案情况', '成立事故调查组', '事故挂牌督办情况', '事故项目或工程情况', '事故相关单位基本情况', '事故相关单位安全生产组织管理情况', '调查询问笔录', '对相关人员采取强制措施情况', '事故影音资料', '人员伤亡及善后工作情况'],
				reportList: [],
				arrAQSCGL: [{
						name: '项目管理机构成立情况：',
					},
					{
						name: '组织架构及人员情况：',
					},
					{
						name: '岗位职责情况：',
					},
					{
						name: '人事变动情况：',
					},
					{
						name: '入职及工资发放情况：',
					},
					{
						name: '人员持证情况：',
					},
					{
						name: '安全生产费用管理情况：',
					},
					{
						name: '安全教育培训情况：',
					},
					{
						name: '安全生产规章制度：',
					},
					{
						name: '排班考勤情况：',
					},
					{
						name: '现场作业班组情况：',
					},
					{
						name: '操作规程：',
					},
					{
						name: '财务账册：',
					},
					{
						name: '施工组织设计方案：',
					},
					{
						name: '施工方案：',
					},
					{
						name: '质量管理制度：',
					},
					{
						name: '技术交底情况：',
					},
					{
						name: '操作记录：',
					},
					{
						name: '企业安全检查情况：',
					},
					{
						name: '设备设施维修保养情况：',
					},
					{
						name: '应急预案及演练情况：',
					},
					{
						name: '安全责任制情况：',
					},
					{
						name: '特种设备的设计、制造、型式实验、验收、鉴定等情况：',
					},
					{
						name: '安全生产会议纪要：',
					},
					{
						name: '其他：',
					}
				],
				acceptDocument: '.pdf,.doc,.docx,.xls,.xlsx',
				acceptImg: 'image/*',
				acceptAudio: 'audio/*',
				acceptVideo: 'video/*',
			}
		},
		methods: {
			// 时间戳转成日期格式
			timestampToTime(timestamp) {
				var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate();
				return Y + M + D;
			},
			// 卷宗档案列表
			dossiersList() {
				this.reportList.length = 0
				for(var i = 0; i < 75; i++) {
					this.reportList.push([])
				}
				//this.$debug && console.log(this.reportList);
				//this.$debug && console.log(this.accidentId)
				this.$xhr.getDossiersList({
					accidentId: this.accidentId
				}).then(res => {
					this.$debug && console.log('卷宗档案列表:', res)
					if(res && res.code == 0) {
						res.content.forEach((item, index) => {
							var fileStructureId = item.fileStructureId;
							var type = item.attachmentFileType;
							var obj = {}
							if(type == "application/msword" || type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
								obj.tag = 'word'
							} else if(type == "application/vnd.ms-excel" || type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
								obj.tag = 'excel'
							} else if(type == "application/pdf") {
								obj.tag = 'pdf'
							} else if(type.indexOf('image') != -1) {
								obj.tag = 'img'
							} else if(type.indexOf('audio') != -1) {
								obj.tag = 'audio'
							} else if(type.indexOf('video') != -1) {
								obj.tag = 'video'
							} else {
								obj.tag = 'word'
							}
							obj.id = item.id
							obj.name = item.attachmentName
							obj.date = this.timestampToTime(item.uploadTime)
							obj.url = item.attachmentPath

							this.reportList[fileStructureId - 1].push(obj)

						})
					} else {
						this.$debug && console.log(res)
						this.$message.error(res.message);
					}
				})
			},
		},
		created() {
			//this.$debug && console.log(this.$route.params)
			this.accidentId = this.$route.params.baseId
			// 获取卷宗档案列表
			this.dossiersList()
		},
		mounted() {

		},
		beforeDestroy() {
			this.$root.dialogAccidentDynamic = false
		}
	}
</script>

<style lang="scss" scoped>

</style>