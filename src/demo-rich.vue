<template>
  <div class="wxc-demo">
    
     <div class="special-rich">
       <wxc-rich-text :config-list="configList"
                   @wxcRichTextLinkClick="wxcRichTextLinkClick"></wxc-rich-text>
       <wxc-special-rich-text style="margin-top:15px" :config-list="specialConfigList"></wxc-special-rich-text>
     </div>
  </div>
</template>

<script>
  import { WxcRichText,WxcSpecialRichText } from 'weex-ui';
  module.exports = {
    components: { WxcRichText, WxcSpecialRichText },
    data: () => ({
      configList: [{
        type: 'icon',
        src: 'https://gw.alicdn.com/tfs/TB1RRVWQXXXXXasXpXXXXXXXXXX-24-22.png',
        style: {
          height: 22
        }
      }, {
        type: 'text',
        value: '黄色主题',
        theme: 'yellow'
      }, {
        type: 'link',
        value: '自定义颜色link',
        href: '//www.baidu.com',
        style: {
          color: '#546E7A'
        }
      },{
        type: 'tag',
        value: '一个Tag',
        theme: 'red'
      }, {
        type: 'tag',
        value: '自定义标签',
        style: {
          fontSize: 26,
          color: '#ffffff',
          borderColor: '#3d3d3d',
          backgroundColor: '#546E7A',
          height: 36
        }
      }],
      specialConfigList: [
        {
          type: 'tag',
          value: 'OpenSumslack',
          style: {
            fontSize: 24,
            color: '#3D3D3D',
            borderColor: '#FFC900',
            backgroundColor: '#FFC900',
            borderRadius: 14,
          }
        },
        {
          type: 'text',
          value: '开源的基于Weex容器的移动端解决方案，内置三方注册/登录/聊天等基础服务',
          theme: 'black',
          style: {
            fontSize: 28
          }
        }
      ],
    }),
    methods: {
      wxcRichTextLinkClick () {}
    }
  };
</script>

<style scoped>
  .wxc-demo {
    height:250px;
    margin-top:20px;
    background-color: #FFFFFF;
    border-width: 0px;
    border-color: #0a0f0e;
    border-style: solid;
  }
 
  .special-rich {
    margin-top: 14px;
    margin-left: 5px;
    margin-right: 5px;
    padding:0px 20px;
  }

</style>