//date-fns provides the most comprehensive, yet simple and consistent toolset
//for manipulating JavaScript dates in a browser & Node.js. 
//
//It's like Lodash for dates
//It has 180+ functions for all occasions.
//Modular: Pick what you need. Works with webpack, Browserify, or Rollup and also supports tree-shaking.
//Native dates: Uses existing native type. It doesn't extend core objects for safety's sake.
//Immutable & Pure: Built using pure functions and always returns a new date instance.
//TypeScript & Flow: Supports both Flow and TypeScript
//I18n: Dozens of locales. Include only what you need.
//and many more benefits
//https://github.com/date-fns/date-fns
define([
	"module",
	"console",
	"cyclejs",
	"date-fns",
],function(
	module,
	console,
	cyclejs,
	dateFns
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(dateFns));
	{//basic usage
		compareAsc=dateFns.compareAsc;
		format=dateFns.format;

		format(new Date(2014, 1, 11), 'yyyy-MM-dd')
		//=> '2014-02-11'

		var/*const*/ dates = [
		  new Date(1995, 6, 2),
		  new Date(1987, 1, 11),
		  new Date(1989, 6, 10),
		]
		dates.sort(compareAsc)
		console.log(dates);
		//=> [
		//   Wed Feb 11 1987 00:00:00,
		//   Mon Jul 10 1989 00:00:00,
		//   Sun Jul 02 1995 00:00:00
		// ]
	}
});
