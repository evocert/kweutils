/*** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Svidget.js v0.3.5
 * Release Date: 2018-03-02
 * 
 * A framework for creating complex widgets using SVG.
 * 
 * http://www.svidget.com/
 * 
 * Copyright 2018, Joe Agster
 * Licensed under the MIT license.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

;
!function(global, factory) {
    "function" == typeof define && define.amd ? define([ "svidget" ], factory) : "object" == typeof module && module.exports ? module.exports = factory : // don't defer, instantiate svidget immediately
    // global === window
    global.svidget = factory(global);
}(this, function(global, createOptions) {
	//global=window;//skullquak
    //var VERSION = "0.3.5", Svidget = {}, window = global, document = window.document || {};
    var VERSION = "0.3.5", Svidget = {}/*, window = global, document = window.document || {}*/,global=window;//skullquake
    //var root = null;
    Svidget.root = null;
    // set in Svidget.Root, this is the singleton instance to the global "svidget" object.
    Svidget.global = global;
    // In server side environments will === global, in browser === window
    //Svidget.window = null; // In server side environments will be mock window or jsdom-like window
    //Svidget.document = null; // In server side environments will be window.document or jsdom-like document
    Svidget.version = VERSION;
    Svidget.declaredHandlerName = "_declared";
    Svidget.emptyArray = [];
    Svidget.defaultType = "object";
    /** @function Svidget.array
    Builds an array from any collection, be it another array, HTMLCollection, etc. */
    Svidget.array = function(anyCollection) {
        // oops, we need a collection with a length property
        if (!anyCollection || !anyCollection.length) return null;
        try {
            // this may blow up for IE8 and below and other less than modern browsers
            return Svidget.emptyArray.slice.call(anyCollection, 0);
        } catch (e) {
            for (var res = [], i = 0; i < anyCollection.length; i++) res.push(anyCollection[i]);
            return res;
        }
    };
    /** @function Svidget.isArray
    Determines if passed in object is actually an array. 
    This is a more relaxed check and handles the case when array is a Svidget.Collection and/or across frame boundaries */
    Svidget.isArray = function(array) {
        return null != array && (Array.isArray(array) || Array.prototype.isPrototypeOf(array) || array.length && array.push);
    };
    Svidget.isFunction = function(func) {
        return "function" == typeof func;
    };
    Svidget.isString = function(str) {
        return "string" == typeof str || str.length && str.trim && str.charAt;
    };
    Svidget.isColor = function(color) {
        // todo
        return false;
    };
    Svidget.convert = function(val, type, subtype, typedata) {
        return Svidget.Conversion.to(val, type, subtype, typedata);
    };
    Svidget.getType = function(val) {
        if (null == val) return Svidget.defaultType;
        // object is the default type (as of 0.3.0, formerly "string")
        if (Svidget.isArray(val)) return "array";
        var type = typeof val;
        // if (type === "boolean") return "bool"; // as of 0.3.0 using "boolean" not "bool"
        // if (type === "boolean") return "bool"; // as of 0.3.0 using "boolean" not "bool"
        return "string" === type || "number" === type || "boolean" === type ? type : "object";
    };
    // Given a type, determines if it is valid and if not returns the default type.
    Svidget.resolveType = function(type) {
        type = Svidget.Conversion.toString(type);
        return void 0 === Svidget.ParamTypes[type] ? Svidget.defaultType : "bool" === type ? "boolean" : type;
    };
    // Given a subtype, determines if it is valid and if not returns null.
    Svidget.resolveSubtype = function(type, subtype) {
        type = Svidget.resolveType(type);
        //subtype is not valid, so return null
        return void 0 === Svidget.ParamSubTypes[subtype] ? null : "string" != type || "color" != subtype && "regex" != subtype && "color" != subtype ? "number" == type && "integer" == subtype ? subtype : null : subtype;
    };
    Svidget.extend = function(objtype, prototype, overwrite) {
        for (var methodName in prototype) // do we check for hasOwnProperty here? 
        (overwrite || void 0 === objtype.prototype[methodName]) && (objtype.prototype[methodName] = prototype[methodName]);
    };
    Svidget.wrap = function(func, context) {
        // todo: use function.bind() if available
        // ensure func is function, return undefined if not
        if (null != func && "function" == typeof func) {
            return function() {
                return func.apply(context, arguments);
            };
        }
    };
    // Find the function by name in the specified scope, or just return it if is already a function
    // By default scope == global scope
    Svidget.findFunction = function(funcNameOrInstance, scope) {
        if ("function" == typeof funcNameOrInstance) return funcNameOrInstance;
        null == scope && (scope = window);
        // global scope
        if (null != funcNameOrInstance) {
            var bind = funcNameOrInstance + "", func = scope[bind];
            null == func && scope !== global && (func = global[bind]);
            // bind is an expression, so just wrap it in a function
            return null == func ? null : "function" == typeof func ? func : "return " != bind.substr(0, 7) ? new Function("return " + bind) : new Function(bind);
        }
        return null;
    };
    Svidget.log = function(msg) {
        Svidget.Settings.enableLogging && console.log(msg);
    };
    Svidget.readOnlyProperty = function(value) {
        return {
            enumerable: true,
            configurable: false,
            writable: false,
            value: value
        };
    };
    Svidget.fixedProperty = function(value) {
        return {
            enumerable: true,
            configurable: false,
            writable: true,
            value: value
        };
    };
    Svidget.getPrivateAccessor = function(privates) {
        return function(p) {
            return privates[p];
        };
    };
    Svidget.setPrivateAccessor = function(privates) {
        return function(p, val) {
            if (!privates.writable.contains(p)) return false;
            privates[p] = val;
            return true;
        };
    };
    Svidget.returnFalse = function() {
        return false;
    };
    Svidget.returnTrue = function() {
        return true;
    };
    Svidget.Settings = {};
    Svidget.Settings.showPrivates = true;
    //show private members of objects, useful for debugging
    Svidget.Settings.enableLogging = false;
    // whether console.logging is enabled, turn on for troubleshooting
    Array.prototype.contains || (Array.prototype.contains = function(obj) {
        for (var i = this.length; i--; ) if (this[i] === obj) return true;
        return false;
    });
    // a note about "bla instanceof Array" checks, they don't work across frame boundaries
    // so we use isArray
    Array.isArray || (Array.isArray = function(arg) {
        return "[object Array]" === Object.prototype.toString.call(arg);
    });
    /**
 * Encapsulates common functionality for all object types in the framework.
 * @class
 * @static
 * @memberof Svidget
 */
    Svidget.ObjectPrototype = {
        // protected
        setup: function(privates) {
            this.getPrivate = Svidget.getPrivateAccessor(privates);
            this.setPrivate = Svidget.setPrivateAccessor(privates);
            Svidget.Settings.showPrivates && (this.privates = privates);
        },
        // protected
        // as of 0.3.0: type argument converts val to type
        getset: function(prop, val, type, validator) {
            // ** get mode
            var curProp = this.getPrivate(prop);
            if (void 0 === val) return curProp;
            // ** set mode
            // first, convert if needed
            null != type && (val = Svidget.convert(val, type));
            // if value is current value then do nothing
            // if value is current value then do nothing
            // then, validate
            return val !== curProp && (!(validator && !validator.call(this, val)) && this.setPrivate(prop, val));
        },
        // protected
        // should always return a collection
        select: function(col, selector) {
            if ("number" == typeof selector) {
                selector = parseInt(selector);
                // coerce to integer
                return col.wrap(col.getByIndex(selector));
            }
            return "function" == typeof selector ? col.where(selector) : void 0 !== selector ? col.wrap(col.getByName(selector + "")) : col;
        },
        // protected
        // should always return a single item
        selectFirst: function(col, selector) {
            if ("number" == typeof selector) {
                selector = parseInt(selector);
                // coerce to integer
                return col.getByIndex(selector);
            }
            return "function" == typeof selector ? col.first(selector) : void 0 !== selector ? col.getByName(selector + "") : col.first();
        },
        // protected
        wireCollectionAddRemoveHandlers: function(col, addFunc, removeFunc) {
            if (null != col) {
                col.onAdded(Svidget.wrap(addFunc, this));
                col.onRemoved(Svidget.wrap(removeFunc, this));
            }
        }
    };
    /**
 * Encapsulates a set of prototype methods for managing events.
 * @class
 * @memberof Svidget
 * @param {array} typelist - A list of event types.
 */
    Svidget.EventPrototype = function(typelist) {
        // todo: validate typelist
        // these are the event types that the base object supports, like "invoke" for action.
        this.eventTypes = new Svidget.Collection(typelist);
    };
    Svidget.EventPrototype.prototype = {
        on: function(type, data, name, handler) {
            // resolve handler from whether name, data passed
            var argsCount = Svidget.isFunction(handler) ? 4 : Svidget.isFunction(name) ? 3 : Svidget.isFunction(data) ? 2 : 1;
            //handler = handler || (Svidget.isFunction(name) ? name : (Svidget.isFunction(data) ? data : null));
            handler = 4 == argsCount ? handler : 3 == argsCount ? name : 2 == argsCount ? data : null;
            data = argsCount > 2 ? data : null;
            name = argsCount > 3 ? name : null;
            return !!handler && this.addHandler(type, handler, name, data);
        },
        off: function(type, handlerOrName) {
            // separate handlerOrName into handler, name
            var handler = Svidget.isFunction(handlerOrName) ? handlerOrName : null, name = null != handler ? null : handlerOrName;
            return this.removeHandler(type, handler, name);
        },
        trigger: function(type, value, originalTarget) {
            if (null != type) {
                // nothing to do
                // get event object from handlers
                var e = this.triggerHandlers(type, value, originalTarget);
                Svidget.log("trigger: " + type);
                // if not stopPropagation call bubble
                e.isPropagationStopped() || this.bubble(type, e);
            }
        },
        triggerHandlers: function(type, value, originalTarget) {
            // generate event object
            var e = new Svidget.Event(null, type, null, this.getTarget(), originalTarget, value);
            if (null == type || null == this.handlers || null == this.handlers[type]) return e;
            // loop through each handler (make sure it is a function)
            // h == { handler: handler, name: name, data: data }
            this.handlers[type].each(function(h) {
                if (e.isImmediatePropagationStopped()) return false;
                // if stopImmediatePropagation, then exit loop by returning false
                if (null != h && null != h.handler && "function" == typeof h.handler) {
                    // handler is not a function
                    // set name/data
                    e.name = h.name;
                    e.data = h.data;
                    // invoke handler
                    h.handler.call(null, e);
                }
            });
            return e;
        },
        bubble: function(type, sourceEvent) {
            // invoked from child
            this.ensureBubbleParents();
            sourceEvent.name = null;
            sourceEvent.data = null;
            this.bubbleParents[type] && this.bubbleParents[type](type, sourceEvent, this.getTarget());
        },
        addHandler: function(type, handler, name, data) {
            this.ensureHandlersByType(type);
            // todo: get handler function name, we will use to off() handlers by name
            //if (this.handlers[type].contains(handler)) return false;
            if (this.handlerExists(type, handler, name)) return false;
            var obj = this.toHandlerObject(handler, name, data);
            this.handlers[type].push(obj);
            return true;
        },
        removeHandler: function(type, handler, name) {
            this.ensureHandlers();
            if (!this.handlers[type]) return false;
            //return this.handlers[type].removeAll(handler);
            var that = this;
            return this.handlers[type].removeWhere(function(item) {
                return that.handlerMatch(item, handler, name);
            });
        },
        handlerExists: function(type, handler, name) {
            var that = this;
            return this.handlers[type].any(function(item) {
                return that.handlerMatch(item, handler, name);
            });
        },
        handlerMatch: function(handlerObj, handler, name) {
            return null != name && handlerObj.name === name || handler === handlerObj.handler;
        },
        setBubbleParent: function(type, callback) {
            this.ensureBubbleParents();
            this.bubbleParents[type] = callback;
        },
        // private, called by the object to register a single callback for all its event types
        // bubbleTarget: usually a parent object
        registerBubbleCallback: function(types, bubbleTarget, callback) {
            if (bubbleTarget && callback) for (var i = 0; i < types.length; i++) this.setBubbleParent(types[i], Svidget.wrap(callback, bubbleTarget));
        },
        toHandlerObject: function(handler, name, data) {
            return {
                handler: handler,
                name: name,
                data: data
            };
        },
        bubbleFuncs: function(objectType) {},
        ensureHandlers: function() {
            this.handlers || (this.handlers = {});
        },
        ensureHandlersByType: function(type) {
            this.ensureHandlers();
            this.handlers[type] || (this.handlers[type] = new Svidget.Collection());
        },
        ensureBubbleParents: function() {
            this.bubbleParents || (this.bubbleParents = {});
        },
        // internal
        // returns the target object to use for the event object
        // override in eventContainer
        getTarget: function() {
            return this;
        }
    };
    /**
 * Encapsulates common functionality for a Param and ActionParam.
 * @class
 * @abstract
 * @memberof Svidget
 */
    Svidget.ParamPrototype = {
        /**
	 * Gets the param name.
	 * @method
	 * @returns {string}
	*/
        name: function(val) {
            return void 0 === val && this.getPrivate("name");
        },
        /**
	 * Gets or sets the description.
	 * @method
	 * @param {string} [val] - Sets the value when specified.
	 * @returns {string} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        description: function(val) {
            var res = this.getset("description", val, "string");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("description");
            // get converted value
            this.trigger && this.trigger("change", {
                property: "description",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the param type. This can be "string", "number", etc. See the Svidget.ParamTypes enum.
	 * @method
	 * @param {string} [val] - Sets the value when specified.
	 * @returns {string} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        type: function(val) {
            null === val && (val = Svidget.resolveType(null));
            // rturns default type
            "bool" == val && (val = "boolean");
            var res = this.getset("type", val, "string", this.validateType);
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("type");
            // get converted value
            this.trigger && this.trigger("change", {
                property: "type",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the param subtype. This can be on of the values from the Svidget.ParamSubTypes enum.
	 * @method
	 * @param {string} [val] - Sets the value when specified.
	 * @returns {string} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        subtype: function(val) {
            var res = this.getset("subtype", val, "string", this.validateSubtype);
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("subtype");
            // get converted value
            this.trigger && this.trigger("change", {
                property: "subtype",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the type data associated with the subtype. This can be a regex pattern or choice string, among other things. 
	 * @method
	 * @param {string} [val] - Sets the typedata when specified.
	 * @returns {string} - The typedata when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        typedata: function(val) {
            var res = this.getset("typedata", val, "string");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("typedata");
            // get converted value
            this.trigger && this.trigger("change", {
                property: "typedata",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the param defvalue. This is the default value if nothing (or undefined) is set.
	 * @method
	 * @param {string} [val] - Sets the value when specified.
	 * @returns {string} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        defvalue: function(val) {
            var res = this.getset("defvalue", val);
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "change" event
            this.trigger && this.trigger("change", {
                property: "defvalue",
                value: val
            });
            return true;
        },
        validateType: function(t) {
            return "string" !== !typeof t && void 0 !== Svidget.ParamTypes[t];
        },
        validateSubtype: function(t) {
            return true;
        },
        _resolveType: function(type, value, defvalue) {
            // infer the type from the value or defvalue
            value = null != value ? value : defvalue;
            type = null == type ? Svidget.getType(value) : Svidget.resolveType(type);
            // normalize type to a valid type
            return type;
        }
    };
    /**
 * Represents a structured collection. Extends Array by providing additional methods to select, tranverse, and modify an array.
 * @constructor
 * @augments Array
 * @param {Array} array - The initial elements of the collection.
 */
    Svidget.Collection = function(array) {
        this.__type = "Svidget.Collection";
        this.source = array;
        //this.baseType = Svidget.Collection;
        //	this.items = [];
        // append items from source to this instance
        array && (Svidget.isArray(array) || Array.prototype.isPrototypeOf(array)) && this.push.apply(this, array);
    };
    Svidget.Collection.prototype = new Array();
    Svidget.extend(Svidget.Collection, {
        /**
	 * Returns true if any of the items satisfies the specified predicate function.
	 * @method
	 * @param {Function} predicate - A function that accepts an item as input and returns true/false.
	 * @returns {boolean}
	*/
        any: function(predicate) {
            if (null == predicate) return this.length > 0;
            for (var i = 0; i < this.length; i++) if (predicate(this[i])) return true;
            return false;
        },
        /**
	 * Returns true if all of the items satisfies the specified predicate function.
	 * @method
	 * @param {Function} predicate - A function that accepts an item as input and returns true/false.
	 * @returns {boolean}
	*/
        all: function(predicate) {
            if (null == predicate) return false;
            for (var i = 0; i < this.length; i++) if (!predicate(this[i])) return false;
            return true;
        },
        /**
	 * Returns true if the item is contained in the collection.
	 * @method
	 * @param {object} obj - The object to look for.
	 * @returns {boolean}
	*/
        contains: function(obj) {
            return this.indexOf(obj) >= 0;
        },
        /**
	 * Iterates on each item in the collection and performs the operation.
	 * @method
	 * @param {Function} operation - A function that accepts an item as input.
	*/
        each: function(operation) {
            for (var i = 0; i < this.length; i++) {
                if (false === operation(this[i])) break;
            }
        },
        /**
	 * Returns the first item in the collection that satisfies the condition in the specified predicate function.
	 * @method
	 * @param {Function} predicate - A function that accepts an item as input and returns true/false.
	 * @returns {object} - The item in the collection.
	*/
        first: function(predicate) {
            if (0 == this.length) return null;
            if (null == predicate || "function" === !typeof predicate) return this[0];
            for (var i = 0; i < this.length; i++) if (predicate(this[i])) return this[i];
            return null;
        },
        /**
	 * Returns the last item in the collection that satisfies the condition in the specified predicate function.
	 * @method
	 * @param {Function} predicate - A function that accepts an item as input and returns true/false.
	 * @returns {object} - The item in the collection.
	*/
        last: function(predicate) {
            if (0 == this.length) return null;
            if (null == predicate || "function" === !typeof predicate) return this[0];
            for (var i = this.length - 1; i >= 0; i--) if (predicate(this[i])) return this[i];
            return null;
        },
        /**
	 * Iterates on the collection calling the specified selector function and returns a new collection. Chainable.
	 * @method
	 * @param {Function} selector - A function that accepts an item as input and returns a value based on it.
	 * @returns {Svidget.Collection} - The result collection.
	*/
        select: function(selector) {
            for (var result = [], i = 0; i < this.length; i++) result.push(selector(this[i]));
            return new Svidget.Collection(result);
        },
        /**
	 * Iterates on the collection calling the specified predicate filter function and returns a new collection. Chainable.
	 * @method
	 * @param {Function} predicate - A function that accepts an item as input and returns true/false.
	 * @returns {Svidget.Collection} - The result collection.
	*/
        where: function(predicate) {
            for (var result = [], i = 0; i < this.length; i++) predicate(this[i]) && result.push(this[i]);
            return new Svidget.Collection(result);
        },
        // modifiers
        /**
	 * Adds an item to the collection.
	 * @method
	 * @param {object} obj - The item to add.
	 * @returns {boolean} - True if add succeeds.
	*/
        add: function(obj) {
            if (this.indexOf(obj) >= 0) return false;
            this.push(obj);
            return true;
        },
        /**
	 * Adds an array of items to the collection.
	 * @method
	 * @param {Array} array - The items to add.
	 * @returns {boolean} - True if add succeeds.
	*/
        addRange: function(array) {
            if (!Svidget.isArray(array)) return false;
            this.push.apply(this, array);
            return true;
        },
        /**
	 * Inserts an item to the collection at the specified index.
	 * @method
	 * @param {object} obj - The item to add.
	 * @param {number} index - The items to add.
	 * @returns {boolean} - True if add succeeds.
	*/
        insert: function(obj, index) {
            index = parseInt(index);
            if (!isNaN(index) && (index < 0 || index > this.length)) return false;
            this.splice(index, 0, obj);
            return true;
        },
        /**
	 * Removes an item from the collection. Only removes the first instance of the item found.
	 * @method
	 * @param {object} obj - The item to remove.
	 * @returns {boolean} - True if remove succeeds.
	*/
        remove: function(obj) {
            var pos = this.indexOf(obj);
            if (pos < 0) return false;
            this.splice(pos, 1);
            return true;
        },
        /**
	 * Removes an item from the collection. Removes all instances of the item.
	 * @method
	 * @param {object} obj - The item to remove.
	 * @returns {boolean} - True if remove succeeds.
	*/
        removeAll: function(obj) {
            for (var removed = false; this.remove(obj); ) removed = true;
            return removed;
        },
        /**
	 * Clears all items in the collection.
	 * @method
	 * @returns {boolean} - True after collection cleared.
	*/
        clear: function() {
            this.splice(0, this.length);
            return true;
        },
        /**
	 * Removes an item from the collection based on the specified predicate function.
	 * @method
	 * @param {Function} predicate - A function that accepts an item as input and returns true/false.
	 * @returns {boolean} - True if remove succeeds.
	*/
        removeWhere: function(predicate) {
            for (var result = [], removed = false, i = 0; i < this.length; i++) predicate(this[i]) && result.push(this[i]);
            for (var i = 0; i < result.length; i++) removed = this.remove(result[i]) || removed;
            return removed;
        },
        // misc
        /**
	 * Returns a new array based on items in the collection.
	 * @method
	 * @returns {Array}
	*/
        toArray: function() {
            for (var arr = [], i = 0; i < this.length; i++) arr.push(this[i]);
            //var check = arr instanceof Array;
            //Svidget.log('is it array: ' + check);
            return arr;
        }
    });
    /**
 * Represents a specialized collection for framework objects.
 * @constructor
 * @mixes Svidget.ObjectPrototype
 * @augments Svidget.Collection
 * @param {Array} array - The initial elements of the collection.
 * @param {Function} type - The type of objects that the collection should hold.
 */
    Svidget.ObjectCollection = function(array, type) {
        // todo: filter input array by type specified
        Svidget.Collection.apply(this, [ array ]);
        this.__type = "Svidget.ObjectCollection";
        this._ctor = Svidget.ObjectCollection;
        // private fields
        var privates = new function() {
            this.writable = [ "addedFunc", "removedFunc" ];
            this.type = type;
            this.addedFunc = null;
            this.removedFunc = null;
        }();
        // private accessors
        this.setup(privates);
    };
    var base = new Svidget.Collection();
    Svidget.ObjectCollection.prototype = base;
    Svidget.ObjectCollection.prototype.base_add = base.add;
    Svidget.ObjectCollection.prototype.base_remove = base.remove;
    Svidget.extend(Svidget.ObjectCollection, {
        /**
	 * Gets an item in the collection by its index (if number passed) or id/name (if string passed).
	 * @method
	 * @param {(string|number)} selector - The selector.
	 * @returns {object} - The object in the collection.
	*/
        get: function(selector) {
            return "number" == typeof selector ? col.getByIndex(selector) : col.getByName(selector);
        },
        /**
	 * Gets an item in the collection by its index.
	 * @method
	 * @param {number} selector - The index.
	 * @returns {object} - The object in the collection.
	*/
        getByIndex: function(index) {
            if (null == index || isNaN(index)) return null;
            index = parseInt(index);
            var res = this[index];
            return null == res ? null : res;
        },
        /**
	 * Gets an item in the collection by its name.
	 * @method
	 * @param {string} selector - The name.
	 * @returns {object} - The object in the collection.
	*/
        getByName: function(name) {
            return this.first(function(p) {
                return p.name() == name;
            });
        },
        /**
	 * Gets the object type that this collection holds.
	 * @method
	 * @returns {Function} - The type constructor that represents the type.
	*/
        type: function() {
            return this.getset("type");
        },
        /**
	 * Adds an item to the collection.
	 * @method
	 * @param {object} obj - The item to add.
	 * @returns {boolean} - The item that was added.
	*/
        add: function() {
            if (0 == arguments.length) return null;
            // call add overload
            var item, arg0, success;
            arguments.length >= 1 && (arg0 = arguments[0]);
            item = "string" == typeof arg0 ? this.create.apply(this, arguments) : arg0;
            if (null == item) return null;
            success = this.addObject(item);
            if (!success) return null;
            // if succeeded, notify widget
            this.triggerAdded(item);
            return item;
        },
        addObject: function(obj) {
            // ensure obj is a valid Param
            if (null == obj || !obj instanceof this.type()) return false;
            // ensure no other parameter exists in the collection by that name
            if (void 0 !== obj.name && null != this.getByName(obj.name())) return false;
            // add to collection
            this.push(obj);
            return obj;
        },
        /**
	 * Creates an returns the item.
	 * @abstract
	*/
        create: function() {
            // override me
            return null;
        },
        /**
	 * Removes an item from the collection. Only removes the first instance of the item found.
	 * @method
	 * @param {object} obj - The item to remove.
	 * @returns {boolean} - True if remove succeeds.
	*/
        remove: function(name) {
            var item = this.getByName(name);
            if (null == item) return false;
            if (!this.base_remove(item)) return false;
            // if succeeded, notify widget
            this.triggerRemoved(item);
            return true;
        },
        /**
	 * Wraps the specified item in a new ObjectCollection.
	 * @method
	 * @param {object} item - The item to make a collection from.
	 * @returns {Svidget.ObjectCollection} - The collection.
	*/
        wrap: function(item) {
            var items = [ item ];
            (null == item || !item instanceof this.type()) && (items = []);
            //, this.parent);
            return new Svidget.Collection(items);
        },
        // internal
        // wires up an internal handler when an item is added to the collection
        onAdded: function(func) {
            this.getset("addedFunc", func);
        },
        // internal
        // wires up an internal handler when an item is removed from the collection
        onRemoved: function(func) {
            this.getset("removedFunc", func);
        },
        // private
        triggerAdded: function(item) {
            var func = this.getset("addedFunc");
            func && func(item);
        },
        // private
        triggerRemoved: function(item) {
            var func = this.getset("removedFunc");
            func && func(item);
        }
    }, true);
    // overwrite base methods, copied above
    Svidget.extend(Svidget.Collection, Svidget.ObjectPrototype);
    /**
 * Provides communications functionality between a page and a widget. Internal class only.
 * @class
 */
    Svidget.Communicator = function() {
        this.__type = "Svidget.Communicator";
        this.sameDomain = null;
        this._init();
    };
    Svidget.Communicator.prototype = {
        _init: function() {
            this.addMessageEvent();
        },
        // REGION: Events
        addMessageEvent: function() {
            window.addEventListener && window.addEventListener("message", Svidget.wrap(this.receiveXSM, this), false);
        },
        // REGION: Receive
        receiveFromParent: function(name, payload) {
            svidget.receiveFromParent(name, payload);
        },
        receiveFromWidget: function(name, payload, widgetID) {
            svidget.receiveFromWidget(name, payload, widgetID);
        },
        receiveXSM: function(message) {
            if (null != message) {
                var msgData = message.data;
                null != msgData && (// it's possible in future we'll have a nested widget scenario, so a widget can have both a parent and widgets.
                void 0 !== msgData.widget ? this.receiveFromWidget(msgData.name, msgData.payload, msgData.widget) : this.receiveFromParent(msgData.name, msgData.payload));
            }
        },
        // REGION: Signal Parent
        signalParent: function(name, payload, widgetID) {
            // todo: cache result of isParentSameDomain
            this.isParentSameDomain() ? this.signalParentDirect(name, payload, widgetID) : this.signalParentXSM(name, payload, widgetID);
        },
        signalParentDirect: function(name, payload, widgetID) {
            //var check = window === window.parent;
            // note: if window.parent.svidget is null it means the widget DOM was ready before the page DOM, although unlikely it is possible
            // so we need to handle somehow
            if (null != window.parent && window !== window.parent && null != window.parent.svidget && window.parent.svidget) {
                var root = window.parent.svidget;
                setTimeout(function() {
                    root.routeFromWidget(name, payload, widgetID);
                }, 0);
            }
        },
        signalParentXSM: function(name, payload, widgetID) {
            if (null != window.parent && null != window.parent.postMessage) {
                //alert('postMessage');
                var msg = this.buildSignalParentMessage(name, payload, widgetID);
                window.parent.postMessage(msg, "*");
            }
        },
        buildSignalParentMessage: function(name, payload, widgetID) {
            return {
                name: name,
                payload: payload,
                widget: widgetID
            };
        },
        // todo: move to widget
        // note: this returns true when widget is forced cross domain
        isParentSameDomain: function() {
            null == this.sameParentDomain && (this.sameParentDomain = this.checkParentSameDomain());
            return this.sameParentDomain;
        },
        // todo: move to Svidget.DOM
        checkParentSameDomain: function() {
            if (null == window.parent) return false;
            try {
                window.parent.document;
                return true;
            } catch (ex) {
                return false;
            }
        },
        // REGION: Widgets
        signalWidget: function(widgetRef, name, payload) {
            Svidget.log("communicator: signalWidget {name: " + name + "}");
            widgetRef.isCrossDomain() ? this.signalWidgetXSM(widgetRef, name, payload) : //this.isWidgetSameDomain(widgetProxy))
            this.signalWidgetDirect(widgetRef, name, payload);
        },
        signalWidgetDirect: function(widgetRef, name, payload) {
            if (null != widgetRef) {
                var root = widgetRef.root();
                null != root && setTimeout(function() {
                    root.receiveFromParent(name, payload);
                }, 0);
            }
        },
        signalWidgetXSM: function(widgetRef, name, payload) {
            if (null != widgetRef && null != widgetRef.window()) {
                var msg = this.buildSignalWidgetMessage(name, payload);
                //widgetRef.window().postMessage(msg, '*');
                setTimeout(function() {
                    Svidget.log("communicator: postMessage");
                    widgetRef.window().postMessage(msg, "*");
                }, 0);
            }
        },
        buildSignalWidgetMessage: function(name, payload) {
            return {
                name: name,
                payload: payload
            };
        }
    };
    /**
 * Handles conversion to/from different types.
 * @static
 * @memberof Svidget
 */
    Svidget.Conversion = {};
    // type == string type i.e. "string", "number"
    Svidget.Conversion.to = function(val, type, subtype, typedata) {
        var t = Svidget.ParamTypes[type] || Svidget.ParamTypes.object, st = Svidget.ParamSubTypes[subtype] || Svidget.ParamSubTypes.none;
        switch (t) {
          case Svidget.ParamTypes.string:
            return Svidget.Conversion.toString(val, st, typedata);

          // todo: coerce when subtype choice, default to first one
            case Svidget.ParamTypes.number:
            return Svidget.Conversion.toNumber(val, st == Svidget.ParamSubTypes.integer);

          case Svidget.ParamTypes.bool:
            return Svidget.Conversion.toBool(val);

          case Svidget.ParamTypes.array:
            return Svidget.Conversion.toArray(val);

          default:
            return Svidget.Conversion.toObject(val);
        }
    };
    /**
 * Converts any value to a string.
 * @static
 */
    Svidget.Conversion.toString = function(val, subtype, typedata) {
        return null == val ? null : subtype == Svidget.ParamSubTypes.choice ? Svidget.Conversion.toChoiceString(val, typedata) : Svidget.isArray(val) || "object" == typeof val ? JSON.stringify(val) : val + "";
    };
    /**
 * Converts any value to a string among a choice list.
 * @static
 */
    Svidget.Conversion.toChoiceString = function(val, typedata) {
        val += "";
        if (null == typedata) return val;
        var choices = typedata.split("|");
        return null == choices || 0 == choices.length ? null : choices.indexOf(val) >= 0 ? val : choices[0];
    };
    /**
 * Converts any value to a number.
 * @static
 */
    Svidget.Conversion.toNumber = function(val, isInt) {
        if (!val) return 0;
        // null, undefined, false all convert to 0
        if (true === val) return 1;
        // true converts to 1
        if (isInt) return parseInt(val + "");
        val = parseFloat(val);
        isNaN(val) && (val = 0);
        return val;
    };
    /**
 * Converts any value to a bool.
 * @static
 */
    Svidget.Conversion.toBool = function(val) {
        return "false" != (val + "").toLowerCase() && 0 != +val && !!val;
    };
    /**
 * Converts any value to a array.
 * @static
 */
    Svidget.Conversion.toArray = function(val) {
        if (null == val) return val;
        // if val is array just return it
        if (Svidget.isArray(val)) return val;
        // if val is stringified array, JSON parse and return array
        if (Svidget.Conversion.isArrayString(val)) {
            var a = Svidget.Conversion.parseArray(val);
            if (null != a) return a;
        }
        // else wrap as an array
        return [ val ];
    };
    /**
 * Converts any value to a object.
 * @static
 */
    Svidget.Conversion.toObject = function(val) {
        if (null == val) return val;
        // if val is valid JSON string, JSON parse and return array
        if (Svidget.Conversion.isJSONString(val)) {
            var newval = Svidget.Conversion.jsonifyString(val);
            // convert single to double chars or else parser chokes
            try {
                return JSON.parse(newval);
            } catch (ex) {}
        }
        // else return original val
        return val;
    };
    Svidget.Conversion.isJSONString = function(val) {
        // note: this doesn't check if its strictly JSON, just does a sanity check before attempting to convert
        if (!val) return false;
        val = (val + "").trim();
        return val.length > 0 && Svidget.isString(val) && "{" == val.charAt(0) && "}" == val.charAt(val.length - 1);
    };
    Svidget.Conversion.isArrayString = function(val) {
        if (null == val) return false;
        val = (val + "").trim();
        return val.length > 0 && "[" == val.charAt(0) && "]" == val.charAt(val.length - 1);
    };
    Svidget.Conversion.isQuotedString = function(val) {
        if (!val) return false;
        val = (val + "").trim();
        return val.length > 0 && Svidget.isString(val) && ("'" == val.charAt(0) && "'" == val.charAt(val.length - 1) || '"' == val.charAt(0) && '"' == val.charAt(val.length - 1));
    };
    Svidget.Conversion.parseArray = function(val) {
        val = Svidget.Conversion.jsonifyString(val);
        // convert single to double chars or else parser chokes
        var wrap = '{"d":' + val + "}";
        // note, this fails when the array uses single quotes
        try {
            var result = JSON.parse(wrap);
            return result && result.d ? result.d : null;
        } catch (ex) {
            // not an array after all
            return null;
        }
    };
    // ['hello', 'world']
    // ['hello', 'world"it"']
    // ['hello', ['world"it"']]
    // ['he\'ll\'o', ['world"it"']]
    // try this if below doesn't work: https://gist.github.com/thejsj/aad9c0392a59a7d87d9c
    Svidget.Conversion.jsonifyString = function(val) {
        if (null == val || val.indexOf("'") < 0) return val;
        val = (val + "").trim();
        for (var SQ = "'", DQ = '"', BS = "\\", result = "", inQuotes = false, quoteChar = null, escaped = false, i = 0; i < val.length; i++) {
            var char = val[i], newchar = char;
            // 'he\'ll\'o' => "he'll'o"
            // 'world"it"' => "world\"it\""
            if (char == SQ || char == DQ) {
                if (escaped) {
                    quoteChar == SQ && char == SQ ? result = result.substr(0, result.length - 1) : quoteChar == SQ && char == DQ && (// add a backslash because one was there before for double quote i.e. 'hello\"there' => "hello\\\"there"
                    newchar = BS + BS + DQ);
                    escaped = false;
                } else if (inQuotes && char == quoteChar) {
                    inQuotes = false;
                    quoteChar = null;
                    newchar = DQ;
                } else if (inQuotes && char == DQ) // handle case of 'world"it"' => "world\"it\"" need to add backslashes
                newchar = BS + DQ; else if (!inQuotes) {
                    quoteChar = char;
                    inQuotes = true;
                    newchar = DQ;
                }
            } else char == BS && (escaped = true);
            result += newchar;
        }
        return result;
    };
    /**
 * A collection of methods for working with DOM elements.
 * @static
 * @memberof Svidget
 */
    Svidget.DOM = {
        // REMARKS
        // Wrapper for getElementById
        get: function(sel) {
            return document.getElementById ? document.getElementById(sel) : null;
        },
        getByName: function(tagName, asCollection) {
            return this.getChildrenByName(document, tagName, asCollection);
        },
        getByNameNS: function(namespace, tagName, asCollection) {
            if (!document.getElementsByTagNameNS) return null;
            var tags = document.getElementsByTagNameNS(namespace, tagName);
            return asCollection ? new Svidget.Collection(Svidget.array(tags)) : tags;
        },
        // Gets elements by tag name belonging to the svidget namespace
        getByNameSvidget: function(tagName, asCollection) {
            return this.getByNameNS(Svidget.Namespaces.svidget, tagName, asCollection);
        },
        getChildrenByName: function(source, tagName, asCollection) {
            var tags = source.getElementsByTagName(tagName);
            return asCollection ? new Svidget.Collection(Svidget.array(tags)) : tags;
        },
        // if sel is a string calls get()
        getElement: function(sel) {
            return "string" == typeof sel ? this.get(sel) : sel;
        },
        // gets an element by ID and returns a DomItem
        getItem: function(sel) {
            return this.wrap(this.get(sel));
        },
        // returns a DomQuery object
        select: function(sel) {
            // given a selector string free from any commas, looks up the elements/attributes for it
            // and returns a collection.
            function selectSingle(s) {
                if (null == s) return null;
                var attrName, attrRXEnd = /@([^=#\s]+)$/g, sel = s, match = attrRXEnd.exec(s);
                if (match) {
                    attrName = match[1];
                    // match the subgroup
                    sel = sel.replace(match[0], "");
                }
                // query
                var eles;
                try {
                    eles = document.querySelectorAll(sel);
                } catch (ex) {
                    // seelctor was invalid, so just return null
                    return null;
                }
                for (var col = [], i = 0; i < eles.length; i++) {
                    var item, ele = eles[i];
                    if (attrName) {
                        var attr = Svidget.DOM.attr(ele, attrName);
                        null != attr && (item = new Svidget.DOMItem(attr));
                    } else item = new Svidget.DOMItem(ele);
                    item && col.push(item);
                }
                return new Svidget.Collection(col);
            }
            // todo: support jQuery selector if querySelectorAll fails, it might be loaded on the page so we might as well use it if we can
            if (!document.querySelectorAll) return null;
            if (null == sel) return null;
            // new Svidget.DomQuery();
            // use querySelectorAll
            var res, attrRX = /@[^=#\s]+/g, hasAttr = attrRX.test(sel), col = new Svidget.Collection();
            // if selector has an attribute in it, split it first by comma
            if (hasAttr) for (var parts = sel.split(","), i = 0; i < parts.length; i++) {
                res = selectSingle(parts[i]);
                res && col.addRange(res);
            } else {
                res = selectSingle(sel);
                // its possible selector was bad, in which case we get null, so check
                res && col.addRange(res);
            }
            return new Svidget.DOMQuery(col, sel);
        },
        // Returns the first DOM element in a query
        selectElement: function(sel) {
            if ("string" == typeof sel) {
                var q = this.select(sel);
                return null == q || 0 == q.length ? null : q.item(0).source();
            }
            return this.isElement(sel) ? sel : null;
        },
        // returns a DomItem if ele is a element or attribute object
        // else returns the original item
        wrap: function(ele) {
            return new Svidget.DOMItem(ele);
        },
        // converts an HTML or SVG DOM node into a pure object literal used to transport
        transportize: function(ele) {
            return null == ele ? null : {
                name: ele.localName,
                namespace: ele.namespaceURI,
                value: ele.value,
                type: 1 == ele.nodeType ? Svidget.NodeType.element : 2 == ele.nodeType ? Svidget.NodeType.attribute : null
            };
        },
        // Elements
        root: function() {
            return document.documentElement;
        },
        rootItem: function() {
            // should we cache?
            return this.wrap(this.root());
        },
        attr: function(ele, attrName) {
            return ele.attributes[attrName];
        },
        attrValue: function(ele, attrName) {
            var a = this.attr(ele, attrName);
            return a ? a.value : null;
        },
        // determines if attribute is specified but empty/no value (i.e. <object data-crossdomain />
        isAttrEmpty: function(ele, attrName) {
            var av = this.attrValue(ele, attrName);
            return null != av && 0 == av.length;
        },
        clone: function(item) {},
        cloneDetached: function(item) {},
        isDOMNode: function(node) {
            return null == node ? null : !(null == node.namespaceURI || null == node.localName || null == node.nodeType || null == node.value && null == node.textContent || 1 != node.nodeType && 2 != node.nodeType);
        },
        fromNodeType: function(type) {
            return 1 == type ? "element" : 2 == type ? "attribute" : 3 == type ? "text" : null;
        },
        // TEXT
        text: function(sel, text) {
            var obj = this.select(sel);
            if (void 0 === text) return this.getText(obj);
            this.setText(obj, text);
        },
        getText: function(obj) {
            return obj.textContent ? obj.textContent : obj.innerHTML ? obj.innerHTML : null;
        },
        setText: function(obj, text) {
            obj.textContent ? obj.textContent = text + "" : obj.innerHTML && (obj.innerHTML = text + "");
        },
        // returns null - it means document hasn't loaded yet
        // returns undefined - it means document is loaded but not accessible due to security (cross domain) constraints
        getDocument: function(objOrWinEle) {
            try {
                var doc = objOrWinEle.contentDocument;
                null != objOrWinEle.contentWindow && objOrWinEle.contentWindow.document;
                // certain browsers (Chrome) returns a blank document instead of null
                // certain browsers (Chrome) returns a blank document instead of null
                return null != doc && "about:blank" == doc.URL ? null : doc;
            } catch (ex) {
                return;
            }
        },
        // determines if document for <object> or <iframe> is loaded and ready
        isElementDocumentReady: function(objOrWinEle) {
            return null !== this.getDocument(objOrWinEle);
        },
        isElement: function(ele) {
            // todo: fix this, won't work in node
            if (HTMLElement) //unknown
            return ele instanceof HTMLElement;
        },
        // todo move to DomItem
        attach: function(containerEle, eles) {},
        // detaches an element from the DOM
        // RETURNS
        // The elements that were detached
        detach: function(sel) {},
        disable: function(ele) {
            ele.disabled = true;
        },
        enable: function(ele) {
            ele.disabled = false;
        },
        show: function(ele, val) {
            ele.style.display = "initial";
            ele.style.visibility = "visible";
        },
        hide: function(ele, val) {
            ele.style.display = "none";
            ele.style.visibility = "hidden";
        },
        // Note: todo: for on and off
        // wrap callback in compat layer with jQuery style event object
        // PARAMS
        // obj: object to attach listener to
        // name: type of event i.e. "click"
        // callback: function to call back
        // capture: whether in capture/bubble
        // RETURNS
        // true if successful
        // REMARKS
        // Note: this is for DOM events
        // todo: support for event delegation?
        on: function(obj, type, callback, capture) {
            capture = !!capture;
            // normalize to bool (default == false)
            var attached = false;
            if (obj.addEventListener) {
                // Supports DOM spec
                obj.addEventListener(type, callback, capture);
                attached = true;
            } else if (obj.attachEvent) {
                // IE8 and below
                obj.attachEvent("on" + type, callback);
                attached = true;
            }
            // obj doesn't support events
            return attached;
        },
        off: function(obj, type, callback, capture) {
            capture = !!capture;
            // normalize to bool (default == false)
            var detached = false;
            if (obj.removeEventListener) {
                obj.removeEventListener(type, callback, false);
                detached = true;
            } else if (document.detachEvent) {
                document.detachEvent("on" + type, callback);
                detached = true;
            }
            // obj doesn't support events
            return detached;
        }
    };
    /**
 * Encapsulates a single DOM element or attribute.
 * @class
 * @param {object} source - A DOM element or attribute. Can be null
 */
    Svidget.DOMItem = function(source) {
        function getType(typeCode) {
            return typeCode == Svidget.NodeType.element ? "element" : typeCode == Svidget.NodeType.attribute ? "attribute" : null;
        }
        function getNamespaceType(namespace) {
            for (var n in Svidget.Namespaces) if (namespace === Svidget.Namespaces[n]) return n;
        }
        this.__type = "Svidget.DOMItem";
        source = source || {};
        // default source to empty object
        // privates
        var privates = new function() {
            this.writable = [ "value" ];
            this.type = null;
            this.typeCode = null;
            this.name = null;
            this.value = null;
            this.namespace = null;
            this.source = source;
            this.sourceDOM = Svidget.DOM.isDOMNode(source);
        }();
        // private accessors
        this.setup(privates);
        if (privates.sourceDOM) {
            privates.typeCode = 1 == source.nodeType ? Svidget.NodeType.element : 2 == source.nodeType ? Svidget.NodeType.attribute : null;
            privates.name = source.localName;
            privates.namespace = source.namespaceURI;
        } else {
            privates.typeCode = source.type;
            privates.name = source.name;
            privates.namespace = source.namespace;
        }
        privates.value = source.value || source.textContent;
        privates.type = getType(privates.typeCode);
        privates.namespaceType = getNamespaceType(privates.namespace);
        // build attributes
        this.cachedAttributes = null;
        // build child elements
        this.cachedElements = null;
    };
    Svidget.DOMItem.prototype = {
        typeCode: function() {
            return this.getset("type");
        },
        //	type: function () {
        //		var type = this.typeCode();
        //		if (type == Svidget.NodeType.element) return "element";
        //		if (type == Svidget.NodeType.attribute) return "attribute";
        //		return null;
        //	},
        /**
	 * Gets the element or attribute name of the item.
	 * @method
	 * @returns {string}
	*/
        name: function() {
            return this.getset("name");
        },
        /**
	 * Gets the element text content or the attribute value.
	 * @method
	 * @returns {string}
	*/
        value: function(val) {
            var source = this.source();
            if (void 0 === val) return source.value || source.textContent;
            var strval = val + "";
            source.value ? source.value = strval : source.textContent = strval;
        },
        /**
	 * Gets the namespace URI for the element or attribute item.
	 * @method
	 * @returns {string}
	*/
        namespace: function() {
            return this.getset("namespace");
        },
        /**
	 * Gets the namespace type i.e. html, svg, xlink, svidget, etc.
	 * @method
	 * @returns {string}
	*/
        namespaceType: function() {
            return this.getset("namespaceType");
        },
        //	namespaceType: function () {
        //		var ns = this.namespace();
        //		for (var n in Svidget.Namespaces) {
        //			if (ns === Svidget.Namespaces[n]) return n;
        //		}
        //	},
        /**
	 * Gets whether the item has child elements.
	 * @method
	 * @returns {boolean}
	*/
        hasElements: function() {
            if (this.isAttribute()) return false;
            var source = this.source();
            return !!(this.isAttached() || source.children && source.children.length) && source.children.length > 0;
        },
        /**
	 * Gets whether the item has attributes. False when the item is an attribute.
	 * @method
	 * @returns {boolean}
	*/
        hasAttributes: function() {
            if (this.isAttribute()) return false;
            var source = this.source();
            return !!(this.isAttached() || source.attributes && source.attributes.length) && source.attributes.length > 0;
        },
        /**
	 * Gets whether the item is an attribute.
	 * @method
	 * @returns {boolean}
	*/
        isAttribute: function() {
            return this.type() == Svidget.NodeType.attribute;
        },
        /**
	 * Returns a collection of DOMItem objects representing child elements. Returns null if item is an attribute.
	 * @method
	 * @returns {Svidget.Collection} - the collection of DOMItems
	*/
        elements: function() {
            // lazy load
            if (null != this.cachedElements && Svidget.isArray(this.cachedElements)) return this.cachedElements;
            var isDOM = this.isAttached(), source = this.source();
            if (!(isDOM || source.elements && source.elements.length)) return null;
            var origcol = isDOM ? source.children : source.elements, eles = new Svidget.Collection(Svidget.array(origcol));
            eles = eles.select(function(e) {
                return new Svidget.DOMItem(e);
            });
            this.cachedElements = eles;
            return this.cachedElements;
        },
        /**
	 * Returns a collection of DOMItem objects representing attributes. Returns null if item is an attribute.
	 * @method
	 * @returns {Svidget.Collection} - the collection of DOMItems
	*/
        attributes: function() {
            // lazy load
            if (null != this.cachedAttributes && Svidget.isArray(this.cachedAttributes)) return this.cachedAttributes;
            var isDOM = this.isAttached(), source = this.source();
            if (!(isDOM || source.attributes && source.attributes.length)) return null;
            var origcol = source.attributes, attrs = new Svidget.Collection(Svidget.array(origcol));
            attrs = attrs.select(function(a) {
                return new Svidget.DOMItem(a);
            });
            this.cachedAttributes = attrs;
            return this.cachedAttributes;
        },
        /**
	 * Gets the underlying DOM object that this DOMItem instance wraps.
	 * @method
	 * @returns {(HTMLElement|HTMLAttribute)} - the underlying DOM object
	*/
        source: function() {
            return this.getset("source");
        },
        /**
	 * Returns whether the DOMItem actually wraps an underlying DOM object.
	 * @method
	 * @returns {Svidget.Collection} - the collection of DOMItems
	*/
        isAttached: function() {
            return this.getset("sourceDOM");
        }
    };
    // future item: extend EventPrototype when adding events to DOMItem.
    Svidget.extend(Svidget.DOMItem, Svidget.ObjectPrototype);
    /**
 * Represents the result of a DOM query. Chainable. Behaves similar to a jQuery object.
 * @class
 * @param {Array} domItemCollection - An array or array-like collection of DOMItem objects.
 * @param {string} selector - The selector used to get the items for this query.
 */
    Svidget.DOMQuery = function(domItemCollection, selector) {
        this.__type = "Svidget.DOMQuery";
        var items = new Svidget.Collection(domItemCollection), privates = new function() {
            this.writable = [];
            this.items = items;
            this.selector = selector;
        }();
        // private accessors
        this.getPrivate = Svidget.getPrivateAccessor(privates);
        this.setPrivate = Svidget.setPrivateAccessor(privates);
        // define length readonly property
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: false,
            writable: false,
            value: items.length || 0
        });
    };
    Svidget.DOMQuery.prototype = {
        /**
	 * Gets the collection of items that are the result of the query.
	 * @method
	 * @returns {Svidget.Collection}
	*/
        items: function() {
            return this.getset("items");
        },
        /**
	 * Gets the item in the collection at the specified index.
	 * @method
	 * @param {number} index - The index
	 * @returns {Svidget.Collection}
	*/
        item: function(index) {
            var items = this.items();
            return null == items ? null : items[index];
        },
        /**
	 * Gets whether the collection has any items.
	 * @method
	 * @returns {boolean}
	*/
        hasItems: function() {
            //return this.items().length > 0;
            return this.length > 0;
        },
        /**
	 * Gets the selector string used for this query.
	 * @method
	 * @returns {string}
	*/
        selector: function() {
            return this.getset("selector");
        },
        /**
	 * Sets the value of each item in the collection.
	 * @method
	 * @returns {string}
	*/
        setValue: function(val) {
            this.items().each(function(i) {
                i.value(val);
            });
        },
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.DOMQuery { selector: "' + this.selector() + '", items: ' + this.items().length + "}]";
        }
    };
    // note: down the road we may make this more like a jquery object
    Svidget.extend(Svidget.DOMQuery, Svidget.ObjectPrototype);
    // Enums
    /**
 * Represents the DOM document type.
 * @enum
 * @readonly
 */
    Svidget.DocType = {
        html: 0,
        svg: 1
    };
    /**
 * Represents the ready state for a document.
 * @enum
 * @readonly
 */
    Svidget.DocReadyState = {
        loading: 0,
        //'loading',
        interactive: 1,
        //'interactive',
        complete: 2
    };
    /**
 * Represents the ready state for an element.
 * @enum
 * @readonly
 */
    Svidget.ElementReadyState = {
        uninitialized: 0,
        loading: 1,
        loaded: 2,
        interactive: 3,
        complete: 4
    };
    /**
 * Represents the core types for a Param object.
 * @enum
 * @readonly
 */
    Svidget.ParamTypes = {
        object: 0,
        string: 1,
        number: 2,
        boolean: 3,
        bool: 3,
        // deprecate
        array: 4,
        function: 5
    };
    /**
 * Represents the core subtypes for a Param object.
 * @enum
 * @readonly
 */
    Svidget.ParamSubTypes = {
        none: 0,
        color: 1,
        integer: 2,
        regex: 3,
        choice: 4
    };
    /**
 * Represents the item type for an xml node.
 * @enum
 * @readonly
 */
    Svidget.NodeType = {
        element: 0,
        attribute: 1
    };
    /**
 * Represents xml namespaces used by this framework.
 * @enum
 * @readonly
 */
    Svidget.Namespaces = {
        html: "http://www.w3.org/1999/xhtml",
        // also used for HTML5
        svidget: "http://www.svidget.org/svidget",
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink"
    };
    /**
 * Represents an event triggers by the framework.
 * @class
 * @param {string} name - The name of the event as specified when registering a handler.
 * @param {string} type - The type of the event, like "actioninvoke", "eventtrigger" etc.
 * @param {object} data - An arbitrary object passed in when registering a handler.
 * @param {object} target - The framework object that is the latest object to trigger the event, i.e. do to an event bubble.
 * @param {object} origTarget - The framework object that originally triggered the event.
 * @param {object} value - The value associated with the event. This is specific to the type of event that was triggered.
 */
    Svidget.Event = function(name, type, data, target, origTarget, value) {
        /**
	 * Gets the current object (param, action, etc) that currently triggered event (either original or current bubble target).
	*/
        Object.defineProperty(this, "currentTarget", Svidget.readOnlyProperty(target));
        /**
	 * Gets the data that was passed at bind time (writable).
	*/
        Object.defineProperty(this, "data", Svidget.fixedProperty(data));
        /**
	 * Gets the name of the handler specified at bind time (writable).
	*/
        Object.defineProperty(this, "name", Svidget.fixedProperty(name));
        /**
	 * Gets the date/time timestamp when the event was triggered.
	*/
        Object.defineProperty(this, "timeStamp", Svidget.readOnlyProperty(+new Date()));
        /**
	 * Gets the object (param, action, etc) that triggered event.
	*/
        Object.defineProperty(this, "target", Svidget.readOnlyProperty(null == origTarget ? target : origTarget));
        /**
	 * Gets the event type i.e. "invoke", "change", "actioninvoke", "eventtrigger" etc
	*/
        Object.defineProperty(this, "type", Svidget.readOnlyProperty(type));
        /**
	 * Gets the value specified at trigger time.
	*/
        Object.defineProperty(this, "value", Svidget.readOnlyProperty(value));
    };
    Svidget.Event.prototype = {
        /**
	 * Gets whether propagation was stopped on this event. When true this event will not bubble to parent.
	 * @method
	 * @returns {boolean}
	*/
        isPropagationStopped: Svidget.returnFalse,
        /**
	 * Gets whether immediate propagation was stopped on this event. When true, no futher handlers will be invoked and this event will not bubble to parent.
	 * @method
	 * @returns {boolean}
	*/
        isImmediatePropagationStopped: Svidget.returnFalse,
        /**
	 * Stops propagation for this event.
	 * @method
	*/
        stopPropagation: function() {
            this.isPropagationStopped = Svidget.returnTrue;
        },
        /**
	 * Stops immediate propagation for this event.
	 * @method
	*/
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
    };
    /**
 * Implements EventPrototype as a standalone object.
 * @class
 * @param {Array} typelist - An array of types that this event container accepts.
 * @param {object} target - The object instantiating this object that will be specified as the target when triggered.
 */
    Svidget.EventContainer = function(typelist, target) {
        this.__type = "Svidget.EventContainer";
        Svidget.EventPrototype.apply(this, [ typelist ]);
        this.target = target;
    };
    Svidget.EventContainer.prototype = new Svidget.EventPrototype();
    Svidget.extend(Svidget.EventContainer, {
        /**
	 * Gets the target object to use when triggering an event.
	 * @method
	 * @returns {object}
	*/
        getTarget: function() {
            return this.target;
        }
    }, true);
    /**
 * Represents the root object (access via global svidget var).
 * @constructor
 * @mixes ObjectPrototype
 * @memberof Svidget
 * @param {object} window - The window object in browser, or mock window object in server/node environment
 * @param {object} options - Options to simulate the environment (usually in node).
 */
    Svidget.Root = function(w, options) {
        this.__type = "Svidget.Root";
        var that = this;
        // update "window" - for node environments
        if (null != w) {
            window = w;
            document = w.document || {};
        }
        // private fields
        var privates = new function() {
            this.writable = [ "current", "widgets", "connected", "loaded" ];
            // Common:
            this.comm = new Svidget.Communicator();
            this.eventContainer = new Svidget.EventContainer([ "loaded" ], that);
            // todo: move event names to array at bottom
            this.loaded = false;
            // Widget:
            this.current = null;
            this.connected = false;
            // Page:
            this.widgets = null;
            // WidgetReferenceCollection
            this.options = options || {};
        }();
        // private accessors
        this.setup(privates);
        // state
        this.isBrowser = true;
        // whether in browser or in some other execution environment i.e. Node.js
        //this.root = root || window; // i.e. window
        //this.document = root.document || {};
        this.docType = null;
        this.setCurrent = function(widget) {
            privates.current = widget;
        };
        // invoke init
        // todo: convert to private methods
        this._init();
        // API Extensions
        Object.defineProperty(this, "conversion", Svidget.readOnlyProperty(Svidget.Conversion));
        Object.defineProperty(this, "Collection", Svidget.readOnlyProperty(Svidget.Collection));
        Object.defineProperty(this, "dom", Svidget.readOnlyProperty(Svidget.DOM));
        Object.defineProperty(this, "util", Svidget.readOnlyProperty(Svidget.Util));
        // set this singleton instance
        Svidget.root = this;
    };
    Svidget.Root.prototype = {
        _init: function() {
            //this._initDomObjects();
            this._initEvents();
            this._initPrototypes();
            this.initInternal();
            this._initReady();
        },
        _initEvents: function() {},
        _initPrototypes: function() {
            this.isWidget() ? Svidget.extend(Svidget.Root, Svidget.Root.WidgetPrototype, true) : Svidget.extend(Svidget.Root, Svidget.Root.PagePrototype, true);
        },
        _initReady: function() {
            // is DOM loaded?
            // if not attach handler, if so call ready
            this.isDomReady() ? this._ready() : // add ready handler
            this.addReadyEvents();
        },
        // protected: overriden in prototypes
        initInternal: function() {},
        _ready: function() {
            // if widget create Widget class
            this.isReady = true;
            this.isWidget() ? this.readyWidget() : this.readyPage();
        },
        getDocType: function() {
            // determine if in widget
            if (!document.documentElement) return Svidget.DocType.html;
            var localName = document.documentElement.localName, namespaceUri = document.documentElement.namespaceURI;
            return "svg" == localName && namespaceUri == Svidget.Namespaces.svg ? Svidget.DocType.svg : Svidget.DocType.html;
        },
        getOption: function(name) {
            return this.options()[name];
        },
        /**
	 * Determines if the framework is instantiated in a widget file.
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @returns {boolean}
	*/
        isWidget: function() {
            if (this.getOption("mode") == Svidget.DocType.svg) return true;
            // for debugging
            this.docType = this.getDocType();
            return this.docType == Svidget.DocType.svg;
        },
        // ready if interactive or complete
        isDomReady: function() {
            // determine DOM loaded
            var rs = document.readyState;
            return !(null == rs || !Svidget.DocReadyState[rs]) && Svidget.DocReadyState[rs] >= Svidget.DocReadyState.interactive;
        },
        addReadyEvents: function() {
            // attach to: DOMContentLoaded, readystatechange, load
            // we attach at all 3 stages
            var handler = Svidget.wrap(this.readyHandler, this);
            Svidget.DOM.on(document, "DOMContentLoaded", handler);
            Svidget.DOM.on(document, "readystatechange", handler);
            Svidget.DOM.on(window, "load", handler);
        },
        readyHandler: function() {
            this.ensureReady();
        },
        ensureReady: function() {
            this.isReady || this._ready();
            this.isReady = true;
        },
        // note: loaded state only applies to declared widgets ? (needs determiniation)
        // widgets loaded via svidget.load() 
        markLoaded: function() {
            if (true !== this.getset("loaded")) {
                this.getset("loaded", true);
                this.triggerLoad();
            }
        },
        eventContainer: function() {
            return this.getset("eventContainer");
        },
        /**
	 * Registers an event handler for the global object.
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {string} type - The event type i.e. "load".
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        on: function(type, data, name, handler) {
            this.eventContainer().on(type, data, name, handler);
        },
        /**
	 * Unregisters an event handler for the global object.
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {string} type - The event type i.e. "load".
	 * @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	 * @returns {boolean} - True if the event handler was successfully removed.
	*/
        off: function(type, handlerOrName) {
            this.eventContainer().off(type, handlerOrName);
        },
        // public
        // triggers the event, using the specified data as input
        trigger: function(name, value) {
            // call something on parent widget
            this.eventContainer().trigger(name, value);
        },
        /**
	 * Registers an event handler for the "load" event for the global object.
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        // deprecate loaded in favor of onload
        loaded: function(data, name, handler) {
            this.onload(data, name, handler);
        },
        onload: function(data, name, handler) {
            this.on("load", data, name, handler);
        },
        offload: function(handlerOrName) {
            this.off("load", handlerOrName);
        },
        offdeclaredload: function() {
            this.off("load", Svidget.declaredHandlerName);
        },
        /**
	 * Registers an event handler for the "widgetload" event for the global object.
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        // wires up a handler for the "widgetload" event
        widgetloaded: function(data, name, handler) {
            this.widgetloaded(data, name, handler);
        },
        onwidgetload: function(data, name, handler) {
            this.on("widgetload", data, name, handler);
        },
        offwidgetload: function(handlerOrName) {
            this.off("widgetload", handlerOrName);
        },
        offdeclaredwidgetload: function() {
            this.off("widgetload", Svidget.declaredHandlerName);
        },
        // internal
        triggerLoad: function() {
            this.trigger("load");
        },
        // internal
        triggerWidgetLoad: function(widgetID) {
            this.trigger("widgetload", widgetID);
        },
        comm: function() {
            return this.getset("comm");
        },
        routeFromParent: function(name, payload) {
            Svidget.log("root: routeFromParent {name: " + name + "}");
            this.comm().receiveFromParent(name, payload);
        },
        routeFromWidget: function(name, payload, widgetID) {
            Svidget.log("root: routeFromWidget {name: " + name + "}");
            this.comm().receiveFromWidget(name, payload, widgetID);
        },
        receiveFromParent: function(name, payload) {},
        receiveFromWidget: function(name, payload, widgetID) {},
        /**
	 * Gets the current widget. 
	 * @method
	 * @abstract
	 * @returns {Svidget.Widget} - The current widget.
	*/
        current: function() {
            return null;
        },
        /**
	 * Gets whether the widget is connected to a parent page.
	 * @method
	 * @abstract
	 * @memberof Svidget.Root
	 * @returns {boolean}
	*/
        connected: function(val) {
            var res = this.getset("connected", val);
            // if undefined its a get so return value, if res is false then set failed
            // if undefined its a get so return value, if res is false then set failed
            return !(void 0 === val || !res) || res;
        },
        options: function() {
            return this.getset("options");
        }
    };
    Svidget.extend(Svidget.Root, Svidget.ObjectPrototype);
    /**
 * A collection of util methods.
 * @static
 * @memberof Svidget
 */
    Svidget.Util = {};
    /**
 * Gets all the values from the query string and returns the result as an object.
 * @static
 * @memberof Svidget
 * @param {bool} duplicates - if true, group duplicates into an array (default == false)
 * @param {} lastOneWins - if true, then last duplicate encountered will win, else first one will win (default == false)
 */
    // todo: protect from overwriting
    Svidget.Util.queryString = function(duplicates, lastOneWins) {
        var urlParams = {};
        if (!window.location) return urlParams;
        for (var match, queryString = null == window.location.search || window.location.search.length > 0 ? window.location.search : "", pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
            return decodeURIComponent(s.replace(pl, " "));
        }, query = queryString.substring(1); match = search.exec(query); ) {
            // index 1 and 2 because those are the subgroups in parens (), index 0 is the whole string match
            var name = decode(match[1]), value = decode(match[2]);
            duplicates ? void 0 !== urlParams[name] ? Svidget.isArray(urlParams[name]) ? urlParams[name].push(value) : urlParams[name] = [ urlParams[name], value ] : urlParams[name] = value : (lastOneWins || void 0 === urlParams[name]) && (urlParams[name] = value);
        }
        return urlParams;
    };
    /**
 * Represents an widget action, defined by <svidget:action>.
 * @class
 * @mixes Svidget.ObjectPrototype
 * @augments Svidget.EventPrototype
 * @memberof Svidget
 * @param {string} name - The name of the action.
 * @param {object} options - The options for the action param. Example: { enabled: true, description: "An action" }
 * @param {Svidget.Widget} parent - The widget instance that is the parent for this action.
 */
    Svidget.Action = function(name, options, parent) {
        function resolveBinding(binding) {
            if (null == binding) return null;
            "function" != typeof binding && (binding = c.toString(binding));
            return binding;
        }
        function loadParams(params) {
            if (null != params && Svidget.isArray(params)) for (var i = 0; i < params.length; i++) {
                var p = params[i];
                // note: failures to add will be skipped/ignored
                null != p.name && that.addParam(p.name, p);
            }
        }
        this.__type = "Svidget.Action";
        // validate:
        // name is not null
        options = options || {};
        parent = parent instanceof Svidget.Widget ? parent : null;
        // parent can only be a Widget
        var that = this, c = Svidget.Conversion, privates = new function() {
            this.writable = [ "binding", "bindingFunc", "enabled", "external", "description" ];
            this.params = new Svidget.ActionParamCollection([], that);
            this.name = c.toString(name);
            this.description = c.toString(options.description);
            this.enabled = null == options.enabled || c.toBool(options.enabled);
            this.binding = resolveBinding(options.binding);
            this.external = null == options.external || c.toBool(options.external);
            this.parent = parent;
            this.bindingFunc = null;
        }();
        // private accessors
        this.setup(privates);
        // create bindingFunc from binding
        // binding can be string or function
        privates.bindingFunc = Svidget.findFunction(privates.binding);
        // wire up event bubble parent
        this.registerBubbleCallback(Svidget.Action.eventTypes, parent, parent.actionBubble);
        // add/remove event handlers for params
        this.wireCollectionAddRemoveHandlers(privates.params, that.paramAdded, that.paramRemoved);
        // load the params into the ActionParamCollection instance
        loadParams(options.params);
    };
    Svidget.Action.prototype = {
        /**
	 * Gets the action name.
	 * @method
	 * @returns {string}
	*/
        name: function(val) {
            return void 0 === val && this.getPrivate("name");
        },
        /**
	 * Gets the parent widget.
	 * @method
	 * @returns {Svidget.Widget}
	*/
        parent: function() {
            return this.getPrivate("parent");
        },
        /**
	 * Gets whether the action is attached to the widget.
	 * @method
	 * @returns {boolean}
	*/
        attached: function() {
            var widget = this.parent();
            return null != widget && widget instanceof Svidget.Widget;
        },
        /**
	 * Gets or sets whether the action is enabled. 
	 * @method
	 * @param {boolean} [val] - Sets the enabled state when specified.
	 * @returns {boolean} - The enabled state when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        enabled: function(val) {
            null === val && (val = true);
            var res = this.getset("enabled", val, "bool");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getset("enabled");
            // get converted value
            this.trigger("change", {
                property: "enabled",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the description.
	 * @method
	 * @param {string} [val] - Sets the value when specified.
	 * @returns {string} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        description: function(val) {
            var res = this.getset("description", val, "string");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("description");
            // get converted value
            this.trigger("change", {
                property: "description",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets whether the action is external and can be invoked from the page. 
	 * @method
	 * @param {boolean} [val] - Sets the value when specified.
	 * @returns {boolean} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        external: function(val) {
            null === val && (val = true);
            var res = this.getset("external", val, "bool");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("external");
            // get converted value
            this.trigger("change", {
                property: "external",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the binding for the action. This can be a global function name, or a function.
	 * @method
	 * @param {Boolean} [val] - Sets the value when specified.
	 * @returns {Boolean} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        binding: function(bind) {
            // bind can be string or function, so check for both, enforce
            if (void 0 !== bind) {
                "function" != typeof bind && null !== bind && (bind += "");
                // coerce to string
                // update bindingFunc
                var func = Svidget.findFunction(bind);
                this.getset("bindingFunc", func);
            }
            var res = this.getset("binding", bind);
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === bind || !!!res) return res;
            // fire "changed" event
            this.trigger("change", {
                property: "binding",
                value: bind
            });
            // set was successful
            return true;
        },
        /**
	 * Gets the binding function for the action.
	 * @method
	 * @returns {Function} - The binding function.
	*/
        bindingFunc: function() {
            return this.getset("bindingFunc");
        },
        /**
	 * Invokes the action. The params passes in will be passed to the action params in order.
	 * @method
	 * @param {...object} args - The arguments that correspond to action params.
	 * @returns {boolean} - True if invoke succeeds.
	*/
        invoke: function() {
            if (!this.enabled()) return false;
            var func = this.invocableBindingFunc();
            if (!func) return false;
            var argArray = this.buildArgumentArray(Svidget.array(arguments)), returnVal = func.apply(null, argArray);
            //Svidget.root, arguments);
            //var argObj = this.toArgumentObject(Svidget.array(arguments));
            this.trigger("invoke", {
                returnValue: returnVal
            });
            return true;
        },
        invokeApply: function(args) {
            this.invoke.apply(this, args);
        },
        invocableBindingFunc: function() {
            var func = this.bindingFunc();
            return null == func || "function" != typeof func ? null : func;
        },
        // builds an array of argument to use in invoke() based on the action params
        buildArgumentArray: function(args) {
            var argsArray = [];
            args = null == args ? [] : args;
            // loop through action params
            for (var col = this.params(), i = 0; i < col.length; i++) {
                var p = col[i], arg = void 0;
                i < args.length && (arg = args[i]);
                void 0 === arg && (arg = p.defvalue());
                // an arg wasn't supplied by caller, so use default value from action param if provided
                argsArray.push(arg);
            }
            return argsArray;
        },
        // build an object based on the action params, and values from arguments on invoke
        // update: not currently used
        toArgumentObject: function(args) {
            // loop through action params
            for (var argsObj = {}, col = this.params(), i = 0; i < col.length; i++) {
                var p = col[i], arg = void 0;
                i < args.length && (arg = args[i]);
                void 0 === arg && (arg = p.defvalue());
                // an arg wasn't supplied by caller, so use default value from action param if provided
                argsObj[p.name()] = arg;
            }
            return argsObj;
        },
        /**
	 * Gets a collection of all ActionParam objects, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * params(0)
	 * params("color")
	 * @method
	 * @param {(string|number|function)} [selector] - The param name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.Collection} - A collection based on the selector, or the entire collection.
	*/
        params: function(selector) {
            var col = this.getset("params");
            return this.select(col, selector);
        },
        /**
	 * Gets the ActionParam based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * param(0)
	 * param("color")
	 * @method
	 * @param {(string|number|function)} selector - The param name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.ActionParam} - The ActionParam based on the selector. If selector is invalid, null is returned.
	*/
        param: function(selector) {
            //var item = this.params(selector).first();
            var col = this.getset("params");
            return this.selectFirst(col, selector);
        },
        /**
	 * Creates a new ActionParam but does not add to the Action.
	 * Examples:
	 * newParam("backColor")
	 * newParam("backColor", { description: "Background color."})
	 * @method
	 * @param {string} name - The name of the ActionParam.
	 * @param {object} [options] - The options used to contruct the ActionParam. Example: { enabled: true, description: "A param" }
	 * @returns {Svidget.ActionParam} - The ActionParam that was added, or null if ActionParam failed to add.
	*/
        newParam: function(name, options) {
            return new Svidget.ActionParam(name, options, this);
        },
        /**
	 * Adds a ActionParam to the action. If a duplicate name is supplied the ActionParam will fail to add.
	 * Examples:
	 * addParam("backColor")
	 * addParam("backColor", { description: "Background color."})
	 * @method
	 * @param {string} name - The name of the ActionParam to add.
	 * @param {object} [options] - The options used to contruct the ActionParam. Example: { description: "A param" }
	 * @returns {Svidget.ActionParam} - The ActionParam that was added, or null if ActionParam failed to add.
	*/
        addParam: function(name, options) {
            return this.params().add(name, options, this);
        },
        /**
	 * Removes an ActionParam from the action. 
	 * Examples:
	 * removeParam("color")
	 * @method
	 * @param {string} name - The name of the ActionParam to remove.
	 * @returns {boolean} - True if the Param was successfully removed, false otherwise.
	*/
        removeParam: function(name) {
            return this.params().remove(name);
        },
        /**
	 * Removes all ActionParams from the widget. 
	 * Examples:
	 * removeAllParams()
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {Boolean} - True if all the ActionParams were successfully removed, false otherwise.
	*/
        removeAllParams: function() {
            return this.params().clear();
        },
        paramBubble: function(type, event, param) {
            "change" == type && this.paramChanged(param, event.value);
        },
        // handle param added
        paramChanged: function(param, eventValue) {
            Svidget.log("action: param changed: " + param.name());
            this.trigger("paramchange", eventValue, param);
        },
        // handle param added
        paramAdded: function(param) {
            Svidget.log("action: param added: " + param.name());
            this.trigger("paramadd", param);
        },
        // private
        // handle param removed
        paramRemoved: function(param) {
            Svidget.log("action: param removed: " + param.name());
            this.trigger("paramremove", param.name());
        },
        /**
	* Adds an event handler for the "change" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        ondeclaredchange: function(handler) {
            return this.onchange(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        offdeclaredchange: function() {
            return this.offchange(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "invoke" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        oninvoke: function(data, name, handler) {
            return this.on("invoke", data, name, handler);
        },
        ondeclaredinvoke: function(handler) {
            return this.oninvoke(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "invoke" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offinvoke: function(handlerOrName) {
            return this.off("invoke", handlerOrName);
        },
        offdeclaredinvoke: function() {
            return this.offinvoke(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "paramadd" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamadd: function(data, name, handler) {
            return this.on("paramadd", data, name, handler);
        },
        ondeclaredparamadd: function(handler) {
            return this.onparamadd(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "paramadd" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamadd: function(handlerOrName) {
            return this.off("paramadd", handlerOrName);
        },
        offdeclaredparamadd: function() {
            return this.offparamadd(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "paramremove" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamremove: function(data, name, handler) {
            return this.on("paramremove", data, name, handler);
        },
        ondeclaredparamremove: function(handler) {
            return this.onparamremove(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "paramremove" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamremove: function(handlerOrName) {
            return this.off("paramremove", handlerOrName);
        },
        offdeclaredparamremove: function() {
            return this.offparamremove(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "paramremove" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamchange: function(data, name, handler) {
            return this.on("paramchange", data, name, handler);
        },
        ondeclaredparamchange: function(handler) {
            return this.onparamchange(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "paramremove" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamchange: function(handlerOrName) {
            return this.off("paramchange", handlerOrName);
        },
        offdeclaredparamchange: function() {
            return this.offparamchange(Svidget.declaredHandlerName);
        },
        // helpers
        /**
	 * Serializes the Action object for transport across a window boundary.
	 * @method
	 * @returns {boolean} - A generic serialized object representing the Action.
	*/
        toTransport: function() {
            return {
                name: this.name(),
                description: this.description(),
                external: this.external(),
                enabled: this.enabled(),
                //binding: this.binding(), // not accessible by proxy
                params: this.toParamsTransport()
            };
        },
        toParamsTransport: function() {
            return this.params().select(function(p) {
                return p.toTransport();
            }).toArray();
        },
        // overrides
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.Action { name: "' + this.name() + '" }]';
        }
    };
    Svidget.Action.eventTypes = [ "invoke", "change", "paramchange", "paramadd", "paramremove" ];
    Svidget.Action.optionProperties = [ "external", "binding", "enabled", "description" ];
    Svidget.Action.allProxyProperties = [ "name", "external", "enabled", "description" ];
    Svidget.Action.writableProxyProperties = [];
    Svidget.extend(Svidget.Action, Svidget.ObjectPrototype);
    Svidget.extend(Svidget.Action, new Svidget.EventPrototype(Svidget.Action.eventTypes));
    /**
 * Represents a collection of Action objects.
 * @class
 * @augments Svidget.ObjectCollection
 * @memberof Svidget.Svidget
 * @param {array} array - An array of Action objects.
 * @param {Svidget.Widget} parent - The Widget instance that is the parent for this Action collection.
 */
    Svidget.ActionCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.Action ]);
        this.__type = "Svidget.ActionCollection";
        this.parent = parent;
        this._ctor = Svidget.ActionCollection;
    };
    Svidget.ActionCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.ActionCollection, {
        create: function(name, options, parent) {
            // create action
            // call addObject
            // create action
            // call addObject
            // ensure no other action exists in the collection by that name
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.Action(name, options, parent);
        }
    }, true);
    /**
 * Represents a param for an action, defined by <svidget:actionparam>.
 * @class
 * @mixes Svidget.ObjectPrototype
 * @augments Svidget.EventPrototype
 * @memberof Svidget
 * @param {string} name - The name of the action param.
 * @param {object} options - The options for the action param. Example: { type: "string", subtype: "regex", description: "An action param" }
 * @param {Svidget.Widget} parent - The widget instance that is the parent for this action.
 */
    Svidget.ActionParam = function(name, options, parent) {
        function resolveType(type, defvalue) {
            type = null == type ? Svidget.getType(defvalue) : Svidget.resolveType(type);
            // normalize type to a valid type
            return type;
        }
        this.__type = "Svidget.ActionParam";
        // todo validate:
        // name is not null
        options = options || {};
        // parent must be Action
        parent = parent instanceof Svidget.Action ? parent : null;
        // parent can only be a Action
        var c = Svidget.Conversion, privates = new function() {
            this.writable = [ "type", "subtype", "typedata", "description", "defvalue" ];
            this.name = c.toString(name);
            this.type = resolveType(options.type, options.defvalue);
            this.subtype = c.toString(options.subtype);
            this.typedata = c.toString(options.typedata);
            this.description = c.toString(options.description);
            this.defvalue = options.defvalue;
            //todo: convert to type
            // todo: add coerce to coerce param before calling action method
            this.parent = parent;
        }();
        // private accessors
        this.setup(privates);
        // wire up event bubble parent
        this.registerBubbleCallback(Svidget.ActionParam.eventTypes, parent, parent.paramBubble);
    };
    Svidget.ActionParam.prototype = {
        /**
	 * Gets the action param parent action.
	 * @method
	 * @returns {Svidget.Action}
	*/
        parent: function() {
            return this.getPrivate("parent");
        },
        /**
	 * Gets whether the action is attached to the widget.
	 * @method
	 * @returns {boolean}
	*/
        attached: function() {
            var parent = this.parent();
            return null != parent && parent instanceof Svidget.Action;
        },
        toTransport: function() {
            return {
                name: this.name(),
                type: this.type(),
                subtype: this.subtype(),
                typedata: this.typedata(),
                description: this.description(),
                defvalue: this.defvalue()
            };
        },
        /**
	* Adds an event handler for the "change" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        ondeclaredchange: function(handler) {
            return this.onchange(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        offdeclaredchange: function() {
            return this.offchange(Svidget.declaredHandlerName);
        },
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.ActionParam { name: "' + this.name() + '" }]';
        }
    };
    Svidget.ActionParam.eventTypes = [ "change" ];
    Svidget.ActionParam.optionProperties = [ "type", "subtype", "typedata", "description", "defvalue" ];
    Svidget.ActionParam.allProxyProperties = [ "name", "type", "subtype", "typedata", "description", "defvalue" ];
    Svidget.ActionParam.writableProxyProperties = [];
    Svidget.extend(Svidget.ActionParam, Svidget.ObjectPrototype);
    Svidget.extend(Svidget.ActionParam, Svidget.ParamPrototype);
    Svidget.extend(Svidget.ActionParam, new Svidget.EventPrototype(Svidget.ActionParam.eventTypes));
    /**
 * Represents a collection of ActionParam objects.
 * @class
 * @augments Svidget.ObjectCollection
 * @memberof Svidget.Svidget
 * @param {array} array - An array of ActionParam objects.
 * @param {Svidget.Action} parent - The Action instance that is the parent for this ActionParam collection.
 */
    Svidget.ActionParamCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.ActionParam ]);
        this.__type = "Svidget.ActionParamCollection";
        this.parent = parent;
        this._ctor = Svidget.ActionParamCollection;
    };
    Svidget.ActionParamCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.ActionParamCollection, {
        create: function(name, options, parent) {
            // create param
            // call addObject
            // create param
            // call addObject
            // ensure no other action exists in the collection by that name
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.ActionParam(name, options, parent);
        }
    }, true);
    /**
 * Represents an user-defined event for a widget, defined by <svidget:event>
 * @constructor
 * @mixes ObjectPrototype
 * @augments EventPrototype
 * @memberof Svidget
 * @param {string} name - The name of the event.
 * @param {object} options - The options for the event. Example: { enabled: true, description: "An event" }
 * @param {Svidget.Widget} parent - The widget instance that is the parent for this action.
 */
    Svidget.EventDesc = function(name, options, parent) {
        this.__type = "Svidget.EventDesc";
        // validate:
        // name is not null
        options = options || {};
        parent = parent instanceof Svidget.Widget ? parent : null;
        // parent can only be a Widget
        var that = this, c = Svidget.Conversion, privates = new function() {
            this.writable = [ "description", "enabled", "external" ];
            this.name = c.toString(name);
            this.description = c.toString(options.description);
            this.external = null == options.external || c.toBool(options.external);
            this.enabled = null == options.enabled || c.toBool(options.enabled);
            this.eventName = "trigger";
            // this is the internal name we use for the event
            this.eventContainer = new Svidget.EventContainer([ this.eventName ], that);
            this.parent = parent;
        }();
        // private accessors
        this.setup(privates);
        // wire up event bubble parent
        privates.eventContainer.registerBubbleCallback(Svidget.EventDesc.eventTypes, parent, parent.eventBubble);
    };
    Svidget.EventDesc.prototype = {
        /**
	 * Gets the event name.
	 * @method
	 * @returns {string}
	*/
        name: function(val) {
            return void 0 === val && this.getPrivate("name");
        },
        /**
	 * Gets whether the event is attached to the widget.
	 * @method
	 * @returns {boolean}
	*/
        attached: function() {
            this.parent();
            return null != this.parent && this.parent instanceof Svidget.Widget;
        },
        /**
	 * Gets the parent widget.
	 * @method
	 * @returns {Svidget.Widget}
	*/
        parent: function() {
            return this.getPrivate("parent");
        },
        /**
	 * Gets or sets whether the event is enabled. 
	 * @method
	 * @param {boolean} [val] - Sets the enabled state when specified.
	 * @returns {boolean} - The enabled state when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        enabled: function(val) {
            null === val && (val = true);
            var res = this.getset("enabled", val, "bool");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getset("enabled");
            // get converted value
            this.trigger("change", {
                property: "enabled",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the description.
	 * @method
	 * @param {string} [val] - Sets the value when specified.
	 * @returns {string} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        description: function(val) {
            var res = this.getset("description", val, "string");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("description");
            // get converted value
            this.trigger("change", {
                property: "description",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets whether the event is external and can be triggered from the page. 
	 * @method
	 * @param {boolean} [val] - Sets the value when specified.
	 * @returns {boolean} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        external: function(val) {
            null === val && (val = true);
            var res = this.getset("external", val, "bool");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("external");
            // get converted value
            this.trigger("change", {
                property: "external",
                value: val
            });
            // set was successful
            return true;
        },
        // private: used internally for a default event name for the container
        eventName: function() {
            return this.getPrivate("eventName");
        },
        eventContainer: function() {
            return this.getset("eventContainer");
        },
        /**
	 * Registers an event handler for the EventDesc object.
	 * @method
	 * @param {string} [type] - The event type i.e. "change". If not specified it is assumed it is for the event itself.
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        on: function(type, data, name, handler) {
            // if type is function, then assume type not passes so use default event name
            if (Svidget.isFunction(type)) {
                handler = type;
                type = this.eventName();
            }
            this.eventContainer().on(type, data, name, handler);
        },
        /**
	* Adds an event handler for the "trigger" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        ontrigger: function(data, name, handler) {
            this.eventContainer().on(this.eventName(), data, name, handler);
        },
        ondeclaredtrigger: function(handler) {
            return this.ontrigger(null, Svidget.declaredHandlerName, handler);
        },
        /**
	 * Unregisters an event handler for the EventDesc object.
	 * @method
	 * @param {string} [type] - The event type i.e. "change", "paramremove". If not specified it is assumed it is for the event itself.
	 * @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	 * @returns {boolean} - True if the event handler was successfully removed.
	*/
        off: function(type, handlerOrName) {
            // if type is function, then assume type not passes so use default event name
            if (Svidget.isFunction(type)) {
                handlerOrName = type;
                type = this.eventName();
            }
            this.eventContainer().off(type, handlerOrName);
        },
        /**
	* Removes an event handler for the "trigger" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offtrigger: function(handlerOrName) {
            this.eventContainer().off(this.eventName(), handlerOrName);
        },
        offdeclaredtrigger: function() {
            return this.offtrigger(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "change" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        ondeclaredchange: function(handler) {
            return this.onchange(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        offdeclaredchange: function() {
            return this.offchange(Svidget.declaredHandlerName);
        },
        /**
	* Triggers the event for the EventDesc object.
	* @method
	* @param {object} value - The value to set to the Event.value property.
	*/
        // Note: The use of type as a param is undocumented here. For public use we only want them passing value as a param.
        trigger: function(type, value) {
            if (this.enabled()) {
                if (void 0 === value) {
                    value = type;
                    type = this.eventName();
                }
                this.eventContainer().trigger(type, value);
            }
        },
        triggerEvent: function(value) {
            this.trigger(this.eventName(), value);
        },
        // helpers
        /**
	* Serializes the EventDesc object for transport across a window boundary.
	* @method
	* @returns {boolean} - A generic serialized object representing the EventDesc object.
	*/
        toTransport: function() {
            return {
                name: this.name(),
                description: this.description(),
                external: this.external(),
                enabled: this.enabled()
            };
        },
        // overrides
        /**
	* Gets a string representation of this object.
	* @method
	* @returns {string}
	*/
        toString: function() {
            return '[Svidget.EventDesc { name: "' + this.name() + '" }]';
        }
    };
    Svidget.EventDesc.eventTypes = [ "trigger", "change" ];
    Svidget.EventDesc.optionProperties = [ "external", "enabled", "description" ];
    Svidget.EventDesc.allProxyProperties = [ "name", "external", "enabled", "description", "eventContainer" ];
    Svidget.EventDesc.writableProxyProperties = [];
    Svidget.extend(Svidget.EventDesc, Svidget.ObjectPrototype);
    /**
 * Represents a collection of EventDesc objects.
 * @constructor
 * @augments ObjectCollection
 * @memberof Svidget
 * @param {Svidget.EventDesc[]} array - An array of EventDesc objects.
 * @param {Svidget.Widget} parent - The Widget instance that is the parent for this EventDesc collection.
 */
    Svidget.EventDescCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.EventDesc ]);
        this.__type = "Svidget.EventDescCollection";
        this.parent = parent;
        this._ctor = Svidget.EventDescCollection;
    };
    Svidget.EventDescCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.EventDescCollection, {
        create: function(name, options, parent) {
            // create param
            // call addObject
            // create param
            // call addObject
            // ensure no other action exists in the collection by that name
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.EventDesc(name, options, parent);
        }
    }, true);
    /**
 * Represents param for a widget, defined by <svidget:param>
 * @constructor
 * @mixes ObjectPrototype
 * @mixes ParamPrototype
 * @augments EventPrototype
 * @memberof Svidget
 * @param {string} name - The name of the param.
 * @param {object} value - The value for the param.
 * @param {object} options - The options for the param. Example: { enabled: true, description: "An event" }
 * @param {Svidget.Widget} parent - The widget that is the parent for this param.
 */
    // example usage: widget1.param("backgroundColor").value();
    Svidget.Param = function(name, value, options, parent) {
        function resolveType(type, value, defvalue) {
            // infer the type from the value or defvalue
            value = null != value ? value : defvalue;
            type = null == type ? Svidget.getType(value) : Svidget.resolveType(type);
            // normalize type to a valid type
            return type;
        }
        function resolveValue(val, type, subtype, typedata) {
            return Svidget.convert(val, type, subtype, typedata);
        }
        this.__type = "Svidget.Param";
        // todo: if name is not null, generate
        //if (name == null) 
        options = options || {};
        parent = parent instanceof Svidget.Widget ? parent : null;
        // parent can only be a Widget
        var c = Svidget.Conversion, privates = new function() {
            this.writable = [ "shortname", "binding", "enabled", "type", "subtype", "value", "description", "defvalue", "typedata", "coerce", "group" ];
            this.name = c.toString(name);
            this.shortname = c.toString(options.shortname);
            this.description = c.toString(options.description);
            this.enabled = null == options.enabled || c.toBool(options.enabled);
            this.type = resolveType(options.type, value, options.defvalue);
            // infer type from value/defvalue if type is null/undefined
            this.subtype = c.toString(options.subtype);
            // resolveSubtype(this.type, options.subtype);
            this.typedata = c.toString(options.typedata);
            this.coerce = c.toBool(options.coerce);
            // default is false
            this.group = c.toString(options.group);
            this.value = this.coerce ? resolveValue(value, this.type, this.subtype, this.typedata) : value;
            this.defvalue = options.defvalue;
            // note: only coerced to type when used as a value
            this.sanitizer = (Svidget.isFunction(options.sanitizer) ? options.sanitizer : c.toString(options.sanitizer)) || null;
            this.parent = parent;
            this.binding = c.toString(options.binding);
            this.bindingQuery = null;
        }();
        // private accessors
        this.setup(privates);
        // target or binding
        privates.bindingQuery = Svidget.DOM.select(privates.binding);
        // create sanitizerFunc from sanitizer
        // sanitizer can be string or function
        privates.sanitizerFunc = Svidget.findFunction(privates.sanitizer);
        this.valuePopulated = false;
        // flipped to true once a value has been assigned or the default value is applied
        // wire up event bubble parent
        this.registerBubbleCallback(Svidget.Param.eventTypes, parent, parent.paramBubble);
    };
    Svidget.Param.prototype = {
        /**
	 * Gets whether the param is attached to the widget.
	 * @method
	 * @returns {boolean}
	*/
        attached: function() {
            this.parent();
            return null != this.parent && this.parent instanceof Svidget.Widget;
        },
        /**
	 * Gets the parent widget.
	 * @method
	 * @returns {Svidget.Widget}
	*/
        parent: function() {
            return this.getPrivate("parent");
        },
        /**
	 * Gets or sets the shortname value. This is used for params passed from the query string.
	 * @method
	 * @param {boolean} [val] - Sets the shortname when specified.
	 * @returns {boolean} - The shortname when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        shortname: function(val) {
            var res = this.getset("shortname", val, "string");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("shortname");
            // get converted value
            this.trigger("change", {
                property: "shortname",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the group value. This is used to group/categorize params into groups.
	 * @method
	 * @param {boolean} [val] - Sets the group when specified.
	 * @returns {boolean} - The group when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        group: function(val) {
            var res = this.getset("group", val, "string");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getPrivate("group");
            // get converted value
            this.trigger("change", {
                property: "group",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets whether the event is enabled. 
	 * @method
	 * @param {boolean} [val] - Sets the enabled state when specified.
	 * @returns {boolean} - The enabled state when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        enabled: function(val) {
            null === val && (val = true);
            var res = this.getset("enabled", val, "bool");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getset("enabled");
            // get converted value
            this.trigger("change", {
                property: "enabled",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets or sets the param value.
	 * @method
	 * @param {boolean} [val] - Sets the enabled state when specified.
	 * @returns {boolean} - The enabled state when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        value: function(val) {
            if (!this.enabled() && void 0 !== val) return false;
            var res = this.getset("value", val, null, this.validateValue);
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // check enabled
            var finalVal = val;
            // coerce val if coerce === true
            true === this.getset("coerce") && (finalVal = this.coerceValue(finalVal));
            // sanitize val using param.sanitizer
            finalVal = this.applySanitizer(finalVal);
            this.setPrivate("value", finalVal);
            //update actual value to final value
            //if (sanVal === undefined) return false; // if sanitizer fails to returns a value, assume it has failed
            // apply to binding
            this.applyBinding(finalVal);
            // fire "set" event
            this.trigger("valuechange", {
                value: finalVal
            });
            // for backwards compatibility
            this.trigger("set", {
                value: finalVal
            });
            // 0.1.3: replaces "valuechange"
            return true;
        },
        /**
	 * Gets the serialized param value.
	 * @method
	 * @returns {string} - The serialized/stringified value.
	*/
        serializedValue: function() {
            var val = this.value();
            return Svidget.Conversion.toString(val);
        },
        /**
	 * Gets or sets whether the event is enabled. 
	 * @method
	 * @param {boolean} [val] - Sets the enabled state when specified.
	 * @returns {boolean} - The enabled state when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        coerce: function(val) {
            var res = this.getset("coerce", val, "bool");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getset("coerce");
            // get converted value
            this.trigger("change", {
                property: "coerce",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Coerces the value currently set on the param. Call this after changing the type to change the type of the value.
	 * @method
	*/
        //coerceValue: function () {
        //	// just set the value to itself, it will coerce and also fire events
        //	this.value(this.value());
        //},
        /**
	 * Gets or sets the param binding. This is a CSS+Attributes selector.
	 * @method
	 * @param {boolean} [val] - Sets the enabled state when specified.
	 * @returns {boolean} - The enabled state when nothing is passed, or true/false if succeeded or failed when setting.
	*/
        binding: function(bind) {
            //bind = bind !== undefined ? bind + "" : undefined; // coerce to string
            var res = this.getset("binding", bind, "string");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === bind || !!!res) return res;
            // construct bindingQuery object
            bind = this.getset("binding");
            // get converted value
            this.getset("bindingQuery", Svidget.DOM.select(bind));
            // fire "changed" event
            this.trigger("change", {
                property: "binding",
                value: bind
            });
            // set was successful
            return true;
        },
        bindingQuery: function() {
            return this.getset("bindingQuery");
        },
        /**
	* Gets or sets the sanitizer function for the param. The sanitizer function is called on set. 
	* The sanitizer function takes a param and value (param, value) and returns the result value.
	* This can be a global function name, or a function.
	* @method
	* @param {Boolean} [val] - Sets the value when specified.
	* @returns {Boolean} - The value for a get, or true/false if succeeded or failed for a set.
	*/
        sanitizer: function(funcName) {
            // bind can be string or function, so check for both, enforce
            if (void 0 !== funcName) {
                "function" != typeof funcName && (funcName += "");
                // coerce to string
                // update bindingFunc
                var func = Svidget.findFunction(funcName);
                this.getset("sanitizerFunc", func);
            }
            var res = this.getset("sanitizer", funcName);
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === bind || !!!res) return res;
            // fire "changed" event
            this.trigger("change", {
                property: "sanitizer",
                value: val
            });
            return true;
        },
        sanitizerFunc: function() {
            var bind = this.getset("sanitizer");
            return Svidget.findFunction(bind);
        },
        applySanitizer: function(val) {
            var func = this.sanitizerFunc();
            if (!func) return val;
            var returnVal = func.call(null, this, val);
            return void 0 === returnVal ? val : returnVal;
        },
        validateValue: function(val) {
            return true;
        },
        coerceValue: function(val) {
            return Svidget.convert(val, this.type(), this.subtype(), this.typedata());
        },
        // helpers
        applyBinding: function(val) {
            var bind = this.bindingQuery();
            null != bind && bind.setValue(val);
        },
        /**
	* Adds an event handler for the "change" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        ondeclaredchange: function(handler) {
            return this.onchange(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        offdeclaredchange: function() {
            return this.offchange(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "set" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onset: function(data, name, handler) {
            return this.on("set", data, name, handler);
        },
        ondeclaredset: function(handler) {
            return this.onset(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "set" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offset: function(handlerOrName) {
            return this.off("set", handlerOrName);
        },
        offdeclaredset: function() {
            return this.offset(Svidget.declaredHandlerName);
        },
        /**
	 * Serializes the Param object for transport across a window boundary.
	 * @method
	 * @returns {boolean} - A generic serialized object representing the Param object.
	*/
        toTransport: function() {
            return {
                name: this.name(),
                shortname: this.shortname(),
                enabled: this.enabled(),
                type: this.type(),
                subtype: this.subtype(),
                typedata: this.typedata(),
                coerce: this.coerce(),
                defvalue: this.defvalue(),
                value: this.value()
            };
        },
        // overrides
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.Param { name: "' + this.name() + '" }]';
        }
    };
    // todo: convert these to functions so that users can't manipulate
    Svidget.Param.eventTypes = [ "change", "set" ];
    Svidget.Param.optionProperties = [ "type", "subtype", "binding", "sanitizer", "enabled", "shortname", "defvalue", "typedata", "coerce", "group" ];
    Svidget.Param.allProxyProperties = [ "name", "value", "type", "subtype", "enabled", "shortname", "defvalue", "typedata", "coerce", "group" ];
    // 0.1.3: removed "binding", 
    Svidget.Param.writableProxyProperties = [ "value" ];
    Svidget.extend(Svidget.Param, Svidget.ObjectPrototype);
    Svidget.extend(Svidget.Param, Svidget.ParamPrototype);
    Svidget.extend(Svidget.Param, new Svidget.EventPrototype(Svidget.Param.eventTypes));
    /**
 * Represents a collection of Param objects.
 * @constructor
 * @augments ObjectCollection
 * @memberof Svidget
 * @param {array} array - An array of Param objects.
 * @param {Svidget.Widget} parent - The Widget instance that is the parent for this Param collection.
 */
    Svidget.ParamCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.Param ]);
        this.__type = "Svidget.ParamCollection";
        this.parent = parent;
        this._ctor = Svidget.ParamCollection;
    };
    Svidget.ParamCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.ParamCollection, {
        create: function(name, value, options, parent) {
            // create param
            // call addObject
            // create param
            // call addObject
            // ensure no other parameter exists in the collection by that name
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.Param(name, value, options, parent);
        }
    }, true);
    /**
 * Represents the widget.
 * @class
 * @mixes Svidget.ObjectPrototype
 * @augments Svidget.EventPrototype
 * @memberof Svidget
 */
    Svidget.Widget = function() {
        this.__type = "Svidget.Widget";
        var that = this, privates = new function() {
            this.writable = [ "id", "enabled", "started", "connected", "populatedFromPage" ];
            this.params = new Svidget.ParamCollection([], that);
            this.actions = new Svidget.ActionCollection([], that);
            this.events = new Svidget.EventDescCollection([], that);
            this.enabled = true;
            // reserved for future use
            this.connected = false;
            this.started = false;
            this.populatedFromPage = false;
            this.id = null;
            // provided by parent
            this.page = null;
            // todo: get a reference to an object containing details about the page (determine if we need)
            this.parentElement = null;
        }();
        // private accessors
        this.setup(privates);
        // wire events for params add/remove and bubbles
        this.wireCollectionAddRemoveHandlers(privates.params, that.paramAdded, that.paramRemoved);
        // wire events for actions add/remove and bubbles
        this.wireCollectionAddRemoveHandlers(privates.actions, that.actionAdded, that.actionRemoved);
        // wire events for events add/remove
        this.wireCollectionAddRemoveHandlers(privates.events, that.eventAdded, that.eventRemoved);
        this._init();
    };
    Svidget.Widget.prototype = {
        _init: function() {},
        // REGION: Properties
        /**
	 * Gets the widget ID. 
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {string} - The widget ID as a string.
	*/
        id: function() {
            return this.getset("id");
        },
        /**
	 * Gets or sets whether the widget is enabled. 
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {Boolean} [val] - Sets the enabled state when specified.
	 * @returns {Boolean} - The enabled state, when nothing is passed, or true/false based on if setting is succeeded or failed.
	*/
        enabled: function(val) {
            null === val && (val = true);
            var res = this.getset("enabled", val, "bool");
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire "changed" event
            val = this.getset("enabled");
            // get converted value
            this.trigger("change", {
                property: "enabled",
                value: val
            });
            // set was successful
            return true;
        },
        /**
	 * Gets whether the widget is connected to a parent page. 
	 * If true, it means the page initialized the widget and is listening for events.
	 * If false, it means the widget was loaded independently and/or outside of of the control of the framework (standalone mode).
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {Boolean} - Whether the widget is connected
	*/
        connected: function() {
            return this.getset("connected");
        },
        /**
	 * Gets whether the widget has started. This is true once the DOM is loaded.
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {boolean} - Whether the widget is started.
	*/
        started: function() {
            return this.getset("started");
        },
        /**
	 * Gets whether the widget has had his params populated from the page. 
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {boolean} - Whether the widget had his params populated from the page.
	*/
        populatedFromPage: function() {
            return this.getset("populatedFromPage");
        },
        // REGION
        // Public Methods
        start: function() {
            // if DOM not ready then readyConnected(0 will be called when ready()
            //if (this.loaded) this.readyConnected();
            this.getset("started", true);
        },
        connect: function(id) {
            // if DOM not ready then readyConnected(0 will be called when ready()
            //if (this.loaded) this.readyConnected();
            if (!this.connected()) {
                this.getset("id", id);
                this.getset("connected", true);
            }
        },
        setPopulatedFromPage: function() {
            this.getset("populatedFromPage", true);
            this.trigger("pagepopulate", this);
        },
        // REGION: Parent
        // internal
        // called from the root to signal that the parent element has changed, so we update there
        updateParentElement: function(item) {},
        // REGION: Params
        /**
	 * Gets a collection of all Param objects in the widget, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * params(0)
	 * params("color")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {(string|number|function)} [selector] - The param name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.ParamCollection} - A collection based on the selector, or the entire collection.
	*/
        params: function(selector) {
            var col = this.getset("params");
            return this.select(col, selector);
        },
        /**
	 * Gets the Param based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * param(0)
	 * param("color")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {(string|number|function)} [selector] - The param name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.Param} - The Param based on the selector. If selector is invalid, null is returned.
	*/
        param: function(selector) {
            //var item = this.params(selector).first();
            var col = this.getset("params");
            return this.selectFirst(col, selector);
        },
        /**
	 * Creates a new Param but does not add to the widget.
	 * Examples:
	 * addParam("backColor", "#ffee54", { description: "Background color."})
	 * addParam("color")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the Param to add.
	 * @param {object} value - The value of the Param.
	 * @param {object} [options] - The options used to contruct the Param. Example: { enabled: true, description: "A param" }
	 * @returns {Svidget.Param} - The Param that was added, or null if Param failed to add.
	*/
        newParam: function(name, value, options) {
            return new Svidget.Param(name, value, options, this);
        },
        /**
	 * Adds a Param to the widget. If a duplicate name is supplied the Param will fail to add.
	 * Examples:
	 * addParam("backColor", "#ffee54", { description: "Background color."})
	 * addParam("color")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the Param to add.
	 * @param {object} value - The value of the Param.
	 * @param {object} [options] - The options used to contruct the Param. Example: { enabled: true, description: "A param" }
	 * @returns {Svidget.Param} - The Param that was added, or null if Param failed to add.
	*/
        addParam: function(nameOrObject, value, options) {
            return this.params().add(nameOrObject, value, options, this);
        },
        /**
	 * Removes an Param from the widget. 
	 * Examples:
	 * removeParam("color")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the Param to remove.
	 * @returns {Boolean} - True if the Param was successfully removed, false otherwise.
	*/
        removeParam: function(name) {
            return this.params().remove(name);
        },
        /**
	 * Removes all Params from the widget. 
	 * Examples:
	 * removeAllParams()
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {Boolean} - True if all the Params were successfully removed, false otherwise.
	*/
        removeAllParams: function() {
            return this.params().clear();
        },
        // internal
        // handle param added
        paramAdded: function(param) {
            // raise event
            //alert('param added');
            Svidget.log("widget: param added: " + param.name());
            // event.value = param
            this.trigger("paramadd", param);
            // signal parent
            Svidget.root.signalParamAdded(param);
        },
        // internal
        // handle param removed
        paramRemoved: function(param) {
            // raise event
            //alert('param removed');
            Svidget.log("widget: param removed: " + param.name());
            // event.value = param.name
            this.trigger("paramremove", param.name());
            // signal parent
            Svidget.root.signalParamRemoved(param.name());
        },
        // internal
        // called from param
        paramBubble: function(type, event, param) {
            "change" == type && this.paramChanged(param, event.value);
            "valuechange" != type && "set" != type || this.paramSet(param, event.value);
        },
        // private
        // eventValue ex = { property: "binding", value: bindValue }
        paramChanged: function(param, eventValue) {
            this.trigger("paramchange", eventValue, param);
            // signal parent
            Svidget.root.signalParamChanged(param, eventValue);
        },
        // private
        // eventValue ex = { value: "3" }
        paramSet: function(param, eventValue) {
            this.trigger("paramset", eventValue, param);
            this.trigger("paramvaluechange", eventValue, param);
            // signal parent
            Svidget.root.signalParamSet(param, eventValue);
        },
        // REGION: Actions
        /**
	 * Gets a collection of all actions in the widget, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * actions(0)
	 * actions("doSomething")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {(string|number|function)} [selector] - The action name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.ActionCollection} - A collection based on the selector, or the entire collection.
	*/
        actions: function(selector) {
            var col = this.getset("actions");
            return this.select(col, selector);
        },
        /**
	 * Gets the action object based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * action(1)
	 * action("doSomething")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {(string|number|function)} selector - The action name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.Action} - The action based on the selector. If selector is invalid, null is returned.
	*/
        action: function(selector) {
            //var item = this.actions(selector).first();
            var col = this.getset("actions");
            return this.selectFirst(col, selector);
        },
        /**
	 * Creates a new Action but does not add to the widget.
	 * Examples:
	 * addAction("doIt", { binding: function (s) { do_something(s) }, description: "Background color."})
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the param to add.
	 * @param {object} [options] - The options used to contruct the Action. Example: { enabled: true, description: "An action" }
	 * @returns {Svidget.Action} - The Action that was added, or null if Action failed to add.
	*/
        newAction: function(name, options) {
            return new Svidget.Action(name, options, this);
        },
        /**
	 * Adds an Action to the widget. If a duplicate name is supplied the action will fail to add.
	 * Examples:
	 * addAction("doIt", { binding: function (s) { do_something(s) }, description: "Background color."})
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the param to add.
	 * @param {object} [options] - The options used to contruct the Action. Example: { enabled: true, description: "An action" }
	 * @returns {Svidget.Action} - The Action that was added, or null if Action failed to add.
	*/
        addAction: function(nameOrObject, options) {
            var action = this.actions().add(nameOrObject, options, this);
            if (null == action) return action;
            // add params
            // options.params
            if (null == options || null == options.params || !Svidget.isArray(options.params)) return action;
            for (var i = 0; i < options.params.length; i++) {
                var p = options.params[i];
                null != p && null != p.name && action.addParam(p.name, p);
            }
        },
        /**
	 * Removes an Action from the widget. 
	 * Examples:
	 * removeAction("someAction")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the Action to remove.
	 * @returns {boolean} - True if the Action was successfully removed, false otherwise.
	*/
        removeAction: function(name) {
            return this.actions().remove(name);
        },
        /**
	 * Removes all Actions from the widget. 
	 * Examples:
	 * removeAllActions()
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {Boolean} - True if all the Actions were successfully removed, false otherwise.
	*/
        removeAllActions: function() {
            return this.actions().clear();
        },
        // private
        // handle action added
        actionAdded: function(action) {
            Svidget.log("widget: action added: " + action.name());
            // trigger event
            // event.value = action
            this.trigger("actionadd", action);
            // signal parent
            Svidget.root.signalActionAdded(action);
        },
        // private
        // handle action removed
        actionRemoved: function(action) {
            Svidget.log("widget: action removed: " + action.name());
            // trigger event
            // event.value = action.name
            this.trigger("actionremove", action.name());
            // signal parent
            Svidget.root.signalActionRemoved(action.name());
        },
        // private
        // internal, called from action
        actionBubble: function(type, event, action) {
            "invoke" == type && this.actionInvoked(action, event.value);
            "change" == type && this.actionChanged(action, event.value);
            // event.target is actionParam that was changed
            "paramchange" == type && this.actionParamChanged(action, event.target, event.value);
            // for add/remove, event.value == actionParam added or removed
            "paramadd" == type && this.actionParamAdded(action, event.value);
            "paramremove" == type && this.actionParamRemoved(action, event.value);
        },
        // private
        actionInvoked: function(action, returnData) {
            this.trigger("actioninvoke", returnData, action);
            // signal parent
            Svidget.root.signalActionInvoked(action, returnData);
        },
        // private
        // eventValue ex = { property: "binding", value: bindValue }
        actionChanged: function(action, eventValue) {
            this.trigger("actionchange", eventValue, action);
            // signal parent
            Svidget.root.signalActionChanged(action, eventValue);
        },
        // private
        actionParamChanged: function(action, actionParam, eventValue) {
            this.trigger("actionparamchange", eventValue, actionParam);
            // signal parent
            Svidget.root.signalActionParamChanged(actionParam, action, eventValue);
        },
        // private
        actionParamAdded: function(action, actionParam) {
            this.trigger("actionparamadd", actionParam, action);
            // signal parent
            Svidget.root.signalActionParamAdded(actionParam, action.name());
        },
        // private
        actionParamRemoved: function(action, actionParamName) {
            this.trigger("actionparamremove", actionParamName, action);
            // signal parent
            Svidget.root.signalActionParamRemoved(actionParamName, action.name());
        },
        // REGION: Events 
        /**
	 * Gets a collection of all events in the widget, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * events(0)
	 * events("somethingHappened")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {(string|number|function)} selector - The event name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.EventDescCollection} - A collection based on the selector, or the entire collection.
	*/
        events: function(selector) {
            var col = this.getset("events");
            return this.select(col, selector);
        },
        /**
	 * Gets the event object based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * event(0)
	 * event("somethingHappened")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {(string|number|function)} selector - The event name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.EventDesc} - The event based on the selector. If selector is invalid, null is returned.
	*/
        event: function(selector) {
            var col = this.getset("events");
            return this.selectFirst(col, selector);
        },
        /**
	 * Creates a new EventDesc but does not add to the widget.
	 * Examples:
	 * addEvent("somethingHappened", { description: "An event for that." })
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the EventDesc to add.
	 * @param {object} [options] - The options used to contruct the EventDesc. Example: { enabled: true, description: "An event" }
	 * @returns {Svidget.Action} - The EventDesc that was added, or null if EventDesc failed to add.
	*/
        newEvent: function(name, options) {
            return new Svidget.EventDesc(name, options, this);
        },
        /**
	 * Adds an EventDesc object to the widget. If a duplicate name is supplied the EventDesc will fail to add.
	 * Examples:
	 * addEvent("somethingHappened", { description: "An event for that." })
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the EventDesc to add.
	 * @param {object} [options] - The options used to contruct the EventDesc. Example: { enabled: true, description: "An event" }
	 * @returns {Svidget.Action} - The EventDesc that was added, or null if EventDesc failed to add.
	*/
        addEvent: function(nameOrObject, options) {
            return this.events().add(nameOrObject, options, this);
        },
        /**
	 * Removes an EventDesc object from the widget. 
	 * Examples:
	 * removeEvent("somethingHappened")
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @param {string} name - The name of the EventDesc to remove.
	 * @returns {boolean} - True if the EventDesc was successfully removed, false otherwise.
	*/
        removeEvent: function(name) {
            return this.events().remove(name);
        },
        /**
	 * Removes all Events from the widget. 
	 * Examples:
	 * removeAllEvents()
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {Boolean} - True if all the Events were successfully removed, false otherwise.
	*/
        removeAllEvents: function() {
            return this.events().clear();
        },
        // private
        // handle event added
        eventAdded: function(eventDesc) {
            Svidget.log("widget: event added: " + eventDesc.name());
            // trigger event
            // event.value = event
            this.trigger("eventadd", eventDesc);
            // signal parent
            Svidget.root.signalEventAdded(eventDesc);
        },
        // private
        // handle event removed
        eventRemoved: function(eventDesc) {
            Svidget.log("widget: event removed: " + eventDesc.name());
            // trigger event
            // event.value = event name
            this.trigger("eventremove", eventDesc.name());
            // signal parent
            Svidget.root.signalEventRemoved(eventDesc.name());
        },
        // internal, called from eventdesc.EventPrototype
        eventBubble: function(type, event, eventDesc) {
            "trigger" == type && this.eventTrigger(eventDesc, event);
            "change" == type && this.eventChanged(eventDesc, event.value);
        },
        // private
        eventTrigger: function(eventDesc, event) {
            Svidget.log("widget: event trigger: " + eventDesc.name());
            this.trigger("eventtrigger", event.value, eventDesc);
            // FYI: event.target == eventDesc
            Svidget.root.signalEventTriggered(event.target, event.value);
        },
        // private
        eventChanged: function(eventDesc, eventValue) {
            this.trigger("eventchange", eventValue, eventDesc);
            // signal parent
            Svidget.root.signalEventChanged(eventDesc, eventValue);
        },
        // REGION: Communication
        /**
	 * Serializes the Widget object for transport across a window boundary.
	 * @method
	 * @memberof Svidget.Widget.prototype
	 * @returns {boolean} - A generic serialized object representing the Widget.
	*/
        // todo: rename to serialize()
        toTransport: function() {
            return {
                id: this.id(),
                enabled: this.enabled(),
                params: this.toParamsTransport(),
                actions: this.toActionsTransport(),
                events: this.toEventsTransport()
            };
        },
        // private
        toParamsTransport: function() {
            return this.params().select(function(p) {
                return p.toTransport();
            }).toArray();
        },
        // private
        toActionsTransport: function() {
            return this.actions().select(function(a) {
                return a.toTransport();
            }).toArray();
        },
        // private
        toEventsTransport: function() {
            return this.events().select(function(e) {
                return e.toTransport();
            }).toArray();
        },
        /**
	* Adds an event handler for the "change" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        ondeclaredchange: function(handler) {
            return this.onchange(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        offdeclaredchange: function() {
            return this.offchange(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "paramadd" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamadd: function(data, name, handler) {
            return this.on("paramadd", data, name, handler);
        },
        ondeclaredparamadd: function(handler) {
            return this.onparamadd(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "paramadd" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamadd: function(handlerOrName) {
            return this.off("paramadd", handlerOrName);
        },
        offdeclaredparamadd: function() {
            return this.offparamadd(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "paramremove" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamremove: function(data, name, handler) {
            return this.on("paramremove", data, name, handler);
        },
        ondeclaredparamremove: function(handler) {
            return this.onparamremove(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "paramremove" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamremove: function(handlerOrName) {
            return this.off("paramremove", handlerOrName);
        },
        offdeclaredparamremove: function() {
            return this.offparamremove(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "paramchange" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamchange: function(data, name, handler) {
            return this.on("paramchange", data, name, handler);
        },
        /**
	* Removes an event handler for the "paramchange" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamchange: function(handlerOrName) {
            return this.off("paramchange", handlerOrName);
        },
        /**
	* Adds an event handler for the "paramset" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamset: function(data, name, handler) {
            return this.on("paramset", data, name, handler);
        },
        /**
	* Removes an event handler for the "paramchange" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamset: function(handlerOrName) {
            return this.off("paramset", handlerOrName);
        },
        /**
* Adds an event handler for the "actionadd" event. 
 * @method
 * @action {object} [data] - Arbirary data to initialize Event object with when event is triggered.
 * @action {string} [name] - The name of the handler. Useful when removing the handler for the event.
 * @action {Function} handler - The event handler.
 * @returns {boolean} - True if the event handler was successfully added.
*/
        onactionadd: function(data, name, handler) {
            return this.on("actionadd", data, name, handler);
        },
        ondeclaredactionadd: function(handler) {
            return this.onactionadd(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "actionadd" event. 
	* @method
	* @action {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offactionadd: function(handlerOrName) {
            return this.off("actionadd", handlerOrName);
        },
        offdeclaredactionadd: function() {
            return this.offactionadd(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "actionremove" event. 
	 * @method
	 * @action {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @action {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @action {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onactionremove: function(data, name, handler) {
            return this.on("actionremove", data, name, handler);
        },
        ondeclaredactionremove: function(handler) {
            return this.onactionremove(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "actionremove" event. 
	* @method
	* @action {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offactionremove: function(handlerOrName) {
            return this.off("actionremove", handlerOrName);
        },
        offdeclaredactionremove: function() {
            return this.offactionremove(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "actionchange" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onactionchange: function(data, name, handler) {
            return this.on("actionchange", data, name, handler);
        },
        /**
	* Removes an event handler for the "actionchange" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offactionchange: function(handlerOrName) {
            return this.off("actionchange", handlerOrName);
        },
        /**
	* Adds an event handler for the "actioninvoke" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onactioninvoke: function(data, name, handler) {
            return this.on("actioninvoke", data, name, handler);
        },
        /**
	* Removes an event handler for the "actioninvoke" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offactioninvoke: function(handlerOrName) {
            return this.off("actioninvoke", handlerOrName);
        },
        /**
	* Adds an event handler for the "actionparamadd" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onactionparamadd: function(data, name, handler) {
            return this.on("actionparamadd", data, name, handler);
        },
        /**
	* Removes an event handler for the "actionparamadd" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offactionparamadd: function(handlerOrName) {
            return this.off("actionparamadd", handlerOrName);
        },
        /**
	* Adds an event handler for the "actionparamremove" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onactionparamremove: function(data, name, handler) {
            return this.on("actionparamremove", data, name, handler);
        },
        /**
	* Removes an event handler for the "actionparamremove" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offactionparamremove: function(handlerOrName) {
            return this.off("actionparamremove", handlerOrName);
        },
        /**
	* Adds an event handler for the "actionparamchange" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onactionparamchange: function(data, name, handler) {
            return this.on("actionparamchange", data, name, handler);
        },
        /**
	* Removes an event handler for the "actionparamchange" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offactionparamchange: function(handlerOrName) {
            return this.off("actionparamchange", handlerOrName);
        },
        /**
	* Adds an event handler for the "eventadd" event. 
	* @method
	* @event {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @event {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @event {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        oneventadd: function(data, name, handler) {
            return this.on("eventadd", data, name, handler);
        },
        ondeclaredeventadd: function(handler) {
            return this.oneventadd(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "eventadd" event. 
	* @method
	* @event {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offeventadd: function(handlerOrName) {
            return this.off("eventadd", handlerOrName);
        },
        offdeclaredeventadd: function() {
            return this.offeventadd(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "eventremove" event. 
	 * @method
	 * @event {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @event {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @event {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        oneventremove: function(data, name, handler) {
            return this.on("eventremove", data, name, handler);
        },
        ondeclaredeventremove: function(handler) {
            return this.oneventremove(null, Svidget.declaredHandlerName, handler);
        },
        /**
	* Removes an event handler for the "eventremove" event. 
	* @method
	* @event {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offeventremove: function(handlerOrName) {
            return this.off("eventremove", handlerOrName);
        },
        offdeclaredeventremove: function() {
            return this.offeventremove(Svidget.declaredHandlerName);
        },
        /**
	* Adds an event handler for the "eventchange" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        oneventchange: function(data, name, handler) {
            return this.on("eventchange", data, name, handler);
        },
        /**
	* Removes an event handler for the "eventchange" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offeventchange: function(handlerOrName) {
            return this.off("eventchange", handlerOrName);
        },
        /**
	* Adds an event handler for the "eventtrigger" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        oneventtrigger: function(data, name, handler) {
            return this.on("eventtrigger", data, name, handler);
        },
        /**
	* Removes an event handler for the "actioninvoke" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offeventtrigger: function(handlerOrName) {
            return this.off("eventtrigger", handlerOrName);
        },
        /**
	* Adds an event handler for the "pagepopulate" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onpagepopulate: function(data, name, handler) {
            return this.on("pagepopulate", data, name, handler);
        },
        /**
	* Removes an event handler for the "pagepopulate" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offpagepopulate: function(handlerOrName) {
            return this.off("pagepopulate", handlerOrName);
        },
        // overrides
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.Widget { id: "' + this.id() + '" }]';
        }
    };
    Svidget.Widget.eventTypes = [ "change", "pagepopulate", "paramvaluechange", "paramset", "paramchange", "paramadd", "paramremove", "actioninvoke", "actionchange", "actionadd", "actionremove", "eventtrigger", "eventchange", "eventadd", "eventremove" ];
    Svidget.extend(Svidget.Widget, Svidget.ObjectPrototype);
    Svidget.extend(Svidget.Widget, new Svidget.EventPrototype(Svidget.Widget.eventTypes));
    /**
 * Encapsulates logic for a proxy object that is meant to shadow a concrete one.
 * @class
 * @abstract
 * @mixes ObjectPrototype
 * @memberof Svidget.Svidget
 * @param {object} parent - The parent to this object. Usually a Svidget.WidgetReference instance.
 * @param {object} options - An object containing values to initialize properties. Example: { enabled: true, description: "An event" }
 * @param {Array} propList - An array of all properties that the underlying object exposes to the proxy.
 * @param {Array} writePropList - An array of all writable properties that the underlying object exposes to the proxy. A subset of propList.
 * @param {Array} eventList - An array of all event types that this proxy listens for and/or response to based on the underlying object.
 */
    Svidget.Proxy = function(parent, options, propList, writePropList, eventList) {
        function buildPropFunc(prop) {
            return function(val) {
                return this.getsetProp(prop, val);
            };
        }
        this.__type = "Svidget.Proxy";
        var that = this;
        options = options || {};
        // convert to collections
        var propCol = new Svidget.Collection(Svidget.isArray(propList) ? propList : null), writePropCol = new Svidget.Collection(Svidget.isArray(writePropList) ? writePropList : null);
        // filter so that writable properties are also contained in all properties
        writePropCol = writePropCol.where(function(i) {
            return propCol.contains(i);
        });
        // private fields
        var privates = {
            writable: writePropCol.toArray(),
            propertyChangeFuncs: new Svidget.Collection(),
            eventContainer: new Svidget.EventContainer(eventList, that),
            parent: parent,
            connected: null == options.connected || !!options.connected
        };
        // private accessors
        this.setup(privates);
        // copy property values to privates
        for (var p in options) void 0 === privates[p] && (privates[p] = options[p]);
        // load functions for each property onto this object
        for (var i = 0; i < propCol.length; i++) {
            var prop = propCol[i] + "";
            prop.length > 0 && (this[prop] = buildPropFunc(prop));
        }
    };
    Svidget.Proxy.prototype = {
        /**
	 * Gets the parent object.
	 * @method
	 * @returns {Svidget.WidgetReference}
	*/
        parent: function() {
            return this.getPrivate("parent");
        },
        /**
	 * Gets whether the proxy object is attached to its parent.
	 * @method
	 * @returns {boolean}
	*/
        attached: function() {
            return null != this.parent();
        },
        propertyChangeFuncs: function() {
            return this.getPrivate("propertyChangeFuncs");
        },
        /**
	 * Gets whether the proxy is connected to its underlying widget counterpart.
	 * @method
	 * @returns {boolean}
	*/
        connected: function(val) {
            return this.getPrivate("connected");
        },
        // private
        // this is invoked when attempting to set a property value on the proxy itself
        // this in turn notifies the parent, which in turn notifies the widget
        getsetProp: function(prop, val) {
            var res = this.getset(prop, val);
            // if undefined its a get so return value, if res is false then set failed
            if (void 0 === val || !!!res) return res;
            // fire propertyChange event
            // this.triggerPropertyChange(prop, val); // obsolete
            this.handlePropertyChange(prop, val);
            return true;
        },
        /**
	 * @abstract
	*/
        handlePropertyChange: function(name, val) {},
        triggerPropertyChange: function(name, val) {
            // notifies root that property change, sends it to widget
            // invoke func(this, name, val)
            var that = this;
            this.propertyChangeFuncs().each(function(func) {
                func(that, name, val);
            });
        },
        // private
        // this is invoked when the widget communicates that a property was changed
        notifyPropertyChange: function(name, val) {
            // notifies this proxy that property changed on widget
            if (null != name) {
                // update value to match source
                this.getset(name, val);
                // trigger change event
                this.triggerFromWidget("change", {
                    property: name,
                    value: val
                }, this);
            }
        },
        // internal
        // refreshes the proxy object with values from the widget
        refreshProperties: function(propObj) {
            for (var name in propObj) {
                null != this.getPrivate(name) && this.setPrivate(name, propObj[name]);
            }
        },
        /**
	 * Gets whether the proxy object is connected to its underlying object.
	 * @method
	 * @returns {boolean}
	*/
        connect: function() {
            this.setPrivate("connected", true);
        },
        // obsolete (9/1/2014)
        // use regular events ("change", "paramchange")
        onPropertyChange: function(func) {
            var funcList = this.propertyChangeFuncs();
            if ("function" === !typeof func) return false;
            funcList.add(func);
            return true;
        },
        // obsolete (9/1/2014)
        // use regular events ("change", "paramchange")
        offPropertyChange: function(func) {
            return this.propertyChangeFuncs().remove(func);
        },
        eventContainer: function() {
            return this.getPrivate("eventContainer");
        },
        /**
	 * Registers an event handler for the proxy object.
	 * @method
	 * @param {string} type - The event type i.e. "change".
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        on: function(type, data, name, handler) {
            this.eventContainer().on(type, data, name, handler);
        },
        /**
	 * Unregisters an event handler for the proxy object.
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {string} type - The event type i.e. "change".
	 * @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	 * @returns {boolean} - True if the event handler was successfully removed.
	*/
        off: function(type, handlerOrName) {
            this.eventContainer().off(type, handlerOrName);
        },
        // Note: no access to trigger() object events here, only from widget
        // this is invoked from the widget to signal that the event was triggered
        triggerFromWidget: function(type, value, originalTarget) {
            this.eventContainer().trigger(type, value, originalTarget);
        },
        registerBubbleCallback: function(types, bubbleTarget, callback) {
            this.eventContainer().registerBubbleCallback(types, bubbleTarget, callback);
        }
    };
    Svidget.extend(Svidget.Proxy, Svidget.ObjectPrototype);
    /**
 * Represents a proxy to an Action object.
 * @class
 * @augments Svidget.Proxy
 * @memberof Svidget.Svidget
 * @param {string} name - The name of the action.
 * @param {object} options - The options for the action. Example: { enabled: true, description: "An action" }
 * @param {Svidget.WidgetReference} parent - The widget reference instance that is the parent for this action proxy.
 */
    Svidget.ActionProxy = function(name, options, parent) {
        var that = this, valueObj = {
            name: name,
            params: new Svidget.ActionParamProxyCollection([], that)
        };
        options = options || {};
        // copy property values to privates
        for (var p in options) void 0 === valueObj[p] && (valueObj[p] = options[p]);
        parent && (parent = parent instanceof Svidget.WidgetReference ? parent : null);
        // parent can only be a WidgetReference
        Svidget.Proxy.apply(this, [ parent, valueObj, Svidget.Action.allProxyProperties, Svidget.Action.writableProxyProperties ]);
        this.__type = "Svidget.ActionProxy";
        // register callback from action to widget, for event bubbles
        this.registerBubbleCallback(Svidget.Action.eventTypes, parent, parent.actionProxyBubble);
        // add/remove event handlers for params
        this.wireCollectionAddRemoveHandlers(valueObj.params, that.paramAdded, that.paramRemoved);
    };
    Svidget.ActionProxy.prototype = new Svidget.Proxy();
    Svidget.extend(Svidget.ActionProxy, {
        /**
	 * Invokes the action. The params passes in will be passed to the action params in order.
	 * @method
	 * @param {...object} args - The arguments that correspond to action params.
	 * @returns {boolean} - True if invoke succeeds.
	*/
        invoke: function() {
            // build args obj from arguments
            if (!this.canInvoke()) return false;
            var args = Svidget.array(arguments);
            svidget.signalActionInvoke(this.parent(), this, args);
            return true;
        },
        canInvoke: function() {
            return this.getset("external");
        },
        invokeFromWidget: function(returnVal) {
            this.triggerFromWidget("invoke", {
                returnValue: returnVal
            }, this);
        },
        /**
	 * Gets a collection of all ActionParamProxy objects, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * params(0)
	 * params("color")
	 * param(function filter(param) { return true; })
	 * @method
	 * @param {(string|number|function)} [selector] - The param name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.ActionParamProxyCollection} - A collection based on the selector, or the entire collection.
	*/
        params: function(selector) {
            var col = this.getset("params");
            return this.select(col, selector);
        },
        /**
	 * Gets the ActionParamProxy based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * param(0)
	 * param("color")
	 * param(function firstOne(param) { return true; })
	 * @method
	 * @param {(string|number|function)} selector - The param name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.ActionParam} - The ActionParamProxy based on the selector. If selector is invalid, null is returned.
	*/
        param: function(selector) {
            var col = this.getset("params");
            return this.selectFirst(col, selector);
        },
        // internal
        addParam: function(nameOrObject, options) {
            return this.params().add(nameOrObject, options, this);
        },
        // internal
        removeParam: function(name) {
            return this.params().remove(name);
        },
        paramProxyBubble: function(type, event, param) {
            "change" == type && this.paramChanged(param, event.value);
        },
        // private
        // eventValue ex = { property: "binding" }
        paramChanged: function(param, eventValue) {
            this.triggerFromWidget("paramchange", eventValue, param);
        },
        // handle param added
        paramAdded: function(param) {
            this.triggerFromWidget("paramadd", param);
        },
        // private
        // handle param removed
        paramRemoved: function(param) {
            this.triggerFromWidget("paramremove", param.name());
        },
        /**
	* Adds an event handler for the "change" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        /**
	* Adds an event handler for the "invoke" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        oninvoke: function(data, name, handler) {
            return this.on("invoke", data, name, handler);
        },
        /**
	* Removes an event handler for the "invoke" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offinvoke: function(handlerOrName) {
            return this.off("invoke", handlerOrName);
        },
        /**
	* Adds an event handler for the "paramadd" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamadd: function(data, name, handler) {
            return this.on("paramadd", data, name, handler);
        },
        /**
	* Removes an event handler for the "paramadd" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamadd: function(handlerOrName) {
            return this.off("paramadd", handlerOrName);
        },
        /**
	* Adds an event handler for the "paramchange" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamchange: function(data, name, handler) {
            return this.on("paramchange", data, name, handler);
        },
        /**
	* Removes an event handler for the "paramchange" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamchange: function(handlerOrName) {
            return this.off("paramchange", handlerOrName);
        },
        /**
	* Adds an event handler for the "paramremove" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        onparamremove: function(data, name, handler) {
            return this.on("paramremove", data, name, handler);
        },
        /**
	* Removes an event handler for the "paramremove" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offparamremove: function(handlerOrName) {
            return this.off("paramremove", handlerOrName);
        },
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.ActionProxy { name: "' + this.name + '" }]';
        }
    }, true);
    /**
 * Represents a collection of ActionProxy objects.
 * @class
 * @augments Svidget.ObjectCollection
 * @memberof Svidget.Svidget
 * @param {array} array - An array of ActionProxy objects.
 * @param {Svidget.WidgetReference} parent - The WidgetReference instance that is the parent for this ActionParamProxy collection.
 */
    Svidget.ActionProxyCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.ActionProxy ]);
        this.__type = "Svidget.ActionProxyCollection";
        this.parent = parent;
        this._ctor = Svidget.ActionProxyCollection;
    };
    Svidget.ActionProxyCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.ActionProxyCollection, {
        create: function(name, options, parent) {
            // create param
            // call addObject
            // create param
            // call addObject
            // ensure no other action exists in the collection by that name
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.ActionProxy(name, options, parent);
        }
    }, true);
    /**
 * Represents a proxy to an ActionParam object.
 * @class
 * @augments Svidget.Proxy
 * @memberof Svidget
 * @param {string} name - The name of the action param.
 * @param {object} options - The options for the action param. Example: { type: "string", subtype: "regex", description: "An action param" }
 * @param {Svidget.WidgetReference} parent - The widget reference instance that is the parent for this action param proxy.
 */
    Svidget.ActionParamProxy = function(name, options, parent) {
        var valueObj = {
            name: name
        };
        options = options || {};
        // copy property values to privates
        for (var p in options) void 0 === valueObj[p] && (valueObj[p] = options[p]);
        parent && (parent = parent instanceof Svidget.ActionProxy ? parent : null);
        // parent can only be a WidgetReference
        Svidget.Proxy.apply(this, [ parent, valueObj, Svidget.ActionParam.allProxyProperties, Svidget.ActionParam.writableProxyProperties ]);
        this.__type = "Svidget.ActionParamProxy";
        // register callback from action to widget, for event bubbles
        this.registerBubbleCallback(Svidget.ActionParam.eventTypes, parent, parent.paramProxyBubble);
    };
    Svidget.ActionParamProxy.prototype = new Svidget.Proxy();
    Svidget.extend(Svidget.ActionParamProxy, {
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.ActionParamProxy { name: "' + this.name() + '" }]';
        }
    }, true);
    /**
 * Represents a collection of ActionParamProxy objects.
 * @class
 * @augments Svidget.ObjectCollection
 * @memberof Svidget.Svidget
 * @param {array} array - An array of ActionParamProxy objects.
 * @param {Svidget.ActionProxy} parent - The ActionProxy instance that is the parent for this ActionParamProxy collection.
 */
    Svidget.ActionParamProxyCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.ActionParamProxy ]);
        this.__type = "Svidget.ActionParamProxyCollection";
        this.parent = parent;
        this._ctor = Svidget.ActionParamProxyCollection;
    };
    Svidget.ActionParamProxyCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.ActionParamProxyCollection, {
        create: function(name, options, parent) {
            // ensure no duplicates with same name, return null if true
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.ActionParamProxy(name, options, parent);
        }
    }, true);
    /**
 * Represents a proxy to an EventDesc object.
 * @class
 * @augments Svidget.Proxy
 * @memberof Svidget
 * @param {string} name - The name of the event.
 * @param {object} options - The options for the event. Example: { enabled: true, description: "An event" }
 * @param {Svidget.WidgetReference} parent - The widget reference instance that is the parent for this event proxy.
 */
    Svidget.EventDescProxy = function(name, options, parent) {
        var eventName = "trigger", valueObj = {
            name: name,
            eventName: eventName
        };
        options = options || {};
        // copy property values to privates
        for (var p in options) void 0 === valueObj[p] && (valueObj[p] = options[p]);
        parent && (parent = parent instanceof Svidget.WidgetReference ? parent : null);
        // parent can only be a WidgetReference
        Svidget.Proxy.apply(this, [ parent, valueObj, Svidget.EventDesc.allProxyProperties, Svidget.EventDesc.writableProxyProperties ]);
        this.__type = "Svidget.EventDescProxy";
        // register callback from action to widget, for event bubbles
        this.registerBubbleCallback(Svidget.EventDesc.eventTypes, parent, parent.eventProxyBubble);
    };
    Svidget.EventDescProxy.prototype = new Svidget.Proxy();
    Svidget.extend(Svidget.EventDescProxy, {
        triggerEventName: function() {
            return this.getPrivate("eventName");
        },
        /**
	 * Registers an event handler for the EventDescProxy object.
	 * @method
	 * @param {string} [type] - The event type i.e. "change". If not specified it is assumed it is for the event itself.
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        on: function(type, data, name, handler) {
            // if type is function, then assume type not passes so use default event name
            if (Svidget.isFunction(type)) {
                handler = type;
                type = this.triggerEventName();
            }
            this.eventContainer().on(type, data, name, handler);
        },
        /**
	* Adds an event handler for the "trigger" event. 
	 * @method
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        ontrigger: function(data, name, handler) {
            this.eventContainer().on(this.triggerEventName(), data, name, handler);
        },
        /**
	 * Unregisters an event handler for the EventDescProxy object.
	 * @method
	 * @param {string} [type] - The event type i.e. "change", "paramremove". If not specified it is assumed it is for the event itself.
	 * @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	 * @returns {boolean} - True if the event handler was successfully removed.
	*/
        off: function(type, handlerOrName) {
            // if type is function, then assume type not passes so use default event name
            if (Svidget.isFunction(type)) {
                handlerOrName = type;
                type = this.triggerEventName();
            }
            this.eventContainer().off(type, handlerOrName);
        },
        /**
	* Removes an event handler for the "trigger" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offtrigger: function(handlerOrName) {
            this.eventContainer().off(this.triggerEventName(), handlerOrName);
        },
        /**
	* Adds an event handler for the "change" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        /**
	 * Triggers the event for the EventDesc object. Event must be external.
	 * @method
	 * @param {object} value - The value to set to the Event.value property.
	*/
        trigger: function(value) {
            // generally an event wouldn't be triggerable from outside, but we leave in the ability for testing purposes
            if (!this.canTrigger()) return false;
            svidget.signalEventTrigger(this.parent(), this, value);
            return true;
        },
        canTrigger: function() {
            return this.getset("external");
        },
        // overwrites: Svidget.Proxy.triggerFromWidget
        // this is invoked from the widget to signal that the event was triggered
        triggerEventFromWidget: function(value) {
            this.eventContainer().trigger(this.triggerEventName(), value);
        },
        // overrides
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.EventDescProxy { name: "' + this.name + '" }]';
        }
    }, true);
    /**
 * Represents a collection of EventDescProxy objects.
 * @constructor
 * @augments ObjectCollection
 * @memberof Svidget
 * @param {array} array - An array of EventDescProxy objects.
 * @param {Svidget.WidgetReference} parent - The WidgetReference instance that is the parent for this EventDescProxy collection.
 */
    Svidget.EventDescProxyCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.EventDescProxy ]);
        this.__type = "Svidget.EventDescProxyCollection";
        this.parent = parent;
        this._ctor = Svidget.EventDescProxyCollection;
    };
    Svidget.EventDescProxyCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.EventDescProxyCollection, {
        create: function(name, options, parent) {
            // ensure no other parameter exists in the collection by that name
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.EventDescProxy(name, options, parent);
        }
    }, true);
    /**
 * Represents a proxy to an Param object.
 * @class
 * @augments Svidget.Proxy
 * @memberof Svidget
 * @param {string} name - The name of the param proxy.
 * @param {object} value - The value for the param proxy.
 * @param {object} options - The options for the param proxy. Example: { enabled: true, description: "An event" }
 * @param {Svidget.WidgetReference} parent - The widget reference that is the parent for this param.
 */
    Svidget.ParamProxy = function(name, value, options, parent) {
        var valueObj = {
            name: name,
            value: value
        };
        options = options || {};
        // copy property values to privates
        for (var p in options) valueObj[p] = options[p];
        parent && (parent = parent instanceof Svidget.WidgetReference ? parent : null);
        // parent can only be a WidgetReference
        Svidget.Proxy.apply(this, [ parent, valueObj, Svidget.Param.allProxyProperties, Svidget.Param.writableProxyProperties ]);
        this.__type = "Svidget.ParamProxy";
        // register callback from action to widget, for event bubbles
        this.registerBubbleCallback(Svidget.Param.eventTypes, parent, parent.paramProxyBubble);
    };
    Svidget.ParamProxy.prototype = new Svidget.Proxy();
    Svidget.extend(Svidget.ParamProxy, {
        // overrides
        handlePropertyChange: function(name, val) {
            if ("value" == name) {
                this.parent().updateParamValue(this.name(), val);
                svidget.signalPropertyChange(this.parent(), this, "param", name, val);
            }
        },
        // private
        // this is invoked when the widget communicates that a property was changed
        notifyValueChange: function(val) {
            // notifies this proxy that property changed on widget
            // update value to match source
            this.getset("value", val);
            // trigger change event
            this.triggerFromWidget("valuechange", {
                value: val
            }, this);
            // deprecated: set is the official event
            this.triggerFromWidget("set", {
                value: val
            }, this);
        },
        /**
	 * Gets the serialized param value.
	 * @method
	 * @returns {string} - The serialized/stringified value.
	*/
        serializedValue: function() {
            var val = this.value();
            return Svidget.Conversion.toString(val);
        },
        /**
	* Adds an event handler for the "change" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onchange: function(data, name, handler) {
            return this.on("change", data, name, handler);
        },
        /**
	* Removes an event handler for the "change" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offchange: function(handlerOrName) {
            this.off("change", handlerOrName);
        },
        /**
	* Adds an event handler for the "set" event. 
	* @method
	* @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	* @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	* @param {Function} handler - The event handler.
	* @returns {boolean} - True if the event handler was successfully added.
	*/
        onset: function(data, name, handler) {
            return this.on("set", data, name, handler);
        },
        /**
	* Removes an event handler for the "set" event. 
	* @method
	* @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	* @returns {boolean} - True if the event handler was successfully removed.
	*/
        offset: function(handlerOrName) {
            return this.off("set", handlerOrName);
        },
        /**
	 * Gets a string representation of this object.
	 * @method
	 * @returns {string}
	*/
        toString: function() {
            return '[Svidget.ParamProxy { name: "' + this.name + '" }]';
        }
    }, true);
    /**
 * Represents a collection of ParamProxy objects.
 * @constructor
 * @augments ObjectCollection
 * @memberof Svidget
 * @param {array} array - An array of ParamProxy objects.
 * @param {Svidget.WidgetReference} parent - The WidgetReference instance that is the parent for this ParamProxy collection.
 */
    Svidget.ParamProxyCollection = function(array, parent) {
        Svidget.ObjectCollection.apply(this, [ array, Svidget.ParamProxy ]);
        this.__type = "Svidget.ParamProxyCollection";
        this.parent = parent;
        this._ctor = Svidget.ParamProxyCollection;
    };
    Svidget.ParamProxyCollection.prototype = new Svidget.ObjectCollection();
    Svidget.extend(Svidget.ParamProxyCollection, {
        create: function(name, value, options, parent) {
            // create param
            // call addObject
            // create param
            // call addObject
            // ensure no other parameter exists in the collection by that name
            return null == name || "string" === !typeof name ? null : null != this.getByName(name) ? null : new Svidget.ParamProxy(name, value, options, parent);
        }
    }, true);
    /**
 * Represents a reference to a widget from the page level.
 * @constructor
 * @mixes ObjectPrototype
 * @memberof Svidget
 * @param {string} id - The id of the widget this object represents.
 * @param {object} paramValueObj - The initializing param object. These are usually parsed from the <object> tag.
 * @param {HTMLElement} declaringElement - The HTML element that was used to declare the widget on the page. This is the <object> element.
 * @param {HTMLElement} [element] - The element that contains the actual widget. This can be either an <object> or <iframe> element.
 * @param {boolean} [connected] - Whether the reference is connected to the underlying widget. If false, it passes the params to the widgets then ceases any further communications with it.
 * @param {boolean} [crossdomain] - Whether the widget is hosted on another domain. This is a hint value to optimize setting up when it is known in advance that the widget is cross domain.
 */
    Svidget.WidgetReference = function(id, paramValueObj, declaringElement, element, connected, crossdomain) {
        function initParamsFromObject(paramValueObj) {
            if (null != paramValueObj) for (var name in paramValueObj) this.addParamProxy(name, paramValueObj[name], {
                connected: false
            });
        }
        this.__type = "Svidget.WidgetReference";
        var that = this, privates = new function() {
            this.writable = [ "enabled", "started", "populated", "paramValues" ];
            this.params = new Svidget.ParamProxyCollection([], that);
            this.actions = new Svidget.ActionProxyCollection([], that);
            this.events = new Svidget.EventDescProxyCollection([], that);
            this.eventContainer = new Svidget.EventContainer(Svidget.Widget.eventTypes, that);
            this.paramValues = paramValueObj;
            this.enabled = true;
            this.started = false;
            this.populated = false;
            this.connected = !!connected;
            // whether widget is connected/disconnected
            this.crossdomain = !!crossdomain;
            // whether widget in forced crossdomain mode
            this.state = "declared";
            this.id = id;
            this.element = element;
            this.declaringElement = declaringElement;
            this.url = declaringElement.getAttribute("data");
        }();
        // private accessors
        this.setup(privates);
        this.setElement = function(ele) {
            if (null != privates.element) return false;
            if (!Svidget.DOM.isElement(ele)) return false;
            privates.element = ele;
            // self-destructing set accessor, todo: delete too?
            this.setElement = null;
        }, // initialize params from <object> tag on page, these will be replaced when the widget updates the values and sends them back to the page
        initParamsFromObject.call(that, paramValueObj);
        // set an instance to this on declaring element
        declaringElement.widgetReference = this;
        // wire events for params add/remove and bubbles
        this.wireCollectionAddRemoveHandlers(privates.params, that.paramProxyAdded, that.paramProxyRemoved);
        // wire events for actions add/remove and bubbles
        this.wireCollectionAddRemoveHandlers(privates.actions, that.actionProxyAdded, that.actionProxyRemoved);
        // wire events for events add/remove
        this.wireCollectionAddRemoveHandlers(privates.events, that.eventProxyAdded, that.eventProxyRemoved);
    };
    Svidget.WidgetReference.prototype = {
        /**
	 * Gets the widget ID. 
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {string} - The widget ID as a string.
	*/
        id: function() {
            return this.getset("id");
        },
        name: function() {
            return this.id();
        },
        /**
	 * Gets whether the widget is enabled. 
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {boolean} - The enabled state.
	*/
        enabled: function() {
            return this.getset("enabled");
        },
        /**
	 * Gets the url to the widget.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {string}
	*/
        url: function() {
            return this.getset("url");
        },
        /**
	 * Gets the html element that contains the widget. This is either <object> or <iframe>.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {HTMLElement}
	*/
        element: function() {
            return this.getset("element");
        },
        /**
	 * Gets the declaring html element that contains the widget. This is the <object> element, or null if declared programatically.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {HTMLElement}
	*/
        declaringElement: function() {
            return this.getset("declaringElement");
        },
        /**
	 * Gets the svidget global object for the widget. Only available for same domain widgets.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {object}
	*/
        root: function() {
            // gets access to widget's root object, if same domain
            if (this.isCrossDomain()) return null;
            var doc = this.document();
            //var f = window.frames[0];
            // ele = this.element();
            //var s = win.$getSvidget();
            // note: is some browsers, this may not be available until its DOM is loaded
            return (doc.parentWindow || doc.defaultView).svidget;
        },
        /**
	 * Gets the window object for the widget. Only available for same domain widgets.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {Window}
	*/
        window: function() {
            // gets access to widget's window object, if different domain
            var ele = this.element();
            return null == ele ? null : ele.contentWindow;
        },
        /**
	 * Gets the document object for the widget. Only available for same domain widgets.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {HTMLDocument}
	*/
        document: function() {
            var ele = this.element();
            return Svidget.DOM.getDocument(ele);
        },
        /**
	 * Gets whether this widget reference is connected to its underlying widget. If false, then the widget is cut off from the page.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @returns {HTMLDocument}
	*/
        connected: function(val) {
            var res = this.getset("connected", val);
            // if undefined its a get so return value, if res is false then set failed
            // if undefined its a get so return value, if res is false then set failed
            return !(void 0 === val || !res) || res;
        },
        /**
	 * Gets whether this widget reference has specified that it prefers to connect to the underlying widget as a cross-domain widget, irregardless if it is actually cross-domain or not.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {boolean} - Sets the property.
	 * @returns {boolean} - True/false if crossdomain, or if setting then true/false if set succeeded.
	*/
        crossdomain: function(val) {
            var res = this.getset("crossdomain", val);
            // if undefined its a get so return value, if res is false then set failed
            // if undefined its a get so return value, if res is false then set failed
            return !(void 0 === val || !res) || res;
        },
        /**
	 * Gets a collection of all ParamProxy objects in the widget reference, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * params(0)
	 * params("color")
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {object} [selector] - The selector string or integer.
	 * @returns {Svidget.ParamProxyCollection} - A collection based on the selector, or the entire collection.
	*/
        params: function(selector) {
            var col = this.getset("params");
            return this.select(col, selector);
        },
        /**
	 * Gets the ParamProxy based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * param(0)
	 * param("color")
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {object} selector - The index or ID of the param.
	 * @returns {Svidget.ParamProxy} - The ParamProxy based on the selector. If selector is invalid, null is returned.
	*/
        param: function(selector) {
            var col = this.getset("params");
            return this.selectFirst(col, selector);
        },
        /**
	 * Gets a collection of all ActionProxy objects in the widget reference, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * actions(0)
	 * actions("doSomething")
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {(string|number|function)} [selector] - The action name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.ActionProxyCollection} - A collection based on the selector, or the entire collection.
	*/
        actions: function(selector) {
            var col = this.getset("actions");
            return this.select(col, selector);
        },
        /**
	 * Gets the ActionProxy based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * action(1)
	 * action("doSomething")
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {(string|number|function)} [selector] - The action name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.ActionProxy} - The ActionProxy based on the selector. If selector is invalid, null is returned.
	*/
        action: function(selector) {
            //var item = this.actions(selector).first();
            var col = this.getset("actions");
            return this.selectFirst(col, selector);
        },
        /**
	 * Gets a collection of all EventDescProxy objects in the widget reference, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * events(0)
	 * events("somethingHappened")
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {(string|number|function)} [selector] - The event name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.EventDescProxyCollection} - A collection based on the selector, or the entire collection.
	*/
        events: function(selector) {
            var col = this.getset("events");
            return this.select(col, selector);
        },
        /**
	 * Gets the EventDescProxy based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * events(0)
	 * events("somethingHappened")
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {(string|number|function)} [selector] - The event name, index, or search function (with signature function (param) returns boolean).
	 * @returns {Svidget.EventDescProxy} - The EventDescProxy based on the selector. If selector is invalid, null is returned.
	*/
        event: function(selector) {
            var col = this.getset("events");
            return this.selectFirst(col, selector);
        },
        // internal
        paramValues: function() {
            return this.getset("paramValues");
        },
        // internal
        addParamProxy: function(nameOrObject, value, options) {
            return this.params().add(nameOrObject, value, options, this);
        },
        // internal
        removeParamProxy: function(name) {
            return this.params().remove(name);
        },
        // internal
        // adds or updates the param proxy
        refreshParamProxy: function(name, value, options) {
            var p = this.param(name);
            if (null == p) return this.params().add(name, value, options, this);
            p.refreshProperties(options);
            return p;
        },
        updateParamValue: function(name, value) {
            var val = this.getset("paramValues");
            val = val || {};
            val[name] = value;
            this.getset("paramValues", val);
        },
        // internal
        // handle param added
        paramProxyAdded: function(param) {
            // raise event
            //alert('param added');
            Svidget.log("page: param proxy added: " + param.name());
            // trigger event
            this.triggerFromWidget("paramadd", param);
        },
        // internal
        // handle param removed
        paramProxyRemoved: function(param) {
            // raise event
            //alert('param removed');
            Svidget.log("page: param proxy removed: " + param.name());
            // trigger event
            this.triggerFromWidget("paramremove", param.name());
        },
        // internal
        // called from ParamProxy
        paramProxyBubble: function(type, event, param) {
            Svidget.log("page: param proxy bubble: " + param.name());
            "change" == type && this.paramProxyChanged(param, event.value);
            "valuechange" == type && this.paramProxyValueChanged(param, event.value);
        },
        // private
        // eventValue ex = { property: "binding", value: bindValue }
        paramProxyChanged: function(param, eventValue) {
            Svidget.log("page: param proxy change: " + param.name());
            this.triggerFromWidget("paramchange", eventValue, param);
        },
        // private
        // eventValue ex = { value: "3" }
        paramProxyValueChanged: function(param, eventValue) {
            Svidget.log("page: param proxy value change: " + param.name());
            this.triggerFromWidget("paramvaluechange", eventValue, param);
        },
        // internal
        addActionProxy: function(nameOrObject, options) {
            return this.actions().add(nameOrObject, options, this);
        },
        // internal
        removeActionProxy: function(name) {
            return this.actions().remove(name);
        },
        // internal
        // handle param added
        actionProxyAdded: function(action) {
            // raise event
            Svidget.log("page: action proxy added: " + action.name());
            // trigger event
            this.triggerFromWidget("actionadd", action);
        },
        // internal
        // handle param removed
        actionProxyRemoved: function(action) {
            Svidget.log("page: action proxy removed: " + action.name());
            // trigger event
            this.triggerFromWidget("actionremove", action.name());
        },
        // internal
        // called from action
        actionProxyBubble: function(type, event, action) {
            Svidget.log("page: action proxy bubble: " + action.name());
            "invoke" == type && this.actionProxyInvoked(action, event.value);
            "change" == type && this.actionProxyChanged(action, event.value);
            // event.target is actionParam that was changed
            "paramchange" == type && this.actionParamProxyChanged(action, event.target, event.value);
            // for add/remove, event.value == actionParam added or removed
            "paramadd" == type && this.actionParamProxyAdded(action, event.value);
            "paramremove" == type && this.actionParamProxyRemoved(action, event.value);
        },
        // private
        actionProxyInvoked: function(action, eventValue) {
            this.triggerFromWidget("actioninvoke", eventValue, action);
        },
        // private
        actionProxyChanged: function(action, eventValue) {
            this.triggerFromWidget("actionchange", eventValue, action);
        },
        // private
        actionParamProxyAdded: function(action, actionParam) {
            this.triggerFromWidget("actionparamadd", actionParam, action);
        },
        // private
        actionParamProxyRemoved: function(action, actionParamName) {
            this.triggerFromWidget("actionparamremove", actionParamName, action);
        },
        // private
        actionParamProxyChanged: function(action, actionParam, eventValue) {
            this.triggerFromWidget("actionparamchange", eventValue, actionParam);
        },
        // internal
        addEventProxy: function(nameOrObject, options) {
            return this.events().add(nameOrObject, options, this);
        },
        // internal
        removeEventProxy: function(name) {
            return this.events().remove(name);
        },
        // internal
        // handle param added
        eventProxyAdded: function(ev) {
            Svidget.log("page: event proxy added: " + ev.name());
            // trigger event
            this.triggerFromWidget("eventadd", ev);
        },
        // internal
        // handle param removed
        eventProxyRemoved: function(ev) {
            Svidget.log("page: event proxy removed: " + ev.name());
            // trigger event
            this.triggerFromWidget("eventremove", ev.name());
        },
        // internal, called from eventdescproxy
        eventProxyBubble: function(type, event, eventDesc) {
            Svidget.log("page: event proxy bubble: " + eventDesc.name());
            "trigger" == type && this.eventProxyTriggered(eventDesc, event);
            "change" == type && this.eventProxyChanged(eventDesc, event.value);
        },
        // private
        eventProxyTriggered: function(eventDesc, event) {
            Svidget.log("page: event proxy trigger: " + eventDesc.name());
            this.triggerFromWidget("eventtrigger", event.value, eventDesc);
        },
        // private
        eventProxyChanged: function(eventDesc, eventValue) {
            Svidget.log("page: event proxy change: " + eventDesc.name());
            this.triggerFromWidget("eventchange", eventValue, eventDesc);
        },
        eventContainer: function() {
            return this.getPrivate("eventContainer");
        },
        /**
	 * Registers an event handler for the WidgetReference.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {string} type - The event type i.e. "change", "paramremove".
	 * @param {object} [data] - Arbirary data to initialize Event object with when event is triggered.
	 * @param {string} [name] - The name of the handler. Useful when removing the handler for the event.
	 * @param {Function} handler - The event handler.
	 * @returns {boolean} - True if the event handler was successfully added.
	*/
        on: function(type, data, name, handler) {
            this.eventContainer().on(type, data, name, handler);
        },
        /**
	 * Unregisters an event handler for the WidgetReference.
	 * @method
	 * @memberof Svidget.WidgetReference.prototype
	 * @param {string} type - The event type i.e. "change", "paramremove".
	 * @param {(Function|string)} handlerOrName - The handler function and/or the handler name used when calling on().
	 * @returns {boolean} - True if the event handler was successfully removed.
	*/
        off: function(type, handlerOrName) {
            this.eventContainer().off(type, handlerOrName);
        },
        // internal
        // Note: no access to trigger() object events here, only from widget
        // this is invoked from the widget to signal that the event was triggered
        triggerFromWidget: function(type, value, originalTarget) {
            this.eventContainer().trigger(type, value, originalTarget);
        },
        hasElement: function() {
            return null != this.element();
        },
        // True if element is valid <object> or <iframe> and part of DOM.
        isAttached: function() {
            var ele = this.element();
            return null != ele && null != ele.parentNode;
        },
        isCrossDomain: function() {
            return this.element() !== this.declaringElement();
        },
        started: function() {
            return this.getset("started");
        },
        populated: function() {
            return this.getset("populated");
        },
        // internal
        // indicates from the widget that it has started.
        start: function() {
            this.getset("started", true);
        },
        // REGION: Populate
        // internal
        // Inflates this object with the transport JSON object
        populate: function(widgetObj) {
            if (!this.populated()) {
                // enabled
                this.enabled(widgetObj.enabled);
                // params
                this._populateParams(widgetObj.params);
                // actions
                this._populateActions(widgetObj.actions);
                // events
                this._populateEvents(widgetObj.events);
                this.getset("populated", true);
            }
        },
        // private
        // Populates the params from the transport object to this instance
        _populateParams: function(params) {
            if (params && Svidget.isArray(params)) for (var i = 0; i < params.length; i++) {
                var p = params[i], paramProxy = this.refreshParamProxy(p.name, p.value, p);
                paramProxy.connect();
            }
        },
        // private
        // Populates the params from the transport object to this instance
        _populateActions: function(actions) {
            if (actions && Svidget.isArray(actions)) for (var i = 0; i < actions.length; i++) {
                var a = actions[i], action = this.addActionProxy(a.name, a);
                this._populateActionParams(a.params, action);
            }
        },
        // private
        // Populates the actions from the transport object to this instance
        _populateActionParams: function(actionParams, action) {
            if (actionParams && Svidget.isArray(actionParams)) for (var i = 0; i < actionParams.length; i++) {
                var ap = actionParams[i];
                action.addParam(ap.name, ap);
            }
        },
        // private
        // Populates the events from the transport object to this instance
        _populateEvents: function(events) {
            if (events && Svidget.isArray(events)) for (var i = 0; i < events.length; i++) {
                var e = events[i];
                this.addEventProxy(e.name, e);
            }
        }
    };
    Svidget.extend(Svidget.WidgetReference, Svidget.ObjectPrototype);
    Svidget.Root.PagePrototype = {
        // ***********************************
        // REGION: Initializing
        initInternal: function() {
            this.idSeed = 1;
            // seed for widget IDs
            window._svidget = "page";
            this.connected(true);
            // default to true for page
            Object.defineProperty(this, "$", Svidget.readOnlyProperty(null));
        },
        readyPage: function() {
            Svidget.log("page: readyPage");
            //alert("page");
            this.loadPageWidgets();
        },
        // ***********************************
        // REGION: Widget Loading
        // Parses page for <object role="svidget"> and loads those as widgets
        loadPageWidgets: function() {
            // parse page for object role="svidget"
            var that = this;
            this.findAllWidgetElements().each(function(item) {
                that.loadPageWidget(item);
            });
        },
        // Loads a widget based on its <object> element.
        // objEle = <object role="svidget" data="(url)">
        // paramValues: passed in when adding widget dynamically via load()
        loadPageWidget: function(objEle, paramValues) {
            // check if a widget object was already created for this DOM <object> node, or via svidget.load call, if so then exit
            if (null == objEle.widgetReference && !objEle.svidgetLoad) {
                var widget = this.createWidgetReference(objEle, paramValues);
                this.addWidget(widget);
                //if (!Svidget.DOM.isElementDocumentReady(objEle)) {
                this.readyWidgetReference(widget, objEle);
                return widget;
            }
        },
        createWidgetReference: function(objEle, paramValues) {
            var paramObj;
            // parse <params> if not provided (provided for dynamic loading)
            paramObj = void 0 === paramValues ? this.parseParamElements(objEle) : paramValues;
            // check for forced values
            // allow case-insensitive per HTML rules
            var connected = !objEle.hasAttribute("data-connected") || this.isAttrEmptyOrTrue(objEle, "data-connected"), crossdomain = this.isAttrEmptyOrTrue(objEle, "data-crossdomain") || "" == objEle.data;
            // position if x and y are specified
            this.setElementPosition(objEle, objEle.getAttribute("data-x"), objEle.getAttribute("data-y"));
            // generate ID
            // tests: test an element with same id before and test with one after declared element
            var widgetID = this.getWidgetIDForElement(objEle), coreEle = this.resolveCoreWidgetElement(objEle, null, crossdomain), wRef = new Svidget.WidgetReference(widgetID, paramObj, objEle, coreEle, connected, crossdomain);
            objEle._widget = wRef;
            return wRef;
        },
        isAttrEmptyOrTrue: function(ele, attr) {
            return !!Svidget.DOM.isAttrEmpty(ele, attr) || Svidget.Conversion.toBool(Svidget.DOM.attrValue(ele, attr));
        },
        readyWidgetReference: function(widget, objEle) {
            // if <iframe> already loaded due to data-crossdomain
            var ele = widget.element() || objEle;
            this.addWidgetLoadEvents(ele, widget);
        },
        addWidgetLoadEvents: function(objEle, widget) {
            Svidget.log("page: addWidgetLoadEvents: id = " + objEle.id + ", tag = " + objEle.tagName);
            var handler = Svidget.wrap(this.finishPageWidget, this), wrapper = function() {
                handler(widget);
            };
            widget._waitingForDOM = true;
            Svidget.DOM.on(objEle, "load", wrapper);
        },
        // Finishes page widget:
        //   Makes sure widget element is loaded
        //   Makes sure widget is started
        finishPageWidget: function(widget) {
            //objEle) {
            Svidget.log("page: finishPageWidget: id = " + widget.id());
            //var widget = objEle.widgetReference; // this.createPageWidget(objEle);
            widget._waitingForDOM = false;
            // if <object> replaced with <iframe>
            var finalEle = this.ensureCoreElementResolved(widget);
            null != finalEle && finalEle != widget.declaringElement() ? this.readyWidgetReference(widget, widget.element()) : this.ensureWidgetStarted(widget);
        },
        ensureCoreElementResolved: function(widget) {
            if (widget.hasElement()) return null;
            var coreEle = this.resolveCoreWidgetElement(widget.declaringElement(), widget, widget.crossdomain());
            // objEle);
            if (null != coreEle) {
                Svidget.log("page: CoreElementCreated: " + coreEle.tagName + " id:" + widget.id());
                widget.setElement(coreEle);
                return coreEle;
            }
            return null;
        },
        ensureWidgetStarted: function(widget) {
            // if core element hasn't been defined yet, then return and try again later
            widget.hasElement() && !widget.started() && Svidget.DOM.isElementDocumentReady(widget.element()) && this.signalStart(widget, widget.paramValues());
        },
        // if DOM not yet loaded, returns null
        // if <object> is determined to be cross-domain, disables it and returns an alternate <iframe>
        // else returns declaring <object>
        resolveCoreWidgetElement: function(objEle, widget, crossdomain) {
            // try to get widget contentDocument
            var widgetDoc = Svidget.DOM.getDocument(objEle);
            // widget is not ready, so return null, we'll try again later
            // but if crossDomain flag is set, then we use iframe uncondtionally
            if (null === widgetDoc && !crossdomain) return null;
            var ifmEle = null, coreEle = objEle;
            // if undefined, it means access was denied making it cross domain widget
            // so we disable and hide <object> and replace with <iframe>
            if (void 0 === widgetDoc || crossdomain) {
                ifmEle = this.buildIFrameElement(objEle);
                objEle.parentNode.insertBefore(ifmEle, objEle);
                this.disableAndHide(objEle);
                coreEle = ifmEle;
            }
            return coreEle;
        },
        waitForWidgets: function() {
            setTimeout(Svidget.wrap(this.checkUnfinishedWidgetReferences, this), 50);
        },
        checkUnfinishedWidgetReferences: function() {
            // loops through each widget references with missing element
            // and checks if its document is ready
            // called from handle widget initialized
            // var unfinalWidgets = 
            if (!this.allWidgetsStarted) {
                Svidget.log("page: checkUnfinishedWidgetReferences");
                var that = this, count = 0;
                this.widgets().where(function(w) {
                    return that.needsFinishing(w);
                }).each(function(w) {
                    //	return !w.hasElement() && Svidget.DOM.isElementDocumentReady(w.declaringElement()); 
                    //}).each(function (w) { 
                    count++;
                    that.finishPageWidget(w);
                });
                // set flag so that we stop checking for unfinalized widgets
                //if (count == 0) this.allWidgetsFinalized = true;
                this.waitForWidgets();
            }
        },
        needsFinishing: function(widget) {
            // if widget element hasn't been finalized or started, and declaring element is ready, then it needs finalizing
            return !widget._waitingForDOM && (!(widget.hasElement() && widget.started() || !Svidget.DOM.isElementDocumentReady(widget.declaringElement())) || !(!widget.hasElement() || !widget.isCrossDomain() || widget.started() || !Svidget.DOM.isElementDocumentReady(widget.element())));
        },
        areAllWidgetsStarted: function() {
            return this.widgets().all(function(w) {
                return w.started();
            });
        },
        disableAndHide: function(ele) {
            ele.data = "";
            //todo: confirm this works
            Svidget.DOM.disable(ele);
            Svidget.DOM.hide(ele);
        },
        getWidgetIDForElement: function(objEle) {
            var id = objEle.id;
            //(objEle.id == null) ? this.generateWidgetID() : objEle.id;
            // if id points to element (no duplicates, then just use that)
            //(objEle.id == null) ? this.generateWidgetID() : objEle.id;
            // if id points to element (no duplicates, then just use that)
            return null != id && Svidget.DOM.get(id) == objEle ? id : this.newWidgetID();
        },
        newWidgetID: function() {
            var prefix = "_svidget_";
            void 0 === this.idCounter && (this.idCounter = 1);
            for (var id, idNum = this.idCounter; ;) {
                var id = prefix + idNum;
                idNum++;
                if (null == Svidget.DOM.get(id)) break;
            }
            this.idCounter = idNum;
            return id;
        },
        buildIFrameElement: function(objEle) {
            var iframe = document.createElement("iframe");
            Svidget.DOM.wrap(objEle).attributes().each(function(a) {
                "data" == a.name() || "data-url" == a.name() ? iframe.setAttribute("src", a.value()) : "id" == a.name() ? iframe.setAttribute("id", a.value() + "_frame") : iframe.setAttribute(a.name(), a.value());
            });
            iframe.frameBorder = 0;
            iframe.seamless = true;
            return iframe;
        },
        buildObjectElement: function(options, paramObj) {
            if (!document.createElement) return null;
            var objEle = document.createElement("object");
            objEle.setAttribute("role", "svidget");
            objEle.setAttribute("data-url", options.url);
            // for crossdomain, no need to load widget into object, an iframe will take its place
            true !== options.crossdomain && objEle.setAttribute("data", options.url);
            options.id && objEle.setAttribute("id", options.id);
            options.width && objEle.setAttribute("width", options.width);
            options.height && objEle.setAttribute("height", options.height);
            // yes, if these values are false we dont want to write them out
            void 0 !== options.connected && objEle.setAttribute("data-connected", options.connected);
            true === options.crossdomain && objEle.setAttribute("data-crossdomain", options.crossdomain);
            // copy other known attributes
            options.style && objEle.setAttribute("style", options.style);
            options.cssclass && objEle.setAttribute("class", options.cssclass);
            void 0 !== options.allowfullscreen && objEle.setAttribute("allowfullscreen", options.allowfullscreen);
            options.title && objEle.setAttribute("title", options.title);
            // position if x and y are specified
            this.setElementPosition(objEle, options.x, options.y);
            // params
            for (var key in paramObj) {
                document.createElement("param").setAttribute("name", key);
            }
            return objEle;
        },
        createObjectElement: function(container, options, paramObj) {
            var objEle = this.buildObjectElement(options, paramObj);
            // 0.3.3: set flag, causing problems in IE with nested iframes (see Starry Night CodePen) as once objEle is inserted readystatechange is fired, causing flow to be out of sync
            objEle.svidgetLoad = true;
            container.appendChild(objEle);
            return objEle;
        },
        setElementPosition: function(ele, x, y) {
            var px = null != x ? parseFloat(x) : NaN, py = null != y ? parseFloat(y) : NaN;
            if (!isNaN(px) || !isNaN(py)) {
                var pos = ele.style.position;
                "absolute" != pos && "fixed" != pos && (ele.style.position = "absolute");
                isNaN(px) || (ele.style.left = px + "px");
                isNaN(py) || (ele.style.top = py + "px");
            }
        },
        // this is called once the params/actions and widget data are sent from the widget
        populateWidgetReference: function(widgetRef, widgetTransport) {
            Svidget.log("page: populateWidgetReference");
            widgetRef.populated() || widgetRef.populate(widgetTransport);
        },
        findAllWidgetElements: function() {
            var that = this;
            return Svidget.DOM.getByName("object", true).where(function(item) {
                return that.containsSvidgetRole(item);
            });
        },
        containsSvidgetRole: function(ele) {
            return /(^|,)\s*svidget\s*(,|$)/.test(Svidget.DOM.attrValue(ele, "role"));
        },
        // Parses the <param> elements inside of the <object> element for the widget.
        parseParamElements: function(objEle) {
            for (var paramEles = Svidget.DOM.getChildrenByName(objEle, "param", true), obj = {}, i = 0; i < paramEles.length; i++) {
                var name = paramEles[i].getAttribute("name");
                null != name && name.length > 0 && (obj[name] = paramEles[i].getAttribute("value"));
            }
            return obj;
        },
        // RETURNS
        // A  WidgetReference object by that ID
        getWidget: function(id) {
            return null == id ? null : this.widgets().first(function(w) {
                return w.id() === id;
            });
        },
        // internal
        addWidget: function(widget) {
            if (this.widgets().contains(widget)) return false;
            this.widgets().add(widget);
            return true;
        },
        // ***********************************
        // REGION: Public Methods
        /**
	 * Registers an event handler for the "widgetload" event for the global object.
	 * Examples:
	 * svidget.load("#container", "mywidget.svg")
	 * svidget.load("#container", "mywidget.svg", { color: "red" }, loadCallback)
	 * svidget.load("#container", { url: "mywidget.svg", crossdomain: true }, { color: "red" })
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {string} selector - Arbirary data to initialize Event object with when event is triggered.
	 * @param {(string|object)} urlOrOptions - The url to the widget, or an options object contains properties to initialize the widget reference with.
	 * @param {object} paramObj - The object to initialize params with.
	 * @param {Function} callback - A function to call when loading is complete.
	 * @returns {Svidget.WidgetReference} - The widget reference created, or null if create fails.
	*/
        load: function(selector, urlOrOptions, paramObj, callback) {
            // should we allow multiple sel and create a Widget for each? (hint test a jquery plugin) also: we can have a loadAll (named like queryselectorAll)
            // resolve container
            var container = Svidget.DOM.selectElement(selector);
            if (null == container) return null;
            // resolve urlOrOptions
            var options = null;
            if ("string" == typeof urlOrOptions) options = {
                url: urlOrOptions
            }; else {
                if (null == urlOrOptions) return null;
                options = urlOrOptions;
            }
            if (null != options.url) {
                // clear state
                this.allWidgetsStarted = false;
                // build out <object> element
                var widgetEle = this.createObjectElement(container, options, paramObj);
                delete widgetEle.svidgetLoad;
                // clear flag
                var widget = this.loadPageWidget(widgetEle, paramObj);
                // note: if this is called before ready, then it is queued
                // returns the WidgetReference object
                // if callback defined, defer invocation
                callback && "function" == typeof callback && setTimeout(function() {
                    callback(widget);
                }, 0);
                // return widget
                return widget;
            }
        },
        // ***********************************
        // REGION: Public Properties
        /**
	 * Gets a collection of all widgets, or a sub-collection based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * widgets(0)
	 * widgets("widget-1")
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {object} [selector] - An integer index or string ID
	 * @returns {Svidget.ObjectCollection} - A collection based on the selector, or the entire collection.
	*/
        widgets: function(selector) {
            var col = this.getWidgets();
            return this.select(col, selector);
        },
        /**
	 * Gets the widget based on the selector.
	 * Selector can be an integer to get the zero-based item at that index, or a string to select by that ID.
	 * Examples:
	 * widgets(0)
	 * widgets("widget-1")
	 * @method
	 * @memberof Svidget.Root.prototype
	 * @param {object} selector - The index or ID of the widget.
	 * @returns {Svidget.WidgetReference} - The widget reference based on the selector. If selector is invalid, null is returned.
	*/
        widget: function(selector) {
            var col = this.getWidgets();
            return this.selectFirst(col, selector);
        },
        // private
        getWidgets: function() {
            var col = this.getset("widgets");
            if (null == col) {
                col = new Svidget.ObjectCollection(null, Svidget.WidgetReference);
                this.getset("widgets", col);
            }
            return col;
        },
        // private
        triggerWidgetEvent: function(widgetRef, eventName, data) {
            var ev = widgetRef.event(eventName);
            null != ev && ev.triggerFromWidget(data);
        },
        // ***********************************
        // REGION: Communication
        receiveFromWidget: function(name, payload, widgetID) {
            Svidget.log("page: receiveFromWidget {name: " + name + ", widgetID: " + widgetID + "}");
            var widget = this.getWidget(widgetID);
            //if (widget == null && name != "initialized") return; // widgetID may be null if widget hasn't been assigned an ID
            // invoke handler for message
            switch (name) {
              // lifecycle handlers
                // payload == widget transport { id: "", enabled: true, params: [], actions: [] } 
                //case "initialized": this.handleReceiveWidgetInitialized(); break; //widget, payload); break;
                //case "loaded": this.handleReceiveWidgetLoaded(widget, payload); break;
                // params handlers 
                // payload == param transport { name: "background", type: "", value: 3 }
                case "paramadded":
                this.handleReceiveWidgetParamAdded(widget, payload);
                break;

              case "paramremoved":
                this.handleReceiveWidgetParamRemoved(widget, payload);
                break;

              case "paramchanged":
                this.handleReceiveWidgetParamChanged(widget, payload);
                break;

              case "paramset":
                this.handleReceiveWidgetParamSet(widget, payload);
                break;

              // actions handlers
                case "actionadded":
                this.handleReceiveWidgetActionAdded(widget, payload);
                break;

              case "actionremoved":
                this.handleReceiveWidgetActionRemoved(widget, payload);
                break;

              case "actionchanged":
                this.handleReceiveWidgetActionChanged(widget, payload);
                break;

              case "actioninvoked":
                this.handleReceiveWidgetActionInvoked(widget, payload);
                break;

              case "actionparamadded":
                this.handleReceiveWidgetActionParamAdded(widget, payload);
                break;

              case "actionparamremoved":
                this.handleReceiveWidgetActionParamRemoved(widget, payload);
                break;

              case "actionparamchanged":
                this.handleReceiveWidgetActionParamChanged(widget, payload);
                break;

              // events handlers
                case "eventadded":
                this.handleReceiveWidgetEventAdded(widget, payload);
                break;

              case "eventremoved":
                this.handleReceiveWidgetEventRemoved(widget, payload);
                break;

              case "eventchanged":
                this.handleReceiveWidgetEventChanged(widget, payload);
                break;

              case "eventtriggered":
                this.handleReceiveWidgetEventTriggered(widget, payload);
                break;

              // acks
                case "startack":
                this.handleReceiveWidgetStartAck(widget, payload);
            }
        },
        // signal widget to start, effectively establishing a connection from parent to it
        signalStart: function(widgetRef, paramValues) {
            Svidget.log("page: signalStart {id: " + widgetRef.id() + ", url: " + widgetRef.url() + ", tag: " + widgetRef.element().tagName + "}");
            //var paramValues = {};
            var payload = {
                id: widgetRef.id(),
                params: paramValues,
                connected: widgetRef.connected()
            };
            this.comm().signalWidget(widgetRef, "start", payload);
        },
        signalPropertyChange: function(widgetRef, obj, objType, propName, propValue) {
            if (widgetRef.started() && widgetRef.connected()) {
                Svidget.log("page: signalPropertyChange {id: " + widgetRef.id() + ", type: " + objType + "}");
                var payload = {
                    type: objType,
                    name: obj.name(),
                    propertyName: propName,
                    value: propValue
                };
                this.comm().signalWidget(widgetRef, "propertychange", payload);
            }
        },
        signalActionInvoke: function(widgetRef, actionProxy, argList) {
            if (widgetRef.started() && widgetRef.connected()) {
                Svidget.log("page: signalActionInvoke {id: " + widgetRef.id() + ", url: " + widgetRef.url() + "}");
                //var paramValues = {};
                var payload = {
                    action: actionProxy.name(),
                    args: argList
                };
                this.comm().signalWidget(widgetRef, "actioninvoke", payload);
            }
        },
        signalEventTrigger: function(widgetRef, eventDescProxy, data) {
            if (widgetRef.started() && widgetRef.connected()) {
                Svidget.log("page: signalEventTrigger {id: " + widgetRef.id() + "}");
                var payload = {
                    event: eventDescProxy.name(),
                    data: data
                };
                this.comm().signalWidget(widgetRef, "eventtrigger", payload);
            }
        },
        // invoked by widget to notify parent that it has been instantiated
        handleReceiveWidgetInitialized: function() {
            //widgetRef, widgetTransport) {
            Svidget.log("page: handleReceiveWidgetInitialized");
        },
        // invoked by widget to notify parent that it is loaded and ready
        handleReceiveWidgetLoaded: function(widgetRef, widgetTransport) {
            //this.signalStart(widgetProxy); // moved to initialized
            // in most cases, widget should be finalized, but call one more time just in case
            // commented out because it no longer makes sense because if widgetRef is not null then it means that start was already called
            // this.finalizePageWidget(widgetRef.declaringElement());
            // trigger load widget event
            // if null, it means that widget DOM loaded before start was called, so defer
            null != widgetRef ? this.populateWidgetReference(widgetRef, widgetTransport) : this.checkUnfinishedWidgetReferences();
        },
        // invoked by widget to notify parent that it received start message
        // if the widget is to be in standalone mode then this will not be invoked
        handleReceiveWidgetStartAck: function(widgetRef, widgetTransport) {
            Svidget.log("page: handleReceiveWidgetStartAck {widget: " + widgetRef.id() + "}");
            // ignore subsequent acks
            if (!widgetRef.started()) {
                widgetRef.start();
                this.populateWidgetReference(widgetRef, widgetTransport);
                this.triggerWidgetLoad(widgetRef.id());
                // check if all widgets loaded, if so fire loaded
                // note: this is probably a bit inefficient, but we'll optimize later
                if (this.areAllWidgetsStarted()) {
                    this.allWidgetsStarted = true;
                    this.markLoaded();
                }
            }
        },
        // Handle: Params
        // invoked by widget to notify parent that a param was added
        handleReceiveWidgetParamAdded: function(widgetRef, paramPayload) {
            Svidget.log("page: handleReceiveWidgetParamAdded {param: " + paramPayload.name + "}");
            // paramPayload == param transport
            // add the paramProxy from param transport, this will trigger any events associated with the add
            widgetRef.addParamProxy(paramPayload.name, paramPayload);
        },
        // invoked by widget to notify parent that a param was removed
        handleReceiveWidgetParamRemoved: function(widgetRef, paramName) {
            Svidget.log("page: handleReceiveWidgetParamRemoved {param: " + paramName + "}");
            // remove the paramProxy, this will trigger any events associated with the add
            widgetRef.removeParamProxy(paramName);
        },
        // changeData: { name: actionName, property: "enabled", value: val }
        handleReceiveWidgetParamChanged: function(widgetRef, changePayload) {
            Svidget.log("page: handleReceiveWidgetParamChanged {param: " + changePayload.name + "}");
            var param = widgetRef.param(changePayload.name);
            null != param && param.notifyPropertyChange(changePayload.property, changePayload.value);
        },
        // valueData: { name: actionName, value: val }
        handleReceiveWidgetParamSet: function(widgetRef, setPayload) {
            Svidget.log("page: handleReceiveWidgetParamSet {param: " + setPayload.name + "}");
            var param = widgetRef.param(setPayload.name);
            null != param && param.notifyValueChange(setPayload.value);
        },
        // Handle: Actions
        // invoked by widget to notify parent that a param was added
        handleReceiveWidgetActionAdded: function(widgetRef, actionPayload) {
            Svidget.log("page: handleReceiveWidgetActionAdded {action: " + actionPayload.name + "}");
            // actionPayload == action transport
            // add the actionProxy from action transport, this will trigger any events associated with the add
            widgetRef.addActionProxy(actionPayload.name, actionPayload);
        },
        // invoked by widget to notify parent that a param was removed
        handleReceiveWidgetActionRemoved: function(widgetRef, actionName) {
            Svidget.log("page: handleReceiveWidgetActionRemoved {action: " + actionName + "}");
            // remove the paramProxy, this will trigger any events associated with the add
            widgetRef.removeActionProxy(actionName);
        },
        // changeData: { name: actionName, property: "enabled", value: val }
        handleReceiveWidgetActionChanged: function(widgetRef, changePayload) {
            Svidget.log("page: handleReceiveWidgetActionChanged {action: " + changePayload.name + "}");
            var action = widgetRef.action(changePayload.name);
            null != action && action.notifyPropertyChange(changePayload.property, changePayload.value);
        },
        // actionReturnPayload = { name: actionName, returnValue: "value returned from action" }
        handleReceiveWidgetActionInvoked: function(widgetRef, actionReturnPayload) {
            Svidget.log("page: handleReceiveWidgetActionInvoked {action: " + actionReturnPayload.name + "}");
            var action = widgetRef.action(actionReturnPayload.name);
            null != action && action.invokeFromWidget(actionReturnPayload.returnValue);
        },
        // invoked by widget to notify parent that a param was added
        handleReceiveWidgetActionParamAdded: function(widgetRef, actionParamPayload) {
            Svidget.log("page: handleReceiveWidgetActionParamAdded {actionparam: " + actionParamPayload.name + "}");
            // actionPayload == action transport
            // add the actionProxy from action transport, this will trigger any events associated with the add
            var action = widgetRef.action(actionParamPayload.actionName);
            null != action && action.addParam(actionParamPayload.name, actionParamPayload);
        },
        // invoked by widget to notify parent that a param was removed
        // { name: actionParamName, actionName: actionName }
        handleReceiveWidgetActionParamRemoved: function(widgetRef, actionParamNamePayload) {
            Svidget.log("page: handleReceiveWidgetActionParamRemoved {actionparam: " + actionParamNamePayload + "}");
            // remove the paramProxy, this will trigger any events associated with the add
            var action = widgetRef.action(actionParamNamePayload.actionName);
            null != action && action.removeParam(actionParamNamePayload.name);
        },
        // changeData: { name: actionParamName, actionName: actionName, property: "enabled", value: val }
        handleReceiveWidgetActionParamChanged: function(widgetRef, changePayload) {
            Svidget.log("page: handleReceiveWidgetActionParamChanged {actionparam: " + changePayload.name + "}");
            var action = widgetRef.action(changePayload.actionName);
            if (null != action) {
                var actionParam = action.param(changePayload.name);
                null != actionParam && actionParam.notifyPropertyChange(changePayload.property, changePayload.value);
            }
        },
        // Handle: Events
        handleReceiveWidgetEventAdded: function(widgetRef, eventDescPayload) {
            Svidget.log("page: handleReceiveWidgetEventAdded {event: " + eventDescPayload.name + "}");
            // eventPayload == eventDesc transport
            // add the eventDescProxy from eventDesc transport, this will trigger any events associated with the add
            widgetRef.addEventProxy(eventDescPayload.name, eventDescPayload);
        },
        handleReceiveWidgetEventRemoved: function(widgetRef, eventDescName) {
            Svidget.log("page: handleReceiveWidgetEventRemoved {event: " + eventDescName + "}");
            // eventPayload == eventDesc.name
            // remove the eventDescProxy by its name, this will trigger any events associated with the remove
            widgetRef.removeEventProxy(eventDescName);
        },
        // changeData: { name: eventName, property: "enabled", value: val }
        handleReceiveWidgetEventChanged: function(widgetRef, changePayload) {
            Svidget.log("page: handleReceiveWidgetEventChanged {event: " + changePayload.name + "}");
            var ev = widgetRef.event(changePayload.name);
            null != ev && ev.notifyPropertyChange(changePayload.property, changePayload.value);
        },
        // invoked by widget to notify parent that an event was triggered
        handleReceiveWidgetEventTriggered: function(widgetRef, eventDataPayload) {
            Svidget.log("page: handleReceiveWidgetEventTriggered {event: " + eventDataPayload.name + "}");
            //{ "name": eventDesc.name(), "value": value };
            var ev = widgetRef.event(eventDataPayload.name);
            null != ev && ev.triggerEventFromWidget(eventDataPayload.value);
        }
    };
    Svidget.Root.WidgetPrototype = {
        // ***********************************
        // REGION: Initializing
        initInternal: function() {
            // init widget object
            this.loadCurrent();
            // notify parent that widget is initialized and ready to be started
            // update: moved to sviget.start because we don't want to signal until svidget object created
            //this.signalInitialized();
            window._svidget = "widget";
        },
        readyWidget: function() {
            Svidget.log("widget: readyWidget");
            // start widget
            this.startWidget();
            // call ready on the widget for final setup
            //this.current().ready();
            // notify parent that widget is loaded
            this.markLoaded();
        },
        // ***********************************
        // REGION: Widget Element Loading
        // widget object should be instantiated before ready
        loadCurrent: function() {
            // load widget object
            var widget = new Svidget.Widget();
            this.setCurrent(widget);
            this.setCurrent = null;
            // destroy the setter, freeze this.current();
            // load widget objects:
            // params, actions
            //alert(doc.readyState);
            // assign a shortcut to current() i.e. svidget.$.param("text")
            Object.defineProperty(this, "$", Svidget.readOnlyProperty(widget));
        },
        startWidget: function() {
            var widget = this.current();
            // parse elements - <params>, <actions>, and <events>
            this.parseElements();
            // set up widget as either standalone or connected
            this.connected() ? this.startWidgetConnected(widget) : this.startWidgetStandalone(widget);
        },
        startWidgetStandalone: function(widget) {
            //Svidget.log("startWidgetStandalone");
            // read values from query string and populate params
            var paramValues = this.getParamValuesFromQueryString();
            this.setParamValues(widget, paramValues, true);
            widget.start();
        },
        startWidgetConnected: function(widget) {
            //Svidget.log("startWidgetConnected");
            if (null != this.paramValues) {
                this.setParamValues(this.paramValues);
                this.paramValues = null;
                // clear this out, we dont need it anymore
                widget.setPopulatedFromPage();
            }
            widget.start();
        },
        parseElements: function() {
            // get <svidget:params> xml element
            var paramsElement = this.getParamsElement();
            // populate params
            this.populateParams(paramsElement);
            // get <svidget:actions> xml element
            var actionsElement = this.getActionsElement();
            // populate actions
            this.populateActions(actionsElement);
            // get <svidget:events> xml element
            var eventsElement = this.getEventsElement();
            // populate events
            this.populateEvents(eventsElement);
        },
        getParamsElement: function() {
            return this.getSvidgetElement("params");
        },
        getActionsElement: function() {
            return this.getSvidgetElement("actions");
        },
        getEventsElement: function() {
            return this.getSvidgetElement("events");
        },
        getSvidgetElement: function(name) {
            var eles = Svidget.DOM.getByNameSvidget(name, true);
            return 0 == eles.length ? null : eles[0];
        },
        // Populates Params into the widget based on the 
        // xele == <svidget:params> element
        populateParams: function(xele) {
            if (null != xele) {
                // param element missing
                var that = this, widget = this.current();
                this.populateElementObjects(xele, function(nextEle, widget) {
                    var param = that.buildParam(nextEle, widget);
                    null != param && widget.addParam(param);
                });
                // 0.1.3: wire declared add/remove handlers
                this.wireDeclaredHandler(widget, widget.ondeclaredparamadd, Svidget.DOM.attrValue(xele, "onadd"));
                this.wireDeclaredHandler(widget, widget.ondeclaredparamremove, Svidget.DOM.attrValue(xele, "onremove"));
            }
        },
        buildParam: function(xele, widget) {
            if (!this.isValidSvidgetElement(xele, "param")) return null;
            var name = Svidget.DOM.attrValue(xele, "name");
            //xele.attributes["name"];
            if (null == name) return null;
            // don't allow a param without a name
            var value = Svidget.DOM.attrValue(xele, "value"), options = this.buildOptions(xele, Svidget.Param.optionProperties), param = new Svidget.Param(name, value, options, widget);
            this.wireDeclaredChangeHandler(param, Svidget.DOM.attrValue(xele, "onchange"));
            this.wireDeclaredSetHandler(param, Svidget.DOM.attrValue(xele, "onset"));
            return param;
        },
        populateActions: function(xele) {
            if (null != xele) {
                // action element missing
                var that = this, widget = this.current();
                this.populateElementObjects(xele, function(nextEle, widget) {
                    var action = that.buildAction(nextEle, widget);
                    if (null != action) {
                        widget.addAction(action);
                        that.populateActionParams(nextEle, action);
                    }
                });
                // 0.1.3: wire declared add/remove handlers
                this.wireDeclaredHandler(widget, widget.ondeclaredactionadd, Svidget.DOM.attrValue(xele, "onadd"));
                this.wireDeclaredHandler(widget, widget.ondeclaredactionremove, Svidget.DOM.attrValue(xele, "onremove"));
            }
        },
        // Populates action params into the action
        // actionEle == <svidget:action> element
        populateActionParams: function(actionEle, action) {
            if (null != actionEle) {
                // actionparam element missing
                var that = this;
                this.populateElementObjects(actionEle, function(nextEle, widget) {
                    var param = that.buildActionParam(nextEle, action);
                    null != param && action.addParam(param);
                });
            }
        },
        buildAction: function(xele, widget) {
            if (!this.isValidSvidgetElement(xele, "action")) return null;
            var name = Svidget.DOM.attrValue(xele, "name");
            //xele.attributes["name"];
            if (null == name) return null;
            // don't allow a param without a name
            var options = this.buildOptions(xele, Svidget.Action.optionProperties), action = new Svidget.Action(name, options, widget);
            // 0.1.3: wire declared add/remove handlers
            this.wireDeclaredChangeHandler(action, Svidget.DOM.attrValue(xele, "onchange"));
            this.wireDeclaredInvokeHandler(action, Svidget.DOM.attrValue(xele, "oninvoke"));
            this.wireDeclaredParamAddHandler(action, Svidget.DOM.attrValue(xele, "onparamadd"));
            this.wireDeclaredParamRemoveHandler(action, Svidget.DOM.attrValue(xele, "onparamremove"));
            this.wireDeclaredParamChangeHandler(action, Svidget.DOM.attrValue(xele, "onparamchange"));
            return action;
        },
        buildActionParam: function(xele, action) {
            if (!this.isValidSvidgetElement(xele, "actionparam")) return null;
            var name = Svidget.DOM.attrValue(xele, "name");
            //xele.attributes["name"];
            if (null == name) return null;
            // don't allow a param without a name
            var options = this.buildOptions(xele, Svidget.ActionParam.optionProperties), param = new Svidget.ActionParam(name, options, action);
            this.wireDeclaredChangeHandler(param, Svidget.DOM.attrValue(xele, "onchange"));
            return param;
        },
        // Populates Params into the widget based on the 
        // xele == <svidget:events> element
        populateEvents: function(xele) {
            if (null != xele) {
                // event element missing
                var that = this, widget = this.current();
                this.populateElementObjects(xele, function(nextEle, widget) {
                    var ev = that.buildEvent(nextEle, widget);
                    null != ev && widget.addEvent(ev);
                });
                // 0.1.3: wire declared add/remove handlers
                this.wireDeclaredHandler(widget, widget.ondeclaredeventadd, Svidget.DOM.attrValue(xele, "onadd"));
                this.wireDeclaredHandler(widget, widget.ondeclaredeventremove, Svidget.DOM.attrValue(xele, "onremove"));
            }
        },
        buildEvent: function(xele, widget) {
            if (!this.isValidSvidgetElement(xele, "event")) return null;
            var name = Svidget.DOM.attrValue(xele, "name");
            //xele.attributes["name"];
            if (null == name) return null;
            // don't allow a param without a name
            var options = this.buildOptions(xele, Svidget.EventDesc.optionProperties), ev = new Svidget.EventDesc(name, options, widget);
            this.wireDeclaredChangeHandler(ev, Svidget.DOM.attrValue(xele, "onchange"));
            this.wireDeclaredTriggerHandler(ev, Svidget.DOM.attrValue(xele, "ontrigger"));
            return ev;
        },
        populateElementObjects: function(xele, eachAction) {
            if (null != xele && null != xele.childNodes) for (var widget = this.current(), nextEle = xele.firstElementChild; null != nextEle; ) {
                eachAction && eachAction(nextEle, widget);
                nextEle = nextEle.nextElementSibling;
            }
        },
        buildOptions: function(xele, optionProps) {
            var options = {};
            if (null == optionProps || !Svidget.isArray(optionProps)) return options;
            for (var i = 0; i < optionProps.length; i++) {
                var optName = optionProps[i], optVal = Svidget.DOM.attrValue(xele, optName);
                null != optVal && (options[optName] = optVal);
            }
            return options;
        },
        wireDeclaredChangeHandler: function(obj, funcStr) {
            this.wireDeclaredHandler(obj, obj.ondeclaredchange, funcStr);
        },
        wireDeclaredSetHandler: function(param, funcStr) {
            this.wireDeclaredHandler(param, param.ondeclaredset, funcStr);
        },
        wireDeclaredInvokeHandler: function(action, funcStr) {
            this.wireDeclaredHandler(action, action.ondeclaredinvoke, funcStr);
        },
        wireDeclaredTriggerHandler: function(event, funcStr) {
            this.wireDeclaredHandler(event, event.ondeclaredtrigger, funcStr);
        },
        wireDeclaredParamAddHandler: function(action, funcStr) {
            this.wireDeclaredHandler(action, action.ondeclaredparamadd, funcStr);
        },
        wireDeclaredParamRemoveHandler: function(action, funcStr) {
            this.wireDeclaredHandler(action, action.ondeclaredparamremove, funcStr);
        },
        wireDeclaredParamChangeHandler: function(action, funcStr) {
            this.wireDeclaredHandler(action, action.ondeclaredparamchange, funcStr);
        },
        wireDeclaredHandler: function(obj, wireFunc, funcStr) {
            if (null != wireFunc) {
                var func = Svidget.findFunction(funcStr);
                null != func && Svidget.isFunction(func) && wireFunc.call(obj, func);
            }
        },
        // Called by parent (via global object) to signal that is has established its relationship with the parent page.
        // Params:
        //   id: the ID assigned to this widget
        //   paramValues: the param values as they were declared on the page, or provided if widget declared programmatically
        //   connected: whether the widget is connected to its parent, if false it will remain in standalone mode and cease any further communication with the parent
        // Remarks:
        //   start() may be called at any point during the DOM lifecycle for this widget, i.e. while DOM is still parsing or when completed
        connectWidget: function(id, paramValues, connected) {
            var widget = this.current();
            if (!widget.connected()) {
                // connect, setting id
                if (connected) {
                    Svidget.log("widget: connect {id: " + id + "}");
                    widget.connect(id);
                    this.getset("connected", true);
                } else Svidget.log("widget: standalone {id: " + id + "}");
                this.paramValues = paramValues || {};
                this.fixSizing();
            }
        },
        startWidgetWithPageParams: function() {
            //Svidget.log("startWidgetWithPageParams");
            var widget = this.current();
            if (widget.started()) {
                this.setParamValues(widget, this.paramValues);
                widget.setPopulatedFromPage();
            }
        },
        // Gets the param values from the query string.
        getParamValuesFromQueryString: function() {
            return Svidget.Util.queryString();
        },
        // SUMMARY
        // Sets the param values for every param using the values from the specified object. This object can be from the query string or parent.
        // Params initialized with a value will be skipped if there is no matching entry in the values object.
        setParamValues: function(widget, paramValues, qsMode) {
            // note: can only be called internally
            // loop through all params, if value in paramValues then overwrite, if value not yet populated on param then use default value, otherwise skip
            //var widget = this.current();
            var col = widget.params();
            null != col && col.each(function(p) {
                var key = qsMode ? p.shortname() || p.name() : p.name(), val = paramValues[key];
                // query string value present so use it
                void 0 === val && (val = paramValues[p.name()]);
                // 0.3.4: fallback on name if used instead of shortname
                void 0 === val && (val = p.defvalue());
                // 0.1.3: query string value not present, so use defvalue
                void 0 !== key && // value is present in query string or defvalue attr
                p.value(val);
            });
        },
        isValidSvidgetElement: function(xele, name) {
            return null != xele && xele.localName == name && xele.namespaceURI == Svidget.Namespaces.svidget;
        },
        fixSizing: function() {
            var root = Svidget.DOM.root();
            // for iframes with viewBox, we need to ensure SVG content scales with iframe size, so we set width/height to 100%
            if (root && root.viewBox && root.viewBox.baseVal && root.viewBox.baseVal.width > 0 && root.viewBox.baseVal.height > 0) {
                root.setAttribute("width", "100%");
                root.setAttribute("height", "100%");
            }
        },
        // ***********************************
        // REGION: Public Properties
        /**
	 * Gets the current widget. 
	 * @method
	 * @memberof Svidget.Root
	 * @returns {Svidget.Widget} - The current widget.
	*/
        current: function() {
            return this.getset("current");
        },
        /**
	 * Gets whether the widget is connected to a parent page.
	 * @method
	 * @memberof Svidget.Root
	 * @returns {boolean}
	*/
        connected: function() {
            return this.getset("connected");
        },
        // ***********************************
        // REGION: Communications
        receiveFromParent: function(name, payload) {
            Svidget.log("widget: receiveFromParent {name: " + name + "}");
            "start" == name ? this.handleReceiveParentStart(payload) : "actioninvoke" == name ? this.handleReceiveParentActionInvoke(payload) : "eventtrigger" == name ? this.handleReceiveParentEventTrigger(payload) : "propertychange" == name && this.handleReceiveParentPropertyChange(payload);
        },
        signalStartAck: function() {
            Svidget.log("widget: signalStartAck {id: " + this.current().id() + "}");
            var t = this.current().toTransport();
            this.comm().signalParent("startack", t, this.current().id());
        },
        // for any other signals, if widget isn't connected then don't signal
        // Params
        signalParamAdded: function(param) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalParamAdded {id: " + this.current().id() + "}");
                var transport = param.toTransport();
                this.comm().signalParent("paramadded", transport, this.current().id());
            }
        },
        signalParamRemoved: function(paramName) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalParamRemoved {id: " + this.current().id() + "}");
                //var transport = param.name();
                this.comm().signalParent("paramremoved", paramName, this.current().id());
            }
        },
        signalParamChanged: function(param, changeData) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalParamChanged {id: " + this.current().id() + "}");
                changeData.name = param.name();
                // add param name
                this.comm().signalParent("paramchanged", changeData, this.current().id());
            }
        },
        signalParamSet: function(param, changeData) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalParamSet {id: " + this.current().id() + "}");
                changeData.name = param.name();
                // add param name
                this.comm().signalParent("paramset", changeData, this.current().id());
            }
        },
        // Actions/Action Params
        signalActionAdded: function(action) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalActionAdded {id: " + this.current().id() + "}");
                var transport = action.toTransport();
                this.comm().signalParent("actionadded", transport, this.current().id());
            }
        },
        signalActionRemoved: function(actionName) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalActionRemoved {id: " + this.current().id() + "}");
                //var t = action.name();
                this.comm().signalParent("actionremoved", actionName, this.current().id());
            }
        },
        // changeData: { name: actionName, property: "enabled", value: val }
        signalActionChanged: function(action, changeData) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalActionChanged {id: " + this.current().id() + "}");
                changeData.name = action.name();
                // add action name
                this.comm().signalParent("actionchanged", changeData, this.current().id());
            }
        },
        // returnData: { name: actionName, returnValue: "enabled", value: val }
        signalActionInvoked: function(action, returnData) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalActionInvoked {id: " + this.current().id() + "}");
                //var transport = { name: action.name(), retu: argObj };
                returnData.name = action.name();
                this.comm().signalParent("actioninvoked", returnData, this.current().id());
            }
        },
        signalActionParamAdded: function(actionParam, actionName) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalActionParamAdded {id: " + this.current().id() + "}");
                var transport = actionParam.toTransport();
                transport.actionName = actionName;
                this.comm().signalParent("actionparamadded", transport, this.current().id());
            }
        },
        signalActionParamRemoved: function(actionParamName, actionName) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalActionParamRemoved {id: " + this.current().id() + "}");
                //var t = action.name();
                var transport = {
                    name: actionParamName,
                    actionName: actionName
                };
                this.comm().signalParent("actionparamremoved", transport, this.current().id());
            }
        },
        signalActionParamChanged: function(actionParam, action, changeData) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalActionParamChanged {id: " + this.current().id() + "}");
                changeData.name = actionParam.name();
                // add actionparam name
                changeData.actionName = action.name();
                // add actionparam name
                this.comm().signalParent("actionparamchanged", changeData, this.current().id());
            }
        },
        // Events
        signalEventAdded: function(eventDesc) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalEventAdded {id: " + this.current().id() + "}");
                var transport = eventDesc.toTransport();
                this.comm().signalParent("eventadded", transport, this.current().id());
            }
        },
        signalEventRemoved: function(eventDescName) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalEventRemoved {id: " + this.current().id() + "}");
                //var transport = eventDesc.name();
                this.comm().signalParent("eventremoved", eventDescName, this.current().id());
            }
        },
        signalEventChanged: function(eventDesc, changeData) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalEventChanged {id: " + this.current().id() + "}");
                changeData.name = eventDesc.name();
                // add event name
                this.comm().signalParent("eventchanged", changeData, this.current().id());
            }
        },
        signalEventTriggered: function(eventDesc, value) {
            if (this.connected()) {
                // no signaling if not connected
                Svidget.log("widget: signalEventTriggered {id: " + this.current().id() + "}");
                var transport = {
                    name: eventDesc.name(),
                    value: value
                };
                this.comm().signalParent("eventtriggered", transport, this.current().id());
            }
        },
        // payload == { id: widgetRef.id(), params: paramValues };
        handleReceiveParentStart: function(payload) {
            payload = payload || {};
            //this.current().start(payload.id, payload.params);
            // wire up data from parent
            var connected = false !== payload.connected;
            this.connectWidget(payload.id, payload.params, connected);
            // we default to connected, so if undefined then true
            // tell the parent that we got the start signal -  before we set anything on widget from parent
            connected && this.signalStartAck();
            // if widget already started, update param values with ones passed from page
            this.startWidgetWithPageParams();
        },
        handleReceiveParentPropertyChange: function(payload) {
            payload = payload || {};
            payload.type;
            // only support param.value for now
            if ("param" == payload.type && "value" == payload.propertyName && null != payload.name) {
                var param = this.current().param(payload.name);
                null != param && param.value(payload.value);
            }
        },
        // payload == { action: actionProxy.name(), args: argList }
        handleReceiveParentActionInvoke: function(payload) {
            payload = payload || {};
            var actionName = payload.action, action = this.current().action(actionName);
            null != action && action.external() && // todo: maybe send some fail message?
            action.invokeApply(payload.args);
        },
        handleReceiveParentEventTrigger: function(payload) {
            payload = payload || {};
            var eventName = payload.event, ev = this.current().event(eventName);
            null != ev && ev.external() && // todo: maybe send some fail message?
            ev.trigger(payload.data);
        }
    };
    // return the svidget root instance
    // note: svidget requires root to define window-like behavior like window.parent and window.addEventListener
    // svidget also requires a document property to be defined on root object
    // i.e. global.document
    // this can be jsdom or any DOM document implementation
    window.document || console.warn("svidget requires a global windowy object with window.document to work correctly.");
    return new Svidget.Root(window, createOptions);
});
