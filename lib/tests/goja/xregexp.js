//https://github.com/slevithan/xregexp/
//XRegExp provides augmented (and extensible) JavaScript regular expressions. You get modern syntax and flags beyond what browsers support natively. XRegExp is also a regex utility belt with tools to make your grepping and parsing easier, while freeing you from regex cross-browser inconsistencies and other annoyances.
//
//XRegExp supports all native ES6 regular expression syntax. It supports ES5+ browsers, and you can use it with Node.js or as a RequireJS module.
define([
	"module",
	"console",
	"xregexp",
],function(
	module,
	console,
	XRegExp
){
	console.log([module.id,'start'].join(':'));
	console.log(typeof(XRegExp));
	{
		// Using named capture and flag x for free-spacing and line comments
		var date = XRegExp(
		    "(?<year>  [0-9]{4} ) -?  # year\n"+
		    "(?<month> [0-9]{2} ) -?  # month\n"+
		    "(?<day>   [0-9]{2} )     # day", 'x');
		// XRegExp.exec gives you named backreferences on the match result
		var match = XRegExp.exec('2017-02-22', date);
		match.year; // -> '2017'

		// It also includes optional pos and sticky arguments
		var pos = 3;
		var result = [];
		while (match = XRegExp.exec('<1><2><3>4<5>', /<(\d+)>/, pos, 'sticky')) {
		    result.push(match[1]);
		    pos = match.index + match[0].length;
		}
		console.log(result);
		// result -> ['2', '3']

		// XRegExp.replace allows named backreferences in replacements
		console.log(XRegExp.replace('2017-02-22', date, '$<month>/$<day>/$<year>'));
		// -> '02/22/2017'
		console.log(
			XRegExp.replace('2017-02-22', date, function(match){
			    return match.month+"/"+match.day+"/"+match.year;
			})
		)
		// -> '02/22/2017'

		// XRegExps compile to RegExps and work perfectly with native methods
		console.log(date.test('2017-02-22'));
		// -> true

		// The only caveat is that named captures must be referenced using
		// numbered backreferences if used with native methods
		console.log('2017-02-22'.replace(date, '$2/$3/$1'));
		// -> '02/22/2017'

		// Use XRegExp.forEach to extract every other digit from a string
		var evens = [];
		XRegExp.forEach('1a2345', /\d/,function(match, i){
		    if (i % 2) evens.push(+match[0]);
		});
		console.log(evens);
		// evens -> [2, 4]

		// Use XRegExp.matchChain to get numbers within <b> tags
		console.log(
			XRegExp.matchChain('1 <b>2</b> 3 <B>4 \n 56</B>', [
			    XRegExp('(?is)<b>.*?</b>'),
			    /\d+/
			])
		);
		// -> ['2', '4', '56']

		// You can also pass forward and return specific backreferences
		var html =
		    '<a href="http://xregexp.com/">XRegExp</a>\n'+
		    '<a href="http://www.google.com/">Google</a>';
		console.log(
			XRegExp.matchChain(html, [
			    {regex: /<a href="([^"]+)">/i, backref: 1},
			    {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
			])
		)
		// -> ['xregexp.com', 'www.google.com']

		// Merge strings and regexes, with updated backreferences
		console.log(
			XRegExp.union(['m+a*n', /(bear)\1/, /(pig)\1/], 'i', {conjunction: 'or'})
		)
		// -> /m\+a\*n|(bear)\1|(pig)\2/i
	}
});
