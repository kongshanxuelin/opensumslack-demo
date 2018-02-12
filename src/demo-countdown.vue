<template>
 <div class="wxc-demo">
    <scroller class="scroller">
      <text>倒计时</text>
      <text class="demo-desc">默认样式，时间戳传5秒后，倒计时完传回调</text>
      <div class="demo-3">
        <text class="cb-text">{{demoText}}:</text>
        <wxc-countdown
          :time="demoTime"
          @wxcOnComplete="onCompletedTwo">
        </wxc-countdown>
      </div>

      <category title="自定义配置"></category>
      <text class="demo-desc">配置样式，设置倒计时频率</text>

      <wxc-countdown
        :interval="2000"
        tpl="{h}时"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '50px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>

      <wxc-countdown
        :interval="2000"
        tpl="{m}分"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '70px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>

      <wxc-countdown
        :interval="2000"
        tpl="{s}秒"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '80px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>

      <wxc-countdown
        :interval="2000"
        tpl="{m}分{s}秒"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '50px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>

      <wxc-countdown
        :interval="2000"
        tpl="{h}时{m}分"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '50px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>


      <wxc-countdown
        :interval="2000"
        tpl="{h}时{m}分{s}秒"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '50px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>

      <wxc-countdown
        :interval="2000"
        tpl="{d}天{h}时{m}分{s}秒"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '50px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>

      <wxc-countdown
        :interval="2000"
        tpl="{d}天{h}:{m}:{s}"
        :timeBoxStyle="{backgroundColor: '#C3413D', height: '50px', width: '50px'}"
        :timeTextStyle="{fontSize: '24px', color: '#FFB706'}"
        :dotTextStyle="{color: '#C3413D', fontSize: '26px'}"
        :dotBoxStyle="{width: '30px'}"
        :style="{marginTop: '10px', justifyContent: 'center'}"
        :time="TIME">
      </wxc-countdown>

    </scroller>
  </div>
</template>

<script>
  import { WxcCountdown , WxcCell } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcCountdown , WxcCell },
    data: () => ({
      TIME: new Date().getTime() + 100000000,
      demoTime: new Date().getTime() + 5000,
      callbackText: '',
      demoText: '距离开始'
    }),
    methods: {
      onCompleted () {
        this.callbackText = '倒计时完成了';
        Sumslack.toast('倒计时完成了')
      },
      onCompletedTwo () {
        this.demoTime = new Date().getTime() + 5000;
        this.demoText = this.demoText === '距离开始' ? '距离结束' : '距离开始';
        Sumslack.toast('倒计时完成了')
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
  .demo-desc {
    font-size: 32px;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 30px;
    margin-right: 30px;
    color: rgb(102, 102, 102);
    text-align: center;
  }
  .demo-3 {
    margin-top: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .scroller {
    flex: 1;
  }
</style>