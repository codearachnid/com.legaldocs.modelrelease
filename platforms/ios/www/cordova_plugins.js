cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/nl.x-services.plugins.calendar/www/Calendar.js",
        "id": "nl.x-services.plugins.calendar.Calendar",
        "clobbers": [
            "Calendar"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.calendar/test/tests.js",
        "id": "nl.x-services.plugins.calendar.tests"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "nl.x-services.plugins.calendar": "4.3.6"
}
// BOTTOM OF METADATA
});