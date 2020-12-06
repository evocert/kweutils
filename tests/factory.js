/*
 * sample factory
 */
define([
	'console',
	'class'
],function(console,Class){
	return function(name,options){//factory
		return ({
			c0:(function(){return new(new Class({
				options:null,
				initialize:function(options){
					this.options=options;
				},
				log:function(){
					console.log('c0:log:'+this.options);
					return this;
				},
				mut:function(){
					this.options++;
					return this;
				}
			}))(options);}).call(this,options),
			c1:(function(){return new(new Class({
				options:null,
				initialize:function(options){
					this.options=options;
				},
				log:function(){
					console.log('c1:log:'+this.options);
				}
			}))(options);}).call(this,options),
			c2:(function(){return new(new Class({
				options:null,
				initialize:function(options){
					this.options=options;
				},
				log:function(){
					console.log('c2:log:'+this.options);
				}
			}))(options);}).call(this,options),
			c3:(function(){return new(new Class({
				options:null,
				initialize:function(options){
					this.options=options;
				},
				log:function(){
					console.log('c3:log:'+this.options);
				}
			}))(options);}).call(this,options)
		})[name];
	};
});
