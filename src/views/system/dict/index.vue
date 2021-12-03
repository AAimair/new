<template>
  <div class="systemDictPage">
    <div class="top">
      <div class="topSearch">
        <div class="tableTit">
          <div class="tit">
            <div
              class="shrinkBtn"
              @click="topFormShrink('top')"
              :class="{ shrink: topSearchFormShrink }"
            >
              <alpIcon :size="16" type="svg" icon="miscChevronUpDouble24.svg" />
            </div>
            <span>字典管理</span>
          </div>
          <div class="tableBtn">
            <a-button
              type="primary"
              size="small"
              @click="topSearch('topSearch')"
            >
              <template #icon><SearchOutlined /></template>
              搜索
            </a-button>
            <a-button size="small" @click="topSearch('topReset')">
              <template #icon><SyncOutlined /></template>
              重置
            </a-button>
            <a-button size="small" @click="topSearch('topAdd')">
              <template #icon><PlusOutlined /></template>
              新增
            </a-button>
            <a-button
              size="small"
              @click="topSearch('topEdit')"
              :disabled="topTable.tableSelection.selectedRowKeys.length !== 1"
            >
              <template #icon><EditOutlined /></template>
              修改
            </a-button>
            <a-button
              size="small"
              @click="topSearch('topDelete')"
              :disabled="topTable.tableSelection.selectedRowKeys.length == 0"
            >
              <template #icon><DeleteOutlined /></template>
              删除
            </a-button>
            <!-- <a-button size="small" @click="topSearch('topExport')">
              <template #icon><PlusOutlined /></template>
              导出
            </a-button> -->
          </div>
        </div>
        <div class="topSearchForm" :class="{ shrink: topSearchFormShrink }">
          <alpFormGroup ref="topSearchForm" :options="topSearchForm">
          </alpFormGroup>
        </div>
      </div>
      <div class="tableView">
        <div class="table" :style="{ height: topTable.tableViewHeight + 'px' }">
          <a-table
            :columns="topTable.columns"
            :data-source="topTable.tableData"
            :row-selection="topTable.tableSelection"
            :pagination="false"
            size="small"
            :rowKey="topMajorKey"
            :scroll="{ y: topTable.tableViewHeight - 40 }"
            bordered
          >
            <template
              v-for="col in topTable.columns.filter(
                (o) => o.dataIndex != 'options'
              )"
              #[col.dataIndex]="scope"
              :key="col.dataIndex"
            >
              <div @click="selDictType(scope)">
                <span
                  v-if="col.dataIndex == 'status'"
                  class="card"
                  :class="{ err: scope.text !== '0' }"
                >
                  {{ scope.text == "0" ? "正常" : "停用" }}
                </span>
                <span v-else>{{ scope.text }}</span>
              </div>
            </template>
            <template #options="{ text: row }">
              <div class="rowBtns">
                <a-button
                  size="small"
                  type="text"
                  @click="itemOptions('topEdit', row)"
                  ><EditOutlined />修改</a-button
                >
                <a-button
                  size="small"
                  type="text"
                  @click="itemOptions('topDelete', row)"
                  ><DeleteOutlined />删除</a-button
                >
              </div>
            </template>
          </a-table>
        </div>
        <div class="pagination">
          <a-pagination
            size="small"
            @change="topTablePageChange"
            @showSizeChange="topTablePageChange"
            v-model:current="topTable.pagination.current"
            v-model:pageSize="topTable.pagination.pageSize"
            :total="topTable.pagination.total"
            :pageSizeOptions="topTable.pagination.pageSizeOptions"
            show-size-changer
            :show-total="topTable.pagination.showTotal"
          />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="topSearch">
        <div class="tableTit">
          <div class="tit">
            <div
              class="shrinkBtn"
              @click="topFormShrink('bottom')"
              :class="{ shrink: bottomSearchFormShrink }"
            >
              <alpIcon :size="16" type="svg" icon="miscChevronUpDouble24.svg" />
            </div>
            <span>字典数据</span>
          </div>
          <div class="tableBtn">
            <a-button
              type="primary"
              size="small"
              @click="topSearch('bottomSearch')"
            >
              <template #icon><SearchOutlined /></template>
              搜索
            </a-button>
            <a-button size="small" @click="topSearch('bottomReset')">
              <template #icon><SyncOutlined /></template>
              重置
            </a-button>

            <a-button size="small" @click="topSearch('bottomAdd')">
              <template #icon><PlusOutlined /></template>
              新增
            </a-button>
            <a-button
              size="small"
              @click="topSearch('bottomEdit')"
              :disabled="
                bottomTable.tableSelection.selectedRowKeys.length !== 1
              "
            >
              <template #icon><EditOutlined /></template>
              修改
            </a-button>
            <a-button
              size="small"
              @click="topSearch('bottomDelete')"
              :disabled="bottomTable.tableSelection.selectedRowKeys.length == 0"
            >
              <template #icon><DeleteOutlined /></template>
              删除
            </a-button>
            <!-- <a-button size="small" @click="topSearch('bottomExport')">
              <template #icon><PlusOutlined /></template>
              导出
            </a-button> -->
          </div>
        </div>
        <div class="topSearchForm" :class="{ shrink: bottomSearchFormShrink }">
          <alpFormGroup
            ref="bottomSearchForm"
            :options="bottomSearchForm"
          ></alpFormGroup>
        </div>
      </div>
      <div class="tableView">
        <div
          class="table"
          :style="{ height: bottomTable.tableViewHeight + 'px' }"
        >
          <a-table
            :columns="bottomTable.columns"
            :data-source="bottomTable.tableData"
            :row-selection="bottomTable.tableSelection"
            :pagination="false"
            size="small"
            :rowKey="bottomMajorKey"
            :scroll="{ y: bottomTable.tableViewHeight - 40 }"
            bordered
          >
            <template #status="{ text: row }">
              <span class="card" :class="{ err: row !== '0' }">{{
                row == "0" ? "正常" : "停用"
              }}</span>
            </template>
            <template #options="{ text: row }">
              <div class="rowBtns">
                <a-button
                  size="small"
                  type="text"
                  @click="itemOptions('bottomEdit', row)"
                  ><EditOutlined />修改</a-button
                >
                <a-button
                  size="small"
                  type="text"
                  @click="itemOptions('bottomDelete', row)"
                  ><DeleteOutlined />删除</a-button
                >
              </div>
            </template>
          </a-table>
        </div>
        <div class="pagination">
          <a-pagination
            size="small"
            @change="bottomTablePageChange"
            @showSizeChange="bottomTablePageChange"
            v-model:current="bottomTable.pagination.current"
            v-model:pageSize="bottomTable.pagination.pageSize"
            :total="bottomTable.pagination.total"
            :pageSizeOptions="bottomTable.pagination.pageSizeOptions"
            show-size-changer
            :show-total="bottomTable.pagination.showTotal"
          />
        </div>
      </div>
    </div>

    <!-- 新增/修改弹窗 -->
    <a-modal
      v-model:visible="popupConfig.show"
      :title="popupConfig.title"
      :width="350"
      :closable="false"
    >
      <template #footer>
        <a-button key="back" @click="submitConfig(false)">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="popupConfig.loading"
          @click="submitConfig(true)"
          >保存</a-button
        >
      </template>
      <div class="popupMain">
        <alpFormGroup
          :key="formUpdateKey"
          v-if="popupConfig.show"
          ref="rowForm"
          :options="popupConfig.form"
          :form_data="popupConfig.formData"
        >
        </alpFormGroup>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

import formConfig from "./formConfig.js";

// 字典类型表单配置数据
const dictTypeForm = formConfig.dictTypeForm;
// 字典数据表单配置数据
const dictDataForm = formConfig.dictDataForm;

export default defineComponent({
  name: "systemDictPage",
  data: function () {
    return {
      topSearchForm: formConfig.topSearchForm,
      topSearchFormShrink: false,
      topFormHeight: 0,
      topMajorKey: 'dictId',
      topTable: {
        tableSelection: {
          selectedRowKeys: [],
          onChange: this.onTopSelectChange,
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
          //   dataIndex: "dictId",
          //   key: "dictId",
          //   title: "字典编号",
          //   slots: { customRender: "dictId" },
          // },
          {
            dataIndex: "dictName",
            key: "dictName",
            title: "字典名称",
            slots: { customRender: "dictName" },
          },
          {
            dataIndex: "dictType",
            key: "dictType",
            title: "字典类型",
            slots: { customRender: "dictType" },
          },
          {
            dataIndex: "status",
            width: 100,
            key: "status",
            title: "状态",
            slots: { customRender: "status" },
          },
          {
            dataIndex: "remark",
            key: "remark",
            title: "备注",
            slots: { customRender: "remark" },
          },
          {
            dataIndex: "createTime",
            key: "createTime",
            title: "创建时间",
            slots: { customRender: "createTime" },
          },
          {
            width: 150,
            title: "操作",
            key: "options",
            slots: { customRender: "options" },
          },
        ],
        tableViewHeight: 200,
        // tableRowForm: formConfig.tableRowForm,
        tableRowFormData: {},
        // rowConfig: {
        //   show: false,
        //   type: "edit", // add/edit
        //   data: [],
        // },
        selRow: {
          // show: false,
          // type: "edit", // add/edit
          data: [],
        },
      },

      bottomSearchForm: formConfig.bottomSearchForm,
      bottomSearchFormShrink: false,
      bottomMajorKey: 'dictCode',
      bottomTable: {
        dictType: null,
        tableSelection: {
          selectedRowKeys: [],
          onChange: this.onBottomSelectChange,
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
          //   dataIndex: "dictCode",
          //   key: "dictCode",
          //   title: "字典编码",
          // },
          {
            dataIndex: "dictLabel",
            key: "dictLabel",
            title: "字典标签",
          },
          {
            dataIndex: "dictValue",
            key: "dictValue",
            title: "字典键值",
          },
          {
            dataIndex: "dictSort",
            key: "dictSort",
            title: "字典排序",
          },
          {
            width: 100,
            dataIndex: "status",
            key: "status",
            title: "状态",
            slots: { customRender: "status" },
          },
          {
            dataIndex: "remark",
            key: "remark",
            title: "备注",
          },
          {
            dataIndex: "createTime",
            key: "createTime",
            title: "创建时间",
          },
          {
            width: 150,
            title: "操作",
            key: "options",
            slots: { customRender: "options" },
          },
        ],
        tableViewHeight: 200,
        // tableRowForm: formConfig.tableRowForm,
        tableRowFormData: {},
        selRow: {
          // show: false,
          // type: "edit", // add/edit
          data: [],
        },
      },

      
      popupConfig: {
        show: false,
        title: '',
        dictTypeFormTemp: {
          dictId: undefined,
          dictName: undefined,
          dictType: undefined,
          status: "0",
          remark: undefined
        },
        dictDataFormTemp: {
          dictCode: undefined,
          dictLabel: undefined,
          dictValue: undefined,
          cssClass: undefined,
          listClass: 'default',
          dictSort: 0,
          status: "0",
          remark: undefined
        },
        formUpdateKey: 1,
        type: "add", // add/edit
        data: [],
        form: {},
        formData: {},
        loading: false,
      },
    };
  },
  methods: {
    // 顶部表单收缩
    topFormShrink: function (type) {
      switch (type) {
        case "top":
          // 上部
          this.topSearchFormShrink = !this.topSearchFormShrink;
          this.topTable.tableViewHeight +=
            this.topTable.topFormHeight * (this.topSearchFormShrink ? 1 : -1);
          break;
        case "bottom":
          // 下部
          this.bottomSearchFormShrink = !this.bottomSearchFormShrink;
          this.bottomTable.tableViewHeight +=
            this.bottomTable.topFormHeight *
            (this.bottomSearchFormShrink ? 1 : -1);
          break;
      }
    },
    // 获取顶部列表
    getTopList: function (params) {
      var queryParams = {
        pageNum: this.topTable.pagination.current,
        pageSize: this.topTable.pagination.pageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
        .get("/system/dict/type/list", {
          params: Object.assign(queryParams, params),
        })
        .then((res) => {
          loading.close();
          if (res.data.code == 200) {
            // this.tableData = [].concat(res.data.rows, res.data.rows, res.data.rows, res.data.rows);
            this.topTable.tableData = res.data.rows;
            this.topTable.pagination.total = res.data.total;
            // this.pagination.total = 50;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          loading.close();
        });
    },  
    // 新增/修改/删除  top-字典类型  bottom-字典数据
    sendRequest: function (type, data) {
      switch (type) {
        case "topAdd":
          // 新增
          return this.$axios.post("/system/dict/type", data);
        case "topEdit":
          // 修改
          return this.$axios.put("/system/dict/type", data);
        case "topDelete":
          //  删除
          return this.$axios.delete("/system/dict/type/" + data);
        case "topDetail":
          //  获取单一详情
          return this.$axios.get("/system/dict/type/" + data);
        case "bottomAdd":
          // 新增
          return this.$axios.post("/system/dict/data", data);
        case "bottomEdit":
          // 修改
          return this.$axios.put("/system/dict/data", data);
        case "bottomDelete":
          //  删除
          return this.$axios.delete("/system/dict/data/" + data);
        case "bottomDetail":
          //  获取单一详情
          return this.$axios.get("/system/dict/data/" + data);
        // case "export":
        //   //  导出
        //   return this.$axios.get("/system/post/export", {
        //     params: data,
        //   });
      }
    },
    // 顶部查询  方法
    topSearch: function (type) {
      var topForm = this.$refs["topSearchForm"];
      var bottomForm = this.$refs["bottomSearchForm"];
      switch (type) {
        case "topSearch":
          // 查询
          var data = topForm.getFormData().formData;
          this.getTopList(data);
          break;
        case "topReset":
          // 重置
          topForm.resetValidation();
          this.getTopList();
          break;
        case "topAdd":
          // 新增
          this.popupConfig.show = true;
          this.popupConfig.type = "topAdd";
          this.popupConfig.title = "添加字典类型";
          this.popupConfig.form = dictTypeForm; 
          var formData = {};
          for(var k in this.popupConfig.dictTypeFormTemp){
            if(typeof(this.popupConfig.dictTypeFormTemp[k])!=='undefined'){
              formData[k] = {
                value: this.popupConfig.dictTypeFormTemp[k]
              };
            }
          }
          this.popupConfig.formData = formData;
          this.popupConfig.formUpdateKey++;
          break;
        case "topEdit":
          // 修改
          var editData = this.topTable.selRow.data[0];
          this.popupConfig.show = true;
          this.popupConfig.type = "topEdit";
          this.popupConfig.title = "修改字典类型";
          this.popupConfig.form = dictTypeForm; 
          var formData = {};
          for(var k in this.popupConfig.dictTypeFormTemp){
            formData[k] = {
              value: typeof(editData[k])!=='undefined'?editData[k]:this.popupConfig.dictTypeFormTemp[k]
            };
          }
          this.popupConfig.formData = formData;
          this.popupConfig.formUpdateKey++;
          break;
        case "topDelete":
          // 删除
          var editData = this.topTable.selRow.data.map((item) => item[this.topMajorKey]);
          var that = this;
          this.$confirm({
            title: () => "删除",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => "确定要删除吗？",
            onOk() {
              return new Promise((resolve) => {
                // 删除
                that
                  .sendRequest(type, editData)
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      that.topTable.tableSelection.selectedRowKeys = [];
                      that.topTable.selRow.data = [];
                      var data = topForm.getFormData().formData;
                      that.getTopList(data);
                      that.topTable.selRow.data = [];
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
        case "topExport":
          // 导出

          break;
        case "bottomSearch":
          // 查询
          var data = bottomForm.getFormData().formData;
          this.getBottomList(data);
          break;
        case "bottomReset":
          // 重置
          bottomForm.resetValidation();
          this.getBottomList();
          break;
        case "bottomAdd":
          // 新增
          this.popupConfig.show = true;
          this.popupConfig.type = "bottomAdd";
          this.popupConfig.title = "添加字典数据";
          this.popupConfig.form = dictDataForm; 
          var formData = {};
          formData['dictType'] = {
            value: this.bottomTable.dictType
          }
          for(var k in this.popupConfig.dictDataFormTemp){
            if(typeof(this.popupConfig.dictDataFormTemp[k])!=='undefined'){
              formData[k] = {
                value: this.popupConfig.dictDataFormTemp[k]
              };
            }
          }
          this.popupConfig.formData = formData;
          this.popupConfig.formUpdateKey++;
          break;
        case "bottomEdit":
          // 修改
          var editData = this.bottomTable.selRow.data[0];
          this.sendRequest("bottomDetail", editData[this.bottomMajorKey]).then(res => {
            if(res.data.code == 200){
              var itemData = res.data.data;
              this.popupConfig.show = true;
              this.popupConfig.type = "bottomEdit";
              this.popupConfig.title = "修改字典数据";
              this.popupConfig.form = dictDataForm; 
              var formData = {};
              formData['dictType'] = {
                value: itemData.dictType
              }
              for(var k in this.popupConfig.dictDataFormTemp){
                formData[k] = {
                  value: typeof(itemData[k])!=='undefined'?itemData[k]:this.popupConfig.dictDataFormTemp[k]
                };
              }
              this.popupConfig.formData = formData;
              this.popupConfig.formUpdateKey++;
            }else{
              this.$message.error(res.data.msg);
            }
          });
          break;
        case "bottomDelete":
          // 删除
          var editData = this.bottomTable.selRow.data.map((item) => item[this.bottomMajorKey]);
          var that = this;
          this.$confirm({
            title: () => "删除",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => "确定要删除吗？",
            onOk() {
              return new Promise((resolve) => {
                // 删除
                that
                  .sendRequest("bottomDelete", editData)
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      that.bottomTable.tableSelection.selectedRowKeys = [];
                      that.bottomTable.selRow.data = [];
                      var data = bottomForm.getFormData().formData;
                      that.getBottomList(data);
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
        case "bottomExport":
          // 导出

          break;
      }
    },
    // 项目操作
    itemOptions: function (type, item) {
      var topForm = this.$refs["topSearchForm"];
      var bottomForm = this.$refs["bottomSearchForm"];
      switch (type) {
        case "topEdit":
          // 修改
          var editData = item;
          this.popupConfig.show = true;
          this.popupConfig.type = "topEdit";
          this.popupConfig.title = "添加字典类型";
          this.popupConfig.form = dictTypeForm; 
          var formData = {};
          for(var k in this.popupConfig.dictTypeFormTemp){
            formData[k] = {
              value: typeof(editData[k])!=='undefined'?editData[k]:this.popupConfig.dictTypeFormTemp[k]
            };
          }
          this.popupConfig.formData = formData;
          this.popupConfig.formUpdateKey++;
          break;
        case "topDelete":
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
                  .sendRequest(type, item[this.topMajorKey])
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      for(var i=that.topTable.selRow.data.length-1;i>=0;i--){
                        var one = that.topTable.selRow.data[i];
                        if(one[that.topMajorKey] == item[that.topMajorKey]){
                          that.topTable.tableSelection.selectedRowKeys.splice(i,1);
                          that.topTable.selRow.data.splice(i,1);
                        }
                      }
                      var data = topForm.getFormData().formData;
                      that.getTopList(data);
                    } else {
                      that.$message.error(res.data.msg);
                    }
                  })
                  .catch((err) => {
                    // console.log(err)
                    that.$message.error("服务器异常");
                    resolve(false);
                  });
              });
            },
            onCancel() {},
          });
          break;
        case "bottomEdit":
          // 修改
          var editData = item;
          this.sendRequest("bottomDetail", editData[this.bottomMajorKey]).then(res => {
            if(res.data.code == 200){
              var itemData = res.data.data;
              this.popupConfig.show = true;
              this.popupConfig.type = "bottomEdit";
              this.popupConfig.title = "修改字典数据";
              this.popupConfig.form = dictDataForm; 
              var formData = {};
              formData['dictType'] = {
                value: itemData.dictType
              }
              for(var k in this.popupConfig.dictDataFormTemp){
                formData[k] = {
                  value: typeof(itemData[k])!=='undefined'?itemData[k]:this.popupConfig.dictDataFormTemp[k]
                };
              }
              this.popupConfig.formData = formData;
              this.popupConfig.formUpdateKey++;
            }else{
              this.$message.error(res.data.msg);
            }
          });
          break;
        case "bottomDelete":
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
                  .sendRequest("bottomDelete", item[that.bottomMajorKey])
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      for(var i=that.bottomTable.selRow.data.length-1;i>=0;i--){
                        var one = that.bottomTable.selRow.data[i];
                        if(one[that.topMajorKey] == item[that.topMajorKey]){
                          that.bottomTable.tableSelection.selectedRowKeys.splice(i,1);
                          that.bottomTable.selRow.data.splice(i,1);
                        }
                      }
                      var data = bottomForm.getFormData().formData;
                      that.getBottomList(data);
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
    // table行选中事件
    onTopSelectChange: function (selectedRowKeys) {
      var selData = <any>[];
      this.topTable.tableData.forEach((one) => {
        if (selectedRowKeys.indexOf(one[this.topMajorKey]) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.topTable.selRow.data = selData;
      this.topTable.tableSelection.selectedRowKeys = selectedRowKeys;
    },
    // table 分页数量变更
    topTablePageChange: function (page) {
      var topForm = this.$refs["topSearchForm"];
      var data = topForm.getFormData().formData;
      this.getTopList(data);
    },
    // 选中字典类型
    selDictType: function (data) {
      // 渲染选中数据
      this.onTopSelectChange([data.record[this.topMajorKey]]);

      this.bottomTable.dictType = data.record.dictType;
      var bottomForm = this.$refs["bottomSearchForm"];
      var data = bottomForm.getFormData().formData;
      // 获取底部列表
      this.getBottomList(data);
    },
    // 获取底部列表
    getBottomList: function (params) {
      var queryParams = {
        dictType: this.bottomTable.dictType,
        pageNum: this.bottomTable.pagination.current,
        pageSize: this.bottomTable.pagination.pageSize,
      };
      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
        .get("/system/dict/data/list", {
          params: Object.assign(queryParams, params),
        })
        .then((res) => {
          loading.close();
          if (res.data.code == 200) {
            // this.tableData = [].concat(res.data.rows, res.data.rows, res.data.rows, res.data.rows);
            this.bottomTable.tableData = res.data.rows;
            this.bottomTable.pagination.total = res.data.total;
            // this.pagination.total = 50;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          loading.close();
        });
    },
    // table行选中事件
    onBottomSelectChange: function (selectedRowKeys) {
      var selData = <any>[];
      this.bottomTable.tableData.forEach((one) => {
        if (selectedRowKeys.indexOf(one[this.bottomMajorKey]) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.bottomTable.selRow.data = selData;
      this.bottomTable.tableSelection.selectedRowKeys = selectedRowKeys;
    },
    // table 分页数量变更
    bottomTablePageChange: function (page) {
      var bottomForm = this.$refs["bottomSearchForm"];
      var data = bottomForm.getFormData().formData;
      this.getBottomList(data);
    },
    // 新增/修改  保存提交
    submitConfig:function(state){
      if(state){
        var form = this.$refs["rowForm"];
        // 校验表单数据
        form.formValidation().then((res) => {
          if (res.state) {
            var isTop = /^top/ig.test(this.popupConfig.type);
            var queryParams = {...(isTop?this.popupConfig.dictTypeFormTemp:this.popupConfig.dictDataFormTemp)};
            // 合并表单项内容
            queryParams = Object.assign(queryParams, res.form);
            var loading = this.$loading({
              background: "rgba(0,0,0,0.0)",
              size: 166,
              iconColor: "#00678C",
            });
            this.sendRequest(this.popupConfig.type, queryParams)
              .then((requestRes) => {
                // console.log(requestRes);
                loading.close();
                if (requestRes.data.code == 200) {
                  this.$message.success(
                    /Add$/ig.test(this.popupConfig.type) ? "添加成功" : "保存成功"
                  );
                  this.popupConfig.show = false;
                  if(isTop){
                    var topForm = this.$refs["topSearchForm"];
                    var data = topForm.getFormData().formData;
                    this.getTopList(data);
                  }else{
                    var bottomForm = this.$refs["bottomSearchForm"];
                    var data = bottomForm.getFormData().formData;
                    this.getBottomList(data);
                  }
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
      }else{
        this.popupConfig.show = false;
      }
    },
  },
  mounted: function () {
    var moduleHeight = this.$el.querySelector(".top").clientHeight;
    this.topTable.topFormHeight = this.$el.querySelector(
      ".top .topSearchForm"
    ).clientHeight;
    // 标题 40+10 上下padding 20 分页 25+10
    this.topTable.tableViewHeight =
      moduleHeight - (85 + 40 + this.topTable.topFormHeight);

    this.bottomTable.topFormHeight = this.$el.querySelector(
      ".bottom .topSearchForm"
    ).clientHeight;
    // 标题 40+10 上下padding 20 分页 25+10
    this.bottomTable.tableViewHeight =
      moduleHeight - (85 + 40 + this.bottomTable.topFormHeight);
  },
  created: function () {
    // 获取顶部列表
    this.getTopList();
  },
});
</script>
<style lang="less">
@import url("../../../common/base.less");

.systemDictPage {
  height: 100%;
  background-color: #eee;
  overflow: hidden;
  > .top,
  > .bottom {
    height: calc((100% - 10px) / 2);
    background-color: #fff;
    padding: 20px;
    overflow: hidden;

    > .topSearch {
      margin-bottom: 10px;

      > .tableTit {
        padding: 0 10px;
        background-color: #f1f1f1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        > .tit {
          height: 40px;
          line-height: 40px;

          > .shrinkBtn {
            display: inline-block;
            margin-right: 10px;
            font-size: 20px;
            // color: #aaa;
            user-select: none;
            cursor: pointer;
            svg {
              display: block;
            }
            path {
              fill: #666;
            }
            &.shrink {
              > .alp_icon {
                transform-origin: 50% 50%;
                transform: rotate(180deg);
              }
            }
          }
          > span {
            vertical-align: top;
          }
        }
        > .tableBtn {
          height: 30px;
          line-height: 30px;
          > .ant-btn:not(:last-child) {
            margin-right: 10px;
          }
        }
      }

      > .topSearchForm {
        padding: 10px;
        border: 1px solid #ccc;
        border-top: 0;
        max-height: 1000px;
        transition: all 0.2s;

        &.shrink {
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

      .link {
        color: @activeColor;
        cursor: pointer;
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

  > .bottom {
    margin-top: 10px;
  }
}
</style>