# @rbflabs/agoric-react-components monorepo

This repo contains components library and demo app using these components.

## Getting started

- `git clone https://github.com/RBFLabs/agoric-react-components.git`
- `cd agoric-react-components`

## Useful Commands
- `yarn build` - Build all packages
- `yarn dev` - Run all packages locally
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Components List
The library contains of the following components:
- `AgoricWalletProvider`
- `AgoricNotifications`
- `AgoricWalletConnectButton`

## Components Usage

Use Agoric wallet provider in your app like this:

```tsx:demo/app-js/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {AgoricNotifications, AgoricWalletProvider, AgoricWalletConnectButton} from '@rbflabs/agoric-react-components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AgoricWalletProvider dappName="agoric-dapp" autoConnect={false}>
      <AgoricNotifications />
      <AgoricWalletConnectButton />
      Hello, I am Agoric React App!
    </AgoricWalletProvider>
  </React.StrictMode>
);
```

## Versioning & Publishing Packages

This repo uses [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediatley.

You'll need to create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to your GitHub repository settings to enable access to npm. It's also worth installing the [Changesets bot](https://github.com/apps/changeset-bot) on your repository.

### Generating the Changelog

To generate your changelog, run `yarn changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm. By default, this example includes `acme` as the npm organization. To change this, do the following:

- Rename folders in `packages/*` to replace `acme` with your desired scope
- Search and replace `acme` with your desired scope
- Re-run `yarn install`

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```
