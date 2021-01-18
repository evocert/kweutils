//Toast is a promise-based JS/CSS loader for the browser. It aims to optimize web site performance by loading your assets asynchronoulsy.
//https://github.com/pyrsmk/toast
//https://ko-fi.com/pyrsmk
define([
	"module",
	"toast",
],function(
	module,
	toast
){
	console.log([module.id,'start'].join(':'));
	console.log(toast);
	{//basic usage
		var dark_mode=true;
		if (dark_mode === true) {
			toast.css('styles/dark.css')
		} else {
			toast.css('styles/light.css')
		}

		const handleErrors = error => {
			console.log(error)
		}
		/*
		toast.js('http://some.cdn.com/jquery.js')
			.then(() => {
				toast.js('http://some.cdn.com/jquery-myplugin.js')
					.then(() => $('.someClass').myPlugin())
					.catch(handleErrors)
				})
			})
			.catch(handleErrors)
		*/

		/*await*/ toast.all([
			'assets/css/styles1.css',
			'assets/js/script1.js',
			'assets/js/script2.js',
			'assets/css/styles2.css',
			'assets/js/script3.js',
		])
		console.log('Everything has been loaded, yay!')
	}
});
