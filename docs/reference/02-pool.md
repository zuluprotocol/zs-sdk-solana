---
id: pool
title: pool
---

```typescript
constructor(
    context: Context,
    address: PublicKey,
    tokenAmountA: TokenAmount,
    tokenAmountB: TokenAmount,
    virtualTokenAmountA: TokenAmount,
    virtualTokenAmountB: TokenAmount,
    fee: BN,
    amp: BN,
)
```

The Pool entity represents a Kyberswap pool with a balance of each of its pair tokens.

# Example

```typescript

import { AnchorProvider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Context, Pool, Token, TokenAmount, parseBigintIsh } from "dmm-solana-sdk";

const KYBERSWAP_FACTORY_PROGRAM = 'KyberSwapFactory111111111111111111111111111';
const KYBERSWAP_POOL_PROGRAM = 'KyberSwapPooL111111111111111111111111111111';
const KYBERSWAP_ROUTER_PROGRAM = 'KyberSwapRouter1111111111111111111111111111';

const BTC = new Token('BTCfmTMzFeV4BNvCiyTVVR1XaQPMvsrrdyjJeuE4VdEm', 9);
const ETH = new Token('ETHTjGKn8ze4Cbk3tWK6MKAV5v3xswpCvbXo1mQapzn8', 9);

const poolStateAddress = new PublicKey('');

async function main(){
    const anchorProvider = AnchorProvider.env();
    const context = new Context(
        anchorProvider,
        KYBERSWAP_FACTORY_PROGRAM,
        KYBERSWAP_POOL_PROGRAM,
        KYBERSWAP_ROUTER_PROGRAM
    )
    
    let poolState = await context.poolProgram.account.pool.fetch(poolStateAddress);
    const reserve0 = poolState.balance.reserve0;
    const reserve1 = poolState.balance.reserve1;
    const vReserve0 = poolState.virtualBalance.vReserve0;
    const vReserve1 = poolState.virtualBalance.vReserve1;
    const feeInPrecision = poolState.feeInPrecision;
    const ampBps = poolState.curve.curveParameters;
    const balances = BTC.sortsBefore(ETH)
        ? [reserve0, reserve1, vReserve0, vReserve1]
        : [reserve1, reserve0, vReserve1, vReserve0]

    const pool = new Pool(
        context,
        poolStateAddress,
        new TokenAmount(BTC, balances[0]),
        new TokenAmount(ETH, balances[1]),
        new TokenAmount(BTC, balances[2]),
        new TokenAmount(ETH, balances[3]),
        parseBigintIsh(feeInPrecision),
        ampBps,
    )
}
```

# Properties

## authority

```typescript
authority: PublicKey
```

The address that acts as a signer which can only be signed by the KyberSwap Pool program 

## liquidityToken

```typescript
liquidityToken: Token
```

A Token representing the liquidity token for the pair.

## token0Account

```typescript
token0Account: PublicKey
```

The TokenAccount address of token0

## token1Account

```typescript
token1Account: PublicKey
```

The TokenAccount address of token1

## tokenAmounts

```typescript
tokenAmounts: [TokenAmount, TokenAmount]
```
The reserves of token0 and token1

## virtualTokenAmounts

```typescript
virtualTokenAmounts: [TokenAmount, TokenAmount]
```

The virtual reserves of token0 and token1

## fee

```typescript
fee: BN
```

The trading fee of the pool in precision (10<sup>9</sup>)

## amp
```typescript
amp: BN
```

The amplification factor of the pool in basis points (10<sup>4</sup>)

# Methods

## involvesToken

```typescript
involvesToken(token: Token): boolean
```

Returns true if the token is either token0 or token1

## priceOf

```typescript
priceOf(token: Token): Price
```

Return the price of the given token in terms of the other token in the pair.

## reserveOf

```typescript
reserveOf(token: Token): TokenAmount
```

Returns reserve0 or reserve1, depending on whether token0 or token1 is passed in.

## virtualReserveOf

```typescript
virtualReserveOf(token: Token): TokenAmount
```

Returns virtualReserve0 or virtualReserve1, depending on whether token0 or token1 is passed in.


## getOutputAmount

```typescript
getOutputAmount(inputAmount: TokenAmount): [TokenAmount, TokenAmount[]]
```

Pricing function for exact input amounts. Returns maximum output amount based on current reserves and the new virtual reserves if the trade were executed.

## getInputAmount

```typescript
getInputAmount(outputAmount: TokenAmount): [TokenAmount, TokenAmount[]]
```

Pricing function for exact output amounts. Returns minimum input amount based on current reserves and the new virtual reserves if the trade were executed.

## getLiquidityMinted

```typescript
getLiquidityMinted(totalSupply: TokenAmount, tokenAmountA: TokenAmount, tokenAmountB: TokenAmount): TokenAmount
```

Calculates the exact amount of liquidity tokens minted from a given amount of token0 and token1.

- totalSupply must be looked up on-chain.
- The value returned from this function _cannot_ be used as an input to getLiquidityValue.

## getLiquidityValue

```typescript
getLiquidityValue(
  token: Token,
  totalSupply: TokenAmount,
  liquidity: TokenAmount,
  feeOn: boolean = false,
  kLast?: BigintIsh
): TokenAmount
```

Calculates the exact amount of token0 or token1 that the given amount of liquidity tokens represent.

- totalSupply must be looked up on-chain.
- If the protocol charge is on, feeOn must be set to true, and kLast must be provided from an on-chain lookup.
- Values returned from this function _cannot_ be used as inputs to getLiquidityMinted.