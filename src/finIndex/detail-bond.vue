<template>
<div class="wxc-demo">
  <div class="flex-column search-container">
    <div style="flex:1">
      <input type="text" placeholder="输入词条..." class="input" @click="goSearchResult" />
    </div>
    <text class="iconfont icon-search" @click="gotoBondCompare">&#xe6e0;</text>
    <text class="iconfont-selected icon-search" @click="favIt" v-if="isFav">&#xe6f4;</text>
    <text class="iconfont icon-search" @click="favIt" v-else>&#xe6f5;</text>
  </div>  
  
  <list class="list">
    <cell class="cell">
      <div class="panel">
        <text class="panel-header">基本信息</text>
        <div class="panel-body">
          <div class="flex-column list-item flex-between" v-for="b in bond.base">
            <text class="prop_name">{{b.propName}}：</text>
            <text class="prop_value">{{b.propValue}}</text>
          </div> 
        </div>
      </div>
    </cell>

    <cell class="cell">
      <div class="panel">
        <text class="panel-header">利率信息</text>
        <div class="panel-body">
          <div class="flex-column list-item flex-between" v-for="b in bond.rate">
            <text class="prop_name">{{b.propName}}：</text>
            <text class="prop_value">{{b.propValue}}</text>
          </div> 
        </div>
      </div>
    </cell>

    <cell class="cell">
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
            <div class="flex-column flex-between rowspan" v-for="b in bond.market">
              <text class="prop_value textcenter" style="flex:1">{{b.c1}}</text>
              <text class="prop_value w4 textcenter">{{b.c2}}</text>
              <text class="prop_value w4 textcenter">{{b.c3}}</text>
              <text class="prop_value textcenter w100">{{b.c4}}</text>
            </div>
          </div> 
        </div>
      </div>
    </cell>

    <cell class="cell">
      <div class="panel">
        <text class="panel-header">债券日历</text>
        <div class="panel-body">
          <text class="prop_value">略</text>
        </div>
      </div>
    </cell>  

    <cell class="cell">
      <div class="flex-column" style="margin-top:20px;margin-bottom:20px;">
        <text class="prop_name">发行人</text>
        <text class="prop_value">贵州贵安建设集团有限公司 国有企业</text> 
      </div>
    </cell>  

    <cell class="cell">
      <div class="panel">
        <text class="panel-header">债项历史评级</text>
        <div class="panel-body">
          <text class="prop_value">略</text>
        </div>
      </div>
    </cell>     

    <cell class="cell">
      <div class="panel">
        <text class="panel-header">发行人所有债券(流通中)</text>
        <div class="panel-body">
          <text class="prop_value">略</text>
        </div>
      </div>
    </cell> 

    <cell class="cell">
      <div class="panel">
        <text class="panel-header">发行人主体历史评级</text>
        <div class="panel-body">
          <text class="prop_value">略</text>
        </div>
      </div>
    </cell> 

  </list>
 
</div>
</template>
<style scoped src='../css/sumslack.css' />
<style scoped>
.search-container {
  margin-top:30px;
  padding-left:10px;
  padding-right: 30px;
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
  import { WxcButton, WxcCell } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");

  import util from './util';

  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({
      bondKey:"",
      isFav:true,
      bond:{
        base:[
          {propName:"债券简称",propValue:""},
          {propName:"债券全称",propValue:""},
          {propName:"主体评级/债项评级",propValue:"AA/AAA"},
          {propName:"债券类型",propValue:"地方企业债 | 城投债"},
          {propName:"债券期限",propValue:"7.0000Y"},
          {propName:"剩余期限",propValue:"4.50Y"},
          {propName:"含权类型",propValue:"普通债券"},
          {propName:"还本方式",propValue:"提前还本"},
          {propName:"主承销商",propValue:"中信建投证券股份有限公司 "},
          {propName:"承销团",propValue:"东海证券股份有限公司  国信证券股份有限公司 "},
          {propName:"担保方式	",propValue:"保证担保"},
          {propName:"担保人	",propValue:"中债信用增进投资股份有限公司"}
        ],
        rate:[
          {propName:"利率方式",propValue:"固定利率"},
          {propName:"票面利率",propValue:""},
          {propName:"发行收益	",propValue:"4.17%"},
          {propName:"发行价格	",propValue:"100.00元"},
          {propName:"付息频率	",propValue:"年度"},
          {propName:"计息频率	",propValue:"年度"}
        ],
        market:[
          {c1:"银行间债券市场",c2:"1580243",c3:"15贵阳路桥债",c4:"--"},
          {c1:"上海证券交易所",c2:"127282.SH",c3:"15贵路桥",c4:"0.5300"}
        ]
      }
    }),
    computed: {
      
    },
    created() {
      let self = this;
      util.initIconFont();
      Sumslack.init("xxx债券",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
      Sumslack.request("http://192.168.31.98:9191/bond/detail/1580243",{
                    }).then(data => {
                      let bondBean = data.bondBean;
                      self.bond.base[0].propValue= bondBean.shortName;
                      self.bond.base[1].propValue= bondBean.fullName;
                      if(data.bondRatingBeanList&&data.bondRatingBeanList.length>0){
                          self.bond.base[2].propValue= data.bondRatingBeanList[0].bondRating;
                      }else{
                          self.bond.base[2].propValue= "";
                      }
                      self.bond.base[3].propValue= bondBean.bondType;
                      self.bond.base[4].propValue= bondBean.shortName;
                      self.bond.base[5].propValue= bondBean.shortName;
                      self.bond.base[6].propValue= bondBean.shortName;
                      self.bond.base[7].propValue= bondBean.shortName;
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

                      self.bond.rate[0].propValue= bondBean.couponRateSpread+"%";
                      self.bond.rate[1].propValue= bondBean.couponRateSpread+"%";
                      self.bond.rate[2].propValue= bondBean.couponRateSpread+"%";
                      self.bond.rate[3].propValue= bondBean.couponRateSpread+"%";
                      self.bond.rate[4].propValue= bondBean.couponRateSpread+"%";
                      self.bond.rate[5].propValue= bondBean.couponRateSpread+"%";
                      //  Sumslack.alert('收到网络响应：' + Sumslack.print(data));
                    });
    },
    methods: {
      goSearchResult(){

      },
      favIt(){
        this.isFav = !this.isFav;
        if(this.isFav){
          Sumslack.toast("收藏成功!");
        }
      },
      gotoBondCompare(){
        Sumslack.navigateTo("fin.detail.bond.compare",{bondKey:"xxx"});
      }
    }
  };
</script>