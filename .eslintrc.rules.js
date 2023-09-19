module.exports = {
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
      {
        svg: 'always',
        module: 'always',
        controller: 'always',
        service: 'always',
        pipe: 'always',
        dto: 'always',
        entity: 'always',
        middleware: 'always',
        filter: 'always',
        exception: 'always',
        guard: 'always',
      },
    ],

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'unknown', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
        pathGroups: [
          { pattern: '@nestjs/common', group: 'builtin', position: 'after' },

          { pattern: '@nestjs/**', group: 'external', position: 'after' },

          { pattern: '@/modules/**', group: 'internal', position: 'after' },
          { pattern: '@/middleware/**', group: 'internal', position: 'after' },
          { pattern: '@/controllers/**', group: 'internal', position: 'after' },
          { pattern: '@/services/**', group: 'internal', position: 'after' },
          { pattern: '@/guards/**', group: 'internal', position: 'after' },
          { pattern: '@/interceptors/**', group: 'internal', position: 'after' },

          { pattern: '@/dtos/**', group: 'type', position: 'after' },
          { pattern: '@/entities/**', group: 'type', position: 'after' },

          { pattern: '@/config/**', group: 'unknown', position: 'after' },
          { pattern: '@/providers/**', group: 'unknown', position: 'after' },
          { pattern: '@/pipes/**', group: 'unknown', position: 'after' },
          { pattern: '@/decorators/**', group: 'unknown', position: 'after' },
          { pattern: '@/utils/**', group: 'unknown', position: 'after' },
          { pattern: '@/constants/**', group: 'unknown', position: 'after' },
          { pattern: '@/assets/**', group: 'unknown', position: 'after' },
          { pattern: '@/filters/**', group: 'unknown', position: 'after' },
          { pattern: '@/exception/**', group: 'unknown', position: 'after' },
          { pattern: '@/test/**', group: 'unknown', position: 'after' },

          { pattern: './**/*.module', group: 'sibling', position: 'after' },
          { pattern: './**/*.controller', group: 'sibling', position: 'after' },
          { pattern: './**/*.service', group: 'sibling', position: 'after' },
          { pattern: './**/*.dto', group: 'sibling', position: 'after' },
          { pattern: './**/*.entity', group: 'sibling', position: 'after' },
          { pattern: './**/*.*', group: 'sibling', position: 'after' },

          { pattern: '*', group: 'external', position: 'after' },
        ],
        distinctGroup: false,
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroupsExcludedImportTypes: ['builtin', '@/*/**'],
      },
    ],
  },
};
