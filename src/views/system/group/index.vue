<template>
  <div class="groupPage">
    <div class="top">
      <div class="topSearch">
        <div class="tableTit">
          <div class="tit">
            <div
                class="shrinkBtn"
                @click="topFormShrink('top')"
                :class="{ shrink: topSearchFormShrink }"
            >
              <alpIcon :size="16" type="svg" icon="miscChevronUpDouble24.svg"/>
            </div>
            <span>用户组</span>
          </div>
          <div class="tableBtn">
            <a-button
                type="primary"
                size="small"
                @click="topSearch('topSearch')"
            >
              <template #icon>
                <SearchOutlined/>
              </template>
              搜索
            </a-button>
            <a-button size="small" @click="topSearch('topReset')">
              <template #icon>
                <SyncOutlined/>
              </template>
              重置
            </a-button>
            <a-button size="small" @click="topSearch('topAdd')">
              <template #icon>
                <PlusOutlined/>
              </template>
              新增
            </a-button>
            <a-button
                size="small"
                @click="topSearch('topEdit')"
                :disabled="topTable.tableSelection.selectedRowKeys.length !== 1"
            >
              <template #icon>
                <EditOutlined/>
              </template>
              修改
            </a-button>
            <a-button
                size="small"
                @click="topSearch('topDelete')"
                :disabled="topTable.tableSelection.selectedRowKeys.length == 0"
            >
              <template #icon>
                <DeleteOutlined/>
              </template>
              删除
            </a-button>
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
              <div @click="selSysUserGroup(scope)">
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
                >
                  <EditOutlined/>
                  修改
                </a-button
                >
                <a-button
                    size="small"
                    type="text"
                    @click="itemOptions('topDelete', row)"
                >
                  <DeleteOutlined/>
                  删除
                </a-button
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
              <alpIcon :size="16" type="svg" icon="miscChevronUpDouble24.svg"/>
            </div>
            <span>组成员</span>
          </div>
          <div class="tableBtn">
            <a-button
                type="primary"
                size="small"
                @click="topSearch('bottomSearch')"
            >
              <template #icon>
                <SearchOutlined/>
              </template>
              搜索
            </a-button>
            <a-button size="small" @click="topSearch('bottomReset')">
              <template #icon>
                <SyncOutlined/>
              </template>
              重置
            </a-button>

            <a-button size="small" @click="topSearch('bottomAdd')">
              <template #icon>
                <SelectOutlined />
              </template>
              选择
            </a-button>
            <a-button
                size="small"
                @click="topSearch('bottomDelete')"
                :disabled="bottomTable.tableSelection.selectedRowKeys.length == 0"
            >
              <template #icon>
                <DeleteOutlined/>
              </template>
              删除
            </a-button>
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
              :customRow="onBottomCustomRow"
          >
            <template #status="{ text: row }">
              <span class="card" :class="{ err: row !== '0' }">{{
                  row == "0" ? "正常" : "停用"
                }}</span>
            </template>
            <template #options="{ text: row }">
              <div class="rowBtns" @click.stop="">
                <a-button
                    size="small"
                    type="text"
                    @click="itemOptions('bottomDelete', row)"
                >
                  <DeleteOutlined/>
                  删除
                </a-button
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
        >保存
        </a-button
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

    <!-- 人员选择 -->
    <a-modal
        title="人员选择"
        v-model:visible="userSelect.show"
        width="800px"
        class="userSelectPopup"
    >
      <template #footer>
        <a-button key="back" @click="userSelect.show = false">取消</a-button>
        <a-button
            key="submit"
            type="primary"
            @click="submitSelectUser(true)"
        >确定</a-button>
      </template>
      <div class="main">
        <div class="search">
          <alpFormGroup
              v-if="userSelect.show"
              ref="selectUserSearchForm"
              :options="userSelect.search"
              :form_data="userSelect.searchData"
          >
            <template #btns>
              <div class="btns">
                <a-button type="primary" size="small" @click="searchSelectUser('search')"><template #icon><SearchOutlined /></template>搜索</a-button>
                <a-button size="small" @click="searchSelectUser('reset')"><template #icon><SyncOutlined /></template>重置</a-button>
              </div>
            </template>
          </alpFormGroup>
        </div>
        <div class="table">
          <a-table
              :columns="userSelect.columns"
              :data-source="userSelect.tableData"
              :row-selection="userSelect.tableSelection"
              :pagination="false"
              size="small"
              :scroll="{ y: 300, x: true }"
              bordered
          >
          </a-table>
        </div>
        <div class="pagination" v-if='userSelect.total'>
          <a-pagination
              size="small"
              @change="selectUserPageChange"
              @showSizeChange="selectUserPageChange"
              v-model:current="userSelect.current"
              v-model:pageSize="userSelect.pageSize"
              :total="userSelect.total"
              :pageSizeOptions="userSelect.pageSizeOptions"
              :show-total="userSelect.showTotal"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import {defineComponent, createVNode} from "vue";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

import formConfig from "./formConfig.js";

// 用户组表单配置数据
const sysUserGroupForm = formConfig.sysUserGroupForm;

export default defineComponent({
  name: "groupPage",
  data: function () {
    return {
      topSearchForm: formConfig.topSearchForm,
      topSearchFormShrink: false,
      topFormHeight: 0,
      topMajorKey: 'id',
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
          {
            dataIndex: "name",
            key: "name",
            title: "用户组名称",
            slots: {customRender: "name"},
          },
          {
            dataIndex: "code",
            key: "code",
            title: "用户组编码",
            slots: {customRender: "code"},
          },
          {
            dataIndex: "remark",
            key: "remark",
            title: "备注",
            slots: {customRender: "remark"},
          },
          {
            width: 150,
            title: "操作",
            key: "options",
            slots: {customRender: "options"},
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
      bottomMajorKey: 'userId',
      bottomTable: {
        userId: null,
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
          {
            dataIndex: "userName",
            key: "userName",
            title: "用户名称",
          },
          {
            dataIndex: "nickName",
            key: "nickName",
            title: "用户昵称",
          },
          {
            width: 150,
            title: "操作",
            key: "options",
            slots: {customRender: "options"},
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
        sysUserGroupFormTemp: {
          id: undefined,
          name: undefined,
          code: undefined,
          remark: undefined,
          createBy: undefined,
          createTime: undefined,
          updateBy: undefined,
          updateTime: undefined,
        },
        formUpdateKey: 1,
        type: "add", // add/edit
        data: [],
        form: {},
        formData: {},
        loading: false,
      },
      // 用户选择
      userSelect: {
        show: false,
        search: formConfig.userSelectForm,
        searchData: {},
        columns: [
          {
            dataIndex: "userName",
            key: "userName",
            width: 200,
            title: "用户名称",
          },
          {
            dataIndex: "nickName",
            key: "nickName",
            width: 200,
            title: "用户昵称",
          },
          {
            dataIndex: "deptId",
            key: "deptId",
            title: "部门",
          }
        ],
        tableData: [],
        tableSelection: {
          selectedRowKeys: [],
          onChange: this.selectUserSelectChange,
        },
        selData: [],
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
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
          .get("/system/group/list", {
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
              this.$message
                  .error(res.data.msg);
            }
          })
          .catch((err) => {
            loading.close();
          });
    },
    // 新增/修改/删除  top-用户组  bottom-用户信息
    sendRequest: function (type, data) {
      switch (type) {
        case "topAdd":
          // 新增
          return this.$axios
              .post("/system/group", data);
        case "topEdit":
          // 修改
          return this.$axios
              .put("/system/group", data);
        case "topDelete":
          //  删除
          return this.$axios
              .delete("/system/group/" + data);
        case "topDetail":
          //  获取单一详情
          return this.$axios
              .get("/system/group/" + data);
        case "bottomAdd":
          // 新增
          return this.$axios
              .post("/system/group/user", data);
        case "bottomDelete":
          //  删除
          return this.$axios
              .delete("/system/group/user/" + data);
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
          this.popupConfig.title = "添加用户组";
          this.popupConfig.form = sysUserGroupForm;
          var formData = {};
          for (var k in this.popupConfig.sysUserGroupFormTemp) {
            if (typeof (this.popupConfig.sysUserGroupFormTemp[k]) !== 'undefined') {
              formData[k] = {
                value: this.popupConfig.sysUserGroupFormTemp[k]
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
          this.popupConfig.title = "修改用户组";
          this.popupConfig.form = sysUserGroupForm;
          var formData = {};
          for (var k in this.popupConfig.sysUserGroupFormTemp) {
            formData[k] = {
              value: typeof (editData[k]) !== 'undefined' ? editData[k] : this.popupConfig.sysUserGroupFormTemp[k]
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
                        that.$message
                            .error(res.data.msg);
                      }
                    })
                    .catch((err) => {
                      that.$message
                          .error("服务器异常");
                      resolve(false);
                    });
              });
            },
            onCancel() {
            },
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
          if(!this.bottomTable.groupId){
            this.$message
                .error("请先选择要绑定的用户组");
            break;
          }
          this.userSelect.show = true;
          this.userSelect.current = 1;
          this.userSelect.total = 0;
          this.userSelect.tableData = [];
          this.userSelect.selData = [];
          this.userSelect.tableSelection.selectedRowKeys = [];
          this.getUserList();
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
                        that.$message
                            .error(res.data.msg);
                      }
                    })
                    .catch((err) => {
                      that.$message
                          .error("服务器异常");
                      resolve(false);
                    });
              });
            },
            onCancel() {
            },
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
          this.popupConfig.title = "添加用户组";
          this.popupConfig.form = sysUserGroupForm;
          var formData = {};
          for (var k in this.popupConfig.sysUserGroupFormTemp) {
            formData[k] = {
              value: typeof (editData[k]) !== 'undefined' ? editData[k] : this.popupConfig.sysUserGroupFormTemp[k]
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
                    .sendRequest(type, item[that.topMajorKey])
                    .then((res) => {
                      resolve(true);
                      if (res.data.code == 200) {
                        for (var i = that.topTable.selRow.data.length - 1; i >= 0; i--) {
                          var one = that.topTable.selRow.data[i];
                          if (one[that.topMajorKey] == item[that.topMajorKey]) {
                            that.topTable.tableSelection.selectedRowKeys.splice(i, 1);
                            that.topTable.selRow.data.splice(i, 1);
                          }
                        }
                        var data = topForm.getFormData().formData;
                        that.getTopList(data);
                      } else {
                        that.$message
                            .error(res.data.msg);
                      }
                    })
                    .catch((err) => {
                      // console.log(err)
                      that.$message
                          .error("服务器异常");
                      resolve(false);
                    });
              });
            },
            onCancel() {
            },
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
                        for (var i = that.bottomTable.selRow.data.length - 1; i >= 0; i--) {
                          var one = that.bottomTable.selRow.data[i];
                          if (one[that.topMajorKey] == item[that.topMajorKey]) {
                            that.bottomTable.tableSelection.selectedRowKeys.splice(i, 1);
                            that.bottomTable.selRow.data.splice(i, 1);
                          }
                        }
                        var data = bottomForm.getFormData().formData;
                        that.getBottomList(data);
                      } else {
                        that.$message
                            .error(res.data.msg);
                      }
                    })
                    .catch((err) => {
                      that.$message
                          .error("服务器异常");
                      resolve(false);
                    });
              });
            },
            onCancel() {
            },
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
    // 选中用户组
    selSysUserGroup: function (data) {
      // 渲染选中数据
      this.onTopSelectChange([data.record[this.topMajorKey]]);

      this.bottomTable.groupId = data.record[this.topMajorKey];
      var bottomForm = this.$refs["bottomSearchForm"];
      var data = bottomForm.getFormData().formData;
      // 获取底部列表
      this.getBottomList(data);
      this.bottomTable.selRow.data = [];
      this.bottomTable.tableSelection.selectedRowKeys = [];
    },
    // 获取底部列表
    getBottomList: function (params) {
      var queryParams = {
        id: this.bottomTable.groupId,
        pageNum: this.bottomTable.pagination.current,
        pageSize: this.bottomTable.pagination.pageSize,
      };
      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
          .get("/system/group/user/list", {
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
              this.$message
                  .error(res.data.msg);
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
    // 点击行
    onBottomCustomRow: function (record, idx) {
      return {
        onClick: event => {
          var selId = record[this.bottomMajorKey], selArr = this.bottomTable.tableSelection.selectedRowKeys;
          var selIdx = selArr.indexOf(selId);
          if (selArr.length > 1 && (selIdx != -1)) {
            // 多选
            selArr.splice(selIdx, 1);
          } else if (selArr.length < 2) {
            // 单选
            selArr = [selId];
          }
          this.onBottomSelectChange(selArr);
        }
      }
    },
    // table 分页数量变更
    bottomTablePageChange: function (page) {
      var bottomForm = this.$refs["bottomSearchForm"];
      var data = bottomForm.getFormData().formData;
      this.getBottomList(data);
    },
    // 新增/修改  保存提交
    submitConfig: function (state) {
      if (state) {
        var form = this.$refs["rowForm"];
        // 校验表单数据
        form.formValidation().then((res) => {
          if (res.state) {
            var isTop = /^top/ig.test(this.popupConfig.type);
            var queryParams = {...(isTop ? this.popupConfig.sysUserGroupFormTemp : this.popupConfig.sysUserFormTemp)};
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
                    this.$message
                        .success(
                            /Add$/ig.test(this.popupConfig.type) ? "添加成功" : "保存成功"
                        );
                    this.popupConfig.show = false;
                    if (isTop) {
                      var topForm = this.$refs["topSearchForm"];
                      var data = topForm.getFormData().formData;
                      this.getTopList(data);
                    } else {
                      var bottomForm = this.$refs["bottomSearchForm"];
                      var data = bottomForm.getFormData().formData;
                      this.getBottomList(data);
                    }
                  } else {
                    this.$message
                        .error(requestRes.data.msg);
                  }
                })
                .catch((err) => {
                  loading.close();
                  this.$message
                      .error("服务器异常");
                });
          }
        });
      } else {
        this.popupConfig.show = false;
      }
    },
    // 选择用户提交
    submitSelectUser: function(state){
      var ids = this.userSelect.selData.map(o => o.userId);
      var searchForm = this.$refs["selectUserSearchForm"];
      var searchData = searchForm.getFormData().formData;
      if(!ids.length){
        this.$message.error('选择要加入的组成员');
        return;
      }

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      var queryData = {groupId:this.bottomTable.groupId,userId:ids.join(',')};
      this.sendRequest('bottomAdd',queryData).then(res => {
        loading.close();
        if(res.data.code == 200){
          this.userSelect.show = false;
          var form = this.$refs["bottomSearchForm"];
          var data = form.getFormData().formData;
          this.getBottomList(data);
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(err => {
        loading.close();
        this.$message.error('服务器异常');
      });
    },
    // 选择用户表格查询
    searchSelectUser: function(type){
      var form = this.$refs["selectUserSearchForm"];
      switch (type) {
        case "search":
          break;
        case "reset":
          form.resetValidation();
          break;
      }
      var data = form.getFormData().formData;
      this.getUserList(data);
    },
    // 导入表 分页
    selectUserPageChange: function(){
      this.userSelect.selData = [];
      var form = this.$refs["selectUserSearchForm"];
      var data = form.getFormData().formData;
      this.getUserList(data);
    },
    // table行选中事件
    selectUserSelectChange: function (selectedRowKeys) {
      var selData = <any>[];
      this.userSelect.tableData.forEach((one,idx) => {
        if (selectedRowKeys.indexOf(idx) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.userSelect.selData = selData;
      this.userSelect.tableSelection.selectedRowKeys = selectedRowKeys;
    },
    // 获取导入表
    getUserList: function(params){
      var queryParams = {
        id: this.bottomTable.groupId,
        pageNum: this.userSelect.current,
        pageSize: this.userSelect.pageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
          .get("/system/group/user/select", {
            params: Object.assign(queryParams, params),
          })
          .then((res) => {
            loading.close();
            if (res.data.code == 200) {
              this.userSelect.tableData = res.data.rows;
              this.userSelect.total = res.data.total;
              this.userSelect.tableData = res.data.rows;
              this.userSelect.pagination.total = res.data.total;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            loading.close();
          });
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

.groupPage {
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
.userSelectPopup{
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