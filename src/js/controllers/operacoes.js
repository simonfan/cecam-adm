angular.module('cecamAdm.controllers')

.controller('OperacoesCtrl', function ($scope, Operacao) {

  function _listOperacoes() {
    Operacao.list()
      .then(function (res) {
        $scope.operacoes = res.data;
      });
  }

  $scope.deleteOperacao = function (op) {
    Operacao.delete(op._id)
      .then(function () {
        _listOperacoes();
      }, function (err) {

        alert('houve um erro ao deletar a operacao');

        _listOperacoes();
      });
  }

  // initialize
  _listOperacoes();

});
