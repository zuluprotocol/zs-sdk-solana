---
id: fetcher
title: Fetcher
---

The data fetching logic is split from the rest of the code for better tree-shaking,
i.e. so that it does not get packaged into your code unless it is used.
The SDK is otherwise unconcerned with how you get data from the blockchain.

This class contains static methods for constructing instances of pairs and tokens
from on-chain data. It cannot be constructed.

# Static Methods

## fetchTokenData

```typescript
async fetchTokenData(
    address: PublicKey,
    anchorProvider: AnchorProvider,
    symbol?: string,
    name?: string,
): Promise<Token>
```

Initializes a class instance from token mint address. Decimals are fetched via the input anchorProvider.

## fetchPoolAddresses

```typescript
async fetchPoolAddresses(
    tokenA: PublicKey,
    tokenB: PublicKey,
    context: Context,
): Promise<PublicKey[]>
```

Fetches addresses of all KyberSwap pools for two tokens. Pools' reserves are fetched via the anchorProvider supplied within context.

## fetchPoolData

```typescript
async fetchPoolData(
    tokenA: Token,
    tokenB: Token,
    context: Context
): Promise<Pool[]>
```

Fetches data and constructs all KyberSwap pools for two tokens. Pools' reserves are fetched via the anchorProvider supplied within context.