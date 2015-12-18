module.exports = {
  "parser": "babel-eslint",
  "root": true,
  "rules": {
    "indent": [
      1,
      2
    ],
    "quotes": [
      1,
      "single"
    ],
    "linebreak-style": [
      1,
      "unix"
    ],
    "semi": [
      1,
      "always"
    ],
    "no-irregular-whitespace": 1,
    "no-unused-vars": [1, {"varsIgnorePattern": "React"}],
    "comma-dangle": 0
  },
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "eslint:recommended",
  "ecmaFeatures": {
    "jsx": true,
    "experimentalObjectRestSpread": true
  },
  "plugins": [
    "react"
  ]
};
