<template>
<div class="wxc-demo">
  <div class="flex-column container">
    <div style="flex:1">
      <div class="flex-row">
        <div class="flex-column mt10" :key="'input_'+index" v-for="(b,index) in bonds">
          <term class="term" type="B" :data-idx="index" @itemSelected="termItemClick"></term>
          <text class="iconfont icon-search" @click="removeInput(index-1)" v-if="index!=0">&#xe6f3;</text>
        </div>
      </div>
    </div>
  
    <text class="iconfont icon-search" @click="addBondCompare">&#xe6e0;</text>

  </div>  
 
  
    <scroller class="scroller" scroll-direction="horizontal">
      <div class="flex-row" >
        <div class="flex-column row-height">
          <text class="w200 prop_name">属性/债券</text>
          <text class="w250 prop_name" v-for="(bond,index) in bonds">债券对比{{index+1}}</text>
        </div>
        <scroller scroll-direction="vertical">
          <div class="flex-column row-height" v-for="(item,index) in bondValues">
            <text class="w200 prop_name">{{item.prop}}</text>
            <text class="w250 prop_value" v-for="(vv,ii) in item.v">{{vv}}</text>
          </div>
        </scroller>
      </div>      
    </scroller>
  

</div>
</template>
<style scoped src='../css/sumslack.css' />
<style scoped>
.test{
  display: flex;
  flex-direction:row;
}
.term {
  height:60px;
  width:580px;
  background-color: #0E1A18;
  border-width: 1px;
  border-style: solid;
  border-color: #193D37;
  padding-top:5px;
  padding-bottom:5px;
}
.mt10 {
  margin-bottom: 10px;
}
.container {
  margin-top:30px;
  padding-left:10px;
  padding-right: 30px;
}
.icon-search {
  font-size: 40px;
  margin-left:20px;
}    
.input-split {
  margin-bottom: 5px;
}
.row-height {
  height:50px;
}
.w200 {
  width: 180px;
}
.w250 {
  width: 250px;
}
.scroller {
  flex:1;
  margin-top:20px;
  padding: 8px;
  flex-direction: row;
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
</style>
<script>
  import Vue from 'vue';
  import config from '../config.js';
  import { WxcButton, WxcCell } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");
  import util from './util';
  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({
      bonds:["",""],
      bondValues:[
        {prop:"简称",v:["2015年贵阳","2015年贵阳","2015年贵阳","2015年贵阳"]},
        {prop:"债项评级",v:["AA","AAA","AA","AAA"]},
        {prop:"主体评级",v:["AAA","AAA","AAA","AAA"]},
        {prop:"债券类型",v:["地方企业债 | 城投债","地方企业债 | 城投债","地方企业债 | 城投债","地方企业债 | 城投债"]},
        {prop:"发行规模",v:["15.00亿元","15.00亿元","15.00亿元","115.00亿元"]},
        {prop:"债券期限",v:["","","",""]},
        {prop:"剩余期限",v:["","","",""]},
        {prop:"含权类型",v:["","","",""]},
        {prop:"还本方式",v:["","","",""]},
        {prop:"主承销商",v:["","","",""]},
        {prop:"承销团",v:["","","",""]},
        {prop:"担保方式",v:["","","",""]},
        {prop:"担保人",v:["","","",""]},
        {prop:"利率方式",v:["固定利率","固定利率","固定利率","固定利率"]},
        {prop:"票面利率",v:["4.17%","4.17%","4.17%","4.17%"]},
        {prop:"发行收益",v:["4.17%","4.17%","4.17%","4.27%"]},
        {prop:"发行价格",v:["4.17%","4.17%","4.17%","4.27%"]},
        {prop:"付息频率",v:["年度","年度","年度","年度"]},
        {prop:"计息频率",v:["年度","年度","年度","年度"]},
        {prop:"发行人",v:["国有企业","国有企业","国有企业","国有企业"]},
        {prop:"发行机构",v:["贵州贵安建设集团有限公司","贵州贵安建设集团有限公司","贵州贵安建设集团有限公司","贵州贵安建设集团有限公司"]},
        {prop:"起息日",v:["20151028","20151028","20151028","20151028"]},
        {prop:"上市日",v:["20151110","20151110","20151110","20151110"]},
        {prop:"下次付息日",v:["20181028","20181028","20181028","20181028"]},
        {prop:"行权日",v:["--","--","--","--"]},
        {prop:"下市日",v:["20221027","20221027","20221027","20221027"]},
        {prop:"到期日",v:["20221028","20221028","20221028","20221028"]}
      ]
    }),
    computed: {
      
    },
    created() {
      let self = this;
      util.initIconFont();
      Sumslack.init("债券比对",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
    },
    watch: {
      bonds:function(val){
        let items = new Set(val);
        let str = "";
        items.forEach(x => {
          if(x !=""){
            str+="," + x;
          }
        });
        if(str.length>0){
          str = str.substring(1,str.length);
        }
        this.bondValues.forEach((bond,index) => {
          bond.v = new Array;
        });
         Sumslack.request(config.server+"/bond/details",{"bondKeys":"G0003652015CORLEB01,G0003652015CORLEB01"
                    }).then(res => {
                     // Sumslack.alert(Sumslack.print(res));
                      res.forEach((data,index) => {
                         let bondBean = data.bondBean;
                         this.bondValues[0].v.push(bondBean.shortName);
                         if(data.bondRatingBeanList&&data.bondRatingBeanList.length>0){
                            this.bondValues[1].v.push(data.bondRatingBeanList[0].bondRating);
                            this.bondValues[2].v.push(data.bondRatingBeanList[0].bondRating);
                         }else{
                            this.bondValues[1].v.push("");
                            this.bondValues[2].v.push("");
                         }
                         this.bondValues[3].v.push(bondBean.bondType);
                         this.bondValues[4].v.push("");
                         this.bondValues[5].v.push(bondBean.maturityTerm+bondBean.termUnit);
                         this.bondValues[6].v.push(bondBean.leftTime);
                         this.bondValues[7].v.push(bondBean.optionType);
                         this.bondValues[8].v.push(bondBean.redemptionNo?"提前还本":"到期一次还本");
                           let mun = "";
                          data.underWriterInstitutionBeanListForMUN.forEach(forMun => {
                            mun = mun + forMun.shortNameC;
                          });
                          this.bondValues[9].v.push(mun);
                          let ung = "";
                          data.underWriterInstitutionBeanListForUNG.forEach(forUng => {
                            ung = ung + forUng.shortNameC;
                          });
                         this.bondValues[10].v.push(ung);
                         this.bondValues[11].v.push(bondBean.ratingAugment);
                         this.bondValues[12].v.push(bondBean.warranterName);
                         this.bondValues[13].v.push(bondBean.couponType);
                         this.bondValues[14].v.push(bondBean.couponRateSpread?bondBean.couponRateSpread+"%":"--");
                         this.bondValues[15].v.push(bondBean.couponRateSpread+"%");
                         this.bondValues[16].v.push(bondBean.issuePrice+"元");
                         this.bondValues[17].v.push(bondBean.couponFrequency);
                         this.bondValues[18].v.push(bondBean.compoundFrequency);
                         this.bondValues[19].v.push(bondBean.ins_name);
                         this.bondValues[20].v.push(bondBean.ins_type);
                         this.bondValues[21].v.push(bondBean.interestStartDate?bondBean.interestStartDate:"--");
                         this.bondValues[22].v.push(bondBean.listedDate?bondBean.listedDate:"--");
                         this.bondValues[23].v.push("");
                         this.bondValues[24].v.push("");
                         this.bondValues[25].v.push(bondBean.delistedDate?bondBean.delistedDate:"--");
                         this.bondValues[25].v.push(bondBean.maturityDate?bondBean.maturityDate:"--");
                        // Vue.set( this.bondValues[0].v, index, bondBean.shortName);
                      });
                    });
        Sumslack.alert(str);
      }
    },
    methods: {
      addBondCompare(){
        if(this.bonds.length>5){
          Sumslack.toast("债券比对最多只允许6只~");
          return;
        }
        this.bonds.push("");
      },
      removeInput(index){
        this.bonds = this.bonds.filter(function (item,_index) {
          return index!=_index;
        })
      },
      termItemClick:function(term){
        let _idx = term.target.attr.dataIdx;
        //Sumslack.alert(_idx + ":" + Sumslack.print(term.value.uuid));
        //this.bonds[_idx] = term.value.uuid;
        this.bonds.splice(_idx,1,term.value.uuid);
      }
    }
  };
</script>