/**
 * @module route/parser
 */
define(["module","./compiled-grammar","./nodes"],function(module,compiledgrammar,nodes){
'use strict';

/** Wrap the compiled parser with the context to create node objects */
//var parser = require('./compiled-grammar').parser;
var parser=compiledgrammar.parser;
//parser.yy = require('./nodes');
parser.yy=nodes;
module.exports = parser;
});
