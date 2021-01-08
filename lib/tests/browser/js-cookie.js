define([
	"module",
	"js-cookie",
],function(
	module,
	Cookies
){
	console.log([module.id,'start'].join(':'));
	console.log(Cookies);
	{//basic usage
		Cookies.set('foo', 'bar')
		Cookies.set('name', 'value', { expires: 7 })
		console.log(Cookies.get('name')); // => 'value'
		console.log(Cookies.get('nothing')); // => undefined
		console.log(Cookies.get()); // => { name: 'value' }//all
		console.log(Cookies.get('foo', { domain: 'sub.example.com' })); // `domain` won't have any effect...!
		Cookies.set('myjson', {"lorem":"ipsum","sit":"consecutar","dolor":42}, { expires: 7 })
		console.log(Cookies.getJSON('myjson')); // `domain` won't have any effect...!
		Cookies.remove('name')
		Cookies.remove('name', { path: '' }) // removed!
		Cookies.remove('name', { path: '', domain: '.yourdomain.com' })
		//var Cookies2 = Cookies.noConflict()//???
	}
});
