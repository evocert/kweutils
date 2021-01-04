//http://localhost:1030/kweutils/index.html?action=runtest&parameters=sjcl
//https://github.com/bitwiseshiftleft/sjcl/
//http://bitwiseshiftleft.github.io/sjcl/doc/
define([
	"module",
	"LoremIpsum",
	"sjcl",
],function(
	module,
	Lorem,
	sjcl
){
	console.log([module.id,'start'].join(':'));
	console.log(sjcl);
	function encrypt(params) {
		var iv = sjcl.random.randomWords(4, 0);
		var keyString = "2d73c1dd2f6a3c981afc7c0d49d7b58f";
		var key = sjcl.codec.base64.toBits(keyString);
		var cipher = new sjcl.cipher.aes(key);
		var data = sjcl.codec.utf8String.toBits(params);
		const enc = sjcl.mode.gcm.encrypt(cipher, data, iv, {}, 128);
		const concatbitArray = sjcl.bitArray.concat(iv, enc);
		const conString = sjcl.codec.base64.fromBits(concatbitArray);
		return conString;
	}
	function decrypt(content) {
		const bitArray = sjcl.codec.base64.toBits(content);
		const bitArrayCopy = bitArray.slice(0);
		const ivdec = bitArrayCopy.slice(0, 4);
		const encryptedBitArray = bitArray.slice(4);
		var key = sjcl.codec.base64.toBits("2d73c1dd2f6a3c981afc7c0d49d7b58f");
		let cipher = new sjcl.cipher.aes(key);
		const data = sjcl.mode.gcm.decrypt(cipher, encryptedBitArray, ivdec, {}, 128);
		const str = sjcl.codec.utf8String.fromBits(data);
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
