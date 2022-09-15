import Moralis from "moralis";

export default async function handler(req, res) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const address = process.env.ADDRESS;

  const [nativeBalance, tokenBalances] = await Promise.all([
    Moralis.EvmApi.balance.getNativeBalance({ address }),
    Moralis.EvmApi.token.getWalletTokenBalances({ address }),
  ]);
  res.status(200).json({
    nativeBalance: nativeBalance.result.balance.ether,
    tokenBalances: tokenBalances.result.map((token) => token.display()),
  });
}
