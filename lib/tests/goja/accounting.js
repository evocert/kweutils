//accounting.js is a tiny JavaScript library for number, money and currency parsing/formatting. It's lightweight, fully localisable, has no dependencies, and works great client-side or server-side. Use standalone or as a nodeJS/npm and AMD/requireJS module.
//Visit the plugin homepage for demos and documentation: http://openexchangerates.github.io/accounting.js/
//https://github.com/openexchangerates/accounting.js
//http://openexchangerates.github.io/accounting.js/
define([
	"module",
	"console",
	"cyclejs",
	"accountingjs",
],function(
	module,
	console,
	cyclejs,
	accounting
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(accounting));
	{//basic usage
		// Default usage:
		console.log(accounting.formatMoney(12345678)); // $12,345,678.00
		// European formatting (custom symbol and separators), can also use options object as second parameter:
		console.log(accounting.formatMoney(4999.99, "€", 2, ".", ",")); // €4.999,99
		// Negative values can be formatted nicely:
		console.log(accounting.formatMoney(-500000, "£ ", 0)); // £ -500,000
		// Simple `format` string allows control of symbol position (%v = value, %s = symbol):
		console.log(accounting.formatMoney(5318008, { symbol: "GBP",  format: "%v %s" })); // 5,318,008.00 GBP
	}
	{//configuration
		// Settings object that controls default parameters for library methods:
		accounting.settings = {
			currency: {
				symbol : "$",   // default currency symbol is '$'
				format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal : ".",  // decimal point separator
				thousand: ",",  // thousands separator
				precision : 2   // decimal places
			},
			number: {
				precision : 0,  // default precision on numbers is 0
				thousand: ",",
				decimal : "."
			}
		}

		// These can be changed externally to edit the library's defaults:
		accounting.settings.currency.format = "%s %v";

		// Format can be an object, with `pos`, `neg` and `zero`:
		accounting.settings.currency.format = {
			pos : "%s %v",   // for positive values, eg. "$ 1.00" (required)
			neg : "%s (%v)", // for negative values, eg. "$ (1.00)" [optional]
			zero: "%s  -- "  // for zero values, eg. "$  --" [optional]
		};
	}
	{//format money
		// Standard usage and parameters (returns string):
		//accounting.formatMoney(number,[symbol = "$"],[precision = 2],[thousand = ","],[decimal = "."],[format = "%s%v"])

		// Second parameter can be an object:
		//accounting.formatMoney(number, [options])

		// Available fields in options object, matching `settings.currency`:
		var options = {
			symbol : "$",
			decimal : ".",
			thousand: ",",
			precision : 2,
			format: "%s%v"
		};

		// Example usage:
		console.log(cyclejs.decycle(accounting.formatMoney(12345678))); // $12,345,678.00
		console.log(cyclejs.decycle(accounting.formatMoney(4999.99, "€", 2, ".", ","))); // €4.999,99
		console.log(cyclejs.decycle(accounting.formatMoney(-500000, "£ ", 0))); // £ -500,000

		// Example usage with options object:
		console.log(cyclejs.decycle(accounting.formatMoney(5318008, {
			symbol: "GBP",
			precision: 0,
			thousand: "·",
			format: {
				pos : "%s %v",
				neg : "%s (%v)",
				zero: "%s  --"
			}
		})));

		// Will recursively format an array of values:
		console.log(cyclejs.decycle(accounting.formatMoney([123, 456, [78, 9]], "$", 0))); // ["$123", "$456", ["$78", "$9"]]
	}
	{//format column
		// Standard usage and parameters (returns array):
		//accounting.formatColumn(list, [symbol = "$"],[precision = 2],[thousand = ","],[decimal = "."],[format = "%s%v"])

		// Second parameter can be an object (see formatNumber for available options):
		//accounting.formatColumn(list, [options])

		// Example usage (NB. use a space after the symbol to add arbitrary padding to all values):
		var list = [123, 12345];
		console.log(cyclejs.decycle(accounting.formatColumn(list, "$ ", 0))); // ["$    123", "$ 12,345"]

		// List of numbers can be a multi-dimensional array (formatColumn is applied recursively):
		var list = [[1, 100], [900, 9]];
		console.log(cyclejs.decycle(accounting.formatColumn(list))); // [["$  1.00", "$100.00"], ["$900.00", "$  9.00"]]
	}
	{//unformat
		// Standard usage and parameters (returns number):
		//accounting.unformat(string, [decimal]);

		// Example usage:
		console.log(cyclejs.decycle(accounting.unformat("GBP £ 12,345,678.90"))); // 12345678.9

		// If a non-standard decimal separator was used (eg. a comma) unformat() will need it in order to work out
		// which part of the number is a decimal/float:
		console.log(cyclejs.decycle(accounting.unformat("€ 1.000.000,00", ","))); // 1000000
	}
});
