module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/forbid-prop-types': 'off',
    'no-restricted-syntax': 'off',
    'prefer-destructuring': ['error', { object: false, array: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};