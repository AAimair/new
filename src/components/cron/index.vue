<style lang="less" scoped>
#changeContab {
  .ant-card {
    .ant-card-head {
      display: none;
    }
  }
  
  table {
    border-collapse: separate;
    border-spacing: 5px;
    
    th, td {
      text-align: center;
      margin: 0 2px;
    }
    
    td {
      border: 1px solid #eee;
      font-size: 12px;
      line-height: 30px;
    }
  }
  
  .ant-row {
    margin: 10px 0;
  }
  
  .bottom {
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      margin-left: 8px;
    }
  }
}
</style>
<template>
  <div id="changeContab">
    <a-card size="small" style="width: 750px">
      <a-tabs :animated="false">
        <a-tab-pane key="1" :tab="text.Seconds.name">
          <div class="tabBody">
            <a-radio-group name="1" v-model:value="second.cronEvery">
              <a-row>
                <a-radio value="1">{{ text.Seconds.every }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="2">{{ text.Seconds.interval[0] }}
                  <a-input-number :disabled="second.cronEvery != '2'" size="small"
                                  v-model:value="second.incrementIncrement" :min="1" :max="60"></a-input-number>
                  {{ text.Seconds.interval[1] || '' }}
                  <a-input-number :disabled="second.cronEvery != '2'" size="small" v-model:value="second.incrementStart"
                                  :min="0" :max="59"></a-input-number>
                  {{ text.Seconds.interval[2] || '' }}
                </a-radio>
              </a-row>
              <a-row>
                <a-radio class="long" value="3">{{ text.Seconds.specific }}</a-radio>
                <a-select :style="{width: '200px'}" :disabled="second.cronEvery != '3'" size="small" mode="multiple"
                          v-model:value="second.specificSpecific">
                  <a-select-option v-for="val in 60" :key="val" :value="val-1">{{ val - 1 }}</a-select-option>
                </a-select>
              </a-row>
              <a-row>
                <a-radio value="4">{{ text.Seconds.cycle[0] }}
                  <a-input-number size="small" v-model:value="second.rangeStart" :min="1" :max="60"></a-input-number>
                  {{ text.Seconds.cycle[1] || '' }}
                  <a-input-number size="small" v-model:value="second.rangeEnd" :min="0" :max="59"></a-input-number>
                  {{ text.Seconds.cycle[2] || '' }}
                </a-radio>
              </a-row>
            </a-radio-group>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="text.Minutes.name">
          <div class="tabBody">
            <a-radio-group name="2" v-model:value="minute.cronEvery">
              <a-row>
                <a-radio value="1">{{ text.Minutes.every }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="2">{{ text.Minutes.interval[0] }}
                  <a-input-number :disabled="minute.cronEvery != 2" size="small"
                                  v-model:value="minute.incrementIncrement" :min="1" :max="60"></a-input-number>
                  {{ text.Minutes.interval[1] }}
                  <a-input-number :disabled="minute.cronEvery != 2" size="small" v-model:value="minute.incrementStart"
                                  :min="0" :max="59"></a-input-number>
                  {{ text.Minutes.interval[2] || '' }}
                </a-radio>
              </a-row>
              <a-row>
                <a-radio class="long" value="3">{{ text.Minutes.specific }}</a-radio>
                <a-select :disabled="minute.cronEvery != 3" :style="{width: '200px'}" size="small" mode="multiple"
                          v-model:value="minute.specificSpecific">
                  <a-select-option v-for="val in 60" :key="val" :value="val-1">{{ val - 1 }}</a-select-option>
                </a-select>
              </a-row>
              <a-row>
                <a-radio value="4">{{ text.Minutes.cycle[0] }}
                  <a-input-number :disabled="minute.cronEvery != 4" size="small" v-model:value="minute.rangeStart"
                                  :min="1" :max="60"></a-input-number>
                  {{ text.Minutes.cycle[1] }}
                  <a-input-number :disabled="minute.cronEvery != 4" size="small" v-model:value="minute.rangeEnd"
                                  :min="0" :max="59"></a-input-number>
                  {{ text.Minutes.cycle[2] }}
                </a-radio>
              </a-row>
            </a-radio-group>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="text.Hours.name">
          <div class="tabBody">
            <a-radio-group name="3" v-model:value="hour.cronEvery">
              <a-row>
                <a-radio value="1">{{ text.Hours.every }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="2">{{ text.Hours.interval[0] }}
                  <a-input-number :disabled="hour.cronEvery != 2" size="small" v-model:value="hour.incrementIncrement"
                                  :min="0" :max="23"></a-input-number>
                  {{ text.Hours.interval[1] }}
                  <a-input-number :disabled="hour.cronEvery != 2" size="small" v-model:value="hour.incrementStart"
                                  :min="0" :max="23"></a-input-number>
                  {{ text.Hours.interval[2] }}
                </a-radio>
              </a-row>
              <a-row>
                <a-radio class="long" value="3">{{ text.Hours.specific }}</a-radio>
                <a-select :disabled="hour.cronEvery != 3" :style="{width: '200px'}" size="small" mode="multiple"
                          v-model:value="hour.specificSpecific">
                  <a-select-option v-for="val in 24" :key="val" :value="val-1">{{ val - 1 }}</a-select-option>
                </a-select>
              </a-row>
              <a-row>
                <a-radio value="4">{{ text.Hours.cycle[0] }}
                  <a-input-number :disabled="hour.cronEvery != 4" size="small" v-model:value="hour.rangeStart" :min="0"
                                  :max="23"></a-input-number>
                  {{ text.Hours.cycle[1] }}
                  <a-input-number :disabled="hour.cronEvery != 4" size="small" v-model:value="hour.rangeEnd" :min="0"
                                  :max="23"></a-input-number>
                  {{ text.Hours.cycle[2] }}
                </a-radio>
              </a-row>
            </a-radio-group>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" :tab="text.Day.name">
          <div class="tabBody">
            <a-radio-group name="4" v-model:value="day.cronEvery">
              <a-row>
                <a-radio value="1">{{ text.Day.every }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="2">{{ text.Day.intervalWeek[0] }}
                  <a-input-number :disabled="day.cronEvery != 2" size="small" v-model:value="week.incrementIncrement"
                                  :min="1" :max="7"></a-input-number>
                  {{ text.Day.intervalWeek[1] }}
                </a-radio>
                <a-select :disabled="day.cronEvery != 2" :style="{width: '50px'}" size="small"
                          v-model:value="week.incrementStart">
                  <a-select-option v-for="val in 7" :key="val" :label="text.Week[val-1]" :value="val"></a-select-option>
                </a-select>
                {{ text.Day.intervalWeek[2] }}
              </a-row>
              <a-row>
                <a-radio value="3">{{ text.Day.intervalDay[0] }}
                  <a-input-number :disabled="day.cronEvery != 3" size="small" v-model:value="day.incrementIncrement"
                                  :min="1" :max="31"></a-input-number>
                  {{ text.Day.intervalDay[1] }}
                  <a-input-number :disabled="day.cronEvery != 3" size="small" v-model:value="day.incrementStart"
                                  :min="1" :max="31"></a-input-number>
                  {{ text.Day.intervalDay[2] }}
                </a-radio>
              </a-row>
              <a-row>
                <a-radio class="long" value="4">{{ text.Day.specificWeek }}</a-radio>
                <a-select :disabled="day.cronEvery != 4" :style="{width: '200px'}" size="small" mode="multiple"
                          v-model:value="week.specificSpecific">
                  <a-select-option v-for="val in 7"
                                   :key="val"
                                   :label="text.Week[val-1]"
                                   :value="['SUN','MON','TUE','WED','THU','FRI','SAT'][val-1]"
                  ></a-select-option>
                </a-select>
              </a-row>
              <a-row>
                <a-radio class="long" value="5">{{ text.Day.specificDay }}</a-radio>
                <a-select :disabled="day.cronEvery != 5" :style="{width: '200px'}" size="small" mode="multiple"
                          v-model:value="day.specificSpecific">
                  <a-select-option v-for="val in 31" :key="val" :value="val">{{ val }}</a-select-option>
                </a-select>
              </a-row>
              <a-row>
                <a-radio value="6">{{ text.Day.lastDay }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="7">{{ text.Day.lastWeekday }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="8">{{ text.Day.lastWeek[0] }}</a-radio>
                <a-select :disabled="day.cronEvery != 8" :style="{width: '200px'}" size="small"
                          v-model:value="day.cronLastSpecificDomDay">
                  <a-select-option v-for="val in 7" :value="val">{{ val }}</a-select-option>
                </a-select>
                {{ text.Day.lastWeek[1] || '' }}
              </a-row>
              <a-row>
                <a-radio value="9">
                  <a-input-number :disabled="day.cronEvery != 9" size="small" v-model:value="day.cronDaysBeforeEomMinus"
                                  :min="1" :max="31"></a-input-number>
                  {{ text.Day.beforeEndMonth[0] }}
                </a-radio>
              </a-row>
              <a-row>
                <a-radio value="10">{{ text.Day.nearestWeekday[0] }}
                  <a-input-number :disabled="day.cronEvery != 10" size="small"
                                  v-model:value="day.cronDaysNearestWeekday" :min="1" :max="31"></a-input-number>
                  {{ text.Day.nearestWeekday[1] }}
                </a-radio>
              </a-row>
              <a-row>
                <a-radio value="11">{{ text.Day.someWeekday[0] }}
                  <a-input-number :disabled="day.cronEvery != 11" size="small" v-model:value="week.cronNthDayNth"
                                  :min="1" :max="5"></a-input-number>
                </a-radio>
                {{ text.Day.someWeekday[1] }}
                <a-select :disabled="day.cronEvery != 11" :style="{width: '200px'}" size="small"
                          v-model:value="week.cronNthDayDay">
                  <a-select-option v-for="val in 7" :key="val" :value="val">{{ text.Week[val-1] }}</a-select-option>
                </a-select>
              </a-row>
            </a-radio-group>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5" :tab="text.Month.name">
          <div class="tabBody">
            <a-radio-group name="5" v-model:value="month.cronEvery">
              <a-row>
                <a-radio value="1">{{ text.Month.every }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="2">{{ text.Month.interval[0] }}
                  <a-input-number :disabled="month.cronEvery != 2" size="small" v-model:value="month.incrementIncrement"
                                  :min="0" :max="12"></a-input-number>
                  {{ text.Month.interval[1] }}
                  <a-input-number :disabled="month.cronEvery != 2" size="small" v-model:value="month.incrementStart"
                                  :min="0" :max="12"></a-input-number>
                </a-radio>
              </a-row>
              <a-row>
                <a-radio class="long" value="3">{{ text.Month.specific }}</a-radio>
                <a-select :style="{width: '200px'}" :disabled="month.cronEvery != 3" size="small" mode="multiple"
                          v-model:value="month.specificSpecific">
                  <a-select-option v-for="val in 12" :key="val" :value="val">{{ val }}</a-select-option>
                </a-select>
              </a-row>
              <a-row>
                <a-radio value="4">{{ text.Month.cycle[0] }}
                  <a-input-number :disabled="month.cronEvery != 4" size="small" v-model:value="month.rangeStart"
                                  :min="1" :max="12"></a-input-number>
                  {{ text.Month.cycle[1] }}
                  <a-input-number :disabled="month.cronEvery != 4" size="small" v-model:value="month.rangeEnd" :min="1"
                                  :max="12"></a-input-number>
                </a-radio>
              </a-row>
            </a-radio-group>
          </div>
        </a-tab-pane>
        <a-tab-pane key="6" :tab="text.Year.name">
          <div class="tabBody">
            <a-radio-group name="6" v-model:value="year.cronEvery">
              <a-row>
                <a-radio value="1">{{ text.Year.every }}</a-radio>
              </a-row>
              <a-row>
                <a-radio value="2">{{ text.Year.interval[0] }}
                  <a-input-number :disabled="year.cronEvery != 2" size="small" v-model:value="year.incrementIncrement"
                                  :min="1" :max="99"></a-input-number>
                  {{ text.Year.interval[1] }}
                  <a-input-number :disabled="year.cronEvery != 2" size="small" v-model:value="year.incrementStart"
                                  :min="2018" :max="2118"></a-input-number>
                </a-radio>
              </a-row>
              <a-row>
                <a-radio class="long" value="3">{{ text.Year.specific }}</a-radio>
                <a-select :disabled="year.cronEvery != 3" :style="{width: '200px'}" size="small" mode="multiple" v-model:value="year.specificSpecific">
                  <a-select-option v-for="val in 100" :key="val" :value="2017+val">{{ 2017+val }}</a-select-option>
                </a-select>
              </a-row>
              <a-row>
                <a-radio value="4">{{ text.Year.cycle[0] }}
                  <a-input-number :disabled="year.cronEvery != 4" size="small" v-model:value="year.rangeStart"
                                  :min="2018" :max="2118"></a-input-number>
                  {{ text.Year.cycle[1] }}
                  <a-input-number :disabled="year.cronEvery != 4" size="small" v-model:value="year.rangeEnd" :min="2018"
                                  :max="2118"></a-input-number>
                </a-radio>
              </a-row>
            </a-radio-group>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    
    <a-card size="small" title="时间表达式">
      <table width="100%">
        <thead>
        <th width="40">秒</th>
        <th width="40">分钟</th>
        <th width="40">小时</th>
        <th width="40">日</th>
        <th width="40">月</th>
        <th width="40">周</th>
        <th width="40">年</th>
        <th>Corn 表达式</th>
        </thead>
        <tbody>
        <td>{{ this.secondsText || '*' }}</td>
        <td>{{ this.minutesText || '*' }}</td>
        <td>{{ this.hoursText || '*' }}</td>
        <td>{{ this.daysText || '*' }}</td>
        <td>{{ this.monthsText || '*' }}</td>
        <td>{{ this.weeksText || '*' }}</td>
        <td>{{ this.yearsText || '*' }}</td>
        <td>{{ this.cron }}</td>
        </tbody>
      </table>
    </a-card>
    
    <div class="bottom" v-if="showBtn">
      <a-button type="primary" @click="change">{{ text.Save }}</a-button>
      <a-button type="primary" @click="close">{{ text.Close }}</a-button>
    </div>
  
  </div>
</template>
<script>
export default {
  name: 'vueCron',
  props: {
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      second: {
        cronEvery: '1',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
      },
      minute: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
      },
      hour: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
      },
      day: {
        cronEvery: '',
        incrementStart: '1',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
        cronLastSpecificDomDay: 1,
        cronDaysBeforeEomMinus: '',
        cronDaysNearestWeekday: '',
      },
      week: {
        cronEvery: '',
        incrementStart: '1',
        incrementIncrement: '1',
        specificSpecific: [],
        cronNthDayDay: 1,
        cronNthDayNth: '1',
      },
      month: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
      },
      year: {
        cronEvery: '',
        incrementStart: '2017',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
      },
      output: {
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        Week: '',
        year: '',
      }
    }
  },
  watch: {
    data() {
      this.rest(this.$data);
    }
  },
  computed: {
    text() {
      return {
        Seconds: {
          name: "秒",
          every: "每一秒钟",
          interval: ["每隔", "秒执行 从", "秒开始"],
          specific: "具体秒数(可多选)",
          cycle: ["周期从", "到", "秒"]
        },
        Minutes: {
          name: "分",
          every: "每一分钟",
          interval: ["每隔", "分执行 从", "分开始"],
          specific: "具体分钟数(可多选)",
          cycle: ["周期从", "到", "分"]
        },
        Hours: {
          name: "时",
          every: "每一小时",
          interval: ["每隔", "小时执行 从", "小时开始"],
          specific: "具体小时数(可多选)",
          cycle: ["周期从", "到", "小时"]
        },
        Day: {
          name: "天",
          every: "每一天",
          intervalWeek: ["每隔", "周执行 从", "开始"],
          intervalDay: ["每隔", "天执行 从", "天开始"],
          specificWeek: "具体星期几(可多选)",
          specificDay: "具体天数(可多选)",
          lastDay: "在这个月的最后一天",
          lastWeekday: "在这个月的最后一个工作日",
          lastWeek: ["在这个月的最后一个"],
          beforeEndMonth: ["在本月底前", "天"],
          nearestWeekday: ["最近的工作日（周一至周五）至本月", "日"],
          someWeekday: ["在这个月的第", "个"]
        },
        Week: ["天", "一", "二", "三", "四", "五", "六"].map(function (e) {
          return "星期" + e
        }),
        Month: {
          name: "月",
          every: "每一月",
          interval: ["每隔", "月执行 从", "月开始"],
          specific: "具体月数(可多选)",
          cycle: ["从", "到", "月之间的每个月"]
        },
        Year: {
          name: "年",
          every: "每一年",
          interval: ["每隔", "年执行 从", "年开始"],
          specific: "具体年份(可多选)",
          cycle: ["从", "到", "年之间的每一年"]
        },
        Save: "保存",
        Close: "关闭"
      }
    },
    secondsText() {
      let seconds = '';
      let cronEvery = this.second.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          seconds = '*';
          break;
        case '2':
          seconds = this.second.incrementStart + '/' + this.second.incrementIncrement;
          break;
        case '3':
          this.second.specificSpecific.map(val => {
            seconds += val + ','
          });
          seconds = seconds.slice(0, -1);
          break;
        case '4':
          seconds = this.second.rangeStart + '-' + this.second.rangeEnd;
          break;
      }
      return seconds;
    },
    minutesText() {
      let minutes = '';
      let cronEvery = this.minute.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          minutes = '*';
          break;
        case '2':
          minutes = this.minute.incrementStart + '/' + this.minute.incrementIncrement;
          break;
        case '3':
          this.minute.specificSpecific.map(val => {
            minutes += val + ','
          });
          minutes = minutes.slice(0, -1);
          break;
        case '4':
          minutes = this.minute.rangeStart + '-' + this.minute.rangeEnd;
          break;
      }
      return minutes;
    },
    hoursText() {
      let hours = '';
      let cronEvery = this.hour.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          hours = '*';
          break;
        case '2':
          hours = this.hour.incrementStart + '/' + this.hour.incrementIncrement;
          break;
        case '3':
          this.hour.specificSpecific.map(val => {
            hours += val + ','
          });
          hours = hours.slice(0, -1);
          break;
        case '4':
          hours = this.hour.rangeStart + '-' + this.hour.rangeEnd;
          break;
      }
      return hours;
    },
    daysText() {
      let days = '';
      let cronEvery = this.day.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          break;
        case '2':
        case '4':
        case '11':
          days = '?';
          break;
        case '3':
          days = this.day.incrementStart + '/' + this.day.incrementIncrement;
          break;
        case '5':
          this.day.specificSpecific.map(val => {
            days += val + ','
          });
          days = days.slice(0, -1);
          break;
        case '6':
          days = "L";
          break;
        case '7':
          days = "LW";
          break;
        case '8':
          days = this.day.cronLastSpecificDomDay + 'L';
          break;
        case '9':
          days = 'L-' + this.day.cronDaysBeforeEomMinus;
          break;
        case '10':
          days = this.day.cronDaysNearestWeekday + "W";
          break
      }
      return days;
    },
    weeksText() {
      let weeks = '';
      let cronEvery = this.day.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
        case '3':
        case '5':
          weeks = '?';
          break;
        case '2':
          weeks = this.week.incrementStart + '/' + this.week.incrementIncrement;
          break;
        case '4':
          this.week.specificSpecific.map(val => {
            weeks += val + ','
          });
          weeks = weeks.slice(0, -1);
          break;
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
          weeks = "?";
          break;
        case '11':
          weeks = this.week.cronNthDayDay + "#" + this.week.cronNthDayNth;
          break;
      }
      return weeks;
    },
    monthsText() {
      let months = '';
      let cronEvery = this.month.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          months = '*';
          break;
        case '2':
          months = this.month.incrementStart + '/' + this.month.incrementIncrement;
          break;
        case '3':
          console.log(this.month.specificSpecific.length)
          this.month.specificSpecific.map(val => {
            months += val + ','
          });
          months = months.slice(0, -1);
          break;
        case '4':
          months = this.month.rangeStart + '-' + this.month.rangeEnd;
          break;
      }
      return months;
    },
    yearsText() {
      let years = '';
      let cronEvery = this.year.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          years = '*';
          break;
        case '2':
          years = this.year.incrementStart + '/' + this.year.incrementIncrement;
          break;
        case '3':
          this.year.specificSpecific.map(val => {
            years += val + ','
          });
          years = years.slice(0, -1);
          break;
        case '4':
          years = this.year.rangeStart + '-' + this.year.rangeEnd;
          break;
      }
      return years;
    },
    cron() {
      return `${this.secondsText || '*'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'} ${this.yearsText || '*'}`
    },
  },
  methods: {
    getValue() {
      return this.cron;
    },
    change() {
      this.$emit('change', this.cron);
      this.close();
    },
    getCorn: function () {
      return this.cron
    },
    close() {
      this.$emit('close')
    },
    rest(data) {
      for (let i in data) {
        if (data[i] instanceof Object) {
          this.rest(data[i])
        } else {
          switch (typeof data[i]) {
            case 'object':
              data[i] = [];
              break;
            case 'string':
              data[i] = '';
              break;
          }
        }
      }
    }
  },
  mounted() {
  }
}</script>