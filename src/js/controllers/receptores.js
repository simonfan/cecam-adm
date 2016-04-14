angular.module('cecamAdm.controllers')

.controller('ReceptoresCtrl', function ($scope, Receptor, $uibModal) {

  function _listReceptores() {
    Receptor.list()
      .then(function (res) {
        $scope.receptores = res.data;
      });
  }

  $scope.deleteReceptor = function (receptor) {
    Receptor.delete(receptor._id)
      .then(function () {
        _listReceptores();
      }, function (err) {

        alert('houve um erro ao deletar a Receptor');

        _listReceptores();
      });
  }

  $scope.openNewReceptorModal = function () {

    $scope.newReceptorModal = $uibModal.open({
      // animation: $scope.animationsEnabled,
      templateUrl: 'templates/receptores/new-modal.html',
      controller: function NewReceptorModalCtrl($scope) {

        $scope.newReceptor = {};

        $scope.createReceptor = function () {

          if (!$scope.newReceptor.nome) {
            alert('Nome é um campo requerido');
            return;
          }

          Receptor.create($scope.newReceptor)
            .then(function (receptorData) {

              _listReceptores();
              $scope.$close();
            }, function (err) {
              alert('ocorreu um erro ao salvar os dados, por favor tente novamente mais tarde');
              $scope.$close();
            });
        };
      }
    });
  }

  // initialize
  _listReceptores();

});
