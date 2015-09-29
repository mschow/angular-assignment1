angular.module('RepsApp', [
  'RepsAppController'
]);

angular.module('RepsAppController', ['repsService'])
  .controller('MainCtrl', function(reps){
    var main = this;
    main.reps = [];
    main.congressType = 'reps';
    main.loading = false;

    main.apis = [
      {
        label: 'Zip',
        method: function (zip){
          main.loading = true;
          reps('all', 'zip', zip).then(function (data){
            main.reps = data;
            main.loading = false;
          });
        }
      },
      {
        label: 'Name',
        method: function (name){
          main.loading = true;
          reps(main.congressType, 'name', name).then(function (data) {
            main.reps = data;
            main.loading = false;
          });
        }
      },
      {
        label: 'State',
        method: function (state){
          main.loading = true;
          reps(main.congressType, 'state', state).then(function (data) {
            main.reps = data;
            main.loading = false;
          });
        }
      }
    ];

    main.criteria = main.apis[0];

      main.searchByZip = function(zip){
        reps.allByZip(zip).then(function (data){
          main.reps = data;
          });
      };

      main.searchRepsByName = function (name) {
        reps.repsByName(name).then(function (data) {
          main.reps = data;
        });
      };

      main.searchRepsByState = function (state) {
        reps.repsByState(state).then(function (data){
          main.reps = data;
        });
      };

      main.searchSensByName = function (senName) {
        reps.sensByName(senName).then(function (data){
          main.reps = data;
        });
      };

      main.searchSensByState = function (senState) {
        reps.sensByState(senState).then(function (data){
          main.reps = data;
        });
      };
  });


angular
  .module('repsService' , [])
  .factory('reps', function ($http){
    var host = 'http://dgm-representatives.herokuapp.com/'

    function search(type, criteria, query) {
      return $http
      .get(host + type + '/by-' + criteria + '/' + query)
      .then(function(response) {
        return response.data
      });
    }

    search.loading = false;

    //Runs the search function putting "all" and "zip" into the first two fields. "Null" is assigned to "search.this"
    /* search.allByZip = search.bind(null, 'all', 'zip');
    search.repsByName = search.bind(null, 'reps', 'name');
    search.repsByState = search.bind(null, 'reps', 'state');
    search.sensByName = search.bind(null, 'sens', 'name');
    search.sensByState = search.bind(null, 'sens', 'state'); */

return search;
});
