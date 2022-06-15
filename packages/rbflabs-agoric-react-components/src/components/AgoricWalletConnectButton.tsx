import React from 'react';
// import styled from 'styled-components';
import useAgoricWalletContext from '../hooks/useAgoricWalletContext';

// const Button = styled.button`
//   background-color: #bb2d40;
//   width: 10em;
//   padding: 1em;
//   color: white;
//   cursor: pointer;
//   border: none;
//   border-radius: 12px;
//   font-weight: 600;
//   display: inline-block;
//   cursor: pointer;
//   outline: none;
//   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
//   transition: all 0.2s ease 0s;

//   &:disabled {
//     cursor: not-allowed;
//   }

//   &:hover {
//     background-color: #bb2d40;
//   }

//   &:active {
//     background-color: #bb2d40;
//   }
// `;

const AgoricWalletConnectButton = () => {
  const {walletState, connectWallet} = useAgoricWalletContext();

  const getButton = (walletState: any) => {
    // The text that is displayed might be optional. Use props.children
    switch (walletState) {
      case 'idle':
        return <button onClick={() => connectWallet?.()}>Connect Wallet</button>;
      case 'locating':
        return <button disabled>Connecting...</button>;
      case 'connecting':
        return <button disabled>Connecting...</button>;
      case 'approving':
        return <button disabled>Approving...</button>;
      case 'bridged':
        return <button disabled>Connected!</button>;
      default:
        return <button onClick={() => connectWallet?.()}>Connect Wallet</button>;
    }
  };
  return getButton(walletState);
};

export {AgoricWalletConnectButton};
