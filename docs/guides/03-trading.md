---
id: trading
title: Trading
---

This guide will focus exclusively on sending a transaction to the  Kyberswap Router

# Sending a Transaction to the Router

Let's say we want to trade 1 WSOL for as much USDT as possible:

```typescript
import { Token, WSOL, Fetcher, Trade, Route, TokenAmount, TradeType } from 'dmm-solana-sdk'

const USDT = new Token( 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', 6)

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(USDT, WSOL)

const route = new Route([pair], WSOL)

const amountIn = '1000000000000000000' // 1 WSOL

const trade = new Trade(route, new TokenAmount(WSOL, amountIn), TradeType.EXACT_INPUT)
```
So, we've constructed a trade entity, but how do we use it to actually send a transaction? There are still a few pieces we need to put in place.

Before going on, we should explore how SOL works in the context of trading. Internally, the SDK uses WSOL, as all Kyberswap pools use WSOL under the hood. However, it's perfectly possible for you as an end user to use SOL, and rely on the router to handle converting to/from WSOL. So, let's use SOL.

Router Construction should be instaniate via anchor anchorProvider and env vars. See below snippet code.

```typescript
const anchorProvider = AnchorProvider.env();
    anchorProvider.opts.commitment = (process.env.COMMITMENT_LEVEL || 'confirmed') as Commitment;
    const context = new Context(
        anchorProvider,
        process.env.KYBERSWAP_FACTORY_PROGRAM,
        process.env.KYBERSWAP_POOL_PROGRAM,
        process.env.KYBERSWAP_ROUTER_PROGRAM
    )
    // New Router instance
    const router = new Router(
        context, 
    );
```

The dmm-solana-sdk Router will construct different transactions base on trade parameters. For example, if tokenIn is SOL and tokenOut is other token, the router will useswapExactSOLForTokens to execute swap. Other function could be choosen such as swapExactTokensForTokensOrSOL, swapSOLForExactTokens or swapTokensForExactTokensOrSOL.
```typescript

    const KNCToken = new Token(KNC, 9, "KNC");
    const WSOLToken = new Token(WSOL, 9, "WSOL");
    // Choose a pool to swap
    const all_pairs = (await Fetcher.fetchPairData(KNCToken, WSOLToken, context))
    const pair_knc_wsol = all_pairs[all_pairs.length - 1];
    
    const solAmount = new BN(1).mul(new BN(10).pow(new BN(6)));
    
    const trade = Trade.exactIn(
        new Route([pair_knc_wsol], Currency.SOL, KNCToken), 
        CurrencyAmount.sol(solAmount),
    );
    
    // Call Router's method to construct a transaction
    const tx = await router.swap(
        anchorProvider.wallet.publicKey, 
        trade, 
        {
            allowedSlippage: new Percent('1', '100')
        },
    );
    
    //This method uses Wallet to sign the transaction and send to node
    const txHash = await sendAndConfirmTransaction(anchorProvider, tx);
    console.log('txHash', txHash);
```

The slippage tolerance encodes _how large of a price movement we're willing to tolerate before our trade will fail to execute_. Since Solana transactions are broadcast and confirmed in an adversarial environment, this tolerance is the best we can do to protect ourselves against price movements. We use this slippage tolerance to calculate the _minumum_ amount of USDT we must receive before our trade reverts, thanks to minimumAmountOut. Note that this code calculates this worst-case outcome _assuming that the current price, i.e the route's mid price,_ is fair (usually a good assumption because of arbitrage).

Note: If the output token are held in Associate Token Account (ATA) of your wallet, so you MUST create them before swap.