"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeployItem;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ui = require("@sanity/ui");

var _icons = require("@sanity/icons");

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
function DeployItem(_ref) {
  var _deploy$commit_ref, _site$published_deplo;

  var deploy = _ref.deploy,
      site = _ref.site;
  return /*#__PURE__*/_react.default.createElement(_ui.Card, {
    borderBottom: true,
    as: "li",
    padding: 4,
    radius: 2,
    key: deploy === null || deploy === void 0 ? void 0 : deploy.id
  }, /*#__PURE__*/_react.default.createElement(_ui.Grid, {
    columns: 6,
    justify: "space-between",
    align: "center"
  }, /*#__PURE__*/_react.default.createElement(_ui.Box, {
    column: 4
  }, /*#__PURE__*/_react.default.createElement(_ui.Stack, {
    space: 3
  }, /*#__PURE__*/_react.default.createElement(_ui.Flex, {
    align: "center"
  }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
    weight: "semibold"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: deploy === null || deploy === void 0 ? void 0 : deploy.deploy_url,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textTransform: "capitalize"
    }
  }, deploy === null || deploy === void 0 ? void 0 : deploy.context.replace("-", " "))), /*#__PURE__*/_react.default.createElement(_ui.Text, {
    weight: "semibold"
  }, " ", ":", deploy === null || deploy === void 0 ? void 0 : deploy.branch, "@", /*#__PURE__*/_react.default.createElement("a", {
    href: (deploy === null || deploy === void 0 ? void 0 : deploy.commit_url) || "",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (deploy === null || deploy === void 0 ? void 0 : (_deploy$commit_ref = deploy.commit_ref) === null || _deploy$commit_ref === void 0 ? void 0 : _deploy$commit_ref.substring(0, 7)) || "HEAD", " ")), deploy.state === "new" && !(deploy !== null && deploy !== void 0 && deploy.deploy_time) && /*#__PURE__*/_react.default.createElement(_ui.Badge, {
    mode: "outline",
    tone: "caution",
    padding: 1,
    marginLeft: "1"
  }, "New"), deploy.state === "building" && /*#__PURE__*/_react.default.createElement(_ui.Badge, {
    mode: "outline",
    tone: "caution",
    padding: 1,
    marginLeft: "1"
  }, "Building"), (0, _utils.getDeployStatus)(deploy, site === null || site === void 0 ? void 0 : (_site$published_deplo = site.published_deploy) === null || _site$published_deplo === void 0 ? void 0 : _site$published_deplo.id) === "published" && /*#__PURE__*/_react.default.createElement(_ui.Badge, {
    mode: "outline",
    tone: "positive",
    padding: 1,
    marginLeft: "1"
  }, "Published"), (0, _utils.getDeployStatus)(deploy) === "canceled" && /*#__PURE__*/_react.default.createElement(_ui.Badge, {
    mode: "outline",
    padding: 1,
    marginLeft: "1"
  }, "Canceled"), (0, _utils.getDeployStatus)(deploy) === "failed" && /*#__PURE__*/_react.default.createElement(_ui.Badge, {
    mode: "outline",
    tone: "critical",
    padding: 1,
    marginLeft: "1"
  }, "Failed"), (0, _utils.getDeployStatus)(deploy) === "failed_due_to_plugin_error" && /*#__PURE__*/_react.default.createElement(_ui.Badge, {
    mode: "outline",
    tone: "critical",
    padding: 1,
    marginLeft: "1"
  }, "Failed Due To Plugin Error")), /*#__PURE__*/_react.default.createElement(_ui.Text, {
    muted: true
  }, (deploy === null || deploy === void 0 ? void 0 : deploy.title) || "No deploy message"))), /*#__PURE__*/_react.default.createElement(_ui.Flex, {
    column: 2,
    justify: "flex-end",
    align: "center",
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react.default.createElement(_ui.Stack, {
    space: 3
  }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
    weight: "semibold"
  }, (0, _utils.formatDeployDate)(new Date(deploy === null || deploy === void 0 ? void 0 : deploy.created_at))), (deploy === null || deploy === void 0 ? void 0 : deploy.deploy_time) && /*#__PURE__*/_react.default.createElement(_ui.Text, {
    muted: true,
    size: 1
  }, (0, _utils.formatDeployTime)(deploy === null || deploy === void 0 ? void 0 : deploy.deploy_time))), /*#__PURE__*/_react.default.createElement(_ui.Box, {
    marginLeft: 2
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "View Deploy"
  }, /*#__PURE__*/_react.default.createElement(_ui.Button, {
    tone: "primary",
    icon: _icons.ArrowTopRightIcon,
    mode: "ghost",
    as: "a",
    href: "https://app.netlify.com/sites/".concat(deploy === null || deploy === void 0 ? void 0 : deploy.name, "/deploys/").concat(deploy === null || deploy === void 0 ? void 0 : deploy.id),
    target: "_blank",
    rel: "noopener noreferrer"
  }))))));
}

DeployItem.propTypes = {
  deploy: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    title: _propTypes.default.string,
    name: _propTypes.default.string.isRequired,
    created_at: _propTypes.default.string.isRequired,
    context: _propTypes.default.string.isRequired,
    branch: _propTypes.default.string.isRequired,
    commit_url: _propTypes.default.string,
    commit_ref: _propTypes.default.string,
    deploy_time: _propTypes.default.number,
    state: _propTypes.default.string.isRequired,
    deploy_url: _propTypes.default.string.isRequired
  }).isRequired,
  site: _propTypes.default.shape({
    published_deploy: _propTypes.default.shape({
      id: _propTypes.default.string.isRequired
    })
  }).isRequired
};
//# sourceMappingURL=DeployItem.js.map