<template>
  <div>
    <h1>Chartサンプル</h1>
    <scrollable-chart>
      <template v-slot:chart>
        <line-chart
         :chartdata="dispData"
         :options="options"
         class="scrollable-chart-area"
        />
      </template>
      <template v-slot:sticky-chart>
        <line-chart
         :chartdata="legendData"
         :options="lagendOptions"
         class="sticky-chart"
         :plugins="yAxesBgPlugin"
        />
      </template>
    </scrollable-chart>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import ScrollableChart from '@/components/Charts/ScrollableChart.vue';
import LineChart from '@/components/Charts/ChartJS/LineChart.vue';

const getRandomInt = (max: number): number => (
  Math.floor(Math.random() * Math.floor(max))
);

const getDateLabels = (size: number): Array<string> => {
  const now = new Date();
  const labels = [];
  for (let i = 0; i <= size; i += 1) {
    labels.push(new Date(new Date().setHours(now.getHours() - i)).toLocaleString());
  }
  return labels.reverse();
};

const getDataSets = (size: number): Array<number> => {
  const base = 800;
  const datasets = [];
  for (let i = 0; i <= size; i += 1) {
    datasets.push(base + (100 * getRandomInt(20)));
  }
  return datasets;
};

@Component({
  components: {
    ScrollableChart,
    LineChart,
  },
})
export default class ChartExample extends Vue {
  private exampleLabels = getDateLabels(24);

  private exampleDatasets = getDataSets(24);

  private yAxesBgPlugin: Chart.PluginServiceRegistrationOptions[] = [
    {
      beforeDraw(chartInstance) {
        const ctx = chartInstance.ctx as CanvasRenderingContext2D;

        // プロットエリアマスク用
        ctx.fillStyle = '#fff';
        ctx.fillRect(
          0,
          0,
          chartInstance.chartArea.left,
          chartInstance.chartArea.bottom + 1,
        );

        // 横軸マスク用
        const gradient = ctx.createLinearGradient(
          0,
          0,
          chartInstance.chartArea.left,
          0,
        );
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(1, 'rgba(255,255,255,1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(
          0,
          chartInstance.chartArea.bottom + 1,
          chartInstance.chartArea.left,
          (chartInstance.height as number) - chartInstance.chartArea.bottom - 1,
        );
      },
    },
  ];

  private dispData: Chart.ChartData = {
    labels: this.exampleLabels,
    datasets: [
      {
        data: this.exampleDatasets,
      },
    ],
  };

  private options: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            drawTicks: true,
          },
          ticks: {
            fontSize: 16,
            maxRotation: 0,
            maxTicksLimit: 24,
          },
          type: 'time',
          time: {
            displayFormats: {
              minute: 'h:mm',
            },
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawOnChartArea: false,
            color: ['', '', '', '#ff7f50', '#ffa500', '', ''],
          },
          ticks: {
            min: 0,
            max: 3000,
            stepSize: 500,
            callback: (value, index, values) => {
              if (value === 1000 || value === 1500) {
                return value;
              }
              return '';
            },
            fontColor: 'transparent', // #808080
          },
        },
      ],
    },
  };

  private legendData: Chart.ChartData = {
    labels: [''],
    datasets: [
      {
        backgroundColor: 'transparent',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
      },
    ],
  };

  private lagendOptions: Chart.ChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: { enabled: false },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 16,
            maxRotation: 0,
            maxTicksLimit: 24,
            padding: 18,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: ['', '', '', '#ff7f50', '#ffa500', '', ''],
            lineWidth: 2,
          },
          ticks: {
            min: 0,
            max: 3000,
            stepSize: 500,
            callback: (value, index, values) => {
              if (value === 1000 || value === 1500) {
                return value;
              }
              return '';
            },
            fontColor: '#808080', // #808080
          },
        },
      ],
    },
    animation: { duration: 0 },
  };
}
</script>

<style scoped>
.scrollable-chart-area {
  height: 300px;
}
</style>
