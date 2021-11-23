<template>
  <div class="online-page">
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
          <span>在线用户列表</span>
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
          size="small"
          :pagination="false"
          rowKey="tokenId"
          bordered
        >
          <template #loginTime="{ text  }">
            <span> {{ formatTime(text) }} </span>
          </template>
          
          <template #action="{ record  }">
            <a-button
              type="link"
              ghost
              @click="rowHandle('exit', record)"
            >
              <template #icon>
                <DeleteOutlined/>
              </template>
              <span>强退</span>
            </a-button>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination
          size="small"
          v-model:current="pagination.num"
          v-model:pageSize="pagination.size"
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
import {defineComponent, createVNode} from "vue";
import "@/common/common_vue.js";
import {searchOptions, tableColumns} from "./formOptions.js";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: "monitorOnline",
  setup() {
    return {
      searchOptions, // 查询配置
      columns: tableColumns,// 表格列配置
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
      // 所有数据
      dataList: [],
      // 表格数据
      tableData: [],
      // 分页参数
      pagination: {
        size: 20,
        num: 1,
        total: 0,
        pageSizeOptions: ["10", "20", "30", "50"],
        showTotal: (total) => `共 ${total} 条`,
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
  computed: {
    formatTime: function () {
      return (time) => {
        return (new Date(time) as any).Format('yyyy-MM-dd hh:mm:ss');
      }
    }
  },
  methods: {
    // 查询收缩
    topSearchShrink: function () {
      this.searchShrink = !this.searchShrink;
      this.tableViewHeight += this.topFormHeight * (this.searchShrink ? 1 : -1);
    },
    // 查询事件
    searchHandle: function (type) {
      switch (type) {
        case 'search': // 搜索
          const {formData} = this.$refs.searchRef.getFormData();
          this.searchParams = formData;
          break;
        case 'reset': // 重置
          this.$refs.searchRef.resetValidation();
          break;
      }
      this.getTableData();
    },
    // 获取表格数据
    getTableData: function () {
      const loadingHandle = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C"
      })
      this.$axios.get('/monitor/online/list', {
        params: this.searchParams
      }).then(res => {
        loadingHandle.close();
        if (res.data.code === 200) {
          const {rows, total} = res.data;
          this.pagination.total = total;
          this.dataList = rows.map((row, idx) => {
            return {
              idx: idx + 1,
              ...row
            }
          })
          this.pagination.num = 1;
          this.dataPaging(this.dataList, 1, this.pagination.size);
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务器异常')
      })
    },
    // 数据分页
    dataPaging: function (list, num, size) {
      this.tableData = JSON.parse(JSON.stringify(list)).slice(num === 1 ? 0 : ((num - 1) * size), num * size)
    },
    // 分页事件
    paginationChange: function (num, size) {
      this.pagination.num = num;
      this.pagination.size = size;
      this.dataPaging(this.dataList, num, size);
    },
    // 表格数据操作
    rowHandle: function (type, row) {
      if (!row) return;
      const _this = this;
      switch (type) {
        case 'exit':
          this.$confirm({
            title: () => "系统提示",
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => `是否确认强退名称为${row.userName}的数据项?`,
            onOk() {
              _this.$axios.delete('/monitor/online/' + row.tokenId).then(res => {
                if (res.data.code === 200) {
                  _this.getTableData();
                } else {
                  _this.$message.error(res.data.msg);
                }
              }).catch(() => _this.$message.error('服务器异常'))
            },
            onCancel() {
            },
          });
      }
    }
  }
})
</script>

<style lang="less" scoped>
.online-page {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: hidden;
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
    }
    
    > .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>