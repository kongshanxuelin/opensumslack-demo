<template>
<div class="wxc-demo">
  <scroller class="scroller">
     <text class="text">财经事件Weex页面，待开发</text>
  </scroller>
</div>
</template>
<style scoped>
  .text {
    color:red;
  }
  
</style>
<script>
  import { WxcButton, WxcCell } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcButton, WxcCell  },
    data: () => ({

    }),
    computed: {
      
    },
    methods: {
      
    }
  };
</script>