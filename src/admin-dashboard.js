var pieOptions = {
  series: [120, 150, 20, 45, 32],
  chart: {
  width: 380,
  type: 'pie',
},
labels: ["Italy", "USA", "France", "Spain", "Brazil"],
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      width: 200
    },
    legend: {
      position: 'bottom'
    }
  }
}]
};

var pieChart = new ApexCharts(document.querySelector("#pie-chart"), pieOptions);
pieChart.render();

var barChartOptions = {
  series: [{
  name: "sales",
  data: [{
    x: '2019/01/01',
    y: 400
  }, {
    x: '2019/04/01',
    y: 430
  }, {
    x: '2019/07/01',
    y: 448
  }, {
    x: '2019/10/01',
    y: 470
  }, {
    x: '2020/01/01',
    y: 540
  }, {
    x: '2020/04/01',
    y: 580
  }, {
    x: '2020/07/01',
    y: 690
  }, {
    x: '2020/10/01',
    y: 690
  }]
}],
  chart: {
  type: 'bar',
  height: 380
},
xaxis: {
  type: 'category',
  labels: {
    formatter: function(val) {
      return "Q" + dayjs(val).quarter()
    }
  },
  group: {
    style: {
      fontSize: '10px',
      fontWeight: 700
    },
    groups: [
      { title: '2019', cols: 4 },
      { title: '2020', cols: 4 }
    ]
  }
},
title: {
    text: 'Grouped Labels on the X-axis',
},

};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();







