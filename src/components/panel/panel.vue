<template>
  	<div class="panel active">
        <span class="panel-crow active"></span>
        <span class="panel-crow active"></span>
        <span class="panel-line active"></span>
        <span class="panel-line active"></span>
        <div class='panel-title'ref="panelTitle">决策分析结果</div>
        <div class='panel-children'>
          <slot></slot>
        </div>
      </div>
</template>

<script>
  export default {
    name: 'content-box',
    props: {
    },
    methods:{

    },
    mounted(){

    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
.panel{
	position:relative;
	width:100%;
	height:100%;
	background-color:rgba(0, 131, 255, .1);
	border:1px solid rgba(0,131,255,.8);
	
	&::after,
	&::before,
	.panel-crow{
		content:'';
		width:2px;
		height:2px;
		background-color:#00a2ff;
		position:absolute;
	}
	&::after{
		bottom:-2px;
		left:-2px;
	}
	&::before{
		top:-2px;
		left:-2px;
	}
	.panel-crow:nth-child(1){
		top:-2px;
		right:-2px;
	}
	.panel-crow:nth-child(2){
		bottom:-2px;
		right:-2px;
	}
	
	.panel-line{
		position:absolute;
		top:-2px;
		height: 3px;
		width: 1rem;
		background-color:rgba(0,222,255,1)
	}
	.panel-line:nth-child(3){
		left:1rem;
	}
	.panel-line:nth-child(4){
		right:1rem;
	}
	.panel-title{
		position:absolute;
		width:1.56rem;
		height:0.44rem;
		line-height:0.44rem;
		text-align: center;
		color:#f1f7ff;
		font-size: .2rem;
		padding: 0 15px;
		font-weight: 900;
		background: #024aa6;
		left:50%;
		top:-0.22rem;
		transform: translate(-50%,0);
		border-radius:0 10px 0 10px;
	}
	.panel-title::before {
		content: '';
		width: 14px;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		right: -2px;
		background-image: url('../../assets/images/title-r.png');
		background-size: 100% 100%;
	}
	
	.panel-title::after {
		content: '';
		width: 14px;
		height: 100%;
		display: block;
		position: absolute;
		bottom: 0;
		left: -2px;
		background-image: url('../../assets/images/title-l.png');
		background-size: 100% 100%;
	}
	.panel-children{
		position:absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
}

</style>
