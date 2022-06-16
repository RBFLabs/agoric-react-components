import {useContext} from 'react';
import WalletContext from '../contexts/WalletContext';

const useAgoricWalletContext = () => {
  return useContext(WalletContext);
};

export default useAgoricWalletContext;
