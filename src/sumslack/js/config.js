module.exports = {
    "pages":[
        {id:"page.index",url:"index.weex.js"},
        {id:"page.demo.popup",url:"weexui.weex.js"},
        {id: "page.demo.animation", url:"demo-animation.js"},
        {id:"page.demo.rich",url:"demo-rich.weex.js"},
        {id: "page.demo.simpleflow", url:"demo-simpleflow.weex.js"},
        {id: "page.demo.tags", url: "demo-tags.weex.js" },

        { id: "page.demo.loading", url: "demo-loading.weex.js" },
        { id: "page.demo.mask", url: "demo-mask.weex.js" },
        { id: "page.demo.progress", url: "demo-progress.weex.js" },
        { id: "page.demo.navbar", url: "demo-navbar.weex.js" },
        { id: "page.demo.tabs", url: "demo-tabs.weex.js" },
        { id: "page.demo.swiper", url: "demo-swiper.weex.js" },
        { id: "page.demo.cell", url: "demo-cell.weex.js" },
        { id: "page.demo.slider", url: "demo-slider.weex.js" },
        { id: "page.demo.result", url: "demo-result.weex.js" },

        //Form
        { id: "page.demo.button", url: "demo-button.weex.js" },
        { id: "page.demo.input", url: "demo-input.weex.js" },
        { id: "page.demo.checkbox", url: "demo-checkbox.weex.js" },
        { id: "page.demo.picker", url: "demo-picker.weex.js" },
        { id: "page.demo.countdown", url: "demo-countdown.weex.js" },
        { id: "page.demo.sliderbar", url: "demo-sliderbar.weex.js" },
        { id: "page.demo.step", url: "demo-step.weex.js" },
        { id: "page.demo.gridselect", url: "demo-gridselect.weex.js" },

        //demo
        { id: "page.demo.meituan", url: "meituan/demo-meituan.weex.js" },
        { id: "page.demo.weixin", url: "weixin/demo-weixin.weex.js" },
        { id: "page.demo.xiaomi", url: "xiaomi/demo-xiaomi.weex.js" },
        { id: "page.demo.form", url: "form/demo-form.weex.js" },
        
        //fin-index project
        {
            id: "fin.index",
            url: "finIndex/index.weex.js"
        },
        {
            id: "fin.tab.event",
            url: "finIndex/tab-event.weex.js"
        },
        {
            id: "fin.tab.event.detail",
            url: "finIndex/tab-event-detail.weex.js"
        },
        {
            id: "fin.detail.bond",
            url: "finIndex/detail-bond.weex.js"
        },
        {
            id: "fin.detail.bond.compare",
            url: "finIndex/detail-bond-compare.weex.js"
        },
        {
            id: "fin.detail.macro",
            url: "finIndex/detail-macro.weex.js"
        },
        {
            id: "fin.favlist",
            url: "finIndex/favlist.weex.js"
        }

    ],
    Config:{
        "allowAnonymous":true, //应用是否允许匿名使用
        //"DEV": true,
        //模拟登陆用户，在dev=true时有效
        // testCode: "fb0e25752f27250ce114ccabe500de22",
        // testUser: {
        //     "avator": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKEyBhwVLiaRdhZajRkH6MCbQCfpzCLu3bhvRRJSoYXlDdJrm8t1A9TkXXH5YVkEz04jczOTpwpN3w/0",
        //     "company_id": "73",
        //     "company_name": "test",
        //     "nick": "空山雪林", "sex": "1",
        //     "token": "fb0e25752f27250ce114ccabe500de22", id: 1106, "uid": "1106", "isLogined": true
        // },
        notSupport: "该接口或功能仅在OpenSumslack移动端中支持！",
        svrurl:"http://192.168.1.154:7080/"
    },
    getPageUrl:function(id){
        for(var i in this.pages){
            if(this.pages[i].id === id){
                if(this.DEV){
                    return this.pages[i].url;
                }else{
                    var _url = this.pages[i].url + "";
                    if(_url.endsWith(".weex.js")){
                        _url = _url.substring(0, _url.lastIndexOf(".weex")) + _url.substring(_url.lastIndexOf(".weex")+5,_url.length);
                    }
                    return _url;
                }
            }
        }
        return null;
    }
}