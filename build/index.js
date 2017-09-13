module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeRangePicker = function (_React$Component) {
  _inherits(TimeRangePicker, _React$Component);

  function TimeRangePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TimeRangePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimeRangePicker.__proto__ || Object.getPrototypeOf(TimeRangePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      start_line: null,
      end_line: null,
      start_time: undefined,
      end_time: undefined
    }, _this.get_canvas_coordinates = function (evt) {
      var x = evt.clientX - _this.state.context.canvas.getBoundingClientRect().left,
          y = evt.clientY - _this.state.context.canvas.getBoundingClientRect().top;
      return { x: x, y: y };
    }, _this.draw_grid = function () {
      var y_step = _this.state.context.canvas.height / 24.0;

      if (_this.props.hourlines) {
        var step = y_step;
        _this.state.context.beginPath();
        _this.state.context.lineWidth = 0.1;

        for (var i = 0; i < 24; i++) {
          if (i % 2 == 0) {
            _this.state.context.strokeStyle = 'rgba(0,0,0,0.2)';
          } else {
            _this.state.context.strokeStyle = 'rgba(0,0,0,1.0)';
          }
          _this.state.context.moveTo(0, step);
          _this.state.context.lineTo(_this.state.context.canvas.width, step);
          step = step + y_step;
        }
        _this.state.context.stroke();
      }

      if (!_this.props.hourmarkers) {
        return;
      }

      var step = y_step;
      _this.state.context.fillStyle = _this.props.markercolor;
      _this.state.context.font = _this.props.markerfont;
      _this.state.context.textAlign = "start";
      for (var i = 1; i < 25; ++i) {

        _this.state.context.fillText((i % 12 == 0 ? 12 : i % 12) + ' ' + (i / 12 > 1 ? "pm" : "am"), 10, step);
        step = step + y_step;
      }
    }, _this.to_24_hour_format = function (raw_time) {
      raw_time = parseInt(Math.round(Math.round(raw_time * 2) / 2 / _this.props.snapto) * _this.props.snapto);
      var end_of_raw_time = '' + parseInt(parseInt(raw_time.toString().slice(-2)) / 100 * 60);

      if (end_of_raw_time.length == 1) {
        end_of_raw_time = "0" + end_of_raw_time;
      }
      var start_of_raw_time = ('' + raw_time).substring(0, raw_time > 999 ? 2 : 1);
      if (start_of_raw_time.length == 1) {
        start_of_raw_time = "0" + start_of_raw_time;
      }
      raw_time = start_of_raw_time + ":" + end_of_raw_time;
      if (raw_time === "24:00") {
        raw_time = "23:59";
      }
      return raw_time;
    }, _this.generate_time_bounds = function () {
      var start = _this.to_24_hour_format(_this.state.start_line / _this.state.context.canvas.height * 100.0 * 24);
      var end = _this.to_24_hour_format(_this.state.end_line / _this.state.context.canvas.height * 100.0 * 24);

      _this.setState({
        start_time: start,
        end_time: end
      });
    }, _this.clear_canvas = function () {
      _this.state.canvas.width = _this.state.canvas.offsetWidth;
      _this.state.canvas.height = _this.state.canvas.offsetHeight;
      _this.state.context.fillStyle = '#FFFFFF';
      _this.state.context.clearRect(0, 0, _this.state.canvas.width, _this.state.canvas.height);
      _this.state.context.fillRect(0, 0, _this.state.context.canvas.clientWidth, _this.state.context.canvas.clientHeight);
      _this.draw_grid();
    }, _this.draw_horizontal_line = function (y_axis) {
      _this.state.context.beginPath();
      _this.state.context.moveTo(0, y_axis);
      _this.state.context.lineTo(_this.state.context.canvas.width, y_axis);
      _this.state.context.lineWidth = 1;

      // set line color
      _this.state.context.strokeStyle = '#000000';
      _this.state.context.stroke();

      _this.state.context.fillStyle = _this.props.rangecolor;
      _this.state.context.fillRect(0, _this.state.start_line, _this.state.canvas.width, _this.state.end_line - _this.state.start_line);
    }, _this.draw_start_and_end_lines = function () {
      _this.clear_canvas();
      _this.draw_horizontal_line(_this.state.start_line);
      _this.draw_horizontal_line(_this.state.end_line);
      _this.generate_time_bounds();
    }, _this.move_closest_line = function (drag_ordinates) {
      if (drag_ordinates < 0) {
        drag_ordinates = 0;
      }
      if (drag_ordinates > _this.state.context.canvas.height) {
        drag_ordinates = _this.state.context.canvas.height;
      }

      var distance_to_start_line = null;
      var distance_to_end_line = null;
      if (_this.state.start_line) {
        distance_to_start_line = Math.abs(drag_ordinates.y - _this.state.start_line);
      }
      if (_this.state.end_line) {
        distance_to_end_line = Math.abs(drag_ordinates.y - _this.state.end_line);
      }

      if (_this.state.start_line === null && _this.state.end_line === null) {
        _this.setState({
          start_line: drag_ordinates.y
        }, _this.draw_start_and_end_lines);
      } else if (_this.state.start_line !== null && _this.state.end_line === null) {
        if (drag_ordinates.y < _this.state.start_line) {
          _this.setState({
            end_line: _this.state.start_line,
            start_line: drag_ordinates.y
          }, _this.draw_start_and_end_lines);
        } else if (drag_ordinates.y > _this.state.start_line) {
          _this.setState({
            start_line: _this.state.start_line,
            end_line: drag_ordinates.y
          }, _this.draw_start_and_end_lines);
        }
      } else {
        if (distance_to_start_line < distance_to_end_line) {
          _this.setState({
            start_line: drag_ordinates.y
          }, _this.draw_start_and_end_lines);
        } else if (distance_to_end_line <= distance_to_start_line) {
          _this.setState({
            end_line: drag_ordinates.y
          }, _this.draw_start_and_end_lines);
        }
      }
    }, _this.drag_start = function (evt) {
      _this.setState({ dragging: true });
      var drag_ordinates = _this.get_canvas_coordinates(evt);
      _this.move_closest_line(drag_ordinates);
    }, _this.drag = function (evt) {
      if (_this.state.dragging) {
        var drag_ordinates = _this.get_canvas_coordinates(evt);
        _this.move_closest_line(drag_ordinates);
      }
    }, _this.drag_stop = function (evt) {
      // here we want to snap the start and end lines to their closest bounds
      _this.setState({ dragging: false }, function () {
        return _this.props.timeupdate(_this.state.start_time, _this.state.end_time);
      });
    }, _this.setup_canvas = function () {
      _this.clear_canvas();
      _this.state.context.canvas.addEventListener('mousedown', _this.drag_start, false);
      _this.state.context.canvas.addEventListener('mousemove', _this.drag, false);
      _this.state.context.canvas.addEventListener('mouseup', _this.drag_stop, false);
    }, _this.handleClick = function (event) {
      var x = event.clientX;
      var y = event.clientY;
    }, _this.componentDidMount = function () {
      _this.setState({
        canvas: document.getElementById('TimePeriodSelectorCanvas')
      }, function () {
        _this.setState({
          context: _this.state.canvas.getContext('2d')
        }, function () {
          _this.setup_canvas();
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimeRangePicker, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _extends({}, this.props.style) },
        _react2.default.createElement('canvas', { id: 'TimePeriodSelectorCanvas', style: {
            border: "1px solid #000000",
            height: "100%",
            width: "100%"
          } }),
        _react2.default.createElement(
          'h3',
          { style: { userSelect: "none" } },
          this.state.start_time !== undefined && this.state.end_time !== undefined ? 'From: ' + this.state.start_time + ' To: ' + this.state.end_time : null
        )
      );
    }
  }]);

  return TimeRangePicker;
}(_react2.default.Component);

exports.default = TimeRangePicker;


TimeRangePicker.defaultProps = {
  style: {
    width: "500px",
    height: "500px"
  },
  rangecolor: "rgba(255, 153, 153, 0.2)",
  hourlines: false,
  hourmarkers: false,
  markercolor: "blue",
  markerfont: "15px Arial",
  snapto: 50,
  timeupdate: function timeupdate(a, b) {}
};

/***/ })
/******/ ]);