//Spck Editor is an embeddable online code editor, optimized for the web and building web projects. This library builds is a wrapper around the iframe messaging interface provided by the editor and allows you to control the editor for your needs.
//https://github.com/spckio/spck-embed
define([
	"module",
	"jquery",
	"spck-embed",
],function(
	module,
	jq,
	SpckEditor
){
	console.log([module.id,'start'].join(':'));
	console.log(SpckEditor);
	$=jq;
	{//basic usage
		var iframe=$(`<iframe id="editor" src="https://embed.spck.io/" frameBorder="0" width="600" height="360"></iframe>`);
		$("body").append(iframe);
		//// Connect by passing an HTML id to the iframe
		//var editor = new SpckEditor('#editor');
		// Or by passing an HTML element
		//var editor = new SpckEditor(document.getElementById('editor'));
		// Or with any query selector
		//var editor = new SpckEditor(document.getElementById('iframe'));
		var editor = new SpckEditor(iframe[0]);
	}
	{//connection
		var iframe=$(`<iframe id="editor" src="https://embed.spck.io/" frameBorder="0" width="600" height="360"></iframe>`);
		$("body").append(iframe);
		// Connect by passing an HTML id to the iframe
		//var editor = new SpckEditor('#editor');
		// Or by passing an HTML element
		//var editor = new SpckEditor(document.getElementById('editor'));
		// Or with any query selector
		//var editor = new SpckEditor(document.getElementById('iframe'));
		var editor = new SpckEditor(iframe[0]);

		// Connect and handle with a callback
		editor.connect(function (connected) {
			// Number of tries it took to connect
			console.log(connected.tries)

			editor.send({
				project: 'Simple Project',	// Project name
				open: 'index.js',	// Open file
				files: [	// Create following files
					{path: 'index.js', text: 'console.log("entry point")'}
				]
			}, function () {
				// Success
			}, function () {
				// Failure
			})
		}, function () {
			// Handle connection failure
			console.log('connection failed')
		}, {
			maxTries: 20,	// Maximum number of attempts to wait for iframe to load
			interval: 500	// Interval between attempts
		});

		// Or handle with a promise
		editor.connect()
			.then(() => {
				// Control the editor
				return editor.send({
					project: 'Simple Project',	// Project name
					open: 'index.js',	// Open file
					files: [	// Create following files
						{path: 'index.js', text: 'console.log("entry point")'}
					]
				})
			})
			.catch(() => console.log('failure'))
		/*
		// Or handle using async/await
		await editor.connect()
		// Control the editor
		await editor.send({
			project: 'Simple Project',	// Project name
			open: 'index.js',	// Open file
			files: [	// Create following files
				{path: 'index.js', text: 'console.log("entry point")'}
			]
		})
		*/
	}
});
