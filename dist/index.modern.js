import React, { useEffect, useContext, useRef, useState } from 'react';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment$1=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment$1,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

function get(object, path, defaultValue) {
  path = replaceArray(path);
  var parts = path.split(".").filter(Boolean);
  if (parts.length === 0) return object;

  for (var i = 0, l = parts.length - 1; i < l; i++) {
    var part = parts[i];
    var current = object[part];

    if (current && typeof current === "object") {
      object = current;
    } else if (current === undefined || current === null) {
      object = object[part] = {};
    } else {
      throw new Error("Invalid Path");
    }
  }

  var lastPart = parts[parts.length - 1];
  var value = object[lastPart];
  value = value !== undefined ? value : defaultValue;
  object[lastPart] = value;
  return value;
}
function replaceArray(path) {
  return path.replace(/^\./, "").replace(/\[/g, ".").replace(/]/g, "");
}
function set(object, path, value) {
  path = replaceArray(path);
  var parts = path.split(".").filter(Boolean);
  if (parts.length === 0) return;

  for (var i = 0, l = parts.length - 1; i < l; i++) {
    var part = parts[i];
    var current = object[part];

    if (current && typeof current === "object") {
      object = current;
    } else if (current === undefined || current === null) {
      object = object[part] = {};
    } else {
      throw new Error("Invalid Path");
    }
  }

  object[parts[parts.length - 1]] = value;
  return value;
}

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

// Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
function _forTo(array, body, check) {
	var i = -1, pact, reject;
	function _cycle(result) {
		try {
			while (++i < array.length && (!check || !check())) {
				result = body(i);
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
						return;
					}
				}
			}
			if (pact) {
				_settle(pact, 1, result);
			} else {
				pact = result;
			}
		} catch (e) {
			_settle(pact || (pact = new _Pact()), 2, e);
		}
	}
	_cycle();
	return pact;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

// Asynchronously iterate through an object's values
// Uses for...of if the runtime supports it, otherwise iterates until length on a copy
function _forOf(target, body, check) {
	if (typeof target[_iteratorSymbol] === "function") {
		var iterator = target[_iteratorSymbol](), step, pact, reject;
		function _cycle(result) {
			try {
				while (!(step = iterator.next()).done && (!check || !check())) {
					result = body(step.value);
					if (result && result.then) {
						if (_isSettledPact(result)) {
							result = result.v;
						} else {
							result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
							return;
						}
					}
				}
				if (pact) {
					_settle(pact, 1, result);
				} else {
					pact = result;
				}
			} catch (e) {
				_settle(pact || (pact = new _Pact()), 2, e);
			}
		}
		_cycle();
		if (iterator.return) {
			var _fixup = function(value) {
				try {
					if (!step.done) {
						iterator.return();
					}
				} catch(e) {
				}
				return value;
			};
			if (pact && pact.then) {
				return pact.then(_fixup, function(e) {
					throw _fixup(e);
				});
			}
			_fixup();
		}
		return pact;
	}
	// No support for Symbol.iterator
	if (!("length" in target)) {
		throw new TypeError("Object is not iterable");
	}
	// Handle live collections properly
	var values = [];
	for (var i = 0; i < target.length; i++) {
		values.push(target[i]);
	}
	return _forTo(values, function(i) { return body(values[i]); }, check);
}

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var EventEntry = /*#__PURE__*/function () {
  function EventEntry() {
    this.children = new Map();
    this.handlers = [];
    this.allBelow = [];
  }

  var _proto = EventEntry.prototype;

  _proto.getChild = function getChild(key) {
    var result;
    if (this.children.has(key)) return this.children.get(key);
    this.children.set(key, result = new EventEntry());
    return result;
  };

  _createClass(EventEntry, [{
    key: "all",
    get: function get() {
      return this._all = this._all || new EventEntry();
    }
  }]);

  return EventEntry;
}();
var Events = /*#__PURE__*/function () {
  function Events(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$delimiter = _ref.delimiter,
        delimiter = _ref$delimiter === void 0 ? "." : _ref$delimiter,
        _ref$wildcard = _ref.wildcard,
        wildcard = _ref$wildcard === void 0 ? "*" : _ref$wildcard,
        _ref$prepareHandlers = _ref.prepareHandlers,
        prepareHandlers = _ref$prepareHandlers === void 0 ? function (v) {
      return v;
    } : _ref$prepareHandlers,
        _ref$storeHandlers = _ref.storeHandlers,
        storeHandlers = _ref$storeHandlers === void 0 ? function (v) {
      return v;
    } : _ref$storeHandlers;

    this.delimiter = delimiter;
    this.wildcard = wildcard;
    this.doubleWild = "" + wildcard + wildcard;
    this.events = new EventEntry();
    this.prepareHandlers = prepareHandlers;
    this.storeHandlers = storeHandlers;
  }

  var _proto2 = Events.prototype;

  _proto2.on = function on(name, handler) {
    var parts = name.split(this.delimiter);
    var scan = this.events;

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      switch (part) {
        case this.wildcard:
          scan = scan.all;
          break;

        case this.doubleWild:
          scan.allBelow.push(handler);
          scan.allBelow = this.storeHandlers(scan.allBelow);
          return;

        default:
          scan = scan.getChild(part);
          break;
      }
    }

    scan.handlers.push(handler);
    scan.handlers = this.storeHandlers(scan.handlers);
  };

  _proto2.once = function once(name, handler) {
    var self = this;
    self.on(name, process);

    function process() {
      self.off(name, process);
      handler.apply(void 0, arguments);
    }
  };

  _proto2.off = function off(name, handler) {
    var parts = name.split(this.delimiter);
    var scan = this.events;

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      switch (part) {
        case this.wildcard:
          scan = scan.all;
          break;

        case this.doubleWild:
          {
            if (handler === undefined) {
              scan.allBelow = [];
              return;
            }

            var idx = scan.allBelow.indexOf(handler);
            if (idx === -1) return;
            scan.allBelow.splice(idx, 1);
            return;
          }

        default:
          scan = scan.getChild(part);
          break;
      }
    }

    if (handler !== undefined) {
      var _idx = scan.handlers.indexOf(handler);

      if (_idx === -1) return;
      scan.handlers.splice(_idx, 1);
    } else {
      scan.handlers = [];
    }
  };

  _proto2._emit = function _emit(scan, parts, index, handlers) {
    if (index >= parts.length) {
      handlers.push.apply(handlers, scan.handlers);
      return;
    }

    handlers.push.apply(handlers, scan.allBelow);

    this._emit(scan.all, parts, index + 1, handlers);

    this._emit(scan.getChild(parts[index]), parts, index + 1, handlers);
  };

  _proto2._callHandlers = function _callHandlers(handlerList, params) {
    for (var _iterator = _createForOfIteratorHelperLoose(handlerList), _step; !(_step = _iterator()).done;) {
      var handler = _step.value;
      handler.apply(this, params);
    }
  };

  _proto2._callHandlersAsync = function _callHandlersAsync(handlerList, params) {
    try {
      var _this2 = this;

      var _temp3 = _forOf(handlerList, function (handler) {
        return Promise.resolve(handler.apply(_this2, params)).then(function () {});
      });

      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto2._callHandlersAsyncAtOnce = function _callHandlersAsyncAtOnce(handlerList, params) {
    try {
      var _this4 = this;

      var promises = [];

      for (var _iterator2 = _createForOfIteratorHelperLoose(handlerList), _step2; !(_step2 = _iterator2()).done;) {
        var handler = _step2.value;
        promises.push(Promise.resolve(handler.apply(_this4, params)));
      }

      return Promise.resolve(Promise.all(promises)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto2.emit = function emit(event) {
    var handlers = [];
    this.event = event;
    var parts = event.split(this.delimiter);

    this._emit(this.events, parts, 0, handlers);

    var toExecute = this.prepareHandlers(handlers);

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    this._callHandlers(toExecute, params);

    return params;
  };

  _proto2.emitAsync = function emitAsync(event) {
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }

    try {
      var _this6 = this;

      var _handlers = [];
      _this6.event = event;
      var parts = event.split(_this6.delimiter);

      _this6._emit(_this6.events, parts, 0, _handlers);

      var toExecute = _this6.prepareHandlers(_handlers);

      return Promise.resolve(_this6._callHandlersAsync(toExecute, params)).then(function () {
        return params;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto2.emitAtOnce = function emitAtOnce(event) {
    for (var _len3 = arguments.length, params = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      params[_key3 - 1] = arguments[_key3];
    }

    try {
      var _this8 = this;

      var _handlers2 = [];
      _this8.event = event;
      var parts = event.split(_this8.delimiter);

      _this8._emit(_this8.events, parts, 0, _handlers2);

      var toExecute = _this8.prepareHandlers(_handlers2);

      return Promise.resolve(_this8._callHandlersAsyncAtOnce(toExecute, params)).then(function () {
        return params;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Events;
}();
Events.prototype.addEventListener = Events.prototype.on;
Events.prototype.removeEventListener = Events.prototype.off;
Events.prototype.addListener = Events.prototype.on;
Events.prototype.removeListener = Events.prototype.off;

var targetEvents = new Events();
var targetIds = new WeakMap();

function ensureArray(v) {
  return (Array.isArray(v) ? v : [v]).filter(Boolean);
}

function useEvent(pattern, handler, context) {
  if (context) {
    handler = handler.bind(context);
  }

  useEffect(function () {
    ensureArray(pattern).forEach(function (pattern) {
      return targetEvents.on(pattern, handler);
    });
    return function () {
      ensureArray(pattern).forEach(function (pattern) {
        return targetEvents.off(pattern, handler);
      });
    };
  }, [pattern]);
}
function getPath(property) {
  return replaceArray(property).split(".").filter(Boolean);
}
var patterns = new Map();
function getPatterns(target, path) {
  var id = "" + targetIds.get(target);
  var key = id + "." + path.join(".");
  if (patterns.has(key)) return patterns.get(key);
  var output = [];
  var current = path[0];
  output.push("" + current);

  for (var i = 1, l = path.length; i < l; i++) {
    current = current + "." + path[i];
    output.push(current);
  }

  patterns.set(key, output);
  return output;
}
function standardExtract(event) {
  if (!event) return;
  if (event.target) return event.target.value;
  return event;
}
function returnValue(v) {
  return v;
}

var stateId = 0;
var nextId = 0;
var refreshId = 0;
var IndexContext = React.createContext(0);
function useIndex() {
  return useContext(IndexContext);
}

function Dummy(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Fragment, null, children);
}

function noop() {}

function createState(name) {
  return new State(name);
}

function emit(target, path, property, value) {
  targetEvents.emit("" + [].concat(path, getPath(property)).filter(Boolean).join("."), value);
}

function getTargetFrom(property, target, path, stack) {
  for (var i = 0; i < property.length && i < stack.length - 1; i++) {
    if (property[i] === "^") {
      var step = stack[stack.length - 2 - i];
      target = step.target;
      path = step.path;
    } else {
      break;
    }
  }

  return [property.replace(/^\^*/g, ""), target, path];
}

var useTargetContext = Symbol("useTargetContext");

var State = /*#__PURE__*/function () {
  var _proto = State.prototype;

  _proto[useTargetContext] = function () {
    return useContext(this.context);
  };

  _proto.useBinding = function useBinding(property, _temp) {
    var _ref3;

    var _ref2 = _temp === void 0 ? {} : _temp,
        defaultValue = _ref2.defaultValue,
        _ref2$transformIn = _ref2.transformIn,
        transformIn = _ref2$transformIn === void 0 ? returnValue : _ref2$transformIn,
        _ref2$transformOut = _ref2.transformOut,
        transformOut = _ref2$transformOut === void 0 ? returnValue : _ref2$transformOut,
        _ref2$extract = _ref2.extract,
        extract = _ref2$extract === void 0 ? standardExtract : _ref2$extract,
        _ref2$attribute = _ref2.attribute,
        attribute = _ref2$attribute === void 0 ? "value" : _ref2$attribute,
        _ref2$event = _ref2.event,
        event = _ref2$event === void 0 ? "onChange" : _ref2$event,
        target = _ref2.target;

    var _this$useTargetContex = this[useTargetContext](),
        existingTarget = _this$useTargetContex.target,
        path = _this$useTargetContex.path,
        stack = _this$useTargetContex.stack;

    target = target || existingTarget;

    var _getTargetFrom = getTargetFrom(property, target, path, stack);

    property = _getTargetFrom[0];
    target = _getTargetFrom[1];
    path = _getTargetFrom[2];
    var value = useRef(transformIn(get(target, property, defaultValue)));
    useEvent(getPatterns(target, [].concat(path, getPath(property), ["**"])), update);

    var _useState2 = useState(-1),
        refresh = _useState2[1];

    var currentRefresh = useRef();
    React.useEffect(function () {
      return function () {
        currentRefresh.current = noop;
      };
    }, []);
    currentRefresh.current = refresh;
    return _ref3 = {}, _ref3[attribute] = value.current, _ref3[event] = updateValue, _ref3;

    function update() {
      value.current = transformIn(get(target, property, defaultValue));
      currentRefresh.current(refreshId++);
    }

    function updateValue() {
      var newValue = transformOut(extract.apply(void 0, arguments));
      set(target, property, newValue);
      emit(target, path, property, newValue);
    }
  };

  function State(name) {
    this.Bind = Bind;
    this.Bound = Bound;
    this.name = name;
    this.id = stateId++;
    this.context = React.createContext({
      target: null,
      path: [],
      stack: []
    });
    this.Bind = this.Bind.bind(this);
    this.Bound = this.Bound.bind(this);
    this.bind = this.bind.bind(this);
    this.useState = this.useState.bind(this);
    this.useCurrentPath = this.useCurrentPath.bind(this);
    this.useCurrentTarget = this.useCurrentTarget.bind(this);
  }

  _proto.useState = function useState$1(property, defaultValue, target) {
    if (property === void 0) {
      property = "";
    }

    var _this$useTargetContex2 = this[useTargetContext](),
        existingTarget = _this$useTargetContex2.target,
        path = _this$useTargetContex2.path,
        stack = _this$useTargetContex2.stack;

    target = target || existingTarget;

    var _getTargetFrom2 = getTargetFrom(property, target, path, stack);

    property = _getTargetFrom2[0];
    target = _getTargetFrom2[1];
    path = _getTargetFrom2[2];
    var value = get(target, property, defaultValue);

    var _useState3 = useState(-1),
        id = _useState3[0],
        refresh = _useState3[1];

    var currentRefresh = useRef();
    React.useEffect(function () {
      return function () {
        currentRefresh.current = noop;
      };
    }, []);
    currentRefresh.current = refresh;
    useEvent(getPatterns(target, [].concat(path, getPath(property))), update);
    updateValue.set = updateMany;
    return [value, updateValue, id];

    function update() {
      currentRefresh.current(refreshId++);
    }

    function updateValue(newValue) {
      if (typeof newValue === "function") {
        newValue = newValue(get(target, property, defaultValue));
      }

      set(target, property, newValue);
      emit(target, path, property, newValue);
    }

    function updateMany(newValue) {
      recurseSet(newValue, value, [].concat(path, getPath(property)));
    }
  };

  _proto.useSetter = function useSetter(property, target) {
    if (property === void 0) {
      property = "";
    }

    var _this$useTargetContex3 = this[useTargetContext](),
        existingTarget = _this$useTargetContex3.target,
        path = _this$useTargetContex3.path,
        stack = _this$useTargetContex3.stack;

    target = target || existingTarget;

    var _getTargetFrom3 = getTargetFrom(property, target, path, stack);

    property = _getTargetFrom3[0];
    target = _getTargetFrom3[1];
    path = _getTargetFrom3[2];
    updateValue.set = updateMany;
    return updateValue;

    function updateValue(newValue) {
      if (typeof newValue === "function") {
        newValue = newValue(get(target, property));
      }

      set(target, property, newValue);
      emit(target, path, property, newValue);
    }

    function updateMany(newValue) {
      recurseSet(newValue, get(target, property, {}), [].concat(path, getPath(property)));
    }
  };

  _proto.useRefresh = function useRefresh() {
    var _this$useTargetContex4 = this[useTargetContext](),
        target = _this$useTargetContex4.target,
        path = _this$useTargetContex4.path;

    var _useState4 = useState(-1),
        id = _useState4[0],
        refresh = _useState4[1];

    var currentRefresh = useRef();
    currentRefresh.current = refresh;
    React.useEffect(function () {
      return function () {
        currentRefresh.current = noop;
      };
    }, []);
    var patterns = [];

    for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
      paths[_key] = arguments[_key];
    }

    for (var _iterator = _createForOfIteratorHelperLoose(paths.flat(Infinity)), _step; !(_step = _iterator()).done;) {
      var p = _step.value;
      patterns.push.apply(patterns, getPatterns(target, [].concat(path, getPath(p))));
    }

    useEvent(Array.from(new Set(patterns)), update);
    return id;

    function update() {
      currentRefresh.current(refreshId++);
    }
  };

  _proto.bind = function bind(bindingProps) {
    var self = this;
    return function (_ref4) {
      var _ref4$state = _ref4.state,
          state = _ref4$state === void 0 ? self : _ref4$state,
          props = _objectWithoutPropertiesLoose(_ref4, ["state"]);

      return /*#__PURE__*/React.createElement(state.Bound, _extends({}, bindingProps, props));
    };
  };

  _proto.useCurrentTarget = function useCurrentTarget() {
    var _this$useTargetContex5 = this[useTargetContext](),
        target = _this$useTargetContex5.target;

    return target;
  };

  _proto.useCurrentPath = function useCurrentPath() {
    var _this$useTargetContex6 = this[useTargetContext](),
        path = _this$useTargetContex6.path;

    return path;
  };

  return State;
}();

function Bound(_ref5) {
  var _ref5$component = _ref5.component,
      component = _ref5$component === void 0 ? /*#__PURE__*/React.createElement("input", null) : _ref5$component,
      property = _ref5.property,
      defaultValue = _ref5.defaultValue,
      transformIn = _ref5.transformIn,
      transformOut = _ref5.transformOut,
      extract = _ref5.extract,
      attribute = _ref5.attribute,
      event = _ref5.event,
      target = _ref5.target,
      other = _objectWithoutPropertiesLoose(_ref5, ["component", "property", "defaultValue", "transformIn", "transformOut", "extract", "attribute", "event", "target"]);

  var Component = component && component.type || Dummy;
  var props = component && component.props || {};
  var extraProps = this.useBinding(property, {
    defaultValue: defaultValue,
    transformIn: transformIn,
    transformOut: transformOut,
    extract: extract,
    attribute: attribute,
    event: event,
    target: target
  });
  return /*#__PURE__*/React.createElement(Component, _extends({}, extraProps, props, other));
}

Bound.propTypes = {
  attribute: propTypes.string,
  component: propTypes.object,
  defaultValue: propTypes.any,
  event: propTypes.string,
  extract: propTypes.func,
  property: propTypes.string,
  target: propTypes.object,
  transformIn: propTypes.func,
  transformOut: propTypes.func
};
Bound.defaultProps = {
  component: /*#__PURE__*/React.createElement("input", null)
};

function recurseSet(newValue, target, path) {
  if (path === void 0) {
    path = [];
  }

  for (var _i = 0, _Object$entries = Object.entries(newValue); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        key = _Object$entries$_i[0],
        updatedValue = _Object$entries$_i[1];

    if (typeof updatedValue === "object" && !Array.isArray(updatedValue)) {
      recurseSet(updatedValue, get(target, key, {}), [].concat(path, [key]));
    } else {
      set(target, key, updatedValue);
      emit(target, path, "" + key, updatedValue);
    }
  }
}

function Bind(_ref6) {
  var target = _ref6.target,
      _ref6$property = _ref6.property,
      property = _ref6$property === void 0 ? "" : _ref6$property,
      _ref6$onChange = _ref6.onChange,
      onChange = _ref6$onChange === void 0 ? function () {} : _ref6$onChange,
      children = _ref6.children;
  var self = this;
  var innerId = React.useRef(refreshId++);

  var _this$useTargetContex7 = this[useTargetContext](),
      existingTarget = _this$useTargetContex7.target,
      path = _this$useTargetContex7.path,
      stack = _this$useTargetContex7.stack;

  if (target && !targetIds.has(target)) {
    targetIds.set(target, nextId++);
    path = ["" + targetIds.get(target)];
  } else if (target) {
    path = ["" + targetIds.get(target)];
  } else {
    target = existingTarget;
  }

  var _React$useState = React.useState(target),
      finalTarget = _React$useState[0],
      setFinalTarget = _React$useState[1];

  var currentTarget = useRef();
  currentTarget.current = setFinalTarget;
  React.useEffect(function () {
    return function () {
      currentTarget.current = noop;
    };
  }, []);
  useEvent("" + targetIds.get(finalTarget), update);
  var updatedPath = [].concat(path, getPath(property));
  useEvent(getPatterns(finalTarget, updatedPath).map(function (p) {
    return p + ".**";
  }), function () {
    return onChange(finalTarget);
  });

  var _this$useState = this.useState(property, {}, finalTarget),
      subTarget = _this$useState[0],
      id = _this$useState[3];

  if (Array.isArray(subTarget)) {
    return /*#__PURE__*/React.createElement(ArrayContents, {
      key: id
    });
  } else {
    if (typeof subTarget !== "object") throw new Error("You must bind to an object or an array");
    return /*#__PURE__*/React.createElement(this.context.Provider, {
      key: id + ":" + innerId.current,
      value: {
        target: subTarget,
        path: updatedPath,
        stack: [].concat(stack, [{
          target: subTarget,
          path: updatedPath
        }])
      }
    }, children);
  }

  function update(newValue) {
    targetIds.set(newValue, targetIds.get(target));
    innerId.current = refreshId++;
    currentTarget.current(newValue);
  }

  function ArrayContents() {
    var output = [];

    for (var i = 0; i < subTarget.length; i++) {
      output.push( /*#__PURE__*/React.createElement(Item, {
        key: i,
        index: i
      }));
    }

    return output;
  }

  function Item(_ref7) {
    var index = _ref7.index;
    return /*#__PURE__*/React.createElement(IndexContext.Provider, {
      value: index
    }, /*#__PURE__*/React.createElement(self.Bind, {
      property: property + "." + index
    }, children));
  }
}

Bind.propTypes = {
  children: propTypes.any,
  onChange: propTypes.func,
  property: propTypes.string.isRequired,
  target: propTypes.object
};
Bind.defaultProps = {
  onChange: function onChange() {},
  property: ""
};

function sortByExtraction(extract) {
  return function (a, b) {
    var va = extract(a);
    var vb = extract(b);
    return vb > va ? -1 : va === vb ? 0 : 1;
  };
}
var inPriorityOrder = sortByExtraction(function (v) {
  return v.priority || 0;
});

var _marked = /*#__PURE__*/regeneratorRuntime.mark(using);
var raiseAsync = function raiseAsync(event) {
  for (var _len3 = arguments.length, params = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    params[_key3 - 1] = arguments[_key3];
  }

  try {
    var _exit2 = false;

    var _temp2 = _catch(function () {
      var _events2;

      return Promise.resolve((_events2 = events).emitAsync.apply(_events2, [event].concat(params))).then(function () {});
    }, function (e) {
      if (e instanceof Cancel) {
        _exit2 = true;
        return params;
      }

      throw e;
    });

    return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function (_result) {
      return _exit2 ? _result : params;
    }) : _exit2 ? _temp2 : params);
  } catch (e) {
    return Promise.reject(e);
  }
};

var Cancel = function Cancel(message) {
  this.name = "Cancel";
  this.message = message;
  this.stack = new Error().stack;
};

var Framework = window.Framework = window.Framework || {};
var events = new Events({
  storeHandlers: function storeHandlers(handlers) {
    return handlers.sort(inPriorityOrder);
  }
});
function setEventSource(newSource) {
  events = newSource;
}
function stopPropagationAndExit() {
  throw new Cancel();
}
function useEvent$1(pattern, handler, priority) {
  React.useEffect(function () {
    return handle(pattern, handler, priority);
  });
}
function handle(pattern, handler, priority) {
  handler.priority = priority;
  events.on(pattern, handler);
  return function () {
    events.off(pattern, handler);
  };
}
function once(pattern, handler, priority, timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }

  handler.priority = priority;
  events.once(pattern, handler);

  if (timeout) {
    setTimeout(remove, timeout);
  }

  return remove;

  function remove() {
    events.off(pattern, handler);
  }
}
function raiseLater(event) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  setTimeout(function () {
    return raise.apply(void 0, [event].concat(params));
  });
}
function raise(event) {
  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    params[_key2 - 1] = arguments[_key2];
  }

  try {
    var _events;

    (_events = events).emit.apply(_events, [event].concat(params));
  } catch (e) {
    if (e instanceof Cancel) {
      return params;
    }

    throw e;
  }

  return params;
}
function using(fn) {
  var handlers, addHandler;
  return regeneratorRuntime.wrap(function using$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          addHandler = function _addHandler(event, handler) {
            handlers.push({
              event: event,
              handler: handler
            });
            events.on(event, handler);
          };

          handlers = [];
          _context.prev = 2;
          return _context.delegateYield(fn(addHandler), "t0", 4);

        case 4:
          _context.prev = 4;
          handlers.forEach(function (_ref) {
            var event = _ref.event,
                handler = _ref.handler;
            events.off(event, handler);
          });
          return _context.finish(4);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[2,, 4, 7]]);
}
function Socket(_ref2) {
  var _ref2$filter = _ref2.filter,
      filter = _ref2$filter === void 0 ? returnValue$1 : _ref2$filter,
      type = _ref2.type,
      children = _ref2.children,
      props = _objectWithoutPropertiesLoose(_ref2, ["filter", "type", "children"]);

  var _raise = raise("ui-plug." + type, [children && {
    Component: Children,
    priority: 100
  }], props),
      items = _raise[0];

  items = items.filter(Boolean);
  items.sort(inPriorityOrder);
  raise("ui-render-plugs." + type, items);
  return /*#__PURE__*/React.createElement(Fragment, null, filter(items).map(function (_ref3, index) {
    var Component = _ref3.Component;
    return /*#__PURE__*/React.createElement(Component, _extends({
      key: index
    }, props));
  }));

  function Children() {
    return children;
  }
}
Socket.propTypes = {
  filter: propTypes.func,
  type: propTypes.string.isRequired
};
function bestOnly(items) {
  return items[0];
}
function lessThan(value) {
  return function (items) {
    return items.length < 2 ? items : items.filter(function (i) {
      return i.priority < value;
    });
  };
}

function returnValue$1(value) {
  return value;
}

function plug(type, predicate, Component, priority) {
  if (priority === void 0) {
    priority = 0;
  }

  if (typeof Component === "number") {
    priority = Component;
    Component = predicate;

    predicate = function predicate() {
      return priority;
    };
  } else if (Component === undefined) {
    Component = predicate;

    predicate = function predicate() {
      return priority;
    };
  }

  handle("ui-plug." + type, function (list, props) {
    var priority = predicate(props, list);

    if (priority) {
      list.push({
        Component: Component,
        priority: priority
      });
    }
  });
}
function ensureArray$1(item) {
  return Array.isArray(item) ? item : [item].filter(function (f) {
    return f !== undefined;
  });
}

export { Events, Socket, bestOnly, createState, ensureArray$1 as ensureArray, events, handle, lessThan, once, plug, raise, raiseAsync, raiseLater, setEventSource, stopPropagationAndExit, useEvent$1 as useEvent, useIndex, using };
//# sourceMappingURL=index.modern.js.map
