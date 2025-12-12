// Initialize chart
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);

var option = {
  title: [
    {
      text: 'Dashboard statistics',
      left: 'left',
      top: 10,
      textStyle: {
        fontSize: 18,
        fontFamily: 'IBM Plex Sans, Arial, sans-serif',
        fontWeight: 600,
        color: '#333'
      }
    },
    {
      text: 'Month-wise count of reports generated for the year - 2025',
      left: 'left',
      top: 40,
      textStyle: {
        fontSize: 13,
        fontFamily: 'IBM Plex Sans, Arial, sans-serif',
        fontWeight: 400,
        color: '#777',
        width: 500,
        align: 'center',
        lineHeight: 18
      }
    }
  ],
  tooltip: { trigger: 'axis' },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: 100,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'],
    axisLabel: { fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 2.5,
    interval: 0.5,
    axisLabel: {
      fontSize: 12,
      formatter: value => value.toFixed(1)
    }
  },
  series: [
    {
      name: 'reports',
      type: 'bar',
      data: [0.5,1.0,0.8,0.4,0.3,0.6,0.7,1.2,1.4,1.8,2.1,2.4],
      itemStyle: {
        color: '#5c249a',
        borderRadius: [6, 6, 0, 0]
      },
      barWidth: '50%',
      emphasis: { focus: 'series' },
      animationDuration: 800
    }
  ]
};

myChart.setOption(option);

window.addEventListener('resize', () => myChart.resize());


myChart.on('finished', () => {

  if (myChart.__resizeObserver) return;

  const resizeObserver = new ResizeObserver(() => {
    myChart.resize();
  });
  resizeObserver.observe(chartDom);

  myChart.__resizeObserver = resizeObserver;
});
