<script setup lang="ts">
  import { ref } from 'vue'

  const APIData = ref<string>("Loading...")
  const zip = ref<string>("")
  type Address = {
    pref: string,
    city: string,
    town: string
  }
  const address = ref<Address | null>(null)

  fetch("https://zipcloud.ibsnet.co.jp/api/search?zipcode=1000001")
  .then((response) => {
    if (!response.ok) {
      throw new Error("通信エラー：" + response.status);
    }
    return response.json();
  })
  .then((data) => {
    APIData.value = JSON.stringify(
      data,
      null,
      2
    );
  })
  .catch((error) => {
    APIData.value = "エラー：" + error.message;
  });

  const searchAddress = () => {
    // バリデーション: 7桁の数字かどうか
    if (!/^\d{7}$/.test(zip.value)) {
      alert("郵便番号は7桁の数字で入力してください");
      return;
    }

    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip.value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("通信エラー: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        if( data.status != 200 || !data.results ) {
          alert("該当する住所が見つかりませんでした");
          return;
        }
        const result = data.results[0];
        address.value = {
          pref: result.address1,
          city: result.address2,
          town: result.address3
        }
      })
      .catch(error => {
        alert("エラーが発生しました: " + error.message);
      });
  }

</script>
<template>
  <h2>郵便番号から住所取得</h2>
  <p>
    郵便番号
    <strong>1000001</strong>（東京都千代田区）から住所情報を取得します。
  </p>
  <pre>{{ APIData }}</pre>

  <h2>住所をhtmlに自動入力</h2>
  <form id="addressForm" action="#" method="post">
    <label>郵便番号：
      <input type="text" id="zipcode" name="zipcode" maxlength="7" v-model="zip" />
      <button type="button" @click="searchAddress">住所取得</button>
    </label><br><br>

    <label>都道府県：
      <input type="text" id="pref" name="pref" :value="address?.pref" readonly />
    </label><br><br>

    <label>市区町村：
      <input type="text" id="city" name="city" :value="address?.city" readonly />
    </label><br><br>

    <label>町域：
      <input type="text" id="town" name="town" :value="address?.town" readonly />
    </label><br><br>

    <button type="submit">送信</button>
  </form>
</template>
