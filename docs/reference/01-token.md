---
id: token
title: Token
---

```typescript
constructor(mint: PublicKey | string, decimals: number, symbol?: string, name?: string)
```

The Token entity represents a SPL token (the ERC-20 equivalent on Solana) at a specific address.

# Example

```typescript
import { PublicKey } from "@solana/web3.js";
import { Token } from "dmm-solana-sdk";

const BTC = 'BTCfmTMzFeV4BNvCiyTVVR1XaQPMvsrrdyjJeuE4VdEm';

const token = new Token(new PublicKey(BTC), 9, 'BTC', 'Bitcoin');
const tokenFromAddress = new Token(BTC, 9, 'BTC', 'Bitcoin');

```

# Properties

## mint

```typescript
mint: PublicKey | string
```

## decimals

```typescript
decimals: number
```

## symbol

```typescript
symbol?: string
```

## name

```typescript
name?: string
```

# Methods

## equals

```typescript
equals(other: Token): boolean
```

Checks if the current instance is equal to another (has an identical address).

## sortsBefore

```typescript
sortsBefore(other: Token): boolean
```

Checks if the current instance sorts before another, by address.