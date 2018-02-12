<template>
  <div class="wxc-demo">
    <div class="tag-list">
      <wxc-tag v-for="(item,index) in demoData"
              :key="index"
              v-bind="item"></wxc-tag>
    </div>

    <div class="tip-detail">
      type:solid/hollow/special/image,value:文字标签文案,tag-color:标签颜色,font-color:文字颜色,special-icon:特殊标签的小icon,img:图标标签的图片地址
    </div> 
  </div>
</template>

<script>
  import { WxcTag } from 'weex-ui';
  module.exports = {
    components: { WxcTag },
    data: () => ({
      demoData:[
        {
          type: 'solid',
          tagColor: '#ff5000',
          fontColor: '#ffffff',
          value: '实心标签'
        },{
          type: 'hollow',
          tagColor: '#666666',
          fontColor: '#666666',
          value: '空心标签'
        },{
          type: 'special',
          tagColor: '#FF5000',
          fontColor: '#FF5000',
          specialIcon: '//gtms02.alicdn.com/tfs/TB1gC.jRVXXXXaiXFXXXXXXXXXX-32-32.png',
          value: '特殊标签'
        },{
          type: 'image',
          img: '//gtms04.alicdn.com/tfs/TB1ZfodRVXXXXciXFXXXXXXXXXX-92-24.png'
        }
      ]
    }),
    methods: {

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
    background-color: #ffffff;
  }
  .tag-list {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 40px;
    padding-right: 24px;
    padding-left: 24px;
    padding-bottom: 60px;
  }
</style>