---
id: fractions
title: Fractions
---

# Fraction

```typescript
constructor(numerator: BigintIsh, denominator: BigintIsh = ONE)
```

The base class which all subsequent fraction classes extend. **Not meant to be used directly.**

## Properties

### numerator

```typescript
numerator: BN
```

### denominator

```typescript
denominator: BN
```

### quotient

```typescript
quotient: BN
```

Performs floor division.

## Methods

### invert

```typescript
invert(): Fraction
```

### add

```typescript
add(other: Fraction | BigintIsh): Fraction
```

### subtract

```typescript
subtract(other: Fraction | BigintIsh): Fraction
```

### multiply

```typescript
multiply(other: Fraction | BigintIsh): Fraction
```

### divide

```typescript
divide(other: Fraction | BigintIsh): Fraction
```

### toSignificant

```typescript
toSignificant(
  significantDigits: number,
  format: object = { groupSeparator: '' },
  rounding: Rounding = Rounding.ROUND_HALF_UP
): string
```

Formats a fraction to the specified number of significant digits.

- For format options, see [toFormat](https://github.com/MikeMcl/toFormat).

### toFixed

```typescript
toFixed(
  decimalPlaces: number,
  format: object = { groupSeparator: '' },
  rounding: Rounding = Rounding.ROUND_HALF_UP
): string
```

Formats a fraction to the specified number of decimal places.

- For format options, see [toFormat](https://github.com/MikeMcl/toFormat).

# Percent

Responsible for formatting percentages (10% instead of 0.1).

## Example

```typescript
import { Percent } from 'dmm-solana-sdk'

const percent = new Percent('60', '100')
console.log(percent.toSignificant(2)) // 60
```

### toSignificant

See [toSignificant](#tosignificant).

### toFixed

See [toFixed](#tofixed).


# CurrencyAmount

```typescript
constructor(currency: Currency, amount: BigintIsh)
```

Responsible for formatting currency amounts with specific decimal places. 

Extends [Fraction](#Fraction)

## Example

```typescript
import { CurrencyAmount } from "dmm-solana-sdk";

const currencyAmount = CurrencyAmount.sol('3000000000')
console.log(currencyAmount.toExact())
```

## Properties

### token

```typescript
currency: Currency
```

### raw

```typescript
raw: BN
```

Returns the full token amount, unadjusted for decimals.

## Static methods

### sol

```typescript
sol(amount: BigintIsh): CurrencyAmount
```

Helper that calls the constructor with the SOL currency

## Methods

### add

```typescript
add(other: CurrencyAmount): CurrencyAmount
```

### subtract

```typescript
subtract(other: CurrencyAmount): CurrencyAmount
```

### toSignificant

See [toSignificant](#tosignificant).

### toFixed

See [toFixed](#tofixed).

### toExact

```typescript
toExact(format: object = { groupSeparator: '' }): string
```


# TokenAmount

```typescript
constructor(token: Token, amount: BigintIsh) 
```

Responsible for formatting token amounts with specific decimal places. 

Extends [CurrencyAmount](#CurrencyAmount)

## Example

```typescript
import { TokenAmount, WSOL } from "dmm-solana-sdk";

const tokenAmount = new TokenAmount(WSOL, '3000000000')
console.log(tokenAmount.toExact())
```

## Properties

### token

```typescript
token: Token
```

### raw

```typescript
raw: BN
```

Returns the full token amount, unadjusted for decimals.

## Methods

### add

```typescript
add(other: TokenAmount): TokenAmount
```

### subtract

```typescript
subtract(other: TokenAmount): TokenAmount
```

### toSignificant

See [toSignificant](#tosignificant).

### toFixed

See [toFixed](#tofixed).

### toExact

```typescript
toExact(format: object = { groupSeparator: '' }): string
```

# Price

```typescript
constructor(baseCurrency: Currency, quoteCurrency: Currency, denominator: BigintIsh, numerator: BigintIsh)
```

Responsible for denominating the relative price between two currencies. Denominator and numerator must be unadjusted for decimals.

## Example

```typescript
import { Price, Token, WSOL } from "dmm-solana-sdk";

const ETH = new Token('ETHTjGKn8ze4Cbk3tWK6MKAV5v3xswpCvbXo1mQapzn8', 9);
const price = new Price(ETH, WSOL, '1000000000', '123000000000')
console.log(price.toSignificant(3)) // 123
```

This example shows the ETH/XYZ price, where ETH is the base token, and XYZ is the quote token. The price is constructed from an amount of XYZ (the numerator) / an amount of WETH (the denominator).

## Static Methods

### fromRoute

```typescript
fromRoute(route: Route): Price
```

### fromReserves

```typescript
fromReserves(inputReserves: TokenAmount[], outputReserves: TokenAmount[])
```

## Properties

### baseToken

```typescript
baseCurrency: Currency
```

### quoteToken

```typescript
quoteCurrency: Currency
```

### scalar

```typescript
scalar: Fraction
```

Used to adjust the price for the decimals of the base and quote tokens.

### raw

```typescript
raw: Fraction
```

Returns the raw price, unadjusted for decimals.

### adjusted

```typescript
adjusted: Fraction
```

Returns the price, adjusted for decimals.

## Methods

### invert

```typescript
invert(): Price
```

### multiply

```typescript
multiply(other: Price): Price
```

### quote

```typescript
quote(currencyAmount: CurrencyAmount): CurrencyAmount
```

Given an asset amount, returns an equivalent value of the other asset, according to the current price.

### toSignificant

See [toSignificant](#tosignificant).

### toFixed

See [toFixed](#tofixed).