//https://github.com/digitalbazaar/forge
//amd modifications made to all vendor/forge/0.10.0_amd/*.js
define([
	"module",
	//"forge",
	"vendor/forge/0.10.0_amd/index"
],function(
	module,
	forge
){
	console.log([module.id,'start'].join(':'));
	console.log(forge);
	{
		forge.options.usePureJavaScript=true;
		//test
		var someBytes="asdf";
		// generate a random key and IV
		// Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
		var key = forge.random.getBytesSync(16);
		var iv = forge.random.getBytesSync(16);

		/* alternatively, generate a password-based 16-byte key
		var salt = forge.random.getBytesSync(128);
		var key = forge.pkcs5.pbkdf2('password', salt, numIterations, 16);
		*/

		// encrypt some bytes using CBC mode
		// (other modes include: ECB, CFB, OFB, CTR, and GCM)
		// Note: CBC and ECB modes use PKCS#7 padding as default
		var cipher = forge.cipher.createCipher('AES-CBC', key);
		cipher.start({iv: iv});
		cipher.update(forge.util.createBuffer(someBytes));
		cipher.finish();
		var encrypted = cipher.output;
		// outputs encrypted hex
		console.log(encrypted.toHex());

		// decrypt some bytes using CBC mode
		// (other modes include: CFB, OFB, CTR, and GCM)
		var decipher = forge.cipher.createDecipher('AES-CBC', key);
		decipher.start({iv: iv});
		decipher.update(encrypted);
		var result = decipher.finish(); // check 'result' for true/false
		// outputs decrypted hex
		console.log(decipher.output.toHex());

		// decrypt bytes using CBC mode and streaming
		// Performance can suffer for large multi-MB inputs due to buffer
		// manipulations. Stream processing in chunks can offer significant
		// improvement. CPU intensive update() calls could also be performed with
		// setImmediate/setTimeout to avoid blocking the main browser UI thread (not
		// shown here). Optimal block size depends on the JavaScript VM and other
		// factors. Encryption can use a simple technique for increased performance.
		var encryptedBytes = encrypted.bytes();
		var decipher = forge.cipher.createDecipher('AES-CBC', key);
		decipher.start({iv: iv});
		var length = encryptedBytes.length;
		var chunkSize = 1024 * 64;
		var index = 0;
		var decrypted = '';
		do {
			decrypted += decipher.output.getBytes();
			var buf = forge.util.createBuffer(encryptedBytes.substr(index, chunkSize));
			decipher.update(buf);
			index += chunkSize;
		} while(index < length);
		var result = decipher.finish();
		//assert(result);
		decrypted += decipher.output.getBytes();
		console.log(forge.util.bytesToHex(decrypted));

		// encrypt some bytes using GCM mode
		var cipher = forge.cipher.createCipher('AES-GCM', key);
		cipher.start({
			iv: iv, // should be a 12-byte binary-encoded string or byte buffer
			additionalData: 'binary-encoded string', // optional
			tagLength: 128 // optional, defaults to 128 bits
		});
		cipher.update(forge.util.createBuffer(someBytes));
		cipher.finish();
		var encrypted = cipher.output;
		var tag = cipher.mode.tag;
		// outputs encrypted hex
		console.log(encrypted.toHex());
		// outputs authentication tag
		console.log(tag.toHex());

		// decrypt some bytes using GCM mode
		var decipher = forge.cipher.createDecipher('AES-GCM', key);
		decipher.start({
			iv: iv,
			additionalData: 'binary-encoded string', // optional
			tagLength: 128, // optional, defaults to 128 bits
			tag: tag // authentication tag from encryption
		});
		decipher.update(encrypted);
		var pass = decipher.finish();
		// pass is false if there was a failure (eg: authentication tag didn't match)
		if(pass) {
			// outputs decrypted hex
			console.log(decipher.output.toHex());
		}
	}
	{//rc2
		console.log("rc2:");
		// generate a random key and IV
		var key = forge.random.getBytesSync(16);
		var iv = forge.random.getBytesSync(8);

		// encrypt some bytes
		var cipher = forge.rc2.createEncryptionCipher(key);
		cipher.start(iv);
		cipher.update(forge.util.createBuffer(someBytes));
		cipher.finish();
		var encrypted = cipher.output;
		// outputs encrypted hex
		console.log(encrypted.toHex());

		// decrypt some bytes
		var cipher = forge.rc2.createDecryptionCipher(key);
		cipher.start(iv);
		cipher.update(encrypted);
		cipher.finish();
		// outputs decrypted hex
		console.log(cipher.output.toHex());
	}
});
