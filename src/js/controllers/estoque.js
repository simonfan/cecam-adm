angular.module('cecamAdm.controllers')

.controller('EstoqueCtrl', function ($scope, Estoque, $uibModal, $timeout) {

  Estoque.getResumo()
    .then(function (response) {
      $scope.resumo = response.data;
    });

  $scope.openModalDistribuir = function (resumo) {
    var modalInstance = $uibModal.open({
      // animation: $scope.animationsEnabled,
      templateUrl: 'templates/modal-distribuir.html',
      controller: 'DistribuicaoCtrl',
      resolve: {
        resumo: function () {
          return resumo
        },
      }
    });
  };

});