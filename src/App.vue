<template>
  <div id="app" :style="bgImg">
    <HelloWorld/>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
import backImg from './images/background.jpeg';
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return{
      bgImg: {
         backgroundImage: "url("+backImg+")"
      }
    }
  }
}
</script>

<style>
#app{
  height: 700px;
}
</style>
