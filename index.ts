import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import giveawayWinnerWalletAddressAndAmount from "./giveawayWinnerWalletAddressAndAmountList.json";
import fs from "fs";
(async () => {
  const devSetting = {
    scretKeyPath: "/home/penpen/key/test/tESTDYTzik9jE8T8MHQ5xq1M4BeKvQd4jciCKpffZZD.json",
    tokenAddress: "HRNt3p14j5rzvY2yR4M9KQQaHkLQgu1sR3LDZggWyNb4",
    rpcHostUrl: "https://devnet.genesysgo.net/",
  };
  const productionSetting = {
    scretKeyPath: "/home/penpen/key/honnbann-azito/AZAdov297QYQuqxbC7ivJYw2jniKgqt125ugmBQ7jQqo.json",
    tokenAddress: "HRNt3p14j5rzvY2yR4M9KQQaHkLQgu1sR3LDZggWyNb4",
    rpcHostUrl: "https://ssc-dao.genesysgo.net/",
  };

  const { rpcHostUrl, scretKeyPath, tokenAddress } = devSetting; //ここで本番とテストを切り替える
  try {
    // クラスタに接続する
    const connection = new Connection(rpcHostUrl);

    // 送信元ウォレットを取得
    const secretKey = fs.readFileSync(scretKeyPath, "utf-8");
    const fromWallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey)));

    // 送信するSPLトークンのアドレスを取得
    const mint = new PublicKey(tokenAddress);

    // 送信元ウォレットのトークンアカウントを取得し、存在しない場合は作成する
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      fromWallet.publicKey
    );
    for (const { address: toAddress, amount } of giveawayWinnerWalletAddressAndAmount) {
      // 送信先アドレスを取得
      const toWalletPublicAddress = new PublicKey(toAddress);

      // 送信先ウォレットのトークンアカウントを取得し、存在しない場合は作成する
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        toWalletPublicAddress
      );

      // 指定したトークンを、送信元→送信先に、指定した数量だけ送る
      const signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        amount,
        []
      );
      console.log("transfer tx:", signature);
      console.log("toAddress:", toAddress);
      console.log("amout:", amount);
      console.log("--------------------------------");
    }
  } catch (error) {
    console.log("😭", "エラーが発生しました");
    console.log(error);
  }
})();
