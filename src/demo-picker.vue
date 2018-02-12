<template>
  <div class="wxc-demo">
    <scroller class="scroller">

      <div class="btn" @click="showListDate">
        <text class="btn-txt">日期选择</text>
      </div>
      <div class="btn" @click="showListDate2">
        <text class="btn-txt">单程日期</text>
      </div>
      <div class="btn" @click="showListDate3">
        <text class="btn-txt">往返日期</text>
      </div>
      <div class="btn" @click="showListTime">
        <text class="btn-txt">时间选择</text>
      </div>
      <div class="btn" @click="showListNormal">
        <text class="btn-txt">选项选择</text>
      </div>
      <div class="panel">
        <text class="text">选择的值: {{value}}{{currentDate}}</text>
      </div>

      <text class="title">城市选择</text>
      <div class="btn" @click="showListCity">
        <text class="btn-txt">列 城市选择</text>
      </div>

      <div class="btn btn-margin yellow" @click="showGroupCity">
        <text class="btn-txt">组 城市选择</text>
      </div>

      <div class="panel">
        <text v-if="currentCity" class="text">当前城市: {{currentCity}} </text>
      </div>

      

    </scroller>
    <wxc-city ref="wxcCity"
              :normal-list="normalList"
              :only-show-list="onlyShowList"
              :hot-list-config="hotListConfig"
              :city-location-config="cityLocationConfig"
              @wxcCityItemSelected="citySelect"
              @wxcCityOnInput="onInput"></wxc-city>

    <wxc-page-calendar ref="wxcPageCalendar"
                         :date-range="dateRange"
                         :selected-date="selectedDate"
                         :selected-note="selectedNote"
                         :is-range="isRange"
                         :needDestroy="false"
                         :minibar-cfg="minibarCfg"
                         :desc-list="descList"
                         @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                         @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
    ></wxc-page-calendar>          
  </div>
</template>

<script>
  import { WxcButton, WxcCell,WxcCity,WxcPageCalendar  } from 'weex-ui';
  import * as Util from 'weex-ui/packages/wxc-city/util';
  const Sumslack = require("./sumslack/js/sumslack.js");
  const picker = weex.requireModule('picker')
  import sourceData from './city';
  module.exports = {
    components: { WxcButton, WxcCell,WxcCity,WxcPageCalendar  },
    data: () => ({
      currentCity: '',
      sourceData,
      hotCityType: 'list',
      locationCityType: 'list',
      onlyShowList: false,
      location: '定位中',
      value: '',

      currentDate: '',
      selectedDate: ['2017-12-20', '2017-12-30'],
      isRange: true,
      calendarTitle: '选择日期',
      dateRange: ['2017-08-01', '2018-07-30'],
      selectedNote: ['出发', '到达', '往返'],
      minibarCfg: {
        title: '日期选择'
      },
      descList: [
        { date: '2017-08-23', value: '￥200' },
        { date: '2017-09-24', value: '￥200' },
        { date: '2017-09-25', value: '￥200' },
        { date: '2017-09-26', value: '￥200' },
        { date: '2017-09-27', value: '￥222' },
        { date: '2017-10-28', value: '￥341' },
        { date: '2017-11-29', value: '￥230' },
        { date: '2017-12-06', value: '￥2000', emphasize: true }
      ]
    }),
    created () {
      this.defaultSourceData = sourceData;
    },
    computed: {
      // 城市数据
      normalList () {
        return Util.getCities(this.sourceData.cities)
      },
      hotListConfig () {
        return {
          type: this.hotCityType,
          title: '热门',
          list: Util.getCities(this.sourceData.hotCity)
        }
      },
      cityLocationConfig () {
        return {
          type: this.locationCityType,
          title: '定位',
          list: [
            { name: this.location, isLocation: true }
          ]
        }
      }
    },
    mounted () {
      // 模拟定位
      setTimeout(() => {
        this.location = '宁波';
      }, 500);
    },
    methods: {
      showListCity () {
        this.hotCityType = 'list';
        this.locationCityType = 'list';
        this.$refs['wxcCity'].show();
      },
      showGroupCity () {
        this.hotCityType = 'group';
        this.locationCityType = 'group';
        this.$refs['wxcCity'].show();
      },
      citySelect (e) {
        this.currentCity = e.item;
      },
      onInput (e) {
        const { cities } = this.defaultSourceData;
        const { value } = e;
        if (value !== '' && cities && cities.length > 0) {
          const queryData = Util.query(cities, String(value).trim());
          this.sourceData = {
            cities: queryData,
            hotCity: []
          };
          this.onlyShowList = true;
        } else {
          this.sourceData = this.defaultSourceData;
          this.onlyShowList = false;
          }
      },
      showListDate(e){
        picker.pickDate({
          value: this.value
        }, event => {
          if (event.result === 'success') {
            this.value = event.data
          }
        })
      },
      showListTime(e){
        picker.pickTime({
          value: this.value
        }, event => {
          if (event.result === 'success') {
            this.value = event.data
          }
        })
      },
      showListNormal(e){
        picker.pick({
          value: this.value,
          index:0,
          items:["a","b","c"]
        }, event => {
          if (event.result === 'success') {
            this.value = event.data
          }
        })
      },

      wxcPageCalendarDateSelected (e) {
        this.selectedDate = e.date;
        this.currentDate = e.date;
      },
      wxcPageCalendarBackClicked () {
        Sumslack.toast('你按了返回按钮')
      },

      showListDate2(e){
        this.isRange = false;
        setTimeout(() => {
          this.$refs['wxcPageCalendar'].show();
        }, 1);
      },
      showListDate3(e){
        this.isRange = true;
        setTimeout(() => {
          this.$refs['wxcPageCalendar'].show();
        }, 1);
      }
      
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
    background-color: #FFFFFF;
  }
  .scroller {
    flex: 1;
  }
  .btn {
    width: 600px;
    height: 80px;
    margin-left: 75px;
    margin-top: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgb(92, 184, 92);
    border-color: rgb(76, 174, 76);
  }
  .text {
    font-size: 32px;
  }
  .yellow {
    background-color: #ffc300;
    border-color: #ffc300;
  }
  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }
  .btn-margin {
    margin-top: 40px;
  }
  .panel {
    align-items: center;
    margin-top: 10px;
  }
  .title {
    margin-top:30px;
  }
</style>