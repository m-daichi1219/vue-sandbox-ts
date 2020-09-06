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
    <h1>メーターサンプル</h1>
    <vue-svg-gauge
      class="gauge-example"
      :start-angle="-90"
      :end-angle="90"
      :value="gaugeValue"
      :separator-thickness="0"
      :min="0"
      :max="3000"
      :gauge-color="[
       { offset: 0, color: '#4682b4'},
       { offset: 2000, color: '#f0e68c'},
       ]"
      :scale-interval="0.1"
    >
      <div class="inner-text inner-text--3">
        <span>{{ gaugeText }}</span>
      </div>
    </vue-svg-gauge>
    <br />
    <button @click="changeGaugeValue(0)">0</button>
    <button @click="changeGaugeValue(500)">500</button>
    <button @click="changeGaugeValue(1000)">1000</button>
    <button @click="changeGaugeValue(1500)">1500</button>
    <button @click="changeGaugeValue(2000)">2000</button>
    <button @click="changeGaugeValue(2500)">2500</button>
    <button @click="changeGaugeValue(3000)">3000</button>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import ScrollableChart from '@/components/Charts/ScrollableChart.vue';
import LineChart from '@/components/Charts/ChartJS/LineChart.vue';
import { VueSvgGauge } from 'vue-svg-gauge';

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
    VueSvgGauge,
  },
})
export default class ChartExample extends Vue {
  private exampleLabels = getDateLabels(24);

  private exampleDatasets = getDataSets(24);

  private gaugeValue = 1000;

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

  private changeGaugeValue(value: number) {
    this.gaugeValue = value;
  }

  get gaugeText() {
    const value = this.gaugeValue;
    let text = '';
    switch (value) {
      case 0:
        text = '😊';
        break;
      case 500:
        text = '😊';
        break;
      case 1000:
        text = '😒';
        break;
      case 1500:
        text = '😢';
        break;
      default:
        text = '🤢';
    }

    return text;
  }
}
</script>

<style scoped>
.scrollable-chart-area {
  height: 300px;
}

.gauge-example {
  width: 300px;
  display: inline-block;
  text-align: center;
}

.inner-text {
  width: 100%;
  height: 100%;
}

.inner-text--3 {
  display: flex;
  justify-content: center;
  margin-top: 85px;
  font-size: 20px;
  color: #de3a21;
  font-weight: bold;
  margin-top: 70px;
}
span { max-width: 100px }

</style>
