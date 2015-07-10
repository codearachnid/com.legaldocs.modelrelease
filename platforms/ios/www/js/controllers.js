angular.module('ModelRelease.controllers', ['ngRoute', 'ngCordova', 'ngMdIcons', 'ngMaterial', 'ModelRelease.config', 'ModelRelease.services', 'ModelRelease.directives'])
.controller('TourController', function($scope, $location) {
    $scope.finishTour = function() {
        goToAppTour = false;
        prefs.store(function(ok) {
            $location.path('/');
        }, function(fail) {}, 'goToAppTour', 'false');
    }
})
.controller('DashboardController', function($scope, $location, $cordovaActionSheet) {
    window.screen.unlockOrientation();
    $scope.contracts = [];

    $scope.goToCreate = function(event) {
        $location.path('/contract/new');
    };
    $scope.goToContract = function(contract, $event) {
        // console.log(contract);
        $location.path('/contract/' + contract.id);
    };
    $scope.shareContract = function(contract) {
        console.log(contract);
        var shareOptions = {
            title: "How do you want to share this contract?",
            buttonLabels: ['Email', 'Text Message', 'Export PDF'],
            addCancelButtonWithLabel: 'Cancel',
            androidEnableCancelButton: true,
            winphoneEnableCancelButton: true
        };
        $cordovaActionSheet
            .show(shareOptions)
            .then(function(btnIndex) {
                alert('You selected: ' + shareOptions.buttonLabels[btnIndex - 1] + " : " + btnIndex);
            });
    };
})
.controller('ArtistController', function($scope) {
    window.screen.unlockOrientation();
})
.controller('TalentController', function($scope) {
    window.screen.unlockOrientation();
})
.controller('ContractController', function($scope, $location, $routeParams) {
    console.log("$scope", $scope, '$location', $location, '$routeParams', $routeParams);
    var contract = this;

    // var self = $scope;
    $scope.querySearch = querySearch;
    $scope.allContacts = loadContacts();
    $scope.contacts = [$scope.allContacts[0]];
    $scope.filterSelected = true;
    /**
     * Search for contacts.
     */
    function querySearch(query) {
        var results = query ?
            $scope.allContacts.filter(createFilterFor(query)) : [];
        return results;
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
            return (contact._lowername.indexOf(lowercaseQuery) != -1);;
        };
    }

    function loadContacts() {
        var contacts = [
            'Marina Augustine',
            'Oddr Sarno',
            'Nick Giannopoulos',
            'Narayana Garner',
            'Anita Gros',
            'Megan Smith',
            'Tsvetko Metzger',
            'Hector Simek',
            'Some-guy withalongalastaname'
        ];
        return contacts.map(function(c, index) {
            var cParts = c.split(' ');
            var contact = {
                name: c,
                email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
                image: 'http://lorempixel.com/50/50/people?' + index
            };
            contact._lowername = contact.name.toLowerCase();
            return contact;
        });
    }



    if ($routeParams.id === 'new') {
        $scope.contract = {
            id: 'new',
            label: 'New Contract'
        };
    } else {
        $scope.contract = {
            id: 'new',
            label: 'New Contract'
        };
        // console.log($routeParams.id, $dataContracts.getById($routeParams.id));
        // var foundContract = $dataContracts.getById($routeParams.id);
        // if (foundContract.length > 0) {
        //     $scope.contract = foundContract[0];
        // }
    }
    // alert( $routeParams.id );
})
.controller('SignatureController', function($scope, $location) {

    window.screen.lockOrientation('landscape');

    var signature = this;
    var $sigdiv = $("#signature")
    $sigdiv.jSignature();

    $scope.reset = function() {
        $sigdiv.jSignature("reset");
    };
    $scope.goToBack = function() {
        $location.path('/');
    };
    $scope.goToSave = function() {
        $location.path('/');
    };
})
.controller('SettingsController', function($scope, $location, $routeParams, $cordovaAppVersion) {
    console.log("$scope", $scope, '$location', $location, '$routeParams', $routeParams);
    var settings = this;

    settings.app_stats = [{
        key: 'version',
        label: 'Application Version',
        value: 'loading'
    }, {
        key: 'contract_count',
        label: 'Contracts',
        value: 'loading'
    }, {
        key: 'talent_count',
        label: 'Talents',
        value: 'loading'
    }, {
        key: 'artist_count',
        label: 'Artists',
        value: 'loading'
    }, ];

    $cordovaAppVersion.getAppVersion().then(function(version) {
        setValue('version', version)
    });

    settings.setting = {
        goToAppTour: false
    };

    prefs.fetch(function(ok) {
        if (ok == null || ok != 'false') {
            settings.setting.goToAppTour = true;
        }
    }, function() {}, 'goToAppTour');

    $scope.resetTour = function() {
        settings.setting.goToAppTour = true;
        prefs.remove(function() {}, function() {}, 'goToAppTour');
    };

    function setValue(key, value) {
        for (var i = 0; i < settings.app_stats.length; i++) {
            if (settings.app_stats[i].key === key) {
                settings.app_stats[i].value = version;
            }
        }
    }
});
