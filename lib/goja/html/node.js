define([
	'classjs'
],function(Class){
	return new Class({
		children:null,
		parent:null,
		tag:null,
		attributes:null,
		innerText:null,
		initialize:function(options){
			if(typeof(GOJA)=='undefined'){
				this._node=document.createElement(options.gag);
			}
			this.parent=null;
			this.children=[];
			this.innerText="";
			this.attributes=[];
			this.tag=options.tag;
		},
		attr:function(k,v){
			this.attributes.push([k,v])
			return this;
		},
		setAttribute:function(k,v){
			if(typeof(GOJA)=='undefined'){
				this._node.setAttribute(k,v);
			}
			return this.attr(k,v);
		},
		text:function(v){
			this.innerText=v;
			return this;
		},
		append:function(node){
			if(Array.isArray(node)){
				node.forEach(function(n){
					this.children.push(n);
					if(typeof(GOJA)=='undefined'){
						this._node.append(node._node);
					}
					if(n.beforeMove!=null)n.beforeMove();//primarily for eventing prior to attached to new parent
					n.parent=this;
					if(n.onMove!=null)n.onMove();//primarily for eventing when attached to parent, after add, you can call onMove to do something with the parent
				}.bind(this));
			}else{
				this.children.push(node);
				if(node.beforeMove!=null)node.beforeMove();
				node.parent=this;
				if(node.onMove!=null)node.onMove();
			}
			return this;
		},
		toString:function(){
			var ret=[
				'<',
				this.tag==null?"":this.tag,
				(function(){
					if(this.attributes.length==0)return"";
					var arrkv=[];
					this.attributes.forEach(function(attr){
						arrkv.push(attr[0]+'='+'"'+attr[1]+'"')
					});
					return ' '+arrkv.join(' ');;
				}).call(this),
				'>',
				this.innerText==null?"":this.innerText,//sort out before after etc
				(function(){
					var ret=[];
					this.children.forEach(function(child){
						ret.push(child.toString());
					});
					return ret.join('');
				}).call(this),
				'</',
				this.tag,
				'>'
			].join("");
			return ret;
		}
	});
});
