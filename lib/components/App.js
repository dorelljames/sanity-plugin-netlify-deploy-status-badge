"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireDefault(require("react"));

var _ui = require("@sanity/ui");

var _DeployItem = _interopRequireDefault(require("./DeployItem"));

var _hooks = require("../hooks");

var _config = require("../config");

var _utils = require("../utils");

var _icons = require("@sanity/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var STATE = {
  LOADING: "loading",
  READY: "ready",
  ERROR: "error",
  NEEDS_AUTH: "needs_auth",
  AUTHENTICATING: "authenticating",
  NOT_FOUND: "site_not_found"
};

function App(props) {
  var toast = (0, _ui.useToast)();

  var _useNetlifyAuth = (0, _hooks.useNetlifyAuth)(),
      getAuthURL = _useNetlifyAuth.getAuthURL,
      authResponse = _useNetlifyAuth.authResponse,
      logout = _useNetlifyAuth.logout;

  var _useLocalStorage = (0, _hooks.useLocalStorage)("".concat(_config.namespace, "--site")),
      _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
      site = _useLocalStorage2[0],
      setSite = _useLocalStorage2[1];

  var _useLocalStorage3 = (0, _hooks.useLocalStorage)("".concat(_config.namespace, "--deploys")),
      _useLocalStorage4 = _slicedToArray(_useLocalStorage3, 2),
      deploys = _useLocalStorage4[0],
      setDeploys = _useLocalStorage4[1];

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isSitePrivate = _React$useState2[0],
      setIsSitePrivate = _React$useState2[1];

  var _React$useState3 = _react.default.useState("idle"),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      state = _React$useState4[0],
      setState = _React$useState4[1]; // (loading > ready | error), (loading > needs_auth > authenticating > error | ready)


  var needsSetup = !_config.oauthClientId;
  var isLoggedIn = authResponse;
  var needsAuth = !needsSetup && !isLoggedIn;
  var requestOptions = isLoggedIn ? {
    headers: {
      Authorization: "Bearer ".concat(authResponse.access_token)
    }
  } : null; // Check if we need auth, if not, good :)

  _react.default.useEffect(() => {
    setState(STATE.LOADING);
    (0, _utils.getSiteDeploys)(_config.siteId).then(res => {
      if (!res.ok && res.status === 401) throw new Error(res.statusText);
      return res;
    }).then(res => res.json()).then(setDeploys).then(() => setTimeout(() => setState(STATE.READY), 1000)).then(() => {
      (0, _utils.getSite)(_config.siteId).then(res => res.json()).then(setSite);
    }).catch(() => {
      setState(STATE.NEEDS_AUTH);
      setIsSitePrivate(true);
    });
  }, [_config.siteId]); // We need auth here


  _react.default.useEffect(() => {
    if (state === STATE.NEEDS_AUTH && isSitePrivate && _config.siteId && isLoggedIn) {
      initOrRefreshApp();
    }
  }, [isSitePrivate, _config.siteId, isLoggedIn]); // Refresh App on every interval


  _react.default.useEffect(() => {
    var interval;

    if (state === STATE.READY) {
      interval = setInterval(() => {
        toast.push({
          title: "Refreshing site deploys...",
          status: "info"
        });
        initOrRefreshApp();
      }, _config.APP_REFRESH_INTERVAL);
    }

    return () => clearInterval(interval);
  }, []);

  function initOrRefreshApp() {
    (0, _utils.getSite)(_config.siteId, requestOptions).then(res => res.json()).then(setSite);
    (0, _utils.getSiteDeploys)(_config.siteId, requestOptions).then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res;
    }).then(res => res.json()).then(setDeploys).then(() => setTimeout(() => setState(STATE.READY), 1000)).catch(() => {
      if (isSitePrivate) {
        setState(STATE.ERROR);
      }
    });
  }

  function handleTriggerBuild() {
    var clearCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    (0, _utils.postSiteNewBuild)({
      siteId: site.id,
      clearCache,
      headers: requestOptions.headers
    }).then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res;
    }).then(() => {
      toast.push({
        title: "Successfully triggered new build ".concat(clearCache ? "without cache" : "", "!"),
        status: "success"
      });
      initOrRefreshApp();
    }).catch(() => {
      toast.push({
        title: "Oops, unable to trigger new build",
        status: "warning"
      });
    });
  }

  function handleClickAuthorize() {
    return window.location.href = getAuthURL();
  }

  function handleClickLogout() {
    return logout().then(() => {
      if (isSitePrivate) {
        setDeploys([]);
        window.localStorage.removeItem("".concat(_config.namespace, "--site"));
        window.localStorage.removeItem("".concat(_config.namespace, "--deploys"));
      }

      setState(STATE.IDLE);
    });
  }

  return /*#__PURE__*/_react.default.createElement(_ui.ThemeProvider, {
    theme: _ui.studioTheme
  }, /*#__PURE__*/_react.default.createElement(_ui.Container, null, /*#__PURE__*/_react.default.createElement(_ui.Box, {
    margin: 2,
    padding: 4,
    radius: 2
  }, /*#__PURE__*/_react.default.createElement(_ui.Flex, {
    justify: "space-between",
    align: "center"
  }, /*#__PURE__*/_react.default.createElement(_ui.Stack, {
    space: 4
  }, /*#__PURE__*/_react.default.createElement(_ui.Heading, {
    size: 3,
    as: "h2"
  }, /*#__PURE__*/_react.default.createElement(_ui.Flex, {
    marginRight: 5,
    align: "center"
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginRight: 10
    }
  }, "Site Deploys"))), /*#__PURE__*/_react.default.createElement(_ui.Text, {
    muted: true
  }, "Displaying your recent site deploys.")), /*#__PURE__*/_react.default.createElement(_ui.Stack, {
    space: 3
  }, needsSetup && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Button, {
    as: "a",
    text: "Click here to setup OAuth",
    href: "https://github.com/dorelljames/sanity-plugin-netlify-deploy-status-badge#configuration",
    target: "_blank",
    rel: "noopener noreferrer"
  }), /*#__PURE__*/_react.default.createElement(_ui.Text, {
    muted: true,
    size: 1
  }, isSitePrivate ? "Setup Netlify's OAuth and login to view site deploys, etc." : "Setup OAuth to trigger a new build.")), needsAuth && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Button, {
    text: "Login at Netlify",
    onClick: handleClickAuthorize,
    tone: "positive"
  }), /*#__PURE__*/_react.default.createElement(_ui.Text, {
    muted: true,
    size: 1
  }, isSitePrivate ? "Login in order to view site's deploy log and trigger a new build" : "Login in order to trigger a new build")), isLoggedIn && /*#__PURE__*/_react.default.createElement(_ui.Flex, null, /*#__PURE__*/_react.default.createElement(_ui.Inline, {
    space: 2
  }, state === "ready" && /*#__PURE__*/_react.default.createElement(_ui.MenuButton, {
    button: /*#__PURE__*/_react.default.createElement(_ui.Button, {
      text: "Trigger Deploy"
    }),
    id: "menu-button-example",
    menu: /*#__PURE__*/_react.default.createElement(_ui.Menu, null, /*#__PURE__*/_react.default.createElement(_ui.MenuItem, {
      text: "Deploy site",
      onClick: () => handleTriggerBuild()
    }), /*#__PURE__*/_react.default.createElement(_ui.MenuItem, {
      text: "Clear cache and deploy site",
      onClick: () => handleTriggerBuild(true)
    }))
  }), /*#__PURE__*/_react.default.createElement(_ui.Button, {
    text: "Logout",
    onClick: handleClickLogout,
    icon: _icons.ArrowRightIcon
  })))))), /*#__PURE__*/_react.default.createElement(_ui.Card, {
    margin: 4
  }, /*#__PURE__*/_react.default.createElement(_ui.Stack, {
    as: "ul"
  }, state === "error" && /*#__PURE__*/_react.default.createElement(_ui.Card, {
    padding: 4,
    radius: 2,
    tone: "critical"
  }, /*#__PURE__*/_react.default.createElement(_ui.Stack, {
    space: 4
  }, /*#__PURE__*/_react.default.createElement(_ui.Heading, null, "Oh nooo! Something went wrong here..."), /*#__PURE__*/_react.default.createElement(_ui.Text, null, "Please make sure you have access to the site configured. Try refreshing this page. If error still persists, please contact plugin author", /*#__PURE__*/_react.default.createElement("a", {
    href: "mailto:netlify-deploy-status-badge+galangdj@gmail.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "@dorelljames"), " ", "or your developer."))), (state === "loading" || state === "needs_auth" && isLoggedIn) && /*#__PURE__*/_react.default.createElement(_ui.Card, {
    borderBottom: true,
    as: "li",
    padding: 4,
    radius: 2
  }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
    as: "em"
  }, "Getting things ready...")), deploys === null || deploys === void 0 ? void 0 : deploys.map(deploy => /*#__PURE__*/_react.default.createElement(_DeployItem.default, {
    key: deploy.id,
    deploy: deploy,
    site: site
  }))))));
}
//# sourceMappingURL=App.js.map