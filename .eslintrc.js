module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-rbflabs`
  extends: ['rbflabs'],
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    next: {
      rootDir: ['demo/*/'],
    },
  },
};
