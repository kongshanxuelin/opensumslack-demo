<template>
<div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <wxc-searchbar ref="wxc-searchbar"></wxc-searchbar>
      </div>
      <text class="hint">视频播放</text>
      <div class="demo demo1">
        <video class="video" :src="src" autoplay controls
          @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcSearchbar  } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcSearchbar  },
    data: () => ({
      src:"http://h5.sumslack.com/test.mp4",
      state: '----'
    }),
    created() {
      Sumslack.init("语音视频Demo",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
            Sumslack.addGlobalEventListener("refreshPage",function(){
                Sumslack.refresh();
            });
      });
    },
    methods: {
      onstart (event) {
        this.state = 'onstart'
      },
      onpause (event) {
        this.state = 'onpause'
      },
      onfinish (event) {
        this.state = 'onfinish'
      },
      onfail (event) {
        this.state = 'onfinish'
      }
    }
  };
</script>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F6F9F8;
  }
  .scroller {
    flex: 1;
  }
  .wrapper {
    background-color: #FFFFFF;
  }
  .demo {

  }
  .video {
    width: 750px;
    height: 350px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .demo1 {
    margin-top: 10px;
  }
  .value-text {
    margin: 24px;
    font-size: 30px;
    color: #333333;
  }
  .hint {
    margin-left: 24px;
    font-size: 30px;
    color: #333333;
  }
</style>