<template>
<div class="wxc-demo">
    <scroller class="scroller">
      <wxc-cell :has-top-border="true"
                  :auto-accessible="false">
          <div class="form-row" slot="title">        
            <text>昵称：</text><input type="text" placeholder="输入昵称" class="nickname" />
          </div>
      </wxc-cell>
      <wxc-cell :has-top-border="true"
                  :auto-accessible="false" title="性别" @wxcCellClicked="showListSex">
          <text slot="value">{{sex}}</text>
      </wxc-cell>
      <wxc-cell :has-top-border="true"
                  :auto-accessible="false" title="出生日期" @wxcCellClicked="showListBirth">
          <text slot="value">{{birth}}</text>
      </wxc-cell>

      <wxc-cell :has-top-border="true"
                  :auto-accessible="false"
                  title="共享我的位置">
          <switch :checked="true"
                  slot="value"></switch>
      </wxc-cell>
      <wxc-cell :has-top-border="true"
                  :auto-accessible="false"
                  title="居住城市" @wxcCellClicked="showListCity">
          <text slot="value">{{city}}</text>
      </wxc-cell>
      <div class="demo">
          <text>兴趣爱好：</text>
          <wxc-grid-select
            :limit="3"
            :cols="4"
            :list="listIn">
          </wxc-grid-select>
      </div>    
      <div class="demo">
          <text>申请理由：</text>
          <textarea class="textarea" rows="4" placeholder="输入申请理由..."></textarea>
      </div>    
      <div class="demo-btn">
          <wxc-button text="注册新用户" type="red" @wxcButtonClicked="reg"></wxc-button>
      </div>
    </scroller>

    <wxc-city ref="wxcCity"
              :normal-list="normalList"
              :only-show-list="onlyShowList"
              :hot-list-config="hotListConfig"
              :city-location-config="cityLocationConfig"
              @wxcCityItemSelected="citySelect"
              @wxcCityOnInput="onCityInput"></wxc-city>
  </div>
</template>

<script>
  import { WxcCell,WxcRadio,WxcButton,WxcGridSelect,WxcCity   } from 'weex-ui';
  import * as Util from 'weex-ui/packages/wxc-city/util';
  import sourceData from '../city';
  const Sumslack = require("../sumslack/js/sumslack.js");
  const picker = weex.requireModule('picker')
  module.exports = {
    components: { WxcCell,WxcRadio,WxcButton,WxcGridSelect,WxcCity   },
    data: () => ({
      sex: '男',
      birth:'1985-01-01',

      sourceData,
      location: '定位中',
      city:'宁波',
      onlyShowList: false,
      hotCityType: 'list',
      locationCityType: 'list',
      
      listSex:["男","女"],
      listIn:[{title:"工作"},{title:"爬山"},{title:"跑步"}],
      showCancel: true,
      isDisabled: true
    }),
    created() {
      Sumslack.init("新用户注册表单",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
            Sumslack.addGlobalEventListener("refreshPage",function(){
                Sumslack.refresh();
            });
      });
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
    methods: {
      showListCity(e){
        this.hotCityType = 'list';
        this.locationCityType = 'list';
        this.$refs['wxcCity'].show();
      },
      citySelect (e) {
        this.city = e.item.cityName;
      },
      onCityInput(e){
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
      showListSex(e){
        picker.pick({
          value: this.sex,
          index:0,
          items:this.listSex
        }, event => {
          if (event.result === 'success') {
            this.sex = this.listSex[event.data];
          }
        })
      },
      showListBirth(e){
        picker.pickDate({
          value: this.birth
        }, event => {
          if (event.result === 'success') {
            this.birth = event.data
          }
        })
      },
      reg(e){
        Sumslack.alert("注册新用户...");
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
  .textarea {
    font-size: 35px;
    width: 700px;
    padding: 20px;
    color:#666666;
    border-width: 1px;
    border-style: solid;
    border-collapse: #41B883;
    placeholder-color:#C1DFD2;
  }
  .scroller {
    flex: 1;
  }
  .nickname {
    width:700px;
  }
  .form-row {
    display:flex;
    flex-direction: row;
    width: 750px;
  }
  .wrapper {
    background-color: #FFFFFF;
  }
  .demo {
    padding-top: 24px;
    padding-right: 24px;
    padding-left: 24px;
    background-color: #F6F9F8;
  }
  .demo-btn {
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
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
  .list-intri {
    display: flex;
    flex-direction: column;
    height: 450px;
  }
</style>