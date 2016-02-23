angular.module('cecamAdm.services', [])

.factory('Operacoes', function($firebaseArray) {
  var itemsRef = new Firebase("https://cecam.firebaseio.com/Operacoes");
  return $firebaseArray(itemsRef);
})
