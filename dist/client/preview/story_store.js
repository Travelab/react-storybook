"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cnt = 0;

function getId() {
  cnt += 1;
  return cnt;
}

var StoryStore = function () {
  function StoryStore() {
    _classCallCheck(this, StoryStore);

    this._data = {};
  }

  _createClass(StoryStore, [{
    key: "addStory",
    value: function addStory(kind, name, fn) {
      if (!this._data[kind]) {
        this._data[kind] = {
          kind: kind,
          index: getId(),
          stories: {}
        };
      }

      this._data[kind].stories[name] = {
        name: name,
        index: getId(),
        fn: fn
      };
    }
  }, {
    key: "getStoryKinds",
    value: function getStoryKinds() {
      var _this = this;

      return Object.keys(this._data).map(function (key) {
        return _this._data[key];
      }).filter(function (kind) {
        return Object.keys(kind.stories).length > 0;
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.kind;
      });
    }
  }, {
    key: "getStories",
    value: function getStories(kind) {
      var _this2 = this;

      if (!this._data[kind]) {
        return [];
      }

      return Object.keys(this._data[kind].stories).map(function (name) {
        return _this2._data[kind].stories[name];
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.name;
      });
    }
  }, {
    key: "getStory",
    value: function getStory(kind, name) {
      var storiesKind = this._data[kind];
      if (!storiesKind) {
        return null;
      }

      var storyInfo = storiesKind.stories[name];
      if (!storyInfo) {
        return null;
      }

      return storyInfo.fn;
    }
  }, {
    key: "removeStoryKind",
    value: function removeStoryKind(kind) {
      this._data[kind].stories = {};
    }
  }, {
    key: "hasStoryKind",
    value: function hasStoryKind(kind) {
      return Boolean(this._data[kind]);
    }
  }, {
    key: "hasStory",
    value: function hasStory(kind, name) {
      return Boolean(this.getStory(kind, name));
    }
  }, {
    key: "dumpStoryBook",
    value: function dumpStoryBook() {
      var _this3 = this;

      var data = this.getStoryKinds().map(function (kind) {
        return { kind: kind, stories: _this3.getStories(kind) };
      });

      return data;
    }
  }, {
    key: "size",
    value: function size() {
      return Object.keys(this._data).length;
    }
  }, {
    key: "clean",
    value: function clean() {
      var _this4 = this;

      this.getStoryKinds().forEach(function (kind) {
        return delete _this4._data[kind];
      });
    }
  }]);

  return StoryStore;
}();

exports.default = StoryStore;