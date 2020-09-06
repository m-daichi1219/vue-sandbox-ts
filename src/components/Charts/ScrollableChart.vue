<template>
  <div class="chart-area">
    <div ref="chartContainer" class="scrollable-chart">
      <div :style="{ width: `${chartWidth}px` }">
        <slot name="chart"/>
      </div>
    </div>
    <slot name="sticky-chart" />
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component({})
export default class ScrollableChart extends Vue {
  private chartWidth = 2000;

  private scrolleRight() {
    const scrollable = this.$refs.chartContainer as HTMLElement;
    if (!scrollable) return;
    scrollable.scrollLeft = this.chartWidth;
  }

  mounted() {
    this.scrolleRight();
  }
}
</script>

<style scoped>
.chart-area {
  background: white;
  border: solid 1px black;
  position: relative;
  overflow: hidden;
}

.scrollable-chart {
  overflow-x: scroll;
}

.sticky-chart {
  position: absolute;
  top: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
