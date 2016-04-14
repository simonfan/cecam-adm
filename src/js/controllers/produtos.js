angular.module('cecamAdm.controllers')

.controller('ProdutosCtrl', function ($scope, $uibModal, Produto) {

  function _listProdutos() {
    Produto.list()
      .then(function (res) {
        $scope.produtos = res.data;
      });
  }

  $scope.deleteProduto = function (produto) {
    Produto.delete(produto._id)
      .then(function () {
        _listProdutos();
      }, function (err) {

        alert('houve um erro ao deletar o produto');

        _listProdutos();
      });
  }

  $scope.openNewProdutoModal = function () {

    $scope.newProdutoModal = $uibModal.open({
      // animation: $scope.animationsEnabled,
      templateUrl: 'templates/produtos/new-modal.html',
      controller: function NewProdutoModal($scope) {

        $scope.newProduto = {};

        $scope.createProduto = function () {

          if (!$scope.newProduto.descricao) {
            alert('Descrição é um campo requerido');
            return;
          }

          Produto.create($scope.newProduto)
            .then(function (receptorData) {

              _listProdutos();
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
  _listProdutos();

});
