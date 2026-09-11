<script setup lang="ts">
import { ref } from 'vue';
type User = {
  id: number,
  name: string
}

// const user1: Ref<User> = ref({
//   id: 1,
//   name: '堂安'
// })

const user2 = ref<User>({
  id: 1,
  name: '堂安'
})

const APIDataName = ref<string>("Loading...")
const APIData2 = ref<string>("Loading...")
fetch("https://jsonplaceholder.typicode.com/users/1")
// アロー関数の省略記法（response => response.json()）
.then(response => response.json())
.then(data => {
  console.log(data)
  APIDataName.value = "名前: " + data.name;
});

fetch("https://jsonplaceholder.typicode.com/invalid-url")
.then(response => {
  if (!response.ok) {
    throw new Error("通信エラー: " + response.status);
  }
  return response.json();
})
.then(data => {
  APIData2.value = "名前: " + data.name;
})
.catch(error => {
  APIData2.value = "エラー: " + error.message;
});

</script>
<template>
<!-- {{ user1 }} -->
<p>id: {{ user2.id }}</p>
<p>name: {{ user2.name }}</p>

<h2>APIdata:name</h2>
<p>{{ APIDataName }}</p>

<h2>APIdata2</h2>
<p>{{ APIData2 }}</p>
</template>
