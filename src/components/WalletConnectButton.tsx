import React, { useContext } from 'react'
import styled from 'styled-components'
import WalletContext from '../contexts/WalletContext'

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
`

const WalletConnectButton = () => {
    const { walletState, connectWallet } = useContext(WalletContext)

    const getButton = (walletState: any) => {
        // The text that is displayed might be optional. Use props.children
        switch (walletState) {
            case 'idle':
                return <Button onClick={() => connectWallet()}>Connect Wallet</Button>
            case 'locating':
                return <Button disabled>Connecting...</Button>
            case 'connecting':
                return <Button disabled>Connecting...</Button>
            case 'approving':
                return <Button disabled>Approving...</Button>
            case 'bridged':
                return <Button disabled>Connected!</Button>
            default:
                return <Button onClick={() => connectWallet()}>Connect Wallet</Button>
        }
    }
    return getButton(walletState)
}

export { WalletConnectButton }
