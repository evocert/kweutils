(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getMsgid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return msgid2Orig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return buildArr; });
/* unused harmony export makePluralFunc */
/* unused harmony export getPluralFunc */
/* harmony export (immutable) */ __webpack_exports__["g"] = transformTranslateObj;
/* harmony export (immutable) */ __webpack_exports__["h"] = transformCompactObj;
/* harmony export (immutable) */ __webpack_exports__["b"] = dedentStr;
/* harmony export (immutable) */ __webpack_exports__["f"] = getPluralFnForTrans;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dedent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dedent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dedent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_plural_forms_minimal_safe__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_plural_forms_minimal_safe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_plural_forms_minimal_safe__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var getMsgid = function getMsgid(str, exprs) {
  var result = [];
  var exprsLenght = exprs.length;
  var strLength = str.length;

  for (var i = 0; i < strLength; i++) {
    var expr = i < exprsLenght ? "${".concat(i, "}") : '';
    result.push(str[i] + expr);
  }

  return result.join('');
};

var removeSpaces = function removeSpaces(str) {
  return str.replace(/\s/g, '');
};

var mem = {};

var memoize1 = function memoize1(f) {
  return function (arg) {
    if (mem[arg]) {
      return mem[arg];
    }

    mem[arg] = f(arg);
    return mem[arg];
  };
};

var reg = function reg(i) {
  return new RegExp("\\$\\{(?:[\\s]+?|\\s?)".concat(i, "(?:[\\s]+?|\\s?)}"));
};

var memReg = memoize1(reg);
var msgid2Orig = function msgid2Orig(id, exprs) {
  return exprs.reduce(function (r, expr, i) {
    return r.replace(memReg(i), expr);
  }, id);
};
var buildStr = function buildStr(strs, exprs) {
  return strs.reduce(function (r, s, i) {
    return r + s + (exprs[i] !== undefined ? exprs[i] : '');
  }, '');
};
var buildArr = function buildArr(strs, exprs) {
  return strs.reduce(function (r, s, i) {
    return exprs[i] !== undefined ? r.concat(s, exprs[i]) : r.concat(s);
  }, []);
};

function pluralFnBody(pluralStr) {
  return "return args[+ (".concat(pluralStr, ")];");
}

var fnCache = {};
function makePluralFunc(pluralStr) {
  /* eslint-disable no-new-func */
  var fn = fnCache[pluralStr];

  if (!fn) {
    fn = new Function('n', 'args', pluralFnBody(pluralStr));
    fnCache[pluralStr] = fn;
  }

  return fn;
}
var pluralRegex = /\splural ?=?([\s\S]*);?/;
function getPluralFunc(headers) {
  var pluralFormsHeader = headers['plural-forms'] || headers['Plural-Forms'];

  if (!pluralFormsHeader) {
    throw new Error('po. data should include "language" or "plural-form" header for ngettext');
  }

  var pluralFn = pluralRegex.exec(pluralFormsHeader)[1];

  if (pluralFn[pluralFn.length - 1] === ';') {
    pluralFn = pluralFn.slice(0, -1);
  }

  return pluralFn;
}
var variableREG = /\$\{\s*([.\w+\[\]])*\s*\}/g;

function getObjectKeys(obj) {
  var keys = [];

  for (var key in obj) {
    // eslint-disable-line no-restricted-syntax
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  return keys;
}

function replaceVariables(str, obj) {
  return str.replace(variableREG, function (variable) {
    return "${".concat(obj[removeSpaces(variable)], "}");
  });
}

function getVariablesMap(msgid) {
  var variableNumberMap = {};
  var variables = msgid.match(variableREG);
  if (!variables) return null;

  for (var i = 0; i < variables.length; i++) {
    variableNumberMap[removeSpaces(variables[i])] = i;
  }

  return variableNumberMap;
}

function transformTranslate(translate) {
  var variableNumberMap = getVariablesMap(translate.msgid);

  if (!variableNumberMap) {
    return translate;
  }

  var msgid = replaceVariables(translate.msgid, variableNumberMap);
  var newTranslate = {
    msgid: msgid
  };

  if (translate.msgid_plural) {
    newTranslate.msgid_plural = replaceVariables(translate.msgid_plural, variableNumberMap);
  }

  newTranslate.msgstr = [];
  var transStrs = translate.msgstr;

  for (var i = 0; i < transStrs.length; i++) {
    newTranslate.msgstr.push(replaceVariables(transStrs[i], variableNumberMap));
  }

  newTranslate.comments = translate.comments;
  return newTranslate;
}

function transformTranslateObj(translateObj) {
  var newTranslations = {};
  var transKeys = getObjectKeys(translateObj.translations);

  for (var i = 0; i < transKeys.length; i++) {
    var key = transKeys[i];
    var translation = translateObj.translations[key];
    var newTranslation = {};
    var msgids = getObjectKeys(translation);

    for (var j = 0; j < msgids.length; j++) {
      var msgid = msgids[j];
      var newTranslate = transformTranslate(translation[msgid]);
      newTranslation[newTranslate.msgid] = newTranslate;
    }

    newTranslations[key] = newTranslation;
  }

  translateObj.translations = newTranslations;
  return translateObj;
}

function transformCompactTranslate(msgid, translations) {
  var variableNumberMap = getVariablesMap(msgid);

  if (!variableNumberMap) {
    return [msgid, translations];
  }

  var newMsgid = replaceVariables(msgid, variableNumberMap);
  var newTranslations = translations.map(function (trans) {
    return replaceVariables(trans, variableNumberMap);
  });
  return [newMsgid, newTranslations];
}

function transformCompactObj(compactObj) {
  var newObj = {
    headers: compactObj.headers
  };
  var newContexts = {};
  var keys = getObjectKeys(compactObj.contexts);

  for (var i = 0; i < keys.length; i++) {
    var ctx = keys[i];
    var newContext = {};
    var msgids = getObjectKeys(compactObj.contexts[ctx]);

    for (var j = 0; j < msgids.length; j++) {
      var msgid = msgids[j];
      var translations = compactObj.contexts[ctx][msgid];

      var _transformCompactTran = transformCompactTranslate(msgid, translations),
          _transformCompactTran2 = _slicedToArray(_transformCompactTran, 2),
          newMsgid = _transformCompactTran2[0],
          newTranslations = _transformCompactTran2[1];

      newContext[newMsgid] = newTranslations;
    }

    newContexts[ctx] = newContext;
  }

  newObj.contexts = newContexts;
  return newObj;
}
function dedentStr(rawStr) {
  if (!(typeof rawStr === 'string')) {
    return rawStr;
  }

  if (rawStr.indexOf('\n') === -1) {
    return rawStr;
  }

  return __WEBPACK_IMPORTED_MODULE_0_dedent___default()(rawStr);
}
function getPluralFnForTrans(config) {
  var headers = config.getCurrentLocaleHeaders();
  var language = headers.language || headers.Language;

  if (language) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_plural_forms_minimal_safe__["getPluralFunc"])(language);
  }

  var pluralStr = getPluralFunc(headers);
  return makePluralFunc(pluralStr);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = validateLocaleCode;
/* harmony export (immutable) */ __webpack_exports__["f"] = validateLocaleData;
/* harmony export (immutable) */ __webpack_exports__["g"] = validateLocales;
/* harmony export (immutable) */ __webpack_exports__["b"] = validateNgettextMsgid;
/* harmony export (immutable) */ __webpack_exports__["c"] = validateNgettextNumber;
/* harmony export (immutable) */ __webpack_exports__["d"] = validateNgettextPluralForms;
/* harmony export (immutable) */ __webpack_exports__["a"] = validateLang;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_plural_forms_minimal_safe__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_plural_forms_minimal_safe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_plural_forms_minimal_safe__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function validateLocale(locale, availLocales) {
  if (true) {
    if (!availLocales[locale]) {
      throw new Error("\n                    Locale '".concat(locale, "' is not found in config.\n                    useLocales accepts only existing locales. Use addLocale function before.\n                    Available locales: ").concat(JSON.stringify(availLocales)));
    }
  }
}

function validateLocaleCode(locale) {
  if (true) {
    if (typeof locale !== 'string') {
      throw new Error("Expected locale code to be a string but recieved ".concat(_typeof(locale), " insttead"));
    }
  }
}
function validateLocaleData(data) {
  if (true) {
    // eslint-disable-next-line
    var addLocaleDoc = 'https://ttag.js.org/docs/library-api.html#addlocale';

    if (!data) {
      throw new Error("\n            Locale data should not be empty.\n            see - ".concat(addLocaleDoc, "\n            "));
    }

    if (!data.headers) {
      throw new Error("\n            Locale data should contain headers \"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }

    if (!data.headers['plural-forms'] && !data.headers['Plural-Forms']) {
      throw new Error("\n            Locale data.headers should contain 'Plural-Forms' attribute \"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }

    if (!data.translations && !data.contexts) {
      throw new Error("\n            Locale data should contain translations or contexts property \"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }

    if (data.translations && !Object.keys(data.translations).length) {
      throw new Error("\n            Locale data.translations should have at least 1 key\"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }

    if (data.contexts && !Object.keys(data.contexts).length) {
      throw new Error("\n            Locale data.contexts should have at least 1 key\"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }
  }
}
function validateLocales(locales, availLocales) {
  if (true) {
    if (!Array.isArray(locales)) {
      throw new Error('useLocales accepts only array as the first argument');
    }

    locales.forEach(function (locale) {
      return validateLocale(locale, availLocales);
    });
  }
}
function validateNgettextMsgid(str) {
  if (true) {
    var ngettextDoc = 'https://ttag.js.org/docs/ngettext.html';

    if (!(str.hasOwnProperty('_strs') && str.hasOwnProperty('_exprs'))) {
      throw new Error("The first argument for ngettext must be tagged with 'msgid' tag.\n                see - ".concat(ngettextDoc, ";\n                "));
    }
  }
}
function validateNgettextNumber(n) {
  if (true) {
    var ngettextDoc = 'https://ttag.js.org/docs/ngettext.html';

    if (!(typeof n === 'number')) {
      throw new Error("The last argument to ngettext - '".concat(n, "' expected to be a number. Got '").concat(_typeof(n), "' instead.\n                see - ").concat(ngettextDoc));
    }
  }
}
function validateNgettextPluralForms(expectedFormsCount, actualFormsCount) {
  if (true) {
    if (actualFormsCount !== expectedFormsCount) {
      throw new Error( // eslint-disable-next-line max-len
      "ngettext expects ".concat(expectedFormsCount, " for the current default locale, but received - ").concat(actualFormsCount, "."));
    }
  }
}
function validateLang(lang) {
  if (true) {
    var langs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_plural_forms_minimal_safe__["getAvailLangs"])().join(',');

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_plural_forms_minimal_safe__["hasLang"])(lang)) {
      throw new Error("Unknown lang code - ".concat(lang, ". Lang should be one of: ").concat(langs, "."));
    }
  }
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Config;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validation__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_plural_forms_minimal_safe__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_plural_forms_minimal_safe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_plural_forms_minimal_safe__);



function Config() {
  var _this = this;

  var config = {
    locales: {},
    currentLocales: [],
    currentLocale: 'en',
    dedent: true,
    defaultLang: 'en'
  };

  this.addLocale = function (locale, localeData) {
    if (true) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validation__["e" /* validateLocaleCode */])(locale);
    if (true) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validation__["f" /* validateLocaleData */])(localeData);

    if (localeData.translations) {
      localeData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* transformTranslateObj */])(localeData);
    } else if (localeData.contexts) {
      localeData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* transformCompactObj */])(localeData);
    } else {
      throw new Error('Invalid locale data format');
    }

    config.locales[locale] = localeData;
  };

  this.setCurrentLocale = function (locale) {
    config.currentLocale = locale;
  };

  this.setDedent = function (dedent) {
    config.dedent = dedent;
  };

  this.setCurrentLocales = function (locales) {
    if (true) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validation__["g" /* validateLocales */])(locales, _this.getAvailLocales());
    config.currentLocales = locales;
  };

  this.getAvailLocales = function () {
    return config.locales;
  };

  this.getCurrentLocales = function () {
    return config.currentLocales;
  };

  this.getCurrentLocale = function () {
    return config.currentLocale;
  };

  this.isDedent = function () {
    return config.dedent;
  };

  this.setDefaultLang = function (lang) {
    config.defaultLang = lang;
  };

  this.getDefaultPluralFn = function () {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_plural_forms_minimal_safe__["getPluralFunc"])(config.defaultLang);
  };

  this.getDefaultPluralFormsCount = function () {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_plural_forms_minimal_safe__["getNPlurals"])(config.defaultLang);
  };

  this.getCurrentLocaleHeaders = function () {
    return config.locales[config.currentLocale].headers;
  };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["msgid"] = msgid;
/* harmony export (immutable) */ __webpack_exports__["TTag"] = TTag;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLocale", function() { return addLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gettext", function() { return gettext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jt", function() { return jt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ngettext", function() { return ngettext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDedent", function() { return setDedent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultLang", function() { return setDefaultLang; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocale", function() { return useLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocales", function() { return useLocales; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validation__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(3);




function Context(context) {
  if (true) {
    if (typeof context !== 'string') {
      throw new Error('String type is expected as a first ' + 'argument to c() function.');
    }
  }

  this.getContext = function () {
    return context;
  };
}

var getTransContext = function getTransContext(obj) {
  if (obj instanceof Context) {
    return obj.getContext();
  }

  return '';
};

function isFuzzy(translationObj) {
  return translationObj && translationObj.comments && translationObj.comments.flag === 'fuzzy';
}

function hasTranslations(msgstr) {
  if (!msgstr) return false;

  for (var i = 0; i < msgstr.length; i++) {
    if (!msgstr[i].length) return false;
  }

  return true;
}

var separator = /(\${\s*\d+\s*})/g;
var slotIdRegexp = /\${\s*(\d+)\s*}/;
function msgid(strings) {
  /* eslint-disable no-new-wrappers */
  if (strings && strings.reduce) {
    for (var _len = arguments.length, exprs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      exprs[_key - 1] = arguments[_key];
    }

    var result = new String(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* buildStr */])(strings, exprs));
    result._strs = strings;
    result._exprs = exprs;
    return result;
  }

  return strings;
}
function TTag() {
  var conf = new __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]();

  var maybeDedent = function maybeDedent(str) {
    return conf.isDedent() ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* dedentStr */])(str) : str;
  };

  var findTransObj = function findTransObj(locale, str, ctx) {
    var locales = conf.getAvailLocales();
    var localeData = locales[locale];
    if (!localeData) return null; // verbose format

    if (localeData.translations) {
      var translations = localeData.translations[ctx] || localeData.translations[''];
      var translation = translations && translations[str];

      if (translation && !isFuzzy(translation) && hasTranslations(translation.msgstr)) {
        return translation.msgstr;
      }
    } // compact format


    if (localeData.contexts) {
      var _translations = localeData.contexts[ctx] || localeData.contexts[''];

      var _translation = _translations && _translations[str];

      if (_translation && hasTranslations(_translation)) {
        return _translation;
      }
    }

    return null;
  };

  var findTranslation = function findTranslation(str, ctx) {
    var locales = conf.getCurrentLocales();

    if (locales.length) {
      for (var i = 0; i < locales.length; i++) {
        var translation = findTransObj(locales[i], str, ctx);

        if (translation) {
          conf.setCurrentLocale(locales[i]);
          return translation;
        }
      }
    }

    return findTransObj(conf.getCurrentLocale(), str, ctx);
  };

  function setDefaultLang(lang) {
    if (true) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validation__["a" /* validateLang */])(lang);
    conf.setDefaultLang(lang);
  }

  function useLocales(locales) {
    conf.setCurrentLocales(locales);
  }

  function setDedent(value) {
    conf.setDedent(Boolean(value));
  }

  function useLocale(locale) {
    conf.setCurrentLocale(locale);
  }

  function addLocale(locale, data) {
    conf.addLocale(locale, data);
  }

  function t(strings) {
    var result = strings;

    if (strings && strings.reduce) {
      for (var _len2 = arguments.length, exprs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        exprs[_key2 - 1] = arguments[_key2];
      }

      var id = maybeDedent(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* getMsgid */])(strings, exprs));
      var context = getTransContext(this);
      var trans = findTranslation(id, context);
      result = trans ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* msgid2Orig */])(trans[0], exprs) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* buildStr */])(strings, exprs);
    }

    return maybeDedent(result);
  }

  function jt(strings) {
    for (var _len3 = arguments.length, exprs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      exprs[_key3 - 1] = arguments[_key3];
    }

    if (strings && strings.reduce) {
      var id = maybeDedent(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* getMsgid */])(strings, exprs));
      var context = getTransContext(this);
      var trans = findTranslation(id, context);
      if (!trans) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* buildArr */])(strings, exprs); // splits string & capturing group into tokens
      //

      var translatedTokens = trans[0].split(separator);
      return translatedTokens.map(function (token) {
        var slotIdMatch = token.match(slotIdRegexp); // slotIdMatch is not null only when the token is a variable slot (${xx})

        return slotIdMatch ? exprs[+slotIdMatch[1]] : token;
      });
    }

    return strings;
  }

  function ngettext() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (true) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validation__["b" /* validateNgettextMsgid */])(args[0]);
    var id = maybeDedent(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* getMsgid */])(args[0]._strs, args[0]._exprs));
    var n = args[args.length - 1];
    if (true) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validation__["c" /* validateNgettextNumber */])(n);
    var forms = args.slice(1, -1);
    forms.unshift(args[0].toString());

    if (true) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validation__["d" /* validateNgettextPluralForms */])(conf.getDefaultPluralFormsCount(), forms.length);
    }

    var trans = findTranslation(id, getTransContext(this));

    if (trans) {
      var _pluralFn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* getPluralFnForTrans */])(conf);

      return maybeDedent(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* msgid2Orig */])(_pluralFn(n, trans), args[0]._exprs));
    }

    var pluralFn = conf.getDefaultPluralFn();
    return maybeDedent(pluralFn(n, forms));
  }

  function gettext(id) {
    var context = getTransContext(this);
    var trans = findTranslation(id, context);
    return trans ? trans[0] : id;
  }

  var _ = gettext;

  function c(context) {
    var ctx = new Context(context);
    return {
      t: t.bind(ctx),
      jt: jt.bind(ctx),
      gettext: gettext.bind(ctx),
      ngettext: ngettext.bind(ctx)
    };
  }

  return {
    _: _,
    addLocale: addLocale,
    c: c,
    gettext: gettext,
    jt: jt,
    ngettext: ngettext,
    setDedent: setDedent,
    setDefaultLang: setDefaultLang,
    t: t,
    useLocale: useLocale,
    useLocales: useLocales
  };
}
var globalTTag = new TTag();
var _ = globalTTag._;
var addLocale = globalTTag.addLocale;
var c = globalTTag.c;
var gettext = globalTTag.gettext;
var jt = globalTTag.jt;
var ngettext = globalTTag.ngettext;
var setDedent = globalTTag.setDedent;
var setDefaultLang = globalTTag.setDefaultLang;
var t = globalTTag.t;
var useLocale = globalTTag.useLocale;
var useLocales = globalTTag.useLocales;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dedent(strings) {

  var raw = void 0;
  if (typeof strings === "string") {
    // dedent can be used as a plain function
    raw = [strings];
  } else {
    raw = strings.raw;
  }

  // first, perform interpolation
  var result = "";
  for (var i = 0; i < raw.length; i++) {
    result += raw[i].
    // join lines when there is a suppressed newline
    replace(/\\\n[ \t]*/g, "").

    // handle escaped backticks
    replace(/\\`/g, "`");

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
    }
  }

  // now strip indentation
  var lines = result.split("\n");
  var mindent = null;
  lines.forEach(function (l) {
    var m = l.match(/^(\s+)\S+/);
    if (m) {
      var indent = m[1].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    result = lines.map(function (l) {
      return l[0] === " " ? l.slice(mindent) : l;
    }).join("\n");
  }

  // dedent eats leading and trailing whitespace too
  result = result.trim();

  // handle escaped newlines at the end to ensure they don't get stripped too
  return result.replace(/\\n/g, "\n");
}

if (true) {
  module.exports = dedent;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0});var n=/(\w+)[-_].*/;function f(f,r){if(r[f])return r[f];var t=f.match(n);if(!t)throw new Error("Can't find lang or lcale with code "+f);return r[t[1]]}function r(n){return n>1}function t(n){return 1!==n}function u(n){return 0}var e={ach:{n:2,f:r},af:{n:2,f:t},ak:{n:2,f:r},am:{n:2,f:r},an:{n:2,f:t},ar:{n:6,f:function(n){return 0===n?0:1===n?1:2===n?2:n%100>=3&&n%100<=10?3:n%100>=11?4:5}},arn:{n:2,f:r},ast:{n:2,f:t},ay:{n:1,f:u},az:{n:2,f:t},be:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},bg:{n:2,f:t},bn:{n:2,f:t},bo:{n:1,f:u},br:{n:2,f:r},brx:{n:2,f:t},bs:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},ca:{n:2,f:t},cgg:{n:1,f:u},cs:{n:3,f:function(n){return 1===n?0:n>=2&&n<=4?1:2}},csb:{n:3,f:function(n){return 1===n?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},cy:{n:4,f:function(n){return 1===n?0:2===n?1:8!==n&&11!==n?2:3}},da:{n:2,f:t},de:{n:2,f:t},doi:{n:2,f:t},dz:{n:1,f:u},el:{n:2,f:t},en:{n:2,f:t},eo:{n:2,f:t},es:{n:2,f:t},et:{n:2,f:t},eu:{n:2,f:t},fa:{n:1,f:u},ff:{n:2,f:t},fi:{n:2,f:t},fil:{n:2,f:r},fo:{n:2,f:t},fr:{n:2,f:r},fur:{n:2,f:t},fy:{n:2,f:t},ga:{n:5,f:function(n){return 1===n?0:2===n?1:n<7?2:n<11?3:4}},gd:{n:4,f:function(n){return 1===n||11===n?0:2===n||12===n?1:n>2&&n<20?2:3}},gl:{n:2,f:t},gu:{n:2,f:t},gun:{n:2,f:r},ha:{n:2,f:t},he:{n:2,f:t},hi:{n:2,f:t},hne:{n:2,f:t},hr:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},hu:{n:2,f:t},hy:{n:2,f:t},id:{n:1,f:u},is:{n:2,f:function(n){return n%10!=1||n%100==11}},it:{n:2,f:t},ja:{n:1,f:u},jbo:{n:1,f:u},jv:{n:2,f:function(n){return 0!==n}},ka:{n:1,f:u},kab:{n:2,f:t},kk:{n:1,f:u},km:{n:1,f:u},kn:{n:2,f:t},ko:{n:1,f:u},ku:{n:2,f:t},kw:{n:4,f:function(n){return 1===n?0:2===n?1:3===n?2:3}},ky:{n:1,f:u},lb:{n:2,f:t},ln:{n:2,f:r},lo:{n:1,f:u},lt:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&(n%100<10||n%100>=20)?1:2}},lv:{n:3,f:function(n){return n%10==1&&n%100!=11?0:0!==n?1:2}},mai:{n:2,f:t},mfe:{n:2,f:r},mg:{n:2,f:r},mi:{n:2,f:r},mk:{n:2,f:function(n){return 1===n||n%10==1?0:1}},ml:{n:2,f:t},mn:{n:2,f:t},mni:{n:2,f:t},mnk:{n:3,f:function(n){return 0===n?0:1===n?1:2}},mr:{n:2,f:t},ms:{n:1,f:u},mt:{n:4,f:function(n){return 1===n?0:0===n||n%100>1&&n%100<11?1:n%100>10&&n%100<20?2:3}},my:{n:1,f:u},nah:{n:2,f:t},nap:{n:2,f:t},nb:{n:2,f:t},ne:{n:2,f:t},nl:{n:2,f:t},nn:{n:2,f:t},no:{n:2,f:t},nso:{n:2,f:t},oc:{n:2,f:r},or:{n:2,f:t},pa:{n:2,f:t},pap:{n:2,f:t},pl:{n:3,f:function(n){return 1===n?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},pms:{n:2,f:t},ps:{n:2,f:t},pt:{n:2,f:t},rm:{n:2,f:t},ro:{n:3,f:function(n){return 1===n?0:0===n||n%100>0&&n%100<20?1:2}},ru:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},rw:{n:2,f:t},sah:{n:1,f:u},sat:{n:2,f:t},sco:{n:2,f:t},sd:{n:2,f:t},se:{n:2,f:t},si:{n:2,f:t},sk:{n:3,f:function(n){return 1===n?0:n>=2&&n<=4?1:2}},sl:{n:4,f:function(n){return n%100==1?1:n%100==2?2:n%100==3||n%100==4?3:0}},so:{n:2,f:t},son:{n:2,f:t},sq:{n:2,f:t},sr:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},su:{n:1,f:u},sv:{n:2,f:t},sw:{n:2,f:t},ta:{n:2,f:t},te:{n:2,f:t},tg:{n:2,f:r},th:{n:1,f:u},ti:{n:2,f:r},tk:{n:2,f:t},tr:{n:2,f:r},tt:{n:1,f:u},ug:{n:1,f:u},uk:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},ur:{n:2,f:t},uz:{n:2,f:r},vi:{n:1,f:u},wa:{n:2,f:r},wo:{n:1,f:u},yo:{n:2,f:t},zh:{n:1,f:u}};function o(n){return f(n,e).n}var i={};function c(n){if(i[n])return i[n];var r=f(n,e),t=function(n,f){return f[+r.f(n)]};return i[n]=t,t}function a(n){try{return f(n,e),!0}catch(n){return!1}}function s(){return Object.keys(e)}exports.getNPlurals=o,exports.getPluralFunc=c,exports.hasLang=a,exports.getAvailLangs=s;


/***/ })
/******/ ]);
});