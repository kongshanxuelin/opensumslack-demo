<template>
 <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <text class="text">无配置:</text>
        <wxc-stepper></wxc-stepper>
      </div>
      <div class="demo">
        <text class="text">{min:2,max:10,step:2,defaultValue:4}</text>
        <wxc-stepper :default-value="value"
                     step="2"
                     max="10"
                     min="2"
                     @wxcStepperValueIsMinOver="wxcStepperValueIsMinOver"
                     @wxcStepperValueIsMaxOver="wxcStepperValueIsMaxOver"
                     @wxcStepperValueChanged="wxcStepperValueChanged"></wxc-stepper>
      </div>
      <div class="demo">
        <text class="text">禁用</text>
        <wxc-stepper :default-value="4"
                     step="2"
                     max="10"
                     min="2"
                     :disabled="isDisabled"></wxc-stepper>
      </div>

      <div class="demo">
        <text class="text">input只读:</text>
        <wxc-stepper :read-only="isOnlyRead"></wxc-stepper>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcButton, WxcStepper  } from 'weex-ui';
  module.exports = {
    components: { WxcButton, WxcStepper  },
    data: () => ({
      value: 4,
      isDisabled: true,
      isOnlyRead: true
    }),
    mounted(){
      setTimeout(()=>{
        this.value=10;
      },2000)
    },
    methods: {
      wxcStepperValueChanged (e) {
        console.log(e.value);
      },
      wxcStepperValueIsMaxOver () {
        modal.toast({
          message: '超过最大值啦'
        })
      },
      wxcStepperValueIsMinOver () {
        modal.toast({
          message: '超过最小值啦'
        })
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
    background-color: #FFFFFF;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    width: 750px;
    align-items: flex-start;
    padding-top: 60px;
    padding-left: 60px;
  }
  .text {
    margin-bottom: 30px;
  }
</style>