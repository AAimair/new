<template>
  <div class="systemUserPage">
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
            <span v-if="scope.deptName.indexOf(searchTreeKey) > -1">
              {{
                scope.deptName.substr(0, scope.deptName.indexOf(searchTreeKey))
              }}<span style="color: #f50">{{ searchTreeKey }}</span
              >{{
                scope.deptName.substr(
                  scope.deptName.indexOf(searchTreeKey) + searchTreeKey.length
                )
              }}
            </span>
            <span v-else>{{ scope.deptName }}</span>
          </template>
        </a-tree>
      </div>
    </div>
    <div class="mainView">
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
            <span>用户列表</span>
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
            <!-- <a-button size="small" @click="topSearch('import')">
              <template #icon><PlusOutlined /></template>
              导入
            </a-button> -->
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
          >
          </alpFormGroup>
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
              <div class="rowBtns" @click.stop="">
                <a-button
                  size="small"
                  type="text"
                  @click="itemOptions('edit', row)"
                  ><EditOutlined />修改</a-button
                >
                <a-button
                  :disabled="row.userId==1"
                  :style="{ color: row.userId==1?'#aaa':'' }"
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
                      <a-menu-item key="resetPwd">重置密码</a-menu-item>
                      <!-- <a-menu-item key="allotUse">分配角色</a-menu-item> -->
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
        :title="rowConfig.type == 'add' ? '添加岗位' : '编辑岗位'"
        :width="800"
        class="userEditPopup"
        :closable="false"
      >
        <template #footer>
          <a-button key="back" @click="submitConfig(false)">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="rowConfig.loading"
            @click="submitConfig(true)"
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
            <template #dept>
              <div class="group">
                <div class="label">归属部门</div>
                <div class="setInput">
                  <a-tree-select
                    v-model:value="deptId"
                    style="width: 100%"
                    show-search
                    allow-clear
                    tree-default-expand-all
                    :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
                    :tree-data="treeData"
                    :replaceFields="treeField"
                  >
                  </a-tree-select>
                </div>
              </div>
            </template>
          </alpFormGroup>
        </div>
      </a-modal>
      <!-- 重置密码 弹窗 -->
      <a-modal
        v-model:visible="resetPwdConfig.show"
        title="重置密码"
        :width="350"
        class="pwdEditPopup"
        :closable="false"
      >
        <template #footer>
          <a-button key="back" @click="submitPwd(false)">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="submitPwd(true)"
            >保存</a-button
          >
        </template>
        <div class="popupMain">
          <alpFormGroup
            v-if="resetPwdConfig.show"
            ref="resetPwdForm"
            :options="resetPwdConfig.resetPwdForm"
          >
            <template #userName>
              <span class="resetUserName">请输入"{{resetPwdConfig.data.userName}}"的新密码</span>
            </template>
          </alpFormGroup>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, createVNode, ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import formConfig from "./formConfig.js";

export default defineComponent({
  name: "systemUserPage",
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

      topForm: formConfig.topForm,
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
        //   dataIndex: "userId",
        //   key: "userId",
        //   title: "用户编号",
        // },
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
          dataIndex: "deptName",
          key: "deptName",
          title: "部门",
        },
        {
          dataIndex: "phonenumber",
          key: "phonenumber",
          title: "手机号码",
        },
        {
          width: 100,
          key: "status",
          title: "状态",
          slots: { customRender: "status" },
        },
        {
          width: 150,
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
      tableViewHeight: 200,
      tableRowForm: formConfig.tableRowForm,
      tableRowFormData: ref({}),
      deptId: '',
      rowConfig: {
        show: false,
        type: "edit", // add/edit
        data: [],
      },

      resetPwdConfig: {
        show: false,
        data: null,
        resetPwdForm: formConfig.resetPwdForm,
      },

      majorKey: "userId",
      formTemplate: {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: []
      },
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
            this.expandedKeys = res.data.data.map((o) => o.deptId);
            this.selDept = [treeData[0].deptId]
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
    // 选中树节点
    selTreeNode: function (nodeKey) {
      var targetNodeData: any = null;
      for (var i = 0; i < this.oneDimData.length; i++) {
        var one = this.oneDimData[i];
        if (one.deptId == nodeKey) {
          targetNodeData = one;
          break;
        }
      }
      // 获取用户列表
      var form = this.$refs["topForm"];
      var data = form.getFormData().formData;
      this.getList(data);
    },

    // 获取岗位/角色 下拉列表
    getSelectOpts: function(){
      return this.genInterface('get', '').then(res => {
        // console.log(res)
        if(res.data.code == 200){
          // 岗位
          var posts = res.data.posts.map(o => {
            return {
              label: o.postName,
              value: o.postId,
              ...o
            }
          });
          // 角色
          var roles = res.data.roles.map(o => {
            return {
              label: o.roleName,
              value: o.roleId,
              ...o
            }
          });
          formConfig.tableRowForm.form[9].options = posts;
          formConfig.tableRowForm.form[10].options = roles;
        }
      });
    },

    // 获取列表
    getList: function (params) {
      var queryParams = {
        deptId: this.selDept[0]||undefined,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
        .get("/system/user/list", {
          params: Object.assign(queryParams, params),
        })
        .then((res) => {
          loading.close();
          if (res.data.code == 200) {
            // this.tableData = [].concat(res.data.rows, res.data.rows, res.data.rows, res.data.rows);
            // 部门名称
            res.data.rows.forEach(one => {
              one.deptName = one.dept.deptName;
            });
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
    // 收缩顶部查询表单
    shrinkTopForm: function () {
      this.topFormShrink = !this.topFormShrink;
      this.tableViewHeight +=
        this.topFormHeight * (this.topFormShrink ? 1 : -1);
    },
    // 新增/修改/删除/导出
    genInterface: function (type, data) {
      switch (type) {
        case 'get':
          return this.$axios.get('/system/user/'+data);
        case "add":
          // 新增
          return this.$axios.post("/system/user", data);
        case "edit":
          // 修改
          return this.$axios.put("/system/user", data);
        case "delete":
          //  删除
          return this.$axios.delete("/system/user/" + data);
        case "resetPwd":
          // 重置密码
          return this.$axios.put('/system/user/resetPwd', data);
        case "export":
          //  导出
          return this.$axios.get("/system/post/export", {
            params: data,
          });
      }
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
          for (var k in this.formTemplate) {
            this.tableRowFormData[k] = {
              value: this.formTemplate[k],
            };
          }
          this.deptId = this.selDept[0];
          break;
        case "edit":
          // 修改
          var editData = this.rowConfig.data[0];
          
          this.genInterface('get', editData[this.majorKey]).then(res => {
            if(res.data.code == 200 ){
              for (var k in this.formTemplate) {
                var defValue = res.data.data[k];
                if(['postIds', 'roleIds'].indexOf(k)!=-1){
                  defValue = res.data[k].map(o => ''+o);
                }
                this.tableRowFormData[k] = {
                  value: defValue || this.formTemplate[k],
                };
              }
              this.deptId = res.data.data.deptId;
              this.rowConfig.type = "edit";
              this.rowConfig.show = true;
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
      }
    },
    // 项目操作
    itemOptions: function (type, item) {
      // console.log(type, item)
      switch (type) {
        case "edit":
          // 修改
          this.genInterface('get', item[this.majorKey]).then(res => {
            if(res.data.code == 200 ){
              for (var k in this.formTemplate) {
                var defValue = res.data.data[k];
                if(['postIds', 'roleIds'].indexOf(k)!=-1){
                  defValue = res.data[k].map(o => ''+o);
                }
                this.tableRowFormData[k] = {
                  value: defValue || this.formTemplate[k],
                };
                // 用户名不允许编辑
                if(['userName'].indexOf(k)!=-1){
                  this.tableRowFormData[k].disabled = true;
                }
              }

              // 密码不允许编辑
              this.tableRowFormData.password = {
                value: '******',
                disabled: true,
              }
              console.log(this.tableRowFormData);

              this.deptId = res.data.data.deptId;
              this.rowConfig.type = "edit";
              this.rowConfig.show = true;
            }
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
                        if (one[that.majorKey] == item[that.majorKey]) {
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
        case "resetPwd":
          // 重置密码
          this.resetPwdConfig.data = item;
          this.resetPwdConfig.show = true;
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
          var selId = record[this.majorKey];
          var selIdx = this.tableSelection.selectedRowKeys.indexOf(selId);
          if(selIdx!=-1){
            this.tableSelection.selectedRowKeys.splice(selIdx, 1);
          }else{
            this.tableSelection.selectedRowKeys.push(selId);
          }
          this.onSelectChange(this.tableSelection.selectedRowKeys);
        }
      }
    },
    // table 分页数量变更
    tablePageChange: function (page) {
      var form = this.$refs["topForm"];
      var data = form.getFormData().formData;
      this.getList(data);
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
              ...this.formTemplate
            };
            // 合并表单项内容
            queryParams = Object.assign(queryParams, res.form);
            // 删除用户密码
            delete(queryParams.password);
            queryParams.deptId = this.deptId;
            // queryParams.password = this.$md5(queryParams.password.trim());
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
    // 重置密码
    submitPwd: function (state) {
      if (state) {
        var form = this.$refs["resetPwdForm"];
        // 校验表单数据
        form.formValidation().then((res) => {
          if (res.state) {
            var queryParams = {
              userId: this.resetPwdConfig.data.userId,
              password: this.$md5(res.form.password.trim())
            };
            // 合并表单项内容
            var loading = this.$loading({
              background: "rgba(0,0,0,0.0)",
              size: 166,
              iconColor: "#00678C",
            });
            this.genInterface('resetPwd', queryParams)
              .then((requestRes) => {
                loading.close();
                if (requestRes.data.code == 200) {
                  this.$message.success("保存成功");
                  this.resetPwdConfig.show = false;
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
        this.resetPwdConfig.show = false;
      }
    },
  },
  mounted: function () {
    var moduleHeight = this.$el.clientHeight;
    this.topFormHeight = this.$el.querySelector(".topSearchForm").clientHeight;
    // 标题 40+10 上下padding 20 分页 25+10
    this.tableViewHeight = moduleHeight - (85 + 40 + this.topFormHeight);
  },
  created: function () {
    this.$dict('sys_user_sex').then(res => {
      // console.log('获取字典', res)
      // console.log(formConfig, res)
      formConfig.tableRowForm.form[7].options = res;
    });
    // 获取部门树
    this.getDeptTree();
    // 获取角色/部门下拉列表
    this.getSelectOpts();
    // 获取用户列表
    this.getList();
  },
});
</script>
<style lang="less">
@import url("../../../common/base.less");
.systemUserPage {
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
    margin-left: 310px;
    padding: 10px;
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
.pwdEditPopup,
.userEditPopup {
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
      line-height: 32px;
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

  .resetUserName{
    height: 32px;
    line-height: 32px;
  }
}
</style>