Application preferences Cordova plugin.
-----------------------

Store and fetch application preferences using platform facilities.
Compatible with Cordova 3+

Upgrade
---

If you used this plugin before cordova@5.0.0, you'll have to reinstall it:

	$ cordova plugin rm me.apla.cordova.app-preferences
	$ cordova plugin add cordova-plugin-app-preferences

Installing
---

From plugin registry:

	$ cordova plugin add cordova-plugin-app-preferences

From the repo:

	$ cordova plugin add https://github.com/apla/me.apla.cordova.app-preferences

From a local clone:

	$ cordova plugin add /path/to/me.apla.cordova.app-preferences/folder


More information:
[Command-line Interface Guide](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface).

[Using Plugman to Manage Plugins](http://cordova.apache.org/docs/en/edge/guide_plugin_ref_plugman.md.html).


Synopsis
---

```javascript

function ok (value) {}
function fail (error) {}


var prefs = plugins.appPreferences;

// store key => value pair
prefs.store (ok, fail, 'key', 'value');

// store key => value pair in dict (see notes)
prefs.store (ok, fail, 'dict', 'key', 'value');

// fetch value by key (value will be delivered through "ok" callback)
prefs.fetch (ok, fail, 'key');

// fetch value by key from dict (see notes)
prefs.fetch (ok, fail, 'dict', 'key');

// remove value by key
prefs.remove (ok, fail, 'key');

// show application preferences
prefs.show (ok, fail);

// support for iOS suites (untested)
var suitePrefs = prefs.iosSuite ("suiteName");
suitePrefs.fetch (...);
suitePrefs.store (...);

```

Platforms
---
1. Native execution on iOS using `NSUserDefaults`
1. Native execution on Android using `android.content.SharedPreferences`
1. Native execution on Windows Phone using `IsolatedStorageSettings.ApplicationSettings`
1. Native execution on Windows 8 using `IsolatedStorageSettings.ApplicationSettings`
1. Execution on BlackBerry10 fallback using `localStorage`

Notes
---
1. iOS, Android and Windows Phone basic values (`string`, `number`, `boolean`) are stored using typed fields.
1. Complex values, such as arrays and objects, are always stored using JSON notation.
1. Dictionaries are supported on iOS and Windows 8 only, so on other platforms instead of using the real dictionary a composite key will be written like `<dict>.<key>`
1. On iOS dictionaries just a key, so appPrefs.store ('dict', 'key', value) and appPrefs.store ('dict', {'key': value}) have same meaning (but different result).

Tests
---
Tests are available in `src/test.js`. After installing plugin you can add test code from this file and then launch `testPlugin()` function.

iOS, Android, BlackBerry 10 and Windows Phone 8 tests pass ok at the moment.

Preferences interface generator
---
You can find preliminary version of `Settings.bundle` generator in `bin/build-app-settings.js`.

#### Usage: ####

0. Install npm dependencies for the settings generator:
`npm install plist`
`npm install libxmljs`

1. Copy example settings JSON to your project folder:
`cp plugins/me.apla.cordova.app-preferences/app-settings.json .`

2. Edit JSON to include the controls you need...

3. Generate settings resources with this command:
`node plugins/me.apla.cordova.app-preferences/bin/build-app-settings.js`

4. Add generated Settings.bundle to your iOS project.

Supported controls for iOS:
* group
* combo
* switch
* textfield

Supported controls for Android:
* group
* combo
* switch - not tested
* textfield - not tested

TODO: Windows Phone ([guide](http://blogs.msdn.com/b/glengordon/archive/2012/09/17/managing-settings-in-windows-phone-and-windows-8-store-apps.aspx), [docs](https://msdn.microsoft.com/en-US/library/windows/apps/ff769510\(v=vs.105\).aspx))

Credits
---

Original version for iOS:
https://github.com/phonegap/phonegap-plugins/tree/master/iOS/ApplicationPreferences

Another android implementation for cordova 2.x:
https://github.com/macdonst/AppPreferences
