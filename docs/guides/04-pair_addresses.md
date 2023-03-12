---
id: getting-pool-addresses
title: Pool Addresses
---

# getpools
```typescript
await requestAirdrop(anchorProvider.connection, admin.publicKey, LAMPORTS_PER_SOL);
[KNC, USDT] = await setupTokens(anchorProvider.connection, admin, [9, 9]);
await createUserAssociatedTokenAccount(anchorProvider, KNC, anchorProvider.wallet.publicKey);
await createUserAssociatedTokenAccount(anchorProvider, USDT, anchorProvider.wallet.publicKey);

const allPairs: PublicKey[] = await Fetcher.fetchPoolAddresses(KNC, USDT, context);
expect(allPairs.length).equals(3);
```