/**
 * Node.js module for Forge.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2016 Digital Bazaar, Inc.
 */
//define(["module"],function(module){
define(function (require, exports, module) {
	module.exports=require('./forge');
	require('./aes');
	require('./aesCipherSuites');
	require('./asn1');
	require('./cipher');
	require('./debug');
	require('./des');
	require('./ed25519');
	require('./hmac');
	require('./kem');
	//require('./log');//goja: Error undefined
	require('./md');
	//require('./md.all');//goja: Error undefined
	require('./mgf1');
	require('./pbkdf2');
	require('./pem');
	require('./pkcs1');
	require('./pkcs12');
	require('./pkcs7');
	require('./pki');
	require('./prime');
	require('./prng');
	require('./pss');
	require('./random');
	require('./rc2');
	require('./ssh');
	//require('./task');//goja: Error undefined
	require('./tls');
	require('./util');
});
