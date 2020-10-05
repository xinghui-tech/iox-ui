module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "semi": ["warn", "always"],
        "space-before-function-paren": ["warn", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"}],
        "no-unused-vars": ["warn"],
        "comma-dangle": ["off"],
        "eol-last": ["off"],
        "no-prototype-builtins": ["off"],
        "operator-linebreak": ["error", "before", { "overrides": { "?": "after", ":": "before" } }],
        "quotes": ["off"],
        "dot-notation": ["warn"],
        "no-undef": ["off"],
        "eqeqeq": ["error", "smart"],
        // typescript
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/no-non-null-assertion": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-unused-vars": ["warn", {"args": "none"}],
        "@typescript-eslint/explicit-module-boundary-types": "off"
    }
};