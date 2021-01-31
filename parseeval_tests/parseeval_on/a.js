
<@
println('a.js:start');
require.config({
	useParseEval:true
});
require([
	"./b.js"
	//"/kweutils/parseeval_toets2/b.js"
],function(
	b
){
	println('a.js:cb');
});
println('a.js:end');
@>
