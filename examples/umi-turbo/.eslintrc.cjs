/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      "./tsconfig.eslint.json",
      "./apps/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  root: true,
  rules : {
    "@typescript-eslint/no-explicit-any" : "warn",
    "@typescript-eslint/no-unsafe-assignment" : "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-argument" : "warn"
  }
};
