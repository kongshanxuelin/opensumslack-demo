<template>
<div class="wxc-demo">

  <div class="flex-column container">
  
    <div style="flex:1">
      <div class="flex-row">
        <div class="flex-column" v-for="(b,index) in bonds">
          <input style="flex:1"  type="text" placeholder="输入需比较的词条..." class="input input-split" />
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
          <text class="w250 prop_name">债券对比页2</text>
          <text class="w250 prop_name">债券对比页3</text>
          <text class="w250 prop_name">债券对比页4</text>
          <text class="w250 prop_name">债券对比页5</text>
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
  import config from '../config.js';
  import { WxcButton, WxcCell } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");
  import util from './util';
  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({
      bonds:["k1","k2"],
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
      Sumslack.request(config.server+"/bond/details",{"bondKeys":"G0003652015CORLEB01,G0003652015CORLEB01"
                    }).then(res => {
                      alert(res);
                      res.forEach((data,index) => {
                         let bondBean = data.bondBean;
                         alert(index);
                         self.bondValues[0].v[index]= bondBean.shortName;
                      });
                    });
    },
    watch: {
      bonds:function(val){
        Sumslack.toast("bonds发生变化，执行比较");
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
      }
    }
  };
</script>