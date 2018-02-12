<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <text>Loading</text>
      <div class="demo">
        <wxc-part-loading :show="partShow"
                          :width="width"
                          :height="height"></wxc-part-loading>
      </div>

      <wxc-cell :has-top-border="true"
                :auto-accessible="false"
                title="开启局部Loading">
        <switch :checked="partShow"
                slot="value"
                @change="partShow= !partShow"></switch>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                title="长度">
        <input class="input"
               slot="value"
               placeholder="局部Loading长度，默认36"
               :value="width"
               @input="width=$event.value"/>
      </wxc-cell>
       <wxc-cell :has-top-border="false"
                title="高度">
        <input class="input"
               slot="value"
               placeholder="局部Loading高度，默认36"
               :value="height"
               @input="height=$event.value"/>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                :auto-accessible="false"
                title="开启Loading">
        <switch :checked="isShow"
                slot="value"
                @change="isShow= !isShow"></switch>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                :auto-accessible="false"
                title="自定义Loading">
        <switch :checked="type === 'trip'"
                slot="value"
                @change="type=(type === 'trip'? 'default' : 'trip')"></switch>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                :has-arrow="true"
                @wxcCellClicked="openIntervalLoading"
                title="延迟加载"></wxc-cell>

      <wxc-cell :has-top-border="false"
                title="配置文案">
        <input class="input"
               slot="value"
               placeholder="配置文案，默认无"
               :value="loadingText"
               @input="loadingText=$event.value"/>
      </wxc-cell>

      <wxc-loading :show="isShow"
                 :type="type"
                 :loading-text="loadingText"
                 :interval="interval"></wxc-loading>
    </scroller>  
  </div>
</template>

<script>
  import { WxcLoading, WxcPartLoading, WxcCell } from 'weex-ui';
  module.exports = {
    components: { WxcLoading, WxcCell, WxcPartLoading},
    data: () => ({
      width: '36',
      height: '36',
      partShow: true,
      isShow: true,
      interval: 0,
      type: 'default',
      loadingText: ''
    }),
    methods: {
      openLoading () {
        this.isShow = !this.isShow;
        this.interval = 0;
      },
      openTripLoading () {
        const { type } = this;
        this.type = (type === 'trip') ? 'default' : 'trip';
      },
      openIntervalLoading () {
        this.isShow = false;
        setTimeout(() => {
          this.interval = 1000;
          this.isShow = true;
        }, 10)
      },
      openTextLoading () {
        this.interval = 0;
        this.loadingText = this.loadingText ? '' : '正在加载中';
      }
    }
  };
</script>
<style scoped>
  .wxc-demo {
    position: absolute;
    top: 10;
    right: 10;
    left: 10;
    bottom: 10;
    background-color: #ffffff;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center;
    height: 80px;
    justify-content: center;
  }
   .input {
    width: 500px;
    text-align: right;
    font-size: 28px;
  }
</style>