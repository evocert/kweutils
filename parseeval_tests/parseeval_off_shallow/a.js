
<@
println('a.js:start');
require.config({
	useParseEval:false
});
require([
	"./b.js"
],function(
	b
){
	println('a.js:cb');
});
println('a.js:end');
@>
