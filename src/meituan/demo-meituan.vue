<template>
<wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
               
    <div class="item-container" :style="contentStyle">
      <scroller class="scroller">
        <!-- Search Bar -->
          <div class="searchbar">
            <wxc-searchbar class="searchbar"
                          placeholder="老娘舅快餐"></wxc-searchbar>
          </div>
          <!-- Banner-->
          <div class="banner">
            <slider class="slider" interval="3000" auto-play="true">
              <div class="frame" :key="img.src" v-for="img in bannerList">
                <image class="image" resize="cover" :src="img.src"></image>
              </div>
            </slider>
          </div>
          <!-- 分类 -->
          <div class="types">
            <div class="types-item" @click="toList" v-for="item in types"
                        :key="item.ico">
              <image class="image-types" :src="item.ico" resize="stretch"></image>
              <text class="types-item-text">{{ item.txt }}</text>
            </div>
          </div>
          <!-- 中间Slider-->
          <div class="banner2">
            <image class="image2" resize="stretch" src="http://wxapps.sumslack.com/test/meituan/b.gif"></image>
          </div>

          <!-- 分割线 -->
          <div class="line">
            <text class="line-text">—  猜你喜欢  —</text>
          </div>
          <!-- 列表 -->
          <div class="list-container" :style="{height:250*6}">
            <list class="list">
              <cell v-for="(demo,key) in [1,2,3,4,5,6]"
                    class="cell"
                    :key="key">
                <wxc-pan-item :ext-id="'1-' + (key)" @wxcPanItemPan="wxcPanItemPan">
                  <mt-item :image="'http://wxapps.sumslack.com/test/meituan/'+(key%5)+'.png'"
                            :title="'必胜客餐厅'+key"
                            :desc="desc"
                            :tags="tags"
                            price="666"
                            price-desc="已售58笔"></mt-item>
                </wxc-pan-item>
              </cell>
            </list>
          </div>
      </scroller>
    </div>
    <div class="item-container" style="justify-content:center;" :style="contentStyle"><text class="text-center">附近</text></div>
    <div class="item-container" style="justify-content:center;"  :style="contentStyle"><text class="text-center">发现</text></div>
    <div class="item-container" style="justify-content:center;" :style="contentStyle"><text class="text-center">订单</text></div>
    <div class="item-container" style="justify-content:center;" :style="contentStyle"><text class="text-center">我的</text></div>
</wxc-tab-bar>               
</template>

<script>
  import { WxcCell,WxcSearchbar,WxcTabBar,WxcPanItem, Utils } from 'weex-ui';
  //列表Item
  import MtItem from './item.vue';
  const Sumslack = require("../sumslack/js/sumslack.js");
  export default {
    components: { WxcCell,WxcSearchbar,WxcTabBar,MtItem,WxcPanItem},
    created () {
      const tabPageHeight = Utils.env.getPageHeight();
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
    },
    data: () => ({
      desc: [{
        type: 'text',
        value: '[海曙区高鑫广场]单人晚市自助餐',
        theme: 'gray'
      }],
      tags: [{
        type: 'tag',
        value: '6.9折',
        theme: 'yellow',
        style:{
          fontSize: 26,
          color: '#FF0000',
          backgroundColor:'#FFEEEE',
          borderColor: '#FFFFEE',
          borderRadius:8,
          height:45
        }
      }],
      cellStyle: {
        backgroundColor: '#f2f3f4'
      },
      tabTitles: [
      {
        title: '首页',
        icon: 'http://wxapps.sumslack.com/test/meituan/tab/home.png',
        activeIcon: 'http://wxapps.sumslack.com/test/meituan/tab/home-active.png',
      },
      {
        title: '附近',
        icon: 'http://wxapps.sumslack.com/test/meituan/tab/near.png',
        activeIcon: 'http://wxapps.sumslack.com/test/meituan/tab/near-active.png'
      },
      {
        title: '发现',
        icon: 'http://wxapps.sumslack.com/test/meituan/tab/discover.png',
        activeIcon: 'http://wxapps.sumslack.com/test/meituan/tab/discover-active.png'
      },
      {
        title: '订单',
        icon: 'http://wxapps.sumslack.com/test/meituan/tab/order.png',
        activeIcon: 'http://wxapps.sumslack.com/test/meituan/tab/order-active.png'
      },
      {
        title: '我的',
        icon: 'http://wxapps.sumslack.com/test/meituan/tab/my.png',
        activeIcon: 'http://wxapps.sumslack.com/test/meituan/tab/my-active.png'
      }],
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
        textPaddingLeft: 10,
        textPaddingRight: 10
      },
      contentStyle:"",
      bannerList:[
        {src:'http://wxapps.sumslack.com/test/meituan/b1.png'},
        {src:'http://wxapps.sumslack.com/test/meituan/b2.jpg'},
        {src:'http://wxapps.sumslack.com/test/meituan/33.jpg'}
      ],
      types: [
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/meishi.jpg'),
          txt: '美食'
        },
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/maoyan.jpg'),
          txt: '电影/演出'
        },
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/jiudian.jpg'),
          txt: '酒店住宿'
        },
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/ktv.jpg'),
          txt: '休闲娱乐'
        },
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/waimai.jpg'),
          txt: '外卖'
        },
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/ktv.jpg'),
          txt: 'KTV'
        },
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/jipiao.jpg'),
          txt: '机票/火车票'
        },
        {
          ico: ('http://wxapps.sumslack.com/test/meituan/types/kuaican.jpg'),
          txt: '快餐'
        }
      ]
    }),
    methods: {
      wxcPanItemPan (e) {
        
      },
      wxcTabBarCurrentTabSelected (e) {
        const index = e.page;
        // console.log(index);
      },
      wxcCellClicked (e) {
        Sumslack.toast('Cell Clicked')
      },
      toList (item) {
        Sumslack.toast('goto list')
      }
    }
  };
</script>
<style scoped>
  .scroller {
    width: 750px;
    border-width: 0px;
  }
  .item-container {
    width: 750px;
  }
  .container {
    flex: 1;
  }
  .image {
    width: 750px;
    height: 140px;
  }
  .image2 {
    width: 750px;
    height: 250px;
  }
  .banner {
    width: 750px;
    height: 140px;
  }
  
  .banner2 {
    width: 750px;
    height: 250px;
  }
  .slider {
    border-width: 0px;
    border-style: solid;
    border-color: #41B883;
  }
  .frame {
    width: 750px;
    position: relative;
  }
  .searchbar {
    display: flex;
    flex-direction: row;
  }
  .types {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width:750px;
    padding-bottom: 20px;
    background-color: #fff;
  }
  .types-item {
    float: left;
    width: 187px;
    padding-top: 14px;
  }
  .image-types {
      display: block;
      width: 120px;
      height: 120px;
      text-align: center;
      margin: 0 28px;
      
  }
  .types-item-text {
      display: block;
      text-align: center;
      color: #2f2f2f;
      margin-top: 12px;
      font-size:25px;
  }
  .text-center {
    text-align: center;
    font-size:50px;
    color:orange;
  }
  .list-image {
    width: 200px;
    height: 200px;
    margin-right: 20px;
  }
  .line {
    padding-top:30px;
    padding-bottom: 30px;
    width:750px;
    height:100px;
  }
  .line-text {
    width:750px;
    display: block;
    text-align: center;
    font-size:30px;
    color:#AAAAAA;
  }
  .list-container {
    width: 750px;
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
</style>