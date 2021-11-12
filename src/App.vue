<template>
  <!-- <a-spin :indicator="indicator" size="large" wrapperClassName="appLoading" :spinning="loadingProps">
    <div style="height: 100vh">
      <router-view />
    </div>
  </a-spin> -->
  <router-view />
</template>
<script lang="ts">
import { defineComponent, ref, h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  setup() {
    const data = {
      loadingProps: ref(false),
      indicator: h(LoadingOutlined, {
        style: {
          fontSize: "200px",
        },
        spin: true,
      }),
    };

    // // 全局loading
    // (window as any).$_alp.config.globalProperties.$loading = function(state){
    //   data.loadingProps.value = state;
    // };

    return {
      ...data,
    };
  },
});
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Segoe UI", "Open Sans", Arial, Helvetica, sans-serif;

  background-image: -webkit-gradient(
    radial,
    75% top,
    0,
    center top,
    258,
    color-stop(-100, #55a0b9),
    color-stop(40, #0077a1),
    color-stop(75, #006b91),
    color-stop(100, #006487)
  );
  background-image: -webkit-radial-gradient(
    75% top,
    ellipse farthest-side,
    #55a0b9 -100%,
    #0077a1 40%,
    #006b91 75%,
    #006487 100%
  );
  background-image: radial-gradient(
    ellipse farthest-side at 75% top,
    #55a0b9 -100%,
    #0077a1 40%,
    #006b91 75%,
    #006487 100%
  );
}
#app {
  height: 100%;
  // 设置局loading加载样式
  >.ant-spin-nested-loading{
    >div{
      >.ant-spin>.ant-spin-dot{
        margin: 0;
        top: 50vh;
        transform: translate(-50%, -50%);
      }
    }
    >.ant-spin-blur:before{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.5;
      content: "";
    }
    >.ant-spin-blur::after{
      background-color: #000;
      opacity: 0.9;
    }
  }
}
</style>
