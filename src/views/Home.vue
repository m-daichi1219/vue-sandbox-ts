<template>
  <div id="home" class="home">
    <chart-example />
    <vue-speedometer
     :maxValue="3000"
     :customSegmentStops="[0, 500, 1000, 1500, 2000, 2500, 3000]"
     :segmentColors='["#a3be8c","#ebcb8b","#d08770","#bf616a","#bf616a","#bf616a"]'
     :value="700"/>
  </div>
</template>

<script>
import ChartExample from '@/components/ChartExample.vue';
import VueSpeedometer from 'vue-speedometer';

export default {
  name: 'Home',
  components: {
    ChartExample,
    VueSpeedometer,
  },
};
</script>
