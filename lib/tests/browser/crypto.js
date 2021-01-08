//JavaScript library of crypto standards.
//https://github.com/brix/crypto-js
//https://cryptojs.gitbook.io/docs/
//https://stackoverflow.com/questions/51005488/how-to-use-cryptojs-in-javascript
//--------------------------------------------------------------------------------
//for mathjs:
//	https://github.com/josdejong/mathjs/issues/189
//	https://stackoverflow.com/questions/18990281/requirejs-ignore-loading-error-for-optional-dependency?lq=1
//	https://mathjs.org/history.html
//--------------------------------------------------------------------------------
define([
	"module",
	"console",
	"cyclejs",
	"crypto"//all
	//"vendor/cryptojs/bower_components/crypto-js/aes"//seperate
],function(
	module,
	console,
	cyclejs,
	CryptoJS//all
	//aes//seperate
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(CryptoJS));
	{//basic usage
		console.log(CryptoJS.HmacSHA1("Message", "Key"));
		//console.log(aes);//seperate
	}
	{//aesencryption
		//Encrypt
		var ciphertext=CryptoJS.AES.encrypt('mymessage','secretkey123').toString();
		//Decrypt
		var bytes=CryptoJS.AES.decrypt(ciphertext,'secretkey123');
		var originalText=bytes.toString(CryptoJS.enc.Utf8);
		console.log(originalText);//'mymessage'
	}
	{//objectencryption
		var data=[{id:1},{id:2}]
		//Encrypt
		var ciphertext=CryptoJS.AES.encrypt(JSON.stringify(data),'secretkey123').toString();
		//Decrypt
		var bytes=CryptoJS.AES.decrypt(ciphertext,'secretkey123');
		var decryptedData=JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		console.log(decryptedData);//[{id:1},{id:2}]
	}
});
