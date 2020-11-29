/// <reference path ="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.min.js"/>
var mayApp = angular
.module("myModule", [])
.controller("myController", function ($scope,$http) {

    $scope.user;
    $scope.token;
    $scope.bearer = "Bearer ";
    $scope.token;
    
    $scope.saveUser = function () {
        console.log("save user called...");
        $scope.user.role = 'ROLE_USER';
        console.log(angular.toJson($scope.user));
        $http({
            method: "POST",
            url: 'register',
            data: angular.toJson($scope.user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(success, error);
    }; 
  
    $scope.getUser = function () {
        console.log("get user called...");

        $http({
            method: "GET",
            url: 'user',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $scope.bearer + $scope.token,
            }
        }).then(function(response){

            console.log(response.data.role);
            //if(response.data.role === 'user'){ }
        }, error);
    }
    
    $scope.loginUser = function () {
        console.log("login user called...");
        console.log(angular.toJson($scope.user));
        $http({
            method: "POST",
            url: 'authenticate',
            data: angular.toJson($scope.user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response){
        	 console.log("success");
             console.log(response);
             console.log(response.data.token);
             $scope.token = response.data.token;
             $scope.getUser();
        	 //$scope.getUser()
        }, error);
    };
    

    
    function success(response) {
        $scope.message = "Success! " + response.data;
        console.log("success");
        console.log(response);
    }

    function error(response) {
       
        $scope.message = "Failed! " + response.data;
       
        console.log("error");
        console.log(response);
      
    }
});
