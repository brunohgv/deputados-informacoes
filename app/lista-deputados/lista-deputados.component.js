angular
  .module('listaDeputados')
  .component('listaDeputados', {
    templateUrl: '/app/lista-deputados/lista-deputados.template.html',
    controller: ['$scope', '$http', ListaDeputadosController]
  })

  function ListaDeputadosController ($scope, $http) {
    var self = this
    
    $scope.Title = 'Meu titulo'

    self.page = 1
    API_URL = 'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=20&pagina='
    loadData(API_URL + self.page)
    
    function loadData(url) {
      $http.get(url)
      .then(res => {
        $scope.deputados = res.data.dados
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
        alert(err.xhrStatus + ":" + err.statusText)
      })
    }

    $scope.nextPage = function() {
      // console.log('next')
      self.page++
      loadData(API_URL + self.page)
    }
    
    $scope.prevPage = function() {
      // console.log('prev')
      self.page--
      loadData(API_URL + self.page)
    }

    $scope.carregarDeputadoSelecionado = function (uri) {
      $http.get(uri)
        .then(res => {
          $scope.deputadoSelecionado = res.data.dados
          // console.log(res.data)
        })
        .catch(err => {
          // console.log(err)
        })
    }
  }
