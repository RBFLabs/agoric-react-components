/**
 * Provider
 */
export {WalletProvider as AgoricWalletProvider} from './WalletProvider';
export type {WalletProviderProps as AgoricWalletProviderProps} from './WalletProvider';

/**
 * Hooks
 */
export {useWallet as useAgoricWallet, useWalletNotifications as useAgoricWalletNotifications} from './hooks';

/**
 * Types
 */
export type {
  WalletState as AgoricWalletState,
  WalletNotification as AgoricWalletNotification,
  WalletNotificationGroup as AgoricWalletNotificationGroup,
  WalletOfferStatus as AgoricWalletOfferStatus,
  WalletContextProps as AgoricWalletContextProps,
} from './types';
