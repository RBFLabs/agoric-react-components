/// <reference types="../types/agoric"/>
import {E} from '@agoric/eventual-send';
import React from 'react';
import WalletContext from '../contexts/WalletContext';
import {AgoricState, AgoricWalletState} from '../model';

// Import does not work. Missing d.ts file
import {observeNotifier} from '@agoric/notifier';
import {makeReactAgoricWalletConnection} from '@agoric/web-components/react';

const AgoricWalletConnection = makeReactAgoricWalletConnection(React);

interface Props {
  dappName: string;
  autoConnect: boolean;
  children: JSX.Element;
  onWalletState?: (event: any) => void; // function that performs something on wallet state change
  onPursesChange?: (purses: any) => void; // function that performs something when purses change
  onOffersChange?: (offers: any) => void; // function that performs something when offers change
  onConnectionFail?: (reason: any) => void; // function that performs something when wallet connection fails
  onConnectionFinish?: (completion: any) => void; // function that performs something when wallet is connected
}

class AgoricWalletProvider extends React.Component<Props, AgoricState> {
  state = {
    dappName: this.props.dappName,
    autoConnect: this.props.autoConnect,
    showWalletConnection: false,
    walletState: null,
    approved: true,
    connected: false,
    walletConnection: undefined,
    board: undefined,
    walletBridge: undefined,
    walletConnected: false,
    zoe: undefined,
    offers: [],
    purses: [],
    error: false,
    connectWallet: () => {},
    resetWalletConnection: () => {},
  };

  componentDidMount = async () => {
    // Connect to a wallet if autoConnect true
    if (this.props.autoConnect) {
      this.addWalletConnection();
    }
  };

  addWalletConnection = () => {
    this.setState({showWalletConnection: true});
  };

  resetWalletConnection = () => {
    const {walletConnection} = this.state;
    if (walletConnection) (E(walletConnection) as any).reset();
  };

  setupWalletConnection = async (walletConnection: any) => {
    // This is one of the only methods that the wallet connection facet allows.
    // It connects asynchronously, but you can use promise pipelining immediately.
    const walletBridge = E(walletConnection).getScopedBridge(this.state.dappName);

    // You should reconstruct all state here.
    const zoe = await E(walletBridge).getZoe();
    const board = await E(walletBridge).getBoard();
    this.setState({zoe, board, walletBridge, walletConnection});

    observeNotifier(E(walletBridge).getPursesNotifier(), {
      updateState: async (purses: Array<any>) => {
        this.setState({purses});
        if (this.props.onPursesChange) this.props.onPursesChange(purses);
      },
    });
    // https://agoric.com/documentation/guides/js-programming/notifiers.html#subscription-example
    observeNotifier(E(walletBridge).getOffersNotifier(), {
      updateState: (offers: Array<any>) => {
        this.setState({offers});
        if (this.props.onOffersChange) this.props.onOffersChange(offers);
      },
      // TODO test out these methods and find out how to use them
      finish: (completion: any) => {
        console.log('finished', completion);
        if (this.props.onConnectionFinish) this.props.onConnectionFinish(completion);
      },
      fail: (reason: any) => {
        console.log('failed', reason);
        if (this.props.onConnectionFail) this.props.onConnectionFail(reason);
      },
    });
  };

  onWalletState = async (ev: any) => {
    const {walletConnection, state} = ev.detail;
    this.setState({walletState: state});
    switch (state) {
      case AgoricWalletState.Idle: {
        console.log('Connection with wallet established, initializing dApp!');
        // ensure we have up to date agoric interface
        this.setupWalletConnection(walletConnection);
        break;
      }
      case AgoricWalletState.Approving: {
        this.setState({approved: false});
        break;
      }
      case AgoricWalletState.Bridged: {
        this.setState({approved: true, connected: true});
        break;
      }
      case AgoricWalletState.Error: {
        console.log('Wallet connection reported error', ev.detail);
        // In case of an error, reset to 'idle'.
        // Backoff or other retry strategies would go here instead of immediate reset.
        E(walletConnection).reset();
        break;
      }
      default:
    }
  };

  getIsWalletConnected = () => {
    return this.state.walletState === 'bridged';
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
          walletConnected: this.getIsWalletConnected(),
          // functions
          connectWallet: this.addWalletConnection,
          resetWalletConnection: this.resetWalletConnection,
        }}
      >
        <div>{this.props.children}</div>
        {this.state.showWalletConnection ? (
          <AgoricWalletConnection onState={this.onWalletState} style={{display: 'none'}} />
        ) : null}
      </WalletContext.Provider>
    );
  }

  // set default props for Wallet Provider
  static defaultProps = {
    dappName: '',
    autoConnect: true,
    onWalletState: undefined,
    onPursesChange: undefined,
    onOffersChange: undefined,
    onConnectionFail: undefined,
    onConnectionFinish: undefined,
  };
}

export {AgoricWalletProvider};
