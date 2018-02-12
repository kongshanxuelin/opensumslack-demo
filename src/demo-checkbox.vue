<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <text>Checkbox</text>
      <wxc-checkbox title="默认"></wxc-checkbox>
      <wxc-checkbox title="默认选中"
                    :checked="true"></wxc-checkbox>
      <wxc-checkbox title="未选中不可更改"
                    :disabled="true"></wxc-checkbox>
      <wxc-checkbox title="选中不可更改"
                    :disabled="true"
                    :checked="true"></wxc-checkbox>
      <div class="margin">
        <text>CheckboxList</text>
        <wxc-checkbox-list :list="list"
                           @wxcCheckBoxListChecked="wxcCheckBoxListChecked"></wxc-checkbox-list>
        <text class="checked-text">选中项 {{checkedList.toString()}}</text>
      </div>
      <div class="margin">
      <wxc-radio :list="list3"
                 @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
      <text class="radio-text">checkedItem: {{checkedInfo}}</text>           
      </div>
      <div class="margin">
        <wxc-cell :has-arrow="false"
                  :has-top-border="false"
                  :auto-accessible="false">
          <text  slot="title">自定义标题</text>
          <switch checked="true"></switch>
        </wxc-cell>
      </div>
        
    </scroller>
  </div>
</template>

<script>
  import { WxcCheckbox, WxcCheckboxList,WxcRadio,WxcCell  } from 'weex-ui';
  module.exports = {
    components: { WxcCheckbox, WxcCheckboxList,WxcRadio,WxcCell  },
    data: () => ({
      list: [
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ],
      list3: [
        { title: '单选项1', value: 1 },
        { title: '单选项2', value: 2, checked: true },
        { title: '单选项3', value: 3 },
        { title: '单选项4', value: 4 }
      ],
      checkedList: [2],
      config:{
        checkedIcon:'https://gw.alicdn.com/tfs/TB1TARHdf6H8KJjSspmXXb2WXXa-31-30.png',
        disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
        checkedColor: '#000000'
      },
      checkedInfo: { title: '选项2', value: 2, oldIndex: -1, index: 1 }
    }),
    methods: {
      wxcCheckBoxListChecked (e) {
        this.checkedList = e.checkedList;
      },
      wxcRadioListChecked (e) {
        this.checkedInfo = e;
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
  .margin {
    margin-top: 60px;
  }
  .checked-text {
    font-size: 30px;
    color: #333333;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 24px;
  }
  .radio-text {
    font-size: 30px;
    color: #333333;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 24px;
  }
</style>