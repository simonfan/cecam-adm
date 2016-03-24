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


  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html'
  })

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

});