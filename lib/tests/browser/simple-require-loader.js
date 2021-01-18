//A simple, dynamic, powerful module loader with hot swapping and optional remote loading support.
//Build Status
//This is a simple JS loader that can dynamically load files as well as support multiple modules within a single file. It also supports hot swapping. This plus its 528-byte minified+gzipped size makes it a pretty nice solution for a simple module system if you need one. Also, it's one of the smallest module loaders I know of, yet compares feature-wise to ones over 3 times its size (1.5+ kilobytes).
//Features
//Concise syntax
//Namespaced modules with optional default exports
//Hot swapping and introspection
//Lazy, synchronous instantiation
//Optional asynchronous, dynamic remote loading support
//Node-like cyclic dependency handling
//Very small (528 bytes minified + gzipped, 340 without remote loading support)
//Fully supports both browsers and workers (and shells, but without remote loading support)
//Easy bundling with concatenation or whatever else you like
//Thoroughly tested
//https://github.com/isiahmeadows/simple-require-loader
//note: fix demo
define([
	"module",
	"simple-require-loader",
],function(
	module,
	r
){
	console.log([module.id,'start'].join(':'));
	console.log(r);
	{//basic usage
		var remaining = 2

		r.load("/jquery.min.js", function (err) {
			if (err) return console.error(err)
			r.module("jquery", $.noConflict())
			if (--remaining) r.require("main")
		})

		r.load("/lodash.min.js", function (err) {
			if (err) return console.error(err)
			r.module("lodash", _.noConflict())
			if (--remaining) r.require("main")
		})

		// Define a few modules - not loaded yet!
		r.define("foo", function () { return "default export" })
		r.define("bar", function (exports) { exports.named = "named export" })

		r.define("assert", function () {
			return function assert(condition, message) {
				if (!condition) throw new Error(message)
			}
		})

		// Define our main module
		r.define("main", function () {
			// Load an `assert` module
			var assert = r.require("assert")
			var $ = r.require("jquery")
			var _ = r.require("lodash")

			// And use its export
			assert(r.require("foo") === "default export",
				"default exports are read correctly")

			assert(_.matches(r.require("bar"), {named: "named export"}),
				"named exports are read correctly")

			// Load a remote module and immediately use it
			r.load("page/base", "/page.js", function (err, BaseComponent) {
				if (err != null) return displayError(err)
				renderComponent($("#body").get(0), BaseComponent)
			})

			// Hot-swap an existing module
			r.unload("assert")
			r.define("assert", function () {
				return function assert() {
					return true
				}
			})

			// Hot-unload an existing module
			r.unload("bad-module")
		})
	}
});
