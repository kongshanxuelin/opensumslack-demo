<template>
<div class="wxc-demo">

    <div class="panel">
      <text class="panel-header">基本信息</text>
      <div class="panel-body">
        <div class="flex-column list-item flex-between" :key="index" v-for="(m,index) in mprops">
          <text class="prop_name">{{m.propName}}：</text>
          <text class="prop_value">{{m.propValue}}</text>
        </div>
      </div>
    </div>
  <div class="panel"> 
    <chart :data="series" style="height:450px;width:100%;background-color:#343434;"></chart>
  </div>
  <div class="panel">
    <text ref="chart" :key="index" @click="clickLine(index)" v-for="(line,index) in chartOption.series" :style="{fontSize:25,color:line.color,marginTop:'5px',marginBottom:'5px'}">{{line.title}}</text>
  </div>
</div>
</template>
<style scoped src='../css/sumslack.css' />
<style scoped>
.prop_name {
  color: #8F9598;
  padding-right:20px;
  padding-left: 10px;
  font-size:25px;
}
.prop_value{
  color: #FFEBC8;
  font-size:25px;
  padding-right: 10px;
}
.list-item {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
<script>
  import { WxcButton, WxcCell } from 'weex-ui';
  import util from './util';
  const Sumslack = require("../sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({
        mprops:[
          {propName:"名称",propValue:"xxx"},
          {propName:"单位",propValue:"xxx"},
          {propName:"公布频率",propValue:"xxx"},
          {propName:"来源",propValue:"xx"}
        ],
        series:"",
        gjkcode:"",
        chartOption:{
          series:[{
            title:"曲线1",
            color:util.getColor(0),
            type:"line",
            data:[{x:"1",y:12},{x:"2",y:14},{x:"3",y:10},{x:"4",y:11},{x:"5",y:11},{x:"7",y:11},{x:"9",y:11},{x:"11",y:11}]
          },{
            title:"曲线2",
            color:util.getColor(1),
            type:"line",
            data:[{x:"1",y:22},{x:"2",y:24},{x:"3",y:44},{x:"4",y:29},{x:"5",y:21},{x:"7",y:51},{x:"9",y:111},{x:"11",y:71}]
          }]
        }
    }),
    computed: {
      
    },
    created(){
      this.gjkcode = Sumslack.getHttp().getUrlParam(this,"id") || "";
      Sumslack.init("宏观指标",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
      this.series = JSON.stringify(this.chartOption);
    },
    methods: {
      clickLine:function(index){
        Sumslack.alert(index+"");
        this.$refs.chart.showline(index);
      }
    }
  };
</script>