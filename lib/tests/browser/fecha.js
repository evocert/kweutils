//Lightweight date formatting and parsing (~2KB). Meant to replace parsing and formatting functionality of moment.js.
//                                      Fecha   Moment
//      Size (Min. and Gzipped)         2.1KBs  13.1KBs
//      Date Parsing                    *       *
//      Date Formatting                 *       *
//      Date Manipulation                       *
//      I18n Support                    *       *
//https://github.com/taylorhakes/fech
define([
	"module",
	"console",
	"cyclejs",
	"fecha",
],function(
	module,
	console,
	cyclejs,
	fecha
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(fecha));
	{//basic usage
		// Custom fecha.formats
		console.log(fecha.format(new Date(2015, 10, 20), 'dddd MMMM Do, YYYY')); // 'Friday November 20th, 2015'
		console.log(fecha.format(new Date(1998, 5, 3, 15, 23, 10, 350), 'YYYY-MM-DD hh:mm:ss.SSS A')); // '1998-06-03 03:23:10.350 PM'

		// Named masks
		console.log(fecha.format(new Date(2015, 10, 20), 'isoDate')); // '2015-11-20'
		console.log(fecha.format(new Date(2015, 10, 20), 'mediumDate')); // 'Nov 20, 2015'
		console.log(fecha.format(new Date(2015, 10, 20, 3, 2, 1), 'isoDateTime')); // '2015-11-20T03:02:01-05:00'
		console.log(fecha.format(new Date(2015, 2, 10, 5, 30, 20), 'shortTime')); // '05:30'

		// Literals
		console.log(fecha.format(new Date(2001, 2, 5, 6, 7, 2, 5), '[on] MM-DD-YYYY [at] HH:mm')); // 'on 03-05-2001 at 06:07'
	}
	{//parsing
		/*
		var parse = fecha.parse;//(dateStr: string, format: string, i18n?: I18nSettingsOptional) => Date|null;

		// Custom formats
		parse('February 3rd, 2014', 'MMMM Do, YYYY'); // new Date(2014, 1, 3)
		parse('10-12-10 14:11:12', 'YY-MM-DD HH:mm:ss'); // new Date(2010, 11, 10, 14, 11, 12)

		// Named masks
		parse('5/3/98', 'shortDate'); // new Date(1998, 4, 3)
		parse('November 4, 2005', 'longDate'); // new Date(2005, 10, 4)
		parse('2015-11-20T03:02:01-05:00', 'isoDateTime'); // new Date(2015, 10, 20, 3, 2, 1)

		// Override i18n
		parse('4 de octubre de 1983', 'M de MMMM de YYYY', {
		  monthNames: [
		    'enero',
		    'febrero',
		    'marzo',
		    'abril',
		    'mayo',
		    'junio',
		    'julio',
		    'agosto',
		    'septiembre',
		    'octubre',
		    'noviembre',
		    'diciembre'
		  ]
		}); // new Date(1983, 9, 4)
		*/
	}
	{//i18n
		setGlobalDateI18n=fecha.setGlobalDateI18n

		/*
		Default I18n Settings
		{
		  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
		  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		  amPm: ['am', 'pm'],
		  // D is the day of the month, function returns something like...  3rd or 11th
		  DoFn(dayOfMonth) {
		    return dayOfMonth + [ 'th', 'st', 'nd', 'rd' ][ dayOfMonth % 10 > 3 ? 0 : (dayOfMonth - dayOfMonth % 10 !== 10) * dayOfMonth % 10 ];
		  }
		}
		*/

		setGlobalDateI18n({
		  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
		  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		  amPm: ['am', 'pm'],
		  // D is the day of the month, function returns something like...  3rd or 11th
		  DoFn: function (D) {
		    return D + [ 'th', 'st', 'nd', 'rd' ][ D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10 ];
		  }
		});
	}
	{//custom named masks
		//import { format, setGlobalDateMasks } from 'fecha';
		format=fecha.format;
		setGlobalDateMasks=fecha.setGlobalDateMasks;
		/*
		Default global masks
		{
		  default: 'ddd MMM DD YYYY HH:mm:ss',
		  shortDate: 'M/D/YY',
		  mediumDate: 'MMM D, YYYY',
		  longDate: 'MMMM D, YYYY',
		  fullDate: 'dddd, MMMM D, YYYY',
		  shortTime: 'HH:mm',
		  mediumTime: 'HH:mm:ss',
		  longTime: 'HH:mm:ss.SSS'
		}
		*/

		// Create a new mask
		setGlobalDateMasks({
		  myMask: 'HH:mm:ss YY/MM/DD'
		});

		// Use it
		console.log(format(new Date(2014, 5, 6, 14, 10, 45), 'myMask')); // '14:10:45 14/06/06'
	}
});
