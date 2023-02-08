module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  ignorePatterns: ["node_modules", "build", "coverage", "components.d.ts"],
  plugins: ["eslint-comments", "functional"],
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
