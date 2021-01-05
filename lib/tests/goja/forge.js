//https://github.com/digitalbazaar/forge
// amd modifications made to all vendor/forge/0.10.0_amd/*.js
define([
	"module",
	"console",
	"window",
	"document",
],function(
	module,
	console,
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
		//require(["forge"],function(forge){
		//require([],function(){
		//require(["vendor/forge/0.10.0_amd/index"],function(forge){
		//require(["vendor/forge/0.10.0_amd/index.amd"],function(forge){
		require(["forge"],function(forge){
		//require(["forge"],function(forge){
			try{
				//forge.options.usePureJavaScript=true;
				//test
				var someBytes="asdf";
				// generate a random key and IV
				// Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
				var key = forge.random.getBytesSync(16);
				var iv = forge.random.getBytesSync(16);

				// alternatively, generate a password-based 16-byte key
				//var salt = forge.random.getBytesSync(128);
				//var key = forge.pkcs5.pbkdf2('password', salt, numIterations, 16);

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
			}catch(e){console.error(e.toString());}
			try{//rc2
				console.log("RC2");
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
			}catch(e){console.error(e.toString());}
			try{//ED25519
				console.log("ED25519");
				throw "skip";
				console.log(typeof(forge.pki));
				console.log(typeof(forge.pki.ed25519));
				var ed25519 = forge.pki.ed25519;

				// generate a random ED25519 keypair
				var keypair = ed25519.generateKeyPair();
				// `keypair.publicKey` is a node.js Buffer or Uint8Array
				// `keypair.privateKey` is a node.js Buffer or Uint8Array

				// generate a random ED25519 keypair based on a random 32-byte seed
				var seed = forge.random.getBytesSync(32);
				var keypair = ed25519.generateKeyPair({seed: seed});

				// generate a random ED25519 keypair based on a "password" 32-byte seed
				var password = 'Mai9ohgh6ahxee0jutheew0pungoozil';
				var seed = new forge.util.ByteBuffer(password, 'utf8');
				var keypair = ed25519.generateKeyPair({seed: seed});

				// sign a UTF-8 message
				var signature = ED25519.sign({
				  message: 'test',
				  // also accepts `binary` if you want to pass a binary string
				  encoding: 'utf8',
				  // node.js Buffer, Uint8Array, forge ByteBuffer, binary string
				  privateKey: privateKey
				});
				// `signature` is a node.js Buffer or Uint8Array

				// sign a message passed as a buffer
				var signature = ED25519.sign({
				  // also accepts a forge ByteBuffer or Uint8Array
				  message: Buffer.from('test', 'utf8'),
				  privateKey: privateKey
				});

				// sign a message digest (shorter "message" == better performance)
				var md = forge.md.sha256.create();
				md.update('test', 'utf8');
				var signature = ED25519.sign({
				  md: md,
				  privateKey: privateKey
				});

				// verify a signature on a UTF-8 message
				var verified = ED25519.verify({
				  message: 'test',
				  encoding: 'utf8',
				  // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
				  signature: signature,
				  // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
				  publicKey: publicKey
				});
				// `verified` is true/false

				// sign a message passed as a buffer
				var verified = ED25519.verify({
				  // also accepts a forge ByteBuffer or Uint8Array
				  message: Buffer.from('test', 'utf8'),
				  // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
				  signature: signature,
				  // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
				  publicKey: publicKey
				});

				// verify a signature on a message digest
				var md = forge.md.sha256.create();
				md.update('test', 'utf8');
				var verified = ED25519.verify({
				  md: md,
				  // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
				  signature: signature,
				  // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
				  publicKey: publicKey
				});
			}catch(e){console.error(e.toString());}
			try{//rsa
				console.log("RSA");
				throw 'skip';
				var rsa = forge.pki.rsa;

				// generate an RSA key pair synchronously
				// *NOT RECOMMENDED*: Can be significantly slower than async and may block
				// JavaScript execution. Will use native Node.js 10.12.0+ API if possible.
				var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});

				// generate an RSA key pair asynchronously (uses web workers if available)
				// use workers: -1 to run a fast core estimator to optimize # of workers
				// *RECOMMENDED*: Can be significantly faster than sync. Will use native
				// Node.js 10.12.0+ or WebCrypto API if possible.
				rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
					// keypair.privateKey, keypair.publicKey
				});

				// generate an RSA key pair in steps that attempt to run for a specified period
				// of time on the main JS thread
				var state = rsa.createKeyPairGenerationState(2048, 0x10001);
				var step = function() {
					// run for 100 ms
					if(!rsa.stepKeyPairGenerationState(state, 100)) {
						setTimeout(step, 1);
					}
					else {
						// done, turn off progress indicator, use state.keys
					}
				};
				// turn on progress indicator, schedule generation to run
				setTimeout(step);

				// sign data with a private key and output DigestInfo DER-encoded bytes
				// (defaults to RSASSA PKCS#1 v1.5)
				var md = forge.md.sha1.create();
				md.update('sign this', 'utf8');
				var signature = privateKey.sign(md);

				// verify data with a public key
				// (defaults to RSASSA PKCS#1 v1.5)
				var verified = publicKey.verify(md.digest().bytes(), signature);

				// sign data using RSASSA-PSS where PSS uses a SHA-1 hash, a SHA-1 based
				// masking function MGF1, and a 20 byte salt
				var md = forge.md.sha1.create();
				md.update('sign this', 'utf8');
				var pss = forge.pss.create({
					md: forge.md.sha1.create(),
					mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
					saltLength: 20
					// optionally pass 'prng' with a custom PRNG implementation
					// optionalls pass 'salt' with a forge.util.ByteBuffer w/custom salt
				});
				var signature = privateKey.sign(md, pss);

				// verify RSASSA-PSS signature
				var pss = forge.pss.create({
					md: forge.md.sha1.create(),
					mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
					saltLength: 20
					// optionally pass 'prng' with a custom PRNG implementation
				});
				var md = forge.md.sha1.create();
				md.update('sign this', 'utf8');
				publicKey.verify(md.digest().getBytes(), signature, pss);

				// encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
				var encrypted = publicKey.encrypt(bytes);

				// decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
				var decrypted = privateKey.decrypt(encrypted);

				// encrypt data with a public key using RSAES PKCS#1 v1.5
				var encrypted = publicKey.encrypt(bytes, 'RSAES-PKCS1-V1_5');

				// decrypt data with a private key using RSAES PKCS#1 v1.5
				var decrypted = privateKey.decrypt(encrypted, 'RSAES-PKCS1-V1_5');

				// encrypt data with a public key using RSAES-OAEP
				var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP');

				// decrypt data with a private key using RSAES-OAEP
				var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP');

				// encrypt data with a public key using RSAES-OAEP/SHA-256
				var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
					md: forge.md.sha256.create()
				});

				// decrypt data with a private key using RSAES-OAEP/SHA-256
				var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
					md: forge.md.sha256.create()
				});

				// encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1
				// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
				var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
					md: forge.md.sha256.create(),
					mgf1: {
						md: forge.md.sha1.create()
					}
				});

				// decrypt data with a private key using RSAES-OAEP/SHA-256/MGF1-SHA-1
				// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
				var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
					md: forge.md.sha256.create(),
					mgf1: {
						md: forge.md.sha1.create()
					}
				});
			}catch(e){console.error(e.toString());}
			try{//rsa
				console.log("RSA-KEM");
				throw "skip";
				// generate an RSA key pair asynchronously (uses web workers if available)
				// use workers: -1 to run a fast core estimator to optimize # of workers
				forge.rsa.generateKeyPair({bits: 2048, workers: -1}, function(err, keypair) {
					// keypair.privateKey, keypair.publicKey
				});

				// generate and encapsulate a 16-byte secret key
				var kdf1 = new forge.kem.kdf1(forge.md.sha1.create());
				var kem = forge.kem.rsa.create(kdf1);
				var result = kem.encrypt(keypair.publicKey, 16);
				// result has 'encapsulation' and 'key'

				// encrypt some bytes
				var iv = forge.random.getBytesSync(12);
				var someBytes = 'hello world!';
				var cipher = forge.cipher.createCipher('AES-GCM', result.key);
				cipher.start({iv: iv});
				cipher.update(forge.util.createBuffer(someBytes));
				cipher.finish();
				var encrypted = cipher.output.getBytes();
				var tag = cipher.mode.tag.getBytes();

				// send 'encrypted', 'iv', 'tag', and result.encapsulation to recipient

				// decrypt encapsulated 16-byte secret key
				var kdf1 = new forge.kem.kdf1(forge.md.sha1.create());
				var kem = forge.kem.rsa.create(kdf1);
				var key = kem.decrypt(keypair.privateKey, result.encapsulation, 16);

				// decrypt some bytes
				var decipher = forge.cipher.createDecipher('AES-GCM', key);
				decipher.start({iv: iv, tag: tag});
				decipher.update(forge.util.createBuffer(encrypted));
				var pass = decipher.finish();
				// pass is false if there was a failure (eg: authentication tag didn't match)
				if(pass) {
					// outputs 'hello world!'
					console.log(decipher.output.getBytes());
				}
			}catch(e){console.error(e.toString());}
			try{//rsa
				console.log("X.509");
				//throw "skip";
				var pki = forge.pki;

				// convert a PEM-formatted public key to a Forge public key
				var publicKey = pki.publicKeyFromPem(pem);

				// convert a Forge public key to PEM-format
				var pem = pki.publicKeyToPem(publicKey);

				// convert an ASN.1 SubjectPublicKeyInfo to a Forge public key
				var publicKey = pki.publicKeyFromAsn1(subjectPublicKeyInfo);

				// convert a Forge public key to an ASN.1 SubjectPublicKeyInfo
				var subjectPublicKeyInfo = pki.publicKeyToAsn1(publicKey);

				// gets a SHA-1 RSAPublicKey fingerprint a byte buffer
				pki.getPublicKeyFingerprint(key);

				// gets a SHA-1 SubjectPublicKeyInfo fingerprint a byte buffer
				pki.getPublicKeyFingerprint(key, {type: 'SubjectPublicKeyInfo'});

				// gets a hex-encoded, colon-delimited SHA-1 RSAPublicKey public key fingerprint
				pki.getPublicKeyFingerprint(key, {encoding: 'hex', delimiter: ':'});

				// gets a hex-encoded, colon-delimited SHA-1 SubjectPublicKeyInfo public key fingerprint
				pki.getPublicKeyFingerprint(key, {
					type: 'SubjectPublicKeyInfo',
					encoding: 'hex',
					delimiter: ':'
				});

				// gets a hex-encoded, colon-delimited MD5 RSAPublicKey public key fingerprint
				pki.getPublicKeyFingerprint(key, {
					md: forge.md.md5.create(),
					encoding: 'hex',
					delimiter: ':'
				});

				// creates a CA store
				//var caStore = pki.createCaStore([/* PEM-encoded cert */, ...]);
				var caStore = pki.createCaStore([' PEM-encoded cert ']);

				// add a certificate to the CA store
				caStore.addCertificate(certObjectOrPemString);

				// gets the issuer (its certificate) for the given certificate
				var issuerCert = caStore.getIssuer(subjectCert);

				// verifies a certificate chain against a CA store
				pki.verifyCertificateChain(caStore, chain, customVerifyCallback);

				// signs a certificate using the given private key
				cert.sign(privateKey);

				// signs a certificate using SHA-256 instead of SHA-1
				cert.sign(privateKey, forge.md.sha256.create());

				// verifies an issued certificate using the certificates public key
				var verified = issuer.verify(issued);

				// generate a keypair and create an X.509v3 certificate
				var keys = pki.rsa.generateKeyPair(2048);
				var cert = pki.createCertificate();
				cert.publicKey = keys.publicKey;
				// alternatively set public key from a csr
				//cert.publicKey = csr.publicKey;
				// NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
				// Conforming CAs should ensure serialNumber is:
				// - no more than 20 octets
				// - non-negative (prefix a '00' if your value starts with a '1' bit)
				cert.serialNumber = '01';
				cert.validity.notBefore = new Date();
				cert.validity.notAfter = new Date();
				cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
				var attrs = [{
					name: 'commonName',
					value: 'example.org'
				}, {
					name: 'countryName',
					value: 'US'
				}, {
					shortName: 'ST',
					value: 'Virginia'
				}, {
					name: 'localityName',
					value: 'Blacksburg'
				}, {
					name: 'organizationName',
					value: 'Test'
				}, {
					shortName: 'OU',
					value: 'Test'
				}];
				cert.setSubject(attrs);
				// alternatively set subject from a csr
				//cert.setSubject(csr.subject.attributes);
				cert.setIssuer(attrs);
				cert.setExtensions([{
					name: 'basicConstraints',
					cA: true
				}, {
					name: 'keyUsage',
					keyCertSign: true,
					digitalSignature: true,
					nonRepudiation: true,
					keyEncipherment: true,
					dataEncipherment: true
				}, {
					name: 'extKeyUsage',
					serverAuth: true,
					clientAuth: true,
					codeSigning: true,
					emailProtection: true,
					timeStamping: true
				}, {
					name: 'nsCertType',
					client: true,
					server: true,
					email: true,
					objsign: true,
					sslCA: true,
					emailCA: true,
					objCA: true
				}, {
					name: 'subjectAltName',
					altNames: [{
						type: 6, // URI
						value: 'http://example.org/webid#me'
					}, {
						type: 7, // IP
						ip: '127.0.0.1'
					}]
				}, {
					name: 'subjectKeyIdentifier'
				}]);
				/* alternatively set extensions from a csr
				var extensions = csr.getAttribute({name: 'extensionRequest'}).extensions;
				// optionally add more extensions
				extensions.push.apply(extensions, [{
					name: 'basicConstraints',
					cA: true
				}, {
					name: 'keyUsage',
					keyCertSign: true,
					digitalSignature: true,
					nonRepudiation: true,
					keyEncipherment: true,
					dataEncipherment: true
				}]);
				cert.setExtensions(extensions);
				*/
				// self-sign certificate
				cert.sign(keys.privateKey);

				// convert a Forge certificate to PEM
				var pem = pki.certificateToPem(cert);

				// convert a Forge certificate from PEM
				var cert = pki.certificateFromPem(pem);

				// convert an ASN.1 X.509x3 object to a Forge certificate
				var cert = pki.certificateFromAsn1(obj);

				// convert a Forge certificate to an ASN.1 X.509v3 object
				var asn1Cert = pki.certificateToAsn1(cert);
			}catch(e){console.error(e.toString());}
			try{
				console.log("PKCS#5");
				throw "skip";
				// generate a password-based 16-byte key
				// note an optional message digest can be passed as the final parameter
				var salt = forge.random.getBytesSync(128);
				var numIterations=2;
				var derivedKey = forge.pkcs5.pbkdf2('password', salt, numIterations, 16);

				// generate key asynchronously
				// note an optional message digest can be passed before the callback
				forge.pkcs5.pbkdf2('password', salt, numIterations, 16, function(err, derivedKey) {
					// do something w/derivedKey
					console.log(err);
					console.log(derivedKey);
				});
			}catch(e){console.error(e.toString());}
			try{
				console.log("ASN.1");
				throw "skip";
				var asn1 = forge.asn1;

				// create a SubjectPublicKeyInfo
				var subjectPublicKeyInfo =
					asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
						// AlgorithmIdentifier
						asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
							// algorithm
							asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
					asn1.oidToDer(pki.oids['rsaEncryption']).getBytes()),
							// parameters (null)
							asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, '')
						]),
						// subjectPublicKey
						asn1.create(asn1.Class.UNIVERSAL, asn1.Type.BITSTRING, false, [
							// RSAPublicKey
							asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
					// modulus (n)
					asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
						_bnToBytes(key.n)),
					// publicExponent (e)
					asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
						_bnToBytes(key.e))
							])
						])
					]);

				// serialize an ASN.1 object to DER format
				var derBuffer = asn1.toDer(subjectPublicKeyInfo);

				// deserialize to an ASN.1 object from a byte buffer filled with DER data
				var object = asn1.fromDer(derBuffer);

				// convert an OID dot-separated string to a byte buffer
				var derOidBuffer = asn1.oidToDer('1.2.840.113549.1.1.5');

				// convert a byte buffer with a DER-encoded OID to a dot-separated string
				console.log(asn1.derToOid(derOidBuffer));
				// output: 1.2.840.113549.1.1.5

				// validates that an ASN.1 object matches a particular ASN.1 structure and
				// captures data of interest from that structure for easy access
				var publicKeyValidator = {
					name: 'SubjectPublicKeyInfo',
					tagClass: asn1.Class.UNIVERSAL,
					type: asn1.Type.SEQUENCE,
					constructed: true,
					captureAsn1: 'subjectPublicKeyInfo',
					value: [{
						name: 'SubjectPublicKeyInfo.AlgorithmIdentifier',
						tagClass: asn1.Class.UNIVERSAL,
						type: asn1.Type.SEQUENCE,
						constructed: true,
						value: [{
							name: 'AlgorithmIdentifier.algorithm',
							tagClass: asn1.Class.UNIVERSAL,
							type: asn1.Type.OID,
							constructed: false,
							capture: 'publicKeyOid'
						}]
					}, {
						// subjectPublicKey
						name: 'SubjectPublicKeyInfo.subjectPublicKey',
						tagClass: asn1.Class.UNIVERSAL,
						type: asn1.Type.BITSTRING,
						constructed: false,
						value: [{
							// RSAPublicKey
							name: 'SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey',
							tagClass: asn1.Class.UNIVERSAL,
							type: asn1.Type.SEQUENCE,
							constructed: true,
							optional: true,
							captureAsn1: 'rsaPublicKey'
						}]
					}]
				};

				var capture = {};
				var errors = [];
				if(!asn1.validate(
					publicKeyValidator, subjectPublicKeyInfo, validator, capture, errors)) {
					throw 'ASN.1 object is not a SubjectPublicKeyInfo.';
				}
				// capture.subjectPublicKeyInfo contains the full ASN.1 object
				// capture.rsaPublicKey contains the full ASN.1 object for the RSA public key
				// capture.publicKeyOid only contains the value for the OID
				var oid = asn1.derToOid(capture.publicKeyOid);
				if(oid !== pki.oids['rsaEncryption']) {
					throw 'Unsupported OID.';
				}

				// pretty print an ASN.1 object to a string for debugging purposes
				asn1.prettyPrint(object);
			}catch(e){console.error(e.toString());}
			try{
				console.log("SHA256");
				//throw "skip";
				var md = forge.md.sha256.create();
				md.update('The quick brown fox jumps over the lazy dog');
				console.log(md.digest().toHex());
				// output: d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592
			}catch(e){console.error(e.toString());}
			try{
				console.log("SHA384");
				//throw "skip";
				var md = forge.md.sha384.create();
				md.update('The quick brown fox jumps over the lazy dog');
				console.log(md.digest().toHex());
				// output: ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1
				//throw "skip";
			}catch(e){console.error(e.toString());}
			try{
				console.log("SHA512");
				//throw "skip";
				// SHA-512
				var md = forge.md.sha512.create();
				md.update('The quick brown fox jumps over the lazy dog');
				console.log(md.digest().toHex());
				// output: 07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6

				// SHA-512/224
				var md = forge.md.sha512.sha224.create();
				md.update('The quick brown fox jumps over the lazy dog');
				console.log(md.digest().toHex());
				// output: 944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37

				// SHA-512/256
				var md = forge.md.sha512.sha256.create();
				md.update('The quick brown fox jumps over the lazy dog');
				console.log(md.digest().toHex());
				// output: dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d
			}catch(e){console.error(e.toString());}
			try{
				console.log("MD5");
				//throw "skip";
				var md = forge.md.md5.create();
				md.update('The quick brown fox jumps over the lazy dog');
				console.log(md.digest().toHex());
				// output: 9e107d9d372bb6826bd81d3542a419d6
			}catch(e){console.error(e.toString());}
			try{
				console.log("HMAC");
				//throw "skip";
				var hmac = forge.hmac.create();
				hmac.start('sha1', 'Jefe');
				hmac.update('what do ya want for nothing?');
				console.log(hmac.digest().toHex());
				// output: effcdf6ae5eb2fa2d27416d5f184df9c259a7c79
			}catch(e){console.error(e.toString());}
			try{
				console.log("prime");
				throw "skip";
				// generate a random prime on the main JS thread
				var bits = 1024;
				forge.prime.generateProbablePrime(bits, function(err, num) {
					console.log('random prime', num.toString(16));
				});

				// generate a random prime using Web Workers (if available, otherwise
				// falls back to the main thread)
				var bits = 1024;
				var options = {
					algorithm: {
						name: 'PRIMEINC',
						workers: -1 // auto-optimize # of workers
					}
				};
				forge.prime.generateProbablePrime(bits, options, function(err, num) {
					console.log('random prime', num.toString(16));
				});
			}catch(e){console.error(e.toString());}
			try{
				console.log("PRNG");
				//throw "skip";
				// get some random bytes synchronously
				var bytes = forge.random.getBytesSync(32);
				console.log(forge.util.bytesToHex(bytes));

				// get some random bytes asynchronously
				forge.random.getBytes(32, function(err, bytes) {
					console.log(forge.util.bytesToHex(bytes));
				});

				// collect some entropy if you'd like
				forge.random.collect(someRandomBytes);
				jQuery().mousemove(function(e) {
					forge.random.collectInt(e.clientX, 16);
					forge.random.collectInt(e.clientY, 16);
				});

				// specify a seed file for use with the synchronous API if you'd like
				forge.random.seedFileSync = function(needed) {
					// get 'needed' number of random bytes from somewhere
					return fetchedRandomBytes;
				};

				// specify a seed file for use with the asynchronous API if you'd like
				forge.random.seedFile = function(needed, callback) {
					// get the 'needed' number of random bytes from somewhere
					callback(null, fetchedRandomBytes);
				}//);

				// register the main thread to send entropy or a Web Worker to receive
				// entropy on demand from the main thread
				forge.random.registerWorker(self);

				// generate a new instance of a PRNG with no collected entropy
				var myPrng = forge.random.createInstance();
			}catch(e){console.error(e.toString());}
			try{
				console.log("utilities");
				//throw "skip";
				// encode/decode base64
				var str="lorem ipsum";
				var encoded = forge.util.encode64(str);
				console.log(encoded);
				var str = forge.util.decode64(encoded);
				console.log(str);

				// encode/decode UTF-8
				var encoded = forge.util.encodeUtf8(str);
				console.log(encoded);
				var str = forge.util.decodeUtf8(encoded);
				console.log(str);

				// bytes to/from hex
				var hex="000102030405060708090a0b0c0d0e0f";
				var bytes = forge.util.hexToBytes(hex);
				console.log(bytes);
				var hex = forge.util.bytesToHex(bytes);
				console.log(hex);

				// create an empty byte buffer
				var buffer = forge.util.createBuffer();
				// create a byte buffer from raw binary bytes
				var input="lorem ipsum";
				var buffer = forge.util.createBuffer(input, 'raw');
				console.log(buffer);
				// create a byte buffer from utf8 bytes
				var buffer = forge.util.createBuffer(input, 'utf8');
				console.log(buffer);

				// get the length of the buffer in bytes
				buffer.length();
				// put bytes into the buffer
				var bytes=[0,1,2,3];
				buffer.putBytes(bytes);
				console.log(buffer);
				// put a 32-bit integer into the buffer
				buffer.putInt32(10);
				console.log(buffer);
				// buffer to hex
				console.log(buffer.toHex());
				// get a copy of the bytes in the buffer
				//console.log(bytes.bytes(/* count */));//has no member bytes???
				// empty this buffer and get its contents
				//console.log(bytes.getBytes(/* count */));//has no member bytes???

				// convert a forge buffer into a Node.js Buffer
				// make sure you specify the encoding as 'binary'
				//var forgeBuffer = forge.util.createBuffer();//goja has no Buffer
				//var nodeBuffer = Buffer.from(forgeBuffer.getBytes(), 'binary');//goja has no Buffer

				// convert a Node.js Buffer into a forge buffer
				// make sure you specify the encoding as 'binary'
				//var nodeBuffer = Buffer.from('CAFE', 'hex');
				//var forgeBuffer = forge.util.createBuffer(nodeBuffer.toString('binary'));

				// parse a URL
				var parsed = forge.util.parseUrl('http://example.com/foo?bar=baz');
				console.log(parsed);
				// parsed.scheme, parsed.host, parsed.port, parsed.path, parsed.fullHost
			}catch(e){console.error(e.toString());}
			console.log('----------------------------------------');
		});
	}catch(e){console.error(e.toString());}
});
