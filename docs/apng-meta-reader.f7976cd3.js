parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZMU7":[function(require,module,exports) {
var define;
var e;!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof e&&e.amd?e([],r):"object"==typeof exports?exports["apng-js"]=r():t["apng-js"]=r()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}return r.m=e,r.c=t,r.p="",r(0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isNotPNG=function(e){return e===o},t.isNotAPNG=function(e){return e===u},t.default=function(e){var t=new Uint8Array(e);if(Array.prototype.some.call(h,function(e,r){return e!==t[r]}))return o;var r=!1;if(l(t,function(e){return!(r="acTL"===e)}),!r)return u;var n=[],i=[],s=null,c=null,v=0,d=new a.APNG;l(t,function(e,t,r,o){var u=new DataView(t.buffer);switch(e){case"IHDR":s=t.subarray(r+8,r+8+o),d.width=u.getUint32(r+8),d.height=u.getUint32(r+12);break;case"acTL":d.numPlays=u.getUint32(r+8+4);break;case"fcTL":c&&(d.frames.push(c),v++),(c=new a.Frame).width=u.getUint32(r+8+4),c.height=u.getUint32(r+8+8),c.left=u.getUint32(r+8+12),c.top=u.getUint32(r+8+16);var h=u.getUint16(r+8+20),l=u.getUint16(r+8+22);0===l&&(l=100),c.delay=1e3*h/l,c.delay<=10&&(c.delay=100),d.playTime+=c.delay,c.disposeOp=u.getUint8(r+8+24),c.blendOp=u.getUint8(r+8+25),c.dataParts=[],0===v&&2===c.disposeOp&&(c.disposeOp=1);break;case"fdAT":c&&c.dataParts.push(t.subarray(r+8+4,r+8+o));break;case"IDAT":c&&c.dataParts.push(t.subarray(r+8,r+8+o));break;case"IEND":i.push(f(t,r,12+o));break;default:n.push(f(t,r,12+o))}}),c&&d.frames.push(c);if(0==d.frames.length)return u;var _=new Blob(n),y=new Blob(i);return d.frames.forEach(function(e){var t=[];t.push(h),s.set(m(e.width),0),s.set(m(e.height),4),t.push(p("IHDR",s)),t.push(_),e.dataParts.forEach(function(e){return t.push(p("IDAT",e))}),t.push(y),e.imageData=new Blob(t,{type:"image/png"}),delete e.dataParts,t=null}),d};var n,i=r(1),s=(n=i)&&n.__esModule?n:{default:n},a=r(2);var o=new Error("Not a PNG"),u=new Error("Not an animated PNG");var h=new Uint8Array([137,80,78,71,13,10,26,10]);function l(e,t){var r=new DataView(e.buffer),n=8,i=void 0,s=void 0,a=void 0;do{s=r.getUint32(n),a=t(i=c(e,n+4,4),e,n,s),n+=12+s}while(!1!==a&&"IEND"!=i&&n<e.length)}function c(e,t,r){var n=Array.prototype.slice.call(e.subarray(t,t+r));return String.fromCharCode.apply(String,n)}function f(e,t,r){var n=new Uint8Array(r);return n.set(e.subarray(t,t+r)),n}var p=function(e,t){var r=e.length+t.length,n=new Uint8Array(r+8),i=new DataView(n.buffer);i.setUint32(0,t.length),n.set(function(e){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(e),4),n.set(t,8);var a=(0,s.default)(n,4,r);return i.setUint32(r+4,a),n},m=function(e){return new Uint8Array([e>>>24&255,e>>>16&255,e>>>8&255,255&e])}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=-1,i=t,s=t+(arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length-t);i<s;i++)n=n>>>8^r[255&(n^e[i])];return-1^n};for(var r=new Uint32Array(256),n=0;n<256;n++){for(var i=n,s=0;s<8;s++)i=0!=(1&i)?3988292384^i>>>1:i>>>1;r[n]=i}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Frame=t.APNG=void 0;var n,i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(3),a=(n=s)&&n.__esModule?n:{default:n};function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.APNG=function(){function e(){o(this,e),this.width=0,this.height=0,this.numPlays=0,this.playTime=0,this.frames=[]}return i(e,[{key:"createImages",value:function(){return Promise.all(this.frames.map(function(e){return e.createImage()}))}},{key:"getPlayer",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.createImages().then(function(){return new a.default(t,e,r)})}}]),e}(),t.Frame=function(){function e(){o(this,e),this.left=0,this.top=0,this.width=0,this.height=0,this.delay=0,this.disposeOp=0,this.blendOp=0,this.imageData=null,this.imageElement=null}return i(e,[{key:"createImage",value:function(){var e=this;return this.imageElement?Promise.resolve():new Promise(function(t,r){var n=URL.createObjectURL(e.imageData);e.imageElement=document.createElement("img"),e.imageElement.onload=function(){URL.revokeObjectURL(n),t()},e.imageElement.onerror=function(){URL.revokeObjectURL(n),e.imageElement=null,r(new Error("Image creation error"))},e.imageElement.src=n})}}]),e}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(4),a=(n=s)&&n.__esModule?n:{default:n};var o=function(e){function t(e,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.playbackRate=1,i._currentFrameNumber=0,i._ended=!1,i._paused=!0,i._numPlays=0,i._apng=e,i.context=r,i.stop(),n&&i.play(),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default),i(t,[{key:"renderNextFrame",value:function(){this._currentFrameNumber=(this._currentFrameNumber+1)%this._apng.frames.length,this._currentFrameNumber===this._apng.frames.length-1&&(this._numPlays++,0!==this._apng.numPlays&&this._numPlays>=this._apng.numPlays&&(this._ended=!0,this._paused=!0)),this._prevFrame&&1==this._prevFrame.disposeOp?this.context.clearRect(this._prevFrame.left,this._prevFrame.top,this._prevFrame.width,this._prevFrame.height):this._prevFrame&&2==this._prevFrame.disposeOp&&this.context.putImageData(this._prevFrameData,this._prevFrame.left,this._prevFrame.top);var e=this.currentFrame;this._prevFrame=e,this._prevFrameData=null,2==e.disposeOp&&(this._prevFrameData=this.context.getImageData(e.left,e.top,e.width,e.height)),0==e.blendOp&&this.context.clearRect(e.left,e.top,e.width,e.height),this.context.drawImage(e.imageElement,e.left,e.top),this.emit("frame",this._currentFrameNumber),this._ended&&this.emit("end")}},{key:"play",value:function(){var e=this;this.emit("play"),this._ended&&this.stop(),this._paused=!1;var t=performance.now()+this.currentFrame.delay/this.playbackRate;requestAnimationFrame(function r(n){if(!e._ended&&!e._paused){if(n>=t){for(;n-t>=e._apng.playTime/e.playbackRate;)t+=e._apng.playTime/e.playbackRate,e._numPlays++;do{e.renderNextFrame(),t+=e.currentFrame.delay/e.playbackRate}while(!e._ended&&n>t)}requestAnimationFrame(r)}})}},{key:"pause",value:function(){this._paused||(this.emit("pause"),this._paused=!0)}},{key:"stop",value:function(){this.emit("stop"),this._numPlays=0,this._ended=!1,this._paused=!0,this._currentFrameNumber=-1,this.context.clearRect(0,0,this._apng.width,this._apng.height),this.renderNextFrame()}},{key:"currentFrameNumber",get:function(){return this._currentFrameNumber}},{key:"currentFrame",get:function(){return this._apng.frames[this._currentFrameNumber]}},{key:"paused",get:function(){return this._paused}},{key:"ended",get:function(){return this._ended}}]),t}();t.default=o},function(e,t){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function i(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}e.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,r,a,o,u,h;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(s(r=this._events[e]))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),r.apply(this,o)}else if(i(r))for(o=Array.prototype.slice.call(arguments,1),a=(h=r.slice()).length,u=0;u<a;u++)h[u].apply(this,o);return!0},r.prototype.addListener=function(e,t){var a;if(!n(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned&&(a=s(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&a>0&&this._events[e].length>a&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){if(!n(t))throw TypeError("listener must be a function");var r=!1;function i(){this.removeListener(e,i),r||(r=!0,t.apply(this,arguments))}return i.listener=t,this.on(e,i),this},r.prototype.removeListener=function(e,t){var r,s,a,o;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(a=(r=this._events[e]).length,s=-1,r===t||n(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(r)){for(o=a;o-- >0;)if(r[o]===t||r[o].listener&&r[o].listener===t){s=o;break}if(s<0)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n(r=this._events[e]))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){return this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(n(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}}])});
},{}],"OZG1":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,i=arguments[3];!function(i){var t=/^(b|B)$/,o={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},n={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function r(e){var i,r,b,a,l,s,d,u,c,p,f,B,v,y,g,m=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},h=[],x=0,M=void 0,w=void 0;if(isNaN(e))throw new TypeError("Invalid number");return r=!0===m.bits,f=!0===m.unix,i=m.base||2,p=void 0!==m.round?m.round:f?1:2,s=void 0!==m.locale?m.locale:"",d=m.localeOptions||{},B=void 0!==m.separator?m.separator:"",v=void 0!==m.spacer?m.spacer:f?"":" ",g=m.symbols||{},y=2===i&&m.standard||"jedec",c=m.output||"string",a=!0===m.fullform,l=m.fullforms instanceof Array?m.fullforms:[],M=void 0!==m.exponent?m.exponent:-1,b=2<i?1e3:1024,(u=(w=Number(e))<0)&&(w=-w),(-1===M||isNaN(M))&&(M=Math.floor(Math.log(w)/Math.log(b)))<0&&(M=0),8<M&&(M=8),"exponent"===c?M:(0===w?(h[0]=0,h[1]=f?"":o[y][r?"bits":"bytes"][M]):(x=w/(2===i?Math.pow(2,10*M):Math.pow(1e3,M)),r&&b<=(x*=8)&&M<8&&(x/=b,M++),h[0]=Number(x.toFixed(0<M?p:0)),h[0]===b&&M<8&&void 0===m.exponent&&(h[0]=1,M++),h[1]=10===i&&1===M?r?"kb":"kB":o[y][r?"bits":"bytes"][M],f&&(h[1]="jedec"===y?h[1].charAt(0):0<M?h[1].replace(/B$/,""):h[1],t.test(h[1])&&(h[0]=Math.floor(h[0]),h[1]=""))),u&&(h[0]=-h[0]),h[1]=g[h[1]]||h[1],!0===s?h[0]=h[0].toLocaleString():0<s.length?h[0]=h[0].toLocaleString(s,d):0<B.length&&(h[0]=h[0].toString().replace(".",B)),"array"===c?h:(a&&(h[1]=l[M]?l[M]:n[y][M]+(r?"bit":"byte")+(1===h[0]?"":"s")),"object"===c?{value:h[0],symbol:h[1]}:h.join(v)))}r.partial=function(e){return function(i){return r(i,e)}},"undefined"!=typeof exports?module.exports=r:"function"==typeof e&&void 0!==e.amd?e(function(){return r}):i.filesize=r}("undefined"!=typeof window?window:i);
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=t(require("apng-js")),n=t(require("filesize"));function t(e){return e&&e.__esModule?e:{default:e}}var a="Please drag and drop APNG file here",r="Not a PNG",i=function(e){return e&&"file"===e.kind&&"image/png"===e.type},o=document.querySelector("#meta-output"),c=document.querySelector("#preview"),f=function(e){u(),c.innerHTML="",o.textContent="".concat(e,", ").concat(a)},u=function(){var e=c.querySelector("img");e&&URL.revokeObjectURL(e.src)},s=function(e){u(),c.innerHTML="";var n=URL.createObjectURL(e),t=document.createElement("img");t.src=n,c.appendChild(t)},d=function(t){if(t&&t instanceof File){var a={filename:t.name,filesize:t.size};t.arrayBuffer().then(function(r){var i=(0,e.default)(r);i instanceof Error?f("Not an APNG"):(Object.assign(a,i),o.textContent="\n      file name: ".concat(a.filename,"\n      file size: ").concat((0,n.default)(a.filesize),"\n      duration (1 loop): ").concat(a.playTime/1e3," s\n      loop: ").concat(0===a.numPlays?"infinite":a.numPlays,"\n      number of frames : ").concat(a.frames.length,"\n      width: ").concat(a.width," px\n      height: ").concat(a.height," px"),s(t))})}},l=function(e){if(e.preventDefault(),e.dataTransfer.items&&e.dataTransfer.items[0]&&i(e.dataTransfer.items[0])){var n=e.dataTransfer.items[0].getAsFile();d(n)}else f(r)};document.addEventListener("DOMContentLoaded",function(){["dragover","drop"].forEach(function(e){document.addEventListener(e,l)})});
},{"apng-js":"ZMU7","filesize":"OZG1"}]},{},["Focm"], null)
//# sourceMappingURL=apng-meta-reader.f7976cd3.js.map