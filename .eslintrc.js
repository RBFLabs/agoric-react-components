module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-rbflabs`
  extends: ['rbflabs'],
  settings: {
    next: {
      rootDir: ['demo/*/'],
    },
  },
};
