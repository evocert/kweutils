define(['module','./lib/a.js','./lib/b.js','./lib/foo/c.js','jquery'],function(module,a,b,c,jq){
	console.log(module.id);
	console.log(a);
	console.log(b);
	console.log(c);
	console.log(jq);
});
