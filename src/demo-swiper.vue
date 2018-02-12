<template>
<div class="wxc-demo">
    <scroller class="scroller">
      <text >基础使用</text>
      <div class="wrapper">
        <wxc-ep-slider :slider-id="sliderId"
                       :card-length='cardLength'
                       :card-s="cardSize"
                       :select-index="2"
                       @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">

          <!--自动生成demo-->
          <div v-for="(v,index) in [1,2,3,4,5]"
               :key="index"
               :slot="`card${index}_${sliderId}`"
               :class="['slider',`slider${index}`]"
               :accessible="true"
               :aria-label="`这里是第${index + 1}个滑块`">
            <text class="text">这里是第{{index + 1}}个滑块</text>
          </div>
        </wxc-ep-slider>
      </div>
      <text>Android点击滑动冲突</text>
      <div class="wrapper">
        <wxc-ep-slider :slider-id="autoSliderId"
                       :card-length='cardLength'
                       ref="wxc-ep-slider"
                       :card-s="cardSize"
                       :auto-play="true"
                       :select-index="2"
                       @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">
          <!--自动生成demo-->
          <wxc-pan-item v-for="(v,index) in [1,2,3,4,5]"
                        :key="index"
                        :ext-id="index"
                        :class="['slider',`slider${index}`]"
                        @wxcPanItemPan="wxcPanItemPan"
                        @wxcPanItemClick="wxcPanItemClick"
                        :slot="`card${index}_${autoSliderId}`"
                        :accessible="true"
                        :aria-label="`这里是第${index + 1}个滑块`">
            <text class="text">这里是第{{index + 1}}个滑块</text>
          </wxc-pan-item>
        </wxc-ep-slider>
        <div class="btn" @click="onClick">
          <text class="btn-text">手动切换2滑块</text>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcEpSlider, WxcPanItem, Utils } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcEpSlider, WxcPanItem },
    data: () => ({
      sliderId: 1,
      autoSliderId: 2,
      cardLength: 5,
      cardSize: {
        width: 400,
        height: 300,
        spacing: 0,
        scale: 0.8
      }
    }),
    methods: {
      wxcEpSliderCurrentIndexSelected (e) {
//        const index = e.currentIndex;
//        console.log(index);
      },
      onClick () {
        // 手动切换到第2张
        this.$refs['wxc-ep-slider'].manualSetPage(1);
      },
      wxcPanItemPan (e) {
        if (Utils.env.supportsEBForAndroid()) {
          this.$refs['wxc-ep-slider'].clearAutoPlay();
          this.$refs['wxc-ep-slider'].bindExp(e.element)
        }
      },
      wxcPanItemClick (e) {
        Sumslack.toast("hellow："+e.extId);
      }
    }
  };
</script>
<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
  }
  .scroller {
    flex: 1;
  }
  .wrapper {
    padding-top: 40px;
  }
  .text {
    font-size: 32px;
    color: #333333;
  }
  .btn {
    width: 250px;
    height: 80px;
    margin-left: 250px;
    margin-bottom: 40px;
    margin-top: 40px;
    background-color: #635147;
    align-items: center;
    justify-content: center;
  }
  .btn-text {
    font-size: 30px;
    color: #ffffff;
  }
  .slider {
    width: 400px;
    height: 300px;
    background-color: #c3413d;
    align-items: center;
    justify-content: center;
  }
  .slider1 {
    background-color: #635147;
  }
  .slider2 {
    background-color: #ffc302;
  }
  .slider3 {
    background-color: #ff9090;
  }
  .slider4 {
    background-color: #546e7a;
  }
</style>