<template>
<div class="wxc-demo">
    <term class="term" type="2" @itemSelected="termItemClick"></term>  
    <div class="panel">
      <div class="panel-header">
        <div class="flex-column">
        <text class="prop_value" style="margin-right:20px">基本信息</text>
        <text class="iconfont-selected icon-search" @click="favIt" v-if="isFav">&#xe6f4;</text>
        <text class="iconfont icon-search" @click="favIt" v-else>&#xe6f5;</text>
        </div>
      </div>
      <div class="panel-body">
        <div class="flex-column list-item flex-between" :key="index" v-for="(m,index) in mprops">
          <view style="margin-top:20px;margin-bottom:20px;margin-left:70px;margin-right:70px;" v-if="index==0">
            <text style="color:#FFFFFF;width:600px;">{{m.propValue}}</text>
          </view>
          <text v-if="index>0" class="prop_name">{{m.propName}}：</text>
          <text v-if="index>0" class="prop_value">{{m.propValue}}</text>
         
        </div>
      </div>
    </div>
  <div class="panel"> 
    <chart ref="chart" :data="series" style="height:550px;width:720px;"></chart>
  </div>
  <div class="panel" style="margin-top:20px;margin-bottom:20px">
    <text 
    :key="index" 
    @click="clickLine(index)" 
    v-for="(line,index) in chartOption.series" 
    :style="{fontSize:25,color:line.color,marginTop:'5px',marginBottom:'5px',marginLeft:'5px',marginRight:'5px',paddingTop:'12px',paddingBottom:'12px'}">{{line.title}}</text>
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
.term {
  height:60px;
  width:750px;
  background-color: #0E1A18;
  border-width: 1px;
  border-style: solid;
  border-color: #193D37;
  padding-top:5px;
  padding-bottom:5px;
}
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
  import config from '../config';
  const Sumslack = require("../sumslack/js/sumslack.js");
  const httpService = require("../sumslack/js/http-service.js");

  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({
        isFav:false,
        mprops:[
          {propName:"名称",propValue:"xxx"},
          {propName:"单位",propValue:"xxx"},
          {propName:"公布频率",propValue:"xxx"},
          {propName:"来源",propValue:"xx"}
        ],
        series:"",
        gjkcode:"",
        chartOption:{series:[]}
    }),
    computed: {
      
    },
    created(){
      this.gjkcode = Sumslack.getHttp().getUrlParam(this,"id") || "CRE1A02035";
      //this.gjkcode ="CEC1A00361";

      httpService.loginThen().then(res => {
        if(res){
          httpService.favGet(this.gjkcode).then(json => {
            this.isFav = json.res;
          });
        }
      });

      Sumslack.init("宏观指标",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });

      Sumslack.request(config.server + "/macroBaseIndex/selectByGjkCode?gjkCodes="+this.gjkcode,{
                      }).then(data => {
                        if(data.length>0){
                          this.mprops[0].propValue=data[0].seriesNameLocal;
                          this.mprops[1].propValue=data[0].unitTypeLocal;
                          this.mprops[2].propValue=data[0].seriesFreq;
                          this.mprops[3].propValue=data[0].sourceNameLocal;
                        }
                      });
      Sumslack.request(config.server + "/macroBaseIndex/selectDataValueByGjkCode?gjkcode="+this.gjkcode+"&startpubtime=&endpubtime=",{
                      }).then(data => {
                        let tempdatas=[];
                        let temps={};
                        temps.title=this.mprops[0].propValue;
                        temps.color="#FF9200";
                        temps.type="line";

                        data.forEach(info => {
                        let c={};
                        c.x=info.indexDate;
                        c.y=info.indexValue?info.indexValue:0;
                        tempdatas.push(c);
                    
                        });
                        temps.data=tempdatas;
                        this.chartOption.series.push(temps);
                        this.series = JSON.stringify(this.chartOption);
                        });
    },
    methods: {
      clickLine:function(index){
        this.$refs.chart.showline(index);
      },
      termItemClick:function(term){
        Sumslack.alert(Sumslack.print(term.term));
      },
      backIt:function(){
        Sumslack.close();
      },
      fav(){
        var that = this;
        httpService.fav(this.gjkcode,function(json){
          if(json.res){
            if(json.d === 1){  //收藏成功
              that.isFav = true;
              Sumslack.toast("收藏词条成功!");
            }else{
              that.isFav = false;
              Sumslack.toast("取消收藏词条成功!");
            }
          }
        });
      },
      favIt(){
        //this.isFav = !this.isFav;
        // if(this.isFav){
        //   Sumslack.toast("收藏成功!");
        // }
        var that = this;
        httpService.isLogin(function(ret){
          if(!ret){//未登录情况下
            httpService.login(function(json){
              if(!json.ret){
                Sumslack.alert(json.msg);
              }else{
                //已经处于登录状态，则直接获取token收藏指标
                that.fav();
              }
            });
          }else{ //已登录情况下
            that.fav();
          }
        });
      }
    }
  };
</script>