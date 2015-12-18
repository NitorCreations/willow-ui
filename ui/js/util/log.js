/*eslint no-console:0*/
//
// LOGGING HELPERS
// Makes it easier to disable certain log levels afterwards.
//

export var debug = (...args) => console.debug(...args);
export var error = (...args) => console.error(...args);
export var log = (...args) => console.log(...args);
export var warn = (...args) => console.warn(...args);
export var info = (...args) => console.info(...args);
