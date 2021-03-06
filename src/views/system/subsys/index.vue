<template>
  <div class="systemPostPage">
    <div class="topSearch">
      <div class="tableTit">
        <div class="tit">
          <div class="shrinkBtn" @click="shrinkTopForm" :class="{ shrink: topFormShrink }">
            <alpIcon :size='16' type='svg' icon="miscChevronUpDouble24.svg"/>
            <!-- <alpIcon :icon='' v-if="topFormShrink" />
            <FullscreenExitOutlined v-else /> -->
          </div>
          <span>子系统业务</span>
        </div>
        <div class="tableBtn">
          <a-button
              type="primary"
              size="small"
              @click="topSearch('search')"
          >
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
        </div>
      </div>
      <div class="topSearchForm" :class="{ shrink: topFormShrink }">
        <alpFormGroup ref="topForm" :options="topForm" :form_data="topFormData"></alpFormGroup>
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
        >
          <template #logoType="{ text: row }">
            <span class="card" >{{
                row == "font" ? "字体图标" : "图片"
              }}</span>
          </template>
          <template #isLocal="{ text: row }">
            <span class="card" :class="{ err: row != 'Y' }">{{
                row == "Y" ? "是" : "否"
              }}</span>
          </template>
          <template #options="{ text: row }">
            <div class="rowBtns">
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
        :title="rowConfig.type == 'add' ? '添加子系统业务' : '编辑子系统业务'"
        :width="350"
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
        </alpFormGroup>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, createVNode, ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import formConfig from "./formConfig.js";

export default defineComponent({
  name: "systemPostPage",
  data: function () {
    return {
      majorKey: 'subsysId',
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
        {
          dataIndex: "subsysName",
          key: "subsysName",
          title: "系统名称",
        },
        {
          dataIndex: "alias",
          key: "alias",
          title: "系统别名",
        },
        {
          dataIndex: "logoType",
          key: "logoType",
          title: "LOGO类型",
          slots: { customRender: "logoType" },
        },
        {
          dataIndex: "logo",
          key: "logo",
          title: "LOGO",
        },
        {
          dataIndex: "baseUrl",
          key: "baseUrl",
          title: "基础URL",
        },
        {
          dataIndex: "homePage",
          key: "homePage",
          title: "主页地址",
        },
        {
          dataIndex: "memo",
          key: "memo",
          title: "备注",
        },
        {
          dataIndex: "isLocal",
          key: "isLocal",
          title: "是否本地系统",
          align: "center",
          slots: { customRender: "isLocal" },
        },
        {
          dataIndex: "path",
          key: "path",
          title: "路径",
        },
        {
          dataIndex: "createTime",
          key: "createTime",
          title: "创建时间",
        },
        {
          dataIndex: "createBy",
          key: "createBy",
          title: "创建者",
        },
        {
          dataIndex: "updateBy",
          key: "updateBy",
          title: "更新者",
        },
        {
          dataIndex: "updateTime",
          key: "updateTime",
          title: "更新时间",
        },
        {
          width: 150,
          title: "操作",
          key: "options",
          slots: { customRender: "options" },
        },
      ],
      tableViewHeight: 200,
      tableRowForm: formConfig.tableRowForm,
      tableRowFormData: ref({}),
      formTemplate: {
        subsysId : undefined,
        subsysName : undefined,
        alias : undefined,
        logoType : "font",
        logo : undefined,
        baseUrl : undefined,
        homePage : undefined,
        memo : undefined,
        isLocal : "Y",
        path : undefined,
        createTime : undefined,
        createBy : undefined,
        updateBy : undefined,
        updateTime : undefined,
      },
      rowConfig: {
        show: false,
        type: "edit", // add/edit
        data: [],
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
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      };

      var loading = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C",
      });
      this.$axios
          .get("/system/subsys/list", {
            params: Object.assign(queryParams, params),
          })
          .then((res) => {
            loading.close();
            if (res.data.code == 200) {
              this.tableData = res.data.rows;
              this.pagination.total = res.data.total;
            } else {
              this.$message
                  .error(res.data.msg);
            }
          })
          .catch((err) => {
            loading.close();
          });
    },

    // 收缩顶部查询表单
    shrinkTopForm: function() {
      this.topFormShrink = !this.topFormShrink;
      this.tableViewHeight += this.topFormHeight*(this.topFormShrink?1:-1);
    },

    // 新增/修改/删除/导出 岗位数据
    genInterface: function (type, data) {
      switch (type) {
        case "add":
          // 新增
          return this.$axios
              .post("/system/subsys", data);
        case "edit":
          // 修改
          return this.$axios
              .put("/system/subsys", data);
        case "delete":
          //  删除
          return this.$axios
              .delete("/system/subsys/" + data);
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
          for(var k in this.formTemplate){
            this.tableRowFormData[k] = {
              value: this.formTemplate[k]
            }
          }
          // this.tableRowFormData = {};
          break;
        case "edit":
          // 修改
          var editData = this.rowConfig.data[0];
          for(var k in this.formTemplate){
            this.tableRowFormData[k] = {
              value: editData[k]||this.formTemplate[k]
            }
          }
          this.rowConfig.type = "edit";
          this.rowConfig.show = true;
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
            onCancel() {},
          });

          break;
      }
    },

    // 项目操作
    itemOptions: function (type, item) {
      switch (type) {
        case "edit":
          // 修改
          for(var k in this.formTemplate){
            this.tableRowFormData[k] = {
              value: item[k]||this.formTemplate[k]
            }
          }
          this.rowConfig.type = "edit";
          this.rowConfig.show = true;
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
                        for(var i=that.rowConfig.data.length-1;i>=0;i--){
                          var one = that.rowConfig.data[i];
                          if(one.dictId == item.dictId){
                            that.tableSelection.selectedRowKeys.splice(i,1);
                            that.rowConfig.data.splice(i,1);
                          }
                        }
                        var form = that.$refs["topForm"];
                        var data = form.getFormData().formData;
                        that.getList(data);
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
              subsysId : undefined,
              subsysName : undefined,
              alias : undefined,
              logoType : undefined,
              logo : undefined,
              baseUrl : undefined,
              homePage : undefined,
              memo : undefined,
              isLocal : undefined,
              path : undefined,
              createTime : undefined,
              createBy : undefined,
              updateBy : undefined,
              updateTime : undefined,
            };
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
                    this.$message
                        .success(
                            this.rowConfig.type == "add" ? "添加成功" : "保存成功"
                        );
                    this.rowConfig.show = false;
                    var form = this.$refs["topForm"];
                    var data = form.getFormData().formData;
                    this.getList(data);
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
        this.rowConfig.show = false;
      }
    },
  },
});
</script>
<style lang="less">
@import url("../../../common/base.less");

.systemPostPage {
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
  }

  > .tableView {
    > .tableTopBtns {
      margin-bottom: 10px;
      > .ant-btn {
        &[disabled] {
          opacity: 0.5;
        }
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
</style>