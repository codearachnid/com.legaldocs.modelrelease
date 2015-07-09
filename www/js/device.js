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
        navigator.splashscreen.hide();

        // bootstrap angular to load after cordova is ready
        angular.element(document).ready(function() {
            angular.bootstrap( document, ['ModelRelease'] );
        });
    }
};
device.init();
