import { protectAdminRoute} from "../helpers/protect.js";
import moment from 'moment';
import ApexCharts from 'apexcharts'




const today=document.querySelector("#today")
document.addEventListener("DOMContentLoaded", function(){

// protectAdminRoute();
  today.textContent=moment(new Date()).format("MMM Do YYYY"); 
})
  const series = {
    monthDataSeries1: {
      prices: [8100, 8150, 8120, 8200, 8300, 8250, 8350],
      dates: [
        "2025-04-25", "2025-04-26", "2025-04-27",
        "2025-04-28", "2025-04-29", "2025-04-30",
        "2025-05-01"
      ]
    }
  };
  const options  = {
    series: [{
    name: "STOCK ABC",
    data: series.monthDataSeries1.prices
  }],
    chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  
  title: {
    text: 'Fundamental Analysis of Stocks',
    align: 'left'
  },
  subtitle: {
    text: 'Price Movements',
    align: 'left'
  },
  labels: series.monthDataSeries1.dates,
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    opposite: true
  },
  legend: {
    horizontalAlign: 'left'
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

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







