"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const anchor_1 = require("@project-serum/anchor");
const kyberswap_factory_solana_1 = require("../programs/kyberswap_factory_solana");
const kyberswap_pool_solana_1 = require("../programs/kyberswap_pool_solana");
const kyberswap_router_solana_1 = require("../programs/kyberswap_router_solana");
/**
 * Contains KyberSwap program structs to create instructions and fetch accounts from the network.
 */
class Context {
    /**
     * Create a Context from anchorProvider and program addresses.
     * @param anchorProvider The anchorProvider
     * @param factoryAddress The address of KyberswapFactory program.
     * @param poolAddress The address of KyberswapPool program.
     * @param routerAddress The address of KyberswapRouter program.
     */
    constructor(anchorProvider, factoryAddress, poolAddress, routerAddress) {
        this.anchorProvider = anchorProvider;
        this.factoryProgram = new anchor_1.Program(kyberswap_factory_solana_1.IDL, factoryAddress, anchorProvider);
        this.poolProgram = new anchor_1.Program(kyberswap_pool_solana_1.IDL, poolAddress, anchorProvider);
        this.routerProgram = new anchor_1.Program(kyberswap_router_solana_1.IDL, routerAddress, anchorProvider);
    }
}
exports.Context = Context;
