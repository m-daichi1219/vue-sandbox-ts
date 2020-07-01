<template>
  <div>
    <h1>SandBox</h1>
    <Delivery
     :edittext.sync="inputObject.edittext"
     :targettext.sync="inputObject.targettext"/>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import Delivery from '@/components/Delivery.vue';

@Component({
  data() {
    return {
      inputObject: {
        edittext: 'edittext',
        targettext: '',
      },
    };
  },
  components: {
    Delivery,
  },
})
export default class SandBox extends Vue {
  @Watch('inputObject.edittext')
  changeEvent(val: any) {
    console.log(val);
    if (val.length > 10) {
      (this as any).inputObject = { edittext: val, targettext: '10 over length' };
    }
  }
}
</script>
