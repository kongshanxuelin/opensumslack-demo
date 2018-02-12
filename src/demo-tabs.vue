<template>
  <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="tabTitles"
                :tab-styles="tabStyles"
                title-type="icon"
                :needSlider="needSlider"
                :is-tab-view="isTabView"
                :tab-page-height="tabPageHeight"
                :spm-c="4307989"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    <list v-for="(v,index) in tabList"
          :key="index"
          class="item-container"
          :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
      <cell class="tab-box">Page {{index+1}} </cell>
    </list>
  </wxc-tab-page>
</template>

<script>
  import { WxcTabPage, WxcPanItem, Utils } from 'weex-ui';
  const dom = weex.requireModule('dom');
  module.exports = {
    components: { WxcTabPage, WxcPanItem },
    data: () => ({
      tabTitles: [
        {
          title: 'Tab 1',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png',
        },
        {
          title: 'Tab 2',
          icon: 'https://gw.alicdn.com/tfs/TB1ARoKSXXXXXc9XVXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB19Z72SXXXXXamXFXXXXXXXXXX-72-72.png'
        },
        {
          title: 'Tab 3',
          icon: 'https://gw.alicdn.com/tfs/TB1VKMISXXXXXbyaXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1aTgZSXXXXXazXFXXXXXXXXXX-72-72.png'
        }
      ],
      tabStyles: {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 70,
        iconHeight: 70,
        width: 160,
        height: 120,
        fontSize: 24,
        hasActiveBottom: true,
        activeBottomColor: '#FFC900',
        activeBottomHeight: 6,
        activeBottomWidth: 120,
        textPaddingLeft: 10,
        textPaddingRight: 10
      },
      tabList: [],
      needSlider: true,
      supportSlide: true,
      isTabView: true,
      tabPageHeight: 1334
    }),
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
      this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
      Vue.set(this.tabList, 0, this.demoList);
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        /* 未加载tab模拟数据请求 */
        if (!Utils.isNonEmptyArray(self.tabList[index])) {
          setTimeout(() => {
            Vue.set(self.tabList, index, self.demoList);
          }, 100);
        }
      },
      wxcPanItemPan (e) {
        if (Utils.env.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      }
    }
  };
</script>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
  .border-cell {
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
  }
  .cell {
    background-color: #ffffff;
  }
  .tab-box {
    margin-top:80px;
    margin-left:300px;
  }
</style>