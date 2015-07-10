angular.module('ModelRelease.services', ['ngCordova','ModelRelease.config'])
// SQLite DB wrapper
.factory('DB', function($q, DB_CONFIG, $cordovaSQLite) {
    var self = this;
    self.db = null;

    self.init = function() {

        self.db = $cordovaSQLite.openDB( DB_CONFIG.name );

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            self.query('CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')');

        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        $cordovaSQLite.execute(self.db, query, bindings).then(function(result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
})
.factory('People', function(DB) {
    var self = this;

    self.all = function() {
        return DB.query('SELECT * FROM people')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.getById = function(id) {
        return DB.query('SELECT * FROM people WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    return self;
})
.factory('Contract', function(DB) {
    var self = this;

    self.all = function() {
        return DB.query('SELECT * FROM contract')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.getById = function(id) {
        return DB.query('SELECT * FROM contract WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    return self;
});
