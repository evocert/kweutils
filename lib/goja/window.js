define('window',[
	"vendor/domino/index"
	//"vendor/domino/blocks/domino"
],function(
	domino
){
	console.Log("goja:window");
	//return domino.createWindow('');
	return domino.createWindow('<div></div>', 'http://example.com');
})
