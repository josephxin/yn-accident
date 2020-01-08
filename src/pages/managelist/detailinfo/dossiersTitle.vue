<template>
	<div class="column">
		<div class="base-info-tilte">{{name}}</div>
		<div class="trapezoid-big"></div>
		<div class="trapezoid-smll"></div>
		<divline></divline>
		<div class="show-base-info" @click="handleClick">
			<i :class="[isShow?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
		</div>
	</div>
</template>

<script>
	import divline from 'components/divline'
	
	export default {
		name: 'dossiersTitle',
		components: {
			divline
		},
		props: {
			name: {
				type: String
			},
			isShow: {
				type: Boolean
			},
		},
		data() {
			return {

			}
		},
		methods: {
			handleClick(){
				this.$emit("update:isShow", !this.isShow)
			}
		},
		mounted() {

		},
		beforeDestroy() {

		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.column {
		display: flex;
		margin-top: .3rem;
		.base-info-tilte {
			width: auto;
			/*padding: .021rem 0.168rem;*/
			padding:4px 15px;
			white-space: nowrap;
			&:after {
				transform: perspective(1em) rotateX(1.2deg);
			}
		}
		.trapezoid-big {
			-webkit-transform: skewX(15deg);
		}
		.trapezoid-smll {
			-webkit-transform: skewX(15deg);
		}
	}
</style>