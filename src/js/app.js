angular.module('cecamAdm', [
  'cecamAdm.controllers',
  'cecamAdm.services',
  'firebase',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('estoque', {
    url: '/estoque',
    templateUrl: 'templates/estoque.html',
    controller: 'EstoqueCtrl',
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/estoque');

});