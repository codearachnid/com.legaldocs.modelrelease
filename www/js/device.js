var db = null;
var goToAppTour = false;
var prefs = null;
var device = {
    init: function () {
        if( navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/) ){
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            console.log('detected not on device framework');
            this.onDeviceReady();
        }
    },
    onDeviceReady: function () {
        prefs = plugins.appPreferences;
        navigator.splashscreen.hide();

        prefs.fetch(function(ok){
            if( ok == null || ok != 'false'){
                goToAppTour = true;
            }

            doBootstrap();

        }, doBootstrap, 'goToAppTour');

    }
};
function doBootstrap(){
    angular.element(document).ready(function() {
        angular.bootstrap( document, ['ModelRelease'] );
    });
}
device.init();
