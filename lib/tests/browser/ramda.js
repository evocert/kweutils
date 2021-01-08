//A practical functional library for JavaScript programmers.
//https://github.com/CrossEye/ramda
//https://ramdajs.com/docs/
//https://github.com/ramda/ramda/wiki/Cookbook
define([
	"module",
	"console",
	"cyclejs",
	"ramda",
],function(
	module,
	console,
	cyclejs,
	R
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(R));
	try{//basic usage
		console.log(R.identity());
	}catch(e){console.error(e.toString())};
	try{//pick values a from list by indexes
		// :: [Number] -> [a] -> [a]
		var pickIndexes = R.useWith(R.ap, [R.map(R.nth), R.of]);
		console.log(pickIndexes([0, 2], ['a', 'b', 'c'])); // => ['a', 'c']
	}catch(e){console.error(e.toString())};
	try{//create list function
		//  list :: a... -> [a...]
		var list = Array.of;
		var list = R.unapply(R.identity);
		console.log(list(1, 2, 3)); // => [1, 2, 3]
	}catch(e){console.error(e.toString())};
	try{//mess with dom
		/*
		if(typeof(document)!='undefined'&&document!=null){
			// Get all descendants that match selector
			// Note: NodeList is array-like so you can run ramda list functions on it.
			//  cssQuery :: String -> Node -> NodeList
			var cssQuery = R.invoker(1, 'querySelectorAll');

			// Mutate style properties on an element
			//  setStyle :: String -> String -> Element -> Element
			//  var setStyle = R.assoc('style');
			//var setStyle = R.curry((style, tag) => R.forEachObjIndexed((value, key) => tag.style[key] = value, style));
			var setStyle = R.curry(function(style, tag){return R.forEachObjIndexed(function(value, key){return tag.style[key] = value}, style);});

			// Make all paragraphs and anchors red
			R.pipe(
			  cssQuery('a, p'),
			  R.forEach(setStyle({ color: 'red' })),
			)(document)
		}
		*/
	}catch(e){console.error(e.toString())};
	try{//apply list of functions in specific order into list of values
		function red(v){console.log(["red",v].join(":"));};
		function green(v){console.log(["green",v].join(":"));};
		function blue(v){console.log(["blue",v].join(":"));};
		var disco = R.pipe(R.zipWith(R.call, [ red, green, blue ]), R.join(' '));
		console.log(disco([ 'foo', 'bar', 'xyz' ]))
	}catch(e){console.error(e.toString())};
	try{//derivitive of R.props for deep fields
		var dotPath = R.useWith(R.path, [R.split('.')]);
		var propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of]);
		var obj = {
		  a: { b: { c: 1 } },
		  x: 2
		};
		console.log(propsDotPath(['a.b.c', 'x'], obj));
		// => [ 1, 2 ]
	}catch(e){console.error(e.toString())};
	try{//get n function calls as a list
		R.map(R.call, R.repeat(Math.random, 5));
		// Note that as of Ramda v0.2.3, you can just do this:
		//console.log(R.times(() => Math.random(), 5));
		console.log(R.times(function(){return Math.random()},5));
	}catch(e){console.error(e.toString())};
	try{//set props if not exists
		//  defaults :: Object -> Object -> Object
		var defaults = R.flip(R.merge);

		// process.env.SECRET overwrites deadbeef if it exists
		defaults("FOO", {
		  SECRET: 'deadbeef'
		});
		console.log(defaults);
	}catch(e){console.error(e.toString())};
	try{//get object method names
		//  methodNames :: Object -> [String]
		var methodNames = R.compose(R.keys, R.pickBy(R.is(Function)));
		var obj = {
		  foo: true,
		  bar: function() {},
		  baz: function() {},
		};
		console.log(methodNames(obj)); // => ['bar', 'baz']
	}catch(e){console.error(e.toString())};
	try{//make an object out of keys with values derived from them
		//    objFromKeys :: (String -> a) -> [String] -> {String: a}
		//var objFromKeys = R.curry((fn, keys) =>R.zipObj(keys, R.map(fn, keys)));
		var objFromKeys = R.curry(function(fn, keys){return R.zipObj(keys, R.map(fn, keys))});

		var files = ['diary.txt', 'shopping.txt'];
		//console.log(objFromKeys(fs.readFileSync, files));
		console.log(objFromKeys(function(v){return [v,"contents"].join(":");}, files));
		// => { 'diary.txt': 'Dear diary...', ... }
	}catch(e){console.error(e.toString())};
	try{//make an object out of a list, with keys derived from each element
		//var objFromListWith = R.curry((fn, list) => R.chain(R.zipObj, R.map(fn))(list))
		var objFromListWith=R.curry(function(fn,list){return R.chain(R.zipObj,R.map(fn))(list);})
		console.log(objFromListWith(R.prop('id'),[{id:'foo',name:'John'},{id:'bar',name:'Jane'}]));
		// => { foo: { id: 'foo', name: 'John' }, bar: { id: 'bar', name: 'Jane' } }
	}catch(e){console.error(e.toString())};
	try{//remap keys (rename by function)
		//    mapKeys :: (String -> String) -> Object -> Object
		//const mapKeys=R.curry((fn,obj)=>R.fromPairs(R.map(R.adjust(0,fn),R.toPairs(obj))));
		var mapKeys=R.curry(function(fn,obj){return R.fromPairs(R.map(R.adjust(0,fn),R.toPairs(obj)))});
		console.log(mapKeys(R.toUpper,{a:1,b:2,c:3}));//{A:1,B:2,C:3}
	}catch(e){console.error(e.toString())};//???
	//try{//
	//}catch(e){console.error(e.toString())};
});
