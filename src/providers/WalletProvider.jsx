import React from 'react';
import { observeNotifier } from '@agoric/notifier';
import { E } from '@agoric/eventual-send';
import { makeReactAgoricWalletConnection } from '@agoric/web-components/react';
import WalletContext from '../contexts/WalletContext';

const AgoricWalletConnection = makeReactAgoricWalletConnection(React);
class WalletProvider extends React.Component {
  state = {
    dappName: this.props.dappName,
    autoConnect: this.props.autoConnect,
    showWalletConnection: false,
    walletState: '',
    approved: true,
    connected: false,
    walletConnection: undefined,
    board: undefined,
    walletBridge: undefined,
    zoe: undefined,
    offers: [],
    purses: [],
  };

  componentDidMount = async () => {
    // Connect to a wallet if autoConnect true
    if (this.props.autoConnect) {
      this.addWalletConnection();
    }
  };

  addWalletConnection = () => {
    this.setState({ showWalletConnection: true });
  };

  resetWalletConnection = () => {
    E(this.state.walletConnection).reset();
  };

  setupWalletConnection = async (walletConnection) => {
    // This is one of the only methods that the wallet connection facet allows.
    // It connects asynchronously, but you can use promise pipelining immediately.
    const walletBridge = E(walletConnection).getScopedBridge(
      this.state.dappName,
    );

    // You should reconstruct all state here.
    const zoe = await E(walletBridge).getZoe();
    const board = await E(walletBridge).getBoard();
    this.setState({ zoe, board, walletBridge, walletConnection });

    observeNotifier(E(walletBridge).getPursesNotifier(), {
      updateState: async (purses) => {
        this.setState({ purses });
      },
    });
    // https://agoric.com/documentation/guides/js-programming/notifiers.html#subscription-example
    observeNotifier(E(walletBridge).getOffersNotifier(), {
      updateState: (offers) => {
        this.setState({ offers });
      },
      // TODO test out these methods and find out how to use them
      finish: completion => console.log('finished', completion),
      fail: reason => console.log('failed', reason),
    });
  };

  onWalletState = async (ev) => {
    const { walletConnection, state } = ev.detail;
    this.setState({ walletState: state });
    switch (state) {
      case 'idle': {
        console.log('Connection with wallet established, initializing dApp!');
        // ensure we have up to date agoric interface
        this.setupWalletConnection(walletConnection);
        break;
      }
      case 'approving': {
        this.setState({ approved: false });
        break;
      }
      case 'bridged': {
        this.setState({ approved: true, connected: true });
        break;
      }
      case 'error': {
        console.log('Wallet connection reported error', ev.detail);
        // In case of an error, reset to 'idle'.
        // Backoff or other retry strategies would go here instead of immediate reset.
        E(walletConnection).reset();
        break;
      }
      default:
    }
  };

  render() {
    return (
      <WalletContext.Provider
        value={{
          // state vars
          dappName: this.state.dappName,
          autoConnect: this.state.autoConnect,
          approved: this.state.approved,
          connected: this.state.connected,
          walletState: this.state.walletState,
          walletConnection: this.state.walletConnection,
          board: this.state.board,
          walletBridge: this.state.walletBridge,
          zoe: this.state.zoe,
          offers: this.state.offers,
          purses: this.state.purses,
          // functions
          connectWallet: this.addWalletConnection,
          resetWalletConnection: this.resetWalletConnection,
        }}
      >
        <div>{this.props.children}</div>
        {this.state.showWalletConnection ? (
          <AgoricWalletConnection
            onState={this.onWalletState}
            style={{ display: 'none' }}
          />
        ) : null}
      </WalletContext.Provider>
    );
  }
}

// set default props for Wallet Provider
WalletProvider.defaultProps = {
  dappName: '',
  autoConnect: true,
};

export { WalletProvider };
