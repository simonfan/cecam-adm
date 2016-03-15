angular.module('cecamAdm.controllers', ['ui.bootstrap'])

.controller('AppCtrl', function ($scope) {

})

.controller('EstoqueCtrl', function ($scope, Estoque, $uibModal, $timeout) {

  Estoque.getResumo()
    .then(function (response) {
      $scope.resumo = response.data;

      console.log($scope.resumo);
    });


  $scope.gridOptions = {
    data: 'resumo',
    columnDefs: [
      { name: 'descricao', displayName: 'Descrição' },
      { name: 'validade', displayName: 'Validade', cellFilter: 'date: "dd MMMM yyyy"' },
      { name: 'estoque', displayName: 'Quantidade' },
      { name: 'unidadeDeMedida', displayName: 'Unidade' },
      {
        name: 'status',
        displayName: 'Status',
        cellTemplate: [
          '<div class="distribuicao-status">',
            '<div class="quantidade-distribuida">',
              '{{ row.entity.estoque - row.entity.aDistribuir }}',
            '</div>',
            '<button ng-if="row.entity.aDistribuir > 0">',
              'distribuir',
            '</button>',
            '<button ng-if="row.entity.aDistribuir === 0">',
              'ver detalhes',
            '</button>',
          '</div>'
        ].join('')
      }
    ]
  };

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      // animation: $scope.animationsEnabled,
      templateUrl: 'templates/modal-distribuir.html',
      controller: function($scope) {
      	$scope.salvar = function () {
      		$timeout(function(){
      			console.log('dados salvos!');
      			$scope.feedback = 'salvou!!';
      		},1000);
		};
		$scope.novaUnidade = function () {
			$timeout(function(){
      			console.log('dados salvos','nova unidade');
      			$scope.feedback = 'nova unidade!!';
      		},1000);
		};
		$scope.finalizarDistribuicao = function () {
      		$timeout(function(){
      			console.log('dados salvos!');
      			modalInstance.close();
      		},1000);
		};
		$scope.cancel = function () {
			modalInstance.close();
		};
      },
      // size: size,
      // resolve: {
      //   items: function () {
      //     return $scope.items;
      //   }
      // }
    });

    // modalInstance.result.then(function (selectedItem) {
    //   $scope.selected = selectedItem;
    // }, function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });
  };

});