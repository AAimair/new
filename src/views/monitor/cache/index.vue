<template>
  <div class="cache-page">
    <div class="card-view">
      <a-row>
        <a-col :span="24">
          <div class="card-item">
            <div class="title">
              <span>基本信息</span>
            </div>
            <div class="body">
              <a-row>
                <template
                  v-for="item in infoModel"
                  :key="item.key"
                >
                  <a-col :span="2"><span>{{ item.label }}</span></a-col>
                  <a-col v-if="infoData" :span="4"><span>{{ infoValue(item.key) }}</span></a-col>
                  <a-col v-else :span="4"><span></span></a-col>
                </template>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <div class="card-item">
            <div class="title">
              <span>命令统计</span>
            </div>
            <div class="body">
              <div
                class="chartView"
                id="commandStats"
                >
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="card-item">
            <div class="title">
              <span>内存信息</span>
            </div>
            <div class="body">
              <div
                class="chartView"
                id="cacheStats"
                >
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, getCurrentInstance, onMounted, computed} from "vue";
import {commandChartOptions, cacheChartOptions} from './echartsFormat.js'

declare type Info = {
  key: string,
  label: string,
}

declare type PieChart = {
  name: string,
  value: string
}

export default defineComponent({
  name: 'monitorCache',
  setup() {
    const proxy: any = getCurrentInstance()?.proxy;
    // 基础数据配置
    const infoModel = <Info[]>[
      {
        key: 'redis_version',
        label: 'Redis版本'
      }, {
        key: '_redis_mode',
        label: '运行模式'
      }, {
        key: 'tcp_port',
        label: '端口'
      }, {
        key: 'connected_clients',
        label: '客户端数'
      }, {
        key: 'uptime_in_days',
        label: '运行时间(天)'
      }, {
        key: 'used_memory_human',
        label: '使用内存'
      }, {
        key: 'used_cpu_user_children',
        label: '使用CPU'
      }, {
        key: 'maxmemory_human',
        label: '内存配置'
      }, {
        key: '_aof_enabled',
        label: 'AOF是否开启'
      }, {
        key: 'rdb_last_bgsave_status',
        label: 'RDB是否成功'
      }, {
        key: 'dbSize',
        label: 'Key数量'
      }, {
        key: 'instantaneous',
        label: '网络入口/出口'
      },
    ];
    // 基础数据
    let infoData = ref<any>();
    // 图例信息
    let commandChartData = ref<PieChart[]>([])
    // 图例句柄
    let commandChartHandle = ref()
    let cacheChartHandle = ref()

    // 基础信息值
    const infoValue = computed(() => {
      return (key) => {
        return infoData.value[key]
      }
    })

    // 获取数据
    const getInfoData = () => {
      const loadingHandle = proxy.$loading({
        background: 'rgba(0,0,0,0.75)',
        size: 166,
        iconColor: '#00678C',
      })
      proxy.$axios.get('/monitor/cache').then(res => {
        loadingHandle.close();
        if (res.data.code === 200){
          // 基础信息
          const {info, dbSize, commandStats} = res.data.data;
          infoData.value = {
            ...info,
            dbSize,
            _redis_mode: info.redis_mode === 'standalone' ? '单机' : '集群',
            _aof_enabled: info.aof_enabled === '0' ? '否' : '是',
            instantaneous: info.instantaneous_input_kbps + 'kps/' + info.instantaneous_output_kbps + 'kps'
          }

          // 图例信息
          commandChartData = commandStats.map(item => {
            return {
              name: item.name,
              value: parseInt(item.value)
            }
          })
          drawEcharts('command', commandChartData);
          drawEcharts('cache', parseFloat(info.used_memory_human))
        } else {
          proxy.$message.error(res.data.msg);
        }
      }).catch(() => {
        loadingHandle.close();
        proxy.$message.error('服务器异常');
      })
    }

    // 绘制echarts
    const drawEcharts = (type, data) => {
      let options = null;
      switch (type) {
        case 'command':
          commandChartHandle.value = proxy.$echarts.init(document.body.querySelector('#commandStats'));
          options = commandChartOptions(data);
          commandChartHandle.value.setOption(options);
          break;
        case 'cache':
          cacheChartHandle.value = proxy.$echarts.init(document.body.querySelector('#cacheStats'));
          options = cacheChartOptions(data);
          cacheChartHandle.value.setOption(options);
          break;
      }
    }

    onMounted(() => {
      getInfoData();
    })

    return {
      infoModel,
      infoData,
      infoValue,
    }
  }
})
</script>

<style lang="less" scoped>
.cache-page {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 20px;

  > .card-view {
    padding: 0 15px;
    margin-bottom: 10px;

    > .ant-row {
      margin-bottom: 10px;

      > .ant-col {
        padding: 0 15px;

        .chartView {
          width: 100%;
          min-height: 420px;
        }
      }
    }

    @import "../card.less";
  }

}
</style>