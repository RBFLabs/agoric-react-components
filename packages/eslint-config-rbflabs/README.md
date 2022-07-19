# eslint-config-rbflabs

## Install

`eslint-config-rbflabs` needs to be installed with all of it peerdependencies. In your project run:

```sh
npx install-peerdeps --dev eslint-config-rbflabs
```

## Usage

### ESLint

Create `.eslintrc.js` file:

```tsx
module.exports = {
  // root: true // this might be needed for projects, where tsconfig and eslintrc are not in the root
  extends: ['rbflabs'],
  parserOptions: {
    project: './tsconfig.json',
    // tsconfigRootDir: __dirname, // this might be needed for projects, where tsconfig and eslintrc are not in the root
  },
  /** All project specific eslint rules, ignorePatterns, ...  */
};
```

### Prettier

Create `.prettierrc.js` file:

```tsx
module.exports = require('eslint-config-rbflabs/.prettierrc.js');
```

- prettier still needs to be configured in your text editor of choice.
