import Web3 from "web3";
import BlockchainUtils from "./blockchain-utils";
import { ethers } from "ethers";
import { hexToDec } from "hex2dec";

namespace BlockchainEventListeners {
    export const sampleEventListener = async (
        contractAddress: string,
        topic: string,
        web3socket: Web3,
        fromBlock: number,
        toBlock: string,
        chainId: number
    ) => {
        // console.log("user", contractAddress, topic, fromBlock, toBlock, chainId)
        const subscription = await BlockchainUtils.eventHandler(
            contractAddress,
            topic,
            web3socket,
            fromBlock.toString(),
            toBlock
        );

        subscription.on("data", async (event) => {
            const web3Interface = new ethers.utils.Interface("PLACE_ABI_HERE");
            const data = web3Interface.parseLog(event);
            const transactionHash = event.transactionHash as string;
            const blockNumber = event.blockNumber as number;

            let { user, amount } = data.args;

            amount = hexToDec(amount._hex);
            amount = web3socket.utils.fromWei(amount, "ether");
        });
    };
}

export default BlockchainEventListeners;