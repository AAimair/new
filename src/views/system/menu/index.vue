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
                  <a-menu-item v-if="scope.menuType=='M'" key="addDirectory">添加同级目录</a-menu-item>
                  <a-menu-item v-if="scope.menuType=='M'" key="addSubMenu">添加子级菜单</a-menu-item>
                  <a-menu-item v-if="scope.menuType=='C'" key="addSameMenu">添加同级菜单</a-menu-item>
                  <a-menu-item key="del">删除</a-menu-item>
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
        <div class="tit">{{formTitMap[formType]}}</div>
        <alpFormGroup
          ref="menuForm"
          :options="form"
          :form_data="formData"
          :key="formUpdataKey"
        >
          <template #menuTree>
            <div class="menuTree">
              <div class="label">上级菜单</div>
              <div class="setInput" :class="{ err: formParentIdErr }">
                <a-select
                  v-model:value="formParentId"
                  size="small"
                  style="width: 100%"
                  :disabled="menuType=='M'"
                  @change="checkDeptParentId"
                >
                  <a-select-option v-for="opt in showDirectoryOpt" :key="opt.value" :value="opt.value">{{opt.label}}</a-select-option>
                </a-select>
                <span class="errMsg">上级菜单不能为空</span>
              </div>
            </div>
          </template>
          <template #icon>
            <div class="group">
              <div class="label">菜单图标</div>
              <div class="setInput">
                <a-select
                  v-model:value="menuIcon"
                  size="small"
                  style="width: 100%"
                >
                  <a-select-option v-for="opt in iconOpt" :key="opt.value" :value="opt.value">
                    <div class="iconOpt">
                      <component :is="dynamicIcon(opt.value)" /><span class="text">{{opt.label}}</span>
                    </div>
                  </a-select-option>
                </a-select>
              </div>
            </div>
          </template>
          <template #pic>
            <div class="group">
              <div class="label">{{menuType=='M'?'目录大图':'模块标志'}}</div>
              <div class="setInput">
                <a-radio-group :key="formUpdataKey" v-if="menuType=='M'" v-model:value="menuComponent">
                  <ul class="modulePics">
                    <li v-for="(pic,idx) in modulePics" :key="idx" @click="menuComponent=idx">
                      <div class="img"><img :src="pic"></div>
                      <a-radio :value="idx"></a-radio>
                    </li>
                  </ul>
                </a-radio-group>
                <a-input v-else v-model:value="menuComponent" placeholder="平台-Icon图标名称" />
              </div>
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
import { modulePics } from "@/config/navConfig";
import * as AntdIcon from "@ant-design/icons-vue";
// antd  图标
const iconOpt = <Array<any>>[];
for(var k in AntdIcon){
  if(['createFromIconfontCN', 'default', 'setTwoToneColor', 'getTwoToneColor'].indexOf(k) == -1){
    iconOpt.push({
      label: k,
      value: k
    })
  }
}

// 部门表单配置
import formConfig from "./formConfig.js";

export default defineComponent({
  name: "systemPostPage",
  data: function () {
    return {
      majorKey: 'menuId',

      iconOpt: iconOpt,
      modulePics: modulePics,
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
      // 菜单目标下拉选项
      directoryOpt: [],
      showDirectoryOpt: [],
      formParentIdErr: false,
      form: formConfig.mainForm,
      formData: {},
      formParentId: "",
      menuType: '',
      menuIcon: '',
      menuComponent: '',
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
        remark_link: undefined,
        status: "0",
        visible: "0",
      },
      formType: 0,  //  0 没有选取部门数据    1 新增目录   2 修改目录   3 新增菜单   4 修改菜单  
      formTitMap: {
        1: '新增目录',
        2: '修改目录',
        3: '新增菜单',
        4: '修改菜单',
      },
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
    // 动态加载 antd icon
    dynamicIcon: function (icon) {
      // console.log(icon);
      return AntdIcon[icon] || "";
    },
    // 获取部门树
    getDeptTree: function () {
      this.$axios
        .get("/system/menu/list")
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            var treeData = this.parseTreeData(res.data.data, this.majorKey);
            this.treeData = treeData;
            this.oneDimData = res.data.data.filter(o => o.menuType!='F');
            this.expandedKeys = this.oneDimData.map(o => o[this.majorKey]);
            this.directoryOpt = treeData.map(o => {
              return {
                label: o.menuName,
                value: o.menuId,
                ...o
              }
            });
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
          if(['M', 'C'].indexOf(one.menuType)!=-1){
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
      // console.log(this.form)
      switch(menuKey){
        case 'addDirectory':
          // 添加同级目录
          this.formType=1;
          // 菜单类型
          this.menuType = 'M';
          // 菜单图标
          this.menuIcon = '';
          // 上级菜单选中ID
          this.formParentId = '0';
          // 目录大图/菜单展示标志
          this.menuComponent = '';
          // 设置表单项配置
          // icon
          this.form.form[2].hidden = false;
          // pic
          this.form.form[3].hidden = false;
          this.form.form[3].span = 21;
          // 目录描述
          this.form.form[6].hidden = false;
          // 模块关键字
          this.form.form[9].rule[0].required = false;
          // 其他隐藏
          for(var i=7;i<12;i++){
            this.form.form[i].hidden = true;
          }
          // 上级菜单 下拉列表
          this.showDirectoryOpt = [{
            label: '根目录',
            value: '0'
          }];
          // 初始化表单数据
          for(var k in this.formTemplate){
            this.formData[k] = {
              value: k=='menuType'?'M':this.formTemplate[k]
            }
          }
          this.formUpdataKey++;
          break;
        case 'addSubMenu':
          // 添加子级菜单
          this.formType=3;
          // 菜单类型
          this.menuType = 'C';
          // 菜单图标
          this.menuIcon = '';
          // 上级菜单选中ID
          this.formParentId = data.menuId;
          // 目录大图/菜单展示标志
          this.menuComponent = '';
          // 设置表单项配置
          // icon
          this.form.form[2].hidden = true;
          // pic
          this.form.form[3].hidden = false;
          this.form.form[3].span = 12;
          // 目录描述
          this.form.form[6].hidden = true;
          // 模块关键字
          this.form.form[9].rule[0].required = true;
          // 其他隐藏
          for(var i=7;i<12;i++){
            this.form.form[i].hidden = false;
          }
          // 外链地址
          this.form.form[8].hidden = true;
          // 上级菜单 下拉列表
          this.showDirectoryOpt = JSON.parse(JSON.stringify(this.directoryOpt));
          // 初始化表单数据
          for(var k in this.formTemplate){
            this.formData[k] = {
              value: k=='menuType'?'C':this.formTemplate[k]
            }
          }
          this.formUpdataKey++;
          break;
        case 'addSameMenu':
          // 添加同级菜单 
          this.formType=3;
          // 菜单类型
          this.menuType = 'C';
          // 菜单图标
          this.menuIcon = '';
          // 上级菜单选中ID
          this.formParentId = data.parentId;
          // 目录大图/菜单展示标志
          this.menuComponent = '';
          // 设置表单项配置
          // icon
          this.form.form[2].hidden = true;
          // pic
          this.form.form[3].hidden = false;
          this.form.form[3].span = 12;
          // 目录描述
          this.form.form[6].hidden = true;
          // 模块关键字
          this.form.form[9].rule[0].required = true;
          // 其他隐藏
          for(var i=7;i<12;i++){
            this.form.form[i].hidden = false;
          }
          // 外链地址
          this.form.form[8].hidden = true;
          // 上级菜单 下拉列表
          this.showDirectoryOpt = JSON.parse(JSON.stringify(this.directoryOpt));
          // 初始化表单数据
          for(var k in this.formTemplate){
            this.formData[k] = {
              value: k=='menuType'?'C':this.formTemplate[k]
            }
          }
          this.formUpdataKey++;
          this.$forceUpdate();
          break;
        case 'del':
          // 删除
          var that = this;
          this.$confirm({
            title: () => "删除",
            icon: () => createVNode(AntdIcon.ExclamationCircleOutlined),
            content: () => "确定要删除吗？",
            onOk() {
              return new Promise((resolve) => {
                that.genInterface("delete", data[that.majorKey])
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      that.getDeptTree();
                      that.formType = 0;
                      that.selDept.lenght = 0;
                      that.formData = {};
                      that.formParentId = '';
                      that.formParentIdErr = false;
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
          break;
      }
    },
    // 选中树节点
    selTreeNode: function (nodeKey) {
      var targetNodeData: any = null;
      this.formParentIdErr = false;
      for (var i = 0; i < this.oneDimData.length; i++) {
        var one = this.oneDimData[i];
        if (one[this.majorKey] == nodeKey) {
          targetNodeData = one;
          break;
        }
      }
      if (targetNodeData) {
        for(var k in this.formTemplate){
          this.formData[k] = {
            value: targetNodeData[k] || this.formTemplate[k]
          }
        }
        // 外链地址
        this.formData['remark_link'] = targetNodeData.remark||'';
        this.menuType = targetNodeData.menuType;
        this.menuIcon = targetNodeData.icon;
        this.menuComponent = targetNodeData.component;
        if(targetNodeData.menuType == 'M'){
          this.formType=2;
          // 目录
          this.formParentId = '0';

          // icon
          this.form.form[2].hidden = false;
          // pic
          this.form.form[3].hidden = false;
          this.form.form[3].span = 21;
          // 目录描述
          this.form.form[6].hidden = true;
          // 模块关键字
          this.form.form[9].rule[0].required = false;
          // 其他隐藏
          for(var i=7;i<12;i++){
            this.form.form[i].hidden = true;
          }
          this.showDirectoryOpt = [{
            label: '根目录',
            value: '0'
          }];

        }else if(targetNodeData.menuType == 'C'){
          this.formType = 4;
          // icon
          this.form.form[2].hidden = true;
          // pic
          this.form.form[3].hidden = false;
          this.form.form[3].span = 12;

          // 目录描述
          this.form.form[6].hidden = true;
          // 模块关键字
          this.form.form[9].rule[0].required = true;
          // 其他隐藏
          for(var i=7;i<12;i++){
            this.form.form[i].hidden = false;
          }
          // 外链地址
          this.form.form[8].hidden = targetNodeData.isFrame=='0'?false:true;
          this.showDirectoryOpt = JSON.parse(JSON.stringify(this.directoryOpt));

          // 菜单
          this.formParentId = targetNodeData.parentId;
          // alpIcon:
          this.menuComponent = /^alpIcon:/ig.test(targetNodeData.component)?''+targetNodeData.component.substr(9):'';
        }
        this.formUpdataKey++;
      }
    },
    // 检验父级表单项的父级ID
    checkDeptParentId: function () {
      this.formParentIdErr = typeof this.formParentId == "undefined" ||
        this.formParentId === "";
      if(this.formParentId){
        this.selDept[0] = this.formParentId;
      }
      return this.formParentIdErr;
    },
    // 菜单类型 变更
    menuTypeChange: function(data){
      // console.log(data)
      switch(data.value){
        case 'M':
          // icon
          data.form[2].hidden = false;
          // pic
          data.form[3].hidden = false;
          data.form[3].span = 21;
          // 目录描述
          data.form[6].hidden = false;
          // 模块关键字
          data.formRules.path[0].required = false;
          // 其他隐藏
          for(var i=7;i<12;i++){
            data.form[i].hidden = true;
          }
          
          this.showDirectoryOpt = [{
            label: '根目录',
            value: '0'
          }];
          this.menuComponent = "";
          this.formParentId = '0';
          this.menuType = 'M';
          this.formType = this.formType==4?2:1;
          break;
        case 'C':
          // icon
          data.form[2].hidden = true;
          // pic
          data.form[3].hidden = false;
          data.form[3].span = 12;

          // 目录描述
          data.form[6].hidden = true;
          // 模块关键字
          data.formRules.path[0].required = true;
          // 其他隐藏
          for(var i=7;i<12;i++){
            data.form[i].hidden = false;
          }
          // 外链地址
          data.form[8].hidden = data.formData.isFrame=='0'?false:true;

          this.showDirectoryOpt = JSON.parse(JSON.stringify(this.directoryOpt));
          this.formParentId = '';
          this.menuComponent = "";
          this.menuType = 'C';
          this.formType = this.formType==2?4:3;
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
      var form = this.$refs["menuForm"];
      // 校验表单数据
      form.formValidation().then((res) => {
        if (res.state) {
          var params = {
            ...this.formTemplate
          };

          if(this.checkDeptParentId()){
            // 未选取上级目录
            return;
          };
          // 合并表单项内容
          params = Object.assign(params, res.form);
          switch(this.formType){
            case 1:
            case 2:
              // parentId
              params.parentId = this.formParentId;
              // icon
              params.icon = this.menuIcon;
              // pic  -> component
              params.component = this.menuComponent;
              break;
            case 3:
            case 4:
              // parentId
              params.parentId = this.formParentId;
              // icon
              params.icon = '';
              // pic  -> component
              params.component = this.menuComponent?('alpIcon:'+this.menuComponent):'';
              // remark  -> remark_link
              params.remark = params.remark_link;
              break;
          };

          var loading = this.$loading({
            background: "rgba(0,0,0,0.0)",
            size: 166,
            iconColor: "#00678C",
          });
          this.genInterface(this.formType%2?'add':'edit', params)
            .then((requestRes) => {
              loading.close();
              if (requestRes.data.code == 200) {
                this.$message.success(
                  this.formType%2? "添加成功" : "保存成功"
                );
                // 获取部门树
                this.getDeptTree();
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
    // console.log(formConfig)
    // 绑定菜单类型  变更回调方法
    formConfig.mainForm.form[0].change = this.menuTypeChange;
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

      
      .group {
        margin-bottom: 20px;
        > .label {
          float: left;
          padding-right: 10px;
          width: 70px;
          height: 32px;
          line-height: 32px;
          text-align: right;
          color: rgba(0, 0, 0, 0.85);
          font-size: 12px;
        }
        > .setInput {
          line-height: 32px;
          margin-left: 70px;
          > .control {
            margin-bottom: 5px;
            height: 32px;
            line-height: 32px;
          }

          > .tree {
            border: 1px solid #ddd;
            height: 200px;
            overflow: auto;
          }

          .modulePics{
            overflow: hidden;
            >li{
              float: left;
              margin: 0 10px 10px 0;
              text-align: center;
              user-select: none;
              cursor: pointer;
              >.img{
                margin-bottom: 5px;
                width: 200px;
                height: 110px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                >img{
                  display: block;
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}

.iconOpt{
  // height: 30px;
  // line-height: 30px;
  font-size: 16px;
  color: #333;
  >.text{
    margin-left: 10px;
  }
}
</style>