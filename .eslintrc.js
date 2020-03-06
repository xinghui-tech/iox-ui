module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:vue/essential",
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
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
        "operator-linebreak": ["error", "before", { "overrides": { "?": "after", ":": "before" } }]
    }
};