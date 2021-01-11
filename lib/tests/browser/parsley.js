//JavaScript form validation, without actually writing a single line of JavaScript!
//https://github.com/guillaumepotier/Parsley.js
//https://github.com/guillaumepotier/Parsley.js/tree/master/doc
define([
	"module",
	"jquery",
	"parsleyjs",
	"css!/kweutils/css/bootswatch/slate/bootstrap.min"
],function(
	module,
	jq,
	Parsley
){
	console.log([module.id,'start'].join(':'));
	console.log(Parsley);
	{//basic usage
		var form=$(`
			<form data-parsley-validate target="#">
				<input	type="text"
					required
					data-parsley-trigger="change"
					data-parsley-minlength="20"
					data-parsley-maxlength="100"
					data-parsley-minlength-message="Come on! You need to enter at least a 20 character comment.."
					data-parsley-validation-threshold="10"
					class="form-control"
				/>
				<input	type="submit"
					class="btn"
				/>
			</form>
		`);
		/*
			<div class="container"><br/><div class="row"><div class="col-md-12">
				<form data-parsley-validate target="#" class="form-group">
					<label for="test0">Email address</label>
						<input	type="text"
							id="test0"
							data-parsley-trigger="change"
							data-parsley-minlength="20"
							data-parsley-maxlength="100"
							data-parsley-minlength-message="Come on! You need to enter at least a 20 character comment.."
							data-parsley-validation-threshold="10"
							class="form-control form-control-sm"
						/>
					<input	type="submit"
						class="btn btn-sm"
					/>
				</form>
			</div></div></div>
		*/

		$("body").append(form);
		form.parsley().on('field:validated', function(value) {
			console.log('validated:');
			console.log(this);
			console.log(value);
			return false;
		})
	}
});
