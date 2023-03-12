# Creating a AnchorProvider instance

```typescript
import { AnchorProvider } from '@project-serum/anchor'

const anchorProvider = AnchorProvider.env()
```

# Creating a Router instance

```typescript
const router = new Router(
  new Context(
    anchorProvider,
    'KyberSwapFactory111111111111111111111111111',
    'KyberSwapPooL111111111111111111111111111111',
    'KyberSwapRouter1111111111111111111111111111',
  ),
  new PublicKey(process.env.ROUTER_STATE_ADDRESS!),
)
```

# Examples

- Put addresses into `examples/.env` file
  - Required: `ANCHOR_PROVIDER_URL`, `ANCHOR_WALLET`, `KYBERSWAP_POOL_PROGRAM`, `KYBERSWAP_FACTORY_PROGRAM`, `KYBERSWAP_ROUTER_PROGRAM`, `FACTORY_STATE_ADDRESS`, `ROUTER_STATE_ADDRESS`
  - E.g

```
ANCHOR_PROVIDER_URL=https://api.testnet.solana.com
ANCHOR_WALLET=/Users/username/.config/solana/id.json
KYBERSWAP_POOL_PROGRAM=5ep1RDH89G1edSjJCqDzamXBg2yXNEZTxwAReD3FWa8j
KYBERSWAP_FACTORY_PROGRAM=HuRvNfEovfUomar3qNhngZc34EygX9kHNfujhwF1YLjz
KYBERSWAP_ROUTER_PROGRAM=3EN91sb7qdzSMPJZEkSUey1oe4hHEDFar1Kp3jTZWyhg
FACTORY_STATE_ADDRESS=HWoZFnLkKeGHrHwu9sySFts3oTVfDfQ9TnwXEqpSGU5D
ROUTER_STATE_ADDRESS=ASBnocaA9kg8QgyZZ23o7C9scVrxPaWZVLP1PEwhyqBw
COMMITMENT_LEVEL=confirmed
KNC_MINT=KNCVyKuChfKTLDJ3EQEatqF4kBEF2PNECoTRWsx5qXz
ETH_MINT=ETHTjGKn8ze4Cbk3tWK6MKAV5v3xswpCvbXo1mQapzn8
BNB_MINT=BNBbo7KptCeBm9eZFHeUTSLwtxTJTAwsZr6yYri497jg
BTC_MINT=BTCfmTMzFeV4BNvCiyTVVR1XaQPMvsrrdyjJeuE4VdEm
```

- To ensure token accounts have been created, run `spl-token accounts`

- Run `yarn run ts-node examples/{THE_EXAMPLE_TO_RUN_FILENAME}.ts`

## Add Liquidity New Pool

- Call Router's method `addLiquidityNewPool` to construct a ready-to-send transaction

```typescript
const tx = await router.addLiquidityNewPool(
  anchorProvider.wallet.publicKey,
  KNC,
  BNB,
  20000,
  1,
  kncAmount,
  bnbAmount,
  new BN(0),
  new BN(0),
)
```

- Because AddLiquidityNewPool needs more than 400_000 compute units, we should request more compute unit
  - Use method `createRequestUnitsInstruction` to construct a request CU instruction
  - Put request CU instruction to the current transaction's instruction list

```typescript
tx.instructions = [createRequestUnitsInstruction(Router.ADD_LIQUIDITY_NEW_POOL_COMPUTE_BUDGET, 0), ...tx.instructions]
```

## Add Liquidity

- Call Router's method `addLiquidity` to construct a ready-to-send transaction

```typescript
const tx = await router.addLiquidity(
  poolStateAddress,
  anchorProvider.wallet.publicKey,
  KNC,
  kncAmount,
  bnbAmount,
  new BN(0),
  new BN(0),
)
```

## Remove Liquidity

- Call Router's method `removeLiquidity` to construct a ready-to-send transaction

```typescript
const tx = await router.removeLiquidity(
  poolStateAddress,
  anchorProvider.wallet.publicKey,
  KNC,
  liquidityAmount,
  new BN(0),
  new BN(0),
)
```

## Swap

- Call Router's method `swap` to construct a ready-to-send transaction

```typescript
const tx = await router.swap(anchorProvider.wallet.publicKey, trade, {
  allowedSlippage: new Percent('1', '100'),
})
```

## Send transaction

- Use method `sendAndConfirmTransaction` to sign transaction (using Wallet) then send to nodes and wait for confirmation

```typescript
const txHash = await sendAndConfirmTransaction(anchorProvider, tx)
```

- A transaction hash will be returned if the transaction's successful
