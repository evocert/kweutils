//Inspired by twitter.com's autocomplete search functionality, typeahead.js is a flexible JavaScript library that provides a strong foundation for building robust typeaheads.
//https://github.com/twitter/typeahead.js
//http://twitter.github.io/typeahead.js/examples/
//http://twitter.github.io/typeahead.js/
//note: modifications made to ./lib/vendor/typeahead/0.11.1/typeahead.jquery.amd.js
define([
	"module",
	"jquery",
	"bloodhound",
	"typeahead",
],function(
	module,
	jq,
	bh,
	th
){
	console.log([module.id,'start'].join(':'));
	console.log(jq);
	console.log(bh);
	console.log(th);
	$=jq;
	{//basic usage
		$("body").append($(`
			<div id="the-basics">
				<input class="typeahead" type="text" placeholder="States of USA">
			</div>
		`));
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
});
	}
});
