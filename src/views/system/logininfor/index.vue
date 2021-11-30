<template>
  <div class="operlog-page">
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
          <span>登录日志列表</span>
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
            :disabled="rowSelection.length === 0"
            @click="rowHandle('delete')"
          >
            <template #icon>
              <DeleteOutlined/>
            </template>
            删除
          </a-button>
          <a-button
            size="small"
            @click="rowHandle('clear')"
          >
            <template #icon>
              <DeleteOutlined/>
            </template>
            清空
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
          rowKey="infoId"
          bordered
          :customRow="customRow"
          @change="sortChange"
        >
          
          <template #status="{ record }">
            <a-tag :color="tagIconStyle('color', record)">{{ tagIconStyle('text', record) }}</a-tag>
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
    
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, getCurrentInstance, nextTick, createVNode} from "vue";
import {columns, searchFormOptions} from "./formOptions.js"
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: 'systemLogininfor',
  setup() {
    const proxy: any = getCurrentInstance()?.proxy;
    // 查询表单配置
    const searchOptions = ref(searchFormOptions);
    // 图标样式
    const iconColor = {
      'info': 'default',
      'danger': 'error',
      'warning': 'warning',
      'primary': 'default'
    }
    // 获取类型下拉项
    const getStatusptions = () => {
      return proxy.sendRequest('dictStatus').then(res => {
        if (res.data.code === 200) {
          const {data} = res.data;
          proxy.dropOptions.status = data.map(item => {
            return {
              ...item,
              iconColor: iconColor[item.listClass],
              label: item.dictLabel,
              value: item.dictValue
            }
          })
          return proxy.dropOptions.status;
        }
      })
    }
    
    searchOptions.value.form[2].getOptions = getStatusptions;
    
    return {
      searchOptions,
      columns
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
        orderByColumn: null,
        isAsc: null,
        total: 0,
        pageSizeOptions: ["10", "20", "30", "50"],
        showTotal: (total) => `共 ${total} 条`,
      },
      // 类型下拉项
      dropOptions: {
        status: []
      },
      // 选中行
      rowSelection: [],
    }
  },
  computed: {
    // 表格列 tag 样式
    tagIconStyle: function () {
      return (type, row) => {
        const options = this.dropOptions.status.find(item => {
          return item.value === row.status.toString()
        });
        if (options) {
          return type === 'color' ? options.iconColor : options.label
        } else {
          return ''
        }
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
        case 'dictStatus':
          return this.$axios.get('system/dict/data/type/sys_common_status');
        case 'list':
          return this.$axios.get('/monitor/logininfor/list', {params: data});
        case 'delete':
          return this.$axios.delete('/monitor/logininfor/' + data);
        case 'clear':
          return this.$axios.delete('/monitor/logininfor/clean');
      }
    },
    // 获取表格数据
    getTableData: function () {
      const loadingHandle = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C"
      })
      // 分页项/ 排序项
      const {pageNum, pageSize, orderByColumn, isAsc} = this.pagination;
      // 表单项
      const {formData} = this.$refs.searchRef?.getFormData() || {formData: {}}
      const params = Object.assign(formData, {pageNum, pageSize, orderByColumn, isAsc});
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
        case 'delete':
          const ids = this.rowSelection;
          this.$confirm({
            title: () => "系统提示",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => `是否确认删除访问编号为"${ids}"的数据项？`,
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
        case 'clear':
          this.$confirm({
            title: () => "系统提示",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => `是否确认清空所有登录日志数据项？`,
            onOk() {
              _this.sendRequest('clear', null).then(res => {
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
          const rowKey = record.infoId;
          // 选中下标
          const idx = this.rowSelection.findIndex(r => r === rowKey);
          if (idx !== -1){
            this.rowSelection.splice(idx, 1);
          }else {
            this.rowSelection.push(rowKey);
          }
        }
      }
    },
    // 排序
    sortChange: function (pagination, filters, sorter) {
      this.pagination.orderByColumn = sorter.columnKey;
      this.pagination.isAsc = sorter.order? sorter.order + 'ing': '';
      this.getTableData()
    }
  }
})
</script>

<style lang="less" scoped>
.operlog-page {
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