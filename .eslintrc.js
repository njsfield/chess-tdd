module.exports = {
    "plugins": [
        "react", "jest"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "es6":     true,
        "browser": true,
        "node":    true,
        "mocha":   true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
      "no-unused-vars": [1, { "vars": "local", "args": "after-used" }],
      "no-undef" : 2,
      "no-unused-expressions": 2
    }
}
