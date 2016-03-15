angular.module('cecamAdm.services', [])

.factory('Operacao', function ($http) {
  return {
    list: function (query) {
      return $http.get('http://localhost:4000/estoque/operacoes', {
        data: query
      });
    },

    create: function (data) {
      return $http.post('http://localhost:4000/estoque/operacao', data)
        .then(function (response) {
          return response.data;
        });
    }
  };
})

.factory('Produto', function ($http) {
  return {
    get: function (produtoId) {
      return $http.get('http://localhost:4000/estoque/produto/' + produtoId);
    },

    list: function () {
      return $http.get('http://localhost:4000/estoque/produtos');
    },

    create: function (data) {
      return $http.post('http://localhost:4000/estoque/produto', data);
    }
  }
})

.factory('Estoque', function ($http) {
  return {
    getResumo: function () {
      return $http.get('http://localhost:4000/estoque/resumo');
    }
  }
})

.factory('Distribuicao', function ($http) {
  return {
    create: function (data) {
      return $http.post('http://localhost:4000/estoque/distribuicao', data)
        .then(function (response) {
          return response.data;
        });
    },

    list: function (query) {
      return $http.get('http://localhost:4000/estoque/distribuicoes', {
        params: query,
      });
    }
  }
})

.factory('Receptor', function ($http) {
  return {
    list: function (query) {
      return $http.get('http://localhost:4000/estoque/receptores', query);
    }
  }
});
