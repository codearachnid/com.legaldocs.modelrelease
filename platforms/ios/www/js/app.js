angular.module('ModelRelease', [ 'ngRoute', 'ModelRelease.config', 'ModelRelease.services', 'ModelRelease.controllers'])
.run(function($rootScope, $location, DB) {
    // SQLite service init
    DB.init();
    // register listener to watch route changes for first time app users
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if (goToAppTour && next.templateUrl != "templates/tour.html") {
            $location.path("/tour");
        }
    });

});
