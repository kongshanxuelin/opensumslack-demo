<template>
  <div class="wxc-demo">
    
    <wxc-result :type="type"
                padding-top="232"
                :custom-set="customSet"
                @wxcResultButtonClicked="resultButtonClick"
                :show="show"></wxc-result>
  </div>
</template>

<script>
  import { WxcResult  } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcResult },
    data: () => ({
      show: true,
      type: 'noNetwork'//errorPage、noNetwork、noGoods、errorLocation
    }),
    methods: {
      resultButtonClick (e) {
        Sumslack.toast(`你点击了按钮`)
      }
    }
  };
</script>
<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }
</style>