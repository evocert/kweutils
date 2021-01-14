//http://worrydream.com/Tangle/guide.html
//https://github.com/worrydream/Tangle
//note: demo not working properly, variable not draggable
define([
	"module",
	"jquery",
	"tangle",
	"css!vendor/tangle/0.1.0/style.css"
],function(
	module,
	jq,
	Tangle
){
	console.log([module.id,'start'].join(':'));
	console.log(Tangle);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage

		var el=$(`
			<p id="calorieCalculator">
				When you eat
				<span class="TKAdjustableNumber" data-var="cookies"> cookies</span>,
				you consume
				<b data-var="calories"> calories</b>.
				That's
				<span data-var="dailyPercent">%</span>
				of your recommended daily calories.
			</p>
		`);
		$("body").append(el);
		var tangle=new Tangle(el[0],{
			initialize:function(){
				this.cookies=3;
				this.caloriesPerCookie=50;
				this.dailyCalories=2100;
				},
			update:function(){
				this.calories=this.cookies*this.caloriesPerCookie;
				this.dailyPercent=100*this.calories/this.dailyCalories;
				}
		});
	}
});
