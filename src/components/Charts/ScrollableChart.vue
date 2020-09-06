<template>
  <div class="chart-area">
    <div class="scrollable-chart">
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

@Component({
  data() {
    return {
      chartWidth: 2000,
    };
  },
})
export default class ScrollableChart extends Vue {
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
