//JavaScript library of crypto standards.
//https://github.com/brix/crypto-js
//https://cryptojs.gitbook.io/docs/
//--------------------------------------------------------------------------------
//for mathjs:
//	https://github.com/josdejong/mathjs/issues/189
//	https://stackoverflow.com/questions/18990281/requirejs-ignore-loading-error-for-optional-dependency?lq=1
//	https://mathjs.org/history.html
//--------------------------------------------------------------------------------
define(
	[
	"module",
	"crypto-js"
],function(
	module,
	CryptoJS
){
	console.log([module.id,'start'].join(':'));
	//console.log(Tone);
	console.log(CryptoJS);
	console.log(CryptoJS.HmacSHA1("Message", "Key"));
});
