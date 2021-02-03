define([
	"module",
	"jquery",
	"jquery.jsonForm",
	"jsv",
	"jsonform",
	"css!vendor/bootswatch/4.5.2/slate/bootstrap.css"
],function(
	module,
	jq,
	obj0,
	obj1
){
	console.log([module.id,'start'].join(':'));
	console.log(obj0);
	console.log(obj1);
	$=jq;
	window['$']=jq;
	{//basic usage
		var form=$("<form/>");
		$("body").append([
			$("<div/>").addClass(["container"]).append([
				$("<br/>"),
				$("<div/>").addClass(["row"]).append([
					$("<div/>").addClass(["col-md-12"]).append([
						$("<div/>").addClass(["card"]).append([
							$("<div/>").addClass(["card-body"]).append([
								$("<h5/>").addClass(["card-title"]).text("JSON Form"),
								form
							])
						])
					])
				])
			])
		]);
		form.jsonForm({
			schema: {
				name: {
					type: 'string',
					title: 'Name',
					required: true
				},
				age: {
					type: 'number',
					title: 'Age'
				}
			},
			onSubmit: function (errors, values) {
				if (errors) {
					$('#res').html('<p>I beg your pardon?</p>');
				}
				else {
					$('#res').html('<p>Hello ' + values.name + '.' +
						(values.age ? '<br/>You are ' + values.age + '.' : '') +
						'</p>');
				}
			}
		});
	}
});
