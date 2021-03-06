//1894 bytes of minified code. Supports heading, paragraphs, code, lists, horizontal rules, bold/italic/del, links and images.
//https://github.com/Holixus/nano-markdown
define([
	"module",
	"nanomd",
],function(
	module,
	nmd
){
	console.log([module.id,'start'].join(':'));
	console.log(nmd);
	{//basic usage
		console.log(nmd('test'));
		// <p>test</p>

		// customizable links
		nmd.href = function (ref) {
			switch (ref.charAt(0)) {
			case '#':
				return '/case/'+ref.substr(1);
			case '@':
				return '/commit/'+ref.substr(1);
			}
			return ref;
		};

		console.log(nmd('test\n* [case #44](#44)\n* [commit 750945c](@750945c)'));
		// <p>test</p>\n<ul><li><a href='/case/44'>case #44</a></li><li><a href='/commit/750945c'>commit 750945c</a></li></ul>

		// customizable headers attributes
		nmd.headAttrs = function (level, text) {
			return ' id=\''+text.replace(/[^a-z0-9]/ig, '_').replace(/_{2,}/g, '_').replace(/^_*(.*?)_*$/, '$1').toLowerCase()+'\'';
		};

		console.log(nmd('# Header text'));
		// <h1 id='header_text'>Header text</h1>
	}
});
