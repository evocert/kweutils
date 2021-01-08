//JavaScript library of crypto standards.
//https://github.com/brix/crypto-js
//https://cryptojs.gitbook.io/docs/
//https://stackoverflow.com/questions/51005488/how-to-use-cryptojs-in-javascript
//goja issues: Error: Native crypto module could not be used to get secure random number.
//	In this version Math.random() has been replaced by the random methods of the native crypto module.
//	For this reason CryptoJS might does not run in some JavaScript environments without native crypto module. Such as IE 10 or before.
//	If it's absolute required to run CryptoJS in such an environment, stay with 3.1.x version. Encrypting and decrypting stays compatible. But keep in mind 3.1.x versions still use Math.random() which is cryptographically not secure, as it's not random enough.
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
