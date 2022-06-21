module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ["node_modules", "build", "coverage"],
  plugins: ["eslint-comments", "functional"],
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
    // ToDo: REMOVE ONCE error AND pid MODULE'S STORE STATES ARE IMPLEMENTED
    "@typescript-eslint/no-empty-interface": 0, // Empty Interfaces error/warning will be ignored for now.
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // will only ignore variables that start with an underscore _
    "vue/multi-word-component-names": "off",
  },
};
