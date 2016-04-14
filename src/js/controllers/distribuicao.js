angular.module('cecamAdm.controllers')

.controller('DistribuicaoCtrl', function ($scope, resumo, Distribuicao, Receptor, $q) {

  $scope.today = new Date();

  // auxiliary functions
  function _setupNovaDistribuicao() {
    // objeto para guardar dados referentes a nova distribuicao
    $scope.novaDistribuicao = {
      // produto é fixo para o modal
      produto: resumo.produto,
      unidadeDeMedida: resumo.unidadeDeMedida,
      status: 'a-separar',
      receptor: '',
    }
  }

  // listar distribuicoes já feitas do produto
  function _listDistribuicoes() {
    $scope.distribuicoes = [];
    Distribuicao.list({
      'produto._id': resumo.produto._id,
      'produto.validade': resumo.produto.validade,
      unidadeDeMedida: resumo.unidadeDeMedida,

      status: {
        $ne: 'retirado'
      }
    })
    .then(function (distribuicoes) {
      $scope.distribuicoes = distribuicoes;
    });
    
  }

  $scope.resumo = resumo;

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

  $scope.formularioAberto = true;
  $scope.abrirFormulario = function () {
    $scope.formularioAberto = true;
  };

  // funcao auxiliar para salvar distribuicao
  function _salvarDistribuicao() {

    if (!$scope.novaDistribuicao.receptor) {
      return $q(function (resolve, reject) {
        resolve(true);
      });
    }

    // make sure receptor is an object
    $scope.novaDistribuicao.receptor = (typeof $scope.novaDistribuicao.receptor === 'string') ? 
      JSON.parse($scope.novaDistribuicao.receptor) : $scope.novaDistribuicao.receptor; 

    return Distribuicao.create($scope.novaDistribuicao)
      .then(function (novaDistribuicao) {

        console.log(novaDistribuicao);

        $scope.distribuicoes.unshift(novaDistribuicao);

        // zerar novaDistribuicao
        _setupNovaDistribuicao();
      });  
  }

  $scope.salvar = function () {
    _salvarDistribuicao()
      .then(function () {
        $scope.formularioAberto = false;
      });
  };

  $scope.deleteDistribuicao = function (dist) {
    Distribuicao.delete(dist._id)
      .then(function () {
        _listDistribuicoes();
      }, function (err) {
        alert('houve um erro ao deletar as distribuicoes');
        _listDistribuicoes();
      })
  }

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

  // initialize
  _setupNovaDistribuicao();
  _listDistribuicoes();
});