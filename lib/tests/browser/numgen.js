//Creates objects that generate number sequences. Objects are iterable according to ECMAScript 6 (for example, they can be used in for-of loop).
//https://github.com/gamtiq/numgen
define([
	"module",
	"numgen",
],function(
	module,
	NumGen
){
	console.log([module.id,'start'].join(':'));
	console.log(NumGen);
	{//basic usage
		var seq = new NumGen({
			startValue: 3,
			factor: 4,
			valueChange: function(data) {
				return data.index > 1 ? data.current : data.value;
			}
		});
		console.log("Geometric progression:");
		for (var nI = 1; nI < 11; nI++) {
			console.log("#", nI, " - ", seq.getNext());
		}

		console.log("Next: ");
		for (var num of seq) {
			nI = seq.getIndex();
			console.log("#", nI, " - ", num);
			if (nI > 19) {
				break;
			}
		}
	}
});
