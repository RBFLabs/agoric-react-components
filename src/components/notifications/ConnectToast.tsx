import React, { useEffect, useContext } from 'react'
import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WalletContext from '../../contexts/WalletContext'

function ConnectToast() {
    const toastId = React.useRef<any>(null)

    const { walletState } = useContext(WalletContext)

    const properties: ToastOptions = {
        position: 'bottom-left',
        closeOnClick: true,
        // newestOnTop: true,
        draggable: false,
        containerId: 'Wallet',
        hideProgressBar: false,
        autoClose: false,
    }

    const getComponentProps = (
        walletState: any,
    ): {
        text: string
        autoClose: ToastOptions['autoClose']
        className: any
    } => {
        if (
            walletState === 'idle' ||
            walletState === 'locating' ||
            walletState === 'connecting' ||
            walletState === undefined
        ) {
            return {
                text: 'Connecting to your wallet...',
                autoClose: false,
                className: undefined,
            }
        }

        if (walletState === 'approving') {
            return {
                text: 'Approve dApp in your wallet...',
                autoClose: false,
                className: undefined,
            }
        }

        if (walletState === 'bridged') {
            return {
                text: 'Wallet Connected',
                autoClose: 4000,
                className: undefined,
            }
        }

        // Just for debugging
        return {
            text: 'Undefined wallet state',
            autoClose: false,
            className: undefined,
        }
    }

    const getComponent = (text: string) => {
        return <div>{text}</div>
    }

    useEffect(() => {
        const { text, autoClose } = getComponentProps(walletState)
        const props: ToastOptions = { ...properties, autoClose }
        if (walletState) {
            // if toast with given ID exists already, just change the text
            if (toast.isActive(toastId.current)) {
                toast.update(toastId.current, {
                    ...props,
                    render: () => getComponent(text),
                })
            } else {
                toastId.current = toast(getComponent(text), props)
            }
        }

        // display notification only when walletState changes
    }, [walletState])
    return <></>
}

export default ConnectToast
