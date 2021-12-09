<template>
  <div class="job-page">
    <div class="top">
      <div class="top-search">
        <div class="tableTit">
          <div class="tit">
            <div
              :class="[
              'shrinkBtn',
              {shrink: topSearchShrink}
            ]"
              @click="searchShrink('top')"
            >
              <alpIcon :size='16' type='svg' icon="miscChevronUpDouble24.svg"/>
            </div>
            <span>定时任务列表</span>
          </div>
          <div class="tableBtn">
            <a-button
              type="primary"
              size="small"
              @click="searchHandle('top','search')"
            >
              <template #icon>
                <SearchOutlined/>
              </template>
              搜索
            </a-button>
            <a-button
              size="small"
              @click="searchHandle('top','reset')"
            >
              <template #icon>
                <SyncOutlined/>
              </template>
              重置
            </a-button>
            <a-button
              size="small"
              @click="rowHandle('top.add', null)"
            >
              <template #icon>
                <PlusOutlined/>
              </template>
              新增
            </a-button>
            <a-button
              size="small"
              :disabled="topRowSelection.length !== 1"
              @click="rowHandle('top.edit', null)"
            >
              <template #icon>
                <EditOutlined/>
              </template>
              修改
            </a-button>
            <a-button
              size="small"
              :disabled="topRowSelection.length === 0"
              @click="rowHandle('top.delete', null)"
            >
              <template #icon>
                <DeleteOutlined/>
              </template>
              删除
            </a-button>
<!--            <a-button-->
<!--              size="small"-->
<!--              @click="rowHandle('top.export', null)"-->
<!--            >-->
<!--              <template #icon>-->
<!--                <ToTopOutlined/>-->
<!--              </template>-->
<!--              导出-->
<!--            </a-button>-->
            <a-button
              size="small"
              :disabled="topRowSelection.length !== 1"
              @click="rowHandle('top.journal', null)"
            >
              <template #icon>
                <ControlOutlined/>
              </template>
              日志
            </a-button>
          </div>
        </div>
        <div
          :class="[
          'topSearchForm',
          {shrink: topSearchShrink}
        ]"
        >
          <alp-form-group
            ref="searchRef"
            :options="searchOptions"
            :form_data="topSearchParams"
          />
        </div>
      </div>
      <div class="table-view">
        <div
          class="table"
          :style="{height: topTableViewHeight + 'px'}"
        >
          <a-table
            :dataSource="topTableData"
            :columns="columns"
            size="small"
            :pagination="false"
            :row-selection="{selectedRowKeys:topRowSelection, onChange: topSelectRows }"
            rowKey="jobId"
            :customRow="(record) => customRow('top', record)"
            bordered
          >
            <template #status="{text, record}">
              <div @click.stop>
                <a-switch
                  size="small"
                  :checked="text"
                  checkedValue="0"
                  unCheckedValue="1"
                  @click="rowHandle('top.status', record)"
                />
              </div>
            </template>
            
            <template #action="{record}">
              <div @click.stop>
                <a-button
                  type="link"
                  ghost
                  @click="rowHandle('top.edit', record)"
                >
                  <template #icon>
                    <EditOutlined/>
                  </template>
                  <span>编辑</span>
                </a-button>
  
                <a-button
                  type="link"
                  ghost
                  @click="rowHandle('top.delete', record)"
                >
                  <template #icon>
                    <DeleteOutlined/>
                  </template>
                  <span>删除</span>
                </a-button>
  
                <a-dropdown>
                  <a-button
                    type="link"
                    ghost
                    @click.prevent
                  >
                    <template #icon>
                      <DoubleRightOutlined/>
                    </template>
                    <span>更多</span>
                  </a-button>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a-button
                          type="text"
                          @click="rowHandle('top.execute', record)"
                        >
                          <template #icon>
                            <CaretRightOutlined/>
                          </template>
                          <span>执行一次</span>
                        </a-button>
                      </a-menu-item>
                      <a-menu-item>
                        <a-button
                          type="text"
                          @click="rowHandle('top.detail', record)"
                        >
                          <template #icon>
                            <EyeOutlined/>
                          </template>
                          <span>任务详细</span>
                        </a-button>
                      </a-menu-item>
                      <a-menu-item>
                        <a-button
                          type="text"
                          @click="rowHandle('top.journal', record)"
                        >
                          <template #icon>
                            <ControlOutlined/>
                          </template>
                          <span>调度日志</span>
                        </a-button>
                      </a-menu-item>
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
            v-model:current="topSearchParams.pageNum"
            v-model:pageSize="topSearchParams.pageSize"
            :pageSizeOptions="pagination.pageSizeOptions"
            :show-total="pagination.showTotal"
            :total="topTableTotal"
            show-quick-jumper
            showSizeChanger
            show-less-items
            @change="topPaginationChange"
            @showSizeChange="topPaginationChange"
          />
        </div>
      </div>
    </div>
    
    <div class="bottom">
      <div class="top-search">
        <div class="tableTit">
          <div class="tit">
            <div
              :class="[
              'shrinkBtn',
              {shrink: bottomSearchShrink}
            ]"
              @click="searchShrink('bottom')"
            >
              <alpIcon :size='16' type='svg' icon="miscChevronUpDouble24.svg"/>
            </div>
            <span>任务日志</span>
          </div>
          <div class="tableBtn">
            <a-button
              type="primary"
              size="small"
              @click="searchHandle('bottom','search')"
            >
              <template #icon>
                <SearchOutlined/>
              </template>
              搜索
            </a-button>
            <a-button
              size="small"
              @click="searchHandle('bottom','reset')"
            >
              <template #icon>
                <SyncOutlined/>
              </template>
              重置
            </a-button>
            <a-button
              size="small"
              :disabled="bottomRowSelection.length === 0"
              @click="rowHandle('bottom.delete', null)"
            >
              <template #icon>
                <DeleteOutlined/>
              </template>
              删除
            </a-button>
            <a-button
              size="small"
              @click="rowHandle('bottom.clear', null)"
            >
              <template #icon>
                <DeleteOutlined/>
              </template>
              清空
            </a-button>
<!--            <a-button-->
<!--              size="small"-->
<!--              @click="rowHandle('bottom.export', null)"-->
<!--            >-->
<!--              <template #icon>-->
<!--                <ToTopOutlined/>-->
<!--              </template>-->
<!--              导出-->
<!--            </a-button>-->
          </div>
        </div>
        <div
          :class="[
          'topSearchForm',
          {shrink: bottomSearchShrink}
        ]"
        >
          <alp-form-group
            :key="bottomFormKey"
            ref="bottomSearchRef"
            :options="bottomSearchOptions"
            :form_data="bottomSearchData"
          />
        </div>
      </div>
      <div class="table-view">
        <div
          class="table"
          :style="{height: bottomTableViewHeight + 'px'}"
        >
          <a-table
            :dataSource="bottomTableData"
            :columns="bottomTableColumns"
            size="small"
            :pagination="false"
            :row-selection="{selectedRowKeys:bottomRowSelection, onChange: bottomSelectRows}"
            rowKey="jobLogId"
            :customRow="(record) => customRow('bottom', record)"
            bordered
          >
            <template #status="{text, record}">
              <span>{{ formatStatus(text, record) }}</span>
            </template>
            
            <template #action="{record}">
              <div @click.stop>
                <a-button
                  type="link"
                  ghost
                  @click="rowHandle('bottom.detail', record)"
                >
                  <template #icon>
                    <EyeOutlined/>
                  </template>
                  <span>详细</span>
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
        <div class="pagination">
          <a-pagination
            size="small"
            v-model:current="bottomSearchParams.pageNum"
            v-model:pageSize="bottomSearchParams.pageSize"
            :pageSizeOptions="pagination.pageSizeOptions"
            :show-total="pagination.showTotal"
            :total="bottomTableTotal"
            show-quick-jumper
            showSizeChanger
            show-less-items
            @change="bottomPaginationChange"
            @showSizeChange="bottomPaginationChange"
          />
        </div>
      </div>
    </div>
    
    <!-- 上表添加/编辑弹窗 -->
    <a-modal
      v-model:visible="topDialogOptions.show"
      :title="dialogTitleMap[topDialogOptions.mode]"
      :width="500"
      :closable="false"
    >
      <template #footer>
        <a-button key="back" @click="topDialogConfirm(false)">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="topDialogOptions.loading"
          @click="topDialogConfirm(true)"
        >保存
        </a-button>
      </template>
      
      <div class="popupMain">
        <alpFormGroup
          v-if="topDialogOptions.show"
          :key="topDialogOptions.key"
          ref="topForm"
          :options="topDialogOptions.mode === 'view'? topFormViewOptions:topFormOptions"
          :form_data="topDialogOptions.data"
        >
        </alpFormGroup>
      </div>
    </a-modal>
  
    <!-- corn 表达式弹窗 -->
    <a-modal
      v-model:visible="cronDialogOptions.show"
      title="Cron 表达式"
      :width="800"
      :closable="false"
    >
      <template #footer>
        <a-button key="back" @click="cronConfirm(false)">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          @click="cronConfirm(true)"
        >保存
        </a-button>
      </template>
    
      <div class="popupMain">
        <alpCron
          :key="cronDialogOptions.key"
          v-model:data="cronDialogOptions.cronData"/>
<!--        <cron ref="cronRef"></cron>-->
      </div>
    </a-modal>
    
    <!-- 下表查看弹窗 -->
    <a-modal
      v-model:visible="bottomDialogOptions.show"
      title="详情"
      :width="500"
      :closable="false"
    >
      <template #footer>
        <a-button key="back" @click="bottomDialogConfirm">取消</a-button>
      </template>
    
      <div class="popupMain">
        <alpFormGroup
          v-if="bottomDialogOptions.show"
          ref="bottomForm"
          :options="bottomViewOptions"
          :form_data="bottomDialogOptions.data"
        >
        </alpFormGroup>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {createVNode, defineComponent, getCurrentInstance, ref} from "vue";
import {
  searchOptions as searchForm,
  tableColumns as columns,
  topFormOptions as dialogOptions,
  topFormView as dialogView,
  bottomSearchOptions as bottomSearchForm,
  bottomTableColumns,
  bottomViewOptions
} from './formOptions.js';
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: 'monitorJob',
  data() {
    return {
      // 表格高度
      topTableViewHeight: 200,
      bottomTableViewHeight: 200,
      // 表格选中数据
      topRowSelection: [],
      bottomRowSelection: [],
      // 查询参数
      topSearchParams: {
        pageNum: 1,
        pageSize: 10
      },
      bottomSearchParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 下表查询数据
      bottomFormKey: 0,
      bottomSearchData: {},
      // 上表搜索框收缩
      topSearchShrink: false,
      // 下表搜索框收缩
      bottomSearchShrink: false,
      // 表格数据
      topTableData: [],
      bottomTableData: [],
      // 总数
      topTableTotal: 0,
      bottomTableTotal: 0,
      // 分页参数
      pagination: {
        pageSizeOptions: ["10", "20", "30", "50"],
        showTotal: (total) => `共 ${total} 条`,
      },
      // 弹窗标题
      dialogTitleMap: {
        add: '添加任务',
        update: '编辑任务',
        view: '任务详细'
      },
      // 弹窗配置
      topDialogOptions: {
        key: 0,
        mode: 'add',
        show: false, // 显示
        loading: false,
        template: {
          jobId: null,
          jobName: null,
          jobGroup: null,
          invokeTarget: null,
          cronExpression: null,
          misfirePolicy: null,
          concurrent: null,
          status: null
        },
        data: {}
      },
      bottomDialogOptions: {
        show: false,
        loading: false,
        template: {
          jobLogId: null,
          jobName: null,
          jobGroup: null,
          createTime: null,
          invokeTarget: null,
          jobMessage: null,
          status: null,
          exceptionInfo: null,
        },
        data: {}
      },
      // cron 表达式弹窗
      cronDialogOptions: {
        show: false,
        key: 0,
        cronData: '',
      }
    }
  },
  setup() {
    const proxy: any = getCurrentInstance()?.proxy;
    // 查询下拉项配置
    const searchOptions = ref(searchForm);
    // 上表添加/编辑表单配置
    const topFormOptions = ref(dialogOptions)
    // 上表 查看配置
    const topFormViewOptions = ref(dialogView)
    // 下表查询配置
    const bottomSearchOptions = ref(bottomSearchForm)
    
    // 获取任务组下拉项
    const getJobGroup = () => {
      return proxy.$axios('/system/dict/data/type/sys_job_group').then(res => {
        if (res.data.code === 200) {
          return res.data.data.map(item => {
            return {
              ...item,
              label: item.dictLabel,
              value: item.dictValue
            }
          })
        } else {
          return []
        }
      })
    }
    // 获取状态下拉项
    const getStatus = () => {
      return proxy.$axios('/system/dict/data/type/sys_job_status').then(res => {
        if (res.data.code === 200) {
          return res.data.data.map(item => {
            return {
              ...item,
              label: item.dictLabel,
              value: item.dictValue,
            }
          })
        } else {
          return []
        }
      })
    }
    // 获取执行状态下拉数据
    const getRunStatus = () => {
      return proxy.$axios('/system/dict/data/type/sys_common_status').then(res => {
        if (res.data.code === 200) {
          return res.data.data.map(item => {
            return {
              ...item,
              label: item.dictLabel,
              value: item.dictValue,
            }
          })
        } else {
          return []
        }
      })
    }
    
    // 查询 任务组名配置
    searchOptions.value.form[1].getOptions = getJobGroup;
    // 查询 任务状态配置
    searchOptions.value.form[2].getOptions = getStatus;
    
    // 表单任务组下拉
    topFormOptions.value.form[2].getOptions = getJobGroup;
    topFormOptions.value.form[7].getOptions = getStatus;
    topFormOptions.value.form[4].suffix.click = () => {
      proxy.cronDialogOptions.show = true;
    }
    
    // 表单查看模板
    topFormViewOptions.value.form[2].getOptions = getJobGroup;
    topFormViewOptions.value.form[7].getOptions = getStatus;
    
    // 下表查询下拉项
    bottomSearchOptions.value.form[1].getOptions = getJobGroup;
    bottomSearchOptions.value.form[2].getOptions = getRunStatus;
    return {
      searchOptions,
      columns,
      topFormOptions,
      topFormViewOptions,
      bottomSearchOptions,
      bottomTableColumns,
      bottomViewOptions
    }
  },
  created() {
    this.getTopTableData();
    this.getBottomData();
  },
  mounted() {
    const moduleHeight = this.$el.querySelector('.top').clientHeight;
    this.topFormHeight = this.$el.querySelector('.top .topSearchForm').clientHeight;
    this.bottomFormHeight = this.$el.querySelector('.bottom .topSearchForm').clientHeight;
    // 标题 40+10 上下padding 20 分页 25+10
    this.topTableViewHeight = moduleHeight - (85 + 40 + this.topFormHeight);
    this.bottomTableViewHeight = moduleHeight - (85 + 40 + this.topFormHeight);
  },
  computed: {
    formatStatus: function () {
      return (text, record) => {
        return text === '0' ? '成功' : '失败'
      }
    }
  },
  methods: {
    // 查询收缩
    searchShrink: function (type) {
      switch (type) {
        case 'top':
          this.topSearchShrink = !this.topSearchShrink;
          this.topTableViewHeight += this.topFormHeight * (this.topSearchShrink ? 1 : -1);
          break;
        case 'bottom':
          this.bottomSearchShrink = !this.bottomSearchShrink;
          this.bottomTableViewHeight += this.bottomFormHeight * (this.bottomSearchShrink ? 1 : -1);
      }
    },
    // 查询事件
    searchHandle: function (view, type) {
      if (view === 'top') {
        switch (type) {
          case 'search': // 搜索
            const {formData} = this.$refs.searchRef.getFormData();
            this.topSearchParams = Object.assign(this.topSearchParams, formData);
            break;
          case 'reset': // 重置
            this.$refs.searchRef.resetValidation();
            break;
        }
        this.topSearchParams.pageNum = 1;
        this.getTopTableData();
      } else {
        switch (type) {
          case 'search': // 搜索
            const {formData} = this.$refs.bottomSearchRef.getFormData();
            this.bottomSearchParams = Object.assign(this.bottomSearchParams, formData);
            break;
          case 'reset': // 重置
            this.bottomFormKey++;
            this.bottomSearchData = {};
            this.bottomSearchParams = {
              pageNum: 1,
              pageSize: this.bottomSearchParams.pageSize
            }
            this.$refs.bottomSearchRef.resetValidation();
            break;
        }
        this.bottomSearchParams.pageNum = 1;
        this.getBottomData();
      }
    },
    // 获取表格数据
    getTopTableData: function () {
      const loadingHandle = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C"
      })
      this.sendRequest('topList', this.topSearchParams).then(res => {
        loadingHandle.close();
        if (res.data.code === 200) {
          const {rows, total} = res.data;
          this.topTableTotal = total;
          this.topTableData = rows;
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务器异常')
      })
    },
    // 获取下表数据
    getBottomData: function () {
      const loadingHandle = this.$loading({
        background: "rgba(0,0,0,0.0)",
        size: 166,
        iconColor: "#00678C"
      })
      this.sendRequest('bottomList', this.bottomSearchParams).then(res => {
        loadingHandle.close();
        if (res.data.code === 200) {
          const {rows, total} = res.data;
          this.bottomTableData = rows;
          this.bottomTableTotal = total;
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务器异常')
      })
    },
    // 表格数据操作
    rowHandle: function (type, row) {
      const _this = this;
      const [table, handle] = type.split('.'); // 表格 // 操作
      if (table === 'top') {
        // 操作数据
        const selectRow = row || this.topTableData.find(row => row.jobId === this.topRowSelection[0]) || {}
        // 表单提交数据
        const data = {};
        for (const key in this.topDialogOptions.template) {
          if (selectRow.hasOwnProperty(key)) {
            data[key] = {
              value: selectRow[key]
            }
          }
        }
        switch (handle) {
          case 'add': // 添加
            this.topDialogOptions.mode = 'add';
            this.topDialogOptions.show = true;
            this.cronDialogOptions.key ++;
            this.cronDialogOptions.cronData = '';
            break;
          case 'edit': // 编辑
            this.topDialogOptions.data = data;
            this.cronDialogOptions.key ++;
            this.cronDialogOptions.cronData = data['cronExpression'].value;
            this.topDialogOptions.mode = 'update';
            this.topDialogOptions.show = true;
            break;
          case 'delete': // 删除
            const ids = row?.jobId || _this.topRowSelection;
            this.$confirm({
              title: () => "系统提示",
              icon: () => createVNode(ExclamationCircleOutlined),
              content: () => `是否确认删除定时任务编号为"${ids}"的数据项？`,
              onOk() {
                _this.sendRequest('topDelete', ids).then(res => {
                  if (res.data.code === 200) {
                    _this.topSearchParams.pageNum = 1;
                    _this.topRowSelection.length = 0;
                    _this.getTopTableData();
                  } else {
                    _this.$message.error(res.data.msg);
                  }
                }).catch(() => _this.$message.error('服务器异常'))
              },
              onCancel() {
              },
            });
            break;
          case 'export': // 导出
            console.log('export');
            break;
          case 'journal': // 日志
            this.bottomFormKey++;
            this.bottomSearchData = {
              jobName: {value: selectRow.jobName},
              jobGroup: {value: selectRow.jobGroup}
            }
            this.$nextTick(() => {
              const {formData} = this.$refs.bottomSearchRef.getFormData();
              this.bottomSearchParams = Object.assign(this.bottomSearchParams, formData);
              this.getBottomData()
            });
            break;
          case 'status':
            this.$confirm({
              title: () => "系统提示",
              icon: () => createVNode(ExclamationCircleOutlined),
              content: () => `确认要${row.status === "1" ? '启用' : '停用'}${row.jobName}任务吗？`,
              onOk() {
                _this.sendRequest('status', {
                  jobId: row.jobId,
                  status: row.status === "1" ? "0" : "1"
                }).then(res => {
                  if (res.data.code === 200) {
                    _this.$message.success('执行成功');
                    _this.getTopTableData();
                  } else {
                    _this.$message.error(res.data.msg);
                  }
                }).catch(() => _this.$message.error('服务器异常'))
              },
              onCancel() {
              },
            });
            break;
          case 'execute': // 执行
            this.$confirm({
              title: () => "系统提示",
              icon: () => createVNode(ExclamationCircleOutlined),
              content: () => `确认要立即执行一次"${row.jobName}"任务吗？`,
              onOk() {
                _this.sendRequest('run', {
                  jobGroup: row.jobGroup,
                  jobId: row.jobId
                }).then(res => {
                  if (res.data.code === 200) {
                    _this.$message.success('执行成功');
                  } else {
                    _this.$message.error(res.data.msg);
                  }
                }).catch(() => _this.$message.error('服务器异常'))
              },
              onCancel() {
              },
            });
            break;
          case 'detail': // 详细
            this.topDialogOptions.data = data;
            this.topDialogOptions.mode = 'view';
            this.topDialogOptions.show = true;
            break;
        }
      } else {
        switch (handle) {
          case 'delete': // 删除
            const ids = this.bottomRowSelection;
            this.$confirm({
              title: () => "系统提示",
              icon: () => createVNode(ExclamationCircleOutlined),
              content: () => `是否确认删除调度日志编号为"${ids}"的数据项？`,
              onOk() {
                _this.sendRequest('bottomDelete', ids).then(res => {
                  if (res.data.code === 200) {
                    _this.bottomSearchParams.pageNum = 1;
                    _this.bottomRowSelection.length = 0;
                    _this.getBottomData();
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
              content: () => `是否确认清空所有调度日志数据项？`,
              onOk() {
                _this.sendRequest('clear', null).then(res => {
                  if (res.data.code === 200) {
                    _this.bottomSearchParams.pageNum = 1;
                    _this.bottomRowSelection.length = 0;
                    _this.getBottomData();
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
          case 'detail':
            // 操作数据
            const selectRow = row || {}
            // 表单提交数据
            const data = {};
            for (const key in this.bottomDialogOptions.template) {
              if (selectRow.hasOwnProperty(key)) {
                data[key] = {
                  value: selectRow[key]
                }
              }
            }
            this.bottomDialogOptions.data = data;
            this.bottomDialogOptions.show = true;
            break;
        }
      }
    },
    // 选择行
    topSelectRows: function (selectRow) {
      this.topRowSelection = selectRow;
    },
    bottomSelectRows: function (selectRow) {
      this.bottomRowSelection = selectRow;
    },
    // api 请求
    sendRequest: function (type, data) {
      switch (type) {
        case 'topList':
          return this.$axios.get('/monitor/job/list', {params: data})
        case 'add':
          return this.$axios.post('/monitor/job', data);
        case 'topDelete':
          return this.$axios.delete('/monitor/job/' + data);
        case 'update':
          return this.$axios.put('/monitor/job', data);
        case 'run':
          return this.$axios.put('/monitor/job/run', data)
        case 'status':
          return this.$axios.put('/monitor/job/changeStatus', data)
        case 'bottomList':
          return this.$axios.get('/monitor/jobLog/list', {params: data})
        case 'bottomDelete':
          return this.$axios.delete('/monitor/jobLog/' + data)
        case 'clear':
          return this.$axios.delete('/monitor/jobLog/clean');
      }
    },
    // 弹窗提交
    topDialogConfirm: function (type) {
      const form = this.$refs.topForm;
      if (type && (this.topDialogOptions.mode === 'add' || this.topDialogOptions.mode === 'update')) {
        form.formValidation().then((res) => {
          if (res.state) {
            this.topDialogOptions.loading = true;
            const isAdd = this.topDialogOptions.mode === 'add';
            // 表单数据
            const {formData} = form.getFormData();
            this.sendRequest(isAdd ? 'add' : 'update', formData).then(res => {
              this.topDialogOptions.loading = false;
              if (res.data.code === 200) {
                this.topDialogOptions.show = false;
                this.getTopTableData();
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(() => {
              this.topDialogOptions.loading = false;
              this.$message.error('服务器异常')
            })
          }
        })
      }else {
        this.topDialogOptions.data = {};
        this.topDialogOptions.show = false;
      }
    },
    bottomDialogConfirm:function () {
      this.$refs.bottomForm.resetValidation();
      this.bottomDialogOptions.data = {};
      this.bottomDialogOptions.show = false;
    },
    // 页码更改
    topPaginationChange: function (num, size) {
      this.topSearchParams.pageNum = num;
      this.topSearchParams.pageSize = size;
      this.getTopTableData();
    },
    bottomPaginationChange: function (num, size) {
      this.bottomSearchParams.pageNum = num;
      this.bottomSearchParams.pageSize = size;
      this.getBottomData();
    },
    // cron 表达式
    cronConfirm: function (type) {
      if (type){
        // this.topDialogOptions.key ++;
        const cron = this.cronDialogOptions.cronData;
        this.$refs.topForm.setSingleData('cronExpression', cron);
      }
      this.cronDialogOptions.show = false;
    },
    // 点击行
    customRow: function (type,record) {
      return {
        onClick: event => {
          const options = {
            top: {
              key: 'jobId',
              select: this.topRowSelection,
            },
            bottom: {
              key: 'jobLogId',
              select: this.bottomRowSelection
            }
          }
          // 选中行 key
          const rowKey = record[options[type].key];
          // 选中下标
          const idx = options[type].select.findIndex(r => r === rowKey);
          if (idx !== -1){
            options[type].select.splice(idx, 1);
          }else {
            options[type].select.push(rowKey);
          }
        }
      }
    },
  }
})
</script>

<style lang="less" scoped>
.job-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #eee;
  
  > .top,
  > .bottom {
    height: calc((100% - 10px) / 2);
    background-color: #fff;
    padding: 20px;
    overflow: hidden;
    
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
        overflow-y: scroll;
      }
      
      > .pagination {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  
  > .bottom {
    margin-top: 10px;
  }
}
</style>