<template>
<div class="wxc-demo">
<wxc-minibar title="收藏列表"
                       background-color="#193D37"
                       text-color="#F4E1C0"
                       :right-text="mode == 'view'?'编辑':'确认删除'"
                       @wxcMinibarRightButtonClicked="switchMode"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"></wxc-minibar>
  
<list class="list" @loadmore="fetch" loadmoreoffset="10">
  <cell :key="idx.id" v-for="idx in lists">
  <wxc-cell 
                :cell-style="cellStyle"
                :has-arrow="false"
                :has-bottom-border="true"
                :has-margin="false">
    <div slot="label" v-if="mode=='edit'">
      <wxc-checkbox class="wc" :checked="false"></wxc-checkbox>
    </div>            
    <text class="cell-label-text" slot="title">{{idx.title}}</text>
    <wxc-tag type="solid"
            slot="value"
            :tag-color="idx.t == 'B' ? '#aa5000':'#bb5000'"
            font-color="#ffffff"
            :value="idx.t == 'B' ? '债券':'宏观' "></wxc-tag>
  </wxc-cell>
  </cell>
</list>
 
     
 
</div>
</template>
<script>
  import { WxcButton, WxcCell, WxcMinibar,WxcTag,WxcCheckbox } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");
  module.exports = {
    components: { WxcButton, WxcCell, WxcMinibar,WxcTag,WxcCheckbox  },
    data: () => ({
      leftButton: 'https://gw.alicdn.com/tfs/TB1cAYsbv2H8KJjy0FcXXaDlFXa-30-53.png',
      cellStyle: {
        backgroundColor: '#172422',
        color:"#FFEBC8",
        borderBottomColor: '#193D37'
      },
      mode:'view', //view:浏览模式 edit:编辑模式，允许勾选删除
      lists: [{
        id:1,title:"指标1",t:"B"
      },{
        id:2,title:"指标2",t:"M"
      },{
        id:3,title:"指标3",t:"M"
      },{
        id:4,title:"指标4",t:"B"
      }]
    }),
    created() {
      Sumslack.init("收藏列表",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
    },
    computed: {
      
    },
    methods: {
      minibarLeftButtonClick () {

      },
      switchMode(){
        this.mode = (this.mode === 'view' ? 'edit':'view');
      },
      fetch (event) {
          const length = this.lists.length
          for (let i = length; i < length + 4; ++i) {
            this.lists.push({
              id:i,title:"指标"+i,t:"B"
            })
          }
      }
    }
  };
</script>
<style src='../css/sumslack.css' />
<style scoped>
  .wxc-demo {
    width: 750px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #0A0F0E;
  }
 .container {
    flex: 1;
  }
  .cell-label-text {
    color:#fff;
  }

</style>