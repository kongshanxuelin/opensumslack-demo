<template>
    <div>
    <wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
        <div class="item-container" :style="contentStyle">
          <scroller class="scroller">
            <div class="header">
                <image :src="logoUrl" class="logo"></image>
                <text class="title">以下演示Weex提供的UI能力，基于WeexUI版本基础上修改，展现了常用组件</text>
            </div>
            <div class="container">                
              <text class="tip" @click="showApiList('showApiListUI')">基础UI</text>
              <div v-if="showApiListUI " :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListUI">
                  <text class="api-item-text">{{api.title}}</text>
                  <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
              </div>
              <text class="tip" @click="showApiList('showApiListComplexUI')">复合UI</text>
              <div v-if="showApiListComplexUI " :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListComplexUI">
                  <text class="api-item-text">{{api.title}}</text>
                  <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
              </div>
              <text class="tip" @click="showApiList('showApiFormUI')">表单组件</text>
              <div v-if="showApiFormUI " :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListFormUI">
                  <text class="api-item-text">{{api.title}}</text>
                  <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
              </div>
            </div>
          </scroller>
      </div>
      <div class="item-container" :style="contentStyle">
        <scroller class="scroller">
          <div class="header">
              <image :src="logoUrl" class="logo"></image>
              <text class="title">以下演示Sumslack小程序开放接口能力，自定义Weex组件，底层接口封装等；</text>
          </div>
          <div class="container">

            <text class="tip" @click="showApiList('showApiListLogin')">登录相关</text>
            <div v-if="showApiListLogin" :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListLogin">
                <text class="api-item-text">{{api.title}}</text>
                <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
            </div>

            <text class="tip" @click="showApiList('showApiListDevice')">设备</text>
            <div v-if="showApiListDevice" :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListDevice">
                <text class="api-item-text">{{api.title}}</text>
                <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
            </div>

            <text class="tip" @click="showApiList('showApiListNet')">网络</text>
            <div v-if="showApiListNet" :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListNet">
                <text class="api-item-text">{{api.title}}</text>
                <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
            </div>      

            <text class="tip" @click="showApiList('showApiListMedia')">媒体</text>
            <div v-if="showApiListMedia" :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListMedia">
                <text class="api-item-text">{{api.title}}</text>
                <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
            </div>

            <text class="tip" @click="showApiList('showApiListLocation')">位置</text>
            <div v-if="showApiListLocation" :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListLocation">
                <text class="api-item-text">{{api.title}}</text>
                <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
            </div>

            <text class="tip" @click="showApiList('showApiListData')">数据</text>
            <div v-if="showApiListData" class="api-item" @click="callApi(900,api)">
                <text class="api-item-text">离线存取</text>
                <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
            </div>

            <text class="tip" @click="showApiList('showApiListSumslack')">SumslackUI</text>
            <div v-if="showApiListSumslack" :key="api.id" class="api-item" @click="callApi(api.id,api)"  v-for="api in apiListSumslack">
                <text class="api-item-text">{{api.title}}</text>
                <image class="logo32" src="http://h5.sumslack.com/wx/right-arrow.png"></image>
            </div>

          </div>
        </scroller>
      </div>
      <div class="item-container" :style="contentStyle">
        <scroller class="scroller">
          <div class="header">
              <image :src="logoUrl" class="logo"></image>
              <text class="title">结合Weex和OpenSumslack接口，高仿实现几个常用的综合实例</text>
          </div>
          <div class="container">
            <wxc-cell title="复杂表单"
                desc="展现了复杂表单的效果"
                :has-arrow="true"
                @wxcCellClicked="callApi('form',{pageid:'page.demo.form'})"
                :has-top-border="true"></wxc-cell>
            <wxc-cell title="仿美团首页"
                desc="仿美团首页"
                :has-arrow="true"
                @wxcCellClicked="callApi('meituan',{pageid:'page.demo.meituan'})"
                :has-top-border="true"></wxc-cell>
            <wxc-cell title="语音视频Demo"
                desc="语音视频类使用Demo"
                :has-arrow="true"
                @wxcCellClicked="callApi('weixin',{pageid:'page.demo.weixin'})"
                :has-top-border="true"></wxc-cell>
            <wxc-cell title="一个商城例子"
                desc="展现了超多内容的一个商城例子，代码来自官方"
                :has-arrow="true"
                @wxcCellClicked="callApi('xiaomi',{pageid:'page.demo.xiaomi'})"
                :has-top-border="true"></wxc-cell>
          </div>
        </scroller>
      </div>       
    </wxc-tab-bar>

    <wxc-loading :show="isShowLoading"
                 :type="'default'"
                 :loading-text="loadingText"
                 :interval="0"></wxc-loading>
    </div>
</template>
<style scoped>
  .scroller {
    width: 750px;
    border-width: 0px;
  }
.item-container {
    width: 750px;
  }
.header{
    margin-top:20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.container{
    display: flex;
    flex-direction: column;

}
.api-item{
    display:flex;
    flex-direction: row;
    align-content: space-between;
    height:80px;
    line-height: 80px;

}
.api-item-text {
    padding-left: 15px;
    height:80px;
    line-height: 80px;
    color:darkgreen;
    font-size: 30px;
    flex:1;
}
.logo32{
    width: 32px;
    height: 32px;
    margin-top:24px;
}
.logo{
    width: 120px;
    height: 120px;
    text-align: center;
    align-items: center;
}
.title {
    color:darkgrey;
    padding:20px;
}
.tip {
    padding-left: 15px;
    margin-bottom: 10px;
    margin-top:10px;
    justify-content: center;
    background-color: #FFFFFF;
    height:80px;
    line-height: 80px;
    color:#000;
    font-size: 30px;
    font-weight: bold;
    background-image:linear-gradient(to top,#71a43a,#7ed321);
}
.panel {
    padding-left: 15px;
    margin-top: 2px;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
}
.text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
}
</style>

<script>
import { WxcMinibar,WxcIcon,WxcTabBar,WxcCell,WxcLoading, WxcPartLoading,Utils  } from 'weex-ui';
const config = require("./sumslack/js/config.js");
const Sumslack = require("./sumslack/js/sumslack.js");

var _token = "";
export default {
    components: { WxcMinibar,WxcIcon,WxcTabBar,WxcCell,WxcLoading, WxcPartLoading    },
    data () {
        return {
          loadingText:'请稍候...',
          isShowLoading:false,
          tabTitles: [
            {
              title: 'WeexUI',
              icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
              activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png',
            },
            {
              title: '扩展接口',
              icon: 'http://h5.sumslack.com/logo57.png',
              activeIcon: 'http://h5.sumslack.com/logo57.png'
            },
            {
              title: '综合实例',
              icon: 'http://wxapps.sumslack.com/app/menu.png',
              activeIcon: 'http://wxapps.sumslack.com/app/menu-active.png'
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
            showApiListLogin:true,
            showApiListSumslack:true,
            showApiListUI:true,
            showApiListComplexUI:true,
            showApiFormUI:true,
            showApiListDevice:true,
            showApiListNet:true,
            showApiListMedia:true,
            showApiListLocation:true,
            showApiListData:true,
            imgurl:config.Config.imgurl,
            logoUrl: 'http://h5.sumslack.com/logo120.png',
            apiListLogin:[
                {id:1,title:"获取登录code码"},
                {id:3,title:"获取登录token，需解密"},
                {id:2,title:"获取当前用户信息"}
            ],
            apiListSumslack:[
                {id:30,title:"选择联系人 - selectContact"},
                {id:34,title:"打开联系人详情 - openProfile"},
                {id:31,title:"创建群"},
                {id:32,title:"发送聊天消息"},
                {id:33,title:"打开带输入框的新窗口"},
                {id:35,title:"日期时间选择Native - picker"}
            ],
            apiListDevice:[
                // {id:51,title:"获取手机网络状态"},
                // {id:52,title:"获取手机设备信息"},
                {id:53,title:"打电话 - makePhoneCall"},
                {id:54,title:"扫一扫 - scanQrCode"}
            ],
            apiListUI:[
                {id:100,title:"alert/confirm/prompt"},
                {id:103,title:"toast"},
                {id:104,title:"剪贴板操作"},
                {id:105,title:"动画",pageid:"page.demo.animation"},
                {id:106,title:"显示ActionSheet菜单"},
                {id:109,title:"设置页面标题"},
                {id:107,title:"页面跳转",pageid:"page.demo.animation"},
                {id:108,title:"页面跳转不返回"},
                {id:110,title:"关闭当前窗口"},
                {id:111,title:"打开Native界面"},
                {id:112,title:"右上角多级菜单"}
            ],
            apiListComplexUI:[
                {id:801,title:"富文本显示",pageid:"page.demo.rich"},
                {id:802,title:"简单流程图",pageid:"page.demo.simpleflow"},
                {id:803,title:"Tags",pageid:"page.demo.tags"},
                {id:804,title:"Loading",pageid:"page.demo.loading"},
                {id:805,title:"Mask",pageid:"page.demo.mask"},
                {id:806,title:"进度条",pageid:"page.demo.progress"},
                {id:807,title:"导航栏",pageid:"page.demo.navbar"},
                {id:808,title:"Tabs",pageid:"page.demo.tabs"},
                {id:809,title:"Swiper",pageid:"page.demo.swiper"},
                {id:810,title:"Cell",pageid:"page.demo.cell"},
                {id:811,title:"Slider",pageid:"page.demo.slider"},
                {id:812,title:"Result",pageid:"page.demo.result"}
            ],
            apiListFormUI:[
                {id:701,title:"Button",pageid:"page.demo.button"},
                {id:707,title:"输入框",pageid:"page.demo.input"},
                {id:702,title:"单复选",pageid:"page.demo.checkbox"},
                {id:703,title:"Picker",pageid:"page.demo.picker"},
                {id:704,title:"倒计时",pageid:"page.demo.countdown"},
                {id:705,title:"滑动输入条",pageid:"page.demo.sliderbar"},
                {id:706,title:"步进器",pageid:"page.demo.step"},
                {id:709,title:"grid-select",pageid:"page.demo.gridselect"}
            ],
            apiListNet:[
                {id:151,title:"发起网络Http请求"},
                {id:152,title:"上传文件"},
                {id:153,title:"下载文件"},
                {id:154,title:"分享功能"},
            ],
            apiListMedia:[
                {id:201,title:"拍照/相册选图片"},
                {id:202,title:"录音"},
                {id:203,title:"预览图片"},
            ],
            apiListLocation:[
                {id:251,title:"获取当前位置"}
            ],
            menuList:["编辑项目","删除项目","项目归档"]
        }
    },
    created() {
      const tabPageHeight = Utils.env.getPageHeight();
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
      Sumslack.init("Sumslack小程序演示",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
            Sumslack.addGlobalEventListener("refreshPage",function(){
                Sumslack.refresh();
            });
      });
    },
    methods: {
        wxcTabBarCurrentTabSelected (e) {
          const index = e.page;
          // console.log(index);
        },
        onshow(){
            var that = this;
            console.log("************page vewappear");
        },
        showApiList(vv){
            console.log('show api list: ',vv)
            this.showApiListLogin=false;
            this.showApiListSumslack=false;
            this.showApiListUI=false;
            this.showApiListComplexUI=false,
            this.showApiFormUI=false,
            this.showApiListDevice=false;
            this.showApiListNet=false;
            this.showApiListMedia=false;
            this.showApiListLocation=false;
            this.showApiListData=false;
            if(vv == "showApiListLogin"){
                this.showApiListLogin = true;
            }else if(vv == "showApiListSumslack"){
                this.showApiListSumslack = true;
            }else if(vv == "showApiListUI"){
                this.showApiListUI = true;
            }else if(vv == "showApiListDevice"){
                this.showApiListDevice = true;
            }else if(vv == "showApiListNet"){
                this.showApiListNet = true;
            }else if(vv == "showApiListMedia"){
                this.showApiListMedia = true;
            }else if(vv == "showApiListLocation"){
                this.showApiListLocation = true;
            }else if(vv == "showApiListData"){
                this.showApiListData = true;
            }else if(vv == "showApiListComplexUI"){
                this.showApiListComplexUI = true;
            }else if(vv == "showApiFormUI"){
                this.showApiFormUI = true;
            }
        },
        callApi(apiId,api){
            if(api && api.pageid && api.pageid!=""){
              Sumslack.navigateTo(api.pageid); 
              return;
            }
            var that = this;
            switch(apiId){
                case 1:
                    Sumslack.login(function(code){
                       Sumslack.alert(Sumslack.print(code));
                    });
                    break;
                case 2:
                    Sumslack.getUserInfo().then( data => {
                        Sumslack.alert(Sumslack.print(data));
                    });
                    break;
                case 3:
                    Sumslack.getToken(function(code){
                        Sumslack.alert(Sumslack.print(code));
                        _token = code;
                    });
                    break;
                case 30:
                    Sumslack.selectContact({"selectType":"1","selectTarget":"both"},function(ret){
                        Sumslack.alert(Sumslack.print(ret));
                    });
                    break;
                case 31:
                    Sumslack.createGroup({"name":"测试群","type":4,"userIDs":[1079]},function(ret){
                        Sumslack.alert(Sumslack.print(ret));
                    });
                    break;
                case 32:
                    Sumslack.sendMessage(1,1079,"test msg");
                    break;
                case 33:
                    Sumslack.navigateToEmojiPanel("page.demo.popup",function(res){
                        Sumslack.alert(Sumslack.print(res));
                    });
                    break;
                case 34:
                    Sumslack.openProfile(1065);
                    break;
                case 35:
                    Sumslack.picker("yyyyMMdd",{min:'',max:''},function(data){
                        Sumslack.alert(data);
                    });
                    break;
                case 53:
                    Sumslack.makePhoneCall('057482815326',function(ret){
                        console.log("make phone call: 057482815326")
                    });
                    break;
                case 54:
                    Sumslack.scanQrCode(function(ret){
                        console.log("scan")
                    });
                    break;
                case 100:
                    Sumslack.confirm("confirm ok?",function(ret){
                        Sumslack.alert(ret);
                        Sumslack.prompt("input value:",function(msg){
                            Sumslack.alert(JSON.stringify(msg));
                        });
                    });
                    break;
                case 103:
                    Sumslack.toast("hellow,sumslack!");
                    break;
                case 104:
                    Sumslack.setClipboardData("你好,Sumslack!");
                    setTimeout(function(){
                        Sumslack.getClipboardData(function(msg){
                            Sumslack.alert("剪贴板内容："+Sumslack.print(msg));
                        });
                    },1000);
                    break;
                case 106:
                    Sumslack.showActionSheet({"itemList":["菜单1","菜单2","菜单3"]},function(ret) {
                        Sumslack.alert(Sumslack.print(ret));
                    });
                    break;
                case 108:
                    Sumslack.redirectTo("page.demo.popup",{a:"test"});
                    break;
                case 109:
                    Sumslack.setTitle("新标题！");
                    break;
                case 110:
                    Sumslack.close();
                    break;
                case 111:
                    Sumslack.openNativeUI({"appId":60,"appCallbackLink":"native:quan"});
                    break;
                case 112:
                    Sumslack.layoutNaviBar({
                        title:"测试窗口名",
                        items:
                                [{title:"新页面",href:"http://www.baidu.com"}, {title:"更多",href:"javascript:doActionSheet"}]
                    });
                    Sumslack.addGlobalEventListener("doActionSheet",function(){
                        Sumslack.alert("hellow!");
                    });
                    break;
                case 151:
                    Sumslack.request("http://wx.sumslack.com/restful/stat/stat.jhtml",{
                        v:"qbapp"
                    }).then(data => {
                        Sumslack.alert('收到网络响应：' + Sumslack.print(data));
                    });
                    break;
                case 152:
                    Sumslack.chooseImage(1,0,function(res){
                        res = Sumslack.toJSON(res);
                        let _imgs = res.list;
                        if(_imgs && _imgs.length === 1){    
                            that.isShowLoading = true;
                            that.loadingText='正在上传...';
                            Sumslack.uploadImage(_imgs[0],function(result){
                                result = Sumslack.toJSON(result);
                                if(result.status === "success"){
                                    Sumslack.alert("上传成功："+Sumslack.print(result));
                                    that.isShowLoading = false;
                                }else if(result.status === "fail"){
                                    Sumslack.alert("上传失败："+Sumslack.print(result));
                                    that.isShowLoading = false;
                                }else{
                                    that.loadingText='已传' + Math.round(result.bytesWritten*100/result.totalSize) + '%';     
                                }
                            });
                        }
                    });
                    break;
                case 153:
                    Sumslack.downloadFile('http://wxapps.sumslack.com/demo2/index.js',function(res){
                        Sumslack.alert(Sumslack.print(res));
                    });
                    break;
                case 154:
                    Sumslack.share({
                        title:"基于Vue2的在线出试卷小系统，开源已发布",
                        url:"http://cxlh.iteye.com/blog/2399877",
                        logo:"http://dl2.iteye.com/upload/attachment/0127/8169/e08cb2f7-5793-3479-a6bc-e65ac490f3b1.png",
                        description:"一份在线面试的小系统,在线出卷，支持链接分享，小程序码扫描微信直接答题"
                    },function(res){
                      console.log('share:',res)
                    });
                    break;
                case 201:
                    Sumslack.chooseImage(5,0,function(res){
                        Sumslack.alert(Sumslack.print(res));
                    });
                    break;
                case 203:
                    Sumslack.previewImage({'current':'http://h5.sumslack.com/logo27.png','urls':[
                        'http://h5.sumslack.com/logo27.png',
                        'http://h5.sumslack.com/logo57.png',
                        'http://h5.sumslack.com/logo80.png'
                    ]});
                    break;
                case 900:
                    Sumslack.setStorage("k",{a:"你好",b:"Sumslack"},function(res){
                       Sumslack.alert("设置JSON对象："+Sumslack.print(res));
                       Sumslack.getStorage("k",function(result){
                           Sumslack.alert("读取key为k的数据："+Sumslack.print(result));
                        });
                    });
                    break;
                case 251:
                    Sumslack.getLocation(function(pos){
                       Sumslack.alert(Sumslack.print(pos));
                    });
                    break;
                default:
                    Sumslack.alert("接口编写中...");
            }
        }

    },
    init: function () {
        console.log('在初始化内部变量，并且添加了事件功能后被触发');
    },
    ready: function () {
        console.log('模板已经编译并且生成了 Virtual DOM 之后被触发');
    },
    destroyed: function () {
        console.log('在页面被销毁时调用');
    }
}
</script>
