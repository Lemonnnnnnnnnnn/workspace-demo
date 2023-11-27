const project = ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'];

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
  ],
  parserOptions: {
    project,
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    'import/no-default-export': 0,
    '@typescript-eslint/consistent-indexed-object-style': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/naming-convention': 0,
    'func-names': 0,
    'import/no-cycle': 0,
    'unicorn/filename-case': 0,
    '@typescript-eslint/no-unnecessary-condition': 0,
    'tsdoc/syntax': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-redundant-type-constituents': 0,
    'import/no-named-as-default-member': 0,
    'react/function-component-definition': 0,
    'react/display-name': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/button-has-type': 0,
  },
};
