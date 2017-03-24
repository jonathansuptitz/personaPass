var app = angular.module('personalPass', ['ionic', 'ngCordova', 'pouchdb'])
.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/",
    templateUrl: "views/login.html",
    controller: 'LoginCtrl'
  })
  .state('lista', {
    url: "/lista",
    templateUrl: "views/lista.html",
    controller: 'ListaCtrl'
  });

  $urlRouterProvider.otherwise('/');
})
  //------------------------------------------------------------------------------------------------------------------//
  .service('Database', function (pouchDB, $q) {
    var Database = function (databaseName) {
      this._db = pouchDB(databaseName, {adapter: 'websql'});
    };
    Database.prototype.all = function () {
      var options = {
        include_docs: true
      };
      return $q.when(this._db.allDocs(options)).then(function (result) {
        var converted;
        converted = result.rows.map(function (element) {
          return element.doc;
        });
        return converted;
      });
    };
    Database.prototype.get = function (id) {
      return this._db.get(id);
    };
    Database.prototype.create = function (record) {
      return this._db.put(record);
    };
    Database.prototype.remove = function (record) {
      return this._db.remove(record);
    };
    Database.prototype.destroy = function () {
      return db.destroy();
    };
    return Database;
  });
