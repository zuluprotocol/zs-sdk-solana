---
id: route
title: Route
---

```typescript
constructor(pairs: Pool[], input: Currency, output?: Currency)
```

The Route entity represents one or more ordered pools with a fully specified path from input token to output token.

# Example

```typescript
import { AnchorProvider } from "@project-serum/anchor";
import { Context, SOL, WSOL, Token, Fetcher, Route } from "dmm-solana-sdk";

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
    
    // A route to swap BTC Token for native SOL
    const route =
        new Route([BTC_ETH_pool, ETH_WSOL_pool], BTC, SOL)
}
```

# Properties

## pairs

```typescript
pairs: Pool[]
```

The ordered pairs that the route is comprised of.

## path

```typescript
path: Token[]
```

The full path from input token to output token.

## input

```typescript
input: Currency
```

The input currency.

## output

```typescript
output: Currency
```

The output currency.

## midPrice

```typescript
midPrice: Price
```

Returns the current mid price along the route.

# Methods

## tradeDirections

```typescript
tradeDirections(): TradeDirection[]
```

Get the direction of each pool in the route
## accountMetas

```typescript
accountMetas(): AccountMeta[]
```

Get AccountMetas of pools in the route

