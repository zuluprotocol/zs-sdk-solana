---
id: fetching-data
title: Fetching Data
---

While the SDK is fully self-contained, there are two cases where it needs _on-chain data_ to function.
This guide will detail both of these cases, and offer some strategies that you can use to fetch this data.

# Case 1: Tokens

Unsurprisingly, the SDK needs some notion of an SPL token to be able to function. This immediately raises the question of _where data about tokens comes from_.

As an example, let's try to represent DAI in a format the SDK can work with. To do so, we need at least 2 pieces of data: a **token address**, and how many **decimals** the token has. We also may be interested in the **symbol** and/or **name** of the token.

## Identifying Data

The first piece of data and **token address** — must be provided by us. Thinking about it, this makes sense, as there's really no other way to unambiguously identify a token.

So, in the case of USDT, we know that the **token address** is `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB`. Note that it's very important to externally verify token addresses. Don't use addresses from sources you don't trust!

## Required Data

The next piece of data we need is **decimals**.

### Provided by the User

One option here is to simply pass in the correct value, which we may know is `6`. At this point, we're ready to represent USDT as a [Token](../reference/token):

```typescript
import { Token } from 'dmm-solana-sdk'

const tokenMint = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
const decimals = 6

const USDT = new Token(tokenMint, decimals)
```

### Fetched by the SDK

If we don't want to provide or look up the value ourselves, we can ask the SDK to look it up for us with [Fetcher.fetchTokenData](../reference/fetcher#fetchtokendata)

```typescript
import { Fetcher } from 'dmm-solana-sdk'
import { AnchorProvider } from "@project-serum/anchor";

const anchorProvider = AnchorProvider.local();
const WSOL = await Fetcher.fetchTokenData("So11111111111111111111111111111111111111112", anchorProvider, "WSOL", "WSOL");
```
Note that you may want/need to handle this async code differently, for example if top-level await is not an option.
This example using local anchorProvider, if you are on browser environment, you should instaniate new AnchorProvider base on params from web3 wallet.

## Optional Data

Finally, we can talk about **symbol** and **name**. Because these fields aren't used anywhere in the SDK itself, they're optional, and can be provided if you want to use them in your application. However, the SDK will not fetch them for you, so you'll have to provide them:

```typescript
import { Token } from 'dmm-solana-sdk'

const WSOL = new Token( 'So11111111111111111111111111111111111111112', 9, 'WSOL', 'WSOL')
```



# Case 2: Pools

Now that we've explored how to define a token, let's talk about pools.

As an example, let's try to represent the USDT-WSOL pair.

## Identifying Data

Each pair consists of two tokens (see previous section). You could get pool's properties such as reserve, vReserve, ... by using fetchPoolData (see below).
### Fetched by the SDK

If we don't want to look up the value ourselves, we can ask the SDK to look them up for us with Fetcher.fetchPoolData:

```typescript
import { Token, WSOL, Fetcher } from 'dmm-solana-sdk'

const WSOL = new Token('So11111111111111111111111111111111111111112', 9)
const USDT = new Token('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', 6)
// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pool: Pool = await Fetcher.fetchPoolData(WSOL, USDT)
console.log(pool.virtualReserve0, pool.virtualReserve0);
```

Note that these values can change as frequently as every block, and should be kept up-to-date.
