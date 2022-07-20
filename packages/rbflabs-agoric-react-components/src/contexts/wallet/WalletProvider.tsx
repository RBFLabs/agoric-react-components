import {E} from '@agoric/eventual-send';
import React, {useEffect} from 'react';
import {observeNotifier} from '@agoric/notifier';
import {makeReactAgoricWalletConnection} from '@agoric/web-components/react';
import {useSetState} from '../../hooks';
import {WalletState} from './types';
import {isWalletState} from './utils/typeguards';
import {WalletContext} from './WalletContext';

const AgoricWalletConnection = makeReactAgoricWalletConnection(React);

export interface WalletProviderProps {
  /** DApp identifier */
  dappName: string;
  /** Indicates to use default agoric wallet connection */
  autoConnect?: boolean;
  /** Callback for wallet state changes */
  onWalletState?(ev: any): void;
  /** Callback for purse changes */
  onPursesChange?(purses: any): void;
  /** Callback for offer changes */
  onOffersChange?(offers: any): void;
  /** Callback for connection fail */
  onConnectionFail?(reasons: any): void;
  /** Callback for connection finish */
  onConnectionFinish?(completion: any): void;
  /** Inner component tree */
  children: React.ReactNode;
}

export function WalletProvider({
  dappName,
  autoConnect = false,
  onWalletState,
  onPursesChange,
  onOffersChange,
  onConnectionFail,
  onConnectionFinish,
  children,
}: WalletProviderProps) {
  const [state, setState] = useSetState({
    approved: true,
    zoe: undefined,
    board: undefined,
    purses: [] as any[],
    offers: [] as any[],
    walletBridge: undefined as any,
    walletState: undefined as WalletState | undefined,
    walletConnection: undefined as any,
    showWalletConnection: autoConnect,
  });

  const setupWalletConnection = async (walletConnection: any) => {
    // This is one of the only methods that the wallet connection facet allows.
    // It connects asynchronously, but you can use promise pipelining immediately.
    const walletBridge = E(walletConnection).getScopedBridge(dappName);

    // You should reconstruct all state here.
    const zoe = await E(walletBridge).getZoe();
    const board = await E(walletBridge).getBoard();
    setState({zoe, board, walletBridge, walletConnection});

    observeNotifier(E(walletBridge).getPursesNotifier(), {
      updateState: async (purses: Array<any>) => {
        setState({purses});
        onPursesChange?.(purses);
      },
    });
    // https://agoric.com/documentation/guides/js-programming/notifiers.html#subscription-example
    observeNotifier(E(walletBridge).getOffersNotifier(), {
      updateState: (offers: Array<any>) => {
        setState({offers});
        onOffersChange?.(offers);
      },
      // TODO test out these methods and find out how to use them
      finish: (completion: any) => {
        console.log('finished', completion); // eslint-disable-line no-console
        onConnectionFinish?.(completion);
      },
      fail: (reason: any) => {
        console.error('failed', reason); // eslint-disable-line no-console
        onConnectionFail?.(reason);
      },
    });
  };

  const resetWalletConnection = async () => {
    if (state.walletConnection) {
      E(state.walletConnection).reset();
    }
  };

  const onState = async (ev: any) => {
    const {walletConnection, state: walletState} = ev.detail;
    if (!isWalletState(walletState)) {
      return;
    }
    setState({walletState});
    onWalletState?.(ev);
    switch (walletState) {
      case 'idle': {
        console.log('Connection with wallet established, initializing dApp!'); // eslint-disable-line no-console
        setupWalletConnection(walletConnection);
        break;
      }
      case 'approving': {
        setState({approved: false});
        break;
      }
      case 'bridged': {
        setState({approved: true});
        break;
      }
      case 'error': {
        console.error('Wallet connection reported error', ev.detail); // eslint-disable-line no-console
        // In case of an error, reset to 'idle'.
        // Backoff or other retry strategies would go here instead of immediate reset.
        E(walletConnection).reset();
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    if (autoConnect) {
      setState({showWalletConnection: true});
    }
  }, [autoConnect]);

  return (
    <WalletContext.Provider
      value={{
        dappName,
        autoConnect,
        approved: state.approved,
        board: state.board,
        zoe: state.zoe,
        purses: state.purses,
        offers: state.offers,
        walletState: state.walletState,
        walletConnection: state.walletConnection,
        walletConnected: state.walletState === 'bridged',
        walletBridge: state.walletBridge,
        connectWallet: () => setState({showWalletConnection: true}),
        resetWalletConnection,
      }}
    >
      {children}
      {state.showWalletConnection && <AgoricWalletConnection onState={onState} style={{display: 'none'}} />}
    </WalletContext.Provider>
  );
}
