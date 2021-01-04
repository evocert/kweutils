//https://adrianmejia.com/backbone-dot-js-for-absolute-beginners-getting-started/
//https://adrianmejia.com/backbone-js-for-absolute-beginners-getting-started-part-4/
define([
	"module",
	"console",
	"cyclejs",
	"window",
	"document",
],function(
	module,
	console,
	cyclejs,
	_window,
	_document
){
	try{
		console.log('----------------------------------------');
		console.log([module.id,'start'].join(':'));
		//bootstrap globals
		window=_window;
		document=_document;
		this.window=window;
		this.document=window;
		require(["console","jquery","backbone","underscore"],function(console,jq,Backbone,_){
			var $=jq;
			{
				$("body").append($('<div id="container">Loading...</div>'))
				var AppView = Backbone.View.extend({
					el: $('#container'),
					// template which has the placeholder 'who' to be substitute later
					template: _.template("<h3>Hello <%= who %></h3>"),
					initialize: function(){
						this.render();
					},
					render: function(){
						// render the function using substituting the varible 'who' for 'world!'.
						this.$el.html(this.template({who: 'world!'}));
						//***Try putting your name instead of world.
					}
				});
				var appView = new AppView();
			}
			{
				$("body").append($(
					'<section id="todoapp">\n'+
					'  <header id="header">\n'+
					'    <h1>Todos</h1>\n'+
					'    <input id="new-todo" placeholder="What needs to be done?">\n'+
					'  </header>\n'+
					'  <section id="main">\n'+
					'    <ul id="todo-list"></ul>\n'+
					'  </section>\n'+
					'</section>\n'
				));
				var app = {}; // create namespace for our app

				app.Todo = Backbone.Model.extend({
					defaults: {
						title: '',
						completed: false
					}
				});
			}
			request.ResponseHeader().Set("Content-Type","text/html");//request.ResponseHeader().Set("Content-Type","image/svg+xml");
			println($("body").prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
