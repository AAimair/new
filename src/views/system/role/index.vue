<template>
  <div class="systemRolePage">
    <div class="topSearch">
      <div class="tableTit">
        <div class="tit">
          <div
            class="shrinkBtn"
            @click="shrinkTopForm"
            :class="{ shrink: topFormShrink }"
          >
            <alpIcon :size="16" type="svg" icon="miscChevronUpDouble24.svg" />
          </div>
          <span>角色列表</span>
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
          <!-- <a-button size="small" @click="topSearch('export')">
            <template #icon><PlusOutlined /></template>
            导出
          </a-button> -->
        </div>
      </div>
      <div class="topSearchForm" :class="{ shrink: topFormShrink }">
        <alpFormGroup
          ref="topForm"
          :options="topForm"
          :form_data="topFormData"
        ></alpFormGroup>
      </div>
    </div>
    <div class="tableView">
      <div class="table" :style="{ height: tableViewHeight + 'px' }">
        <a-table
          :columns="columns"
          :data-source="tableData"
          :row-selection="tableSelection"
          :pagination="false"
          size="small"
          :rowKey="majorKey"
          :scroll="{ y: tableViewHeight - 40 }"
          bordered
          :customRow="customRow"
        >
          <template #status="{ text: row }">
            <span class="card" :class="{ err: row.status !== '0' }">{{
              row.status == "0" ? "正常" : "停用"
            }}</span>
          </template>
          <template #options="{ text: row }">
            <div class="rowBtns" v-if="row.roleKey != 'admin'" @click.stop="">
              <a-button
                size="small"
                type="text"
                @click="itemOptions('edit', row)"
                ><EditOutlined />修改</a-button
              >
              <a-button
                size="small"
                type="text"
                @click="itemOptions('delete', row)"
                ><DeleteOutlined />删除</a-button
              >
              <a-dropdown :trigger="['click']">
                <a-button size="small" type="text"
                  >更多<DownOutlined
                /></a-button>
                <template #overlay>
                  <a-menu @click="(common) => itemOptions(common.key, row)">
                    <a-menu-item key="dataLimit">数据权限</a-menu-item>
                    <a-menu-item key="allotUse">分配用户</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
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

    <!-- 新增/修改弹窗 -->
    <a-modal
      v-model:visible="rowConfig.show"
      :title="rowConfig.type == 'add' ? '添加角色' : '修改角色'"
      :width="500"
      :closable="false"
      class="editPopup"
    >
      <template #footer>
        <a-button key="back" @click="submitConfig(false)">取消</a-button>
        <a-button key="submit" type="primary" @click="submitConfig(true)"
          >保存</a-button
        >
      </template>
      <div class="popupMain">
        <alpFormGroup
          v-if="rowConfig.show"
          ref="rowForm"
          :options="tableRowForm"
          :form_data="tableRowFormData"
        >
          <template #menuLimit>
            <div class="group">
              <div class="label">菜单权限</div>
              <div class="setInput">
                <div class="control">
                  <a-checkbox
                    size="small"
                    v-model:checked="control.fold"
                    @change="controlChange('fold')"
                    >展开/折叠</a-checkbox
                  >
                  <a-checkbox
                    size="small"
                    v-model:checked="control.selAll"
                    @change="controlChange('selAll')"
                    >全选/全不选</a-checkbox
                  >
                  <a-checkbox
                    size="small"
                    v-model:checked="control.relevancy"
                    @change="controlChange('relevancy')"
                    >父子联动</a-checkbox
                  >
                </div>
                <div class="tree">
                  <a-tree
                    checkable
                    size="small"
                    :tree-data="menuTreeData"
                    :checkStrictly="!control.relevancy"
                    v-model:expandedKeys="menuExpandedKeys"
                    v-model:checkedKeys="menuCheckedKeys"
                    :replaceFields="{
                      children: 'children',
                      title: 'menuName',
                      key: 'menuId',
                      value: 'menuId',
                    }"
                  >
                    <template #title0010
                      ><span style="color: #1890ff">sss</span></template
                    >
                  </a-tree>
                </div>
              </div>
            </div>
          </template>
        </alpFormGroup>
      </div>
    </a-modal>

    <!-- 分配数据权限 -->
    <a-modal
      v-model:visible="dataLimitConfig.show"
      title="分配数据权限"
      :width="500"
      :closable="false"
      class="editPopup"
    >
      <template #footer>
        <a-button key="back" @click="submitDataLimitConfig(false)"
          >取消</a-button
        >
        <a-button
          key="submit"
          type="primary"
          @click="submitDataLimitConfig(true)"
          >保存</a-button
        >
      </template>
      <div class="popupMain">
        <alpFormGroup
          v-if="dataLimitConfig.show"
          ref="dataLimitForm"
          :options="dataLimitForm"
          :form_data="dataLimitFormData"
        >
          <template #dataLimit>
            <div class="group">
              <div class="label">数据权限</div>
              <div class="setInput">
                <div class="control">
                  <a-checkbox
                    size="small"
                    v-model:checked="control.dataLimitFold"
                    @change="controlChange('dataLimitFold')"
                    >展开/折叠</a-checkbox
                  >
                  <a-checkbox
                    size="small"
                    v-model:checked="control.dataLimitSelAll"
                    @change="controlChange('dataLimitSelAll')"
                    >全选/全不选</a-checkbox
                  >
                  <a-checkbox
                    size="small"
                    v-model:checked="control.dataLimitRelevancy"
                    @change="controlChange('dataLimitRelevancy')"
                    >父子联动</a-checkbox
                  >
                </div>
                <div class="tree">
                  <a-tree
                    checkable
                    size="small"
                    :tree-data="dataLimitTreeData"
                    :checkStrictly="!control.dataLimitRelevancy"
                    v-model:expandedKeys="dataLimitExpandedKeys"
                    v-model:checkedKeys="dataLimitCheckedKeys"
                    :replaceFields="{
                      children: 'children',
                      title: 'deptName',
                      key: 'deptId',
                      value: 'deptId',
                    }"
                  >
                    <template #title0010
                      ><span style="color: #1890ff">sss</span></template
                    >
                  </a-tree>
                </div>
              </div>
            </div>
          </template>
        </alpFormGroup>
      </div>
    </a-modal>

    <!-- 分配用户 -->
    <a-modal
      v-model:visible="allotUserConfig.show"
      title="分配数据权限"
      :closable="false"
      wrapClassName="allotUserPopup"
    >
      <template #footer>
        <a-button key="back" @click="submitAllotUserConfig(false)"
          >关闭</a-button
        >
        <!-- <a-button
          key="submit"
          type="primary"
          @click="submitAllotUserConfig(true)"
          >保存</a-button
        > -->
      </template>
      <div class="popupMain">
        <div class="top">
          <alpFormGroup ref="allotUserTopForm" :options="topAllotUserForm">
            <template #topBtns>
              <a-button
                type="primary"
                size="small"
                @click="topSearch('allotUserSearch')"
              >
                <template #icon><SearchOutlined /></template>
                搜索
              </a-button>
              <a-button size="small" @click="topSearch('allotUserReset')">
                <template #icon><SyncOutlined /></template>
                重置
              </a-button>
              <a-button size="small" @click="topSearch('addUser')">
                <template #icon><PlusOutlined /></template>
                添加用户
              </a-button>
              <a-button
                size="small"
                @click="topSearch('batchCancel')"
                :disabled="allotUserConfig.selData.length == 0"
              >
                <template #icon><CloseCircleOutlined /></template>
                批量取消授权
              </a-button>
            </template>
          </alpFormGroup>
        </div>
        <div class="tableView">
          <div class="table" :style="{ height: tableViewHeight + 40 + 'px' }">
            <a-table
              :columns="allotUserConfig.columns"
              :data-source="allotUserConfig.tableData"
              :row-selection="allotUserConfig.tableSelection"
              :pagination="false"
              size="small"
              :rowKey="allotUserConfig.majorKey"
              :scroll="{ y: tableViewHeight - 0 }"
              bordered
              :customRow="allotUserCustomRow"
            >
              <template #status="{ text: row }">
                <span class="card" :class="{ err: row.status !== '0' }">{{
                  row.status == "0" ? "正常" : "停用"
                }}</span>
              </template>
              <template #options="{ text: row }">
                <div class="rowBtns" @click.stop="">
                  <a-button
                    size="small"
                    type="text"
                    @click="itemOptions('cancelAllot', row)"
                    ><CloseCircleOutlined />取消授权</a-button
                  >
                </div>
              </template>
            </a-table>
          </div>
          <div class="pagination">
            <a-pagination
              size="small"
              @change="allotUserTablePageChange('user')"
              @showSizeChange="allotUserTablePageChange('user')"
              v-model:current="allotUserConfig.current"
              v-model:pageSize="allotUserConfig.pageSize"
              :total="allotUserConfig.total"
              :pageSizeOptions="allotUserConfig.pageSizeOptions"
              show-size-changer
              :show-total="allotUserConfig.showTotal"
            />
          </div>
        </div>
      </div>
    </a-modal>

    <!-- 分配用户选择 弹窗 -->
    <a-modal
      v-model:visible="allotUserConfig.selUserShow"
      title="选择用户"
      :width="800"
      :closable="false"
      class="selUserPopup"
    >
      <template #footer>
        <a-button key="back" @click="submitSelUserConfig(false)">取消</a-button>
        <a-button key="submit" type="primary" @click="submitSelUserConfig(true)"
          >确定</a-button
        >
      </template>
      <div class="popupMain">
        <div class="top">
          <alpFormGroup ref="selUserTopForm" :options="topAllotUserForm">
            <template #topBtns>
              <a-button
                type="primary"
                size="small"
                @click="topSearch('selUserSearch')"
              >
                <template #icon><SearchOutlined /></template>
                搜索
              </a-button>
              <a-button size="small" @click="topSearch('selUserReset')">
                <template #icon><SyncOutlined /></template>
                重置
              </a-button>
            </template>
          </alpFormGroup>
        </div>
        <div class="tableView">
          <div class="table" :style="{ height: 440 + 'px' }">
            <a-table
              :columns="
                allotUserConfig.columns.filter((o) => o.key != 'options')
              "
              :data-source="allotUserConfig.userTableData"
              :row-selection="allotUserConfig.userTableSelection"
              :pagination="false"
              size="small"
              :rowKey="allotUserConfig.majorKey"
              :scroll="{ y: 400 }"
              bordered
              :customRow="selUserCustomRow"
            >
              <template #status="{ text: row }">
                <span class="card" :class="{ err: row.status !== '0' }">{{
                  row.status == "0" ? "正常" : "停用"
                }}</span>
              </template>
            </a-table>
          </div>
          <div class="pagination">
            <a-pagination
              size="small"
              @change="allotUserTablePageChange('addUser')"
              @showSizeChange="allotUserTablePageChange('addUser')"
              v-model:current="allotUserConfig.userTableCurrent"
              v-model:pageSize="allotUserConfig.userTablePageSize"
              :total="allotUserConfig.userTableTotal"
              :pageSizeOptions="allotUserConfig.pageSizeOptions"
              show-size-changer
              :show-total="allotUserConfig.showTotal"
            />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, createVNode, ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import formConfig from "./formConfig.js";

export default defineComponent({
  name: "systemRolePage",
  data: function () {
    return {
      // 表格主键
      majorKey: "roleId",
      // 子系统下拉项
      subSysOpt: [],
      // 顶部查询表单配置
      topForm: formConfig.topForm,
      // 顶部查询表单收缩
      topFormShrink: false,
      // 顶部查询表单高度
      topFormHeight: 0,
      // 顶部查询表单初始化默认值
      topFormData: {},
      // 表格勾选绑定数据
      tableSelection: {
        // 选中ID集合
        selectedRowKeys: [],
        // 勾选回调方法
        onChange: this.onSelectChange,
      },
      // 表格分页配置
      pagination: {
        showTotal: (total) => `共 ${total} 条`,
        total: 1,
        pageSizeOptions: ["10", "20", "30", "50"],
        current: 1,
        pageSize: 10,
      },
      // 表格数据
      tableData: [],
      // 表格列配置
      columns: [
        // {
        //   dataIndex: "roleId",
        //   key: "roleId",
        //   title: "岗位编号",
        // },
        {
          dataIndex: "roleName",
          key: "roleName",
          title: "角色名称",
        },
        {
          dataIndex: "roleKey",
          key: "roleKey",
          title: "权限字符",
        },
        {
          dataIndex: "roleSort",
          key: "roleSort",
          title: "显示顺序",
        },
        {
          width: 100,
          key: "status",
          title: "状态",
          slots: { customRender: "status" },
        },
        {
          dataIndex: "createTime",
          key: "createTime",
          title: "创建时间",
        },
        {
          width: 200,
          title: "操作",
          key: "options",
          slots: { customRender: "options" },
        },
      ],
      // 表格视口高度
      tableViewHeight: 200,
      // 表格行数据  新建/编辑 表单
      tableRowForm: formConfig.tableRowForm,
      // 表格行数据  新建/编辑 表单 初始化数据
      tableRowFormData: ref({}),
      // 表格行数据  弹窗配置
      rowConfig: {
        show: false,
        type: "edit", // add/edit
        data: [],
      },
      // 分配数据权限  弹窗配置
      dataLimitConfig: {
        show: false,
        type: "edit", // add/edit
        data: null,
      },
      // 分配数据权限  弹窗表单配置
      dataLimitForm: formConfig.dataLimitForm,
      // 分配数据权限  弹窗表单  初始化表单值
      dataLimitFormData: ref({}),

      // 菜单树 配置/选中 数据
      menuTreeData: [],
      menuExpandedKeys: [],
      allMenuNodeKeys: [],
      menuCheckedKeys: [],
      dataLimitTreeData: [],
      dataLimitExpandedKeys: [],
      allDataLimitNodeKeys: [],
      dataLimitCheckedKeys: [],
      control: {
        fold: false,
        selAll: false,
        relevancy: true,
        dataLimitFold: false,
        dataLimitSelAll: false,
        dataLimitRelevancy: true,
      },

      // 用户授权顶部查询表单
      topAllotUserForm: formConfig.topAllotUserForm,
      allotUserConfig: {
        roleId: "",
        show: false,
        selUserShow: false,
        type: "edit", // add/edit
        data: null,
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
            dataIndex: "email",
            key: "email",
            title: "邮箱",
          },
          {
            dataIndex: "phonenumber",
            key: "phonenumber",
            title: "手机",
          },
          {
            width: 100,
            key: "status",
            title: "状态",
            slots: { customRender: "status" },
          },
          {
            dataIndex: "createTime",
            key: "createTime",
            title: "创建时间",
          },
          {
            width: 120,
            title: "操作",
            key: "options",
            slots: { customRender: "options" },
          },
        ],
        tableData: [],
        tableSelection: {
          selectedRowKeys: [],
          onChange: this.allotUserSelectChange,
        },
        userTableData: [],
        userTableSelection: {
          selectedRowKeys: [],
          onChange: this.selUserSelectChange,
        },
        selData: [],
        majorKey: "userId",
        showTotal: (total) => `共 ${total} 条`,
        pageSizeOptions: ["10", "20", "30", "50"],
        total: 1,
        current: 1,
        pageSize: 10,
        userTableTotal: 1,
        userTableCurrent: 1,
        userTablePageSize: 10,
      },

      // 保存/编辑 表单模板
      formTemplate: {
        subsysId: undefined,
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: undefined,
        menuIds: undefined,
        status: '0',
        remark: undefined,
        dataScope: undefined,
      },
    };
  },
  mounted: function () {
    var moduleHeight = this.$el.clientHeight;
    this.topFormHeight = this.$el.querySelector(".topSearchForm").clientHeight;
    // 标题 40+10 上下padding 20 分页 25+10
    this.tableViewHeight = moduleHeight - (85 + 40 + this.topFormHeight);
  },
  created: function () {
    this.getList();
    // 获取子系统
    this.genInterface("getSubSys").then((res) => {
      if (res.data.code == 200) {
        this.subSysOpt = res.data.rows.map((o) => {
          return {
            label: o.subsysName,
            value: o.subsysId,
          };
        });
        formConfig.tableRowForm.form[1].options = this.subSysOpt;
      }
    });
    // 获取菜单下拉树
    this.genInterface("getMenuTree").then((res) => {
      // console.log(res)
      if (res.data.code == 200) {
        this.allMenuNodeKeys = res.data.data.map((o) => o.menuId);
        var tree = this.parseTree(res.data.data, "menuId");
        this.menuTreeData = tree;
      }
    });
    // 获取部门下拉树
    this.genInterface("getDeptTree").then((res) => {
      // console.log(res)
      if (res.data.code == 200) {
        this.allDataLimitNodeKeys = res.data.data.map((o) => o.deptId);
        var tree = this.parseTree(res.data.data, "deptId");
        this.dataLimitTreeData = tree;
      }
    });
  },
  methods: {
    // 解析树
    parseTree: function (data, key) {
      var res = <any>[];
      for (var i = 0; i < data.length; i++) {
        var one = data[i];
        var searchRes = this.$common.recursiveSearch({
          data: res,
          recursiveKey: "children",
          searchKey: key,
          searchVal: one.parentId,
        });
        if (searchRes.result) {
          searchRes.data.children.push({
            ...one,
            children: [],
          });
        } else {
          res.push({
            ...one,
            children: [],
          });
        }
      }
      return res;
    },
    // 获取列表
    getList: function (params) {
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
        .get("/system/role/list", {
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
    // 获取分配用户列表
    getAllotUserList: function (params) {
      var queryParams = {
        roleId: this.allotUserConfig.roleId,
        pageNum: this.allotUserConfig.current,
        pageSize: this.allotUserConfig.pageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
        .get("/system/role/authUser/allocatedList", {
          params: Object.assign(queryParams, params),
        })
        .then((res) => {
          loading.close();
          if (res.data.code == 200) {
            this.allotUserConfig.tableData = res.data.rows;
            this.allotUserConfig.total = res.data.total;
            // this.pagination.total = 50;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          loading.close();
        });
    },
    // 获取未分配用户列表
    getAllotAddUserList: function (params) {
      var queryParams = {
        roleId: this.allotUserConfig.roleId,
        pageNum: this.allotUserConfig.userTableCurrent,
        pageSize: this.allotUserConfig.userTablePageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
        .get("/system/role/authUser/unallocatedList", {
          params: Object.assign(queryParams, params),
        })
        .then((res) => {
          loading.close();
          if (res.data.code == 200) {
            this.allotUserConfig.userTableData = res.data.rows;
            this.allotUserConfig.userTableTotal = res.data.total;
            // this.pagination.total = 50;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          loading.close();
        });
    },
    // 收缩顶部查询表单
    shrinkTopForm: function () {
      this.topFormShrink = !this.topFormShrink;
      this.tableViewHeight +=
        this.topFormHeight * (this.topFormShrink ? 1 : -1);
    },
    // 新增/修改/删除/导出
    genInterface: function (type, data) {
      switch (type) {
        case "get":
          return new Promise((resolve) => {
            Promise.all([
              this.$axios.get("/system/role/" + data),
              this.genInterface("getMenuIds", data),
              this.genInterface("getDeptIds", data),
            ]).then((res) => {
              var returnRes = Object.assign(res[0]);
              // 菜单权限
              res[0].data.data.menuIds = res[1].data.checkedKeys;
              // 数据权限
              res[0].data.data.deptIds = res[2].data.checkedKeys;

              console.log(returnRes);
              resolve(returnRes);
            });
          });
        case "getMenuIds":
          return this.$axios.get("/system/menu/roleMenuTreeselect/" + data);
        // case "getAllotUserList":
        //   return this.$axios.get("/system/role/authUser/allocatedList", {
        //     params: data
        //   });
        case "getDeptIds":
          return this.$axios.get("/system/dept/roleDeptTreeselect/" + data);
        case "add":
          // 新增
          return this.$axios.post("/system/role", data);
        case "edit":
          // 修改
          return this.$axios.put("/system/role", data);
        case "delete":
          //  删除
          return this.$axios.delete("/system/role/" + data);
        case "getSubSys":
          return this.$axios.get("/system/subsys/list");
        case "getMenuTree":
          // 获取字典下拉列表
          return this.$axios.get("/system/menu/list");
        case "getDeptTree":
          // 获取字典下拉列表
          return this.$axios.get("/system/dept/list");
        case "saveDataLimit":
          // 数据权限设置
          return this.$axios.put("/system/role/dataScope", data);
        case "export":
          //  导出
          return this.$axios.get("/system/post/export", {
            params: data,
          });
        case "authUser":
          // 授权用户
          return this.$axios.put("/system/role/authUser/selectAll", null, {
            params: data,
          });
        case "cancelAllot":
          // 取消用户授权
          return this.$axios.put("/system/role/authUser/cancel", data);
        case "cancelAllotAll":
          // 取消用户授权
          return this.$axios.put("/system/role/authUser/cancelAll", null, {
            params: data,
          });
      }
    },
    // 顶部查询  方法
    topSearch: function (type) {
      var form = this.$refs["topForm"];
      var allotUserTopForm = this.$refs["allotUserTopForm"];
      var selUserTopForm = this.$refs["selUserTopForm"];
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
          for (var k in this.formTemplate) {
            this.tableRowFormData[k] = {
              value: this.formTemplate[k],
            };
          }
          this.control.fold = false;
          this.control.selAll = false;
          this.control.relevancy = true;
          this.menuCheckedKeys = [];
          this.menuExpandedKeys = [];
          break;
        case "edit":
          // 修改
          this.control.fold = false;
          this.control.selAll = false;
          this.control.relevancy = true;
          this.menuCheckedKeys = [];
          this.menuExpandedKeys = [];
          var editData = this.rowConfig.data[0];

          this.genInterface("get", editData.roleId).then((res) => {
            // console.log(res)
            if (res.data.code == 200) {
              for (var k in this.formTemplate) {
                this.tableRowFormData[k] = {
                  value: res.data.data[k] || this.formTemplate[k],
                };
              }
              if (Array.isArray(res.data.data.menuIds)) {
                this.menuCheckedKeys = res.data.data.menuIds.map((o) => "" + o);
              }
              this.rowConfig.type = "edit";
              this.rowConfig.show = true;
            } else {
              this.$message.error(res.data.msg);
            }
          });
          break;
        case "delete":
          // 删除
          var editData = this.rowConfig.data.map((item) => item[this.majorKey]);
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
        case "export":
          // 导出
          break;
        case "allotUserSearch":
          // 用户分配   查询
          var data = allotUserTopForm.getFormData().formData;
          this.getAllotUserList(data);
          break;
        case "allotUserReset":
          // 用户分配   重置
          allotUserTopForm.resetValidation();
          this.getAllotUserList();
          break;
        case "addUser":
          // 用户分配   添加用户
          this.allotUserConfig.userTableTotal = 0;
          this.allotUserConfig.userTableCurrent = 1;
          this.allotUserConfig.selUserShow = true;
          this.allotUserConfig.selUserData = [];
          this.allotUserConfig.userTableSelection.selectedRowKeys = [];
          this.getAllotAddUserList();
          // allotUserTopForm.resetValidation();
          // this.getAllotUserList();
          break;
        case "batchCancel":
          // 用户分配   批量取消
          var selIds = this.allotUserConfig.selData.map((o) => o.userId);
          var params = {
            roleId: this.allotUserConfig.roleId,
            userIds: selIds.join(","),
          };
          var that = this;
          this.$confirm({
            title: () => "取消授权",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => "是否取消选中用户授权数据项？",
            onOk() {
              return new Promise((resolve) => {
                that
                  .genInterface("cancelAllotAll", params)
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      that.allotUserConfig.selData = [];
                      that.allotUserConfig.tableSelection.selectedRowKeys = [];
                      var form = that.$refs["allotUserTopForm"];
                      var data = form.getFormData().formData;
                      that.getAllotUserList(data);
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
        case "allotUserSearch":
          // 用户分配  选择用户  查询
          var data = selUserTopForm.getFormData().formData;
          this.getAllotAddUserList(data);
          break;
        case "allotUserReset":
          // 用户分配  选择用户 重置
          selUserTopForm.resetValidation();
          this.getAllotAddUserList();
          break;
      }
    },
    // 项目操作
    itemOptions: function (type, item) {
      // console.log(type, item)
      switch (type) {
        case "edit":
          // 修改
          this.control.fold = false;
          this.control.selAll = false;
          this.control.relevancy = true;
          this.menuExpandedKeys = [];
          this.genInterface("get", item.roleId).then((res) => {
            // console.log(res)
            if (res.data.code == 200) {
              for (var k in this.formTemplate) {
                this.tableRowFormData[k] = {
                  value: res.data.data[k] || this.formTemplate[k],
                };
              }

              if (Array.isArray(res.data.data.menuIds)) {
                this.menuCheckedKeys = res.data.data.menuIds.map((o) => "" + o);
              }

              this.rowConfig.type = "edit";
              this.rowConfig.show = true;
            } else {
              this.$message.error(res.data.msg);
            }
          });
          break;
        case "dataLimit":
          // 修改
          this.control.dataLimitFold = false;
          this.control.dataLimitSelAll = false;
          this.control.dataLimitRelevancy = true;
          this.dataLimitExpandedKeys = [];
          this.dataLimitCheckedKeys = [];
          this.genInterface("get", item.roleId).then((res) => {
            // console.log(res)
            if (res.data.code == 200) {
              for (var k in this.formTemplate) {
                this.dataLimitFormData[k] = {
                  value: res.data.data[k] || this.formTemplate[k],
                };
              }

              if (Array.isArray(res.data.data.deptIds)) {
                this.dataLimitCheckedKeys = res.data.data.deptIds.map(
                  (o) => "" + o
                );
              }
              this.dataLimitConfig.data = res.data.data;
              this.dataLimitConfig.show = true;
            } else {
              this.$message.error(res.data.msg);
            }
          });
          break;
        case "allotUse":
          // 分配用户
          this.allotUserConfig.roleId = item.roleId;
          this.allotUserConfig.current = 1;
          this.allotUserConfig.total = 0;
          this.allotUserConfig.pageSize = 10;
          this.allotUserConfig.selData = [];
          this.allotUserConfig.tableSelection.selectedRowKeys = [];
          this.allotUserConfig.show = true;
          this.getAllotUserList();
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
                  .genInterface("delete", item[that.majorKey])
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      // 清空表格选中数据
                      for (
                        var i = that.rowConfig.data.length - 1;
                        i >= 0;
                        i--
                      ) {
                        var one = that.rowConfig.data[i];
                        if (one.dictId == item.dictId) {
                          that.tableSelection.selectedRowKeys.splice(i, 1);
                          that.rowConfig.data.splice(i, 1);
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
        case "cancelAllot":
          // 取消授权
          var that = this;
          var params = {
            userId: item.userId,
            roleId: this.allotUserConfig.roleId,
          };
          this.$confirm({
            title: () => "取消授权",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => '确认要取消该用户"' + item.userName + '"角色吗？',
            onOk() {
              return new Promise((resolve) => {
                that
                  .genInterface("cancelAllot", params)
                  .then((res) => {
                    resolve(true);
                    if (res.data.code == 200) {
                      that.allotUserConfig.selData = [];
                      that.allotUserConfig.tableSelection.selectedRowKeys = [];
                      var form = that.$refs["allotUserTopForm"];
                      var data = form.getFormData().formData;
                      that.getAllotUserList(data);
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
    onSelectChange: function (selectedRowKeys) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      var selData = <any>[];
      this.tableData.forEach((one) => {
        if (selectedRowKeys.indexOf(one[this.majorKey]) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.rowConfig.data = selData;
      this.tableSelection.selectedRowKeys = selectedRowKeys;
    },
    // 点击行
    customRow: function (record, idx) {
      return {
        onClick: event => {
          var selId = record[this.majorKey], selArr = this.tableSelection.selectedRowKeys;
          var selIdx = selArr.indexOf(selId);
          if(selArr.length>1 && (selIdx!=-1)){
            // 多选
            selArr.splice(selIdx, 1);
          }else if(selArr.length<2){
            // 单选
            selArr = [selId];
          }
          this.onSelectChange(selArr);
        }
      }
    },
    // table行选中事件
    allotUserSelectChange: function (selectedRowKeys) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      var selData = <any>[];
      this.allotUserConfig.tableData.forEach((one) => {
        if (selectedRowKeys.indexOf(one[this.allotUserConfig.majorKey]) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.allotUserConfig.selData = selData;
      this.allotUserConfig.tableSelection.selectedRowKeys = selectedRowKeys;
    },
    // 点击行
    allotUserCustomRow: function (record, idx) {
      return {
        onClick: event => {
          var selId = record[this.allotUserConfig.majorKey], selArr = this.allotUserConfig.tableSelection.selectedRowKeys;
          var selIdx = selArr.indexOf(selId);
          if(selArr.length>1 && (selIdx!=-1)){
            // 多选
            selArr.splice(selIdx, 1);
          }else if(selArr.length<2){
            // 单选
            selArr = [selId];
          }
          this.allotUserSelectChange(selArr);
        }
      }
    },
    // table行选中事件
    selUserSelectChange: function (selectedRowKeys) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      var selData = <any>[];
      this.allotUserConfig.userTableData.forEach((one) => {
        if (selectedRowKeys.indexOf(one[this.allotUserConfig.majorKey]) != -1) {
          selData.push({
            ...one,
          });
        }
      });
      this.allotUserConfig.selUserData = selData;
      this.allotUserConfig.userTableSelection.selectedRowKeys = selectedRowKeys;
    },
    // table行选中事件
    selUserCustomRow: function (record, idx) {
      return {
        onClick: event => {
          var selId = record[this.allotUserConfig.majorKey], selArr = this.allotUserConfig.userTableSelection.selectedRowKeys;
          var selIdx = selArr.indexOf(selId);
          if(selArr.length>1 && (selIdx!=-1)){
            // 多选
            selArr.splice(selIdx, 1);
          }else if(selArr.length<2){
            // 单选
            selArr = [selId];
          }
          this.selUserSelectChange(selArr);
        }
      }
    },
    // 菜单权限控制变更
    controlChange: function (type) {
      switch (type) {
        case "fold":
          // 折叠
          if (this.control.fold) {
            this.menuExpandedKeys = [...this.allMenuNodeKeys];
          } else {
            this.menuExpandedKeys = [];
          }
          break;
        case "selAll":
          // 选中
          if (this.control.selAll) {
            this.menuCheckedKeys = [...this.allMenuNodeKeys];
          } else {
            this.menuCheckedKeys = [];
          }
          break;
        case "relevancy":
          // 父子关联
          break;
        // 数据权限
        case "dataLimitFold":
          // 折叠
          if (this.control.dataLimitFold) {
            this.dataLimitExpandedKeys = [...this.allDataLimitNodeKeys];
          } else {
            this.dataLimitExpandedKeys = [];
          }
          break;
        case "dataLimitSelAll":
          // 选中
          if (this.control.dataLimitSelAll) {
            this.dataLimitCheckedKeys = [...this.allDataLimitNodeKeys];
          } else {
            this.dataLimitCheckedKeys = [];
          }
          break;
        case "dataLimitRelevancy":
          // 父子关联
          break;
      }
    },
    // table 分页数量变更
    tablePageChange: function (page) {
      var form = this.$refs["topForm"];
      var data = form.getFormData().formData;
      this.getList(data);
    },
    // 分配用户/选择用户  分页
    allotUserTablePageChange: function (type) {
      // console.log(type)
      if (type == "user") {
        // 分配用户列表
        var form = this.$refs["allotUserTopForm"];
        var data = form.getFormData().formData;
        this.getAllotUserList(data);
      } else {
        // 添加用户列表
        var form = this.$refs["selUserTopForm"];
        var data = form.getFormData().formData;
        this.getAllotAddUserList(data);
      }
    },
    // 表格数据  新增 / 修改
    submitConfig: function (state) {
      if (state) {
        var form = this.$refs["rowForm"];
        // 校验表单数据
        form.formValidation().then((res) => {
          // console.log(res)
          if (res.state) {
            var queryParams = {
              ...this.formTemplate,
            };
            var menuIds = Array.isArray(this.menuCheckedKeys)
              ? this.menuCheckedKeys
              : this.menuCheckedKeys.checked;
            queryParams.menuIds = menuIds;
            // 合并表单项内容
            queryParams = Object.assign(queryParams, res.form);
            var loading = this.$loading({
              background: "rgba(0,0,0,0.0)",
              size: 166,
              iconColor: "#00678C",
            });
            this.genInterface(this.rowConfig.type, queryParams)
              .then((requestRes) => {
                loading.close();
                if (requestRes.data.code == 200) {
                  this.$message.success(
                    this.rowConfig.type == "add" ? "添加成功" : "保存成功"
                  );
                  this.rowConfig.show = false;
                  var form = this.$refs["topForm"];
                  var data = form.getFormData().formData;
                  this.getList(data);
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
      } else {
        this.rowConfig.show = false;
      }
    },
    // 数据权限修改
    submitDataLimitConfig: function (state) {
      if (state) {
        var form = this.$refs["dataLimitForm"];
        // 校验表单数据
        form.formValidation().then((res) => {
          // console.log(res)
          if (res.state) {
            var queryParams = {
              ...this.formTemplate,
            };
            var deptIds = Array.isArray(this.dataLimitCheckedKeys)
              ? this.dataLimitCheckedKeys
              : this.dataLimitCheckedKeys.checked;
            queryParams.deptIds = deptIds;

            // 合并表单项内容
            queryParams = Object.assign(queryParams, res.form);
            var loading = this.$loading({
              background: "rgba(0,0,0,0.0)",
              size: 166,
              iconColor: "#00678C",
            });
            this.genInterface("saveDataLimit", queryParams)
              .then((requestRes) => {
                loading.close();
                if (requestRes.data.code == 200) {
                  this.$message.success("保存成功");
                  this.dataLimitConfig.show = false;
                  var form = this.$refs["topForm"];
                  var data = form.getFormData().formData;
                  this.getList(data);
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
      } else {
        this.dataLimitConfig.show = false;
      }
    },
    // 分配用户
    submitAllotUserConfig: function (state) {
      if (state) {
      } else {
        this.allotUserConfig.show = false;
      }
    },
    // 分配用户 添加用户
    submitSelUserConfig: function (state) {
      var selIds = this.allotUserConfig.selUserData.map((o) => o.userId);
      if (state && selIds.length) {
        var params = {
          roleId: this.allotUserConfig.roleId,
          userIds: selIds.join(","),
        };
        this.genInterface("authUser", params)
          .then((res) => {
            if (res.data.code == 200) {
              var form = this.$refs["allotUserTopForm"];
              var data = form.getFormData().formData;
              this.getAllotUserList(data);
              this.allotUserConfig.selUserShow = false;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error("服务器异常");
          });
      } else {
        this.allotUserConfig.selUserShow = false;
      }
    },
  },
});
</script>
<style lang="less">
@import url("../../../common/base.less");

.systemRolePage {
  padding: 20px 20px;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
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

.editPopup {
  .ant-modal-body {
    padding: 10px 20px;
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
      min-height: 32px;
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
    }
  }
}
.allotUserPopup {
  .ant-modal {
    width: 100% !important;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    padding: 10px 20px;
    flex: 1;
  }

  .popupMain {
    > .top {
      margin-bottom: 10px;
      .btns {
        line-height: 32px;
        > button:not(:first-child) {
          margin-left: 10px;
        }
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
}
.allotUserPopup,
.selUserPopup {
  .popupMain {
    > .top {
      margin-bottom: 10px;
      .btns {
        line-height: 32px;
        > button:not(:first-child) {
          margin-left: 10px;
        }
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
}
</style>