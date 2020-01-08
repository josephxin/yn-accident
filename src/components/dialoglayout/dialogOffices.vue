<template>
	<div class="offices">
		<div class="offices_header">
			<span>当前选中的科室:</span>
			<span>{{dialogArr[0].base.cityAreaName}}</span>
			<span>-</span>
			<span>{{dialogArr[0].base.districtAreaName}}</span>
		</div>
		
		<div class="offices_body">
			<div class="offices_body_choice">
				<h4>市州级</h4>
				<ul>
					<li :title="item.organizationName.length > 23 ?item.organizationName:'' "  @click="levelChange(item,i,'cityStateLevel','districtAndCountyLevel','departmentLevel')" v-for="(item,i) in cityStateLevel" :class="{'active': i == positionIndex.cityStateLevelIndex}">{{item.organizationName}}</li>
				</ul>
			</div>
			<div class="offices_body_position offices_body_left">
				<i class="iconfont icon-shuangjiantou"></i>
			</div>
			<div class="offices_body_choice">
				<h4>区县级</h4>
				<ul>
					<li :title="item.organizationName.length > 23 ?item.organizationName:'' " @click="levelChange(item,i,'districtAndCountyLevel','departmentLevel')" v-for="(item,i) in districtAndCountyLevel" :class="{'active': i == positionIndex.districtAndCountyLevelIndex}">{{item.organizationName}}</li>
				</ul>
			</div>
			<div class="offices_body_position offices_body_right">
				<i class="iconfont icon-shuangjiantou"></i>
			</div>
			<div class="offices_body_choice">
				<h4>科室</h4>
				<ul>
					<li :title="item.organizationName.length > 23 ?item.organizationName:'' " @click="levelChange(item,i,'departmentLevel')" v-for="(item,i) in departmentLevel" :class="{'active': i == positionIndex.departmentLevelIndex}">{{item.organizationName}}</li>
				</ul>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	export default {
		name: '',
		components: {
			
		},
		props:{
			dialogArr:{
				type:Array,
				default: []
			}
		},
		data() {
			return {
				cityStateLevel:[],//市州级
				districtAndCountyLevel:[],//区县级
				departmentLevel:[],//科室
				positionIndex:{
					cityStateLevelIndex:-1,//市州级选中
					districtAndCountyLevelIndex:-1,//区县级选中
					departmentLevelIndex:-1,//科室选中
				},
				
				positionID:{
					cityStateLevelID:'',//市州级选中ID
					districtAndCountyLevelID:"",//区县级选中ID
					departmentLevelID:"",//科室选中ID
				},//各个级别的id
				positionName:{
					cityStateLevelName:'',//市州级选中的名字
					districtAndCountyLevelName:"",//区县级选中的名字
					departmentLevelName:"",//科室选中的名字
				},//各个级别选中的名字
				token:'',
				user:{}
				
			}

		},

		methods: {
			levelChange(item,i,own,second,third){
				/*参数解释
				 *item 当前的数据
				 * i 下标
				 * own 自身的值
				 * second 子级  区县级
				 * third  孙子级   科室级
				 */
				//console.log(item)
				this.positionIndex[own+'Index'] = i //下标
				this.positionID[own+"ID"] = item.organizationId //id
				this.positionName[own+"Name"] = item.organizationName //名字
				
				if(second){
					this.positionID[second+"ID"] = '' //区县级选中
					this.positionName[second+"Name"] = '' //名字
					this.positionIndex[second+'Index'] = -1 //下标不选中
				}
				if(third){
					this.positionID[third+"ID"] = '' //区县级选中
					this.positionName[third+"Name"] = '' //名字
					this.positionIndex[third+'Index'] = -1 //下标不选中
					this[third] = []  //孙子级没有数据
				}
				
				//调用接口
				//区县级要有数据
				if(own != 'departmentLevel'){
					if(this.token){
						this.ajaxData(second,item.organizationId)
					}

				}

			},
			//调用数据
			ajaxData(son,id){
				this.$xhr.organizationList({
					token:this.token,
					organizationParentId:id
				}).then((res)=>{
					if(res.code== 0){
						if(res.content){
							this[son] = res.content
						}
					}else if(res.code== 1){
						this.$message('请重新登录')
					} else{
						this.$message(res.message + '请刷新页面')
					}
				})
			}
			
/*			cityState(item,i){//市州级
				this.positionIndex.cityStateLevelIndex = i
				this.positionID.cityStateLevelID = item.id //id
				this.positionName.cityStateLevelName = item.name  //名字
				//子级名字清空  id清空  数组重新获取清空清空科室级数组
				this.positionID.districtAndCountyLevelID="",//区县级选中ID
				this.positionID.departmentLevelID="",//科室选中ID
				this.positionName.districtAndCountyLevelName="",//区县级选中的名字
				this.positionName.departmentLevelName="",//科室选中的名字
				this.departmentLevel = [] //科室级数组
				//
				
				//this.$debug && console.log("市州级",item)
				//调接口
				//this.districtAndCountyLevel = []
			},
			districtAndCounty(item,i){//区县级
				this.positionIndex.districtAndCountyLevelIndex = i
				this.positionID.districtAndCountyLevelID = item.id
				this.positionName.districtAndCountyLevelName = item.name  //名字
				this.$debug && console.log("区县级",item)
				//调接口
				this.departmentLevel=[]
			},
			department(item,i){//科室
				this.positionIndex.departmentLevelIndex = i
				this.positionID.departmentLevelID = item.id
				this.positionName.departmentLevelName = item.name  //名字
				this.$debug && console.log("科室",item)
			},*/
			
		},
		mounted() {
			this.user = JSON.parse(sessionStorage.getItem('loginData'))
			this.token = localStorage.getItem("token")
			if(this.token){
				//调 
				this.ajaxData('cityStateLevel','')
			}else{
				this.cityStateLevel = [{
					organizationId: "1530500000000",
					organizationName: "保山市安全生产监督管理局"
				},{
					organizationId: "1530500000000",
					organizationName: "楚雄彝族自治州安全生产监督管理局"
				},{
					organizationId: "1530500000000",
					organizationName: "玉溪市安全生产监督管理局"
				},{
					organizationId: "1530500000000",
					organizationName: "文山壮族苗族自治州安全生产监督管理局"
				}]
			}
			//this.currentSelection = this.dialogArr[0]
			//console.log(this.dialogArr);
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.offices{
		.offices_header{
			height:.6rem;
			line-height:.6rem;
			font-size:.16rem;
			color:#bcdaff;
			margin-left:.4rem;
		}
		.offices_body{
			display:flex;
			justify-content: space-between;
			padding: 0 .4rem;
			height:3.6rem;
			/*position:relative;*/
			.offices_body_choice{
				height:3.57rem;
				width:3.5rem;
				border:1px solid #20528e;
				h4{
					height: .4rem;
					line-height: .4rem;
					font-size: .16rem;
					text-align: center;
					color: #bcdaff;
					background: rgba(63,149,255,.3);
				}
				ul{
					padding: .14rem .1rem;
					height: 2.88rem;
					overflow: auto;
					li{
						height: .4rem;
						line-height: .4rem;
						text-align: center;
						/*font-size: .14rem;*/
						font-size: 16px;
						margin-bottom: .1rem;
						color: #FFF;
						cursor: pointer;
						overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
						&.active{
							color:#f2b661;
							background:#0b407b;
						}
						&:hover{
							color:#f2b661;
							background:#0b407b;
						}
					}
				}
			}
			.offices_body_position{
				width: .53rem;
				height:3.59rem;
				text-align: center;
				line-height:3.59rem;
				.icon-shuangjiantou{
					color: #51d9fb;
					font-size: .16rem;
				}
			}
			.offices_body_left{
				/*left: 4.4rem;*/
				/*top:2.22rem;*/
			}
			.offices_body_right{
				/*top:2.22rem;*/
				/*right:3.9rem;*/
			}
		}
	}
</style>