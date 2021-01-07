//A JavaScript date library for parsing, validating, manipulating, and formatting dates.
//https://github.com/moment/moment
//https://momentjs.com/docs/
/*

*note: nice require examples, as well as system.js and so on
requirejs.config({
  packages: [{
    name: 'moment',
    // This location is relative to baseUrl. Choose bower_components
    // or node_modules, depending on how moment was installed.
    location: '[bower_components|node_modules]/moment',
    main: 'moment'
  }]
});

require.config({
    config: {
        moment: {
            noGlobal: true
        }
    }
});
 */
define([
	"module",
	"console",
	"cyclejs",
	"moment",
],function(
	module,
	console,
	cyclejs,
	moment
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(moment));
	{//basic
		console.log(moment().format('LLLL'));
	}
	{//from string
		console.log(moment("1995-12-25"));
	}
	{
		console.log(moment("12-25-1995", "MM-DD-YYYY"));
		console.log(moment("12/25/1995", "MM-DD-YYYY"));
	}
	{//validation
		console.log(moment("2010 13",           "YYYY MM").isValid());     // false (not a real month)
		console.log(moment("2010 11 31",        "YYYY MM DD").isValid());  // false (not a real day)
		console.log(moment("2010 2 29",         "YYYY MM DD").isValid());  // false (not a leap year)
		console.log(moment("2010 notamonth 29", "YYYY MMM DD").isValid()); // false (not a real month name)
	}
	{//lang
		console.log(moment('2012 juillet', 'YYYY MMM', 'fr'));
		console.log(moment('2012 July',    'YYYY MMM', 'en'));
		console.log(moment('2012 July',    'YYYY MMM', ['qj', 'en']));
	}
	{//parsing two digit years
		parseTwoDigitYear = function(yearString) {
		    return parseInt(yearString) + 2000;
		}
		console.log(parseTwoDigitYear(42));
	}
	{//parsing glued hours and minuts
		console.log(moment("123", "hmm").format("HH:mm") === "01:23");
		console.log(moment("1234", "hmm").format("HH:mm") === "12:34");
	}
	{//string plus multiple formats
		console.log(moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]));
	}
	{//special formats
		console.log(moment("2010-01-01T05:06:07", moment.ISO_8601));
		console.log(moment("2010-01-01T05:06:07", ["YYYY", moment.ISO_8601]));
	}
	{//from object
		console.log(moment({ hour:15, minute:10 }));
		console.log(moment({ y    :2010, M     :3, d   :5, h    :15, m      :10, s      :3, ms          :123}));
		console.log(moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123}));
		console.log(moment({ years:2010, months:3, days:5, hours:15, minutes:10, seconds:3, milliseconds:123}));
		console.log(moment({ years:2010, months:3, date:5, hours:15, minutes:10, seconds:3, milliseconds:123}));
		console.log(moment({ years:'2010', months:'3', date:'5', hours:'15', minutes:'10', seconds:'3', milliseconds:'123'}));  // from 2.11.0
	}
	{//unix timestamp - milliseconds
		console.log(moment(1318781876406));
	}
	{//unix timestamp - seconds
		console.log(moment.unix(1318781876));
	}
	{//wrap date
		console.log(moment(new Date(2011, 9, 16)));
	}
	{//array
		console.log(moment([2010, 1, 14, 15, 25, 50, 125])); // February 14th, 3:25:50.125 PM
	}
	{//clone
		var a = moment([2012]);
		var b = moment(a);
		a.year(2000);
		console.log(b.year()); // 2012
	}
	{//format
		console.log(moment().format());
	}
	{//format utc
		console.log(moment().utc().format());
	}
});
