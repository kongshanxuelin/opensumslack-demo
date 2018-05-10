<template>
<div class="wxc-demo">
  <div class="tab">
    <div class="flex-column flex-center flex-middle tab-btns">
        <text @click="tabClick(0)" class="text-info-padding" :class="[tabIndex==0?'text-info-selected':'text-info']">财经指标</text>
        <text @click="tabClick(1)" class="text-info-padding" :class="[tabIndex==1?'text-info-selected':'text-info']">财经事件</text>
        <text @click="tabClick(2)" class="text-info-padding" :class="[tabIndex==2?'text-info-selected':'text-info']">节假日</text>
    </div>
  </div>
  <div class="tab-container" v-if="tabIndex==0">
    <div class="filter-container flex-row" v-if="showFilter">
      <div class="filterbox flex-column">
        <div class="flex-column">
          <text class="text-info-padding":class="[curshowcountry==''?'text-info-selected':'text-info']" @click="othercountry('')" >全部</text>
          <text class="text-info-padding":class="[curshowcountry=='中国'?'text-info-selected':'text-info']" @click="othercountry('中国')">中国</text>
          <text class="text-info-padding":class="[curshowcountry=='美国'?'text-info-selected':'text-info']" @click="othercountry('美国')">美国</text>
          <text class="text-info-padding":class="[curshowcountry=='日本'?'text-info-selected':'text-info']" @click="othercountry('日本')">日本</text>
          <text class="text-info-padding":class="[curshowcountry=='英国'?'text-info-selected':'text-info']" @click="othercountry('英国')">英国</text>
          <text class="text-info-padding":class="[curshowcountry=='澳大利亚'?'text-info-selected':'text-info']" @click="othercountry('澳大利亚')">澳大利亚</text>
        </div>
      </div>
      <div class="filterbox flex-column">
        <div class="flex-column">
          <text class="text-info-padding":class="[curimportant==''?'text-info-selected':'text-info']" @click="otherimportant('')" >全部</text>
          <text class="text-info-padding":class="[curimportant=='0'?'text-info-selected':'text-info']" @click="otherimportant('0')">重要</text>
          <text class="text-info-padding":class="[curimportant=='1'?'text-info-selected':'text-info']" @click="otherimportant('1')">次要</text>
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
        <div :key="sdate.show" 
        class="flex-row"
        style="width:104px;padding-top:10px;padding-bottom:5px;" 
        :style="{'background-color':(curdate===sdate.detaildate ? '#FF9200' : (todayvalue===sdate.detaildate?'#608E2D':'transparent'))}"
        @click="otherdate(sdate)" 
        v-for="sdate in sdates">
          <text class="text-day-week">{{sdate.week}}</text>
          <text class="text-day-date">{{sdate.show}}</text>
        </div>
      </div>
    </div> 
    <scroller :class="['scroller','main-list', isIpx&&isIpx()?'ml-ipx':'']" offset-accuracy="300" loadmoreoffset="300" @loadmore="onloadmore">
      <refresher @loadingDown="loadingDown"></refresher>
      <tab-event-item @click.native="doDetail(item)" :country="item.country" :marketfore="item.marketfore" :prevalue="item.prevalue" :resultstr="item.resultstr" :lvl="item.importantstr" :indexname="item.indexname"   v-for="(item,index) in eventItems" :row-index="index" :key="item.id"></tab-event-item>

    </scroller>
  </div>
  <div class="tab-container" v-if="tabIndex==1">
    <div class="filter-container flex-row" v-if="showFilter">
      <div class="filterbox flex-column">
        <div class="flex-column">
          <text class="text-info-padding":class="[curshowcountryEvent==''?'text-info-selected':'text-info']" @click="othercountryEvent('')" >全部</text>
          <text class="text-info-padding":class="[curshowcountryEvent=='中国'?'text-info-selected':'text-info']" @click="othercountryEvent('中国')">中国</text>
          <text class="text-info-padding":class="[curshowcountryEvent=='美国'?'text-info-selected':'text-info']" @click="othercountryEvent('美国')">美国</text>
          <text class="text-info-padding":class="[curshowcountryEvent=='日本'?'text-info-selected':'text-info']" @click="othercountryEvent('日本')">日本</text>
          <text class="text-info-padding":class="[curshowcountryEvent=='英国'?'text-info-selected':'text-info']" @click="othercountryEvent('英国')">英国</text>
          <text class="text-info-padding":class="[curshowcountryEvent=='澳大利亚'?'text-info-selected':'text-info']" @click="othercountryEvent('澳大利亚')">澳大利亚</text>
        </div>
      </div>
      <div class="filterbox flex-column">
        <div class="flex-column">
          <text class="text-info-padding":class="[curimportantEvent==''?'text-info-selected':'text-info']" @click="otherimportantEvent('')" >全部</text>
          <text class="text-info-padding":class="[curimportantEvent=='0'?'text-info-selected':'text-info']" @click="otherimportantEvent('0')">重要</text>
          <text class="text-info-padding":class="[curimportantEvent=='1'?'text-info-selected':'text-info']" @click="otherimportantEvent('1')">次要</text>
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
        <div class="flex-row" 
        style="width:104px;padding-top:10px;padding-bottom:5px;" 
        :style="{'background-color':(curdateEvent===sdate.detaildate ? '#FF9200' : (todayvalue===sdate.detaildate?'#608E2D':'transparent'))}"
         @click="otherdateEvent(sdate)" 
         :key="'s_'+sdate.show"
         v-for="sdate in sdatesEvent">
          <text class="text-day-week">{{sdate.week}}</text>
          <text class="text-day-date">{{sdate.show}}</text>
        </div>
      </div>
    </div> 
    <scroller :class="['scroller','main-list', isIpx&&isIpx()?'ml-ipx':'']" offset-accuracy="300" loadmoreoffset="300" @loadmore="onloadmore">
      <refresher @loadingDown="loadingDown"></refresher>
      <tab-event-fx-item @click.native="doDetail(item)" :country="item.country" :lvl="item.importantstr" :indexname="item.content"   v-for="(item,index) in eventItemsEvent" :row-index="index" :key="item.id"></tab-event-fx-item>
      <!--
      <loading class="loading" @loading="onloading" :display="showLoading">
          <text class="indicator">...</text>
      </loading>
      -->
    </scroller>
  </div>
  <div class="tab-container" v-if="tabIndex==2">
    <div class="wrapper">
        <div class="flex-column">
          <div class="flex-row" style="width:106px" @click="otherdateHoliday(sdate)" v-for="sdate in sdatesHoliday">
            <text class="text-day-week">{{sdate.week}}</text>
            <text class="text-day-date">{{sdate.show}}</text>
          </div>
        </div>
    </div> 
    <div class="info">
      <div  class='info-item' style="width:650px;" v-for="holiday in holidayItems">
        <text class="text-info">{{holiday.country}}</text>
        <text class="text-info">{{holiday.marketType}}</text>
        <text class="text-info">{{holiday.holidayReason}}</text>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped src='../css/sumslack.css' />
<style scoped>
  .filter-container {
    margin-left: 20px;
  }
  .info {
      flex:1;
      padding-left:40px;
      padding-right: 80px;
      width:650px;
    }
  .tab {
    margin-top:30px;
    text-align: center;
    width:750px;
    margin-bottom: 20px;
  }
  .tab-btns{
    justify-content: center;
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
    margin-left: 10px;
    margin-right: 10px;
  }
  .wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
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
    font-size:25px;
    color:#FFEBC8;
  }
  .selecteddate {
    background-color: #FF9200;
  }
  .selectedtoday {
    background-color: #608E2D;
  }
  .text-day-date{
    text-align: center;
    font-size:20px;
    color:#FFEBC8;
  }
 .info-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 5px;
      margin-bottom: 5px;
    }
</style>
<script>
  import { WxcButton, WxcCell } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");

  import refresher from './refresh.vue';
  import TabEventItem from './tab-event-item.vue';
  import TabEventFxItem from './tab-event-fx-item.vue';
  import util from './util';

  module.exports = {
    components: { WxcButton, WxcCell,refresher,TabEventItem,TabEventFxItem  },
    data: () => ({
      curholidaydate:"2018-05-01",
      curdate:"",
      todayvalue:"", //今日时间，格式2018-05-01
      curcountry:"",
      curshowcountry:"",
      curimportant:"",
      curdateEvent:"",
      curcountryEvent:"",
      curshowcountryEvent:"",
      curimportantEvent:"",
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
      ],
      eventItemsEvent:[
      ],
      holidayItems:[
      ],
      sdatesEvent:[
      ],
      sdatesHoliday:[
      ],
      sdates:[
      ]
    }),
    computed: {
    },
    created() {
      let self = this;
      this.todayvalue = Sumslack.getTool().dateFormat(new Date(),"yyyy-MM-dd");
      util.initIconFont();
      Sumslack.init("发现",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });

      Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxIndexEvent?startpubtime=&endpubtime=&importantstr=&country=",{
                    }).then(data => {
                      self.eventItems=data;
                      
                    });

      Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectWeekAbount?date=",{
                    }).then(data => {
                      self.sdates=data;
                      self.curdate=data[3].detaildate;
                    });
    },
    methods: {
      tabClick(index){
        this.tabIndex = index;
        let self = this;
        if(index==0){
          Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxIndexEvent?startpubtime="+self.curdate+"&endpubtime="+self.curdate+"&importantstr="+self.curimportant+"&country="+self.curcountry,{
                      }).then(data => {
                        self.eventItems=data;
                      });

          Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectWeekAbount?date="+self.curdate,{
                      }).then(data => {
                        self.sdates=data;
                        self.curdate=data[3].detaildate;
                      });
        }else if(index==1){
          Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxFinaevent?startpubtime="+self.curdateEvent+"&endpubtime="+self.curdateEvent+"&importantstr="+self.curimportant+"&country="+self.curcountry,{
                      }).then(data => {
                        self.eventItemsEvent=data;
                      });

          Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectWeekAbount?date="+self.curdateEvent,{
                      }).then(data => {
                        self.sdatesEvent=data;
                        self.curdateEvent=data[3].detaildate;
                      });
        }else{
          Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectHolidayInfo?date="+self.curholidaydate,{
                      }).then(data => {
                        self.holidayItems=data;
                      });

          Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectWeekAbount?date="+self.curholidaydate,{
                      }).then(data => {
                        self.sdatesHoliday=data;
                        self.curholidaydate=data[3].detaildate;
                      });
        }
      },
      collapseBar(){
         this.showFilter = !this.showFilter;
      },
      onSelect (res, {selectIndex, checked, checkedList}) {
        Vue.set(this, res, `本次选择的index：${selectIndex}\n是否选中：${checked ? '是' : '否'}\n选中列表：${checkedList.map(item => item.title).join(',')}`);
      },
      wxcEpSliderCurrentIndexSelected (e) {
        const index = e.currentIndex;
      },
      onloading () {
      },
      onloadmore () {

      },
      loadingDown(){

      },
      doDetail(item){
        //Sumslack.toast("goto page:"+item.title);
        Sumslack.navigateTo("fin.tab.event.detail",{a:11});
      },
      othercountry(country){
         
        let self = this;
        self.curshowcountry=country;
        self.curcountry=encodeURI(encodeURI(country));
        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxIndexEvent?startpubtime="+self.curdate+"&endpubtime="+self.curdate+"&importantstr="+self.curimportant+"&country="+self.curcountry,{
                    }).then(data => {
                      self.eventItems=data;
                    });
      },
      othercountryEvent(country){
         
        let self = this;
        self.curshowcountryEvent=country;

        self.curcountryEvent=encodeURI(encodeURI(country));
        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxFinaevent?startpubtime="+self.curdateEvent+"&endpubtime="+self.curdateEvent+"&importantstr="+self.curimportantEvent+"&country="+self.curcountryEvent,{
                    }).then(data => {
                      self.eventItemsEvent=data;
                    });
      },
      
      otherdate(sdate){
        let self = this;
        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxIndexEvent?startpubtime="+sdate.detaildate+"&endpubtime="+sdate.detaildate+"&importantstr="+self.curimportant+"&country="+self.curcountry,{
                    }).then(data => {
                      self.eventItems=data;
                    });

        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectWeekAbount?date="+sdate.detaildate,{
                    }).then(data => {
                      self.sdates=data;
                      self.curdate=data[3].detaildate;
                    });
      },
      otherdateHoliday(sdate){
        let self = this;
        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectHolidayInfo?date="+sdate.detaildate,{
                      }).then(data => {
                        self.holidayItems=data;
                      });

          Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectWeekAbount?date="+sdate.detaildate,{
                      }).then(data => {
                        self.sdatesHoliday=data;
                        self.curholidaydate=data[3].detaildate;
                      });
      },
      otherimportant(important){
        
        let self = this;
        self.curimportant=important;
        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxIndexEvent?startpubtime="+self.curdate+"&endpubtime="+self.curdate+"&importantstr="+self.curimportant+"&country="+self.curcountry,{
                    }).then(data => {
                      self.eventItems=data;
                      
                    });
      },
      
      otherdateEvent(sdate){
        let self = this;
        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxFinaevent?startpubtime="+sdate.detaildate+"&endpubtime="+sdate.detaildate+"&importantstr="+self.curimportant+"&country="+self.curcountry,{
                    }).then(data => {
                      self.eventItemsEvent=data;
                    });

        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectWeekAbount?date="+sdate.detaildate,{
                    }).then(data => {
                      self.sdatesEvent=data;
                      self.curdateEvent=data[3].detaildate;
                    });
      },
      otherimportantEvent(important){
        
        let self = this;
        self.curimportantEvent=important;
        Sumslack.request("http://192.168.1.169:9191/fxcalendar/selectFxFinaevent?startpubtime="+self.curdateEvent+"&endpubtime="+self.curdateEvent+"&importantstr="+self.curimportantEvent+"&country="+self.curcountryEvent,{
                    }).then(data => {
                      self.eventItemsEvent=data;
                      
                    });
      }
    }
  };
</script>
