<template>
  <a-modal 
    :title="title" 
    v-model:visible="show"
    width="1000px"  
    append-to-body 
    class="editPopup"
    >
    <template #footer>
      <a-button key="back" @click="submitConfig(false)">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        @click="submitConfig(true)"
        >保存</a-button
      >
    </template>
    <a-tabs v-if="show" v-model:activeKey="activeKey">
      <a-tab-pane 
        tab="基本信息"
        key="basic"
        :forceRender="true"
      >
        <alpFormGroup :key="updateKey" ref="basicForm" :options="basicForm" :form_data="basicFormData"/>
      </a-tab-pane>
      <a-tab-pane 
        tab="字段信息"
        key="field"
        :forceRender="true"
      >
        <a-table
          v-if="fieldTableLoading"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ y: 500, x: 'true'}"
          bordered
        >
          <template #index="scope">{{scope.index+1}}</template>
          <template #columnComment="scope">
            <a-input v-model:value="tableData[scope.index].columnComment"/>
          </template>
          <template #javaType="scope">
            <div class="tableSelect">
              <select
                v-model="tableData[scope.index].javaType"
                >
                <option value="Long">Long</option>
                <option value="String">String</option>
                <option value="Integer">Integer</option>
                <option value="Double">Double</option>
                <option value="BigDecimal">BigDecimal</option>
                <option value="Date">Date</option>
              </select>
              <span class="closeBtn" @click="tableData[scope.index].columnComment = ''"></span>
            </div>
            <!-- <a-select
              ref="select"
              size="small"
              v-model:value="tableData[scope.index].javaType"
              style="width: 100%"
            >
              <a-select-option value="Long">Long</a-select-option>
              <a-select-option value="String">String</a-select-option>
              <a-select-option value="Integer">Integer</a-select-option>
              <a-select-option value="Double">Double</a-select-option>
              <a-select-option value="BigDecimal">BigDecimal</a-select-option>
              <a-select-option value="Date">Date</a-select-option>
            </a-select> -->
          </template>
          <template #javaField="scope">
            <a-input v-model:value="tableData[scope.index].javaField"/>
          </template>
          <template #isInsert="scope">
            <a-checkbox v-model:checked="tableData[scope.index].isInsert" value="1"></a-checkbox>
          </template>
          <template #isEdit="scope">
            <a-checkbox v-model:checked="tableData[scope.index].isEdit" value="1"></a-checkbox>
          </template>
          <template #isList="scope">
            <a-checkbox v-model:checked="tableData[scope.index].isList" value="1"></a-checkbox>
          </template>
          <template #isQuery="scope">
            <a-checkbox v-model:checked="tableData[scope.index].isQuery" value="1"></a-checkbox>
          </template>
          <template #queryType="scope">
            <div class="tableSelect">
              <select
                v-model="tableData[scope.index].queryType"
                >
                <option value="EQ">=</option>
                <option value="NE">!=</option>
                <option value="GT">&gt;</option>
                <option value="GTE">&gt;=</option>
                <option value="LT">&lt;</option>
                <option value="LTE">&lt;=</option>
                <option value="LIKE">LIKE</option>
                <option value="BETWEEN">BETWEEN</option>
              </select>
              <span class="closeBtn" @click="tableData[scope.index].queryType = ''"></span>
            </div>
            <!-- <a-select
              ref="select"
              size="small"
              v-model:value="tableData[scope.index].queryType"
              style="width: 100%"
            >
              <a-select-option value="EQ">=</a-select-option>
              <a-select-option value="NE">!=</a-select-option>
              <a-select-option value="GT">&gt;</a-select-option>
              <a-select-option value="GTE">&gt;=</a-select-option>
              <a-select-option value="LT">&lt;</a-select-option>
              <a-select-option value="LTE">&lt;=</a-select-option>
              <a-select-option value="LIKE">LIKE</a-select-option>
              <a-select-option value="BETWEEN">BETWEEN</a-select-option>
            </a-select> -->
          </template>
          <template #isRequired="scope">
            <a-checkbox v-model:checked="tableData[scope.index].isRequired" value="1"></a-checkbox>
          </template>
          <template #htmlType="scope">
            <div class="tableSelect">
              <select
                v-model="tableData[scope.index].htmlType"
                >
                <option value="input">文本框</option>
                <option value="textarea">文本域</option>
                <option value="select">下拉框</option>
                <option value="radio">单选框</option>
                <option value="checkbox">复选框</option>
                <option value="checkbox">复选框</option>
                <option value="datetime">日期控件</option>
                <option value="imageUpload">图片上传</option>
                <option value="fileUpload">文件上传</option>
                <option value="editor">富文本控件</option>
              </select>
              <span class="closeBtn" @click="tableData[scope.index].htmlType = ''"></span>
            </div>
            <!-- <a-select
              ref="select"
              size="small"
              v-model:value="tableData[scope.index].htmlType"
              style="width: 100%"
            >
              <a-select-option value="input">文本框</a-select-option>
              <a-select-option value="textarea">文本域</a-select-option>
              <a-select-option value="select">下拉框</a-select-option>
              <a-select-option value="radio">单选框</a-select-option>
              <a-select-option value="checkbox">复选框</a-select-option>
              <a-select-option value="checkbox">复选框</a-select-option>
              <a-select-option value="datetime">日期控件</a-select-option>
              <a-select-option value="imageUpload">图片上传</a-select-option>
              <a-select-option value="fileUpload">文件上传</a-select-option>
              <a-select-option value="editor">富文本控件</a-select-option>
            </a-select> -->
          </template>
          <template #dictType="scope">
            <div class="tableSelect">
              <select
                v-model="tableData[scope.index].dictType"
                >
                <option 
                  v-for="opt in dictOptions" 
                  :key="opt.dictType" 
                  :value="opt.dictType"
                >{{opt.dictName}}</option>
              </select>
              <span class="closeBtn" @click="tableData[scope.index].dictType = ''"></span>
            </div>
            <!-- <a-select
              ref="select"
              size="small"
              v-model:value="tableData[scope.index].dictType"
              style="width: 100%"
            >
              <a-select-option 
                v-for="opt in dictOptions" 
                :key="opt.dictType" 
                :value="opt.dictType"
              >{{opt.dictName}}</a-select-option>
            </a-select> -->
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane 
        tab="生成信息"
        key="build"
        :forceRender="true"
      >
        <alpFormGroup :key="updateKey" ref="buildForm" :options="buildForm" :form_data="buildFormData">
          <template #superior>
            <div class="group">
              <div class="label">上级菜单</div>
              <div class="setInput">
                <a-tree-select
                  v-model:value="superior"
                  show-search
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '200px', overflow: 'auto' }"
                  allow-clear
                  :tree-data="superiorTree"
                  :replaceFields="{
                    children:'children', 
                    title:'menuName', 
                    key:'menuId', 
                    value: 'menuId'
                  }"
                >
                </a-tree-select>
              </div>
            </div>
          </template>
          <template #tree>
            <div class="formBlock">
              <div class="subTit">其他信息</div>
              <div class="form">
                <div class="group">
                  <div class="label">树编码字段</div>
                  <div class="setInput">
                    <a-select v-model:value="tree.treeCode" style="width: 100%">
                      <a-select-option v-for="opt in fieldsOpts" :value="opt.columnName" :key="opt.columnName">{{opt.columnName + '：' + opt.columnComment}}</a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="group">
                  <div class="label">树父编码字段</div>
                  <div class="setInput">
                    <a-select v-model:value="tree.treeParentCode" style="width: 100%">
                      <a-select-option v-for="opt in fieldsOpts" :value="opt.columnName" :key="opt.columnName">{{opt.columnName + '：' + opt.columnComment}}</a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="group">
                  <div class="label">树名称字段</div>
                  <div class="setInput">
                    <a-select v-model:value="tree.treeName" style="width: 100%">
                      <a-select-option v-for="opt in fieldsOpts" :value="opt.columnName" :key="opt.columnName">{{opt.columnName + '：' + opt.columnComment}}</a-select-option>
                    </a-select>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #sub>
            <div class="formBlock">
              <div class="subTit">关联信息</div>
              <div class="form">
                <div class="group">
                  <div class="label">关联子表的表名</div>
                  <div class="setInput">
                    <a-select v-model:value="sub.subTableName" style="width: 100%" @change="subSelectChange">
                      <a-select-option v-for="opt in subTableNameOpts" :value="opt.tableName" :key="opt.tableName">{{opt.tableName + '：' + opt.tableComment}}</a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="group">
                  <div class="label">子表关联的外键名</div>
                  <div class="setInput">
                    <a-select v-model:value="sub.subTableFkName" style="width: 100%">
                      <a-select-option v-for="opt in subTableFkNameOpts" :value="opt.columnName" :key="opt.columnName">{{opt.columnName + '：' + opt.columnComment}}</a-select-option>
                    </a-select>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </alpFormGroup>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import formConfig from "./formConfig.js";

export default defineComponent({
  name: 'editPopup',
  data: function(){
    return {
      show: false,
      title: '修改生成配置',
      activeKey: 'basic',
      // 表格列设置
      columns: [
        {
          width: 50,
          title: "序号",
          slots: { customRender: "index" },
        },{
          dataIndex: "columnName",
          key: "columnName",
          width: 150,
          title: "字段列名",
        },{
          dataIndex: "columnComment",
          key: "columnComment",
          width: 250,
          title: "字段描述",
          slots: { customRender: "columnComment" },
        },{
          dataIndex: "columnType",
          key: "columnType",
          width: 150,
          title: "物理类型",
        },{
          dataIndex: "javaType",
          key: "javaType",
          width: 150,
          title: "Java类型",
          slots: { customRender: "javaType" },
        },{
          dataIndex: "javaField",
          key: "javaField",
          width: 150,
          title: "Java属性",
          slots: { customRender: "javaField" },
        },{
          dataIndex: "isInsert",
          key: "isInsert",
          width: 50,
          title: "插入",
          slots: { customRender: "isInsert" },
        },{
          dataIndex: "isEdit",
          key: "isEdit",
          width: 50,
          title: "编辑",
          slots: { customRender: "isEdit" },
        },{
          dataIndex: "isList",
          key: "isList",
          width: 50,
          title: "列表",
          slots: { customRender: "isList" },
        },{
          dataIndex: "isQuery",
          key: "isQuery",
          width: 50,
          title: "查询",
          slots: { customRender: "isQuery" },
        },{
          dataIndex: "queryType",
          key: "queryType",
          width: 150,
          title: "查询方式",
          slots: { customRender: "queryType" },
        },{
          dataIndex: "isRequired",
          key: "isRequired",
          width: 50,
          title: "必填",
          slots: { customRender: "isRequired" },
        },{
          dataIndex: "htmlType",
          key: "htmlType",
          width: 150,
          title: "显示类型",
          slots: { customRender: "htmlType" },
        },{
          dataIndex: "dictType",
          key: "dictType",
          width: 150,
          title: "字典类型",
          slots: { customRender: "dictType" },
        }
      ],
      // 所有表 及 表字段
      tables: [],
      // 字段表格加载
      fieldTableLoading: false,
      // 表格数据
      tableData: [],
      // 字典类型下拉列表
      dictOptions: [],
      basicForm: formConfig.basicForm,
      basicTemplate: {
        tableName: '',
        tableComment: '',
        className: '',
        functionAuthor: '',
        remark: '',
      },
      basicFormData: {},
      buildForm: formConfig.buildForm,
      buildTemplate: {
        tplCategory: '',
        packageName: '',
        moduleName: '',
        businessName: '',
        functionName: '',
        genType: '0',
        genPath: '',
      },
      buildFormData: {},
      // 上级菜单
      superior: "",
      superiorTree: [],
      // 树形表
      tree: {
        treeCode: '',
        treeParentCode: '',
        treeName: '',
      },
      fieldsOpts: [],
      // 主子表
      sub: {
        subTableName: '',
        subTableFkName: '',
      },
      subTableNameOpts: [],
      subTableFkNameOpts: [],
      updateKey: 1,
    }
  },
  props: {
    visible: Boolean,
    data: Object,
    callBack: Function,
  },
  created: function(){
  },
  watch: {
    visible: function(val){
      // console.log('visible',val)
      this.show = val;
      if(val){
        this.activeKey = 'basic';
        this.fieldTableLoading = false;
        // 获取生成代码
        var loading = this.$loading({
          background: 'rgba(0,0,0,0.75)',
          size: 166,
          iconColor: '#00678C',
        });
        this.genInterface('getField', this.data.tableId).then(res => {
          loading.close();
          // console.log(res);
          if(res.data.code == 200){
            // 表格数据
            this.tableData = res.data.data.info.columns;
            // 基本信息表单
            for(var k in this.basicTemplate){
              this.basicFormData[k] = {
                value: res.data.data.info[k]||this.basicTemplate[k]
              }
            }
            // 构建信息表单
            for(var k in this.buildTemplate){
              this.buildFormData[k] = {
                value: res.data.data.info[k]||this.basicTemplate[k]
              }
            }
            // 树表
            for(var k in this.tree){
              this.tree[k] = res.data.data.info[k]
            }
            // 主子表
            for(var k in this.sub){
              this.sub[k] = res.data.data.info[k]
            }
            // 父级菜单
            this.superior = res.data.data.info.parentMenuId
            this.updateKey++;

            this.buildForm.form[7].hidden = res.data.data.info.genType == '0'?true: false;
            this.buildForm.form[8].hidden = true;
            this.buildForm.form[9].hidden = true;
            if(res.data.data.info.tplCategory=='tree'){
              this.buildForm.form[8].hidden = false;
            }else if(res.data.data.info.tplCategory=='sub'){
              this.buildForm.form[9].hidden = false;
            }

            // 所有表及字段
            this.tables = res.data.data.tables;
            var otherTables = <any>[];
            this.tables.forEach(t => {
              if(t.tableId == res.data.data.info.tableId){
                this.fieldsOpts = t.columns;
              }else{
                otherTables.push(t);
              }
            });
            this.subTableNameOpts = otherTables;
          }
        }).catch(err => {
          loading.close();
        });
        // 获取字典的下接
        this.genInterface('getDictOptions', this.data.tableId).then(res => {
          if(res.data.code == 200){
            this.dictOptions = res.data.data;
          }
        });
        // 获取菜单下拉树
        this.genInterface('getMenuTree').then(res => {
          // console.log(res)
          if(res.data.code == 200){
            var tree = this.parseTree(res.data.data);
            this.superiorTree = tree;
          }
        });
      }
    },
    activeKey: function (val) {
      if(val == 'field' && !this.fieldTableLoading){
        var loading = this.$loading({
          target: '.editPopup',
          background: 'rgba(255,255,255,0.3)',
          size: 24,
          iconColor: '#00678C',
        });
        setTimeout(() => {
          this.fieldTableLoading = true;
          loading.close();
        }, 200);
      }
    },
    show: function(val){
      // console.log('show',val);
      this.$emit('update:visible', val);
    }
  },
  methods: {
    // 解析树
    parseTree: function(data){
      var res = <any>[];
      for(var i=0;i<data.length;i++){
        var one = data[i];
        var searchRes = this.$common.recursiveSearch({
          data: res, 
          recursiveKey: 'children', 
          searchKey: 'menuId', 
          searchVal: one.parentId
        });
        if(searchRes.result){
          searchRes.data.children.push({
            ...one,
            children: [],
          });
        }else{
          res.push({
            ...one,
            children: [],
          })
        }
      }
      return res;
    },
    // 接口
    genInterface: function(type, data){
      switch(type){
        case 'getField':
          // 代码
          return this.$axios.get('/tool/gen/' + data);
        case 'getDictOptions':
          // 获取字典下拉列表
          return this.$axios.get('/system/dict/type/optionselect')
        case 'getMenuTree':
          // 获取字典下拉列表
          return this.$axios.get('/system/menu/list')
        case 'save':
          // 保存
          return this.$axios.put('/tool/gen', data)
      }
    },
    // 主子表 关联子表变更
    subSelectChange: function(val){
      this.tables.forEach(t => {
        if(t.tableName == val){
          this.subTableFkNameOpts = t.columns;
        }
      });
      this.sub.subTableFkName = "";
    },
    submitConfig: function(state){
      // console.log(this.visible, this.callBack, this.buildForm);
      // console.log(state, this.tableData);
      if(state){
        var template = {
          tableId: this.data.tableId,
          columns: this.tableData,
          params: {
            ...this.tree,
            parentMenuId: this.superior,
          }
        }
        // 基本信息
        var basicForm = this.$refs['basicForm'];
        // 构建信息
        var buildForm = this.$refs['buildForm'];

        Promise.all([basicForm.formValidation(), buildForm.formValidation()]).then(res => {
          // console.log(res);
          if(res[0].state && res[0].state){
            var params = Object.assign(template, this.sub, res[0].form, res[1].form);

            var loading = this.$loading({
              background: "rgba(0,0,0,0.0)",
              size: 166,
              iconColor: "#00678C",
            });
            this.genInterface('save', params).then(res => {
              loading.close();
              if(res.data.code == 200){
                this.$message.success('保存成功');
                if(this.callBack){
                  this.callBack(res);
                }
                this.show = false;
              }else{
                this.$message.error(res.data.msg);
              }
            }).catch(err => {
              loading.close();
              this.$message.error('服务器异常');
            });
          }
        });
      }else{
        this.show = false;
      }
    },
  },
  setup() {
    
  },
})
</script>
<style lang="less">
@import url("../../../common/base.less");

.editPopup{
  .ant-modal-body{
    padding: 10px 20px;
  }

  .tableSelect{
    position: relative;
    >select{
      display: block;
      width: 100%;
      font-variant: tabular-nums;
      position: relative;
      padding: 4px 25px 4px 11px;
      color: rgba(0,0,0,.85);
      font-size: 12px;
      background-color: #fff;
      background-image: none;
      border: 1px solid #969696;
      border-radius: 2px;
    }
    >.closeBtn{
      display: none;
      position: absolute;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      top: 50%;
      right: 5px;
      transform: translate(0, -50%) scale(0.6);
      border-radius: 50%;
      overflow: hidden;
      background-color: #bbb;
      user-select: none;
      cursor: pointer;
      &::before{
        content: 'X';
      }
    }
    &:hover>.closeBtn{
      display: block;
    }
  }

  .group{
    height: 56px;
    >.label{
      float: left;
      padding-right: 10px;
      width: 120px;
      height: 32px;
      line-height: 32px;
      text-align: right;
      color: rgba(0,0,0,.85);
      font-size: 12px;
    }
    >.setInput{
      margin-left: 120px;
      line-height: 32px;
    }
  }

  .formBlock{
    >.subTit{
      margin-bottom: 20px;
      padding: 0 15px 10px;
      font-size: 14px;
      color: @activeColor;
      border-bottom: 1px solid #ddd;
    }
    >.form{
      overflow: hidden;
      >.group{
        float: left;
        width: 50%;
      }
    }
  }
}
</style>