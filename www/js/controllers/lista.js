app.controller('ListaCtrl', function ($scope, Database, $cordovaFile, $http) {
	$scope.db = new Database("lista");

	$scope.getLista = function () {
		$scope.actual = {
			cc : '',
			pass : ''
		};

		$scope.novo = false;

		$scope.db.all().then(function (response) {
			$scope.lista = response;
		}, function (erro) {
			console.log(erro);
		});
	};

	$scope.add = function () {
		if(!$scope.novo){
			var id = $scope.lista.length + 1;
			$scope.actual = {
				_id : id.toString(),
				cc : '',
				pass : ''
			};
		}
		$scope.novo = !$scope.novo;
	};

	$scope.edit = function (item) {
		$scope.actual = item;
		item.edit = true;
	};

	$scope.save = function (item) {
		if (item !== $scope.actual && $scope.actual.cc != '' && $scope.actual.pass != ''){
			item = $scope.actual;
			item.edit = false;
			$scope.db.create(item).then(function(res){
				$scope.getLista();
			},function(err){
				console.log(err);
			});
			if(!item){
				$scope.novo = false;
			} else {
				item.edit = false;
			}
		}
	};

	$scope.delete = function (item) {
		$scope.db.remove(item);
		$scope.getLista();
	};

	$scope.export = function(){
		$cordovaFile.writeFile( cordova.file.externalApplicationStorageDirectory, 'bak.ppw', $scope.lista, true).then(function(result) {
			alert('exportado com sucesso!');  
			console.log(result);      
		}, function(err) {
			console.log(err.message);
		});
	}

	$scope.import = function(){
		$http.get(cordova.file.externalApplicationStorageDirectory+'bak.ppw').success(function (data) {
			console.log(data);
			angular.forEach(data, function(value, key) {
				var id = $scope.lista.length + key;
				value._id = id.toString();
				delete value._rev;
				$scope.db.create(value).then(function(res){
					console.log(res);
					$scope.getLista();
				},function(err){
					console.log(err);
				});
			});
		}, function(err) {
			console.log(err.message);
		});
	}

	$scope.getLista();
});
