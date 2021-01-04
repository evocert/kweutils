//http://localhost:1030/kweutils/index.html?action=runtest&parameters=sjcl
//https://github.com/bitwiseshiftleft/sjcl/
//http://bitwiseshiftleft.github.io/sjcl/doc/
//example usage
//https://runkit.com/harshbhanot24/5e42710ba806fa001ad38920
define([
	"module",
	"console",
	"cyclejs",
	"window",
	"document",
],function(
	module,
	console,
	cyclejs,
	_window,
	_document
){
	console.log([module.id,'start'].join(':'));
	try{
		window=_window;
		document=_document;
		require([
			"module",
			"console",
			"LoremIpsum",
			"sjcl",
		],function(
			module,
			console,
			Lorem,
			sjcl
		){
			console.log(cyclejs.decycle(sjcl));
			function encrypt(params) {
				var iv=sjcl.random.randomWords(4,0);
				var keyString="2d73c1dd2f6a3c981afc7c0d49d7b58f";
				var key=sjcl.codec.base64.toBits(keyString);
				var cipher=newsjcl.cipher.aes(key);
				var data=sjcl.codec.utf8String.toBits(params);
				var enc=sjcl.mode.gcm.encrypt(cipher,data,iv,{},128);
				var concatbitArray=sjcl.bitArray.concat(iv,enc);
				var conString=sjcl.codec.base64.fromBits(concatbitArray);
				return conString;
			}
			function decrypt(content) {
				var bitArray=sjcl.codec.base64.toBits(content);
				var bitArrayCopy=bitArray.slice(0);
				var ivdec=bitArrayCopy.slice(0,4);
				var encryptedBitArray=bitArray.slice(4);
				var key=sjcl.codec.base64.toBits("2d73c1dd2f6a3c981afc7c0d49d7b58f");
				var cipher=newsjcl.cipher.aes(key);
				var data=sjcl.mode.gcm.decrypt(cipher,encryptedBitArray,ivdec,{},128);
				var str=sjcl.codec.utf8String.fromBits(data);
				return str;
			}
			var lorem=new Lorem();
			var msg=lorem.paragraph(128)
			var msgenc=encrypt(msg)
			var msgdec=decrypt(msgenc)
			console.log(msg);
			console.log(msgenc);
			console.log(msgdec);
		});
		this.window=window;
		this.document=window;
	}catch(e){console.error(e.toString());}
});

