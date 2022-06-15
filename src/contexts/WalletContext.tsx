import React, {createContext} from 'react';
import {AgoricState} from '../model/AgoricState';

const WalletContext = createContext<Partial<AgoricState>>({});

export default WalletContext;
