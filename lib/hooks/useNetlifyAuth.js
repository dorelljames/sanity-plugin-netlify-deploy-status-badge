"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNetlifyAuth;

var _react = _interopRequireDefault(require("react"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useNetlifyAuth() {
  var _React$useState = _react.default.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      authResponse = _React$useState2[0],
      setAuthResponse = _React$useState2[1]; // Process our response from authorization


  _react.default.useEffect(() => {
    if (document.location.hash) {
      var response = document.location.hash.replace(/^#/, "").split("&").reduce((result, pair) => {
        var keyValue = pair.split("=");
        result[keyValue[0]] = keyValue[1];
        return result;
      }, {}); // Remove the token so it's not visible in the URL after we're done

      document.location.hash = "";
      setAuthResponse(response);
      window.localStorage.setItem("".concat(_config.namespace, "--auth"), JSON.stringify(response));
    }
  }, []); // Set auth token from localStorage


  _react.default.useEffect(() => {
    var authToken = window.localStorage.getItem("".concat(_config.namespace, "--auth"));

    if (authToken) {
      setAuthResponse(JSON.parse(authToken));
    }
  }, []);

  var getAuthURL = () => {
    return "https://app.netlify.com/authorize?client_id=".concat(_config.oauthClientId, "&response_type=token&redirect_uri=").concat(window.location.href);
  };

  var logout = () => {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem("".concat(_config.namespace, "--auth"));

      if (!window.localStorage.getItem("".concat(_config.namespace, "--auth"))) {
        setAuthResponse(null);
        resolve("OK");
      }

      reject(new Error("Unable to logout!"));
    });
  };

  var getHeaders = () => {
    var headers = authResponse ? {
      headers: {
        Authorization: "Bearer ".concat(authResponse.access_token)
      }
    } : null;
    return headers;
  };

  return {
    authResponse,
    getAuthURL,
    getHeaders,
    logout
  };
}
//# sourceMappingURL=useNetlifyAuth.js.map