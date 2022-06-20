# Agoric React App Demo

`app-js` is a dApp that interacts with a contract in `contract` folder using `@rbflabs/agoric-react-components`. The dApp allows you to to connect to your Agoric wallet and mint Moola tokens.

## Prerequisites

Install Agoric SDK from [Agoric repository](https://github.com/Agoric/Agoric-sdk) by executing the following steps:

```bash
node --version # 14.15.0 or higher
npm install --global yarn
git clone https://github.com/Agoric/agoric-sdk
cd agoric-sdk
yarn install
yarn build
yarn link-cli ~/bin/agoric
agoric --version
# 0.16.0 or higher should be printed out
```

For more detail check the Agoric [documentation](https://agoric.com/documentation/getting-started/before-using-agoric.html).

## Run the app

In all of the following `<github-root>` is the directory with the clone of this repository.

Make sure you are running Node 16 (you can use [nvm](https://github.com/nvm-sh/nvm) to switch between different Node versions).

### 1. Run the local Agoric chain

- Open terminal #1
- `cd <github-root>/demo/agoric`
- `agoric install`
- `agoric start --reset`

There will be several log messages printed out. Wait until the message

```
Deployed Wallet!
```

is printed out.

### 2. Open Agoric wallet in your browser

- When the chain is running, open terminal #2
- `cd <github-root>/demo/agoric`
- `agoric open`

This will open up a new browser tab with the Agoric wallet.

### 3. Deploy contract (in the same terminal)

- `cd <github-root>/demo/agoric/contract`
- `yarn install`
- `agoric deploy deploy.js`

After successful completion, the deployment script should print out a message that looks like the following:

```
- SUCCESS! contract code installed on Zoe
-- Contract Name: moolaMinter
-- Installation Board Id: board02021
-- Instance Board Id: board01422
-- Token Issuer Board Id: board04719
-- Token Brand Board Id: board06120
writing .../demo/app-js/src/dAppConstants.mjs
```

### 4. Run React app

Open terminal #3

- `cd <github-root>`
- `yarn dev`

You need to run `yarn dev` from the root folder, otherwise linked packages in this monorepo will not get resolved properly.
