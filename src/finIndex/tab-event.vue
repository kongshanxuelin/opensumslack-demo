<template>
<div class="wxc-demo">

  <div class="tab">
    <div class="flex-column flex-center flex-middle">
        <text @click="tabClick(0)" class="text-info-padding" :class="[tabIndex==0?'text-info-selected':'text-info']">财经指标</text>
        <text @click="tabClick(1)" class="text-info-padding" :class="[tabIndex==1?'text-info-selected':'text-info']">财经事件</text>
        <text @click="tabClick(2)" class="text-info-padding" :class="[tabIndex==2?'text-info-selected':'text-info']">节假日</text>
    </div>
  </div>
  <div class="tab-container" v-if="tabIndex==0">
    <div class="filter-container flex-row" v-if="showFilter">
      <div class="filterbox flex-column">
        <text class="text text-info-padding">国家：</text>
        <div class="flex-column">
          <text class="text-info-selected text-info-padding">全部</text>
          <text class="text-info text-info-padding">中国</text>
          <text class="text-info text-info-padding">美国</text>
          <text class="text-info text-info-padding">欧洲</text>
          <text class="text-info text-info-padding">东亚</text>
        </div>
      </div>
    </div> 
    <div class="flex-row-right">
        <!-- iconfont不支持动态图标，会被显示成字符串，暂时用v-if代替 -->
        <text class="iconfont" @click="collapseBar" v-if="showFilter">&#xe777;</text>
        <text class="iconfont" @click="collapseBar" v-else>&#xe778;</text>    
    </div> 
    <div class="wrapper">
      <div class="flex-column">
        <div class="flex-row" style="width:106px" v-for="item in [1,2,3,4,5,6,7]">
          <text class="text-day-week">周{{item}}</text>
          <text class="text-day-date">04-0{{item}}</text>
        </div>
      </div>
    </div> 
    <scroller :class="['main-list', isIpx&&isIpx()?'ml-ipx':'']" offset-accuracy="300" loadmoreoffset="300" @loadmore="onloadmore">
      <refresher @loadingDown="loadingDown"></refresher>
      <tab-event-item @click.native="doDetail(item)" country="美国" index-name="新屋销售年化率1(%)" v-for="(item,index) in eventItems" :row-index="index" :key="item.id"></tab-event-item>
      <loading class="loading" @loading="onloading" :display="showLoading">
          <text class="indicator">...</text>
      </loading>
    </scroller>
  </div>
  <div class="tab-container" v-if="tabIndex==1">
    <text class="text">这里显示财经事件</text>
  </div>
  <div class="tab-container" v-if="tabIndex==2">
    <text class="text">这里显示节假日</text>
  </div>
</div>
</template>
<style scoped src='../css/sumslack.css' />
<style scoped>
  .filter-container {
  }
  .tab {
    margin-top:30px;
    text-align: center;
    width:750px;
    margin-bottom: 20px;
    margin-left: 120px;
    margin-right: 120px;
  }
  .tab-container {
    flex:1;
  }
  .filterbox {
    margin:10px auto;
  }
  .iconfont {
    font-family:iconfont;
    margin-right: 20px;
    font-size: 50px;
    color:#fff;
  }
  .scroller {
 
  }
  .wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .slider {
    width: 100px;
    height: 100px;
    background-color: #c3413d;
    align-items: center;
    justify-content: center;
  }
  .text {
    font-size: 32px;
    color: #fff;
  }
  .text-info-padding {
    padding:10px 20px;
    display: inline-block;
  }
  .text-info {
    color: #fff;
    background-color: #172422;
  }
  .text-info-selected {
    background-color: #FF9200;
    color:#1B1B1B;
  }
  .text-day-week {
    text-align: center;
    font-size:30px;
    color:#FFEBC8;
  }
  .text-day-date{
    text-align: center;
    font-size:20px;
    color:#8F9598;
  }
</style>
<script>
  import { WxcButton, WxcCell } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");

  import refresher from './refresh.vue';
  import TabEventItem from './tab-event-item.vue';
  import util from './util';

  module.exports = {
    components: { WxcButton, WxcCell,refresher,TabEventItem  },
    data: () => ({
      showFilter:true,
      tabIndex:0,
      customStyles: {
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
      },
      data_contries:[{
        title:"中国"
      },{title:"美国"},{title:"欧洲"},{title:"日本"},{title:"其他"}],
      data_types:[{title:"财经指标"},{title:"财经事件"},{title:"假期"}],

      sliderId: 1,
      cardLength: 5,
      cardSize: {
        width: 400,
        height: 300,
        spacing: 0,
        scale: 0.8
      },
      showLoading: 'hide',
      eventItems:[
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"},
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"},
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"},
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"},
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"},
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"},
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"},
        {id:1,title:"测试"},
        {id:2,title:"测试2"},
        {id:3,title:"测试3"}
      ]

    }),
    computed: {
      
    },
    created() {
      util.initIconFont();
      Sumslack.init("发现",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
    },
    methods: {
      tabClick(index){
        this.tabIndex = index;
      },
      collapseBar(){
         this.showFilter = !this.showFilter;
      },
      onSelect (res, {selectIndex, checked, checkedList}) {
        Vue.set(this, res, `本次选择的index：${selectIndex}\n是否选中：${checked ? '是' : '否'}\n选中列表：${checkedList.map(item => item.title).join(',')}`);
      },
      wxcEpSliderCurrentIndexSelected (e) {
        const index = e.currentIndex;
        console.log("index:"+index);
      },
      onloading () {
          this.showLoading = 'show';
          setTimeout(() => {
              this.eventItems.push({id:12,title:"test"});
              this.showLoading = 'hide'
          }, 300)
      },
      onloadmore () {
          setTimeout(() => {
              this.eventItems.push({id:12,title:"test"});
          }, 100)
      },
      loadingDown(){
          //this.eventItems =[];
          this.eventItems.push({id:12,title:"test11"});
          this.eventItems.push({id:13,title:"test12"});
      },
      doDetail(item){
        //Sumslack.toast("goto page:"+item.title);
        Sumslack.navigateTo("fin.tab.event.detail",{a:11});
      }
    }
  };
</script>