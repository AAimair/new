<template>
  <div class="notice-page">
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
          <span>通知公告列表</span>
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
          :rowKey="tableKey"
          bordered
          :customRow="customRow"
        >
          <template #noticeType="{ record }">
            <a-tag :color="printType('color', record)">
              {{ printType('text', record) }}
            </a-tag>
          </template>
          
          <template #status="{ record }">
            <a-tag :color="printStatus( 'color', record)">
              {{ printStatus('text', record) }}
            </a-tag>
          </template>
          
          <template #action="{ record  }">
            <div @click.stop>
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
            </div>
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
      :width="900"
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
          :options="dialogFormOptions"
          :form_data="dialogOptions.data"
        >
          <template #noticeContent>
            <span>内容: </span>
            <textarea id="richEditor" name="richEditor"></textarea>
          </template>
        </alpFormGroup>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {createVNode, defineComponent, ref, getCurrentInstance, nextTick} from "vue";
import {
  searchFormOptions,
  columns,
  dialogFormOptions as dialogForm
} from "@/views/system/notice/formOptions";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";
// import ClassicEditor from './ckeditor5-build-classic/ckeditor';

declare global {
  interface Window {
    CKEDITOR: any;
  }
}

export default defineComponent({
  name: 'systemNotice',
  setup() {
    const proxy: any = getCurrentInstance()?.proxy;
    const searchOptions = ref(searchFormOptions);
    const dialogFormOptions = ref(dialogForm);
    
    const iconColor = {
      'primary': 'processing',
      'danger': 'error',
      'success': 'success',
      'warning': 'warning'
    }
    
    // 获取公告类型
    const getType = () => {
      return proxy.sendRequest('type').then(res => {
        if (res.data.code === 200) {
          const {data} = res.data;
          proxy.dropOptions.type = data.map(item => {
            return {
              ...item,
              iconColor: iconColor[item.listClass],
              label: item.dictLabel,
              value: item.dictValue
            }
          })
          return proxy.dropOptions.type;
        }
      })
    }
    
    // 获取状态
    const getStatus = () => {
      return proxy.sendRequest('status').then(res => {
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
    
    searchOptions.value.form[2].getOptions = getType;
    dialogFormOptions.value.form[2].getOptions = getType;
    dialogFormOptions.value.form[3].getOptions = getStatus;
    nextTick(() => {
      const status = getStatus();
    })
    
    return {
      searchOptions,
      columns,
      dialogFormOptions
    }
  },
  data() {
    return {
      // 数据列表键值
      tableKey: 'noticeId',
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
      // 下拉项
      dropOptions: {
        type: [],// 公告类型
        status: [], // 状态
      },
      // 新增/修改 弹窗
      dialogOptions: {
        key: 0, // 用于 刷新表单
        show: false,
        mode: 'add',
        loading: false,
        template: {
          noticeId: null,
          noticeTitle: null,
          noticeType: null,
          status: null,
          noticeContent: null,
        }, // 表单对象模板
        data: {}, // 表单数据
      },
      // 富文本
      richHandle: null
    }
  },
  computed: {
    printStatus: function () {
      return (type, row) => {
        const status = this.dropOptions.status.find(i => i.value === row.status);
        if (status) {
          return type === 'color' ? status.iconColor : status.label;
        } else {
          return ''
        }
      }
    },
    printType: function () {
      return (type, row) => {
        const status = this.dropOptions.type.find(i => i.value === row.noticeType);
        if (status) {
          return type === 'color' ? status.iconColor : status.label;
        } else {
          return ''
        }
      }
    },
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
        case 'type':
          return this.$axios.get('/system/dict/data/type/sys_notice_type');
        case 'status':
          return this.$axios.get('/system/dict/data/type/sys_notice_status');
        case 'list':
          return this.$axios.get('/system/notice/list', {params: data});
        case 'delete':
          return this.$axios.delete('/system/notice/' + data);
        case 'add':
          return this.$axios.post('/system/notice', data);
        case 'edit':
          return this.$axios.put('/system/notice', data)
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
          // 初始化 富文本
          this.$nextTick(() => {
            this.initRichText(null)
          })
          break;
        case 'edit':
          this.dialogOptions.key++;
          this.dialogOptions.mode = type;
          // 选中行数据
          const rowData = row || this.tableData.find(row => row[this.tableKey] === this.rowSelection[0]) || {};
          for (const key in this.dialogOptions.template) {
            if (rowData.hasOwnProperty(key)) {
              this.dialogOptions.data[key] = {
                value: rowData[key]
              }
            }
          }
          this.dialogOptions.show = true;
          // 初始化 富文本
          this.$nextTick(() => {
            this.initRichText(rowData.noticeContent)
          })
          break;
        case 'delete':
          const ids = row?.[this.tableKey] || this.rowSelection;
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
          const rowKey = record[this.tableKey];
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
      if (flag) {
        form.formValidation().then(res => {
          if (res.state) {
            this.dialogOptions.loading = true;
            // 表单数据
            const {formData} = form.getFormData();
            // 富文本内容
            formData.noticeContent = this.richHandle.getData();
            this.sendRequest(this.dialogOptions.mode, formData).then(res => {
              this.dialogOptions.loading = false;
              if (res.data.code === 200) {
                this.dialogOptions.show = false;
                this.getTableData();
                this.$message.success(this.dialogOptions.mode === 'add'? '添加成功':'修改成功');
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(() => {
              this.dialogOptions.show = false;
              this.$message.error('服务器异常');
            })
          }
        })
      } else {
        this.dialogOptions.show = false;
      }
    },
    // 初始化富文本
    initRichText: function (data) {
      this.richHandle = window.CKEDITOR.replace( 'richEditor', {
        width: '100%',
        height: 300,
        readonly: true
      });
      if (data){
        this.richHandle.setData(data);
      }
      // if (!dom) {
      //   // 循环超过两次 退出
      //   if (repeat > 1) return;
      //   // 没有获取到容器时， 下次事件循环时再次初始化
      //   this.$nextTick(() => {
      //     this.initRichText(document.body.querySelector('#richEditor'), data, ++repeat);
      //   })
      // } else {
        // 初始化 富文本
        // ClassicEditor.create(dom, {}).then(editor => {
        //   // 赋值
        //   editor.setData(data ? data : '');
        //   this.richHandle = () => {
        //     return editor
        //   };
        // }).catch(() => {
        //   console.log(dom, data, repeat)
        // })
      // }
    }
  }
})
</script>

<style lang="less" scoped>
.notice-page {
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
  
  .ck-content {
    height: 300px;
  }
}
</style>