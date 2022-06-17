import {AgoricWalletState} from './AgoricWalletState';

export interface AgoricState {
  approved: boolean;
  autoConnect: boolean;
  board: any;
  connectWallet: () => void;
  dappName: string;
  error: boolean;
  offers: any[];
  purses: any[];
  resetWalletConnection: () => void;
  showWalletConnection: boolean;
  walletBridge: any;
  walletConnected: boolean;
  walletConnection: any;
  walletState: AgoricWalletState | null;
  zoe: any;
}
