---
id: other-exports
title: Other Exports
---

# BN

```typescript
import { BN } from 'dmm-solana-sdk'
// import BN from 'bn.js'
```

The default export from [bn](https://github.com/indutny/bn.js/).

# BigintIsh

```typescript
import { BigintIsh } from 'dmm-solana-sdk'
// type BigintIsh = BN | bigint | string
```

A union type comprised of all types that can be cast to a BN instance.
# TradeType

```typescript
import { TradeType } from 'dmm-solana-sdk'
// enum TradeType {
//   EXACT_INPUT,
//   EXACT_OUTPUT
// }
```

A enum denominating supported trade types.

# Rounding

```typescript
import { Rounding } from 'dmm-solana-sdk'
// enum Rounding {
//   ROUND_DOWN,
//   ROUND_HALF_UP,
//   ROUND_UP
// }
```

A enum denominating supported rounding options.
# MINIMUM_LIQUIDITY

```typescript
import { MINIMUM_LIQUIDITY } from 'dmm-solana-sdk'
```

Returns `1000` for all pools

# InsufficientReservesError

```typescript
import { InsufficientReservesError } from 'dmm-solana-sdk'
```

# InsufficientInputAmountError

```typescript
import { InsufficientInputAmountError } from 'dmm-solana-sdk'
```

# SOL

```typescript
import { SOL } from 'dmm-solana-sdk'
```

An instance of the base class Currency
# WSOL

```typescript
import { WSOL } from 'dmm-solana-sdk'
```

An object whose values are WSOL [Token](token) instances.