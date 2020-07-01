<template>
  <InputList
   :edittext.sync="deliveryEditText"
   :targettext.sync="deliveryTargettext"
  />
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import InputList from '@/components/InputList.vue';

@Component({
  components: {
    InputList,
  },
})
export default class Delivery extends Vue {
  @Prop() private edittext!: string;

  @Prop() private targettext!: string;

  get deliveryEditText() {
    return this.edittext;
  }

  set deliveryEditText(val: string) {
    this.$emit('update:edittext', val);
  }

  get deliveryTargettext() {
    return this.targettext;
  }

  set deliveryTargettext(val: string) {
    this.$emit('update:targettext', val);
  }
}
</script>
