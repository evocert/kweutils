/*
 * http://localhost/requirejsexcercise/lib/vendor/jqueryterminal/wcwidth.js?cachebust=1608624870409
 * Uncaught ReferenceError: module is not defined
 *     <anonymous> jQuery
 */
define(['module','jquery.terminal'],function(module,jqt){
	console.log([module.id,'start'].join(':'))
	console.log(jqt);
});
