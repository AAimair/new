<template>
  <div class="tool-swagger">
    <iframe
      :src="docSrc"
      frameborder="0"
      :style="{
        width: '100%',
        height: containHeight + 'px'
      }"
    ></iframe>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'toolSwagger',
  data() {
    return {
      // 容器高度
      containHeight: 0,
    }
  },
  computed: {
    docSrc: function () {
      return this.$serverConfig.serverUrl + '/doc.html'
    }
  },
  mounted() {
    this.containHeight = document.body.querySelector('.tool-swagger')?.clientHeight;
  }
})
</script>

<style lang="less" scoped>
.tool-swagger {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}
</style>