[![QQ](http://pub.idqqimg.com/wpa/images/group.png)](https://jq.qq.com/?_wv=1027&k=5HWgxBZ)

## 项目简介

OpenSumslack支持的接口Demo程序

- 整合weex-ui（官方weex）；
- OpenSumslack扩展的js接口，包含网络，地理坐标，存储，电话，聊天，注册登录，多媒体等众多API；
- 一些实例；

### 运行项目

weex src --entry src/index.vue

### 打包项目

weex compile src/*.vue dist
weex compile src/** dist

### 效果图

<img src='http://wxapps.sumslack.com/demo2/preview.png' alt='我的'/>

使用WeexPlayground扫描预览效果：
<img src='http://wxapps.sumslack.com/demo2/demo.png' alt='扫描二维码预览效果'/>

### 常见问题
npm rebuild node-sass --force
端口被占用：
netstat -aon | findstr 8082  
taskkill /f -pid xxx