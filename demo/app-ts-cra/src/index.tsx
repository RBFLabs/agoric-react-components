// import './installSesLockdown';
import "@endo/init"
import 'ses'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {AgoricWalletProvider} from '@rbflabs/agoric-react-components';
const {AgoricWalletProvider} = require('@rbflabs/agoric-react-components');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AgoricWalletProvider dappName="test-agoric-dapp-ts" autoConnect={false}>
      <App />
    </AgoricWalletProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
