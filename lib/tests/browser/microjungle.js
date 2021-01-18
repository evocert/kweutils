//HTML templating with JS. The Right Way.
//https://github.com/deepsweet/microjungle
define([
	"module",
	"microjungle",
],function(
	module,
	microjungle
){
	console.log([module.id,'start'].join(':'));
	console.log(microjungle);
	{//basic usage
		// just an element
		microjungle([
			['div'],
		]);
		// <div></div>

		// two elements
		microjungle([
			['div'],
			['div']
		]);
		// <div></div><div></div>

		// textnode as content
		microjungle([
			['div', 'text content']
		]);
		// <div>text content</div>

		// multiple contents
		microjungle([
			['div', 'text content', 123, 'and another one']
		]);
		// <div>text content123and another one</div>

		// attributes
		microjungle([
			['div', {'class': 'wrapper'}]
		]);
		// <div class="wrapper"></div>

		// something more complex in browser environment
		microjungle([
			['div', {'class': 'wrapper'},
				['p', 'inner paragraph',
					document.createElement('span'),
					document.createDocumentFragment().appendChild(
						document.createElement('i')
					),
					false,
					undefined,
					0,
					[]
				]
			]
		]);
	}
});
