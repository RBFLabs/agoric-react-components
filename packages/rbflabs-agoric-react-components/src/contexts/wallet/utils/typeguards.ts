import {WalletState, walletStates} from '../types';

export function isWalletState(allegedState?: any): allegedState is WalletState {
  return typeof allegedState === 'string' && walletStates.includes(allegedState as any);
}
