var fetch = require('isomorphic-fetch');
var WebSocket = require('ws');

module.exports = {
  globals: {
    fetch,
    WebSocket,
    localStorage: { getItem: () => null, setItem: () => null },
    'ts-jest': {
      skipBabel: true
    },
    'process.env': {
      apiUrl: JSON.stringify('http://dev.otosense.ai/py-api'),
      clientId: JSON.stringify('TpaFYnACbhatKfexlaKxQbFIBZcNbU7ugRYWQsYW'),
      idaccUrl: JSON.stringify('http://dev.otosense.ai/idacc'),
      modelUrl: JSON.stringify('http://otosense.ai/model-api'),
      strollUrl: JSON.stringify('http://dev.otosense.ai/stroll'),
      splatterUrl: JSON.stringify('http://dev.otosense.ai/splatter'),
      db: JSON.stringify('development'),
    }
  },
  transform: {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testRegex: "/test/.*\\.(test|spec)\\.(ts|tsx|js)$",
  testURL: "https://otosense.ai",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/test/CSSStub.js"
  }
};
