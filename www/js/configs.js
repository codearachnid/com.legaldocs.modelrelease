angular.module('ModelRelease.config', ['ngRoute','ngMaterial'])
.constant('DB_CONFIG', {
    name: 'ModelRelease.db',
    tables: [{
        name: 'people',
        columns: [{
            name: 'id',
            type: 'integer primary key'
        }, {
            name: 'type',
            type: 'text'
        }, {
            name: 'name',
            type: 'text'
        }, {
            name: 'email',
            type: 'text'
        }, {
            name: 'phone',
            type: 'text'
        }, {
            name: 'address',
            type: 'text'
        }, {
            name: 'dob',
            type: 'datetime'
        }, {
            name: 'signature',
            type: 'text'
        }, {
            name: 'avatar',
            type: 'text'
        }, {
            name: 'photo_id',
            type: 'text'
        }]
    },{
        name: 'contract',
        columns: [{
            name: 'id',
            type: 'integer primary key'
        }, {
            name: 'label',
            type: 'text'
        }, {
            name: 'date',
            type: 'datetime'
        }, {
            name: 'status',
            type: 'text'
        }, {
            name: 'talent_id',
            type: 'integer'
        }, {
            name: 'artist_id',
            type: 'integer'
        }, {
            name: 'talent_signature',
            type: 'text'
        }, {
            name: 'artist_signature',
            type: 'text'
        }]
    }]
})
.config(function($routeProvider, $mdThemingProvider) {
    $routeProvider
        .when('/', {
            controller: 'DashboardController as dashboard',
            templateUrl: 'templates/dashboard.html'
        })
        .when('/contract/:id', {
            controller: 'ContractController',
            templateUrl: 'templates/contract.html'
        })
        .when('/artist/:id', {
            controller: 'ArtistController as artist',
            templateUrl: 'templates/artist.html'
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
        .when('/tour', {
            controller: 'TourController',
            templateUrl: 'templates/tour.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('cyan');
});
