<template>
	<div class="cont information">
		<div class="container-box dialog-wrap">
			<el-dialog :title="isshowdialogTitle" :visible.sync="isshowdialog" width="21%" center :lock-scroll="false" :before-close="backvalueNo">
				<dialog-arr ref="addData" type="casualties"></dialog-arr>
				<div slot="footer" class="dialog-footer">
					<el-button @click="backvalueNo">取 消</el-button>
					<el-button type="primary" @click="backvalue">确 定</el-button>
				</div>
			</el-dialog>

			<el-dialog :title="isInvestigationTitle" :visible.sync="isInvestigation" width="21%" center :lock-scroll="false" :before-close="investigationNo">
				<dialog-arr ref="addData1" type="investigation"></dialog-arr>
				<div slot="footer" class="dialog-footer">
					<el-button @click="investigationNo">取消</el-button>
					<el-button type="primary" @click="investigationAdd">确定</el-button>
				</div>
			</el-dialog>

			<el-dialog title="被处理企业及人员信息" :visible.sync="iscoverHandle" width="21%" center :lock-scroll="false" :before-close="iscoverHandleNo">
				<dialog-arr ref="addData2" type="sgclPersonInfoServicePage"></dialog-arr>
				<div slot="footer" class="dialog-footer">
					<el-button @click="iscoverHandleNo">取消</el-button>
					<el-button type="primary" @click="iscoverHandleAdd">确定</el-button>
				</div>
			</el-dialog>

			<el-dialog title="被处理行政人员信息" :visible.sync="coverPersonnel" width="21%" center :lock-scroll="false" :before-close="coverPersonnelNo">
				<dialog-arr ref="addData3" type="coverPersonnel"></dialog-arr>
				<div slot="footer" class="dialog-footer">
					<el-button @click="coverPersonnelNo">取消</el-button>
					<el-button type="primary" @click="coverPersonnelAdd">确定</el-button>
				</div>
			</el-dialog>

			<el-dialog title="结案" :visible.sync="settle" width="21%" center :lock-scroll="false" :before-close="settleNo">
				<dialog-arr ref="addData4" type="settle"></dialog-arr>
				<div slot="footer" class="dialog-footer">
					<el-button @click="settleNo">取消</el-button>
					<el-button type="primary" @click="settleAdd">确定</el-button>
				</div>
			</el-dialog>
		</div>

		<div style="display:flex;margin-top: 0.21rem;">
			<div class="base-info-tilte">
				事故基本信息
			</div>
			<div class="trapezoid-big"></div>
			<div class="trapezoid-smll"></div>
			<hr class="hr_style">

			<div class="show-base-info" @click="showbaseinfo">
				<i :class="[isShowbase?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
			</div>
		</div>
		<div v-show="isShowbase">
			<div class="base-info-content">
				<div class="base-info-one">
					<div class="bio-one">
						<label>发生日期：</label><span>{{baseInfo.base.happenTime || '-'}}</span>
					</div>
					<div class="bio-one">
						<label>发生地市：</label><span :title="baseInfo.base.cityAreaName">{{baseInfo.base.cityAreaName||'-'}}</span>
					</div>
					<div class="bio-one">
						<label>发生区县：</label><span :title="baseInfo.base.districtAreaName">{{baseInfo.base.districtAreaName||'-'}}</span>
					</div>
					<div class="bio-one">
						<label>事故类型：</label><span>{{baseInfo.typeName||'-'}}</span>
					</div>
					<div class="bio-one">
						<label>事故等级：</label><span>{{baseInfo.grade||'-'}}</span>
					</div>
					<div class="bio-one">
						<label>管理分类：</label><span>{{baseInfo.managementTypeName||'-'}}</span>
					</div>
				</div>
				<div class="base-info-one">
					<div class="bio-one">
						<label>重伤：</label><span>{{baseInfo.serious||0}}</span>
					</div>
					<div class="bio-one">
						<label>轻伤：</label><span>{{baseInfo.injured||0}}</span>
					</div>
					<div class="bio-one">
						<label>死亡：</label><span>{{baseInfo.death || 0}}</span>
					</div>
					<div class="bio-one">
						<label>经济损失(万元)：</label><span>{{baseInfo.economicLosses||0}}</span>
					</div>
					<div class="bio-one">
						<label>单位规模：</label><span>{{baseInfo.departmentScale||'-'}}</span>
					</div>
					<div class="bio-one">
						<label>单位类型名称：</label><span>{{baseInfo.departmentType||'-'}}</span>
					</div>

				</div>
				<div class="base-info-one">
					<div class="bio-one bio-width">
						<label>事故单位：</label><span :title="baseInfo.departmentName">{{baseInfo.departmentName||'-'}}</span>
					</div>
					<div class="bio-one bio-width">
						<label>事故单位地址：</label><span :title="baseInfo.departmentAddress">{{baseInfo.departmentAddress||'-'}}</span>
					</div>
					<div class="bio-one">
						<label>所属行业：</label><span :title="baseInfo.departmentIndustry">{{baseInfo.departmentIndustry||'-'}}</span>
					</div>
					<div class="bio-one">
						<label>发生地点：</label><span :title="baseInfo.location">{{baseInfo.location||'-'}}</span>
					</div>
				</div>

				<!--<div class="bic-vertical">
					<div>
						<label>发生日期：</label><span>{{baseInfo.base.happenTime || '-'}}</span>
					</div>
					<div>
						<label>重伤：</label><span>{{baseInfo.serious||0}}</span>
					</div>
					<div>
						<label>单位规模：</label><span>{{baseInfo.departmentScale||'-'}}</span>
					</div>
				</div>

				<div class="bic-vertical">
					<div>
						<label>发生地市：</label><span :title="baseInfo.base.cityAreaName">{{baseInfo.base.cityAreaName||'-'}}</span>
					</div>
					<div>
						<label>轻伤：</label><span>{{baseInfo.injured||0}}</span>
					</div>
					<div>
						<label>单位类型名称：</label><span>{{baseInfo.departmentType||'-'}}</span>
					</div>
				</div>
				<div class="bic-vertical">
					<div>
						<label>发生区县：</label><span :title="baseInfo.base.districtAreaName">{{baseInfo.base.districtAreaName||'-'}}</span>
					</div>
					<div>
						<label>死亡：</label><span>{{baseInfo.death || 0}}</span>
					</div>
					<div>
						<label>所属行业：</label><span :title="baseInfo.departmentIndustry">{{baseInfo.departmentIndustry||'-'}}</span>
					</div>
				</div>
				<div class="bic-vertical">
					<div>
						<label>事故类型：</label><span>{{baseInfo.typeName||'-'}}</span>
					</div>

					<div>
						<label>经济损失(万元)：</label><span>{{baseInfo.economicLosses||0}}</span>
					</div>
					<div>
						<label>发生地点：</label><span :title="baseInfo.location">{{baseInfo.location||'-'}}</span>
					</div>
				</div>
				<div class="bic-vertical">
					<div>
						<label>事故等级：</label><span>{{baseInfo.grade||'-'}}</span>
					</div>
					<div>
						<label>事故单位：</label><span :title="baseInfo.departmentName">{{baseInfo.departmentName||'-'}}</span>
					</div>
					<div></div>
				</div>
				<div class="bic-vertical">
					<div>
						<label>管理分类：</label><span>{{baseInfo.managementTypeName||'-'}}</span>
					</div>
					<div>
						<label>事故单位地址：</label><span :title="baseInfo.departmentAddress">{{baseInfo.departmentAddress||'-'}}</span>
					</div>
					<div></div>
				</div>-->
			</div>
			<div class="bic-accident">
				<label>事故概况：</label>
				<textarea rows="3" disabled>{{baseInfo.overview||'-'}}</textarea>
				<!--<div class="span-info" :title="baseInfo.overview">{{baseInfo.overview||'-'}}</div>-->
			</div>
		</div>

		<div style="display:flex;margin-top: 0.21rem;">
			<div class="base-info-tilte">
				事故扩展信息
			</div>
			<div class="trapezoid-big"></div>
			<div class="trapezoid-smll"></div>
			<hr class="hr_style">

			<div class="show-base-info" @click="showExtendinfo">
				<i :class="[isShowextend?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
			</div>
		</div>
		<div v-show="isShowextend">
			<div class="extend-info-content">
				<div><label>是否为举报事故：</label><span>{{baseInfo.isReport==0?'是':'否'}}</span></div>
				<div><label>起因物：</label><span>{{baseInfo.causedThing||'-'}}</span></div>
				<div><label>致害物：</label><span>{{baseInfo.harmfulThing||'-'}}</span></div>
				<div><label>不安全状态：</label><span :title="baseInfo.unsafeStatus">{{baseInfo.unsafeStatus||'-'}}</span></div>
				<div><label>事故标识：</label><span>{{baseInfo.accidentIdentification||'-'}}</span></div>
			</div>
			<div class="extend-info-content">
				<div><label>是否为中央企业：</label><span>{{ baseInfo.isCentralEnterprise ==  '0' ? '否' : '是' }}</span></div>
				<div><label>不安全行为：</label><span :title="baseInfo.unsafeBehavior">{{ baseInfo.unsafeBehavior || '-' }}</span></div>
				<div><label>初次上报日期：</label><span>{{ baseInfo.firstReportTime || '-' }}</span></div>
				<div><label>初次入库日期：</label><span>{{ baseInfo.firstStorageTime || '-' }}</span></div>
				<div><label>报送单位地址：</label><span :title="baseInfo.reportDepartmentName">{{baseInfo.reportDepartmentName||'-'}}</span></div>

			</div>
			<div class="extend-info-content">
				<div><label>报送状态：</label><span :title="baseInfo.reportStatusName">{{baseInfo.reportStatusName||'-'}}</span></div>
			</div>
		</div>
		
		<div class="line">
			<span class="line-line"></span>
			<span class="line-line"></span>
			<div class="line-title">事故调查处理信息</div>
		</div>
		
		<div style="display:flex;margin-top: .21rem;">
			<div class="base-info-tilte">
				伤亡人员情况
			</div>
			<div class="trapezoid-big"></div>
			<div class="trapezoid-smll"></div>
			<hr class="hr_style">

			<div class="show-base-info" @click="showCasuulties">
				<i :class="[isShowcasualties?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
			</div>
		</div>
		<div v-show="isShowcasualties">

			<div class="div-btn-class">
				<div>
					<!--站位-->
				</div>
				<button class="btn btn-add" @click="showdialog">
          			<i class="el-icon-plus"></i>新增
        		</button>
			</div>
			<div class="table-wrap table-wrap-accident">
				<table class="table-box">
					<tr>
						<th>序号</th>
						<th>姓名</th>
						<th>身份证号</th>
						<th>是否为企业人员</th>
						<th>伤亡类型</th>
						<th>经济损失(万元)</th>
						<th>操作</th>
					</tr>
					<tr v-for="(item,index) in casultData">
						<td>{{index + 1}}</td>
						<td :title="item.name">{{item.name}}</td>
						<td>{{item.idCard}}</td>
						<td>{{item.enterprisePerson}}</td>
						<td>{{item.casualtiesType}}</td>
						<td>{{item.economicLosses}}</td>
						<td>
							<span class="operation-span-revise" @click="sgclCasualtiesUpdate(item)">修改</span>
							<span class="operation-span-delete" @click="sgclCasualtiesDeleteAjax(item.id)">删除</span>
							<!--:class="{'no-click':baseInfo.base.status == 1}"  不能删除的样式-->
						</td>
					</tr>
				</table>
				<div v-if="casultData.length<=0" class="nodata">
					暂无数据
				</div>
				<!--<el-table :data="casultData" tooltip-effect="dark" style="width: 100%" header-align="center"  stripe >				
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column v-for="(item,index) in casultDataHeader" :key='index' :prop="item.prop" :label="item.label" min-width="95" align="center"></el-table-column>
	
					<el-table-column label="操作" align="center" min-width="70">
						<template slot-scope="scope">
							<span class="operation-span-revise" @click="sgclCasualtiesUpdate(scope.row)">修改</span>
							<span class="operation-span-delete" @click="sgclCasualtiesDeleteAjax(scope.row.id)" :class="{'no-click':baseInfo.base.status == 1}">删除</span>
						</template>
					</el-table-column>
				</el-table>-->
			</div>

			<div style="color: #b8d7ff;margin-top: 0.21rem;display: flex;justify-content:flex-end;text-align: center;line-height: 0.35rem">
				<el-pagination v-if="casultData.length>0" :current-page.sync="casualtiesPage.currentPage" :page-size="casualtiesPage.pageSize" layout="prev, pager, next, jumper,total" :total="casualtiesPage.total">
				</el-pagination>

			</div>
		</div>
		<div style="display:flex;margin-top: .21rem;">
			<div class="base-info-tilte">
				调查处理信息
			</div>
			<div class="trapezoid-big"></div>
			<div class="trapezoid-smll"></div>
			<hr class="hr_style">

			<div class="show-base-info" @click="showinquiry">
				<i :class="[isShowinquiry?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
			</div>
		</div>
		<div v-show="isShowinquiry">
			<div class="div-btn-class">
				<div class="font_size_change">
					调查组信息
				</div>
			</div>
			<div class="inquiry-info-team">
				<div><label>事故名称：</label><input type="text" v-model="saveOrUpdate.accidentName" maxlength="100"></div>
				<div><label>事故单位：</label><span class="departmentName" :title="saveOrUpdate.departmentName">{{saveOrUpdate.departmentName || '-' }}</span></div>
				<div><label>牵头负责单位：</label><input type="text" v-model="saveOrUpdate.responsibleDepartment" maxlength="200"></div>
				<div><label>是否挂牌督办：</label>
					<el-radio-group v-model="saveOrUpdate.isHandle" disabled>
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</div>
			</div>
			<div class="inquiry-info-member">
				<label>成员单位：</label>
				<textarea rows="3" v-model="saveOrUpdate.memberUnit" maxlength="5000"></textarea>
			</div>
			<div class="add">
				<button class="btn btn-save" @click="saveinquiryinfos">
      		<i class="iconfont icon-09"></i>保存
    		</button>
			</div>
			<hr class="hr_xian">

			<div class="div-btn-class">
				<div class="font_size_change">
					调查人信息
				</div>
				<div>
					<button class="btn btn-add" @click="isInvestigationLog">
      			<i class="el-icon-plus"></i>新增
    			</button>
				</div>
			</div>
			<div class="table-wrap" style="margin-left: .14rem;">
				<table class="table-box">
					<tr>
						<th>序号</th>
						<th>姓名</th>
						<th>工作单位</th>
						<th>单位职务</th>
						<th>调查组职务</th>
						<th>办公电话</th>
						<th>手机</th>
						<th>操作</th>
					</tr>
					<tr v-for="(item,index) in sgclInspectorInfoPage">
						<td>{{index + 1}}</td>
						<td :title="item.name">{{item.name}}</td>
						<td :title="item.workUnit">{{item.workUnit}}</td>
						<td :title="item.unitDuty">{{item.unitDuty}}</td>
						<td :title="item.investigationTeamDuty">{{item.investigationTeamDuty}}</td>
						<td>{{item.workPhone}}</td>
						<td>{{item.mobilePhone}}</td>
						<td>
							<!--"EBB161"-->
							<span class="operation-span-revise" @click="investigationEdit(item)">修改</span>
							<span class="operation-span-delete" @click="investigationDelete(item.id)">删除</span>
							<!--:class="{'no-click':baseInfo.base.status == 1}"-->
						</td>
					</tr>
				</table>
				<div v-if="sgclInspectorInfoPage.length<=0" class="nodata">
					暂无数据
				</div>
			</div>
			<div style="color: #b8d7ff;margin-top: .21rem;display: flex;justify-content:flex-end;text-align: center;line-height: .28rem">
				<el-pagination v-if="sgclInspectorInfoPage.length>0" :current-page.sync="investigatPage.currentPage" :page-size="investigatPage.pageSize" layout="prev, pager, next, jumper, total" :total="investigatPage.total">
					<!--slot,
					<span @click="sgclInspectorInfoPageCurrentSure" class="sure">确定</span>-->
				</el-pagination>
			</div>
			<hr class="hr_xian">

			<div class="div-btn-class">
				<div class="font_size_change">
					调查报告属性信息
				</div>
			</div>
			<div class="inquiry-info-intem">
				<div><label>技术鉴定：</label>
					<el-radio-group v-model="sgclInvestReport.technicalEvaluation">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</div>
				<div><label>技术鉴定结束时间：</label>
					<div class="date-picker-box">
						<el-date-picker v-model="sgclInvestReport.endTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间"></el-date-picker>
					</div>
				</div>
				<div><label>申请延期：</label>
					<el-radio-group v-model="sgclInvestReport.applyPostpone">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</div>
				<div><label>申请延期时间(自然日)：</label><input type="text" v-model="sgclInvestReport.delayTime" maxlength='20'></div>
			</div>
			<div class="inquiry-info-intem" style="margin-top: .14rem">
				<div><label>报出日期：</label>
					<div class="date-picker-box">
						<el-date-picker v-model="sgclInvestReport.submitDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间"></el-date-picker>
					</div>
				</div>
				<div><label>报送单位：</label><input type="text" v-model="sgclInvestReport.submissionUnit" maxlength='200'></div>
				<div><label>调查报告名称：</label><input type="text" v-model="sgclInvestReport.investigationReportName" maxlength='200'></div>
				<div><label>提交报告请示文号：</label><input type="text" v-model="sgclInvestReport.submitReferenceNumber" maxlength='200'></div>
			</div>
			<div class="inquiry-info-intem" style="margin-top: .14rem">
				<div><label>调查报告批复(印发时间)：</label>
					<div class="date-picker-box">
						<el-date-picker v-model="sgclInvestReport.approvalTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间"></el-date-picker>
					</div>
				</div>
				<div><label>要求落实时间：</label>
					<div class="date-picker-box">
						<el-date-picker v-model="sgclInvestReport.workableTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择时间"></el-date-picker>
					</div>
				</div>
				<div><label>是否向社会公布：</label>
					<el-radio-group v-model="sgclInvestReport.isPublish">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</div>
				<div><label>公布形式：</label><input type="text" v-model="sgclInvestReport.releaseForm" maxlength='100'></div>
			</div>
			<div class="inquiry-info-explain">
				<label>说明：</label><textarea rows="3" v-model="sgclInvestReport.state" maxlength='500'> </textarea>
			</div>
			<div class="add">
				<button class="btn btn-save" @click="reportSaveOrUpdate">
      		<i class="iconfont icon-09"></i>保存
    		</button>
			</div>
			<hr class="hr_xian">

			<div class="div-btn-class">
				<div class="font_size_change">
					被处理企业及人员信息
				</div>
				<div>
					<button class="btn btn-add" @click="showdialogIscoverHandle">
      			<i class="el-icon-plus"></i>新增
    			</button>
				</div>
			</div>
			<div class="table-wrap" style="margin-left: .14rem;">
				<table class="table-box">
					<tr>
						<th>序号</th>
						<th>单位名称</th>
						<th>法定代理人</th>
						<th>姓名</th>
						<th>职务</th>
						<th>处罚金额(万元)</th>
						<th>责任落实单位</th>
						<th>落实结果</th>
						<th>实际落实时间</th>
						<th>操作</th>
					</tr>
					<tr v-for="(item,index) in sgclPersonInfoServicePage">
						<td>{{index + 1}}</td>
						<td :title="item.unitName">{{item.unitName}}</td>
						<td :title="item.statutoryAgent">{{item.statutoryAgent}}</td>
						<td :title="item.name">{{item.name}}</td>
						<td :title="item.duty">{{item.duty}}</td>
						<td>{{item.penaltyAmount}}</td>
						<td :title="item.duty">{{item.responsibleUnit}}</td>
						<td :class="{'td-already':item.workableResult == '已落实'}">{{item.workableResult}}</td>
						<td>{{item.actualImplementationTime}}</td>
						<td>
							<span class="operation-span-revise" @click="coverHandleEdit(item)">修改</span>
							<span class="operation-span-delete" @click="coverHandleDelete(item.id)">删除</span>
							<!--:class="{'no-click':baseInfo.base.status == 1}"-->
						</td>
					</tr>
				</table>
				<div v-if="sgclPersonInfoServicePage.length<=0" class="nodata">
					暂无数据
				</div>
			</div>

			<div style="color: #b8d7ff;margin-top: .21rem;display: flex;justify-content:flex-end;text-align: center;line-height: .35rem">
				<el-pagination v-if="sgclPersonInfoServicePage.length>0" :current-page.sync="iscoverHandlePage.currentPage" :page-size="iscoverHandlePage.pageSize" layout="prev, pager, next, jumper,total" :total="iscoverHandlePage.total">
					<!--slot,
					<span @click="sgclPersonInfoServicePageCurrentSure" class="sure">确定</span>-->
				</el-pagination>
			</div>
			<hr class="hr_xian">

			<div class="div-btn-class">
				<div class="font_size_change">
					被处理行政人员信息
				</div>
				<div>
					<button class="btn btn-add" @click="showdialogCoverPersonnel">
        		<i class="el-icon-plus"></i>新增
      		</button>
				</div>
			</div>
			<div class="table-wrap" style="margin-left: .14rem;">
				<table class="table-box">
					<tr>
						<th>序号</th>
						<th>部门名称</th>
						<th>级别</th>
						<th>姓名</th>
						<th>职务</th>
						<th>处罚金额(万元)</th>
						<th>责任落实单位</th>
						<th>落实结果</th>
						<th>实际落实时间</th>
						<th>操作</th>
					</tr>
					<tr v-for="(item,index) in sgclPunlishedStaffInfoServicePage">
						<td>{{index + 1}}</td>
						<td :title="item.deptName">{{item.deptName}}</td>
						<td>{{item.level}}</td>
						<td :title="item.name">{{item.name}}</td>
						<td :title="item.duty">{{item.duty}}</td>
						<td>{{item.penaltyAmount}}</td>
						<td :title="item.responsibleUnit">{{item.responsibleUnit}}</td>
						<td :class="{'td-already':item.implementationResults == '已落实'}">{{item.implementationResults}}</td>
						<td>{{item.actualImplementationTime}}</td>
						<td>
							<span class="operation-span-revise" @click="coverPersonnelEdit(item)">修改</span>
							<span class="operation-span-delete" @click="coverPersonnelDelete(item.id)">删除</span>
							<!--:class="{'no-click':baseInfo.base.status == 1}"-->
						</td>
					</tr>
				</table>
				<div v-if="sgclPunlishedStaffInfoServicePage.length<=0" class="nodata">
					暂无数据
				</div>
			</div>
			<div style="color: #b8d7ff;margin-top: .21rem;display: flex;justify-content:flex-end;text-align: center;line-height: .35rem">
				<el-pagination v-if="sgclPunlishedStaffInfoServicePage.length>0" :current-page.sync="coverPersonnelPage.currentPage" :page-size="coverPersonnelPage.pageSize" layout="prev, pager, next, jumper, total" :total="coverPersonnelPage.total">
					<!--slot,
					<span @click="sgclPunlishedStaffInfoServicePageCurrentSure" class="sure">确定</span>-->
				</el-pagination>
			</div>

			<hr class="hr_xian">
			<div class="settle-case">
				<button class="btn btn-add " @click="settle=true" :disabled="disabledStatus" :class="{'no-btn':disabledStatus}">{{baseInfo.base.status == 1 ? '已结案':'结案'}}</button>
			</div>
		</div>
	</div>
</template>
<script>
	import dialoglayout from 'components/dialoglayout/dialoglayout'
	import dialogArr from 'components/dialoglayout/dialogArr'

	export default {
		name: 'information',
		components: {
			dialoglayout,
			dialogArr,
		},
		data() {
			return {
				disabledStatus: true, //结案按钮是否能点击    当status 为0未结案   1结案   结案无法点击  切事故落实状态无法改变    当
				isAjax: true, //阻止点击新增时监听事件调用接口
				datevalue: '',
				currentPage: 1, // 伤亡人员的 当前页数
				pageSize: 10, //伤亡人员的 每页条数
				total: 0, //伤亡人员的 总条数
				casualtiesPage: {
					currentPage: 1, // 伤亡人员的 当前页数
					pageSize: 10, //伤亡人员的 每页条数
					total: 0 //伤亡人员的 总条数
				},
				investigatPage: { //调查人员分页
					currentPage: 1,
					pageSize: 10,
					total: 0
				},
				iscoverHandlePage: { //被处理企业及人员信息分页
					currentPage: 1,
					pageSize: 10,
					total: 0
				},
				coverPersonnelPage: { //被处理行政人员信息分页
					currentPage: 1,
					pageSize: 10,
					total: 0
				},
				isshowdialog: false, //伤亡人员信息弹窗
				isshowdialogTitle: "新增伤亡人员",
				isInvestigation: false, //调查人员弹窗
				isInvestigationTitle: "新增调查人员",
				iscoverHandle: false, //被处理企业及人员信息弹窗
				iscoverHandleTitle: "新增被处理企业及人员信息",
				coverPersonnel: false, // 被处理行政人员信息弹窗
				coverPersonnelTitle: "新增被处理行政人员信息",
				settle: false, //结案
				isShowbase: true,
				isShowextend: true,
				isShowcasualties: true,
				isShowinquiry: true,
				isSupervision: 'true',
				sgclInvestReport: {
					technicalEvaluation: '是',
					applyPostpone: "否",
					isPublish: "否",
				},
				baseInfo: {
					base: {
						happenTime: ''
					}
				},
				baseData: {},

				saveOrUpdate: {
					accidentName: '',
					baseId: 0,
					departmentName: '',
					id: null,
					isHandle: '否',
					memberUnit: '',
					responsibleDepartment: ''
				}, //调查组信息
				casultData: [], //伤亡人员list
				casultDataHeader: [{ //伤亡人员绑定表
					label: "姓名",
					prop: "name"
				}, {
					label: "身份证号",
					prop: "idCard"
				}, {
					label: "是否为企业人员",
					prop: "enterprisePerson"
				}, {
					label: "伤亡类型",
					prop: "casualtiesType"
				}, {
					label: "经济损失(万元)",
					prop: "economicLosses"
				}],
				sgclInspectorInfoPage: [], //调查人信息
				sgclPersonInfoServicePage: [], //被处理企业及人员信息
				sgclPunlishedStaffInfoServicePage: [], //被处理行政人员信息

				accidentId: '',
				queryId: {},
			}
		},
		watch: {
			casualtiesPage: { //伤亡人员情况分页
				handler(val, olVal) {
					if(this.isAjax) {
						//this.$debug && console.log("伤亡人员的分页",val)
						this.casultDataAddAjax() //调用接口
					}
				},
				deep: true
			},
			investigatPage: { //调查人员分页
				handler(val, olVal) {
					if(this.isAjax) {
						//this.$debug && console.log('调查人员分页',val)
						this.sgclInspectorInfoList() //调用接口
					}
				},
				deep: true
			},
			iscoverHandlePage: { //被处理企业及人员信息分页
				handler(val, olVal) {
					if(this.isAjax) {
						this.iscoverHandleList() //调用接口
					}
				},
				deep: true
			},
			coverPersonnelPage: { //被处理行政人员信息分页
				handler(val, olVal) {
					if(this.isAjax) {
						this.coverPersonnelList() //调用接口
					}
				},
				deep: true
			},
		},
		methods: {
			showdialog() { //伤亡人员  写成函数  清空表单
				this.isshowdialog = true
				this.isshowdialogTitle = "新增伤亡人员"
			},
			isInvestigationLog() {
				this.isInvestigation = true
				this.isInvestigationTitle = "新增调查人员"
			},

			//被处理行政人员的确定默认有选中时间
			showdialogCoverPersonnel() {
				this.coverPersonnel = true
				this.coverPersonnelTitle = "新增被处理行政人员信息",
					this.$nextTick(() => { //渲染完成后才加载数据
						this.$refs.addData3.getTime()
					})
			},
			//被处理企业的确定默认有选中时间
			showdialogIscoverHandle() {
				//iscoverHandleTitle
				this.iscoverHandle = true
				this.iscoverHandleTitle = "新增被处理企业及人员信息"
				this.$nextTick(() => { //渲染完成后才加载数据
					this.$refs.addData2.getTime()
				})
			},
			//伤亡人员分页确定
			casultDataCurrentSure() {
				//直接调用接口
				this.casultDataAddAjax()
				//this.$debug && console.log(this.casualtiesPage.currentPage);
			},
			//调查人信息分页确定
			sgclInspectorInfoPageCurrentSure() {
				this.sgclInspectorInfoList()
			},
			//被处理企业及人员信息
			sgclPersonInfoServicePageCurrentSure() {
				this.iscoverHandleList() //调用接口
			},
			//被处理行政人员信息
			sgclPunlishedStaffInfoServicePageCurrentSure() {
				this.coverPersonnelList() //调用接口
			},

			//伤亡人员  确定按钮
			backvalue() { //确定有两个属性一个新增一个修改
				var dataAdd = this.$refs.addData.form
				dataAdd.baseId = this.queryId.baseId

				this.$refs.addData.$refs.casualties.validate((valid) => {
					//this.$debug && console.log(valid)
					if(valid) {

						if(dataAdd.id != '' && dataAdd.id != null) { //修改
							this.$xhr.sgclCasualtiesUpdate(dataAdd).then(data => {
								if(data.code == 0) {
									//this.$debug && console.log('修改', data)
									this.casultDataAddAjax()
									this.$refs.addData.$refs.casualties.resetFields() //重置表单
									this.isshowdialog = false //关闭弹窗
								} else {
									this.$message(data.message)
								}

							}).catch(err => {
								this.$debug && console.log(err)
							})
						} else {
							this.$xhr.casualtiesSave(dataAdd).then(data => {
								//this.$debug && console.log('新增', data)
								if(data.code == 0) {
									this.$message('新增成功')
									this.$refs.addData.$refs.casualties.resetFields() //重置表单
									this.isAjax = false //用这个来阻止监听就无需判断是不是第一页了
									this.casualtiesPage.currentPage = 1 // 伤亡人员的 当前页数
									this.isshowdialog = false //关闭弹窗
									this.casultDataAddAjax()
									//选择第一页
								} else {
									this.$message(data.message)
								}

							}).catch(err => {
								this.$debug && console.log(err)
							})
						}

					} else {

						return false;
					}
				});
			},
			//伤亡人员  取消按钮
			backvalueNo() {
				this.$refs.addData.$refs.casualties.resetFields() //
				this.isshowdialog = false

			},
			//伤亡人员  删除
			sgclCasualtiesDeleteAjax(id) {

				//if(this.baseInfo.base.status != 1) { //判断是已结案的还是未结案的 已结案的无法删除 只能新增  又不要了
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					lockScroll: false,
				}).then(() => {
					//调接口
					this.$xhr.sgclCasualtiesDelete({
						id: id
					}).then(data => {
						if(data.code == 0) {
							this.$message("删除成功")
							this.isAjax = false
							this.casultDataAddAjax() //伤亡人员list
						}
						//this.$debug && console.log(data)
					}).catch(err => {
						this.$debug && console.log(err)
					})
				}).catch(() => {
					this.$message.info('取消删除!');
				});
				//}
			},
			//伤亡人员  修改
			sgclCasualtiesUpdate(item) {
				//弹窗
				//this.$debug && console.log(item)
				this.isshowdialog = true
				this.isshowdialogTitle = "伤亡人员"
				//var update = this.$refs.addData.form
				this.$nextTick(() => { //渲染完成后才加载数据
					let form = this.$refs.addData.form
					form.casualtiesType = item.casualtiesType
					form.economicLosses = parseFloat(item.economicLosses)
					form.enterprisePerson = item.enterprisePerson
					form.idCard = item.idCard
					form.name = item.name
					form.id = item.id
				})
			},
			//伤亡人员的list
			casultDataAddAjax() {
				this.$xhr.sgclCasualtiesList({
					pageNum: this.casualtiesPage.currentPage,
					pageSize: this.casualtiesPage.pageSize,
					baseId: this.queryId.baseId
				}).then(data => {
					//this.$debug && console.log(data)
					if(data.code == 0) {
						//this.$debug && console.log("伤亡list", data)
						if(data.content.list == null) {
							this.casultData = []
						} else {
							this.casultData = data.content.list
						}
						this.casualtiesPage.total = data.content.totalCount
						setTimeout(() => {
							this.isAjax = true //变回能执行的
						})
					}

				}).catch(err => {
					this.$debug && console.log(err)
				})
			},
			//事故基本信息折叠
			showbaseinfo() {
				this.isShowbase = !this.isShowbase
			},
			//事故扩展信息折叠
			showExtendinfo() {
				this.isShowextend = !this.isShowextend
			},
			//伤亡人员情况折叠
			showCasuulties() {
				this.isShowcasualties = !this.isShowcasualties
			},
			//调查处理信息折叠
			showinquiry() {
				this.isShowinquiry = !this.isShowinquiry
			},
			//保存调查组信息
			saveinquiryinfos() {
				this.saveOrUpdate.baseId = this.queryId.baseId
				this.$xhr.saveOrUpdate(this.saveOrUpdate).then(data => {
					//this.$debug && console.log(data)
					if(data.code == 0) {
						this.$message("保存成功")
					}
				}).catch(err => {
					this.$debug && console.log(err)
				})
				//alert('保存调查组信息')
			},
			investigationNo() {
				//调查人员取消
				this.$refs.addData1.$refs.investigation.resetFields() //重置表单
				this.isInvestigation = false

			},
			//调查人员修改回显
			investigationEdit(item) {
				//this.$debug && console.log(item);
				this.isInvestigation = true
				this.isInvestigationTitle = "调查人员"
				this.$nextTick(() => {
					let formdata = this.$refs.addData1.formInvestigation
					formdata.id = item.id
					formdata.name = item.name
					formdata.workUnit = item.workUnit
					formdata.unitDuty = item.unitDuty
					formdata.investigationTeamDuty = item.investigationTeamDuty
					formdata.workPhone = item.workPhone
					formdata.mobilePhone = parseFloat(item.mobilePhone)
				})

			},
			//调查人员删除
			investigationDelete(id) {
				//if(this.baseInfo.base.status != 1) { //暂时又不要了
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					lockScroll: false,
				}).then(() => {
					//调接口
					this.$xhr.deleteSgclInspectorInfo({
						id: id
					}).then(res => {
						if(res.code == 0) {
							this.$message('删除成功')
							this.isAjax = false
							this.sgclInspectorInfoList()
						}
					}).catch(err => {
						this.$debug && console.log(err)
					})
				}).catch(() => {
					this.$message.info('取消删除!');
				});

				//}
			},

			//调查人员新增和修改
			investigationAdd() {
				var dataAdd = this.$refs.addData1.formInvestigation
				dataAdd.baseId = this.queryId.baseId
				this.$refs.addData1.$refs.investigation.validate((valid) => {
					//this.$debug && console.log(valid)
					if(valid) {
						if(dataAdd.id != '' && dataAdd.id != null) { //修改
							this.$xhr.updateSgclInspectorInfo(dataAdd).then(res => {
								if(res.code == 0) {
									this.$message('修改成功')
									this.sgclInspectorInfoList()
									this.$refs.addData1.$refs.investigation.resetFields() //重置表单
									this.isInvestigation = false //关闭弹窗
								} else {
									this.$message(res.message)
								}
							}).catch(err => {
								this.$debug && console.log(err)
							})
						} else {
							//新增
							this.$xhr.saveSgclInspectorInfo(dataAdd).then(res => {
								//this.$debug && console.log('新增', res)
								if(res.code == 0) {
									this.$message('新增成功')
									this.$refs.addData1.$refs.investigation.resetFields() //重置表单
									this.isAjax = false //四个选项用的都是同一个值会不会冲突？
									this.investigatPage.currentPage = 1 //不是第一页赋值第一页调接口
									this.isInvestigation = false //关闭弹窗
									this.sgclInspectorInfoList() //调用接口

								} else {
									this.$message(res.message)
								}
							}).catch(err => {
								this.$debug && console.log(err)
							})
						}
					} else {
						return false;
					}
				});
			},
			//调查人员列表 操作后更新列表
			sgclInspectorInfoList() {
				this.$xhr.sgclInspectorInfoList({
					pageNum: this.investigatPage.currentPage,
					pageSize: this.investigatPage.pageSize,
					baseId: this.queryId.baseId
				}).then(res => {
					//this.$debug && console.log(res)
					if(res.content.list == null) {
						this.sgclInspectorInfoPage = []
					} else {
						this.sgclInspectorInfoPage = res.content.list
					}
					this.investigatPage.total = res.content.totalCount
					setTimeout(() => {
						this.isAjax = true
					})
				}).catch(err => {
					this.$debug && console.log(err)
				})
			},
			//调查报告属性信息 的保存
			reportSaveOrUpdate() {
				this.sgclInvestReport.baseId = this.queryId.baseId
				this.$xhr.reportSaveOrUpdate(this.sgclInvestReport).then(res => {
					if(res.code == 0) {
						this.$message('保存成功')
					}
				}).catch(err => {
					this.$debug && console.log(err)
				})
			},

			//被处理的企业及人员
			iscoverHandleAdd() { //新增
				var dataAdd = this.$refs.addData2.forCoverHandle
				dataAdd.baseId = this.queryId.baseId
				this.$refs.addData2.$refs.coverHandle.validate((valid) => {
					//this.$debug && console.log(valid)
					if(valid) {
						if(dataAdd.id != '' && dataAdd.id != null) { //修改
							this.$xhr.sgclPunlishedEntAndPersonInfoUpdate(dataAdd).then(res => {
								//this.$debug && console.log("被处理的企业及人员修改", res)
								if(res.code == 0) {
									this.$message('修改成功')
									this.iscoverHandleList()
									this.$refs.addData2.$refs.coverHandle.resetFields() //重置表单
									this.iscoverHandle = false //点击后关闭弹窗
								} else {
									this.$message(res.message)
								}
							}).catch(err => {
								this.$debug && console.log(err)
							})
						} else {
							//新增
							this.$xhr.sgclPunlishedEntAndPersonInfoSave(dataAdd).then(data => {
								//this.$debug && console.log("被处理的企业及人员", data)
								if(data.code == 0) {
									this.$message('新增成功')
									this.$refs.addData2.$refs.coverHandle.resetFields() //重置表单	
									if(this.baseInfo.base.status == 1) {
										this.$refs.addData2.forCoverHandle.workableResult = "已落实"
									}
									this.isAjax = false
									this.iscoverHandle = false //点击后关闭弹窗
									//调用接口	
									this.iscoverHandlePage.currentPage = 1
									this.iscoverHandleList() //获取数据	
								}
							}).catch(err => {
								this.$debug && console.log(err)
							})
						}
					} else {
						return false;
					}
				});
			},
			iscoverHandleNo() { //取消
				this.$refs.addData2.$refs.coverHandle.resetFields() //重置表单
				if(this.baseInfo.base.status == 1) {
					this.$refs.addData2.forCoverHandle.workableResult = "已落实"
				}
				this.iscoverHandle = false
			},
			//修改
			coverHandleEdit(item) {
				//this.$debug && console.log(item)
				this.iscoverHandle = true
				this.iscoverHandleTitle = "被处理企业及人员信息"
				this.$nextTick(() => {
					let forCoverHandleData = this.$refs.addData2.forCoverHandle
					forCoverHandleData.id = item.id
					forCoverHandleData.duty = item.duty
					forCoverHandleData.name = item.name
					forCoverHandleData.penaltyAmount = parseFloat(item.penaltyAmount)
					forCoverHandleData.responsibleUnit = item.responsibleUnit
					forCoverHandleData.statutoryAgent = item.statutoryAgent
					forCoverHandleData.unitName = item.unitName
					forCoverHandleData.workableResult = item.workableResult
					forCoverHandleData.actualImplementationTime = item.actualImplementationTime
				})
			},
			//删除
			coverHandleDelete(id) {
				//如果是已结案的不能删除
				//if(this.baseInfo.base.status != 1) { //暂时不要了
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					lockScroll: false,
				}).then(() => {
					//调接口
					this.$xhr.sgclPunlishedEntAndPersonInfoDelete({
						id: id
					}).then(data => {
						//this.$debug && console.log(data)
						if(data.code == 0) {
							this.$message('删除成功')
							this.iscoverHandleList()
							this.isAjax = false
						}
					}).catch(err => {
						this.$debug && console.log(err)
					})
				}).catch(() => {
					this.$message.info('取消删除!');
				});

				//}

			},
			//list
			iscoverHandleList() { //分页
				this.$xhr.personInfoList({
					pageNum: this.iscoverHandlePage.currentPage,
					pageSize: this.iscoverHandlePage.pageSize,
					baseId: this.queryId.baseId
				}).then(data => {
					//this.$debug && console.log("被处理企业分页", data)
					if(data.content.list == null) {
						this.sgclPersonInfoServicePage = []
					} else {
						this.sgclPersonInfoServicePage = data.content.list
					}
					this.iscoverHandlePage.total = data.content.totalCount
					setTimeout(() => {
						this.isAjax = true
					})
				}).catch(err => {
					this.$debug && console.log(err)
				})
			},

			//被处理行政人员信息
			//list
			coverPersonnelList() {
				this.$xhr.sgclStaffInfoList({
					pageNum: this.coverPersonnelPage.currentPage,
					pageSize: this.coverPersonnelPage.pageSize,
					baseId: this.queryId.baseId
				}).then(data => {
					//this.$debug && console.log("被处理行政人员信息list", data)
					if(data.content.list == null) {
						this.sgclPunlishedStaffInfoServicePage = []
					} else {
						this.sgclPunlishedStaffInfoServicePage = data.content.list
					}
					this.coverPersonnelPage.total = data.content.totalCount
					setTimeout(() => {
						this.isAjax = true
					})
				}).catch(err => {
					this.$debug && console.log(err)
				})
			},
			//删除
			coverPersonnelDelete(id) {
				//if(this.baseInfo.base.status != 1) { //暂时不要了
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					lockScroll: false,
				}).then(() => {
					//调接口
					this.$xhr.sgclStaffInfoDelete({
						id: id
					}).then(data => {
						if(data.code == 0) {
							this.$message('删除成功')
							this.coverPersonnelList()
							this.isAjax = false
						}
					}).catch(err => {
						this.$debug && console.log(err)
					})
				}).catch(() => {
					this.$message.info('取消删除!');
				});
				//}
			},
			//修改
			coverPersonnelEdit(item) {
				//this.$debug && console.log(item)
				this.coverPersonnel = true
				this.coverPersonnelTitle = "被处理行政人员信息",
					this.$nextTick(() => {
						let forCoverPersonnelData = this.$refs.addData3.forCoverPersonnel
						forCoverPersonnelData.id = item.id
						forCoverPersonnelData.deptName = item.deptName
						forCoverPersonnelData.level = item.level
						forCoverPersonnelData.name = item.name
						forCoverPersonnelData.duty = item.duty
						forCoverPersonnelData.responsibleUnit = item.responsibleUnit
						forCoverPersonnelData.penaltyAmount = parseFloat(item.penaltyAmount)
						forCoverPersonnelData.actualImplementationTime = item.actualImplementationTime
						forCoverPersonnelData.implementationResults = item.implementationResults
					})
			},
			//新增
			coverPersonnelAdd() {
				var dataAdd = this.$refs.addData3.forCoverPersonnel
				dataAdd.baseId = this.queryId.baseId
				this.$refs.addData3.$refs.coverPersonnel.validate((valid) => {
					//this.$debug && console.log(valid)
					if(valid) {

						if(dataAdd.id != '' && dataAdd.id != null) { //修改
							this.$xhr.sgclStaffInfoUpdate(dataAdd).then(res => {
								//this.$debug && console.log("被处理的行政人员修改", res)
								if(res.code == 0) {
									this.$message('修改成功')
									this.coverPersonnelList()
									this.$refs.addData3.$refs.coverPersonnel.resetFields() //重置表单
									this.coverPersonnel = false //点击后关闭弹窗
								} else {
									this.$message(res.message)
								}
							}).catch(err => {
								this.$debug && console.log(err)
							})
						} else {
							//新增
							//判断是否为空
							this.$xhr.sgclStaffInfoInsert(dataAdd).then(data => {
								//this.$debug && console.log("被处理的行政人员", data)
								if(data.code == 0) {
									this.$message('新增成功')
									this.$refs.addData3.$refs.coverPersonnel.resetFields() //重置表单
									if(this.baseInfo.base.status == 1) {
										this.$refs.addData3.forCoverPersonnel.implementationResults = "已落实"
									}
									this.isAjax = false
									this.coverPersonnel = false //点击后关闭弹窗
									//调用接口   
									this.coverPersonnelPage.currentPage = 1
									this.coverPersonnelList() //获取数据
								}
							}).catch(err => {
								this.$debug && console.log(err)
							})
						}
					} else {
						return false;
					}
				});
			},
			//取消
			coverPersonnelNo() {
				this.$refs.addData3.$refs.coverPersonnel.resetFields() //重置表单
				if(this.baseInfo.base.status == 1) {
					this.$refs.addData3.forCoverPersonnel.implementationResults = "已落实"
				}
				this.coverPersonnel = false
			},
			//结案  确定
			settleAdd() {
				this.$refs.addData4.$refs.forSettle.validate((valid) => {
					//this.$debug && console.log(valid)
					if(valid) {
						this.$xhr.accidentInfoListUpdateTime({
							closingTime: this.$refs.addData4.forSettle.closingTime,
							baseId: this.queryId.baseId
						}).then(data => {
							//this.$debug && console.log("结案", data)
							if(data.code == 0) {
								this.settle = false //关闭按钮
								this.$refs.addData4.$refs.forSettle.resetFields() //重置表单
								this.$message('已结案')
								this.accidentListDetail() //调用接口
							} else if(data.code == 1) {
								this.$message(data.message)
							}
						}).catch(err => {
							this.$debug && console.log(err)
						})
					} else {
						return false;
					}
				});
			},
			//取消
			settleNo() {
				this.settle = false
				this.$refs.addData4.$refs.forSettle.resetFields() //重置表单
			},
			accidentListDetail() {
				this.$xhr.accidentListDetail(this.queryId).then(res => {
					if(res) {
						//this.$debug && console.log(res)
						this.baseInfo = res.sgclAccidentInfo[0]
						//this.$debug && console.log("baseInfo ", this.baseInfo)
						let grade = this.baseInfo.grade
						switch(grade) {
							case 1:
								this.baseInfo.grade = '一般事故'
								break
							case 2:
								this.baseInfo.grade = '较大事故'
								break
							case 3:
								this.baseInfo.grade = '重大事故'
								break
							case 4:
								this.baseInfo.grade = '特别重大事故'
								break
							default:
								this.$debug && console.log('异常')
						}

						this.saveOrUpdate.departmentName = this.baseInfo.departmentName
						//结案
						if(this.baseInfo.base.status == 1) {
							this.disabledStatus = true //一结案  无法点击
							this.$store.commit('SET_STATUS', this.baseInfo.base.status)
						} else {
							this.disabledStatus = false
							this.$store.commit('SET_STATUS', this.baseInfo.base.status)
						}

						//伤亡人员列表
						if(res.sgclCasualtiesPage.list == null) {
							this.casultData = []
						} else {
							this.casultData = res.sgclCasualtiesPage.list
						}
						//死亡人员的 总条数
						this.casualtiesPage.total = res.sgclCasualtiesPage.totalCount

						//调查组信息
						if(res.sgclInvestgationTeamInfo.length > 0) {
							this.saveOrUpdate = res.sgclInvestgationTeamInfo[0]
						}
						//调查人信息 sgclInspectorInfoPage
						if(res.sgclInspectorInfoPage.list == null) {
							this.sgclInspectorInfoPage = []
						} else {
							this.sgclInspectorInfoPage = res.sgclInspectorInfoPage.list
						}
						this.investigatPage.total = res.sgclInspectorInfoPage.totalCount

						//调查报告属性
						if(res.sgclInvestReport.length > 0) {
							this.sgclInvestReport = res.sgclInvestReport[0]
						}

						//被处理企业及人员信息 sgclPersonInfoServicePage
						if(res.sgclPersonInfoServicePage.list == null) {
							this.sgclPersonInfoServicePage = []
						} else {
							this.sgclPersonInfoServicePage = res.sgclPersonInfoServicePage.list
						}
						this.iscoverHandlePage.total = res.sgclPersonInfoServicePage.totalCount

						//被处理行政人员信息
						if(res.sgclPunlishedStaffInfoServicePage.list == null) {
							this.sgclPunlishedStaffInfoServicePage = []
						} else {
							this.sgclPunlishedStaffInfoServicePage = res.sgclPunlishedStaffInfoServicePage.list
						}
						this.coverPersonnelPage.total = res.sgclPersonInfoServicePage.totalCount

					}
				})
			}

		},
		created() {
			let param = this.$route.params
			this.queryId = {
				baseId: param.baseId,
				infoId: param.infoId
			}
			//整个的数据
			this.accidentListDetail()
		},
		mounted() {
			//this.$debug && console.log(this)
		},
		beforeDestroy() {
			this.$root.dialogAccidentDynamic = false
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.cont {
		margin: 0;
		padding: 0;
		color: $cl-txt;
		.base-info-tilte {
			white-space: nowrap;
			padding: 4px 15px;
		}
		input {
			width: auto;
			padding: 0 .07rem;
			color: $cl-txt;
			background-color: rgba(11, 187, 255, 0.2);
			border: 1px solid #0D5B8E;
		}
		label {
			float: left;
			color: #B9D7FC;
			text-align: center;
			/*height: 0.24rem;
			line-height: 0.24rem;
			font-size: .14rem;*/
			height: 32px;
			line-height: 32px;
			font-size: 16px;
			width: auto;
			white-space: nowrap;
			overflow: hidden;
		}
		textarea {
			width: 100%;
			padding-left: 0.03rem;
			color: $cl-txt;
			background-color: rgba(11, 187, 255, 0.2);
			border: 1px solid #0D5B8E;
			font-size: 16px;
			font-family: "微软雅黑";
		}
		
		.line{
			position: relative;
			width: 100%;
			height: 0.44rem;
			border-top: 1px solid rgba(0,131,255,.8);
    		margin-top: .62rem;
			.line-title{
				position:absolute;
				width:2rem;
				height: 0.44rem;
				left:50%;
				top:-0.22rem;
				transform: translate(-50%,0);
				line-height: 0.44rem;
				text-align: center;
				color:#f1f7ff;
				font-size: .2rem;
				padding: 0 15px;
				font-weight: 900;
				border-radius: 0 10px 0 10px;
				background: #024aa6;
			}
			.line-title::before {
				content: '';
				width: 14px;
				height: 100%;
				display: block;
				position: absolute;
				top: 0;
				right: -2px;
				background-image: url('../../../assets/images/title-r.png');
				background-size: 100% 100%;
			}
			.line-title::after {
				content: '';
				width: 14px;
				height: 100%;
				display: block;
				position: absolute;
				bottom: 0;
				left: -2px;
				background-image: url('../../../assets/images/title-l.png');
				background-size: 100% 100%;
			}
			.line-line{
				position:absolute;
				top:-2px;
				height: 3px;
				width: 3rem;
				background-color:rgba(0,222,255,1)
			}
			.line-line:nth-child(1){
				left:2rem;
			}
			.line-line:nth-child(2){
				right:2rem;
			}
		}
		
		.span-info {
			/*width: calc(100% - 7.6rem);*/
			flex: 1;
			height: 0.21rem;
			line-height: 0.21rem;
			padding: .014rem .042rem;
			background-color: rgba(11, 187, 255, 0.2);
			border: 1px solid #0D5B8E;
			color: $cl-txt;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: .14rem;
		}
		.base-info-content {
			/*display: flex;
			flex-wrap: wrap;
			justify-content: space-between;*/
			/*新增*/
			.base-info-one {
				/*height: 0.24rem;*/
				margin-top: 0.14rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.bio-one {
					width: 16%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex: 1;
					&.bio-width {
						width: 32%;
						flex: 2;
					}
					>label {
						width: 1.2rem;
						text-align: right;
					}
					>span {
						flex: 1;
						/*height: 0.21rem;
						line-height: 0.21rem;
						font-size: .14rem;*/
						height: 30px;
						line-height: 30px;
						font-size: 16px;
						padding: .014rem .042rem;
						/*background-color: rgba(11, 187, 255, 0.2);
						border: 1px solid #0D5B8E;*/
						border: 1px solid transparent;
						color: $cl-txt;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.bic-vertical {
				display: flex;
				flex-direction: column;
				width: 15%;
				>div {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					margin-top: 0.21rem;
					>label {
						width: 1.1rem;
						text-align: right;
					}
					>span {
						flex: 1;
						height: 0.21rem;
						line-height: 0.21rem;
						padding: .014rem .042rem;
						background-color: rgba(11, 187, 255, 0.2);
						border: 1px solid #0D5B8E;
						color: $cl-txt;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: .14rem;
					}
				}
			}
		}
		.font_size_change {
			/*font-size: .14rem;*/
			font-size: 16px;
		}
		.bic-accident {
			display: flex;
			justify-content: flex-end;
			margin-top: 0.21rem;
			width: 100%;
			color: #B9D7FC;
			>label {
				width: 1.3rem;
				text-align: right;
			}
			>textarea {
				border-color:transparent;
				background-color:transparent ;
				resize: none;
			}
		}
		.extend-info-content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			/*width: 100%;*/
			div {
				display: flex;
				margin-top: 0.21rem;
				width: 20%;
			}
			div label {
				width: 1.3rem;
				text-align: right;
			}
			div span {
				flex: 1;
				/*height: 0.21rem;
				line-height: 0.21rem;*/
				height: 28px;
				line-height: 28px;
				padding: .014rem .042rem;
				/*background-color: rgba(11, 187, 255, 0.2);
				border: 1px solid #0D5B8E;*/
				border:1px solid transparent;
				color: $cl-txt;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: .14rem;
			}
		}
		.departmentName {
			display: block;
			width: 1.75rem;
			/*height: 0.21rem;
			line-height: 0.21rem;*/
			height: 30px;
			line-height: 30px;
			background-color: rgba(11, 187, 255, 0.2);
			border: 1px solid #0D5B8E;
			color: $cl-txt;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: .14rem;
		}
		.dialog-casualties {
			display: flex;
			flex-direction: column;
			color: #fff;
			.dialog-casualties-item {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				margin-top: .14rem;
				input {
					background-color: rgba(11, 187, 255, 0.2);
					border: 1px solid #00a2ff;
				}
			}
		}
		.div-btn-class {
			margin: 0.21rem 0;
			display: flex;
			justify-content: space-between;
			.btn-add {
				cursor: pointer;
				margin-right: .14rem;
				/*padding: 0.0308rem 0.224rem;*/
				padding: 4.5px 22px;
				font-size: .16rem;
				i {
					font-weight: bold;
					margin-right: 0.06rem;
				}
			}
			.btn-save {
				cursor: pointer;
				/*padding: 0.0308rem 0.224rem;*/
				padding: 4.5px 22px;
				font-size: .16rem;
				i {
					font-weight: bold;
					margin-right: 0.06rem;
				}
			}
		}
		.inquiry-info-intem {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-left: .14rem;
			>div {
				display: flex;
				width: 25%;
				>label {
					width: 1.9rem;
					text-align: right;
				}
				>span {
					flex: 1;
				}
				>input {
					flex: 1;
					font-size: .14rem;
				}
			}
		}
		.inquiry-info-explain {
			display: flex;
			justify-content: flex-end;
			margin: .14rem 0 0 .14rem;
			>label {
				width: 1.9rem;
				text-align: right;
			}
			>textarea {
				flex: 1;
			}
		}
		.inquiry-info-team {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-left: .14rem;
			>div {
				display: flex;
				width: 25%;
				>label {
					width: 1.2rem;
					text-align: right;
				}
				>span {
					flex: 1;
				}
				>input {
					flex: 1;
					font-size: .14rem;
				}
			}
		}
		.inquiry-info-member {
			display: flex;
			justify-content: flex-end;
			margin: .14rem 0 0 .14rem;
			>label {
				width: 1.2rem;
				text-align: right;
			}
			>textarea {
				flex: 1;
			}
		}
		.add {
			display: flex;
			justify-content: flex-end;
			margin-top: 0.21rem;
			.btn-save {
				cursor: pointer;
				/*padding: .0308rem 0.224rem;*/
				padding: 4.5px 22px;
				font-size: .16rem;
				margin-right: .14rem;
				i {
					font-weight: bold;
					margin-right: 0.06rem;
				}
			}
		}
		.settle-case {
			display: flex;
			justify-content: center;
			>button {
				width: 1rem;
				height: .32rem;
				border-radius: .20rem;
			}
		}
		.table-box {
			border: 1px solid #205eb6;
		}
		button.no-btn {
			cursor: not-allowed;
			background: #999;
			border-color: #999;
		}
		.no-click {
			cursor: not-allowed;
			color: #999!important;
		}
		.operation-span-revise {
			color: #FFF;
			margin-right: .20rem;
			cursor: pointer;
		}
		.operation-span-delete {
			color: #ff8c8c;
			cursor: pointer;
		}
		.td-already {
			color: #4cbf86;
		}
		.nodata {
			border: 1px solid #205eb6;
			border-top: none;
			text-align: center;
			height: .5rem;
			line-height: .5rem;
			color: #bcdaff;
		}
		.hr_style {
			border: none;
			border-top: 1px solid #0C6CF2;
			width: 100%;
			/*margin: 0.252rem 0 0 .14rem;*/
			margin: 0.3rem 0 0 .14rem
		}
		.hr_xian {
			border: none;
			border-top: 1px solid #0C6CF2;
			width: 100%;
			margin: 0.28rem 0
		}
	}
	
	@media screen and (max-width: 1366px) {
		.cont {
			label {
				height: 24px;
				line-height: 24px;
				font-size: 12px;
			}
			.base-info-tilte {
				padding: 3px 15px;
			}
			.base-info-content {
				.base-info-one {
					.bio-one {
						>span {
							height: 20px;
							line-height: 20px;
							font-size: 12px;
						}
					}
				}
			}
			textarea {
				font-size: 12px;
			}
			.extend-info-content {
				div span {
					height: 20px;
					line-height: 20px;
				}
			}
			.font_size_change{
				font-size: 12px;
			}
			.div-btn-class{
				.btn-add{
					padding: 3px 18px;
				}
			} 
			.departmentName {
				height: 20px;
				line-height: 20px;
				font-size:12px;
			}
			.add {
				.btn-save {
					padding: 3px 18px;
					font-size: 12px;
				}
			}
		}
	}
</style>