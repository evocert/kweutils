//Modern javascript i18n localization library based on ES6 tagged templates and the good old GNU gettext
//https://github.com/ttag-org/ttag
define([
	"module",
	"ttag",
	"text!data/po/ca.po.json"
],function(
	module,
	ttag,
	po_ca
){
	console.log([module.id,'start'].join(':'));
	console.log(ttag);
	{//basic usage
		t=ttag.t;
		ngettext=ttag.ngettext;
		msgid=ttag.msgid;
		function startCount(n){
		    console.log(t`starting count up to ${n}`); // using 't' tag for 1 to 1 translations
		    for (let i = 0; i <= n; i++) {
		       // use ngettext function for handling plural forms
		       console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i));
		    }
		}
		startCount(8);
	}
	{//.po files
		ngettext=ttag.ngettext;
		msgid=ttag.msgid;
		t=ttag.t;
		addLocale=ttag.addLocale;
		useLocale=ttag.useLocale;
		po_ca_obj=JSON.parse(po_ca);
		addLocale("ca",po_ca_obj);
		/*
ca.po.json
de.po.json
en.po.json
es.po.json
fr.po.json
it.po.json
ja.po.json
no.po.json
pl.po.json
ru.po.json
		*/
	}
});
