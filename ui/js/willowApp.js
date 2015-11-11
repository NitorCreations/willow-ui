'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    Provider,
    {
        __source: {
            fileName: '../../../../../ui/es6/willowApp.js',
            lineNumber: 7
        }
    },
    _react2.default.createElement(
        _reactRouter.Router,
        { history: (0, _createHashHistory2.default)(), __source: {
                fileName: '../../../../../ui/es6/willowApp.js',
                lineNumber: 8
            }
        },
        routes
    )
), document.getElementById('willow-root'));