<script setup lang="ts">
import { ref } from 'vue';

  const selectArea = ref<string>("")
  const APIData = ref<string>("")
  const day = ref<string[]>(["本日", "明日"])
  const fashionAdvice = ref<string>("")

  const searchWeather = () => {
    APIData.value = "通信中..."
    fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${selectArea.value}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error("通信エラー: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        console.log(data[0])
        console.log(data[1])
        console.log(data[0].timeSeries)
        console.log(data[1].timeSeries)
        APIData.value = ""
        for (let i : number = 0; i < 2; i++) {
          // const weathers = data[i].timeSeries[0].areas[0].weathers[i];
          // const tempsMin = data[i].timeSeries[1].areas[0].tempsMin[i];
          // const tempsMax = data[i].timeSeries[1].areas[0].tempsMax[i];
          const weathers = data[0].timeSeries[0].areas[0].weathers[i];
          const tempsMin = data[1].timeSeries[1].areas[0].tempsMin[i];
          const tempsMax = data[1].timeSeries[1].areas[0].tempsMax[i];

          APIData.value += `
            <strong>${day.value[i]}の天気：</strong> ${weathers}<br>
            <strong>${day.value[i]}の最低気温：</strong> ${tempsMin}℃<br>
            <strong>${day.value[i]}の最高気温：</strong> ${tempsMax}℃<br><br>
          `;

          if (!isNaN(tempsMax) && !isNaN(tempsMin)) {
            if (tempsMax >= 30) {
              fashionAdvice.value =
                "猛暑日になりそうです。通気性の良い半袖＋帽子をおすすめします。";
            } else if (tempsMax >= 25) {
              fashionAdvice.value =
                "暑い一日です。半袖シャツやポロシャツが快適です。";
            } else if (tempsMax >= 20) {
              fashionAdvice.value =
                "昼間は過ごしやすいですが、夜は冷えるかも。長袖シャツ＋羽織を用意しておきましょう。";
            } else if (tempsMax >= 15) {
              fashionAdvice.value =
                "少し肌寒いです。薄手のセーターやカーディガンがおすすめです。";
            } else {
              fashionAdvice.value =
                "寒い一日になりそうです。コートやマフラーなどしっかり防寒を。";
            }

            if (tempsMax - tempsMin >= 10) {
              fashionAdvice.value +=
                " <br>朝晩は冷えるので、帰宅時用に上着を持っていくと安心です。";
            }

            APIData.value += `<p><strong>服装アドバイス：</strong>${fashionAdvice.value}</p>`;
          }
        }
      })
      .catch(error => {
        alert("エラーが発生しました: " + error.message);
      });
  }
</script>
<template>
  <h2>天気予報をhtmlに自動入力</h2>
  <form id="weatherForm" method="get">
    <p>
      <label for="wcode">地域</label>
      <select name="wcode" id="wcode" v-model="selectArea">
        <option value="016000">札幌</option>
        <option value="130000">東京</option>
        <option value="270000">大阪</option>
        <option value="230000">名古屋</option>
        <option value="140000">横浜</option>
        <option value="110000">熊谷</option>
        <option value="040000">仙台</option>
        <option value="340000">広島</option>
        <option value="400000">福岡</option>
      </select>
    </p>
  </form>

  <button id="weather" @click="searchWeather">取得</button>
  <hr />
  <div id="result" v-html="APIData"></div>
</template>
