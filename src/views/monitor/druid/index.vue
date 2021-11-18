<template>
  <div class="druid-page">
    <iframe
      v-if="containHeight !== 0"
      :src="httpsSrc"
      frameborder="0"
      :style="{
        width: '100%',
        height: containHeight + 'px'
      }"
    ></iframe>
  </div>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: 'monitorDruid',
  data() {
    return {
      // 容器高度
      containHeight: 0,
    }
  },
  computed: {
    httpsSrc:function () {
      return this.$serverConfig.serverUrl + '/druid/login.html'
    }
  },
  mounted() {
    this.containHeight = document.body.querySelector(".druid-page").clientHeight;
  }
})
</script>

<style lang="less" scoped>
.druid-page{
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
</style>