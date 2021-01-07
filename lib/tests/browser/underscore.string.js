//Javascript lacks complete string manipulation operations. This is an attempt to fill that gap. List of build-in methods can be found for example from Dive Into JavaScript. Originally started as an Underscore.js extension but is a full standalone library nowadays.
//
//Upgrading from 2.x to 3.x? Please read the changelog.
//https://github.com/esamattis/underscore.string
define([
	"module",
	"console",
	"decycle",
	"underscore.string",
],function(
	module,
	console,
	decycle,
	s
){
	console.log([module.id,'start'].join(':'));
	console.log(s);
	{//basic usage
		console.log(s.slugify("Hello world!"));
		console.log(s("   epeli  ").trim().capitalize().value());
		console.log(s.numberFormat(1000, 2));
		console.log(s.numberFormat(123456789.123, 5, ".", ","));
		console.log(s.levenshtein("kitten", "kittah"));
		console.log(s.capitalize("foo Bar"));
		console.log(s.capitalize("FOO Bar", true));
		console.log(s.decapitalize("Foo Bar"));
		console.log(s.chop("whitespace", 3));
		console.log(s.clean(" foo    bar   "));
		console.log(s.cleanDiacritics("ääkkönen"));
		console.log(s.chars("Hello"));
		console.log(s.swapCase("hELLO"));
		console.log(s.include("foobar", "ob"));
		console.log(s.count("Hello world", "l"));
		console.log(s.escapeHTML("<div>Blah blah blah</div>"));
		console.log(s.unescapeHTML("&lt;div&gt;Blah&nbsp;blah blah&lt;/div&gt;"));
		console.log(s.insert("Hellworld", 4, "o "));
		console.log(s.replaceAll("foo", "o", "a"));
		console.log(s.isBlank("")); // => true
		console.log(s.isBlank("\n")); // => true
		console.log(s.isBlank(" ")); // => true
		console.log(s.isBlank("a")); // => false
		console.log(s.join(" ", "foo", "bar"));
		console.log(s.lines("Hello\nWorld"));
		console.log(s.wrap("Hello World", { width:5 }));// => "Hello\nWorld"
		console.log(s.wrap("Hello World", { width:6, seperator:'.', trailingSpaces: true }));// => "Hello .World "
		console.log(s.wrap("Hello World", { width:5, seperator:'.', cut:true, trailingSpaces: true }));// => "Hello. Worl.d    "
		console.log(s.wrap("Hello World", { width:5, seperator:'.', preserveSpaces: true }));// => "Hello .World"
		console.log(s.dedent("  Hello\n    World"));// => "Hello\n  World"
		console.log(s.dedent("\t\tHello\n\t\t\t\tWorld"));// => "Hello\n\t\tWorld"
		console.log(s.dedent("    Hello\n    World", "  ")); // Dedent by 2 spaces // => "  Hello\n  World"
		console.log(s.reverse("foobar"));
		console.log(s.startsWith("image.gif", "image"));// => true
		console.log(s.startsWith(".vimrc", "vim", 1));// => true
		console.log(s.endsWith("image.gif", "gif"));// => true
		console.log(s.endsWith("image.old.gif", "old", 9));// => true
		console.log(s.pred("b"));// => "a"
		console.log(s.pred("B"));// => "A"
		console.log(s.succ("a"));// => "b"
		console.log(s.succ("A"));// => "B"
		console.log(s.titleize("my name is epeli"));// => "My Name Is Epeli"
		console.log(s.camelize("moz-transform"));// => "mozTransform"
		console.log(s.camelize("-moz-transform"));// => "MozTransform"
		console.log(s.camelize("_moz_transform"));// => "MozTransform"
		console.log(s.camelize("Moz-transform"));// => "MozTransform"
		console.log(s.camelize("-moz-transform", true));// => "mozTransform"
		console.log(s.classify("some_class_name"));// => "SomeClassName"
		console.log(s.underscored("MozTransform"));// => "moz_transform"
		console.log(s.dasherize("MozTransform"));// => "-moz-transform"
		console.log(s.humanize("  capitalize dash-CamelCase_underscore trim  "));// => "Capitalize dash camel case underscore trim"
		console.log(s.trim("  foobar   "));// => "foobar"
		console.log(s.ltrim("  foobar  "));// => "  foobar"
		console.log(s.rtrim("  foobar  "));// => "foobar  "
		console.log(s.truncate("Hello world", 5));// => "Hello..."
		console.log(s.truncate("Hello", 10));// => "Hello"
		console.log(s.prune("Hello, world", 5));// => "Hello..."
		console.log(s.prune("Hello, world", 8));// => "Hello..."
		console.log(s.prune("Hello, world", 5, " (read a lot more)"));// => "Hello, world" (as adding "(read a lot more)" would be longer than the original string)
		console.log(s.prune("Hello, cruel world", 15));// => "Hello, cruel..."
		console.log(s.prune("Hello", 10));// => "Hello"
		console.log(s.words("   I   love   you   "));// => ["I", "love", "you"]
		console.log(s.words("I_love_you", "_"));// => ["I", "love", "you"]
		console.log(s.words("I-love-you", /-/));// => ["I", "love", "you"]
		console.log(s.words("   "));// => []
		console.log(s.sprintf("%.1f", 1.17));// => "1.2"
		console.log(s.pad("1", 8));// => "       1"
		console.log(s.pad("1", 8, "0"));// => "00000001"
		console.log(s.pad("1", 8, "0", "right"));// => "10000000"
		console.log(s.pad("1", 8, "0", "both"));// => "00001000"
		console.log(s.pad("1", 8, "bleepblorp", "both"));// => "bbbb1bbb"
		console.log(s.lpad("1", 8, "0"));// => "00000001"
		console.log(s.rpad("1", 8, "0"));// => "10000000"
		console.log(s.lrpad("1", 8, '0'));// => "00001000"
		console.log(s.toNumber("2.556"));// => 3
		console.log(s.toNumber("2.556", 1));// => 2.6
		console.log(s.toNumber("999.999", -1));// => 990
		console.log(s.strRight("This_is_a_test_string", "_"));// => "is_a_test_string"
		console.log(s.strRightBack("This_is_a_test_string", "_"));// => "string"
		console.log(s.strLeft("This_is_a_test_string", "_"));// => "This";
		console.log(s.strLeftBack("This_is_a_test_string", "_"));// => "This_is_a_test";
		console.log(s.stripTags("a <a href=\"#\">link</a>"));// => "a link"
		console.log(s.stripTags("a <a href=\"#\">link</a><script>alert(\"hello world!\")</script>"));// => "a linkalert("hello world!")"
		console.log(s.toSentence(["jQuery", "Mootools", "Prototype"]));// => "jQuery, Mootools and Prototype";
		console.log(s.toSentence(["jQuery", "Mootools", "Prototype"], ", ", " unt "));// => "jQuery, Mootools unt Prototype";
		console.log(s.toSentenceSerial(["jQuery", "Mootools"]));// => "jQuery and Mootools"
		console.log(s.toSentenceSerial(["jQuery", "Mootools", "Prototype"]));// => "jQuery, Mootools, and Prototype"
		console.log(s.toSentenceSerial(["jQuery", "Mootools", "Prototype"], ", ", " unt "));// => "jQuery, Mootools, unt Prototype"
		console.log(s.repeat("foo", 3));// => "foofoofoo"
		console.log(s.repeat("foo", 3, "bar"));// => "foobarfoobarfoo"
		console.log(s.surround("foo", "ab"));// => "abfooab"
		console.log(s.quote("foo", '"'));// => '"foo"';
		console.log(s.unquote('"foo"'));// => "foo"
		console.log(s.unquote("'foo'", "'"));// => "foo"
		console.log(s.slugify("Un éléphant à l\'orée du bois"));// => "un-elephant-a-l-oree-du-bois"
		//console.log(s.["foo20", "foo5"].sort(naturalCmp));// => ["foo5", "foo20"]
		console.log(s.toBoolean("true"));// => true
		console.log(s.toBoolean("FALSE"));// => false
		console.log(s.toBoolean("random"));// => undefined
		console.log(s.toBoolean("truthy", ["truthy"], ["falsy"]));// => true
		console.log(s.toBoolean("true only at start", [/^true/]));// => true
		console.log(s.map("Hello world", function(x) {return x;}));// => "Hello world"
		console.log(s.map(12345, function(x) {return x;}));// => "12345"
		console.log(s.map("Hello world", function(x) {if (x === 'o') x = 'O';return x;}));// => "HellO wOrld"
	}
});
