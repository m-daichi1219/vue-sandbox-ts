<template>
  <div>
    <label for="editer">編集</label>
    <input id="editer" v-model="dispEditText" />
    <label for="target">対象</label>
    <input id="target" v-model="dispTargettext"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InputList extends Vue {
  @Prop() private edittext!: string;

  @Prop() private targettext!: string;

  get dispEditText() {
    return this.edittext;
  }

  set dispEditText(val: string) {
    this.$emit('update:edittext', val);
  }

  get dispTargettext() {
    return this.targettext;
  }

  set dispTargettext(val: string) {
    this.$emit('update:targettext', val);
  }
}
</script>
