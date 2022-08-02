# これは何？
SolanaのSPLトークンを「指定したアドレス」に「指定した量」だけ配布できるTypeScriptのコードです。

# 使い方
1. SPLトークンを用意する
2. giveawayWinnerWalletAddressAndAmountList.json に「アドレス」に「配布したいWL数」を配列で書き込む（すでにサンプルを書いているのでそれを参考にしてください）
3. index.ts の中のdevSettingとproductionSettingを変更する
4. npm startを実行する  

実行結果は以下のようになります。
```
transfer tx: 2JkpxSQVayq2ViDN7NgUVYkM3XVoaVx1AkV3eNBVfngf64g6He5h3vmGWNHQKAuEt6kMgwrRtVXvae3A2zk7zdca
toAddress: GFHrhKkGTn3yhREV6N5w5UfU9oCbkWjjNJL54Hub6Exu
amout: 1
--------------------------------
transfer tx: 26joM3CexLTZPoXs3znUQsE4kz7Dej6279Y8P5m7dxsptma6DHf5MPixjFxAn27cLayvyGbkPmiJ3X3MxYYkhtru
toAddress: 6Az5nq2Fsj3XsBKTvPQPYHiYqpuudBsbBKmqJv4BMNMD
amout: 10
--------------------------------
```