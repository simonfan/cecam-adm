angular.module('cecamAdm.controllers', [])

.controller('AppCtrl', function ($scope) {

})

.controller('EstoqueCtrl', function ($scope, Estoque) {

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

});