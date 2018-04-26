<template>
  <div class="wrapper" :style="{backgroundColor:(rowIndex%2==0?'#121A19 ':'#1E2B29')}">
    <div class="plr10" style="width:50px;">
      <text style="color:#FF9200" class="iconfont">&#xe6f5;</text>
      <text style="color:#FF9200" class="iconfont">&#xe6f5;</text>
      <text style="color:#FF9200" class="iconfont">&#xe6f5;</text>
    </div> 
    <div class="info">
      <div class="info-item">
        <div class="flex-column"> 
          <text class="text-info mr40">美国</text> 
          <text class="text-info">新屋销售年化率(%)</text>
        </div>
      </div>
      <div class="info-item">
        <text class="text-value">10</text>
        <text class="text-value">252</text>
        <text class="text-value">5</text>  
      </div>
      <div class="info-item">
        <text class="text">前值</text>
        <text class="text">预测</text>
        <text class="text">结果</text>  
      </div>
    </div>
    <text style="width:50px;color:#FF9200" class="iconfont">&#xe70c;</text>
  </div>
</template>
<style scoped src='../css/sumslack.css' />
<style scoped>
    .wrapper{
        display: flex;
        flex-direction: row;
        margin-top:0px;
        margin-bottom: 0px;
        margin-left: 10px;
        margin-right: 10px;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
        padding-top: 10px;
    }
    .info {
      flex:1;
      padding-left:40px;
      padding-right: 80px;
    }
    .info-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .text {
      color:#8F9598;
    }
    .text-value {
      color:#FE900D;
    }
    .text-info {
      color:#F9C152;
    }
</style>
<script>
    import util from './util';
    export default {
        props: {
          rowIndex: {
            type: Number,
            default: 0
          }
        },
        data () {
            return {
            }
        },
        created() {
          util.initIconFont();
        },
        methods: {
        }
    }
</script>