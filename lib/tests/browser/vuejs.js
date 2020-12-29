//https://www.codementor.io/@zapetin52/use-requirejs-for-lazyloading-the-components-with-vuerouter-instead-of-webpack-or-similars-m5s8kxjrs
define([
	"module",
	"jquery",
	"vuejs",
	"vue-router",
	"axios",
	"lodash",
	"text!./frag/vuejs/app0.html",
	"text!./frag/vuejs/app1.html",
	"text!./frag/vuejs/app2.html",
	"text!./frag/vuejs/app3.html",
	"text!./frag/vuejs/app4.html",
	"text!./frag/vuejs/app5.html",
	"text!./frag/vuejs/app6.html",
	"text!./frag/vuejs/app7.html",
	"text!./frag/vuejs/app8.html",
],function(
	module,
	jq,
	Vue,
	Router,
	axios,
	_,
	frag0,
	frag1,
	frag2,
	frag3,
	frag4,
	frag5,
	frag6,
	frag7,
	frag8,
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
	{//computed
		$("body").append($(frag7));
		var app7=new Vue({
			el:'#app-7',
			data:{
				message:'Hello'
			},
			computed:{
				reversedMessage:function(){
					return this.message.split('').reverse().join('')
				}
			}
		});
	}
	{//custom watchers
		//Since there is already a rich ecosystem of ajax libraries    
		//and collections of general-purpose utility methods, Vue core 
		//is able to remain small by not reinventing them. This also   
		//gives you the freedom to use what you're familiar with.      
		$("body").append($(frag8));
		var app8=new Vue({
			el:'#app-8',
			data: {
				question: '',
				answer: 'I cannot give you an answer until you ask a question!'
			},
			watch: {
				// whenever question changes, this function will run
				question: function (newQuestion, oldQuestion) {
					this.answer = 'Waiting for you to stop typing...'
					this.debouncedGetAnswer()
				}
			},
			created: function () {
				// _.debounce is a function provided by lodash to limit how
				// often a particularly expensive operation can be run.
				// In this case, we want to limit how often we access
				// yesno.wtf/api, waiting until the user has completely
				// finished typing before making the ajax request. To learn
				// more about the _.debounce function (and its cousin
				// _.throttle), visit: https://lodash.com/docs#debounce
				console.log(_);
				this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
			},
			methods: {
				getAnswer: function () {
					if (this.question.indexOf('?') === -1) {
						this.answer = 'Questions usually contain a question mark. ;-)'
						return
					}
					this.answer = 'Thinking...'
					var vm = this
					axios.get('https://yesno.wtf/api')
						.then(function (response) {
							vm.answer = _.capitalize(response.data.answer)
						})
						.catch(function (error) {
							vm.answer = 'Error! Could not reach the API. ' + error
						})
				}
			}
		});
	}
});
