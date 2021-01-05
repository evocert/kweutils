/**
 * Node.js module for all known Forge message digests.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2017 Digital Bazaar, Inc.
 */
define([
	"module",
	"./md5",
	"./sha1",
	"./sha256",
	"./sha512"
],function(
	module,
	md5,
	sha1,
	sha256,
	sha512
){
module.exports = require('./md');
/*
require('./md5');
require('./sha1');
require('./sha256');
require('./sha512');
*/
});
