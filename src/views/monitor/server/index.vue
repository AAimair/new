<template>
  <div class="server-page">
    <div class="card-view">
      <a-row>
        <a-col :span="12">
          <div class="card-item">
            <div class="title">
              <span>CPU</span>
            </div>
            <div class="body">
              <a-row>
                <a-col :span="12" class="title"><span>属性</span></a-col>
                <a-col :span="12" class="title"><span>值</span></a-col>
              </a-row>
              <a-row
                v-for="item in cpuList"
                :key="item.key"
              >
                <a-col :span="12"><span>{{ item.label }}</span></a-col>
                <a-col :span="12"><span>{{ item.value }}{{ item.suffix }}</span></a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="card-item">
            <div class="title">
              <span>内存</span>
            </div>
            <div class="body">
              <a-row>
                <a-col :span="8" class="title"><span>属性</span></a-col>
                <a-col :span="8" class="title"><span>内存</span></a-col>
                <a-col :span="8" class="title"><span>JVM</span></a-col>
              </a-row>
              <a-row
                v-for="item in ramList"
                :key="item.key"
              >
                <a-col :span="8"><span>{{ item.label }}</span></a-col>
                <a-col :span="8"><span>{{ item.ram.value }}{{ item.ram.suffix }}</span></a-col>
                <a-col :span="8"><span>{{ item.JVM.value }}{{ item.JVM.suffix }}</span></a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <div class="card-item">
            <div class="title">
              <span>服务器信息</span>
            </div>
            <div class="body">
              <a-row>
                <template
                  v-for="(item, idx) in serverList"
                  :key="item.key"
                >
                  <a-col :span="4"><span>{{ item.label }}</span></a-col>
                  <a-col :span="idx % 2? 6: 10"><span>{{ item.value }}</span></a-col>
                </template>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <div class="card-item">
            <div class="title">
              <span>Java虚拟机信息</span>
            </div>
            <div class="body">
              <a-row>
                <template
                  v-for="(item, idx) in javaVMList"
                  :key="item.key"
                >
                  <a-col :span="4"><span>{{ item.label }}</span></a-col>
                  <a-col :span="idx % 2? 6: 10"><span>{{ item.value }}</span></a-col>
                </template>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <div class="card-item">
            <div class="title">
              <span>磁盘状态</span>
            </div>
            <div class="body">
              <a-row>
                <a-col
                  v-for="(item, idx) in diskModel"
                  :key="item.key"
                  :span="idx % 2 ? 4: 3"
                  class="title"
                >
                  <span>{{ item.label }}</span>
                </a-col>
              </a-row>
              <a-row>
                <template
                  v-for="(item, idx) in diskList"
                  :key="idx"
                >
                  <a-col
                    v-for="(key,idx) in diskModel"
                    :key="key.key"
                    :span="idx % 2 ? 4: 3"
                  >
                    <span>{{ item[key.key] }}{{ key.suffix }}</span>
                  </a-col>
                </template>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, getCurrentInstance, onBeforeMount} from "vue";

declare type Disk = {
  dirName: string,
  sysTypeName: string,
  typeName: string,
  total: string,
  free: string,
  used: string,
  usage: number
}

export default defineComponent({
  name: 'monitorServer',
  setup() {
    const proxy:any = getCurrentInstance()?.proxy;
    // CPU
    let cpuList = ref([
      {
        key: 'cpuNum',
        label: '核心数',
        suffix: '',
        value: ''
      }, {
        key: 'used',
        label: '用户使用率',
        suffix: '%',
        value: ''
      }, {
        key: 'sys',
        label: '系统使用率',
        suffix: '%',
        value: ''
      }, {
        key: 'free',
        label: '当前空闲率',
        suffix: '%',
        value: ''
      }
    ]);
    // 内存
    let ramList = ref([
      {
        key: 'total',
        label: '总内存',
        ram: {
          suffix: 'G',
          value: ''
        },
        JVM: {
          suffix: 'M',
          value: ''
        }
      }, {
        key: 'used',
        label: '已用内存',
        ram: {
          suffix: 'G',
          value: ''
        },
        JVM: {
          suffix: 'M',
          value: ''
        }
      }, {
        key: 'free',
        label: '剩余内存',
        ram: {
          suffix: 'G',
          value: ''
        },
        JVM: {
          suffix: 'M',
          value: ''
        }
      }, {
        key: 'usage',
        label: '使用率',
        ram: {
          suffix: '%',
          value: ''
        },
        JVM: {
          suffix: '%',
          value: ''
        }
      },
    ]);
    // 服务器信息
    let serverList = ref([
      {
        key: 'computerName',
        label: '服务器名称',
        value: ''
      }, {
        key: 'osName',
        label: '操作系统',
        value: ''
      }, {
        key: 'computerIp',
        label: '服务器IP',
        value: ''
      }, {
        key: 'osArch',
        label: '系统架构',
        value: ''
      }
    ]);
    // JAVA 虚拟机信息
    let javaVMList = ref([
      {
        key: 'name',
        label: 'Java名称',
        value: ''
      }, {
        key: 'version',
        label: 'Java版本',
        value: ''
      }, {
        key: 'startTime',
        label: '启动时间',
        value: ''
      }, {
        key: 'runTime',
        label: '运行时长',
        value: ''
      }, {
        key: 'home',
        label: '安装路径',
        value: ''
      }, {
        key: '',
        label: '',
        value: ''
      }, {
        key: 'userDir',
        label: '项目路径',
        value: ''
      },{
        key: '',
        label: '',
        value: ''
      }
    ])
    // 磁盘状态
    let diskList = ref<Disk[]>([])

    const diskModel = [
      {
        key: 'dirName',
        label: '盘符路径',
        suffix: ''
      },{
        key: 'sysTypeName',
        label: '文件系统',
        suffix: ''
      },{
        key: 'typeName',
        label: '盘符类型',
        suffix: ''
      },{
        key: 'total',
        label: '总大小',
        suffix: ''
      },{
        key: 'free',
        label: '可用大小',
        suffix: ''
      },{
        key: 'used',
        label: '已用大小',
        suffix: ''
      },{
        key: 'usage',
        label: '已用百分比',
        suffix: '%'
      },
    ]

    const getServerData = () => {
      const loadingHandle = proxy.$loading({
        background: 'rgba(0,0,0,0.75)',
        size: 166,
        iconColor: '#00678C',
      })
      proxy.$axios.get('/monitor/server').then(res => {
        loadingHandle.close()
        if (res.data.code === 200){
          const { cpu, jvm, mem, sys, sysFiles } = res.data.data;
          // cpu, 服务器信息
          [cpuList, serverList].forEach(card => {
            card.value.forEach(item => {
              item.value = cpu[item.key] || sys[item.key] || ''
            })
          })
          // JAVA 虚拟机信息
          javaVMList.value.forEach(item => {
            item.value = jvm[item.key] || sys[item.key]
          })
          // Ram
          ramList.value.forEach(item => {
            item.ram.value = mem[item.key];
            item.JVM.value = jvm[item.key];
          })
          // disk
          diskList.value = sysFiles;
        } else {
          proxy.$message.error(res.data.msg);
        }
      }).catch(() => {
        loadingHandle.close();
        proxy.$message.error('服务器异常');
      })
    }

    onBeforeMount(() => {
      getServerData();
    })

    return {
      cpuList,
      ramList,
      serverList,
      javaVMList,
      diskList,
      diskModel
    }
  },
})
</script>

<style lang="less" scoped>

.server-page {
  width: 100%;
  min-height: 100%;
  padding: 20px;
  color: #303133;
  background-color: #fff;

  > .card-view {
    > .ant-row{
      > .ant-col {
        padding: 0 15px;
        margin-bottom: 10px;

        @import "../card.less";
      }
    }
  }
}
</style>