import { Program, AnchorProvider } from "@project-serum/anchor";
import { KyberswapFactorySolana } from "../programs/kyberswap_factory_solana";
import { KyberswapPoolSolana } from "../programs/kyberswap_pool_solana";
import { KyberswapRouterSolana } from "../programs/kyberswap_router_solana";
/**
 * Contains KyberSwap program structs to create instructions and fetch accounts from the network.
 */
export declare class Context {
    readonly anchorProvider: AnchorProvider;
    readonly factoryProgram: Program<KyberswapFactorySolana>;
    readonly poolProgram: Program<KyberswapPoolSolana>;
    readonly routerProgram: Program<KyberswapRouterSolana>;
    /**
     * Create a Context from anchorProvider and program addresses.
     * @param anchorProvider The anchorProvider
     * @param factoryAddress The address of KyberswapFactory program.
     * @param poolAddress The address of KyberswapPool program.
     * @param routerAddress The address of KyberswapRouter program.
     */
    constructor(anchorProvider: AnchorProvider, factoryAddress: string, poolAddress: string, routerAddress: string);
}
//# sourceMappingURL=context.d.ts.map