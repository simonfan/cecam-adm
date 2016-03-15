angular.module('cecamAdm.controllers', ['ui.bootstrap'])

.controller('AppCtrl', function ($scope) {

})

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

    // modalInstance.result.then(function (selectedItem) {
    //   $scope.selected = selectedItem;
    // }, function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });
  };

})

.controller('DistribuicaoCtrl', function ($scope, resumo, Distribuicao, Receptor) {

  console.log(resumo);

  $scope.resumo = resumo;

  // listar distribuicoes já feitas do produto
  $scope.distribuicoes = [];
  Distribuicao.list({
    'produto._id': resumo._id,
    'produto.validade': resumo.validade,
    unidadeDeMedida: resumo.unidadeDeMedida,
  })
  .then(function (response) {

    console.log(response);
    $scope.distribuicoes = response.data;
  });

  // quando distribuicoes sao adicionadas, recomputar o valor do resumo
  $scope.$watchCollection('distribuicoes', function(newNames, oldNames) {
    $scope.resumo.aDistribuir = $scope.distribuicoes.reduce(function (res, distribuicao) {
      return res - distribuicao.quantidade;
    }, $scope.resumo.estoque);
  });


  // listar receptores cadastrados
  $scope.receptores = [];
  Receptor.list().then(function (response) {
    $scope.receptores = response.data;
  });

  // objeto para guardar dados referentes a nova distribuicao
  $scope.novaDistribuicao = {
    // produto é fixo para o modal
    produto: {
      _id: resumo._id,
      validade: resumo.validade,
      descricao: resumo.descricao,
    },

    unidadeDeMedida: resumo.unidadeDeMedida,

    status: 'a-separar'
  };


  $scope.formularioAberto = true;
  $scope.abrirFormulario = function () {
    $scope.formularioAberto = true;
  };

  // funcao auxiliar para salvar distribuicao
  function _salvarDistribuicao() {
    // make sure receptor is an object
    $scope.novaDistribuicao.receptor = (typeof $scope.novaDistribuicao.receptor === 'string') ? 
      JSON.parse($scope.novaDistribuicao.receptor) : $scope.novaDistribuicao.receptor; 

    return Distribuicao.create($scope.novaDistribuicao)
      .then(function (novaDistribuicao) {
        $scope.distribuicoes.unshift(novaDistribuicao);

        // zerar novaDistribuicao
        $scope.novaDistribuicao = {
          // produto é fixo para o modal
          produto: {
            _id: resumo._id,
            validade: resumo.validade,
            descricao: resumo.descricao
          },
          unidadeDeMedida: resumo.unidadeDeMedida,
          status: 'a-separar'
        }
      });
  }

  $scope.salvar = function () {
    _salvarDistribuicao()
      .then(function () {
        $scope.formularioAberto = false;
      });
  };
  $scope.salvarECriarNovaDistribuicao = function () {
    _salvarDistribuicao();
  };
  $scope.finalizarDistribuicao = function () {
    _salvarDistribuicao()
      .then(function () {
        $scope.$close();
      });
  };
  $scope.cancel = function () {
    modalInstance.close();
  };
});