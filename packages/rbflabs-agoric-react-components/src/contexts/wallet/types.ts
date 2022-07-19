/**
 * Possible states taken from github
 * https://github.com/Agoric/agoric-sdk/blob/44c34cbdf936e86a8872622acb0e5c733f927f75/packages/web-components/src/states.js#L47 */
export const walletStates = [
  'idle',
  'locating',
  'connecting',
  'bridged',
  'approving',
  'error',
] as const;
export type WalletState = typeof walletStates[number];

export interface WalletNotification {
  /** Unique identifier */
  id: string;
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Severity of the action */
  severity: 'info' | 'success' | 'warning' | 'error';
  /** Notifies progress */
  loading: boolean;
}

export const walletNotificationGroups = ['connect', 'offer', 'purse'] as const;
export type WalletNotificationGroup = typeof walletNotificationGroups[number];

export const walletOfferStates = [
  'accept',
  'cancel',
  'complete',
  'decline',
  'pending',
  'proposed',
  'rejected',
] as const;
export type WalletOfferStatus = typeof walletOfferStates[number];

export interface WalletContextProps {
  dappName: string;
  autoConnect: boolean;
  approved: boolean;
  walletState?: WalletState;
  walletConnected: boolean;
  walletConnection: any;
  walletBridge: any;
  board: any;
  zoe: any;
  offers: any[];
  purses: any[];
  connectWallet(): void;
  resetWalletConnection(): void;
}
