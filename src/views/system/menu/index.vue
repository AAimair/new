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
              <span v-if="scope.menuName.indexOf(searchTreeKey) > -1">
                {{
                  scope.menuName.substr(
                    0,
                    scope.menuName.indexOf(searchTreeKey)
                  )
                }}<span style="color: #f50">{{ searchTreeKey }}</span
                >{{
                  scope.menuName.substr(
                    scope.menuName.indexOf(searchTreeKey) + searchTreeKey.length
                  )
                }}
              </span>
              <span v-else>{{ scope.menuName }}</span>

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
        v-if="formType==0"
        message="尚未指定一个菜单"
        type="warning"
      />
      <div class="formView" v-else>
        <div class="tit">{{formType==1?'新增菜单':'修改菜单'}}</div>
        <alpFormGroup
          ref="deptForm"
          :options="form"
          :form_data="formData"
          :key="formUpdataKey"
        >
          <template #menuTree>
            <div class="menuTree">
              <div class="label">上级菜单</div>
              <div class="setInput" :class="{ err: formParentIdErr }">
                <a-tree-select
                  v-model:value="formParentId"
                  style="width: 100%"
                  show-search
                  allow-clear
                  tree-default-expand-all
                  :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
                  :tree-data="showformTree"
                  :replaceFields="treeField"
                  @change="checkDeptParentId"
                >
                </a-tree-select>
                <span class="errMsg">上级菜单不能为空</span>
              </div>
            </div>
          </template>
          <template #icon>
            <div>
              菜单图标
            </div>
          </template>
          <template #pic>
            <div>
              目录大图/模块展示图标
            </div>
          </template>
          <template #formBtn>
            <div class="formBtn">
              <a-button
                type="primary"
                @click="submitConfig(true)"
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
import formConfig from "./formConfig.js";

export default defineComponent({
  name: "systemPostPage",
  data: function () {
    return {
      majorKey: 'menuId',

      expandedKeys: [],
      searchTreeKey: "",
      autoExpandParent: true,
      treeData: [],
      oneDimData: [],
      treeField: {
        children: "children",
        title: "menuName",
        key: "menuId",
        value: "menuId",
      },
      selDept: [],
      // 上级部门下拉树
      showformTree: [{
        menuId: "0",
        menuName: "根目录",
        menuType: "M",
        parentId: null,
        parentName: null,
        status: "0",
        children: []
      }],
      formParentId: "",
      formParentIdErr: false,
      form: formConfig.mainForm,
      formData: {},
      formTemplate: {
        component: undefined,
        icon: undefined,
        isCache: "1",
        isFrame: "1",
        menuId: undefined,
        menuName: undefined,
        menuType: "M",  // M 目录  C 菜单  F 按钮/权限
        orderNum: undefined,
        params: undefined,
        parentId: "0",
        parentName: null,
        path: undefined,
        perms: undefined,
        query: undefined,
        remark: undefined,
        status: "0",
        visible: "0",
      },
      formType: 0,  //  0 没有选取部门数据/1 新增数据/2  修改数据
      formUpdataKey: 1,
    };
  },
  watch: {
    searchTreeKey: function (val) {
      const expanded = <Array<any>>[];
      this.oneDimData.forEach((item) => {
        if (item.menuName.indexOf(val) > -1) {
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
        .get("/system/menu/list")
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            var treeData = this.parseTreeData(res.data.data, this.majorKey);
            this.treeData = treeData;
            this.oneDimData = res.data.data;
            this.expandedKeys = res.data.data.map(o => o[this.majorKey]);
            // 部门下拉树
            // console.log(treeData);
            this.showformTree[0].children = treeData;
            // this.deptFormTree = treeData;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("服务器异常");
        });
    },
    // 解析树结构
    parseTreeData: function (data, major) {
      var res = <any>[],
        map = {};
      if (Array.isArray(data)) {
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

          if (!map[one[major]]) {
            map[one[major]] = template;
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
        this.selDept[0] = data[this.majorKey];
        this.formType = 1;
        this.formParentIdErr = false;
        // 新增
        this.formData = {};
        // var treeData = JSON.parse(JSON.stringify(this.treeData));
        // // this.showDeptFormTree = treeData;
        // this.showDeptFormTree.children = treeData;
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
              that.$axios.delete("/system/dept/"+data[this.majorKey])
                .then((res) => {
                  resolve(true);
                  if (res.data.code == 200) {
                    that.selDept.lenght = 0;
                    that.getDeptTree();
                    
                    that.formType = 0;
                    that.formData = {};
                    that.formParentId = '';
                    that.formParentIdErr = false;
                    // that.showDeptFormTree = [];
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
      this.formType = 2;
      this.formParentIdErr = false;
      for (var i = 0; i < this.oneDimData.length; i++) {
        var one = this.oneDimData[i];
        if (one[this.majorKey] == nodeKey) {
          targetNodeData = one;
          break;
        }
      }
      if (targetNodeData) {
        this.showformTree[0].children = this.treeData;

        for(var k in this.formTemplate){
          this.formData[k] = {
            value: targetNodeData[k] || this.formTemplate[k]
          }
        }

        // // 过滤部门下拉树
        // var res = this.$common.recursiveSearch({
        //   data: treeData,
        //   recursiveKey: "children",
        //   searchKey: this.majorKey,
        //   searchVal: this.deptFormParentId,
        // });
        // // 可展示变更树
        // this.showDeptFormTree.children = treeData;
        this.formUpdataKey++;
      }
    },

    // 检验父级表单项的父级ID
    checkDeptParentId: function () {
      this.formParentIdErr =
        typeof this.formParentId == "undefined" ||
        this.formParentId === "";
      if(this.formParentId){
        this.selDept[0] = this.formParentId;
      }
      return this.formParentIdErr;
    },

    // 菜单类型 变更
    menuTypeChange: function(data){
      console.log(data);
      switch(data.value){
        case 'M':
          // icon
          data.form[2].hidden = false;
          // pic
          data.form[3].hidden = false;
          // 是否外链
          data.form[6].hidden = true;
          // 其他隐藏
          for(var i=7;i<12;i++){
            data.form[i].hidden = true;
          }
          break;
        case 'C':
          // icon
          data.form[2].hidden = false;
          // pic
          data.form[3].hidden = false;
          // 是否外链
          data.form[6].hidden = false;
          // 其他隐藏
          for(var i=7;i<12;i++){
            data.form[i].hidden = false;
          }
          break;
        case 'F':
          break;
      }
    },

    // 新增/修改/删除/导出
    genInterface: function (type, data) {
      switch (type) {
        case 'get':
          // 获取菜单详情
          return this.$axios.get('/system/menu/'+data);
        case "add":
          // 新增
          return this.$axios.post("/system/menu", data);
        case "edit":
          // 修改
          return this.$axios.put("/system/menu", data);
        case "delete":
          //  删除
          return this.$axios.delete("/system/menu/" + data);
      }
    },

    // 表格数据  新增 / 修改
    submitConfig: function () {
      var form = this.$refs["rowForm"];
      // 校验表单数据
      form.formValidation().then((res) => {
        // console.log(res)
        if (res.state) {
          var queryParams = {
            ...this.formTemplate
          };
          // 合并表单项内容
          queryParams = Object.assign(queryParams, res.form);
          queryParams.deptId = this.deptId;
          queryParams.password = this.$md5(queryParams.password.trim());
          var loading = this.$loading({
            background: "rgba(0,0,0,0.0)",
            size: 166,
            iconColor: "#00678C",
          });
          this.genInterface(this.rowConfig.type, queryParams)
            .then((requestRes) => {
              loading.close();
              if (requestRes.data.code == 200) {
                // this.$message.success(
                //   this.rowConfig.type == "add" ? "添加成功" : "保存成功"
                // );
                // this.rowConfig.show = false;
                // var form = this.$refs["topForm"];
                // var data = form.getFormData().formData;
                // this.getList(data);
              } else {
                this.$message.error(requestRes.data.msg);
              }
            })
            .catch((err) => {
              loading.close();
              this.$message.error("服务器异常");
            });
        }
      });
    },
  },
  created: function () {
    console.log(formConfig)
    // 绑定菜单类型  变更回调方法
    formConfig.mainForm.form[1].change = this.menuTypeChange;
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
      padding: 50px 0; 
      >.tit{
        padding-left: 19%;
        margin-bottom: 20px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        color: #333;
      }

      // 部门下拉树
      .menuTree {
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

          &:before {
            display: inline-block;
            margin-right: 4px;
            color: #ff4d4f;
            font-size: 12px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            content: "*";
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