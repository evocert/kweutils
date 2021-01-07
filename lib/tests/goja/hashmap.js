//This project provides a HashMap class that works both on Node.js and the browser. HashMap instances store key/value pairs allowing keys of any type.
//Unlike regular objects,keys will not be stringified. For example numbers and strings won't be mixed,you can pass Date's,RegExp's,DOM Elements,anything!(even null and undefined)
//https://github.com/flesler/hashmap
define([
	"module",
	"console",
	"cyclejs",
	"hashmapjs",
],function(
	module,
	console,
	cyclejs,
	HashMap
){
	console.log([module.id,'start'].join(':'));
	console.log(HashMap);
	{//construction
		var map=new HashMap();
		console.log(map);
	}
	{//basic usage
		var map=new HashMap();
		map.set("some_key","some value");
		console.log(map.get("some_key")); // --> "some value"
	}
	{//size
		var map=new HashMap();
		map.set("key1","val1");
		map.set("key2","val2");
		console.log(map.size); // -> 2
	}
	{//deletion
		var map=new HashMap();
		map.set("some_key","some value");
		map.delete("some_key");
		console.log(map.get("some_key")); // --> undefined
	}
	{//stringification
		var map=new HashMap();
		map.set("1","string one");
		map.set(1,"number one");
		console.log(map.get("1")); // --> "string one"
	}
	{//objects as keys
		var map=new HashMap();
		var key={};
		var key2={};
		map.set(key,123);
		map.set(key2,321);
		console.log(map.get(key)); // --> 123
	}
	{//iteration
		var map=new HashMap();
		map.set(1,"test 1");
		map.set(2,"test 2");
		map.set(3,"test 3");

		map.forEach(function(value,key){
				console.log(key + " : " + value);
		});
		// ES6 Iterators version
		/*
		for(var pair of map){
				console.log(`${pair.key} : ${pair.value}`)
		}
		*/
	}
	{//method chaining
		var map=new HashMap();
		map
			.set(1,"test 1")
			.set(2,"test 2")
			.set(3,"test 3")
			.forEach(function(value,key){
					console.log(key + " : " + value);
			});
	}
});
