/*
 * jsCalendar language extension
 * Add Afrikaans Language support
 * Translator: Ockert van Schalkwyk (skullquake@gmail)
 */

// We love anonymous functions
(function(){

    // Get library
    var jsCalendar = window.jsCalendar;

    // If jsCalendar is not loaded
    if (typeof jsCalendar === 'undefined') {
        // If there is no language to load array
        if (typeof window.jsCalendar_language2load === 'undefined') {
            window.jsCalendar_language2load = [];
        }
        // Wrapper to add language to load list
        jsCalendar = {
            addLanguage : function (language) {
                // Add language to load list
                window.jsCalendar_language2load.push(language);
            }
        };
    }

    // Add a new language
    jsCalendar.addLanguage({
        // Language code
        code : 'af',
        // Months of the year
        months : [
            'Januarie',
            'Februarie',
            'Maart',
            'April',
            'Mei',
            'Junie',
            'Julie',
            'Augustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ],
        // Days of the week
        days : [
            'Sondag',
            'Maandag',
            'Dinsdag',
            'Woensdag',
            'Donderdag',
            'Vrydag',
            'Saterdag'
        ]
    });

})();
