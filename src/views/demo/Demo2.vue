<template>
  <div>
    <div>{{ name }} = {{ count }}</div>
    <div><a-button @click="inc">Increase</a-button><a-button @click="dec">Decrease</a-button></div>
  </div>
</template>

<script setup>
  import { defineComponent, ref } from 'vue';
  const count = ref(1);
  const name = ref('demo2');
  const inc = () => {
    count.value++;
  };
  const dec = () => {
    count.value--;
  };
</script>

<style></style>
