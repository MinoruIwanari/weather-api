<script setup lang="ts">
import { ref } from 'vue';

  const output = ref("ここにメッセージが出ます")
  const showMessage = () => {
    output.value = "関数が呼び出された！";
  }
</script>
<template>
  <h2>関数を定義して呼び出す</h2>

  <button @click="showMessage()">メッセージを表示</button>
  <p>{{ output }}</p>

</template>
