import { useContext } from 'react';
import { WalletContext } from '../Wallet.context';

export function useWallet() {
  return useContext(WalletContext);
}
