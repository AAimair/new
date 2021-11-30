<template>
  <div class="config-page">
    <div class="top-search">
      <div class="tableTit">
        <div class="tit">
          <div
            :class="[
              'shrinkBtn',
              {shrink: searchShrink}
            ]"
            @click="topSearchShrink"
          >
            <alpIcon :size='16' type='svg' icon="miscChevronUpDouble24.svg"/>
          </div>
          <span>参数设置列表</span>
        </div>
        <div class="tableBtn">
          <a-button
            type="primary"
            size="small"
            @click="searchHandle('search')"
          >
            <template #icon>
              <SearchOutlined/>
            </template>
            搜索
          </a-button>
          <a-button
            size="small"
            @click="searchHandle('reset')"
          >
            <template #icon>
              <SyncOutlined/>
            </template>
            重置
          </a-button>
          
          <a-button
            size="small"
            @click="rowHandle('add')"
          >
            <template #icon>
              <PlusOutlined/>
            </template>
            新增
          </a-button>
          <a-button
            size="small"
            :disabled="rowSelection.length !== 1"
            @click="rowHandle('edit')"
          >
            <template #icon>
              <EditOutlined/>
            </template>
            修改
          </a-button>
          <a-button
            size="small"
            :disabled="rowSelection.length === 0"
            @click="rowHandle('delete')"
          >
            <template #icon>
              <DeleteOutlined/>
            </template>
            删除
          </a-button>
<!--          <a-button-->
<!--            size="small"-->
<!--            @click="rowHandle('export', null)"-->
<!--          >-->
<!--            <template #icon>-->
<!--              <ToTopOutlined/>-->
<!--            </template>-->
<!--            导出-->
<!--          </a-button>-->
          <a-button
            size="small"
            @click="rowHandle('refresh', null)"
          >
            <template #icon>
              <ReloadOutlined/>
            </template>
            刷新缓存
          </a-button>
        </div>
      </div>
      <div
        :class="[
          'topSearchForm',
          {shrink: searchShrink}
        ]"
      >
        <alp-form-group
          ref="searchRef"
          :options="searchOptions"
          :form_data="searchParams"
        />
      </div>
    </div>
    
    <div class="table-view">
      <div
        class="table"
        :style="{height: tableViewHeight + 'px'}"
      >
        <a-table
          :dataSource="tableData"
          :columns="columns"
          :row-selection="{selectedRowKeys:rowSelection, onChange: selectRows}"
          size="small"
          :pagination="false"
          rowKey="configId"
          bordered
          :customRow="customRow"
        >
          <template #configType="{ record }">
            <a-tag :color="record.configType === 'Y'? 'processing': 'error'">
              {{ record.configType === 'Y' ? '是' : '否' }}
            </a-tag>
          </template>
          <template #action="{ record  }">
            <a-button
              type="link"
              ghost
              @click.prevent="rowHandle('edit', record)"
            >
              <template #icon>
                <EditOutlined/>
              </template>
              <span>修改</span>
            </a-button>
            <a-button
              type="link"
              ghost
              @click.prevent="rowHandle('delete', record)"
            >
              <template #icon>
                <DeleteOutlined/>
              </template>
              <span>删除</span>
            </a-button>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination
          size="small"
          v-model:current="pagination.pageNum"
          v-model:pageSize="pagination.pageSize"
          :pageSizeOptions="pagination.pageSizeOptions"
          :show-total="pagination.showTotal"
          :total="pagination.total"
          show-quick-jumper
          showSizeChanger
          show-less-items
          @change="paginationChange"
          @showSizeChange="paginationChange"
        />
      </div>
    </div>
    
    <!-- 新增/修改弹窗 -->
    <a-modal
      v-model:visible="dialogOptions.show"
      :title="dialogOptions.mode === 'add' ? '添加参数': '修改参数'"
      :width="500"
      :closable="false"
    >
      <template #footer>
        <a-button key="back" @click="dialogConfirm(false)">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="dialogOptions.loading"
          @click="dialogConfirm(true)"
        >保存
        </a-button>
      </template>
      
      <div class="popupMain">
        <alpFormGroup
          v-if="dialogOptions.show"
          :key="dialogOptions.key"
          ref="dialogRef"
          :options="dialogFromOptions"
          :form_data="dialogOptions.data"
        >
        </alpFormGroup>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {createVNode, defineComponent} from "vue";
import {
  searchFormOptions as searchOptions,
  columns,
  dialogFromOptions
} from "@/views/system/config/formConfig";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: 'systemConfig',
  setup() {
    return {
      searchOptions,
      columns,
      dialogFromOptions
    }
  },
  data() {
    return {
      // 表格高度
      tableViewHeight: 200,
      // 查询参数
      searchParams: {},
      // 搜索框收缩
      searchShrink: false,
      // 表格数据列表
      tableData: [],
      // 分页参数
      pagination: {
        pageSize: 20,
        pageNum: 1,
        total: 0,
        pageSizeOptions: ["10", "20", "30", "50"],
        showTotal: (total) => `共 ${total} 条`,
      },
      // 选中行
      rowSelection: [],
      // 新增/修改 弹窗
      dialogOptions: {
        key: 0, // 用于 刷新表单
        show: false,
        mode: 'add',
        loading: false,
        template: {
          configId: null,
          configName: null,
          configKey: null,
          configValue: null,
          configType: null,
          remark: null
        }, // 表单对象模板
        data: {}, // 表单数据
      }
    }
  },
  created() {
    this.getTableData();
  },
  mounted() {
    const moduleHeight = this.$el.clientHeight;
    this.topFormHeight = this.$el.querySelector('.topSearchForm').clientHeight;
    // 标题 40+10 上下padding 20 分页 25+10
    this.tableViewHeight = moduleHeight - (85 + 40 + this.topFormHeight);
  },
  methods: {
    // 查询收缩
    topSearchShrink: function () {
      this.searchShrink = !this.searchShrink;
      this.tableViewHeight += this.topFormHeight * (this.searchShrink ? 1 : -1);
    },
    // api 请求分发
    sendRequest: function (type, data) {
      switch (type) {
        case 'list':
          return this.$axios.get('/system/config/list', {params: data});
        case 'delete':
          return this.$axios.delete('/system/config/' + data);
        case 'refresh':
          return this.$axios.delete('/system/config/refreshCache');
        case 'add':
          return this.$axios.post('/system/config', data);
        case 'edit':
          return this.$axios.put('/system/config', data)
      }
    },
    // 获取表格数据
    getTableData: function () {
      const loadingHandle = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C"
      })
      // 分页项
      const {pageNum, pageSize} = this.pagination;
      // 表单项
      const {formData} = this.$refs.searchRef?.getFormData() || {formData: {}}
      const params = Object.assign(formData, {pageNum, pageSize});
      this.sendRequest('list', params).then(res => {
        loadingHandle.close();
        if (res.data.code === 200) {
          const {rows, total} = res.data;
          this.pagination.total = total;
          this.tableData = rows;
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务器异常')
      })
    },
    // 数据操作
    rowHandle: function (type, row) {
      const _this = this;
      switch (type) {
        case 'add':
          this.dialogOptions.key++;
          this.dialogOptions.data = {};
          this.dialogOptions.mode = type;
          this.dialogOptions.show = true;
          break;
        case 'edit':
          this.dialogOptions.key++;
          this.dialogOptions.mode = type;
          // 选中行数据
          const rowData = row || this.tableData.find(row => row.configId === this.rowSelection[0]) || {};
          for (const key in this.dialogOptions.template) {
            if (rowData.hasOwnProperty(key)){
              this.dialogOptions.data[key] = {
                value: rowData[key]
              }
            }
          }
          this.dialogOptions.show = true;
          break;
        case 'delete':
          const ids = row?.configId || this.rowSelection;
          this.$confirm({
            title: () => "系统提示",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => `是否确认删除参数编号为"${ids}"的数据项？`,
            onOk() {
              _this.sendRequest('delete', ids).then(res => {
                if (res.data.code === 200) {
                  _this.pagination.pageNum = 1;
                  _this.rowSelection.length = 0;
                  _this.getTableData();
                } else {
                  _this.$message.error(res.data.msg);
                }
              }).catch(() => _this.$message.error('服务器异常'))
            },
            onCancel() {
            },
          });
          break;
        case 'export':
          console.log('export')
          break;
        case 'refresh':
          this.sendRequest('refresh', null).then(res => {
            if (res.data.code === 200){
              this.$message.success('刷新成功');
              this.pagination.pageNum = 1;
              this.getTableData();
            }else {
              this.$message.error(res.data.msg);
            }
          }).catch(() => this.$message.error('服务器异常'));
          break;
      }
    },
    // 查询操作
    searchHandle: function (type) {
      switch (type) {
        case 'search': // 查询
          break;
        case 'reset': // 重置
          this.pagination.pageNum = 1;
          this.pagination.orderByColumn = null;
          this.pagination.isAsc = null;
          this.$refs.searchRef.resetValidation();
          break;
      }
      this.getTableData();
    },
    // 页码改变
    paginationChange: function (num, size) {
      this.pagination.pageNum = num;
      this.pagination.pageSize = size;
      this.getTableData();
    },
    // 选中行
    selectRows: function (rows) {
      this.rowSelection = rows;
    },
    // 点击行
    customRow: function (record, idx) {
      return {
        onClick: event => {
          // 选中行 key
          const rowKey = record.configId;
          // 选中下标
          const idx = this.rowSelection.findIndex(r => r === rowKey);
          if (idx !== -1) {
            this.rowSelection.splice(idx, 1);
          } else {
            this.rowSelection.push(rowKey);
          }
        }
      }
    },
    // 弹窗提交
    dialogConfirm: function (flag) {
      const form = this.$refs.dialogRef;
      if (flag){
        form.formValidation().then(res => {
          if (res.state){
            this.dialogOptions.loading = true;
            // 表单数据
            const { formData } = form.getFormData();
            // const isAdd =
            this.sendRequest(this.dialogOptions.mode, formData).then(res => {
              this.dialogOptions.loading = false;
              if (res.data.code === 200){
                this.dialogOptions.show = false;
                this.getTableData();
              }else {
                this.$message.error(res.data.msg);
              }
            }).catch(() => {
              this.dialogOptions.show = false;
              this.$message.error('服务器异常');
            })
          }
        })
      }else {
        this.dialogOptions.show = false;
      }
    }
  }
})
</script>

<style lang="less" scoped>
.config-page {
  height: 100%;
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
  
  > .top-search {
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
          user-select: none;
          cursor: pointer;
          
          svg {
            display: block;
          }
          
          path {
            fill: #666
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
  }
  
  > .table-view {
    display: flex;
    flex-direction: column;
    
    > .table {
      margin-bottom: 10px;
      overflow: auto;
    }
    
    > .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>