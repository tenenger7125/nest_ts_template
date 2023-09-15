module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { project: 'tsconfig.json', tsconfigRootDir: __dirname, sourceType: 'module' },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:import/recommended'],
  root: true,
  ecmaFeatures: { classes: false },
  env: { node: true, jest: true },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/no-unresolved': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-arrow-callback': 'error',
    'func-style': ['error', 'expression'],
    'object-shorthand': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'PropertyDefinition[value.type="ArrowFunctionExpression"]',
        message: 'Avoid using arrow functions for class methods.',
      },
      {
        selector: 'Property[value.type="ArrowFunctionExpression"]',
        message: 'Avoid using arrow functions for object methods.',
      },
    ],
    'import/extensions': [
      'error',
      'never',
      { svg: 'always', module: 'always', controller: 'always', service: 'always' },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'unknown', ['internal', 'parent', 'sibling', 'index'], 'object', 'type'],
        pathGroups: [
          { pattern: '@nestjs/common/**', group: 'builtin', position: 'before' },

          { pattern: '@nestjs/**', group: 'external', position: 'before' },

          { pattern: '@/modules/**', group: 'internal', position: 'before' },
          { pattern: '@/middleware/**', group: 'internal', position: 'before' },
          { pattern: '@/controllers/**', group: 'internal', position: 'before' },
          { pattern: '@/services/**', group: 'internal', position: 'before' },
          { pattern: '@/guards/**', group: 'internal', position: 'before' },
          { pattern: '@/interceptors/**', group: 'internal', position: 'before' },

          { pattern: '@/dtos/**', group: 'type', position: 'before' },
          { pattern: '@/entities/**', group: 'type', position: 'before' },

          { pattern: '@/config/**', group: 'unknown', position: 'before' },
          { pattern: '@/providers/**', group: 'unknown', position: 'before' },
          { pattern: '@/pipes/**', group: 'unknown', position: 'before' },
          { pattern: '@/decorators/**', group: 'unknown', position: 'before' },
          { pattern: '@/utils/**', group: 'unknown', position: 'before' },
          { pattern: '@/constants/**', group: 'unknown', position: 'before' },
          { pattern: '@/assets/**', group: 'unknown', position: 'before' },
          { pattern: '@/filters/**', group: 'unknown', position: 'before' },
          { pattern: '@/test/**', group: 'unknown', position: 'before' },

          { pattern: './**/*.module', group: 'sibling', position: 'before' },
        ],
        distinctGroup: false,
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroupsExcludedImportTypes: ['@/*/**'],
      },
    ],
  },
};