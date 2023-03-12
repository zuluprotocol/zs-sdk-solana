---
id: quick-start
title: SDK Quick start
---

The Kyberswap Solana SDK exists to help developers build on top of Kyberswap. It's designed to run in any environment that can execute JavaScript (think websites, node scripts, etc.). While simple enough to use in a hackathon project, it's also robust enough to power production applications.

# Installation

The easiest way to consume the SDK is to cloning the [repository](https://github.com/zuluprotocol/dmm-solana-sdk). To install it in your project, simply run `yarn add https://github.com/zuluprotocol/dmm-solana-sdk` (or `npm install https://github.com/zuluprotocol/dmm-solana-sdk`).

# Usage

To run code from the SDK in your application, use an `import` or `require` statement, depending on which your environment supports. Note that the guides following this page will use ES6 syntax.

## ES6 (import)

```typescript
import { BN } from 'dmm-solana-sdk'
console.log(`The new BN is ${new BN(112233)}.`)
```

## CommonJS (require)

```typescript
const { BN } = require('dmm-solana-sdk')
console.log(`The new BN is ${new BN(112233)}.`)

```

# Reference

Comprehensive reference material for the SDK is publicly available on the [Kyberswap Github](https://github.com/zuluprotocol).