// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/apng-js/lib/index.js":[function(require,module,exports) {
var define;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["apng-js"] = factory();
	else
		root["apng-js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isNotPNG = isNotPNG;
	exports.isNotAPNG = isNotAPNG;
	exports.default = parseAPNG;

	var _crc = __webpack_require__(1);

	var _crc2 = _interopRequireDefault(_crc);

	var _structs = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var errNotPNG = new Error('Not a PNG');
	var errNotAPNG = new Error('Not an animated PNG');

	function isNotPNG(err) {
	    return err === errNotPNG;
	}
	function isNotAPNG(err) {
	    return err === errNotAPNG;
	}

	// '\x89PNG\x0d\x0a\x1a\x0a'
	var PNGSignature = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

	/**
	 * Parse APNG data
	 * @param {ArrayBuffer} buffer
	 * @return {APNG|Error}
	 */
	function parseAPNG(buffer) {
	    var bytes = new Uint8Array(buffer);

	    if (Array.prototype.some.call(PNGSignature, function (b, i) {
	        return b !== bytes[i];
	    })) {
	        return errNotPNG;
	    }

	    // fast animation test
	    var isAnimated = false;
	    eachChunk(bytes, function (type) {
	        return !(isAnimated = type === 'acTL');
	    });
	    if (!isAnimated) {
	        return errNotAPNG;
	    }

	    var preDataParts = [],
	        postDataParts = [];
	    var headerDataBytes = null,
	        frame = null,
	        frameNumber = 0,
	        apng = new _structs.APNG();

	    eachChunk(bytes, function (type, bytes, off, length) {
	        var dv = new DataView(bytes.buffer);
	        switch (type) {
	            case 'IHDR':
	                headerDataBytes = bytes.subarray(off + 8, off + 8 + length);
	                apng.width = dv.getUint32(off + 8);
	                apng.height = dv.getUint32(off + 12);
	                break;
	            case 'acTL':
	                apng.numPlays = dv.getUint32(off + 8 + 4);
	                break;
	            case 'fcTL':
	                if (frame) {
	                    apng.frames.push(frame);
	                    frameNumber++;
	                }
	                frame = new _structs.Frame();
	                frame.width = dv.getUint32(off + 8 + 4);
	                frame.height = dv.getUint32(off + 8 + 8);
	                frame.left = dv.getUint32(off + 8 + 12);
	                frame.top = dv.getUint32(off + 8 + 16);
	                var delayN = dv.getUint16(off + 8 + 20);
	                var delayD = dv.getUint16(off + 8 + 22);
	                if (delayD === 0) {
	                    delayD = 100;
	                }
	                frame.delay = 1000 * delayN / delayD;
	                // https://bugzilla.mozilla.org/show_bug.cgi?id=125137
	                // https://bugzilla.mozilla.org/show_bug.cgi?id=139677
	                // https://bugzilla.mozilla.org/show_bug.cgi?id=207059
	                if (frame.delay <= 10) {
	                    frame.delay = 100;
	                }
	                apng.playTime += frame.delay;
	                frame.disposeOp = dv.getUint8(off + 8 + 24);
	                frame.blendOp = dv.getUint8(off + 8 + 25);
	                frame.dataParts = [];
	                if (frameNumber === 0 && frame.disposeOp === 2) {
	                    frame.disposeOp = 1;
	                }
	                break;
	            case 'fdAT':
	                if (frame) {
	                    frame.dataParts.push(bytes.subarray(off + 8 + 4, off + 8 + length));
	                }
	                break;
	            case 'IDAT':
	                if (frame) {
	                    frame.dataParts.push(bytes.subarray(off + 8, off + 8 + length));
	                }
	                break;
	            case 'IEND':
	                postDataParts.push(subBuffer(bytes, off, 12 + length));
	                break;
	            default:
	                preDataParts.push(subBuffer(bytes, off, 12 + length));
	        }
	    });

	    if (frame) {
	        apng.frames.push(frame);
	    }

	    if (apng.frames.length == 0) {
	        return errNotAPNG;
	    }

	    var preBlob = new Blob(preDataParts),
	        postBlob = new Blob(postDataParts);

	    apng.frames.forEach(function (frame) {
	        var bb = [];
	        bb.push(PNGSignature);
	        headerDataBytes.set(makeDWordArray(frame.width), 0);
	        headerDataBytes.set(makeDWordArray(frame.height), 4);
	        bb.push(makeChunkBytes('IHDR', headerDataBytes));
	        bb.push(preBlob);
	        frame.dataParts.forEach(function (p) {
	            return bb.push(makeChunkBytes('IDAT', p));
	        });
	        bb.push(postBlob);
	        frame.imageData = new Blob(bb, { 'type': 'image/png' });
	        delete frame.dataParts;
	        bb = null;
	    });

	    return apng;
	}

	/**
	 * @param {Uint8Array} bytes
	 * @param {function(string, Uint8Array, int, int): boolean} callback
	 */
	function eachChunk(bytes, callback) {
	    var dv = new DataView(bytes.buffer);
	    var off = 8,
	        type = void 0,
	        length = void 0,
	        res = void 0;
	    do {
	        length = dv.getUint32(off);
	        type = readString(bytes, off + 4, 4);
	        res = callback(type, bytes, off, length);
	        off += 12 + length;
	    } while (res !== false && type != 'IEND' && off < bytes.length);
	}

	/**
	 *
	 * @param {Uint8Array} bytes
	 * @param {number} off
	 * @param {number} length
	 * @return {string}
	 */
	function readString(bytes, off, length) {
	    var chars = Array.prototype.slice.call(bytes.subarray(off, off + length));
	    return String.fromCharCode.apply(String, chars);
	}

	/**
	 *
	 * @param {string} x
	 * @return {Uint8Array}
	 */
	function makeStringArray(x) {
	    var res = new Uint8Array(x.length);
	    for (var i = 0; i < x.length; i++) {
	        res[i] = x.charCodeAt(i);
	    }
	    return res;
	}

	/**
	 * @param {Uint8Array} bytes
	 * @param {int} start
	 * @param {int} length
	 * @return {Uint8Array}
	 */
	function subBuffer(bytes, start, length) {
	    var a = new Uint8Array(length);
	    a.set(bytes.subarray(start, start + length));
	    return a;
	}

	/**
	 * @param {string} type
	 * @param {Uint8Array} dataBytes
	 * @return {Uint8Array}
	 */
	var makeChunkBytes = function makeChunkBytes(type, dataBytes) {
	    var crcLen = type.length + dataBytes.length;
	    var bytes = new Uint8Array(crcLen + 8);
	    var dv = new DataView(bytes.buffer);

	    dv.setUint32(0, dataBytes.length);
	    bytes.set(makeStringArray(type), 4);
	    bytes.set(dataBytes, 8);
	    var crc = (0, _crc2.default)(bytes, 4, crcLen);
	    dv.setUint32(crcLen + 4, crc);
	    return bytes;
	};

	var makeDWordArray = function makeDWordArray(x) {
	    return new Uint8Array([x >>> 24 & 0xff, x >>> 16 & 0xff, x >>> 8 & 0xff, x & 0xff]);
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (bytes) {
	  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bytes.length - start;

	  var crc = -1;
	  for (var _i = start, l = start + length; _i < l; _i++) {
	    crc = crc >>> 8 ^ table[(crc ^ bytes[_i]) & 0xFF];
	  }
	  return crc ^ -1;
	};

	var table = new Uint32Array(256);

	for (var i = 0; i < 256; i++) {
	  var c = i;
	  for (var k = 0; k < 8; k++) {
	    c = (c & 1) !== 0 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
	  }
	  table[i] = c;
	}

	/**
	 *
	 * @param {Uint8Array} bytes
	 * @param {number} start
	 * @param {number} length
	 * @return {number}
	 */
	;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Frame = exports.APNG = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _player = __webpack_require__(3);

	var _player2 = _interopRequireDefault(_player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @property {number} currFrameNumber
	 * @property {Frame} currFrame
	 * @property {boolean} paused
	 * @property {boolean} ended
	 */
	var APNG = exports.APNG = function () {
	    function APNG() {
	        _classCallCheck(this, APNG);

	        this.width = 0;
	        this.height = 0;
	        this.numPlays = 0;
	        this.playTime = 0;
	        this.frames = [];
	    }
	    /** @type {number} */

	    /** @type {number} */

	    /** @type {number} */

	    /** @type {number} */

	    /** @type {Frame[]} */


	    _createClass(APNG, [{
	        key: 'createImages',


	        /**
	         *
	         * @return {Promise.<*>}
	         */
	        value: function createImages() {
	            return Promise.all(this.frames.map(function (f) {
	                return f.createImage();
	            }));
	        }

	        /**
	         *
	         * @param {CanvasRenderingContext2D} context
	         * @param {boolean} autoPlay
	         * @return {Promise.<Player>}
	         */

	    }, {
	        key: 'getPlayer',
	        value: function getPlayer(context) {
	            var _this = this;

	            var autoPlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            return this.createImages().then(function () {
	                return new _player2.default(_this, context, autoPlay);
	            });
	        }
	    }]);

	    return APNG;
	}();

	var Frame = exports.Frame = function () {
	    function Frame() {
	        _classCallCheck(this, Frame);

	        this.left = 0;
	        this.top = 0;
	        this.width = 0;
	        this.height = 0;
	        this.delay = 0;
	        this.disposeOp = 0;
	        this.blendOp = 0;
	        this.imageData = null;
	        this.imageElement = null;
	    }
	    /** @type {number} */

	    /** @type {number} */

	    /** @type {number} */

	    /** @type {number} */

	    /** @type {number} */

	    /** @type {number} */

	    /** @type {number} */

	    /** @type {Blob} */

	    /** @type {HTMLImageElement} */


	    _createClass(Frame, [{
	        key: 'createImage',
	        value: function createImage() {
	            var _this2 = this;

	            if (this.imageElement) {
	                return Promise.resolve();
	            }
	            return new Promise(function (resolve, reject) {
	                var url = URL.createObjectURL(_this2.imageData);
	                _this2.imageElement = document.createElement('img');
	                _this2.imageElement.onload = function () {
	                    URL.revokeObjectURL(url);
	                    resolve();
	                };
	                _this2.imageElement.onerror = function () {
	                    URL.revokeObjectURL(url);
	                    _this2.imageElement = null;
	                    reject(new Error("Image creation error"));
	                };
	                _this2.imageElement.src = url;
	            });
	        }
	    }]);

	    return Frame;
	}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(4);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _class = function (_EventEmitter) {
	    _inherits(_class, _EventEmitter);

	    /**
	     * @param {APNG} apng
	     * @param {CanvasRenderingContext2D} context
	     * @param {boolean} autoPlay
	     */

	    /** @type {boolean} */

	    /** @type {number} */

	    /** @type {Frame} */

	    /** @type {number} */
	    function _class(apng, context, autoPlay) {
	        _classCallCheck(this, _class);

	        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	        _this.playbackRate = 1.0;
	        _this._currentFrameNumber = 0;
	        _this._ended = false;
	        _this._paused = true;
	        _this._numPlays = 0;

	        _this._apng = apng;
	        _this.context = context;
	        _this.stop();
	        if (autoPlay) {
	            _this.play();
	        }
	        return _this;
	    }

	    /**
	     *
	     * @return {number}
	     */

	    /** @type {number} */


	    /** @type {boolean} */

	    /** @type {ImageData} */


	    /** @type {APNG} */

	    /** @type {CanvasRenderingContext2D} */


	    _createClass(_class, [{
	        key: 'renderNextFrame',
	        value: function renderNextFrame() {
	            this._currentFrameNumber = (this._currentFrameNumber + 1) % this._apng.frames.length;
	            if (this._currentFrameNumber === this._apng.frames.length - 1) {
	                this._numPlays++;
	                if (this._apng.numPlays !== 0 && this._numPlays >= this._apng.numPlays) {
	                    this._ended = true;
	                    this._paused = true;
	                }
	            }

	            if (this._prevFrame && this._prevFrame.disposeOp == 1) {
	                this.context.clearRect(this._prevFrame.left, this._prevFrame.top, this._prevFrame.width, this._prevFrame.height);
	            } else if (this._prevFrame && this._prevFrame.disposeOp == 2) {
	                this.context.putImageData(this._prevFrameData, this._prevFrame.left, this._prevFrame.top);
	            }

	            var frame = this.currentFrame;
	            this._prevFrame = frame;
	            this._prevFrameData = null;
	            if (frame.disposeOp == 2) {
	                this._prevFrameData = this.context.getImageData(frame.left, frame.top, frame.width, frame.height);
	            }
	            if (frame.blendOp == 0) {
	                this.context.clearRect(frame.left, frame.top, frame.width, frame.height);
	            }

	            this.context.drawImage(frame.imageElement, frame.left, frame.top);

	            this.emit('frame', this._currentFrameNumber);
	            if (this._ended) {
	                this.emit('end');
	            }
	        }

	        // playback

	    }, {
	        key: 'play',
	        value: function play() {
	            var _this2 = this;

	            this.emit('play');

	            if (this._ended) {
	                this.stop();
	            }
	            this._paused = false;

	            var nextRenderTime = performance.now() + this.currentFrame.delay / this.playbackRate;
	            var tick = function tick(now) {
	                if (_this2._ended || _this2._paused) {
	                    return;
	                }
	                if (now >= nextRenderTime) {
	                    while (now - nextRenderTime >= _this2._apng.playTime / _this2.playbackRate) {
	                        nextRenderTime += _this2._apng.playTime / _this2.playbackRate;
	                        _this2._numPlays++;
	                    }
	                    do {
	                        _this2.renderNextFrame();
	                        nextRenderTime += _this2.currentFrame.delay / _this2.playbackRate;
	                    } while (!_this2._ended && now > nextRenderTime);
	                }
	                requestAnimationFrame(tick);
	            };
	            requestAnimationFrame(tick);
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            if (!this._paused) {
	                this.emit('pause');
	                this._paused = true;
	            }
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.emit('stop');
	            this._numPlays = 0;
	            this._ended = false;
	            this._paused = true;
	            // render first frame
	            this._currentFrameNumber = -1;
	            this.context.clearRect(0, 0, this._apng.width, this._apng.height);
	            this.renderNextFrame();
	        }
	    }, {
	        key: 'currentFrameNumber',
	        get: function get() {
	            return this._currentFrameNumber;
	        }

	        /**
	         *
	         * @return {Frame}
	         */

	    }, {
	        key: 'currentFrame',
	        get: function get() {
	            return this._apng.frames[this._currentFrameNumber];
	        }
	    }, {
	        key: 'paused',
	        get: function get() {
	            return this._paused;
	        }
	    }, {
	        key: 'ended',
	        get: function get() {
	            return this._ended;
	        }
	    }]);

	    return _class;
	}(_events2.default);

	exports.default = _class;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ })
/******/ ])
});
;
},{}],"node_modules/is-regexp/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (re) {
  return Object.prototype.toString.call(re) === '[object RegExp]';
};
},{}],"node_modules/is-obj/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
};
},{}],"node_modules/get-own-enumerable-property-symbols/lib/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (object) => Object
    .getOwnPropertySymbols(object)
    .filter((keySymbol) => Object.prototype.propertyIsEnumerable.call(object, keySymbol));

},{}],"node_modules/stringify-object/index.js":[function(require,module,exports) {
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

const isRegexp = require('is-regexp');

const isObj = require('is-obj');

const getOwnEnumPropSymbols = require('get-own-enumerable-property-symbols').default;

module.exports = (val, opts, pad) => {
  const seen = [];
  return function stringify(val, opts, pad) {
    opts = opts || {};
    opts.indent = opts.indent || '\t';
    pad = pad || '';
    let tokens;

    if (opts.inlineCharacterLimit === undefined) {
      tokens = {
        newLine: '\n',
        newLineOrSpace: '\n',
        pad: pad,
        indent: pad + opts.indent
      };
    } else {
      tokens = {
        newLine: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
        newLineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
        pad: '@@__STRINGIFY_OBJECT_PAD__@@',
        indent: '@@__STRINGIFY_OBJECT_INDENT__@@'
      };
    }

    const expandWhiteSpace = string => {
      if (opts.inlineCharacterLimit === undefined) {
        return string;
      }

      const oneLined = string.replace(new RegExp(tokens.newLine, 'g'), '').replace(new RegExp(tokens.newLineOrSpace, 'g'), ' ').replace(new RegExp(tokens.pad + '|' + tokens.indent, 'g'), '');

      if (oneLined.length <= opts.inlineCharacterLimit) {
        return oneLined;
      }

      return string.replace(new RegExp(tokens.newLine + '|' + tokens.newLineOrSpace, 'g'), '\n').replace(new RegExp(tokens.pad, 'g'), pad).replace(new RegExp(tokens.indent, 'g'), pad + opts.indent);
    };

    if (seen.indexOf(val) !== -1) {
      return '"[Circular]"';
    }

    if (val === null || val === undefined || typeof val === 'number' || typeof val === 'boolean' || typeof val === 'function' || _typeof(val) === 'symbol' || isRegexp(val)) {
      return String(val);
    }

    if (val instanceof Date) {
      return "new Date('".concat(val.toISOString(), "')");
    }

    if (Array.isArray(val)) {
      if (val.length === 0) {
        return '[]';
      }

      seen.push(val);
      const ret = '[' + tokens.newLine + val.map((el, i) => {
        const eol = val.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;
        let value = stringify(el, opts, pad + opts.indent);

        if (opts.transform) {
          value = opts.transform(val, i, value);
        }

        return tokens.indent + value + eol;
      }).join('') + tokens.pad + ']';
      seen.pop();
      return expandWhiteSpace(ret);
    }

    if (isObj(val)) {
      let objKeys = Object.keys(val).concat(getOwnEnumPropSymbols(val));

      if (opts.filter) {
        objKeys = objKeys.filter(el => opts.filter(val, el));
      }

      if (objKeys.length === 0) {
        return '{}';
      }

      seen.push(val);
      const ret = '{' + tokens.newLine + objKeys.map((el, i) => {
        const eol = objKeys.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;
        const isSymbol = _typeof(el) === 'symbol';
        const isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el);
        const key = isSymbol || isClassic ? el : stringify(el, opts);
        let value = stringify(val[el], opts, pad + opts.indent);

        if (opts.transform) {
          value = opts.transform(val, el, value);
        }

        return tokens.indent + String(key) + ': ' + value + eol;
      }).join('') + tokens.pad + '}';
      seen.pop();
      return expandWhiteSpace(ret);
    }

    val = String(val).replace(/[\r\n]/g, x => x === '\n' ? '\\n' : '\\r');

    if (opts.singleQuotes === false) {
      val = val.replace(/"/g, '\\"');
      return "\"".concat(val, "\"");
    }

    val = val.replace(/\\?'/g, '\\\'');
    return "'".concat(val, "'");
  }(val, opts, pad);
};
},{"is-regexp":"node_modules/is-regexp/index.js","is-obj":"node_modules/is-obj/index.js","get-own-enumerable-property-symbols":"node_modules/get-own-enumerable-property-symbols/lib/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _apngJs = _interopRequireDefault(require("apng-js"));

var _stringifyObject = _interopRequireDefault(require("stringify-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPNG = function isPNG(item) {
  return item && item.kind === "file" && item.type === "image/png";
};

var erase = function erase() {
  document.querySelector("#meta-output").textContent = "Not a PNG";
};

var handler = function handler(evt) {
  evt.preventDefault();

  if (evt.type === "drop") {
    console.log(evt.dataTransfer.items);

    if (evt.dataTransfer.items && evt.dataTransfer.items[0] && isPNG(evt.dataTransfer.items[0])) {
      var file = evt.dataTransfer.items[0].getAsFile();
      file.arrayBuffer().then(function (buffer) {
        var apng = (0, _apngJs.default)(buffer);
        var output = (0, _stringifyObject.default)(apng);
        console.log(output);
        document.querySelector("#meta-output").textContent = output;
      });
    } else {
      erase();
    }
  } else {
    erase();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  ["dragover", "drop"].forEach(function (evtType) {
    document.addEventListener(evtType, handler);
  });
});
},{"apng-js":"node_modules/apng-js/lib/index.js","stringify-object":"node_modules/stringify-object/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59354" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/apng-meta-reader.e31bb0bc.js.map