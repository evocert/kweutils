//https://github.com/jstat/jstat
//https://github.com/jstat/jstat/blob/1.x/doc/md/core.md
//https://github.com/jstat/jstat/tree/1.x/doc/md
define([
	"module",
	"jstat",
],function(
	module,
	jStat
){
	console.log([module.id,'start'].join(':'));
	console.log(jStat);
	var matrix = jStat([[ 1, 2, 3 ],[ 4, 5, 6 ],[ 7, 8, 9 ]]);
	console.log(matrix);
	console.log(jStat([[ 1, 2 ],[ 3, 4 ]], function( x ) {
	    return x * 2;
	}));
	var vector = jStat( 0, 1, 5 );
	var alpha=1;
	var beta=2;
	var betaGraph = jStat( 0, 1, 11, function( x, cnt ) {
		    return [ jStat.beta.pdf( x, alpha, beta ), cnt ];
	});
	// pass the generated random 3x3 matrix to jStat
	jStat( jStat.rand( 3 ));
	// or create an empty instance that is filled in afterwards
	jStat().rand( 3 );
	var matrix = [[1,2,3],[4,5,6]];
	jStat.rows( matrix ) === 2;
	console.log(jStat([[1,2,3]]).add( 2 ));
	console.log(jStat([[1,-2,-3]]).abs());
	var A=[[1,2,3],
        [1,1,0],
        [1,-2,3],
        [1,3,4],
        [1,-10,2],
        [1,4,4],
        [1,10,2],
        [1,3,2],
        [1,4,-1]];
	var b=[1,-2,3,4,-5,6,7,-8,9];
	var model=jStat.models.ols(b,A);
	// coefficient estimated
	model.coef // -> [0.662197222856431, 0.5855663255775336, 0.013512111085743017]
	// R2
	model.R2 // -> 0.309
	// t test P-value
	model.t.p // -> [0.8377444317889267, 0.15296736158442314, 0.9909627983826583]
	// f test P-value
	model.f.pvalue // -> 0.3306363671859872
	console.log(jStat.beta.mean(1,2));
	console.log(jStat.beta.sample(1,2));
	console.log(jStat.cauchy.pdf(1,2,3));
});
