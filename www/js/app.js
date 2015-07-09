angular.module('ModelRelease', ['ngRoute','ngCordova','ngMdIcons','ngMaterial'])

.filter('filterByProperty', function() {
    return function(items, propMatch) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            for (var property in propMatch) {
                if (propMatch[property] == item[property]) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
})

.service('$dataContracts', function($filter) {
    var items = [];
    return {
        mock: function() {
            items = [{
                "id": 1,
                "label": "contract 1",
                "selected": false
            }, {
                "id": 2,
                "label": "contract 2",
                "selected": true
            }, {
                "id": 3,
                "label": "contract 3",
                "selected": false
            }];
            return items;
        },
        getById: function(id) {
            return $filter('filterByProperty')(items, {
                id: id
            });
        },
        get: function() {
            return items;
        },
        add: function(item) {
            items.push(item);
        },
        set: function(value) {
            items = value;
        }
    };
})

.config(function($routeProvider, $mdThemingProvider) {
    $routeProvider
        .when('/',{
            controller: 'DashboardController as dashboard',
            templateUrl: 'templates/dashboard.html'
        })
        .when('/contract/:id', {
            controller: 'ContractController as contract',
            templateUrl: 'templates/contract.html'
        })
        .when('/photographer/:id', {
            controller: 'PhotographerController as photographer',
            templateUrl: 'templates/photographer.html'
        })
        .when('/talent/:id', {
            controller: 'TalentController as talent',
            templateUrl: 'templates/talent.html'
        })
        .when('/signature', {
            controller: 'SignatureController as signature',
            templateUrl: 'templates/signature.html'
        })
        .when('/settings', {
            controller: 'SettingsController as settings',
            templateUrl: 'templates/settings.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('cyan');
})

.directive('appToolbar', function() {
  return {
      scope: {},
      restrict: 'E',
      templateUrl: 'templates/app-toolbar.html',
      controller: function($scope, $location, $mdDialog) {
          $scope.goToHome = function(){
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
          $scope.goToList = function(ev){
              $location.path('/');
          };
          $scope.addModel = function(ev){
              $location.path('/talent/new');
          };
          $scope.goToSettings = function(){
            $location.path('/settings');
          };
        }
  };
})

.controller('DashboardController',function( $scope, $location, $cordovaActionSheet, $dataContracts ){
    window.screen.unlockOrientation();
    $dataContracts.mock();
    $scope.contracts = $dataContracts.get();
    $scope.goToCreate  = function(event){
        $location.path( '/contract/new' );
    };
    $scope.goToContract = function(contract,$event){
        console.log(contract);
        $location.path( '/contract/' + contract.id );
    };
    $scope.shareContract = function( contract ){
        console.log(contract);
        var shareOptions = {
            title: "How do you want to share this contract?",
            buttonLabels: ['Email', 'Text Message', 'Export PDF'],
            addCancelButtonWithLabel: 'Cancel',
            androidEnableCancelButton : true,
            winphoneEnableCancelButton : true
        };
        $cordovaActionSheet
            .show(shareOptions)
            .then(function(btnIndex) {
                alert( 'You selected: ' + shareOptions.buttonLabels[ btnIndex-1 ] + " : " + btnIndex);
            });
    };
})
.controller('PhotographerController',function( $scope ){
    window.screen.unlockOrientation();
})
.controller('TalentController',function( $scope ){
    window.screen.unlockOrientation();
})

.controller('ContractController', function($scope, $location, $routeParams, $dataContracts) {
    console.log("$scope", $scope, '$location', $location, '$routeParams', $routeParams);
    var contract = this;

    if( $routeParams.id === 'new' ){
        contract.contract = {
            id:'new',
            label: 'New Contract'
        };
    } else {
        contract.contract = $dataContracts.getById( $routeParams.id );
    }
    alert( $routeParams.id );
})

.controller('SignatureController',function( $scope, $location ){

    window.screen.lockOrientation('landscape');

    var signature = this;
    var $sigdiv = $("#signature")
    $sigdiv.jSignature();

    $scope.reset = function(){
        $sigdiv.jSignature("reset");
    };
    $scope.goToBack = function(){
        $location.path('/');
    };
    $scope.goToSave = function(){
        $location.path('/');
    };
})

.controller('SettingsController', function($scope, $location, $routeParams, $cordovaAppVersion) {
    console.log("$scope", $scope, '$location', $location, '$routeParams', $routeParams);
    var settings = this;
    settings.app_stats = [
        {key:'version', label:'Application Version', value:'loading'}
    ];

    $cordovaAppVersion.getAppVersion().then(function (version) {
        for(var i=0;i<settings.app_stats.length;i++){
            if( settings.app_stats[i].key === 'version' ){
                settings.app_stats[i].value = version;
            }
        }
    });
});
