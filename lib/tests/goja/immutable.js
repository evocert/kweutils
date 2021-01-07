//Immutable data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic. Persistent data presents a mutative API which does not update the data in-place, but instead always yields new updated data.
//https://github.com/immutable-js/immutable-js
//https://immutable-js.github.io/immutable-js/
define([
	"module",
	"console",
	"cyclejs",
	"chai",
	"immutablejs",
],function(
	module,
	console,
	cyclejs,
	chai,
	Immutable
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Immutable));
	{
		var map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
		var map2 = map1.set('b', 50);
		console.log(map1.get('b')); // 2
		console.log(map2.get('b')); // 50
	}
	{
		var List=Immutable.List;
		var/*const*/ list1 = List([ 1, 2 ]);
		var/*const*/ list2 = list1.push(3, 4, 5);
		var/*const*/ list3 = list2.unshift(0);
		var/*const*/ list4 = list1.concat(list2, list3);
		chai.assert.equal(list1.size, 2);
		chai.assert.equal(list2.size, 5);
		chai.assert.equal(list3.size, 6);
		chai.assert.equal(list4.size, 13);
		chai.assert.equal(list4.get(0), 1);
	}
	{
		var Map=Immutable.Map;
		var/*const*/ alpha = Map({ a: 1, b: 2, c: 3, d: 4 });
		alpha.map(function(v, k){return k.toUpperCase()}).join();
	}
	{//convert raw javascript objects and arrays
		var/*const*/ Map=Immutable.Map;
		var/*const*/ List=Immutable.List;
		var/*const*/ map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
		var/*const*/ map2 = Map({ c: 10, a: 20, t: 30 });
		var/*const*/ obj = { d: 100, o: 200, g: 300 };
		var/*const*/ map3 = map1.merge(map2, obj);
		// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
		var/*const*/ list1 = List([ 1, 2, 3 ]);
		var/*const*/ list2 = List([ 4, 5, 6 ]);
		var/*const*/ array = [ 7, 8, 9 ];
		var/*const*/ list3 = list1.concat(list2, array);
		// List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	}
	{
		var/*const*/ Seq = Immutable.Seq;
		var/*const*/ myObject = { a: 1, b: 2, c: 3 };
		Seq(myObject).map(function(x){return x*x}).toObject();
		// { a: 1, b: 4, c: 9 }
	}
	{
		var/*const*/ fromJS = Immutable.fromJS;

		var/*const*/ obj = { 1: "one" };
		console.log(Object.keys(obj)); // [ "1" ]
		console.log(obj["1"], obj[1]); // "one", "one"

		var/*const*/ map = fromJS(obj);
		console.log(map.get("1"), map.get(1)); // "one", undefined
	}
	{//convert back to raw javascript objects
		var/*const*/ Map = Immutable.Map;
		var/*const*/ List = Immutable.List;
		var/*const*/ deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) });
		console.log(cyclejs.decycle(deep.toObject())); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
		console.log(cyclejs.decycle(deep.toArray())); // [ 1, 2, List [ 3, 4, 5 ] ]
		console.log(cyclejs.decycle(deep.toJS())); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
		JSON.stringify(deep); // '{"a":1,"b":2,"c":[3,4,5]}'
	}
	{//nested structures
		var/*const*/ fromJS = Immutable.fromJS;
		var/*const*/ nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });
		// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
	}
	{
		var/*const*/ fromJS = Immutable.fromJS;
		var/*const*/ nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });

		var/*const*/ nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
		// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

		console.log(cyclejs.decycle(nested2.getIn([ 'a', 'b', 'd' ]))); // 6

		var/*const*/ nested3 = nested2.updateIn([ 'a', 'b', 'd' ], function(value){return value + 1});
		console.log(cyclejs.decycle(nested3));
		// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

		var/*const*/ nested4 = nested3.updateIn([ 'a', 'b', 'c' ],function(list){return list.push(6)});
		// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
	}
	{//equality treats collections as values
		// First consider:
		var/*const*/ obj1 = { a: 1, b: 2, c: 3 };
		var/*const*/ obj2 = { a: 1, b: 2, c: 3 };
		obj1 !== obj2; // two different instances are always not equal with ===

		var/*const*/ Map = Immutable.Map;
		var/*const*/ is = Immutable.is;
		var/*const*/ map1 = Map({ a: 1, b: 2, c: 3 });
		var/*const*/ map2 = Map({ a: 1, b: 2, c: 3 });
		map1 !== map2; // two different instances are not reference-equal
		map1.equals(map2); // but are value-equal if they have the same values
		is(map1, map2); // alternatively can use the is() function
	}
	{//value equality
		var/*const*/ Map = Immutable.Map;
		var/*const*/ Set = Immutable.Set;
		var/*const*/ map1 = Map({ a: 1, b: 2, c: 3 });
		var/*const*/ map2 = Map({ a: 1, b: 2, c: 3 });
		var/*const*/ set = Set().add(map1);
		set.has(map2); // true because these are value-equal
	}
	{//batching mutations
		var/*const*/ List = Immutable.List;
		var/*const*/ list1 = List([ 1, 2, 3 ]);
		var/*const*/ list2 = list1.withMutations(function (list) {
		  list.push(4).push(5).push(6);
		});
		chai.assert.equal(list1.size, 3);
		chai.assert.equal(list2.size, 6);
	}
	{//lazy seq
		var/*const*/ Seq = Immutable.Seq;
		var/*const*/ oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
		  .filter(function(x){return x % 2 !== 0})
		  .map(function(x){return x * x});
		//Once the Seq is used, it performs only the work necessary. In this example, no intermediate arrays are ever created, filter is called three times, and map is only called once:
		console.log(oddSquares.get(1))
	}
	{//converting to lazy seq
		var/*const*/ Map = Immutable.Map;
		var/*const*/ Seq = Immutable.Seq;
		var/*const*/ map = Map({ a: 1, b: 2, c: 3 });
		var/*const*/ lazySeq = Seq(map);
	}
	{//seq chain operations
		//??
		//var/*const*/ Map = Immutable.Map;
		//var/*const*/ Seq = Immutable.Seq;
		//var/*const*/ map = Map({ a: 1, b: 2, c: 3 });
		//var/*const*/ lazySeq = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
		//  .flip()
		//  .map(function(key){return key.toUpperCase()})
		//  .flip();
	}
	{//range
		var/*const*/ Range = Immutable.Range;
		var/*const*/ r=Range(1, Infinity)
		  .skip(1000)
		  .map(function(n){return -n})
		  .filter(function(n){return n % 2 === 0})
		  .take(2)
		  .reduce(function(r, n){return r * n}, 1);
		console.log(r);
		// 1006008
	}
});
