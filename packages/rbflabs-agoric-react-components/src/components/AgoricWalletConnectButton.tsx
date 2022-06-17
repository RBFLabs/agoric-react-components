import React, {useMemo} from 'react';
import useAgoricWalletContext from '../hooks/useAgoricWalletContext';
import {AgoricWalletState} from '../model';
import theme from '../theme';
import styled, {keyframes} from 'styled-components';

const SPIN = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div<{size: number}>`
  position: relative;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const StyledLoader = styled.div<{size: number; strokeWidth: number}>`
  box-sizing: border-box;
  position: relative;
  text-indent: -9999em;
  border-top: ${props => `${props.strokeWidth}px solid ${props.color}`};
  border-right: ${props => `${props.strokeWidth}px solid ${props.color}`};
  border-bottom: ${props => `${props.strokeWidth}px solid ${props.color}`};
  border-left: ${props => `${props.strokeWidth}px solid transparent`};
  transform: translateZ(0);
  animation: ${SPIN} 1s infinite linear;
  &,
  &:after {
    border-radius: 100%;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
  }
`;

interface LoaderProps {
  className?: string;
  size: number;
  strokeWidth?: number;
  color?: string;
}

const Loader = ({className, size = 20, strokeWidth = 2, color = theme.colors.text1, ...rest}: LoaderProps) => (
  <Wrapper className={className} size={size} {...rest}>
    <StyledLoader size={size} strokeWidth={strokeWidth} color={color} />
  </Wrapper>
);

const Button = styled.button`
  background-color: ${theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15em;
  padding: 1em;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    background-color: ${theme.colors.bgDark};
    color: ${theme.colors.text2};
  }
`;

interface ButtonProps {
  disabled: boolean;
  loading: boolean;
  text: string;
  onClick: (() => void) | undefined;
}

const AgoricWalletConnectButton = (props) => {
  const {walletState, connectWallet} = useAgoricWalletContext();

  const {disabled, loading, onClick, text} = useMemo((): ButtonProps => {
    switch (walletState) {
      case AgoricWalletState.Idle:
        return {
          disabled: false,
          loading: false,
          onClick: connectWallet,
          text: 'Connect Wallet',
        };

      case AgoricWalletState.Locating:
        return {
          disabled: true,
          loading: true,
          onClick: undefined,
          text: 'Connecting...',
        };

      case AgoricWalletState.Connecting:
        return {
          disabled: true,
          loading: true,
          onClick: undefined,
          text: 'Connecting...',
        };

      case AgoricWalletState.Approving:
        return {
          disabled: true,
          loading: true,
          onClick: undefined,
          text: 'Approving...',
        };

      case AgoricWalletState.Bridged:
        return {
          disabled: true,
          loading: false,
          onClick: undefined,
          text: 'Connected!',
        };

      default:
        return {
          disabled: false,
          loading: false,
          onClick: connectWallet,
          text: 'Connect Wallet',
        };
    }
  }, [walletState]);

  return (
    <Button disabled={disabled} onClick={onClick} className={props.className}>
      {loading && <Loader size={18} color={theme.colors.text2} />}
      {text}
    </Button>
  );
};

export {AgoricWalletConnectButton};
