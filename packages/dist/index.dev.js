"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _agButton = _interopRequireDefault(require("./components/ag-button"));

var _agIcon = _interopRequireDefault(require("./components/ag-icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var components = [_agIcon["default"], _agButton["default"]];

var install = function install(Vue) {
  if (install.installed) return;
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
};

if (typeof window != 'undefined' && window.Vue) {
  install(window.Vue);
}

var _default = {
  version: '1.0.0',
  install: install,
  agIcon: _agIcon["default"],
  agButton: _agButton["default"]
};
exports["default"] = _default;