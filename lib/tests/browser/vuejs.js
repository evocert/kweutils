//https://www.codementor.io/@zapetin52/use-requirejs-for-lazyloading-the-components-with-vuerouter-instead-of-webpack-or-similars-m5s8kxjrs
define([
	"module",
	"jquery",
	"vuejs",
	"vue-router",
	"text!./frag/vuejs/app0.html",
	"text!./frag/vuejs/app1.html",
	"text!./frag/vuejs/app2.html",
	"text!./frag/vuejs/app3.html",
	"text!./frag/vuejs/app4.html",
	"text!./frag/vuejs/app5.html",
	"text!./frag/vuejs/app6.html",
],function(
	module,
	jq,
	Vue,
	Router,
	frag0,
	frag1,
	frag2,
	frag3,
	frag4,
	frag5,
	frag6,
){
	$=jq;
	console.log([module.id,"start"].join(":"));
	console.log(Vue);
	console.log(Router);
	{
		$("body").append($(frag0));
		var app0=new Vue({
			el:"#app-0",
			data:{
				message:"Hello Vue!"
			}
		});
	}
	{
		$("body").append($(frag1));
		var app1=new Vue({
			el:"#app-1",
			data:{
				message:"You loaded this page on "+new Date().toLocaleString()
			}
		});
	}
	{
		$("body").append($(frag2));
		var app2=new Vue({
			el:"#app-2",
			data:{
				seen:true
			}
		});
	}
	{
		$("body").append($(frag3));
		var app3=new Vue({
			el:'#app-3',
			data:{
				todos:[
					{text:'foo'},
					{text:'bar'},
					{text:'baz'}
				]
			}
		})
	}
	{
		$("body").append($(frag4));
		var app4=new Vue({
			el:'#app-4',
			data:{
				message:'HelloVue.js!'
			},
			methods:{
				reverseMessage:function(){
					this.message=this.message.split('').reverse().join('')
				}
			}
		});
	}
	{
		$("body").append($(frag5));
		var app5=new Vue({
			el:'#app-5',
			data:{
				message:'HelloVue!'
			}
		});
	}
	{//component registration
		Vue.component('todo-item',{
			props:['todo'],
			template:'<li>{{ todo.text }}</li>'
		});
		$("body").append($(frag6));
		var app6=new Vue({
		  el:'#app-6',
		  data:{
			 groceryList:[
				{id:0,text:'Vegetables'},
				{id:1,text:'Cheese'},
				{id:2,text:'Whatever else humans are supposed to eat'}
			 ]
		  }
		});
	}
});
