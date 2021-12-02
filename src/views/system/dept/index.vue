<template>
  <div class="systemDeptPage">
    <div class="treeView">
      <div class="search">
        <a-input-search v-model:value="searchTreeKey" placeholder="关键字" />
      </div>
      <div class="tree">
        <a-tree
          v-if="treeData.length"
          :blockNode="true"
          :showIcon="false"
          :showLine="true"
          :replaceFields="treeField"
          size="small"
          v-model:selectedKeys="selDept"
          :expandedKeys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="treeData"
          @select="selTreeNode"
          @expand="onTreeExpand"
          :key="selDept[0]"
        >
          <template #switcherIcon><down-outlined /></template>
          <template #title="scope">
            <a-dropdown :trigger="['contextmenu']">
              <span v-if="scope.deptName.indexOf(searchTreeKey) > -1">
                {{
                  scope.deptName.substr(
                    0,
                    scope.deptName.indexOf(searchTreeKey)
                  )
                }}<span style="color: #f50">{{ searchTreeKey }}</span
                >{{
                  scope.deptName.substr(
                    scope.deptName.indexOf(searchTreeKey) + searchTreeKey.length
                  )
                }}
              </span>
              <span v-else>{{ scope.deptName }}</span>

              <template #overlay>
                <a-menu
                  size="small"
                  @click="
                    ({ key: menuKey }) =>
                      treeNodeContextMenuClick(scope, menuKey)
                  "
                >
                  <a-menu-item key="add">添加</a-menu-item>
                  <a-menu-item v-if="scope.parentId!=0 && scope.children.length==0" key="del">删除</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tree>
      </div>
    </div>
    <div class="mainView">
      <a-alert
        v-if="deptFormType==0"
        message="尚未指定一个部门"
        type="warning"
      />
      <div class="formView" v-else>
        <div class="tit">{{deptFormType==1?'新增部门':'修改部门'}}</div>
        <alpFormGroup
          ref="deptForm"
          :options="deptForm"
          :form_data="deptFormData"
          :key="formUpdataKey"
        >
          <template #deptTree>
            <div class="deptTree">
              <div class="label">上级部门</div>
              <div class="setInput" :class="{ err: deptFormParentIdErr }">
                <a-tree-select
                  v-model:value="deptFormParentId"
                  style="width: 100%"
                  show-search
                  allow-clear
                  tree-default-expand-all
                  :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
                  :tree-data="showDeptFormTree"
                  :replaceFields="treeField"
                  @change="checkDeptParentId"
                >
                </a-tree-select>
                <span class="errMsg">上级部门不能为空</span>
              </div>
            </div>
          </template>
          <template #formBtn>
            <div class="formBtn">
              <a-button
                type="primary"
                @click="submitDept('add')"
                style="margin-left: 70px"
                >保存</a-button
              >
            </div>
          </template>
        </alpFormGroup>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, createVNode, ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 部门表单配置
import deptFormConfig from "./formConfig.js";

export default defineComponent({
  name: "systemPostPage",
  data: function () {
    return {
      expandedKeys: [],
      searchTreeKey: "",
      autoExpandParent: true,
      treeData: [],
      oneDimData: [],
      treeField: {
        children: "children",
        title: "deptName",
        key: "deptId",
        value: "deptId",
      },
      selDept: [],
      // 上级部门下拉树
      deptFormTree: [],
      showDeptFormTree: [],
      deptFormParentId: "",
      deptFormParentIdErr: false,
      deptForm: deptFormConfig.mainForm,
      deptFormData: {},
      deptFormType: 0,  //  0 没有选取部门数据/1 新增数据/2  修改数据
      formUpdataKey: 1,
    };
  },
  watch: {
    searchTreeKey: function (val) {
      const expanded = <Array<any>>[];
      this.oneDimData.forEach((item) => {
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
    getDeptTree: function () {
      this.$axios
        .get("/system/dept/list")
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            var treeData = this.parseTreeData(res.data.data);
            this.treeData = treeData;
            this.oneDimData = res.data.data;
            this.expandedKeys = res.data.data.map(o => o.deptId);
            // 部门下拉树
            this.deptFormTree = treeData;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("服务器异常");
        });
    },
    // 解析树结构
    parseTreeData: function (data) {
      var res = <any>[],
        map = {};
      if (Array.isArray(data)) {
        data.sort((a, b) => a.deptId - b.deptId);
        data.forEach((one) => {
          var template = {
            ...one,
            children: [],
          };
          if (!map[one.parentId]) {
            res.push(template);
          } else {
            map[one.parentId].children.push(template);
          }

          if (!map[one.deptId]) {
            map[one.deptId] = template;
          }
        });
      }
      return res;
    },
    // 展开树节点
    onTreeExpand: function (keys) {
      // console.log(keys)
      this.expandedKeys = keys;
      this.autoExpandParent = false;
    },
    // 树节点右键菜单
    treeNodeContextMenuClick: function (data, menuKey) {
      // console.log("menu", data, menuKey);
      if (menuKey == "add") {
        this.selDept[0] = data.deptId;
        this.deptFormType = 1;
        this.deptFormParentIdErr = false;
        // 新增
        this.deptFormData = {
          status: {
            value: '0'
          }
        };
        var treeData = JSON.parse(JSON.stringify(this.deptFormTree));
        this.deptFormParentId = [data.deptId];
        this.showDeptFormTree = treeData;
        this.formUpdataKey++;
      } else if (menuKey == "del") {
        // 删除
        var that = this;
        this.$confirm({
          title: () => "删除",
          icon: () => createVNode(ExclamationCircleOutlined),
          content: () => "确定要删除吗？",
          onOk() {
            return new Promise((resolve) => {
              // 删除
              that.$axios.delete("/system/dept/"+data.deptId)
                .then((res) => {
                  resolve(true);
                  if (res.data.code == 200) {
                    that.selDept.lenght = 0;
                    that.getDeptTree();
                    
                    that.deptFormType = 0;
                    that.deptFormData = {};
                    that.deptFormParentId = '';
                    that.deptFormParentIdErr = false;
                    that.showDeptFormTree = [];
                    that.formUpdataKey++;

                  } else {
                    that.$message.error(res.data.msg);
                  }
                })
                .catch((err) => {
                  that.$message.error("服务器异常");
                  resolve(false);
                });
            });
          },
          onCancel() {},
        });
      }
    },
    // 选中树节点
    selTreeNode: function (nodeKey) {
      var targetNodeData: any = null;
      this.deptFormType = 2;
      this.deptFormParentIdErr = false;
      for (var i = 0; i < this.oneDimData.length; i++) {
        var one = this.oneDimData[i];
        if (one.deptId == nodeKey) {
          targetNodeData = one;
          break;
        }
      }
      this.deptFormData = {};
      // 全部部门树数据
      var treeData = JSON.parse(JSON.stringify(this.deptFormTree)),
        deptId = null;

      if (targetNodeData) {
        var formKeys = [
          "deptId",
          "parentId",
          "deptName",
          "orderNum",
          "leader",
          "phone",
          "email",
          "status",
        ];
        formKeys.forEach((k) => {
          this.deptFormData[k] = {
            value: targetNodeData[k],
          };
          if (k == "parentId") {
            this.deptFormParentId = targetNodeData[k];
          }
          if (k == "deptId") {
            deptId = targetNodeData[k];
          }
        });
        // 过滤部门下拉树
        var res = this.$common.recursiveSearch({
          data: treeData,
          recursiveKey: "children",
          searchKey: "deptId",
          searchVal: this.deptFormParentId,
        });
        if (res.result) {
          for (var i = res.data.children.length - 1; i >= 0; i--) {
            var one = res.data.children[i];
            if (one.deptId == deptId) {
              res.data.children.splice(i, 1);
            }
          }
        }
        // 可展示变更树
        this.showDeptFormTree = treeData;
        this.formUpdataKey++;
      }
    },

    // 检验父级表单项的父级ID
    checkDeptParentId: function () {
      this.deptFormParentIdErr =
        typeof this.deptFormParentId == "undefined" ||
        this.deptFormParentId === "";
      if(this.deptFormParentId){
        this.selDept[0] = this.deptFormParentId;
      }
      return this.deptFormParentIdErr;
    },

    // 提交部门保存
    submitDept: function () {
      var formTemplate = {
        deptId: undefined,
        parentId: this.deptFormParentId,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0",
      };

      // 验证
      if(this.checkDeptParentId()){
        return;
      }
      var formRef = this.$refs['deptForm'];
      formRef.formValidation().then(res => {
        if(res.state){
          var form = Object.assign(formTemplate, res.form);

          // 发送请求
          this.$axios[this.deptFormType == 1 ? "post" : "put"]("/system/dept", form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(this.deptFormType == 1?'添加成功': '修改成功');
                // 获取部门树
                this.getDeptTree();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error("服务器异常");
            });

        }
      });

    },
  },
  created: function () {
    // 获取部门树
    this.getDeptTree();
  },
});
</script>
<style lang="less">
.systemDeptPage {
  min-width: 1000px;
  height: 100%;
  overflow: hidden;
  background-color: #eee;

  > .treeView {
    padding: 10px;
    float: left;
    width: 300px;
    background-color: #fff;
    height: 100%;
    overflow: auto;
  }

  > .mainView {
    padding: 10px;
    margin-left: 310px;
    height: 100%;
    overflow: auto;
    background-color: #fff;
    
    > .formView {
      padding-top: 100px; 
      >.tit{
        padding-left: 19%;
        margin-bottom: 20px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        color: #333;
      }

      // 部门下拉树
      .deptTree {
        margin-bottom: 24px;
        > .label {
          float: left;
          padding-right: 10px;
          width: 70px;
          height: 32px;
          line-height: 32px;
          overflow: hidden;
          white-space: nowrap;
          text-align: right;
          vertical-align: middle;
          color: rgba(0, 0, 0, 0.85);
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          &:before {
            display: inline-block;
            margin-left: 2px;
            color: #ff4d4f;
            font-size: 12px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            content: "*";
            order: 1;
          }
        }
        > .setInput {
          margin-left: 70px;
          height: 32px;
          line-height: 32px;
          position: relative;
          > span.errMsg {
            display: none;
            position: absolute;
            top: 30px;
            left: 0;
            min-height: 24px;
            font-size: 12px;
            line-height: 24px;
            color: #ff4d4f;
          }

          &.err {
            .ant-select-selector {
              border-color: #ff4d4f;
            }
            > span.errMsg {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>