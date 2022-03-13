import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils/types";

import { Provider } from "context/evm-wallet-selector/EVMWalletSelectorContext.types";

import PaymentSplitter from "./PaymentSplitter.json";

export class AirdropContract {
  public contract: Contract;

  constructor(provider: Provider) {
    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(
      PaymentSplitter.abi as AbiItem[],
      "0x336554f1C7eF516b9c690239844CBcEEb81c0412",
    );
  }

  async shares(payee: string) {
    try {
      const shares = await this.contract.methods.shares(payee).call();

      return shares;
    } catch {
      return "0.00";
    }
  }
}
