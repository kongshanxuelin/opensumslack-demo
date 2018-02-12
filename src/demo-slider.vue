<template>
  <div>

    <wxc-button text="Left" style="margin-top:15px"
                @wxcButtonClicked="buttonClicked('left')"></wxc-button>

    <wxc-button text="Right" style="margin-top:15px"
                @wxcButtonClicked="buttonClicked('right')"></wxc-button>
                
    <wxc-button text="Top" style="margin-top:15px"
                @wxcButtonClicked="buttonClicked('top')"></wxc-button>

    <wxc-button text="Bottom" style="margin-top:15px"
                @wxcButtonClicked="buttonClicked('bottom')"></wxc-button>

    <wxc-popup :width="width"
               :pos="pos"
               :show="isShow"
               @wxcPopupOverlayClicked="overlayClicked">
               
    <div class="demo-content">
        <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png" class="demo-image"></image>
        <text>与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。
        </text>
    </div>

    </wxc-popup>
  </div>
</template>

<script>
  import { WxcButton, WxcPopup } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcButton, WxcPopup },
    data: () => ({
      isShow: false,
      pos:'left',
      width:450
    }),
    watch:{
      pos(val){
        if(val == 'top' || this.pos == 'bottom'){
            this.width = 750;
        }else{
            this.width = 450;
        }
      }
    },
    methods: {
      buttonClicked (pos) {
        
        this.isShow = true;
        this.pos = pos;
      },
      overlayClicked () {
        this.isShow = false;
      }
    }
  };
</script>

<style scoped>
  .demo-content {
    padding-right: 40px;
    padding-left: 40px;
  }
  .demo-image {
    width: 181px;
    height: 41px;
    margin-bottom: 40px;
    margin-top: 40px;
  }

</style>
