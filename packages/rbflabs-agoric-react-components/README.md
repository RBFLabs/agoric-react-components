# @rbflabs/agoric-react-components

## Installation

Using _npm_

```
npm install @rbflabs/agoric-react-components
```

Using _yarn_

```
yarn add @rbflabs/agoric-react-components
```

## Usage

You always have to use `AgoricwalletProvider` in order to use other components from this library.

Here we use it in `index.jsx` file. You can use it elsewhere too, but make sure that all other `@rbflabs/agoric-react-components` are wrapper with `AgoricWalletProvider`.

```tsx:demo/app-js/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AgoricWalletProvider } from '@rbflabs/agoric-react-components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React>
    <AgoricWalletProvider dappName="agoric-dapp" autoConnect={false}>
      Hello, I am Agoric React App!
    </AgoricWalletProvider>
  </React>
);
```

<br/>

## Components and hooks

- [AgoricWalletProvider](#agoricwalletprovider)
- [useAgoricWalletNotifications](#agoricnotifications)

<br/>

### AgoricWalletProvider

`AgoricWalletProvider` gives you multiple props that you can access using `useAgoricWallet` hook (don't forget to wrap your component with `AgoricWalletProvider`).

```tsx:demo/app-js/src/main.jsx
import React from 'react';
import { useAgoricWallet } from '@rbflabs/agoric-react-components';

// Wrap <SomeComponent/> with <AgoricWalletProvider /> in parent component
const SomeComponent = () => {
  const {
    autoConnect, // if the dApp should connect automatically on load
    approved, // if the dApp is approved in your wallet
    board, // dApp board
    dappName, // dApp name
    offers, // list of offers in your wallet
    purses, // list of purses in your wallet
    walletBridge,
    walletConnected,
    walletConnection,
    walletState,
    zoe, // Agoric ZOE instance
    connectWallet, // function that connects to your wallet
    resetWalletConnection // function that resets wallet connection
    } = useAgoricWallet();

    return (
      <div>
        {walletConnected ? "Wallet Connected" : "Wallet Disconnected"}
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    )
}
```

#### Listen to Wallet State Change

`AgoricWalletProvider` accepts functions, that will be executed when something in your wallet changes.

```tsx:demo/app-js/src/index.jsx
import React from 'react';
import { AgoricWalletProvider } from '@rbflabs/agoric-react-components';

const onWalletState = (newState) => console.log('wallet state changed', newState)
const onPursesChange = (newPurses) => console.log('purses changed', newPurses)
const onOffersChange = (newOffers) => console.log('offers changed', newOffers)
const onConnectionFail = (reason) => console.log('connection failed', reason)
const onConnectionFinish = (completion) => console.log('connection finished', completion)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React>
    <AgoricWalletProvider
        dappName="agoric-dapp"
        autoConnect={false}
        onWalletState={onWalletState}
        onPursesChange={onPursesChange}
        onOffersChange={onOffersChange}
        onConnectionFail={onConnectionFail}
        onConnectionFinish={onConnectionFinish}
    >
      Hello, I am Agoric React App!
    </AgoricWalletProvider>
  </React>
);
```

### AgoricNotifications

This hook gives you updates in form of a notification object for you to plug in your notification system (don't forget to wrap your component with `AgoricWalletProvider`).

You can choose which notifications should show up by providing `group` parameter (the default setting is that all notifications are shown).

```tsx:demo/app-js/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useAgoricWalletNotifications } from '@rbflabs/agoric-react-components';

function SomeComponent() {
  const handleNotification = (notification: AgoricWalletNotification) => {
    const { id, title, message, loading, severity } = notification;
    // handle your notification
  };

  useAgoricWalletNotification(handleNotification, ['connect', 'offer', 'purse']);
}
```
