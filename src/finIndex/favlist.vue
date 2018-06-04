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
  <cell :key="fav.favid" v-for="fav in lists">
  <wxc-cell 
      @wxcCellClicked="doCellClick(fav.id,fav.type)"  
      :cell-style="cellStyle"
      :has-arrow="false"
      :has-bottom-border="true"
      :has-margin="false">
    <div slot="label" v-if="mode=='edit'">
      <wxc-checkbox 
      class="wc"
      @wxcCheckBoxItemChecked="checkItemClick(fav.favid,$event)"
      :hasBottomBorder="false" 
      :checked="false"></wxc-checkbox>
    </div>            
    <text class="cell-label-text" slot="title">{{fav.shortName}}</text>
    <wxc-tag type="solid"
            slot="value"
            :tag-color="fav.type == 'B' ? '#aa5000':'#608E2D'"
            font-color="#ffffff"
            :value="fav.type == 'B' ? '债券':'宏观' "></wxc-tag>
  </wxc-cell>
  </cell>
</list>
</div>
</template>
<script>
  import { WxcButton, WxcCell, WxcMinibar,WxcTag,WxcCheckbox } from 'weex-ui';
  const Sumslack = require("../sumslack/js/sumslack.js");
  const HttpService = require("../sumslack/js/http-service.js");
  
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
      lists: [

      ],
      checkedList:{}
    }),
    created() {
      var that = this;
      Sumslack.init("收藏列表",[{"title":"刷新","href":"javascript:refreshPage"}],function(){
          Sumslack.addGlobalEventListener("refreshPage",function(){
              Sumslack.refresh();
          });
      });
      this.refreshList();
      
    },
    computed: {
      
    },
    methods: {
      minibarLeftButtonClick () {

      },
      doCellClick(_id,t){
        if(this.mode === 'view' && t === "B"){
          Sumslack.navigateTo("fin.detail.bond",{type:'b',id:_id});
        }else if(this.mode === 'view' && t === "M"){
          Sumslack.navigateTo("fin.detail.macro",{type:'m',id:_id});
        }
      },
      checkItemClick(favId,e){
        let _checked = e.checked;
        //Sumslack.alert(favId + ":" + _checked)
        this.checkedList[favId] = _checked;
      },
      switchMode(){
        var that = this;
        if(this.mode ==="edit"){
          var ids = "";
          Object.keys(this.checkedList).forEach(key => {
              if(this.checkedList[key]){
                  ids += "," + key;
              }
          });
          if(ids!="" && ids.length>1){
            ids = ids.substring(1,ids.length);
            HttpService.favRemove(ids).then(json => {
              if(json.res){
                Sumslack.alert("删除成功！");
                that.mode = (that.mode === 'view' ? 'edit':'view');
                that.refreshList();
              }else{
                Sumslack.alert("删除失败！");
              }
            })
          }else{
            that.mode = (that.mode === 'view' ? 'edit':'view');  
          }
        }else{
          that.mode = (that.mode === 'view' ? 'edit':'view');  
        }
        
      },
      refreshList(){
        var that = this;
        HttpService.favList(function(json){
          that.lists = json;
        });
      },
      fetch (event) {
          this.refreshList();
      }
    }
  };
</script>
<style src='../css/sumslack.css' />
<style scoped>
 .container {
    flex: 1;
  }
  .wc {
    background-color: transparent;
    
  }

  .cell-label-text {
    color:#fff;
  }
  wxc-cell {
    background: #0A0F0E;
    border-bottom-color:#193D37;
  }
</style>