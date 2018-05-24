<template>
<div class="wxc-demo">
  <div style="margin-top:50px;margin-bottom:50px">
      <div class="flex-column w750" style="justify-content:center;" >
          <text class="prop_value2" style="font-weight:bold">{{event.c}}</text>
          <text class="prop_value2">{{event.title}}</text>
      </div>
  </div>
  <div class="flex-row list-item" style="margin-left:80px;margin-right:80px;margin-bottom:30px">
    <div class="flex-column flex-between">
      <text class="prop_value2 textcenter w150">{{event.pvalue}}</text>
      <text class="prop_value2 textcenter w150">{{event.fvalue}}</text>
      <text class="prop_value2 textcenter w150">{{event.rvalue}}</text>
    </div> 
    <div class="flex-column flex-between">
      <text class="prop_name textcenter w150">前值</text>
      <text class="prop_name textcenter w150">预测</text>
      <text class="prop_name textcenter w150">结果</text>
    </div> 
  </div>        
  <div class="panel"> 
    <chart ref="chart" :data="series" style="height:550px;width:720px;"></chart>
  </div>
  <div style="margin-top:30px">
    <wxc-button text="关  闭"
                    type="highlight"
                    @wxcButtonClicked="backIt"></wxc-button>
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
.prop_value2{
  color:#FE900D;
  font-size:30px;
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
  import config from '../config';
  const Sumslack = require("../sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({
        event:{
          c:"美国",
          title:"季调后新屋销售年化月率(%)",
          pvalue:12,  //前值
          fvalue:15,  //预测值
          rvalue:20   //结果值
        },
        series:"",
        indexcode:"",
        chartOption:{
          y:{title:"Y坐标名称"},
          series:[]
        }
    }),
    computed: {
      
    },
    created(){
      this.indexcode = Sumslack.getHttp().getUrlParam(this,"indexcode") || ""; 
      
      Sumslack.init("宏观指标",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });  
      Sumslack.request(config.server +"/fxcalendar/selectLastFxIndexEvent?indexcode="+this.indexcode,{
                      }).then(data => {
                        if(data.length>0){
                          this.event.title=data[0].indexname;
                          this.event.c=data[0].country;
                          this.event.pvalue=data[0].prevalue||"0";
                          this.event.fvalue=data[0].marketfore||"0";
                          this.event.rvalue=data[0].resultstr||"0";
                          Sumslack.setTitle(this.event.title);
                        }
                      });
      Sumslack.request(config.server +"/fxcalendar/selectFxIndexEventResult?indexcode="+this.indexcode,{
                      }).then(data => {
                        let tempdatas=[];
                        let temps={};
                        temps.title="曲线1";
                        temps.color="#FF9200";
                        temps.type="line";

                        data.forEach(info => {
                        let c={};
                        c.x=info.pubtime;
                        c.y=info.resultstr||"0";
                        tempdatas.push(c);
                    
                        });
                        temps.data=tempdatas;
                        this.chartOption.series.push(temps);
                        this.series = JSON.stringify(this.chartOption);
                        });


      this.series = JSON.stringify(this.chartOption);
    },
    methods: {
      clickLine:function(index){
        this.$refs.chart.showline(index);
      },
      backIt:function(){
        Sumslack.close();
      }
    }
  };
</script>