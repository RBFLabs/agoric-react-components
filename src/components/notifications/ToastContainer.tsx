import React from 'react'
import { ToastContainer } from 'react-toastify'
import { IoCloseOutline } from 'react-icons/io5'
import theme from '../../theme'

function WalletToastContainer() {
    const closeButton = ({ closeToast }: any) => (
        <div onClick={closeToast} className="flex items-center">
            <IoCloseOutline size={20} color={theme.colors.text3} />
        </div>
    )

    return (
        <div>
            <ToastContainer
                enableMultiContainer
                containerId={'Wallet'}
                closeOnClick={false}
                newestOnTop={true}
                closeButton={closeButton}
            ></ToastContainer>
        </div>
    )
}

export default WalletToastContainer
