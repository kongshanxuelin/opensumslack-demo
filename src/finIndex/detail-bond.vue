<template>
<div class="wxc-demo">
  <div class="flex-column search-container">
    <div style="flex:1">
      <term class="term" type="1" @itemSelected="goSearchResult"></term>
    </div>
    <text class="iconfont icon-search" @click="gotoBondCompare">&#xe6e0;</text>
    <text class="iconfont-selected icon-search" @click="favIt" v-if="isFav">&#xe6f4;</text>
    <text class="iconfont icon-search" @click="favIt" v-else>&#xe6f5;</text>
  </div>  
  

      <div class="panel">
        <text class="panel-header">基本信息</text>
        <div class="panel-body">
          <div class="flex-column list-item flex-between" :key="b" v-for="(b,index) in bond.base">
            <text class="prop_name">{{b.propName}}：</text>
            <text class="prop_value line2" lines="2" v-if="index == 1">{{b.propValue}}</text>
            <text class="prop_value" v-else>{{b.propValue}}</text>
          </div> 
        </div>
      </div>
 

     <scroller class="scroll">
      <div class="panel">
        <text class="panel-header">利率信息</text>
        <div class="panel-body">
          <div class="flex-column list-item flex-between" :key="b" v-for="b in bond.rate">
            <text class="prop_name">{{b.propName}}：</text>
            <text class="prop_value">{{b.propValue}}</text>
          </div> 
        </div>
      </div>
    

    
      <div class="panel">
        <text class="panel-header">流通市场信息</text>
        <div class="panel-body">
          <div class="flex-row list-item">
            <div class="flex-column flex-between">
              <text class="prop_name textcenter" style="flex:1">发行市场</text>
              <text class="prop_name w4 textcenter">代码</text>
              <text class="prop_name w4 textcenter">简称</text>
              <text class="prop_name w100 textcenter">质押比</text>
            </div>
            <div class="flex-column flex-between rowspan" :key="b" v-for="b in bond.market">
              <text class="prop_value textcenter" style="flex:1">{{b.c1}}</text>
              <text class="prop_value w4 textcenter">{{b.c2}}</text>
              <text class="prop_value w4 textcenter">{{b.c3}}</text>
              <text class="prop_value textcenter w100">{{b.c4}}</text>
            </div>
          </div> 
        </div>
      </div>


    
      <div class="panel">
        <text class="panel-header">债券日历</text>
        <div class="panel-body">
          <div class="flex-column list-item flex-between" :key="b" v-for="b in bond.calendar">
            <text class="prop_name">{{b.propName}}：</text>
            <text class="prop_value">{{b.propValue}}</text>
          </div>
        </div>
      </div>
  
    
      <div class="panel">
        <text class="panel-header">债项历史评级</text>
        <div class="panel-body">
          <div class="flex-row list-item">
            <div class="flex-column flex-between">
              <text class="prop_name w4 textcenter">债项评级</text>
              <text class="prop_name w4 textcenter">评级日期</text>
              <text class="prop_name w4 textcenter"  style="flex:1">评级机构</text>
            </div>
            <div class="flex-column flex-between rowspan" :key="b" v-for="b in bond.rating">
              <text class="prop_value w4 textcenter">{{b.bondRating}}</text>
              <text class="prop_value w4 textcenter">{{b.ratingDate}}</text>
              <text class="prop_value textcenter"  style="flex:1">{{b.insName}}</text>
            </div>
          </div> 
        </div>
      </div>


    
      <div class="flex-column" style="margin-top:20px;margin-bottom:20px;">
        <text class="prop_name">发行人</text>
        <text class="prop_value">{{bond.ins_name}} {{bond.ins_type}}</text> 
      </div>
   

    
      <div class="panel">
        <text class="panel-header">发行人所有债券(流通中)</text>
        <div class="panel-body">
          <div class="flex-row list-item">
            <div class="flex-column flex-between">
              <text class="prop_name w4 textcenter">剩余期限</text>
              <text class="prop_name w4 textcenter">债券代码</text>
              <text class="prop_name w4 textcenter"   style="flex:1">简称</text>
              <text class="prop_name w4 textcenter">债项评级</text>
            </div>
          </div>
          <div class="flex-column flex-between rowspan" :key="b.Bond_ID" v-for="b in bond.issuerBonds">
              <text class="prop_value w4 textcenter">{{b.lefttime}}</text>
              <text class="prop_value w4 textcenter">{{b.Bond_ID}}</text>
              <text class="prop_value textcenter"  style="flex:1">{{b.Short_Name}}</text>
              <text class="prop_value textcenter">{{b.rating}}</text>
          </div>
        </div>
      </div>
    

    
      <div class="panel">
        <text class="panel-header">发行人主体历史评级</text>
        <div class="panel-body">
          <div class="flex-row list-item">
            <div class="flex-column flex-between">
              <text class="prop_name w4 textcenter">债项评级</text>
              <text class="prop_name w4 textcenter">评级日期</text>
              <text class="prop_name w4 textcenter"   style="flex:1">评级机构</text>
            </div>
          </div>
          <div class="flex-column flex-between rowspan" :key="b" v-for="b in bond.issuerHistoryRate">
              <text class="prop_value w4 textcenter">{{b.rate}}</text>
              <text class="prop_value w4 textcenter">{{b.rating_date}}</text>
              <text class="prop_value textcenter"  style="flex:1">{{b.shortname}}</text>
          </div>
        </div>
      </div>

  </scroller>

 
 
</div>
</template>
<style scoped src='../css/sumslack.css' />
<style scoped>
.term {
  height:60px;
  width:580px;
  background-color: #0E1A18;
  border-width: 1px;
  border-style: solid;
  border-color: #193D37;
}
.line2 {
  width:500px;
  lines:2;
}
.search-container {
  margin-top:30px;
  padding-left:10px;
  padding-right: 30px;
}
.scroll {
  margin-top:10px;
}
.icon-search {
  font-size: 50px;
  margin-left:20px;
}  
.list-item {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
  margin-right: 8px;
}
.prop_name {
  color: #8F9598;
  padding-right:20px;
  padding-left: 10px;
  font-size:25px;
}
.rowspan {
  margin-top:8px;
  margin-bottom: 8px;
}
.prop_value{
  color: #FFEBC8;
  font-size:25px;
  padding-right: 10px;
}
.w4 {
  width: 172px;
}
.w100 {
  width: 110px;
}
</style>
<script>
  import config from '../config.js';
  import { WxcButton, WxcCell } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");
  const httpService = require("../sumslack/js/http-service.js");

  import util from './util';

  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({
      bondKey:"",
      isFav:false,
      bond:{
        base:[
          {propName:"债券简称",propValue:""},
          {propName:"债券全称",propValue:""},
          {propName:"主体评级/债项评级",propValue:""},
          {propName:"债券类型",propValue:""},
          {propName:"债券期限",propValue:""},
          {propName:"剩余期限",propValue:""},
          {propName:"含权类型",propValue:""},
          {propName:"还本方式",propValue:""},
          {propName:"主承销商",propValue:""},
          {propName:"承销团",propValue:""},
          {propName:"担保方式	",propValue:""},
          {propName:"担保人	",propValue:""}
        ],
        rate:[
          {propName:"利率方式",propValue:""},
          {propName:"票面利率",propValue:""},
          {propName:"发行收益",propValue:""},
          {propName:"发行价格",propValue:""},
          {propName:"付息频率",propValue:""},
          {propName:"计息频率",propValue:""}
        ],
        market:[
        ],
        calendar:[
          {propName:"发行开始日",propValue:""},
          {propName:"起息日",propValue:""},
          {propName:"上市日",propValue:""},
          {propName:"下次付息日",propValue:""},
          {propName:"行权日",propValue:""},
          {propName:"下市日",propValue:""},
          {propName:"到期日",propValue:""}
        ],
        rating:[
        ],
        issuerBonds:[
        ],
        issuerHistoryRate:[
        ]
      }
    }),
    computed: {
      
    },
    created() {
      this.bondKey = Sumslack.getHttp().getUrlParam(this,"id") || "G0003652015CORLEB01";

      //如果是登录状态，读取收藏状态
      httpService.loginThen().then(res => {
        if(res){
          httpService.favGet(this.bondKey).then(json => {
            this.isFav = json.res;
          });
        }
      });
      let self = this;
      util.initIconFont();
      Sumslack.init("债券详情",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
      this.query();
    },
    methods: {
      goSearchResult(term){
        this.bondKey = term.value.uuid;
        this.query();
      },
      fav(){
        var that = this;
        httpService.fav(this.bondKey,function(json){
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
      },
      gotoBondCompare(){
        Sumslack.navigateTo("fin.detail.bond.compare",{bondKey:"xxx"});
      },
      query(){
        var self = this;
        Sumslack.request(config.server+"/bond/detail/"+this.bondKey,{
                    }).then(data => {
                      let bondBean = data.bondBean;
                      self.bond.base[0].propValue= bondBean.shortName;
                      Sumslack.setTitle(bondBean.shortName);
                      self.bond.base[1].propValue= bondBean.fullName;
                      if(data.bondRatingBeanList&&data.bondRatingBeanList.length>0){
                          self.bond.base[2].propValue= data.bondRatingBeanList[0].bondRating;
                      }else{
                          self.bond.base[2].propValue= "";
                      }
                      self.bond.base[3].propValue= bondBean.bondType;
                      self.bond.base[4].propValue= bondBean.maturityTerm+bondBean.termUnit;
                      self.bond.base[5].propValue= bondBean.leftTime;
                      self.bond.base[6].propValue= bondBean.optionType;
                      self.bond.base[7].propValue= bondBean.redemptionNo?"提前还本":"到期一次还本";
                      let mun = "";
                      data.underWriterInstitutionBeanListForMUN.forEach(forMun => {
                        mun = mun + forMun.shortNameC;
                      });
                      self.bond.base[8].propValue= mun;
                      let ung = "";
                      data.underWriterInstitutionBeanListForUNG.forEach(forUng => {
                        ung = ung + forUng.shortNameC;
                      });
                      self.bond.base[9].propValue= ung;
                      self.bond.base[10].propValue= bondBean.ratingAugment;
                      self.bond.base[11].propValue= bondBean.warranterName;
                      self.bond.rate[0].propValue= bondBean.couponType;
                      self.bond.rate[1].propValue= bondBean.couponRateSpread?bondBean.couponRateSpread+"%":"--";
                      self.bond.rate[2].propValue= bondBean.couponRateSpread+"%";
                      self.bond.rate[3].propValue= bondBean.issuePrice+"元";
                      self.bond.rate[4].propValue= bondBean.couponFrequency;
                      self.bond.rate[5].propValue= bondBean.compoundFrequency;
                      data.bondListInfoBeanList.forEach(info => {
                          let c = {};
                          if(info.listedMarket=="CIB"){
                            c.c1="银行间债券市场";
                          }else if(info.listedMarket=="SSE"){
                            c.c1="上海证券交易所";
                          }else if(info.listedMarket=="SZE"){
                            c.c1="深证证券交易所";
                          }else{
                            c.c1="";
                          }
                          c.c2=info.bondId;
                          c.c3=info.shortName;
                          c.c4=info.zyb?info.zyb:"--";
                          self.bond.market.push(c);
                      });
                      self.bond.calendar[0].propValue=bondBean.issueStartDate?bondBean.issueStartDate:"--";
                      self.bond.calendar[1].propValue=bondBean.interestStartDate?bondBean.interestStartDate:"--";
                      self.bond.calendar[2].propValue=bondBean.listedDate?bondBean.listedDate:"--";
                      self.bond.calendar[5].propValue=bondBean.delistedDate?bondBean.delistedDate:"--";
                      self.bond.calendar[6].propValue=bondBean.maturityDate?bondBean.maturityDate:"--";
                      self.bond.rating=data.bondRatingBeanList;
                      
                      self.bond.ins_name=bondBean.ins_name;
                      self.bond.ins_type=bondBean.ins_type;
                      self.bond.issuerBonds=self.bond.issuerBonds.concat(data.issuerAllBonds.SSE);
                      self.bond.issuerBonds=self.bond.issuerBonds.concat(data.issuerAllBonds.CIB);
                      self.bond.issuerBonds=self.bond.issuerBonds.concat(data.issuerAllBonds.SZE);
                      self.bond.issuerHistoryRate=data.issuerHistoryRate;
                      //  Sumslack.alert('收到网络响应：' + Sumslack.print(data));
                    });
      }
    }
  };
</script>