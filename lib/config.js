"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siteId = exports.personalAccessToken = exports.oauthClientId = exports.namespace = exports.BADGE_REFRESH_INTERVAL = exports.APP_REFRESH_INTERVAL = void 0;

var _configNetlifyDeployStatusBadge = _interopRequireDefault(require("config:netlify-deploy-status-badge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var siteId = _configNetlifyDeployStatusBadge.default.apiId,
    _config$auth = _configNetlifyDeployStatusBadge.default.auth,
    _config$auth2 = _config$auth === void 0 ? {} : _config$auth,
    oauthClientId = _config$auth2.oauthClientId,
    personalAccessToken = _config$auth2.personalAccessToken;

exports.personalAccessToken = personalAccessToken;
exports.oauthClientId = oauthClientId;
exports.siteId = siteId;
var namespace = "netlify-deploy-status-badge";
exports.namespace = namespace;
var APP_REFRESH_INTERVAL = 10000;
exports.APP_REFRESH_INTERVAL = APP_REFRESH_INTERVAL;
var BADGE_REFRESH_INTERVAL = 10000;
exports.BADGE_REFRESH_INTERVAL = BADGE_REFRESH_INTERVAL;
//# sourceMappingURL=config.js.map