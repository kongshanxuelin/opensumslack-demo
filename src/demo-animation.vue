<template>
  <div class="wrapper">
    <div ref="test" @click="move" class="box"></div>
  </div>
</template>

<script>
const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')

  export default {
    methods: {
      move () {
        var testEl = this.$refs.test;
        animation.transition(testEl, {
          styles: {
            color: '#FF0000',
            backgroundColor:'#CCCCCC',
            transform: 'translate(250px, 100px)',
            transformOrigin: 'center center',
            opacity: 0.6
          },
          duration: 800, //ms
          timingFunction: 'ease-out',
          delay: 0 //ms
        }, () => {
          animation.transition(testEl, {
            styles: {
              color: '#00FF00',
              backgroundColor:'#ff9200',
              opacity: 1,
              transform: 'translate(0, 0)',
            },
            duration: 800, //ms
            timingFunction: 'ease-in',
            delay: 500 //ms
          },() =>{
            modal.toast({ message: 'animation finished.' })  
          })
          
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 250px;
    height: 250px;
    background-color: #ff9200;
  }
</style>