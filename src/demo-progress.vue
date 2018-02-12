<template>
 <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo first-demo">
        <text class="demo-text">默认</text>
        <wxc-progress :bar-color="'#ff9200'" :value=10></wxc-progress>
      </div>
      <div class="demo">
        <text class="demo-text">设置value</text>
        <wxc-progress :value=50 :bar-width=600></wxc-progress>
      </div>
      <div class="btn"
           @click="uploadFile">
        <text class="btn-txt">进度测试</text>
      </div>
      <div class="up-demo"
           v-if="progressVisible">
        <text class="progress-text left">0%</text>
        <wxc-progress :value="value" :bar-color="'#193d37'" :bar-height="5"
                      :bar-width=540></wxc-progress>
        <text class="progress-text right">{{value}}%</text>
      </div>

    </scroller>  
  </div>
</template>

<script>
  import { WxcProgress } from 'weex-ui';
  module.exports = {
    components: { WxcProgress},
    data: () => ({
      value: 0,
      uploading: false,
      progressVisible: false,
      timer: null
    }),
    methods: {
      uploadFile () {
        if (!this.uploading) {
          this.value = 0;
          this.uploading = true;
          this.progressVisible = true;
          this.timer = setInterval(() => {
            if (this.value < 100) {
              this.value++
            } else {
              this.uploading = false;
              setTimeout(() => {
                this.progressVisible = false;
              }, 500)
              clearTimeout(this.timer);
            }
          }, 10);
        }
      }
    }
  };
</script>
<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    margin-bottom: 50px;
    padding-left: 75px;
  }
  .btn {
    width: 600px;
    height: 80px;
    margin-top: 60px;
    margin-bottom: 50px;
    margin-left: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #635147;
    border-color: #635147;
  }
  .up-demo {
    flex-direction: row;
    align-items: center;
    margin-left: 32px;
  }
  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }
  .progress-text {
    color: #333333;
    font-size: 30px;
  }
  .left {
    margin-right: 20px;
  }
  .right {
    margin-left: 20px;
  }
</style>