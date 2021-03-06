"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientApi = function () {
  function ClientApi(_ref) {
    var channel = _ref.channel,
        storyStore = _ref.storyStore;

    _classCallCheck(this, ClientApi);

    // channel can be null when running in node
    // always check whether channel is available
    this._channel = channel;
    this._storyStore = storyStore;
    this._addons = {};
    this._globalDecorators = [];
  }

  _createClass(ClientApi, [{
    key: "setAddon",
    value: function setAddon(addon) {
      this._addons = _extends({}, this._addons, addon);
    }
  }, {
    key: "addDecorator",
    value: function addDecorator(decorator) {
      this._globalDecorators.push(decorator);
    }
  }, {
    key: "clearDecorators",
    value: function clearDecorators() {
      this._globalDecorators = [];
    }
  }, {
    key: "storiesOf",
    value: function storiesOf(kind, m) {
      var _this = this;

      if (m && m.hot) {
        m.hot.dispose(function () {
          _this._storyStore.removeStoryKind(kind);
        });
      }

      var localDecorators = [];
      var api = {
        kind: kind
      };

      // apply addons
      Object.keys(this._addons).forEach(function (name) {
        var addon = _this._addons[name];
        api[name] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          addon.apply(api, args);
          return api;
        };
      });

      api.add = function (storyName, getStory) {
        // Wrap the getStory function with each decorator. The first
        // decorator will wrap the story function. The second will
        // wrap the first decorator and so on.
        var decorators = [].concat(localDecorators, _toConsumableArray(_this._globalDecorators));

        var fn = decorators.reduce(function (decorated, decorator) {
          return function (context) {
            return decorator(function () {
              return decorated(context);
            }, context);
          };
        }, getStory);

        // Add the fully decorated getStory function.
        _this._storyStore.addStory(kind, storyName, fn);
        return api;
      };

      api.addDecorator = function (decorator) {
        localDecorators.push(decorator);
        return api;
      };

      return api;
    }
  }, {
    key: "getStorybook",
    value: function getStorybook() {
      var _this2 = this;

      return this._storyStore.getStoryKinds().map(function (kind) {
        var stories = _this2._storyStore.getStories(kind).map(function (name) {
          var render = _this2._storyStore.getStory(kind, name);
          return { name: name, render: render };
        });
        return { kind: kind, stories: stories };
      });
    }
  }]);

  return ClientApi;
}();

exports.default = ClientApi;