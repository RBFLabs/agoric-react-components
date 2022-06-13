import React, { useContext } from 'react'
import styled from 'styled-components'
import WalletContext from '../contexts/WalletContext'

const Button = styled.button`
    background-color: #bb2d40;
    width: 10em;
    padding: 0.8em 1em;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    display: inline-block;

    &:disabled {
        cursor: not-allowed;
    }
`

const WalletConnectButton = () => {
    const { walletState, connectWallet } = useContext(WalletContext)

    const getButton = (walletState: any) => {
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
