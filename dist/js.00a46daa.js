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
})({"js/index.js":[function(require,module,exports) {
// DragBtn
var historyWrap = document.querySelector('#history-wrap');
var dragArea = document.querySelector('.drag-area');
var header = document.querySelector('#header');
var middleText = document.querySelector('.middle--text');
var dayWrap = document.querySelector('.day-use__wrap');
var isDown = false;
var initY, firstY; // goalBtn

var goalWrap = document.querySelector('.goal-wrap');
var goalSlider = document.querySelector('.goal-slider');
var isLeft = false;
var initX, firstX; // day-money

var moneyWrap = document.querySelector('.day-money-wrap');
var moneySlider = document.querySelector('.day-money-slider');
var nav = document.querySelector('#nav');
var moneyDown = false;
var moneyY, firstMoney; // let moneyMove = false
// historyWrap event

dragArea.addEventListener('mousedown', function (e) {
  e.stopPropagation();
  isDown = true;
  initY = historyWrap.offsetTop;
  firstY = e.pageY;
  dragArea.style.cursor = 'grab';
  dragArea.addEventListener('mousemove', dragIt, false);
  window.addEventListener('mouseup', function () {
    dragArea.removeEventListener('mousemove', dragIt, false);
    dragArea.style.cursor = 'Default';
  }, false);
});
var section = document.querySelector('section');
var initHeight = section.offsetHeight - 163;

var dragIt = function dragIt(e) {
  e.stopPropagation();
  historyWrap.style.top = initY + e.pageY - firstY + 'px'; // console.log(e.pageY)
  // console.log(firstY)

  dragArea.style.cursor = 'grabbbing';

  if (parseInt(historyWrap.style.top) < 349) {
    moneySlider.style.maxHeight = initHeight - parseInt(historyWrap.style.top) + 'px';
  }

  checkboundary(e);
};

var checkboundary = function checkboundary() {
  var headerOuter = header.getBoundingClientRect();
  var historyInner = historyWrap.getBoundingClientRect();
  var adOuter = middleText.getBoundingClientRect();
  var windowY = window.scrollY; // console.log(windowY)

  if (windowY > 0) {
    if (historyInner.top <= headerOuter.bottom) {
      historyWrap.style.top = "".concat(headerOuter.top + windowY, "px");
    } else if (historyInner.top >= adOuter.bottom) {
      historyWrap.style.top = "".concat(adOuter.bottom + windowY - 50, "px");
    }
  } else {
    if (historyInner.top <= headerOuter.bottom) {
      historyWrap.style.top = "".concat(headerOuter.top, "px");
    } else if (historyInner.top >= adOuter.bottom) {
      historyWrap.style.top = "".concat(adOuter.bottom - 50, "px");
    }
  }
}; // goal Event


goalWrap.addEventListener('mousedown', function (e) {
  e.stopPropagation();
  isLeft = true;
  initX = goalSlider.offsetLeft;
  firstX = e.pageX;
  goalWrap.style.cursor = 'grab';
  goalWrap.addEventListener('mousemove', dragLeft, false);
  window.addEventListener('mouseup', function () {
    goalWrap.removeEventListener('mousemove', dragLeft, false);
    goalWrap.style.cursor = 'Default';
  }, false);
});

var dragLeft = function dragLeft(e) {
  e.stopPropagation();
  goalSlider.style.left = initX + e.pageX - firstX + 'px';
  goalWrap.style.cursor = 'grabbing';
  checkGoalBoundary();
};

var checkGoalBoundary = function checkGoalBoundary() {
  var goalWrapOuter = goalWrap.getBoundingClientRect();
  var goalSliderInner = goalSlider.getBoundingClientRect();

  if (goalSliderInner.right <= goalWrapOuter.right) {
    goalSlider.style.left = "".concat(goalWrapOuter.width - goalSliderInner.width - 10, "px");
  } else if (parseInt(goalSlider.style.left) >= 0) {
    goalSlider.style.left = "0px";
  }
};
/* 

   ///////// PopUp 
  
*/


var graphBtn = document.querySelector('.graph-btn');
var closeBtn = document.querySelector('.chart-close');
var popup = document.querySelector('.popup-chart');
var popupSlide = document.querySelector('.popup-slide');
var popupInitY,
    popupDown = false,
    firstPopup;
closeBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  popup.classList.add('hide');
  setTimeout(function () {
    popup.classList.add('display-none');
  }, 300);
});
graphBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  popup.classList.remove('hide');
  popup.classList.remove('display-none');
  popupInit();
}); // Popup drag event

popup.addEventListener('mousedown', function (e) {
  e.stopPropagation();
  popupDown = true;
  firstPopup = e.pageY;
  popupInitY = popupSlide.offsetTop;
  popup.style.cursor = 'grab';
  popup.addEventListener('mousemove', dragPopup, false);
});
popup.addEventListener('mouseup', function (e) {
  popupDown = false;
  popup.style.cursor = 'Default'; // console.log(e)
});

var popupInit = function popupInit() {
  popupSlide.style.top = 0;
};

var dragPopup = function dragPopup(e) {
  if (!popupDown) return;
  popup.style.cursor = 'grabbing';
  popupSlide.style.top = popupInitY + e.pageY - firstPopup + 'px';
  popupBoundary();
};

var popupBoundary = function popupBoundary() {
  var outerPopup = popup.getBoundingClientRect();
  var innerPopup = popupSlide.getBoundingClientRect();
  var navTop = nav.getBoundingClientRect();

  if (parseInt(popupSlide.style.top) >= 0) {
    popupSlide.style.top = '0px';
  } else if (innerPopup.bottom + navTop.height < outerPopup.bottom) {
    popupSlide.style.top = outerPopup.height - innerPopup.height - navTop.height + 'px';
  }
};
/* 

    /////// swiper js 

*/
// const swiper = new Swiper('.my-swiper', {
//   direction: 'horizontal',
//   touchStartPreventDefault: false,
//   preventClicks: false,
//   pagination: {
//     el: '.swiper-pagination',
//   },
//   touchRatio: 0.05,
// })

/* 

    /////////  input range 

*/


var rangeBtn = document.querySelector('.section1 .account-range');
var progressbar = document.querySelector('.section1 .progress__bar'); // console.log(progressbar)

rangeBtn.oninput = function () {
  var value = rangeBtn.value;
  progressbar.style.width = value + '%';
};

var rangeBtn2 = document.querySelector('.section2 .account-range');
var progressbar2 = document.querySelector('.section2 .progress__bar');

rangeBtn2.oninput = function () {
  var value = rangeBtn2.value;
  progressbar2.style.width = value + '%';
};
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54773" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map