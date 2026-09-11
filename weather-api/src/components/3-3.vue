<script setup lang="ts">
import { ref } from 'vue';

console.log("templateの中身は？",document)
//document.title = "変更後のタイトル"
console.log("document.titleの中身は？", document.title)

const text = ref('おはよう');
const html = ref('<span style="color:red">こんにちは</span>');
const inputBox = ref('はじめまして');

const user = "佐藤";

const toEnglish = () => {
    console.log(document.getElementById('text'));
    text.value = `Good Mourning、Mr.${user}`;
    html.value = '<span style="color:blue">Good Afternoon</span>';
    inputBox.value = 'Hello';
}

</script>

<template>

  <h2>textContent</h2>
  <p>{{ text }}</p>

  <h2>innerHTML</h2>
  <p v-html="html"></p>

  <h2>value（input要素）</h2>
  <input type="text" id="inputBox" :value=inputBox>

  <br><br>
  <button @click="toEnglish()">
    すべて書き換える
  </button>
</template>
