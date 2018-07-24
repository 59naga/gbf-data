gbf-data
---
<p align="right">
  <a href="https://www.npmjs.com/package/@59naga/gbf-data">
    <img alt="Npm version" src="https://badge.fury.io/js/%4059naga%2Fgbf-data.svg">
  </a>
  <a href="https://travis-ci.org/59naga/gbf-data">
    <img alt="Build Status" src="https://travis-ci.org/59naga/gbf-data.svg?branch=master">
  </a>
</p>

`src/chars` -> [`dist/chars.json`](https://unpkg.com/@59naga/gbf-data/dist/chars.json)
---

[gbf-teamsimulator](https://github.com/59naga/gbf-teamsimulator#readme)で使用します。

`src/raid` -> [`dist/raid.json`](https://unpkg.com/@59naga/gbf-data/dist/raid.json)
---

[gbf-raid-server][0]でtwitter検索に使用するボス名の一覧をjsonで出力し`dist`に保存しています。

用法
---
[axios](https://github.com/axios/axios)を使用して[rawgit.comから直接使用するか](https://rawgit.com/59naga/gbf-raid-bosses/master/dist/gbf-raid-bosses.json)、jsonファイルをダウンロードして`require/import`してください。

```js
import createIoClient from 'socket.io-client';
import bosses from './gbf-raid-bosses.json'

createIoClient('https://gbf-raid-server.herokuapp.com/')
  .emit('gbf-raid-server:cache', (error, tweets) => {
    console.log(tweets);
    // [{id: '451A60CE', name: 'Lv100 ティアマト・マグナ＝エア', createdAt: '2018-07-06 10:26:56'}, {...}]
  })
  .on('gbf-raid-server:tweet', (tweet) => {
    console.log(tweet);
    // {"id":"685D3F6E","name":"Lvl 100 Tiamat Omega Ayr","memo":"","urlOrigin":"twitter.com/0chokdee0/status/1016741472874291200", /*...*/ ,"createdAt":"2018-07-11 02:50:31"}

    const boss = bosses.find(boss => tweet.name === boss.name || tweet.name === boss.name_en)
    console.log(boss)
    // {"alias":"lv100-tiamat-omega-ayr","category":"impossible1","id":"","name":"Lv100 ティアマト・マグナ＝エア","name_en":"Lvl 100 Tiamat Omega Ayr","image":"https://pbs.twimg.com/media/CT6cNUBUAAETdz6.jpg","element":"Wind"}
  });
```

jsonは一次元配列でボスごとにオブジェクトで下記の情報を持ちます。

* `alias: string`…`id`が定義できていないため、現状`id`の代わりに識別子として使用する文字列です
* `category: string`…[共闘部屋を基準に見た][1]共闘の種別。
* `id: string`…実際のゲーム画像などで使用されている10桁の数値。ティアマトマグナHL…`2040020000`など。**現在管理できていません。**
* `name: string`…twitterの救援ツイートで使用されるボスの正式名称（日本語版）。
* `name_en: string`…twitterの救援ツイートで使用されるボスの正式名称（英語版）。
* `image: string`…twitterで添付される画像。日本語のものを使用
* `element: "None" | "Fire" | "Water" | "Earth" | "Wind" | "Light" | "Dark"`…ボスの属性。[GBF-Raidersから転載][2]しています


ライセンス
---
MIT

[0]: https://github.com/59naga/gbf-raid-server#readme
[1]: https://user-images.githubusercontent.com/1548478/42528328-18d4a584-84b6-11e8-9ff8-eb50adda5066.png
[2]: https://github.com/ypinskiy/GBF-Raiders/blob/master/raids.json
