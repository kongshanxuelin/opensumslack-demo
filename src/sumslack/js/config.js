module.exports = {
    "DEV":true,
    "pages":[
        {id:"page.index",url:"app.weex.js"},
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
        { id: "page.demo.form", url: "form/demo-form.weex.js" }    
        

    ],
    Config:{
        notSupport: "该接口或功能仅在OpenSumslack移动端中支持！",
        svrurl:"http://192.168.1.154:7080/"
    },
    getPageUrl:function(id){
        for(var i in this.pages){
            if(this.pages[i].id === id){
                if(this.DEV){
                    return this.pages[i].url;
                }else{
                    var _url = this.pages[i].url;
                    if(_url.endsWith(".weex.js")){
                        _url = _url.substring(0, _url.lastIndexOf(".weex")) + _url.substring(_url.lastIndexOf(".weex")+5,_url.length);
                    }
                    console.log("xxxx:",_url)
                    return _url;
                }
            }
        }
        return null;
    }
}