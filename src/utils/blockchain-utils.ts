import Web3 from 'web3';
import BlockchainEventListeners from './blockchain-event-listeners';

namespace BlockchainUtils {
  export const loadBlockchain = async (socketUrl: string, chainId: number) => {
    try {
      const web3Socket = new Web3(
        new Web3.providers.WebsocketProvider(socketUrl)
      );

      // await BlockchainEventListeners.sampleEventListener();

    } catch (error) {
      console.log("error", error);
    }
  };

  export const eventHandler = async (
    address: string,
    topic: string,
    web3Socket: Web3,
    from: string,
    to: string
  ) => {
    let options = {
      fromBlock: from,
      toBlock: to,
      address: address, // Only get events from specific addresses
      topics: [topic], // What topics to subscribe to
    };
    const subscription = web3Socket.eth.subscribe("logs", options);

    return subscription;
  };
}

export default BlockchainUtils;