<script lang="ts">
import { Line, mixins } from 'vue-chartjs';
import {
  Component, Prop, Vue, Mixins,
} from 'vue-property-decorator';
import Chart from 'chart.js';

@Component({})
export default class LineChart extends Mixins(Vue, Line, mixins.reactiveProp) {
  @Prop()
  public chartdata!: Chart.ChartData;

  @Prop()
  public options!: Chart.ChartOptions;

  // @Prop()
  // public plugins!: Chart.PluginServiceRegistrationOptions[];

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
}
</script>
