angular.module('cecamAdm', [
  'cecamAdm.controllers',
  'cecamAdm.services',
  'firebase',
  'ui.router',
  'ui.bootstrap',
  'ui.grid'
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  
  .state('estoque', {
    url: '/estoque',
    templateUrl: 'templates/estoque.html',
    controller: 'EstoqueCtrl',
  })

  .state('operacoes', {
    url: '/operacoes',
    templateUrl: 'templates/operacoes.html',
    controller: 'OperacoesCtrl',
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/estoque');

})

// http interceptor that shows loading indicator on ajax request
.config(['$httpProvider', function($httpProvider) {

  // alternatively, register the interceptor via an anonymous factory
  $httpProvider.interceptors.push(function($q, $rootScope) {
    return {
      request: function(config) {

        $rootScope.isLoading = true;

        return config;
      },

      // optional method
      requestError: function(rejection) {
        // do something on error
        
        $rootScope.isLoading = false;

        return $q.reject(rejection);
      },

      response: function(response) {

        $rootScope.isLoading = false;

        // same as above
        return response;
      },

      // optional method
      responseError: function(rejection) {
        // do something on error
        $rootScope.isLoading = false;

        return $q.reject(rejection);
      }
    };
  });
}]);

