---
id: trade
title: Trade
---

```typescript
constructor(route: Route, amount: CurrencyAmount, tradeType: TradeType)
```

The Trade entity represents a fully specified trade along a route. This entity supplies all the information necessary to craft a router transaction.

# Example

```typescript
import { AnchorProvider } from "@project-serum/anchor";
import { Context, BN, SOL, WSOL, Token, Fetcher, Route, Trade, CurrencyAmount } from "dmm-solana-sdk";

const KYBERSWAP_FACTORY_PROGRAM = 'KyberSwapFactory111111111111111111111111111';
const KYBERSWAP_POOL_PROGRAM = 'KyberSwapPooL111111111111111111111111111111';
const KYBERSWAP_ROUTER_PROGRAM = 'KyberSwapRouter1111111111111111111111111111';

const BTC = new Token('BTCfmTMzFeV4BNvCiyTVVR1XaQPMvsrrdyjJeuE4VdEm', 9);
const ETH = new Token('ETHTjGKn8ze4Cbk3tWK6MKAV5v3xswpCvbXo1mQapzn8', 9);

async function main() {
    const anchorProvider = AnchorProvider.env();
    const context = new Context(
        anchorProvider,
        KYBERSWAP_FACTORY_PROGRAM,
        KYBERSWAP_POOL_PROGRAM,
        KYBERSWAP_ROUTER_PROGRAM
    )
    
    // Fetch pools data and choose two pools to swap
    const BTC_ETH_pools = (await Fetcher.fetchPoolData(BTC, ETH, context))
    const BTC_ETH_pool = BTC_ETH_pools[0];

    const ETH_WSOL_pools = (await Fetcher.fetchPoolData(ETH, WSOL, context))
    const ETH_WSOL_pool = ETH_WSOL_pools[0];
    
    const SOLAmount = new BN(10).pow(new BN(6));

    const trade = Trade.exactOut(
        new Route([BTC_ETH_pool, ETH_WSOL_pool], BTC, SOL),
        CurrencyAmount.sol(SOLAmount)
    );
}
```

# Static methods

## exactIn

```typescript
exactIn(route: Route, amountIn: CurrencyAmount): Trade
```

Constructs an exact in trade with the given amount in and route

## exactOut

```typescript
exactOut(route: Route, amountOut: CurrencyAmount): Trade
```

Constructs an exact out trade with the given amount out and route

## bestTradeExactIn

```typescript
Trade.bestTradeExactIn(
    pairs: Pair[],
    amountIn: CurrencyAmount,
    tokenOut: Currency,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {}): Trade[]
```

Given a list of pairs, a fixed amount in, and token amount out,
this method returns the best `maxNumResults` trades that swap
an input token amount to an output token, making at most `maxHops` hops.
The returned trades are sorted by output amount, in decreasing order, and
all share the given input amount.

## bestTradeExactOut

```typescript
Trade.bestTradeExactOut(
    pairs: Pool[],
    tokenIn: Currency,
    amountOut: CurrencyAmount,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {}): Trade[]
```


Similar to the above method, but targets a fixed output token amount.
The returned trades are sorted by input amount, in increasing order,
and all share the given output amount.

# Properties

## route

```typescript
route: Route
```

The [path](route#path) property of the route should be passed as the path parameter to router functions.

## tradeType

```typescript
tradeType: TradeType
```

`TradeType.EXACT_INPUT` corresponds to `swapExact*For*` router functions. `TradeType.EXACT_OUTPUT` corresponds to `swap*ForExact*` router functions.

## inputAmount

```typescript
inputAmount: CurrencyAmount
```

For exact input trades, this value should be passed as amountIn to router functions. For exact output trades, this value should be multiplied by a factor >1, representing slippage tolerance, and passed as amountInMax to router functions.

## outputAmount

```typescript
outputAmount: CurrencyAmount
```

For exact output trades, this value should be passed as amountOut to router functions. For exact input trades, this value should be multiplied by a factor <1, representing slippage tolerance, and passed as amountOutMin to router functions.

## executionPrice

```typescript
executionPrice: Price
```

The average price that the trade would execute at.

## nextMidPrice

```typescript
nextMidPrice: Price
```

What the new mid price would be if the trade were to execute.

## priceImpact

```typescript
priceImpact: Percent
```

The priceImpact incurred by the trade.

# Methods

In the context of the following two methods, slippage refers to the percent difference between the actual price and the trade `executionPrice`.

## minimumAmountOut

```typescript
minimumAmountOut(slippageTolerance: Percent): CurrencyAmount
```

Returns the minimum amount of the output token that should be received from a trade, given the slippage tolerance.

Useful when constructing a transaction for a trade of type `EXACT_INPUT`.

## maximumAmountIn

```typescript
maximumAmountIn(slippageTolerance: Percent): CurrencyAmount
```

Returns the maximum amount of the input token that should be spent on the trade, given the slippage tolerance.

Useful when constructing a transaction for a trade of type `EXACT_OUTPUT`.
