import React from 'react';
import styled from 'styled-components';
import useAgoricWalletContext from '../hooks/useAgoricWalletContext';
import {AgoricWalletState} from '../model';

const Button = styled.button`
  background-color: #bb2d40;
  width: 10em;
  padding: 1em;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease 0s;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: #bb2d40;
  }

  &:active {
    background-color: #bb2d40;
  }
`;

interface ButtonProps {
  onClick: (() => void) | undefined;
  disabled: boolean;
  children: string | JSX.Element;
}

const AgoricWalletConnectButton = () => {
  const {walletState, connectWallet} = useAgoricWalletContext();

  const getButton = (walletState: AgoricWalletState | null | undefined): ButtonProps => {
    // The text that is displayed might be optional. Use props.children
    switch (walletState) {
      case AgoricWalletState.Idle:
        return {
          disabled: false,
          onClick: connectWallet,
          children: 'Connect Wallet',
        };

      case AgoricWalletState.Locating:
        return {
          disabled: true,
          onClick: undefined,
          children: 'Connecting...',
        };

      case AgoricWalletState.Connecting:
        return {
          disabled: true,
          onClick: undefined,
          children: 'Connecting...',
        };

      case AgoricWalletState.Approving:
        return {
          disabled: true,
          onClick: undefined,
          children: 'Approving...',
        };

      case AgoricWalletState.Bridged:
        return {
          disabled: true,
          onClick: undefined,
          children: 'Connected!',
        };

      default:
        return {
          disabled: false,
          onClick: connectWallet,
          children: 'Connect Wallet',
        };
    }
  };

  const {disabled, onClick, children} = getButton(walletState);

  return (
    <Button disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
};

export {AgoricWalletConnectButton};
