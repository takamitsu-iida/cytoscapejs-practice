module.exports = {
  env: {
    browser: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 5
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],

    // 無視設定
    "max-len": "off",
    "dot-notation": "off",
    "camelcase": "off"

  }
};
