//	bag.js is loader for .js / .css and other files, that uses IndexedDB/ WebSQL / localStorage for caching. Consider it as alternative for other types of loaders for modern browsers, that reduce number of server requests, especially for mobile devices. Also bag.js can be used as simple key/value storage, that doesn't require you to know details about IndexedDB and WebSQL.
//
//	This project is inspired by basket.js, but provides more safe storages for big assets and universal key/value interface. Key features are:
//
//	Parallel load and sequential execution for JS / CSS and other types of files
//	Use IndexedDB / WebSQL / localStorage - no size limits for big assets.
//	KV storage for objects, with simple interface.
//	You can use multiple instances with different storage options. For example Indexeddb + WebSQL for assets and localStorage for user settings.
//	Partial compatibility with basket.js.
//
//https://github.com/nodeca/bag.js
define([
	"module",
	"bagjs",
],function(
	module,
	Bag
){
	console.log([module.id,'start'].join(':'));
	console.log(Bag);
	{//basicusage
		var bag=new Bag();
		bag.require(['/site.css','/jquery.js','/site.js'])
			.then(()=>{
				//codetorunafterloading
				//...
			})
			.catch(err=>console.log('loadingerror:',err));
	}
	{//advancedusage
		var bag=new Bag({
			prefix:'my_namespace',
			stores:['indexeddb','websql'],
			timeout:20000,
			expire:24
		});

		bag.isValidItem=function(source,obj){
			return(source&&(source.url===obj.url))?true:false;
		};

		var files=[
			{url:'/site.css',expire:1},
			{url:'/jquery.js',expire:10},
			{url:'/site.js'},
			{url:'/more_styles.css',expire:5,execute:false}
		];

		bag.require(files)
			.then(data=>{
				console.log('loaded',data);
			})
			.catch(err=>console.log(err));
	}
});
