<template>
  <div class="plan1Page">
    plan1.page
    <alpIcon :icon="'cmd3DPrinter24.svg'"/>
    <alpIcon type="svg" :icon="'cmd3DPrinter24.svg'"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'plan1Page',
  setup() {
    console.log('plan1Page')
    const data = {

    }

    return {
      ...data,
    }
  },
})
</script>
<style lang="less">
.plan1Page{
  height: 100%;

  svg{
    path{
      fill: #fff;
    }
  }
} 
</style>