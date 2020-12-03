define([
	'class'
],function(Class){
	return new Class({
		children:null,
		tag:null,
		attributes:null,
		textvalue:null,
		initialize:function(options){
			this.children=[];
			this.textvalue="";
			this.attributes=[];
			this.tag=options.tag;
		},
		attr:function(k,v){
			this.attributes.push([k,v])
			return this;
		},
		text:function(v){
			this.textvalue=v;
			return this;
		},
		append:function(node){
			if(Array.isArray(node)){
				node.forEach(function(n){
					this.children.push(n);
				}.bind(this));
			}else{
				this.children.push(node);
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
				this.textvalue==null?"":this.textvalue,//sort out before after etc
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

