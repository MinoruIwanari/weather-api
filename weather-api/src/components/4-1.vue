<script setup lang="ts">
import { ref } from 'vue';

  const output = ref("ここにメッセージが出ます")
  const showMessage = () => {
    output.value = "関数が呼び出された！";
  }

  const helloLog = ref("")

  const afterHello = () => {
    helloLog.value = "挨拶が終わりました！"
  }

  const sayHello = (callback: () => void) => {
    helloLog.value = "こんにちは"
    setTimeout(callback, 1000);
  }

</script>
<template>
  <h2>関数を定義して呼び出す</h2>

  <button @click="showMessage()">メッセージを表示</button>
  <p>{{ output }}</p>

  <h2>コールバック関数の仕組み</h2>
  <button @click="sayHello(afterHello)">あいさつする</button>
  <p>{{ helloLog }}</p>

</template>
