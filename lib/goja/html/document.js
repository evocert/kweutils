define([
	'classjs',
	'node',
	'idutils'
],function(Class,Node,idutils){
	/*
	return typeof(document)=='undefined'?new (new Class({
		closed:false,
		opened:false,
		root:false,
		head:false,
		body:false,
		initialize:function(){
			this.root=(new Node({tag:"html"})).append([
				this.head=(new Node({tag:"head"}).append(
					new Node({tag:"meta"}).setAttribute("charset","utf-8")
				)),
				this.body=(new Node({tag:"body"}))
			]);
		},
		write:function(val){
			if(val!=null)
				println((typeof(val)=='object'?JSON.stringify(val):val));
		},
		close:function(){
			if(!this.closed){println("</body></html>");this.closed=true;}
		},
		createElement:function(tag){
			return new Node({tag:tag});
		},
		close:function(){
			println(this.root.toString());
		},
		append:function(el){
			this.root.append(el);
		},
		anchors:function(){
		},
		childNodes:function(){
		},
		getElementByTagName:function(){
		},
	})):document;
	*/
	return new Class({
		closed:false,
		opened:false,
		root:false,
		head:false,
		body:false,
		initialize:function(){
			this.root=(new Node({tag:"html"})).append([
				this.head=(new Node({tag:"head"}).append(
					new Node({tag:"meta"}).setAttribute("charset","utf-8")
				)),
				this.body=(new Node({tag:"body"}))
			]);
		},
		write:function(val){
			if(val!=null)
				println((typeof(val)=='object'?JSON.stringify(val):val));
		},
		close:function(){
			if(!this.closed){println("</body></html>");this.closed=true;}
		},
		createElement:function(tag){
			return new Node({tag:tag});
		},
		close:function(){
			println(this.root.toString());
		},
		append:function(el){
			this.root.append(el);
		},
		anchors:function(){
		},
		childNodes:function(){
		},
		getElementByTagName:function(){
		},
	});
});
