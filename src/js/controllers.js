angular.module('cecamAdm.controllers', [])

.controller('AppCtrl', function ($scope) {

})

.controller('EstoqueCtrl', function ($scope, Operacoes) {

  $scope.operacoes = Operacoes;

});