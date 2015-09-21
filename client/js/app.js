angular.module('RepsApp', [
  'RepsAppController'
]);

angular.module('RepsAppController', ['repsService'])
  .controller('MainCtrl', function(reps){
    var main = this;
    main.reps = [];

      main.searchByZip = function(zip){
        reps.allByZip(zip).then(function (data){
          main.reps = data;
          });
      };

      main.searchRepsByName = function (name) {
        reps.repsByName(name).then(function (data) {
          main.reps = data;
        });
      }
  });


angular
  .module('repsService' , [])
  .factory('reps', function ($http){
    var host = 'http://dgm-representatives.herokuapp.com/'

    return{
      allByZip: function(zip) {
        return $http
        .get( host + 'all/by-zip/' + zip)
        .then(function (response) {
          return response.data;
        });
      },
      
      repsByName: function (name) {
        return $http
        .get(host + 'reps/by-name/' + name)
        .then(function (response){
          return response.data;
        });
      }
    };
  });
