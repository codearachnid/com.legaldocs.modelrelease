angular.element(document).ready(function(){
    angular.bootstrap(document, ['SampleApp']);
});
angular.module('SampleApp', ['ngMaterial','ngRoute'])

    .filter('filterByProperty', function(){
        return function( items, propMatch ){
            var filtered = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              for(var property in propMatch){
                if (propMatch[property] == item[property]) {
                  filtered.push(item);
                }
              }
            }
            return filtered;
        };
    })

    .directive('appToolbar', function() {
      return {
          restrict: 'E',
          templateUrl: 'app-toolbar.html'
      };
    })

    .service('sharedItems',function($filter){
        var items= [];
        return{
            mock: function(){
                items = [
                    { "id": 1, "label":"item 1", "selected":false },
                    { "id": 2, "label":"item 2", "selected":true },
                    { "id": 3, "label":"item 3", "selected":false }
                ];
                return items;
            },
            getById: function( id ){
                console.log(items, id);
                return $filter('filterByProperty')( items, {id:id} );
            },
            get: function(){
                return items;
            },
            add: function( item ){
                items.push(item);
            },
            set: function(value){
                items=value;
            }
        };
    })

    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          controller:'ListController as items',
          templateUrl:'list.html'
        })
        .when('/view/:itemId', {
          controller:'ViewItemController as item',
          templateUrl:'view.html'
        })
        .otherwise({
          redirectTo:'/'
        });
    })

    .controller('ListController', function( $scope,$location, $routeParams, sharedItems ){
        console.log("$scope", $scope, '$location',$location,'$routeParams',$routeParams);
        var items = this;

        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
          };


        sharedItems.mock();

        $scope.onSwipeLeft = function(ev) {
         alert('You swiped left!!');
       };
       $scope.onSwipeRight = function(ev) {
         alert('You swiped right!!');
       };

        items.list = sharedItems.get();

        items.additem = function() {
          sharedItems.add({id:0,label:items.newItemLabel, selected:false});
          items.list = sharedItems.get();
          items.newItemLabel = '';
        };
    })

    .controller('ViewItemController', function($scope, $location, $routeParams,sharedItems){
        console.log("$scope", $scope, '$location',$location,'$routeParams',$routeParams);
        //console.log( $routeParams.itemId, sharedItems.get(), sharedItems.getById( $routeParams.itemId ) );
        var item = this; // sharedItems.getById( $routeParams.itemId );
        item.detail = sharedItems.getById( $routeParams.itemId )[0];
        console.log(item);
        // item.id =
    });
