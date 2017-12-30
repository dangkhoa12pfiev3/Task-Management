var loginApp = angular.module("loginApp",[]);
loginApp.controller("loginCtrl",['$scope','$http','$window',function($scope,$http,$window){
    
    $scope.login = function(){
        
        var username = $scope.username;
        var password = $scope.password;

        
        var url = "https://localhost:443/login";
        
        $http({
            headers: {'content-type': 'application/json'},
            method: 'POST',
            url: url,
            data: JSON.stringify({username:username,password:password})
        }).then(function successCallback(response){
            var idUser = response.data.idUser;
            sessionStorage.setItem("idUser",idUser);
            $window.location.href = "/routing.html";
        },function errorCallback(response){
            console.log(response);
        })    
                
         
    }
    // redirect to routing.html

}]);

