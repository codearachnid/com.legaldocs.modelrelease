angular.module('ModelRelease.directives', [ 'ngRoute','ngMaterial' ])
.directive('appToolbar', function() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'templates/app-toolbar.html',
        controller: function($scope, $location, $mdDialog) {
            $scope.goToHome = function() {
                $location.path('/');
            };
            $scope.loveApp = function(ev) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Rate the app!')
                    .content('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            };
            $scope.goToList = function(ev) {
                $location.path('/');
            };
            $scope.addModel = function(ev) {
                $location.path('/talent/new');
            };
            $scope.goToSettings = function() {
                $location.path('/settings');
            };
        }
    };
});
