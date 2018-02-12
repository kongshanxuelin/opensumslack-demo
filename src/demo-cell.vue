<template>
 <div class="wxc-demo">
    <scroller class="container">
      <text>单元格演示</text>
      <div class="demo">
        <wxc-cell label="普通Cell"
                  title="Weex Ui"
                  @wxcCellClicked="wxcCellClicked"
                  :has-margin="false"></wxc-cell>

        <wxc-cell label="链接Cell"
                  title="跳到首页"
                  :has-arrow="true"
                  :link="link"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="false"></wxc-cell>

        <wxc-cell label="带箭头"
                  title="Weex Ui"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="false"></wxc-cell>
      </div>
      <div class="demo">
        <wxc-cell title="标题内容"
                  desc="描述信息"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"></wxc-cell>
      </div>

      <div class="demo">
        <wxc-cell :has-arrow="false"
                  :has-top-border="false"
                  :auto-accessible="false">
          <text :style="{color:color}"
                slot="title">自定义标题</text>
          <switch slot="value"
                  @change="color= color==='#000' ? '#FFC900' : '#000'"></switch>
        </wxc-cell>
        <wxc-cell :has-arrow="false"
                  :cell-style="cellStyle"
                  :has-top-border="false"
                  :auto-accessible="false">
          <image class="image"
                 slot="label"
                 src="https://img.alicdn.com/tfs/TB1eLvjSXXXXXaiXXXXXXXXXXXX-144-166.jpg"></image>
          <text class="red"
                slot="title">自定义标题、样式还可以加图片</text>
        </wxc-cell>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcCell } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  export default {
    components: { WxcCell},
    created () {
    },
    data: () => ({
      color: '#000',
      cellStyle: {
        backgroundColor: '#f2f3f4'
      },
      link: 'http://wxapps.sumslack.com/demo2/index.js'
    }),
    methods: {
      wxcCellClicked (e) {
        Sumslack.toast('wxcCellClicked')
      }
    }
  };
</script>
<style scoped>
  .wxc-demo {
    width: 750px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }
  .container {
    flex: 1;
  }
  .demo {
    width: 750px;
    background-color: #f2f3f4;
  }
  .category {
    margin-top: 40px;
  }
  .default {
    color: #000000;
  }
  .active {
    color: #FFC900;
  }
  .red {
    color: #C3413D;
  }
  .image {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  .demo-title {
    font-size: 30px;
    color: #333333;
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 16px;
  }
</style>