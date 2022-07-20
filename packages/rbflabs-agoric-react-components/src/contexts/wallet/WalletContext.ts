import {createContext} from 'react';
import {WalletContextProps} from './types';

export const WalletContext = createContext<WalletContextProps>({} as WalletContextProps);
