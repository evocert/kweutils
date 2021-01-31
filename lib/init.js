require([
	"lib/config.js?cachebust="+new Date().getTime()
],function(){
	require(["app/main"],function(){});
});
