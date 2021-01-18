function Namespace(ns, fn, node){
  'use strict';
	node = (0, eval)('this');
	ns.split('.').map(function(name){
	  node = node[name] || (node[name] = {});
	});
	return fn && fn.call && fn.call(node), node;
}
