//client json store
//https://github.com/brianleroux/lawnchair/
//https://github.com/brianleroux/lawnchair/tree/master/doc
//note:not getting this to work (error:invalid options)
define([
	"module",
	"lawnchair",
],function(
	module,
	Lawnchair
){
	console.log([module.id,'start'].join(':'));
	console.log(Lawnchair);
	{//basic usage
		Lawnchair({name:'people', record:'person'},function(){
			    this.save({msg:'hooray!'})
		});
	}
});
