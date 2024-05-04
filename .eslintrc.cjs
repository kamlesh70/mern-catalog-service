module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
  },
  root: true,
};
