<template>
  <div class="testPage">
    
    <div class="topSearch">
      <alpFormGroup :options="formConfig" :form_data="formData"/>
    </div>
    <div class="tableView">

    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import fromConfig from "../system/post/formConfig.js";

export default defineComponent({
  name: 'testPage',
  data: function(){
    return {
      formConfig: fromConfig.topForm,
      formData: {},
    }
  },
  setup() {
    
  },
})
</script>
<style lang="less">
.testPage{

}
</style>