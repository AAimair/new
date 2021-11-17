<template>
  <div class="systemDeptPage">
    <a-row :gutter="10">
      <a-col :span="6">
        <div class="treeView">
          <div class="search">
            <a-input-search v-model:value="searchTreeKey" placeholder="关键字" />
          </div>
          <div class="tree">
            <a-tree
              :blockNode="true"
              :showIcon="false"
              :showLine="true"
              :replaceFields="treeField"
              size="small"
              :expandedKeys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :tree-data="treeData"
              @expand="onTreeExpand"
              @select="selTreeNode"
            >
              <template #switcherIcon><down-outlined /></template>
              <template #title="scope">
                <a-dropdown :trigger="['contextmenu']">
                  <span v-if="scope.deptName.indexOf(searchTreeKey) > -1">
                    {{scope.deptName.substr(0, scope.deptName.indexOf(searchTreeKey))}}<span style="color: #f50">{{ searchTreeKey }}</span>{{scope.deptName.substr(scope.deptName.indexOf(searchTreeKey) + searchTreeKey.length)}}
                  </span>
                  <span v-else>{{ scope.deptName }}</span>

                  <template #overlay>
                    <a-menu size="small" @click="({ key: menuKey }) => treeNodeContextMenuClick(scope, menuKey)">
                      <a-menu-item key="add">添加</a-menu-item>
                      <a-menu-item key="del">删除</a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
            </a-tree>
          </div>
        </div>
      </a-col>
      <a-col :span="18">
        <div class="mainView">

        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'systemPostPage',
  data: function(){
    return {
      expandedKeys: [],
      searchTreeKey: '',
      autoExpandParent: true,
      treeData: [],
      oneDimData: [],
      treeField: {
        children: 'children', 
        title: 'deptName', 
        key: 'deptId',
      },
    }
  },
  watch: {
    searchTreeKey: function(val){
      const expanded = <Array<any>>[];
      this.oneDimData.forEach(item => {
          if (item.deptName.indexOf(val) > -1) {
            expanded.push(item.deptId);
          }
      });
      this.expandedKeys = expanded;
      this.searchTreeKey = val;
      this.autoExpandParent = true;
    },
  },
  methods: {
    // 获取部门树
    getDeptTree: function(){
      this.$axios.get('/system/dept/list').then(res => {
        console.log(res)
        if(res.data.code == 200){
          var treeData = this.parseTreeData(res.data.data);
          this.treeData = treeData;
          this.oneDimData = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(err => {
        this.$message.error('服务器异常');
      });
    },
    // 解析树结构
    parseTreeData: function(data) {
      var res = <any>[], map = {};
      if(Array.isArray(data)){
        data.sort((a,b) => a.deptId - b.deptId);
        data.forEach(one => {
          var template = {
            ...one,
            children: [],
          };
          if(!map[one.parentId]){
            res.push(template);

          }else{
            map[one.parentId].children.push(template);
          }

          if(!map[one.deptId]){
            map[one.deptId] = template;
          }
        });
      }
      return res;
    },
    // 展开树节点
    onTreeExpand: function(keys){
      this.expandedKeys = keys;
      this.autoExpandParent = false;
    },
    // 树节点右键菜单
    treeNodeContextMenuClick: function(data, menuKey) {
      console.log(data, menuKey)
    },
    // 选中树节点
    selTreeNode: function(nodeKey) {
      var targetNodeData = null;
      for(var i=0;i<this.oneDimData.length;i++){
        var one = this.oneDimData[i];
        if(one.deptId == nodeKey){
          targetNodeData = one;
          break;
        }
      }
      console.log(targetNodeData);
      if(targetNodeData){
        
      }
    }
  },
  created: function() {
    // 获取部门树
    this.getDeptTree();
  },
  setup() {
    
  },
})
</script>
<style lang="less">
.systemDeptPage{
  height: 100%;
  overflow: hidden;
  >.ant-row{
    height: 100%;
    >.ant-col{
      height: 100%;
      background-color: #eee;
      >.treeView,
      >.mainView{
        padding: 20px;
        background-color: #fff;
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>