module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],
    "no-var": 2,
    "semi": [2, "always"],
    "strict": 2,
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
    "spaced-comment": 2,
    "arrow-spacing": 2,
    "eqeqeq": 2,
    "default-case": 2,
    "curly": [2, "all"],
    "space-before-blocks": [2, "always"],
    "no-empty": 2,
    "no-dupe-keys": 2,
    "no-dupe-args": 2,
    "no-duplicate-case": 2,
    "no-unneeded-ternary": 2,
    "comma-spacing": [2, { "before": false, "after": true }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
