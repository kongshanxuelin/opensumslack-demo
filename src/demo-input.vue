<template>
<div class="wxc-demo">
    <scroller class="scroller">
      <div class="wrapper">
        <text>Input</text>
      </div>
      <text class="value-text"
            @click="setValue">点我可设置输入框内容</text>
      <div class="demo">
        <wxc-searchbar ref="wxc-searchbar"
                       @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                       @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                       @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                       @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                       @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                       @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
        <text class="value-text">{{value}}</text>

      </div>

      <text class="hint">禁用输入框</text>
      <div class="demo demo1">
        <wxc-searchbar :disabled="isDisabled"
                       placeholder="无法输入"
                       @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"></wxc-searchbar>
      </div>

      <text class="hint">一直显示取消按钮,同时theme="yellow"</text>
      <div class="demo demo1">
        <wxc-searchbar :always-show-cancel="showCancel"
                       theme="yellow"
                       @searchbarCancelClick="searchbarCancelClick"></wxc-searchbar>
      </div>

      <text class="hint">带有目的地模式的输入框、theme="yellow"</text>
      <div class="demo demo1">
        <wxc-searchbar class="searchbar"
                       placeholder="搜索目的地"
                       theme="yellow"
                       mod="hasDep"
                       dep-name="杭州出发"
                       @wxcSearchbarDepChooseClicked="wxcSearchbarDepChooseClicked"
                       @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"></wxc-searchbar>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcSearchbar  } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcSearchbar  },
    data: () => ({
      value: '',
      showCancel: true,
      isDisabled: true
    }),
    methods: {
      setValue () {
        this.$refs['wxc-searchbar'].setValue('点击了手动设置输入框内容的开关');
      },
      wxcSearchbarInputOnFocus () {
        Sumslack.toast('onfocus');
      },
      wxcSearchbarInputOnBlur () {
        Sumslack.toast('onblur');
      },
      wxcSearchbarCloseClicked () {
        Sumslack.toast('close click');
      },
      wxcSearchbarInputOnInput (e) {
        this.value = e.value;
      },
      wxcSearchbarCancelClicked () {
        Sumslack.toast('cancel.click');
      },
      wxcSearchbarInputDisabledClicked () {
        Sumslack.toast('input.onclick');
      },
      wxcSearchbarDepChooseClicked () {
        Sumslack.toast('dep.choose.click');
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
    height: 160px;
  }
  .demo1 {
    margin-top: 20px;
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