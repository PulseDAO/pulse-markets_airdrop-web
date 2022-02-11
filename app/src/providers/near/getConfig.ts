const CONTRACT_NAME = process.env.CONTRACT_NAME || "testnet";

const TESTNET_DAO_CONTRACT_NAME = "realstate.sputnikv2.testnet";
const MAINNET_DAO_CONTRACT_NAME = "nearholdings.sputnik-dao.near";

const TESTNET_ESCROWFACTORY_CONTRACT_NAME = "escrowfactory.nearholdings.testnet";
const MAINNET_ESCROWFACTORY_CONTRACT_NAME = "escrowfactory.communitycapital.near";

const TESTNET_DAOFACTORY_CONTRACT_NAME = "daofactory.nearholdings.testnet";
const MAINNET_DAOFACTORY_CONTRACT_NAME = "daofactory.communitycapital.near";

export default (env: string | undefined) => {
  switch (env) {
    case "mainnet":
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: MAINNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: MAINNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: MAINNET_DAOFACTORY_CONTRACT_NAME,
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.near.org",
      };
    case "test":
    case "testnet":
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    case "betanet":
      return {
        networkId: "betanet",
        nodeUrl: "https://rpc.betanet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        walletUrl: "https://wallet.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
      };
    case "local":
      return {
        networkId: "local",
        nodeUrl: "http://localhost:3030",
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: "http://localhost:4000/wallet",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
      };
    case "ci":
      return {
        networkId: "shared-test",
        nodeUrl: "https://rpc.ci-testnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        masterAccount: "test.near",
      };
    case "ci-betanet":
      return {
        networkId: "shared-test-staging",
        nodeUrl: "https://rpc.ci-betanet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        masterAccount: "test.near",
      };
    default:
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
  }
};
