import { useContext } from 'react'
import WalletContext from '../contexts/WalletContext'

const useWalletContext = () => {
    return useContext(WalletContext)
}

export default useWalletContext
