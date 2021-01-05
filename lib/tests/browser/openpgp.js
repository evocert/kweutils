//https://github.com/openpgpjs/openpgpjs
define([
	"module",
	"global",
	"openpgp",
],function(
	module,
	global,
	openpgp
){
	console.log([module.id,'start'].join(':'));
	console.log(openpgp);
	window.openpgp=openpgp;
	/*
	//test lazy loading
	global=global==null?window:global;//???
	global.openpgp=openpgp;
	openpgp.config.indutny_elliptic_path = 'lightweight/elliptic.min.js';
	openpgp.generateKey({ curve: 'brainpoolP512r1',  userIds: [{ name: 'Test', email: 'test@test.com' }] });
	*/
});
