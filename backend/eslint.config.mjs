import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: ['eslint.config.mjs', 'node_modules/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_|^req$|^res$|^next$', 'caughtErrorsIgnorePattern': '^err$|^error$' }],
      'no-console': 'off',
    },
  },
];
