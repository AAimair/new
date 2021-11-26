<template>
  <div class="toolGenPage">
    <div class="topSearch">
      <div class="tableTit">
        <div class="tit">
          <div
            class="shrinkBtn"
            @click="shrinkTopForm"
            :class="{ shrink: topFormShrink }"
          >
            <alpIcon :size="16" type="svg" icon="miscChevronUpDouble24.svg" />
            <!-- <alpIcon :icon='' v-if="topFormShrink" />
            <FullscreenExitOutlined v-else /> -->
          </div>
          <span>模块列表</span>
        </div>
        <div class="tableBtn">
          <a-button type="primary" size="small" @click="topSearch('search')">
            <template #icon><SearchOutlined /></template>
            搜索
          </a-button>
          <a-button size="small" @click="topSearch('reset')">
            <template #icon><SyncOutlined /></template>
            重置
          </a-button>
          <a-button size="small" @click="topSearch('build')"
            :disabled="tableSelection.selectedRowKeys.length !== 1"
          >
            <template #icon><PlusOutlined /></template>
            生成
          </a-button>
          <a-button size="small" @click="topSearch('import')">
            <template #icon><PlusOutlined /></template>
            导入
          </a-button>
          <a-button
            size="small"
            @click="topSearch('edit')"
            :disabled="tableSelection.selectedRowKeys.length !== 1"
          >
            <template #icon><EditOutlined /></template>
            修改
          </a-button>
          <a-button
            size="small"
            @click="topSearch('delete')"
            :disabled="tableSelection.selectedRowKeys.length == 0"
          >
            <template #icon><DeleteOutlined /></template>
            删除
          </a-button>
        </div>
      </div>
      <div class="topSearchForm" :class="{ shrink: topFormShrink }">
        <alpFormGroup ref="topForm" :options="topForm" :form_data="topFormData"></alpFormGroup>
      </div>
    </div>
    <div class="tableView">
      <!-- <div class="tableTopBtns">
        <a-button size="small" @click="topSearch('add')">
          <template #icon><PlusOutlined /></template>
          新增
        </a-button>
        <a-button
          size="small"
          @click="topSearch('edit')"
          :disabled="tableSelection.selectedRowKeys.length !== 1"
        >
          <template #icon><EditOutlined /></template>
          修改
        </a-button>
        <a-button
          size="small"
          @click="topSearch('delete')"
          :disabled="tableSelection.selectedRowKeys.length == 0"
        >
          <template #icon><DeleteOutlined /></template>
          删除
        </a-button>
        <a-button size="small" @click="topSearch('export')">
          <template #icon><PlusOutlined /></template>
          导出
        </a-button>
      </div> -->
      <div class="table" :style="{ height: tableViewHeight + 'px' }">
        <a-table
          :columns="columns"
          :data-source="tableData"
          :row-selection="tableSelection"
          :pagination="false"
          size="small"
          rowKey="tableId"
          :scroll="{ y: tableViewHeight - 40, x: 'true'}"
          bordered
        >
          <template #options="{ text: row }">
            <div class="rowBtns">
              <a-button
                size="small"
                type="text"
                @click="itemOptions('preview', row)"
                ><EditOutlined />预览</a-button
              >
              <a-button
                size="small"
                type="text"
                @click="itemOptions('edit', row)"
                ><EditOutlined />编辑</a-button
              >
              <a-button
                size="small"
                type="text"
                @click="itemOptions('delete', row)"
                ><DeleteOutlined />删除</a-button
              >
              <a-button
                size="small"
                type="text"
                @click="itemOptions('sync', row)"
                ><EditOutlined />同步</a-button
              >
              <a-button
                size="small"
                type="text"
                @click="itemOptions('build', row)"
                ><EditOutlined />生成代码</a-button
              >
            </div>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination
          size="small"
          @change="tablePageChange"
          @showSizeChange="tablePageChange"
          v-model:current="pagination.current"
          v-model:pageSize="pagination.pageSize"
          :total="pagination.total"
          :pageSizeOptions="pagination.pageSizeOptions"
          show-size-changer
          :show-total="pagination.showTotal"
        />
      </div>
    </div>

     <!-- 代码预览 -->
    <a-modal 
      :title="preview.title" 
      v-model:visible="preview.show"
      width="80%"  
      append-to-body 
      class="previewPopup"
      >
      <template #footer>
        <a-button key="back" @click="preview.show=false">取消</a-button>
      </template>
      <a-tabs v-model:activeKey="preview.activeKey">
        <a-tab-pane 
          v-for="item in preview.data"
          :tab="item.name"
          :key="item.name"
        >
          <div class="previewPane">
            <pre><code class="hljs" v-html="highlightedCode(item.content, item.name)"></code></pre>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>

    <!-- 导入 -->
    <a-modal 
      :title="importTable.title" 
      v-model:visible="importTable.show"
      width="1000px"  
      class="importTablePopup"
      >
      <template #footer>
        <a-button key="back" @click="submitImportTable(false)">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          @click="submitImportTable(true)"
        >确定</a-button>
      </template>
      <div class="main">
        <div class="search">
          <alpFormGroup
            v-if="importTable.show"
            ref="importTableSearchForm"
            :options="importTable.search"
          >
            <template #btns>
              <div class="btns">
                <a-button type="primary" size="small" @click="searchImport('search')"><template #icon><SearchOutlined /></template>搜索</a-button>
                <a-button size="small" @click="searchImport('reset')"><template #icon><SyncOutlined /></template>重置</a-button>
              </div>
            </template>
          </alpFormGroup>
        </div>
        <div class="table">
          <a-table
            :columns="importTable.columns"
            :data-source="importTable.tableData"
            :row-selection="importTable.tableSelection"
            :pagination="false"
            size="small"
            :scroll="{ y: 300, x: true }"
            bordered
          >
          </a-table>
        </div>
        <div class="pagination" v-if='importTable.total'>
          <a-pagination
            size="small"
            @change="importTablePageChange"
            @showSizeChange="importTablePageChange"
            v-model:current="importTable.current"
            v-model:pageSize="importTable.pageSize"
            :total="importTable.total"
            :pageSizeOptions="importTable.pageSizeOptions"
            :show-total="importTable.showTotal"
          />
        </div>
      </div>
    </a-modal>

    <!-- 修改 -->
    <editPopup v-model:visible="editConfig.show" :data="editConfig.data" :callBack="editSaveCallBack"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, createVNode, ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import fromConfig from "./formConfig.js";


// highlight
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
hljs.registerLanguage("java", require("highlight.js/lib/languages/java"));
hljs.registerLanguage("xml", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("html", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("vue", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("javascript", require("highlight.js/lib/languages/javascript"));
hljs.registerLanguage("sql", require("highlight.js/lib/languages/sql"));

import editPopup from "./editpopup.vue"

interface previewType {
  key: String,
  name: String,
  content: String,
}

export default defineComponent({
  name: "toolGenPage",
  data: function () {
    return {
      topForm: fromConfig.topSearchForm,
      topFormShrink: false,
      topFormHeight: 0,
      topFormData: {},
      tableSelection: {
        selectedRowKeys: [],
        onChange: this.onSelectChange,
      },
      pagination: {
        showTotal: (total) => `共 ${total} 条`,
        total: 1,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "50"],
        current: 1,
        pageSize: 10,
      },
      tableData: [],
      columns: [
        // {
        //   dataIndex: "tableId",
        //   key: "tableId",
        //   width: 50,
        //   title: "序号",
        // },
        {
          dataIndex: "tableName",
          key: "tableName",
          width: 150,
          title: "表名称",
        },
        {
          dataIndex: "tableComment",
          key: "tableComment",
          width: 300,
          title: "表描述",
        },
        {
          dataIndex: "className",
          key: "className",
          width: 150,
          title: "实体",
        },
        {
          width: 150,
          dataIndex: "createTime",
          key: "createTime",
          title: "创建时间",
        },
        {
          width: 150,
          dataIndex: "updateTime",
          key: "updateTime",
          title: "更新时间",
        },
        {
          width: 350,
          title: "操作",
          key: "options",
          slots: { customRender: "options" },
        },
      ],
      tableViewHeight: 200,
      tableRowForm: fromConfig.tableRowForm,
      tableRowFormData: ref({}),
      rowConfig: {
        show: false,
        type: "edit", // add/edit
        data: [],
      },


      // 预览弹窗
      preview: {
        show: false,
        title: "代码预览",
        data: [],
        activeKey: ""
      },

      // 导入
      importTable: {
        show: false,
        title: "导入表",
        search: fromConfig.importSearchForm,
        columns: [
          {
            dataIndex: "tableName",
            key: "tableName",
            width: 150,
            title: "表名称",
          },
          {
            dataIndex: "tableComment",
            key: "tableComment",
            width: 300,
            title: "表描述",
          },
          {
            width: 150,
            dataIndex: "createTime",
            key: "createTime",
            title: "创建时间",
          },
          {
            width: 150,
            dataIndex: "updateTime",
            key: "updateTime",
            title: "更新时间",
          },
        ],
        tableData: [],
        tableSelection: {
          selectedRowKeys: [],
          onChange: this.importTableSelectChange,
        },
        selData: [],
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },

      // 编辑
      editConfig: {
        show: false,
        data: null,
      },
    };
  },
  mounted: function () {
    var moduleHeight = this.$el.clientHeight;
    this.topFormHeight = this.$el.querySelector('.topSearchForm').clientHeight;
    // 标题 40+10 上下padding 20 分页 25+10
    this.tableViewHeight = moduleHeight - (85 + 40 + this.topFormHeight);
  },
  created: function () {
    this.getList();
  },
  methods: {
    // 获取列表
    getList: function (params) {
      var queryParams = {
        pageNum: this.importTable.current,
        pageSize: this.importTable.pageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
        .get("/tool/gen/list", {
          params: Object.assign(queryParams, params),
        })
        .then((res) => {
          loading.close();
          if (res.data.code == 200) {
            // this.tableData = [].concat(res.data.rows, res.data.rows, res.data.rows, res.data.rows);
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            // this.pagination.total = 50;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          loading.close();
        });
    },

    // 获取导入表
    getImportList: function(params){
      var queryParams = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
        .get("/tool/gen/db/list", {
          params: Object.assign(queryParams, params),
        })
        .then((res) => {
          loading.close();
          console.log('import',res)
          if (res.data.code == 200) {
            // this.tableData = [].concat(res.data.rows, res.data.rows, res.data.rows, res.data.rows);
            this.importTable.tableData = res.data.rows;
            this.importTable.total = res.data.total;
            this.importTable.tableData = res.data.rows;
            this.importTable.pagination.total = res.data.total;
            // this.pagination.total = 50;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          loading.close();
        });
    },

    // 接口
    genInterface: function(type, data){
      switch(type){
        case 'preview':
          // 代码预览
          return this.$axios.get('/tool/gen/preview/' + data.tableId);
        case 'import':
          // 导入
          return this.$axios.post("/tool/gen/importTable?tables="+data);
        case 'delete':
          // 删除
          return this.$axios.delete('/tool/gen/'+data);
        case 'sync':
          // 删除
          return this.$axios.get('/tool/gen/synchDb/'+data);
        case 'buildPath':
          // 生成  路径
          return this.$axios.get('/tool/gen/genCode/' + data);
      }
    },

    // 收缩顶部查询表单
    shrinkTopForm: function() {
      this.topFormShrink = !this.topFormShrink;
      this.tableViewHeight += this.topFormHeight*(this.topFormShrink?1:-1);
    },

    // 顶部查询  方法
    topSearch: function (type) {
      var form = this.$refs["topForm"];
      switch (type) {
        case "search":
          // 查询
          var data = form.getFormData().formData;
          this.getList(data);
          break;
        case "reset":
          // 重置
          form.resetValidation();
          this.getList();
          break;
        case "add":
          // 新增
          this.rowConfig.show = true;
          this.rowConfig.type = "add";
          this.tableRowFormData = {};
          break;
        case "edit":
          // 修改
          var editData = this.rowConfig.data[0];
          this.editConfig.data = editData;
          this.editConfig.show = true;
          break;
        case "delete":
          // 删除
          var editData = this.rowConfig.data.map((item) => item.tableId);
          var that = this;
          this.$confirm({
            title: () => "删除",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => "确定要删除吗？",
            onOk() {
              return new Promise((resolve) => {
                // 删除
                that
                  .genInterface("delete", editData)
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      that.rowConfig.data = [];
                      that.tableSelection.selectedRowKeys = [];
                      var form = that.$refs["topForm"];
                      var data = form.getFormData().formData;
                      that.getList(data);
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
        case "import":
          // 导入表
          this.importTable.show = true;
          this.importTable.current = 1;
          this.importTable.total = 0;
          this.importTable.tableData = [];
          this.importTable.selData = [];
          this.importTable.tableSelection.selectedRowKeys = [];
          this.getImportList();
          break;
        case 'build':
          var editData = this.rowConfig.data[0];
          if(editData.genType === "1") {
            this.genInterface('buildPath', editData.tableName).then(res => {
              if(res.data.code == 200){
                this.$message.success("成功生成到自定义路径：" + editData.genPath);
              }else{
                this.$message.error(res.data.msg);
              }
            }).catch(err => {
              this.$message.error('服务器异常');
            });
          } else {
            this.$download.zip("/tool/gen/batchGenCode?tables=" + editData.tableName, "gen_"+new Date().getTime());
          }
          break;
      }
    },

    // 项目操作
    itemOptions: function (type, item) {
      // console.log(type, item)
      switch (type) {
        case 'preview':
          // 代码预览

          var loading = this.$loading({
            background: "rgba(0,0,0,0.0)",
            size: 166,
            iconColor: "#00678C",
          });
          this.genInterface(type, item).then(res => {
            // console.log(res);
            loading.close();
            if(res.data.code == 200){
              // this.preview.data = 
              var data = <Array<previewType>>[];
              for(var k in res.data.data){
                var name = k.substring(k.lastIndexOf('/')+1,k.indexOf('.vm'));
                data.push({
                  key: k,
                  name: name,
                  content: res.data.data[k]
                });
              }
              this.preview.data = data;
              // console.log(data)
              this.preview.activeKey = data[0].name;
              this.preview.show = true;

            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err => {
            loading.close();
            this.$message.error('服务器异常');
          });

          break;
        case "edit":
          // 修改
          var editData = item;
          this.editConfig.data = editData;
          this.editConfig.show = true;
          break;
        case "sync":
          // 同步
          console.log(item)
          var that = this;
          this.$confirm({
            title: () => "同步",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => "确认要强制同步"+item.tableName+"表结构吗？",
            onOk() {
              return new Promise((resolve) => {
                // 删除
                that
                  .genInterface("sync", item.tableName)
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      var form = that.$refs["topForm"];
                      var data = form.getFormData().formData;
                      that.getList(data);
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
        case "delete":
          // 删除
          var that = this;
          this.$confirm({
            title: () => "删除",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => "确定要删除吗？",
            onOk() {
              return new Promise((resolve) => {
                // 删除
                that
                  .genInterface("delete", item.tableId)
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      // 清空表格选中数据
                      for(var i=that.rowConfig.data.length-1;i>=0;i--){
                        var one = that.rowConfig.data[i];
                        if(one.tableId == item.tableId){
                          that.tableSelection.selectedRowKeys.splice(i,1);
                          that.rowConfig.data.splice(i,1);
                        }
                      }
                      var form = that.$refs["topForm"];
                      var data = form.getFormData().formData;
                      that.getList(data);
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
        case 'build':
          var editData = item;
          // console.log(editData)
          if(editData.genType === "1") {
            this.genInterface('buildPath', item.tableName).then(res => {
              if(res.data.code == 200){
                this.$message.success("成功生成到自定义路径：" + item.genPath);
              }else{
                this.$message.error(res.data.msg);
              }
            }).catch(err => {
              this.$message.error('服务器异常');
            });
          } else {
            this.$download.zip("/tool/gen/batchGenCode?tables=" + item.tableName, "gen_"+new Date().getTime());
          }
          break;
      }
    },

    
    /** 高亮显示 */
    highlightedCode: function(code, key) {
      var language = key.substring(key.indexOf(".") + 1, key.length);
      const result = hljs.highlight(language, code || "", true);
      return result.value || '&nbsp;';
    },

    // table行选中事件
    onSelectChange: function (selectedRowKeys) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      var selData = <any>[];
      this.tableData.forEach((one) => {
        if (selectedRowKeys.indexOf(one.tableId) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.rowConfig.data = selData;
      this.tableSelection.selectedRowKeys = selectedRowKeys;
    },

    // table 分页数量变更
    tablePageChange: function (page) {
      var form = this.$refs["topForm"];
      var data = form.getFormData().formData;
      this.getList(data);
    },

    // 导入表格查询  
    searchImport: function(){
      var form = this.$refs["importTableSearchForm"];
      var data = form.getFormData().formData;
      this.getImportList(data);
    },

    // 导入表 分页
    importTablePageChange: function(){
      this.importTable.selData = [];
      var form = this.$refs["importTableSearchForm"];
      var data = form.getFormData().formData;
      this.getImportList(data);
    },
    // table行选中事件
    importTableSelectChange: function (selectedRowKeys) {
      var selData = <any>[];
      this.importTable.tableData.forEach((one,idx) => {
        if (selectedRowKeys.indexOf(idx) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.importTable.selData = selData;
      this.importTable.tableSelection.selectedRowKeys = selectedRowKeys;
    },
    // 导放提交
    submitImportTable: function(state){
      if(state){
        var names = this.importTable.selData.map(o => o.tableName);
        if(!names.length){
          this.$message.error('选择要导入的表');
          return;
        }

        var loading = this.$loading({
          background: "rgba(0,0,0,0.0)",
          size: 166,
          iconColor: "#00678C",
        });
        this.genInterface('import',names.join(',')).then(res => {
          loading.close();
          if(res.data.code == 200){
            this.importTable.show = false;
            var form = this.$refs["topForm"];
            var data = form.getFormData().formData;
            this.getList(data);
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err => {
          loading.close();
          this.$message.error('服务器异常');
        });
      }else{
        this.importTable.show = false;
      }
    },

    // 修改生成配置保存回调方法
    editSaveCallBack: function(data){
      var form = this.$refs["topForm"];
      var data = form.getFormData().formData;
      this.getList(data);
    },
  },
  components: {
    editPopup,
  }
});
</script>
<style lang="less">
@import url("../../../common/base.less");

.toolGenPage {
  padding: 20px 20px;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  > .topSearch {
    margin-bottom: 10px;

    >.tableTit{
      padding: 0 10px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      >.tit{
        height: 40px;
        line-height: 40px;

        >.shrinkBtn{
          display: inline-block;
          margin-right: 10px;
          font-size: 20px;
          // color: #aaa;
          user-select: none;
          cursor: pointer;
          svg{
            display: block;
          }
          path{
            fill: #666
          }
          &.shrink{
            >.alp_icon{
              transform-origin: 50% 50%;
              transform: rotate(180deg);
            }
          }
        }
        >span{
          vertical-align: top;
        }
      }
      >.tableBtn{
        height: 30px;
        line-height: 30px;
        >.ant-btn:not(:last-child){
          margin-right: 10px;
        }
      }
    }

    >.topSearchForm{
      padding: 10px;
      border: 1px solid #ccc;
      border-top: 0;
      max-height: 1000px;
      transition: all 0.2s;

      &.shrink{
        padding: 0 10px;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
      }
    }
    .createStartTime {
      margin-right: 10px;
    }
  }

  > .tableView {
    > .tableTopBtns {
      margin-bottom: 10px;
      > .ant-btn {
        &[disabled] {
          opacity: 0.5;
        }
        // &:nth-child(1) {
        //   color: #1890ff;
        //   background: #e8f4ff;
        //   border-color: #a3d3ff;
        // }
        // &:nth-child(2) {
        //   color: #13ce66;
        //   background: #e7faf0;
        //   border-color: #a1ebc2;
        // }
        // &:nth-child(3) {
        //   color: #ff4949;
        //   background: #ffeded;
        //   border-color: #ffb6b6;
        // }
        // &:nth-child(4) {
        //   color: #ffba00;
        //   background: #fff8e6;
        //   border-color: #ffe399;
        // }
        // &:nth-child(5) {
        //   color: #0186b7;
        //   background: #d1f3ff;
        //   border-color: #01aae7;
        // }
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }

    .card {
      border-color: #d1e9ff;
      padding: 0 10px;
      font-size: 12px;
      color: #1890ff;
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      white-space: nowrap;
      &.err {
        border-color: #ff4949;
        color: #ff4949;
      }
    }

    .rowBtns {
      .ant-btn-text {
        color: @activeColor;
      }
    }

    > .pagination {
      margin-top: 10px;
      text-align: right;
    }
  }
}

.previewPopup{
  .ant-modal-body{
    padding: 10px 20px;
  }
  .previewPane{
    height: 60vh;
    overflow: auto;
  }
}

.importTablePopup{
  .ant-modal-body{
    padding: 10px 15px;
  }
  .main{
    >.search{
      margin-bottom: 10px;
      .btns{
        height: 32px;
        line-height: 32px;
        >button:first-child{
          margin-right: 10px;
        }
      }
    }
    >.table{
      height: 290px;
    }
    >.pagination{
      margin-top: 10px;
      text-align: right;
    }
  }
}

</style>