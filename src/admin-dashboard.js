import ApexCharts from 'apexcharts';


const seriesData = {
  monthDataSeries1: {
    prices: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
    dates: [
      '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04',
      '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08',
      '2023-01-09', '2023-01-10', '2023-01-11'
    ]
  }
};

const areaOptions = {
  series: [{
    name: "STOCK ABC",
    data: seriesData.monthDataSeries1.prices
  }],
  chart: {
    type: 'area',
    height: 350,
    zoom: { enabled: false }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'straight' },
  title: { text: 'Fundamental Analysis of Stocks', align: 'left' },
  subtitle: { text: 'Price Movements', align: 'left' },
  labels: seriesData.monthDataSeries1.dates,
  xaxis: { type: 'datetime' },
  yaxis: { opposite: true },
  legend: { horizontalAlign: 'left' }
};

const chart1 = new ApexCharts(document.querySelector("#chart"), areaOptions);
chart1.render();

// Chart 2: Pie chart
const pieOptions = {
  series: [44, 55, 13, 43, 22],
  chart: {
    width: 380,
    type: 'pie'
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { width: 200 },
      legend: { position: 'bottom' }
    }
  }]
};

const chart2 = new ApexCharts(document.querySelector("#chart2"), pieOptions);
chart2.render();


