"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSiteNewBuild = exports.getSiteDeploys = exports.getSiteBadge = exports.getSite = exports.getDeployStatus = exports.formatDeployTime = exports.formatDeployDate = void 0;

var _dateFns = require("date-fns");

var formatDeployTime = time => {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  if (minutes === 0 && seconds === 0) {
    return "";
  }

  return "Deployed in ".concat(minutes > 0 ? "".concat(minutes, "m") : "", " ").concat(seconds > 0 ? "".concat(seconds, "s") : "");
};

exports.formatDeployTime = formatDeployTime;

var formatDeployDate = d => {
  if ((0, _dateFns.isToday)(d)) {
    return "Today at ".concat((0, _dateFns.format)(d, "p"));
  }

  if ((0, _dateFns.isYesterday)(d)) {
    return "Yesterday at ".concat((0, _dateFns.format)(d, "p"));
  }

  var localizedDate = (0, _dateFns.format)(d, "PP").replace(", ".concat((0, _dateFns.getYear)(d)), "");
  return "".concat(localizedDate, " at ").concat((0, _dateFns.format)(d, "p"));
};

exports.formatDeployDate = formatDeployDate;

var getSiteBadge = siteId => {
  var time = new Date().getTime();
  return fetch("https://api.netlify.com/api/v1/badges/".concat(siteId, "/deploy-status?").concat(time));
};

exports.getSiteBadge = getSiteBadge;

var getSiteDeploys = function getSiteDeploys(siteId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return fetch("https://api.netlify.com/api/v1/sites/".concat(siteId, "/deploys"), options);
};

exports.getSiteDeploys = getSiteDeploys;

var getSite = function getSite(siteId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return fetch("https://api.netlify.com/api/v1/sites/".concat(siteId), options);
};

exports.getSite = getSite;

var postSiteNewBuild = _ref => {
  var siteId = _ref.siteId,
      clearCache = _ref.clearCache,
      headers = _ref.headers;
  var options = {
    method: "POST",
    headers,
    // eslint-disable-next-line camelcase
    body: JSON.stringify({
      clear_cache: clearCache
    })
  };
  return fetch("https://api.netlify.com/api/v1/sites/".concat(siteId, "/builds"), options);
};

exports.postSiteNewBuild = postSiteNewBuild;

var getDeployStatus = function getDeployStatus(deploy) {
  var _deploy$error_message, _deploy$error_message2, _deploy$error_message3;

  var publishedDeployId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (publishedDeployId === (deploy === null || deploy === void 0 ? void 0 : deploy.id)) {
    return "published";
  }

  if (deploy.state === "error" && deploy !== null && deploy !== void 0 && (_deploy$error_message = deploy.error_message) !== null && _deploy$error_message !== void 0 && _deploy$error_message.toLowerCase().includes("canceled build") && (deploy === null || deploy === void 0 ? void 0 : deploy.plugin_state) === "failed_build") {
    return "failed_due_to_plugin_error";
  }

  if ((deploy === null || deploy === void 0 ? void 0 : deploy.state) === "error" && deploy !== null && deploy !== void 0 && (_deploy$error_message2 = deploy.error_message) !== null && _deploy$error_message2 !== void 0 && _deploy$error_message2.toLowerCase().includes("build script returned non-zero exit code")) {
    return "failed";
  }

  if ((deploy === null || deploy === void 0 ? void 0 : deploy.state) === "error" || deploy !== null && deploy !== void 0 && (_deploy$error_message3 = deploy.error_message) !== null && _deploy$error_message3 !== void 0 && _deploy$error_message3.toLowerCase().includes("canceled build")) {
    return "canceled";
  }

  return "";
};

exports.getDeployStatus = getDeployStatus;
//# sourceMappingURL=utils.js.map