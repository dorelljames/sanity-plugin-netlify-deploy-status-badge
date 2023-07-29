"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tooltip;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ui = require("@sanity/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tooltip(_ref) {
  var text = _ref.text,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_ui.Tooltip, {
    content: /*#__PURE__*/_react.default.createElement(_ui.Box, {
      padding: 2
    }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      muted: true,
      size: 1
    }, text)),
    fallbackPlacements: ["right", "left"],
    placement: "top"
  }, children);
}

Tooltip.propTypes = {
  text: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired
};
//# sourceMappingURL=Tooltip.js.map