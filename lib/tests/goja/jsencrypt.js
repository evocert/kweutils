//does not seem to work in goja
//http://travistidwell.com/jsencrypt/
//https://github.com/travist/jsencrypt
//When browsing the internet looking for a good solution to RSA Javascript encryption, there is a whole slew of libraries that basically take the fantastic work done by Tom Wu @ http://www-cs-students.stanford.edu/~tjw/jsbn/ and then modify that code to do what they want.
//
//What I couldn't find, however, was a simple wrapper around this library that basically uses the library practically untouched, but adds a wrapper to provide parsing of actual Private and Public key-pairs generated with OpenSSL.
//
//This library is the result of these efforts.

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
	try{
		console.log('----------------------------------------');
		console.log([module.id,'start'].join(':'));
		//bootstrap globals
		window=_window;
		document=_document;
		this.window=window;
		this.document=window;
		require([
			"jsencrypt",
		],function(
			jsencrypt
		){
			console.log(cyclejs.decycle(jsencrypt));
			var value="lorem ipsum";
			var pubkey=
				"-----BEGIN PUBLIC KEY-----\n"+
				"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n"+
				"FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n"+
				"xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n"+
				"gwQco1KRMDSmXSMkDwIDAQAB\n"+
				"-----END PUBLIC KEY-----"
			;
			var privkey=
				"-----BEGIN RSA PRIVATE KEY-----\n"+
				"MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ\n"+
				"WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR\n"+
				"aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB\n"+
				"AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv\n"+
				"xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH\n"+
				"m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd\n"+
				"8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF\n"+
				"z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5\n"+
				"rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM\n"+
				"V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe\n"+
				"aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil\n"+
				"psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz\n"+
				"uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876\n"+
				"-----END RSA PRIVATE KEY-----"
			;
			// Encrypt with the public key...
			var encrypt=new jsencrypt.JSEncrypt();
			encrypt.setPublicKey(pubkey);
			var encrypted=encrypt.encrypt(value);
			//Decryptwiththeprivatekey...
			var decrypt=new jsencrypt.JSEncrypt();
			decrypt.setPrivateKey(privkey);
			var uncrypted=decrypt.decrypt(encrypted);
			console.log(encrypted);
			console.log(uncrypted);
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
