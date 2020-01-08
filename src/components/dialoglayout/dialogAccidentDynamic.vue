<template>
	<div class="dialog-wrap accident-dynamic">
		<el-dialog :visible.sync="$root.dialogAccidentDynamic" :lock-scroll="false">
			<div slot="title" class="dialog-title">
				<div class="base-info-tilte">事故动态</div>
				<div class="trapezoid-big"></div>
				<div class="trapezoid-smll"></div>
			</div>
			<div class="dialog-content">
				<div class="content-list">
					<ul>
						<li v-for="(item, index) in list" :key="index">
							<div class="name">{{item.processNode}}</div>
							<div class="step"><img src="../../assets/images/clock.png" v-if="index==0"/></div>
							<div class="date">{{item.processTime}}</div>
							<div class="detail" :title="item.processDetail">{{item.processDetail}}</div>
						</li>
						<li class="stepbar"></li>
					</ul>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'dialogAccidentDynamic',
		components: {

		},
		props: {
			list: {
				type: Array
			}
		},
		data() {
			return {
				
			}
		},
		watch: {
			
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss">
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.accident-dynamic {
		.el-dialog {
			min-width: 6.86rem;
			.dialog-title {
				display: flex;
			}
			.el-dialog__body {
				padding-top: 0.04rem;
			}
			.dialog-content {
				border: 1px solid $dialog-border;
				padding: .38rem .28rem;
				.content-list {
					height: 3.33rem;
					overflow: auto;
					>ul {
						position: relative;
						>li {
							display: flex;
							line-height: .48rem;
							font-size: .16rem;
							color: white;
							&:first-of-type {
								font-size: .18rem;
								color: #f2b661;
								.step {
									img{
										margin-left: -0.035rem;
										width: 0.16rem;
									}
								}
							}
							&.stepbar {
								position: absolute;
								top: .29rem;
								left: 1.59rem;
								width: 0.09rem;
								height: calc(100% - .42rem);
								background-image: url(../../assets/images/stepbar.png);
								background-size: 100%;
							}
							.name {
								width: 1.32rem;
								margin-right: .27rem;
								text-align: right;
								@include no-wrap;
							}
							.step {
								width: 0.09rem;
								margin-right: .23rem;
							}
							.date {
								width: 2.04rem;
								margin-right: .22rem;
								text-align: left;
							}
							.detail {
								flex: 1;
								text-align: left;
								@include no-wrap;
							}
						}
					}
				}
			}
		}
		.base-info-tilte{
			width: auto;
			padding: 4px 15px;
		}
	}
</style>