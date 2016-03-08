angular.module('cecamAdm.controllers', ['ui.bootstrap'])

.controller('AppCtrl', function ($scope) {

})

.controller('EstoqueCtrl', function ($scope, Operacoes, $uibModal, $timeout) {

  $scope.operacoes = Operacoes;

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