<template>
<div class="wxc-demo">
  <div class="demo">
    <wxc-cell label="Tab发现UI"
                title="第二个Tab页UI"
                :has-arrow="true"
                @wxcCellClicked="gotoPage('tab.event')"
                :has-margin="true"></wxc-cell>
  <wxc-cell label="发现详情页"
                title="发现详情页"
                :has-arrow="true"
                @wxcCellClicked="gotoPage('tab.event.detail')"
                :has-margin="true"></wxc-cell>

  <wxc-cell label="债券详情页"
                title="债券详情页"
                :has-arrow="true"
                @wxcCellClicked="gotoPage('detail.bond')"
                :has-margin="true"></wxc-cell>
  <wxc-cell label="债券对比页"
                title="债券对比页"
                :has-arrow="true"
                @wxcCellClicked="gotoPage('detail.bond.compare')"
                :has-margin="true"></wxc-cell>

  <wxc-cell label="宏观指标页"
                title="宏观指标页"
                :has-arrow="true"
                @wxcCellClicked="gotoPage('detail.macro')"
                :has-margin="true"></wxc-cell>

  <wxc-cell label="收藏页"
                title="收藏页"
                :has-arrow="true"
                @wxcCellClicked="gotoPage('favlist')"
                :has-margin="true"></wxc-cell>
  </div>  
</div>
</template>
<style scoped>
  .wxc-demo {
    position: absolute;
    top: 20px;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }
  .demo {
    margin-top: 30px;
  }
</style>
<script>
  const Sumslack = require("../sumslack/js/sumslack.js");
  import { WxcButton, WxcCell } from 'weex-ui';
  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({

    }),
    created() {
      Sumslack.init("金融词条UI",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
    },
    computed: {
      
    },
    methods: {
      gotoPage:function(pageId){
        Sumslack.navigateTo("fin."+pageId,{type:'b',id:'G0003652015CORLEB01'});
      }
    }
  };
</script>