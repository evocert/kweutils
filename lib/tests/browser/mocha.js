//https://stackoverflow.com/questions/42857778/how-do-you-run-mocha-tests-in-the-browser
define([
	"module",
	"jquery",
	"mocha",
	"chai",
	'css!vendor/mocha/8.2.1/mocha.min.css',
],function(
	module,
	jq,
	mocha,
	chai
){
	console.log([module.id,'start'].join(':'));
	console.log(mocha);
	console.log(chai);
	$=jq;
	$("style").remove();
	var mochadiv=$("<div/>").attr("id","mocha");
	$("body").append(mochadiv);
	mocha.setup('bdd');
	for(var i=0;i<32;i++)
		describe('test',()=>{
			it('passes',()=>{
				chai.expect(1).to.eql(1);
			});
			
			it('fails',()=>{
				chai.expect(1).to.eql(2);
			});
		});
	mocha.run();
});
