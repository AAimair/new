const commandChartOptions = (data) => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        name: "命令",
        type: "pie",
        roseType: "radius",
        radius: [15, 95],
        center: ["50%", "38%"],
        data: data,
        animationEasing: "cubicInOut",
        animationDuration: 1000,
      },
    ]
  }
}

const cacheChartOptions = (data) => {
  return {
    tooltip: {
      formatter: "{b} <br/>{a} : " + data + 'M',
    },
    series: [
      {
        name: "峰值",
        type: "gauge",
        min: 0,
        max: 1000,
        detail: {
          formatter: data + 'M',
          color: 'auto'
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 40,
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.2, '#91c7ae'],
              [0.8, '#63869e'],
              [1, '#c23531']
            ]
          }
        },
        data: [
          {
            value: data,
            title: {
              offsetCenter: [0, '-30%']
            },
            name: "内存消耗",
          },
        ],
      },
    ]
  }
}

export {
  commandChartOptions,
  cacheChartOptions
}