<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <text class="title">含标题、描述、时间的简易流程图</text>
      <wxc-simple-flow :list="testData1"></wxc-simple-flow>
      <text class="title">可只显示标题，也支持显示多个高亮</text>
      <wxc-simple-flow :list="testData2"></wxc-simple-flow>
      <text class="title">可配置主题色</text>
      <wxc-simple-flow :list="testData1" :themeColor="themeColor1"></wxc-simple-flow>
      <text class="title">支持流程图动态更新</text>
      <wxc-simple-flow :list="folding ? testData3 : testData3.slice(0, 4)"></wxc-simple-flow>
      <div class="btn">
        <text class="btn-txt" @click="()=>folding=!folding">{{folding ? '模拟动态更新-减少' : '模拟动态更新-增加'}}</text>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcSimpleFlow } from 'weex-ui';
  module.exports = {
    components: { WxcSimpleFlow },
    data: () => ({
      folding: false,
      themeColor1: {
        lineColor: '#bf280b',
        pointInnerColor: '#b95048',
        pointBorderColor: '#bf280b',
        highlightTitleColor: '#bf280b',
        highlightPointInnerColor: '#bf280b',
        highlightPointBorderColor: '#d46262'
      },
      testData1: [
        {
          'date': '2017-05-24 21:10:29',
          'desc': '',
          'highlight': true,
          'title': '方案已确认'
        },
        {
          'date': '2017-05-24 19:54:28',
          'desc': '',
          'title': '方案已更新'
        },
        {
          'date': '2017-05-24 19:50:21',
          'desc': '您以确定了方案',
          'title': '方案已上传'
        },
        {
          'date': '2017-05-24 19:49:03',
          'desc': '商家会在2个工作小时内电话或旺旺联系您',
          'title': '商家已接单'
        }
      ],
      testData2: [
        {
          'highlight': true,
          'title': '方案已确认'
        },
        {
          'highlight': true,
          'title': '方案已更新'
        },
        {
          'title': '方案已上传'
        },
        {
          'title': '商家已接单'
        }
      ],
      testData3: [
        {
          'date': '2017-05-24 21:10:43',
          'desc': '',
          'highlight': true,
          'title': '预付款已支付'
        },
        {
          'date': '2017-05-24 21:10:43',
          'desc': '',
          'title': '预付款已支付'
        },
        {
          'date': '2017-05-24 21:10:41',
          'desc': '',
          'title': '订单待付款'
        },
        {
          'date': '2017-05-24 21:10:29',
          'desc': '',
          'title': '方案已确认'
        },
        {
          'date': '2017-05-24 19:54:28',
          'desc': '',
          'title': '方案已更新'
        },
        {
          'date': '2017-05-24 19:50:21',
          'desc': '您以确定了方案',
          'title': '方案已上传'
        },
        {
          'date': '2017-05-24 19:49:03',
          'desc': '商家会在2个工作小时内电话或旺旺联系您',
          'title': '商家已接单'
        }
      ]
    }),
    methods: {

    }
  };
</script>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 10;
    bottom: 10;
    left: 10;
    right: 10;
    background-color: #ffffff;
  }
</style>