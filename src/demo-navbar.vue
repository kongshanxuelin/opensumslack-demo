<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
          <wxc-minibar title="Minibar" background-color="#F2F3F4"></wxc-minibar>
        </div>
        <div class="demo">
          <wxc-minibar left-text="返回"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
        </div>
        <div class="demo">
          <wxc-minibar title="右侧带文字的导航栏"
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="更多"></wxc-minibar>
        </div>
        <div class="demo">
          <wxc-minibar title="右侧带icon的导航栏"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       :right-button="rightButton"></wxc-minibar>
        </div>
        <div class="demo">
        <wxc-minibar background-color="#FFF3CD"
                     @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                     @wxcMinibarRightButtonClicked="minibarRightButtonClick">
          <image src="https://img.alicdn.com/tfs/TB1QN8pdlHH8KJjy0FbXXcqlpXa-220-80.png"
                 slot="left"
                 style="height: 32px;width: 88px;"></image>
          <text style="font-size: 40px;" slot="middle">全部自定义化</text>
          <image slot="right"
                 src="https://img.alicdn.com/tfs/TB1j39Uc0fJ8KJjy0FeXXXKEXXa-160-128.png"
                 style="height: 32px;width: 40px"></image>
        </wxc-minibar>
      </div>

    </scroller>
  </div>
</template>

<script>
  import { WxcMinibar } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcMinibar },
    data: () => ({
      rightButton: 'https://gw.alicdn.com/tfs/TB1HrvtbBTH8KJjy0FiXXcRsXXa-32-32.png',
      leftButton: 'https://gw.alicdn.com/tfs/TB1cAYsbv2H8KJjy0FcXXaDlFXa-30-53.png'
    }),
    methods: {
      minibarLeftButtonClick () {
      },
      minibarRightButtonClick () {
        Sumslack.toast('click rightButton!');
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
    background-color: #FFFFFF;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    width: 750px;
    height: 180px;
    align-items: flex-start;
    padding-top: 60px;
  }
</style>