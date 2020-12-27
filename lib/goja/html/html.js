define([
	'class',
	'node'
],function(Class,Node){
	return new Class({
		root:null,
		initialize:function(){
			this.children=[];
			this.root=new Node({tag:'html'});
		},
		getRoot:function(){
			return this.root;
		},
		toString:function(){
			return this.root.toString();
		}
	});
});

