<template>
<div class="wxc-demo">
    <scroller class="scroller">
     
      <text>单选</text>

      <div class="demo">
        <wxc-grid-select
          :list="testData1"
          :single="true"
          @select="params => onSelect('res1', params)">
        </wxc-grid-select>

        <text class="res">{{res1}}</text>
      </div>

      <text class="res"></text>

      <text>多选</text>

      <div class="demo">
        <wxc-grid-select
          :list="testData2"
          :limit="5"
          @overLimit="onOverLimit"
          @select="params => onSelect('res2', params)">
        </wxc-grid-select>

        <text class="res">{{res2}}</text>
      </div>

      <text>自定义样式</text>

      <div class="demo">
        <wxc-grid-select
          :single="true"
          :cols="5"
          :customStyles="customStyles"
          :list="testData3"
          @select="params => onSelect('res3', params)">
        </wxc-grid-select>

        <text class="res">{{res3}}</text>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcButton, WxcGridSelect  } from 'weex-ui';
  const Sumslack = require("./sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcButton, WxcGridSelect  },
    data: () => ({
      res1: '',
      res2: '',
      res3: '',
      testData1: [
        {
          'title': '上海'
        },
        {
          'title': '杭州',
          'checked': true
        },
        {
          'title': '北京'
        }
      ],
      testData2: [
        {
          'title': '上海'
        },
        {
          'title': '杭州',
          'checked': true
        },
        {
          'title': '北京',
          'checked': true
        }
      ],
      testData3: [
        {
          'title': '上海'
        },
        {
          'title': '杭州',
          'checked': true
        },
        {
          'title': '北京'
        },
        {
          'title': '广州'
        }
      ],
      customStyles: {
        lineSpacing: '14px',
        width: '120px',
        height: '50px',
        icon: '',
        color: '#333333',
        checkedColor: '#ffffff',
        disabledColor: '#eeeeee',
        borderColor: '#666666',
        checkedBorderColor: '#ffb200',
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffb200'
      }
    }),
    methods: {
      onSelect (res, { selectIndex, checked, checkedList }) {
        Vue.set(this, res, `本次选择的index：${selectIndex}\n是否选中：${checked
          ? '是'
          : '否'}\n选中列表：${checkedList.map(item => item.title).join(',')}`);
      },
      onOverLimit (limit) {
        Sumslack.toast(`最多选择${limit}个`);
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
    padding-bottom: 24px;
    background-color: #ffffff;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    padding-top: 24px;
    padding-right: 24px;
    padding-left: 24px;
  }
  .res {
    margin-top: 24px;
    color: #666666;
    font-size: 26px;
    line-height: 36px;
  }
</style>