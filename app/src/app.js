var app = angular.module('CourseApp', ['ngResource', 'ngCookies', 'ui.router', 'ui.bootstrap', 'ngMask']);

app.factory('HttpInterceptor', ['$q', 'InformationService', function ($q, InformationService) {
    var interceptor = {
        //request: function (config) {
        //console.log("Clearing errors");
        //    console.log(config);
        //    return config;
        //},
        response: function (response) {
            //console.log(response);
            return response;
        },
        responseError: function (errorResponse) {
            // var deferred = $q.defer();
            console.log("Inside response error")
            console.log(errorResponse);
            if (errorResponse.status === 403 || errorResponse.status === 401) {
                InformationService.populateError("Authorization Failed. Please check your credentials");
            } else if (errorResponse.status === -1) {
                InformationService.populateError("Backend Service seems to be down");
            } else {
                InformationService.populateError(errorResponse.message);
            }

            return $q.reject(errorResponse);
        }
    };
    return interceptor;
}]);

app.service('InformationService', function () {
    this.errors = [];
    this.infos = [];

    this.populateError = function (error) {
        this.errors.push(error);
    }

    this.populateInfo = function (info) {
        this.infos.push(info);
        console.log(info);
    }

    this.clear = function () {
        this.errors = [];
        this.infos = [];
        console.log("clearing..");
    }

    this.getErrors = function () {
        return this.errors;
    }

    this.getInfos = function () {
        return this.infos;
    }

});
//resposible for showing error/info messages to the user
app.controller('InformationController', ['$scope', '$timeout', 'InformationService', function ($scope, $timeout, InformationService) {
    $scope.service = InformationService;
    $scope.errors = [];
    $scope.infos = [];
    $scope.$watch('service.getErrors()', function (newErrors) {
        $scope.errors = newErrors;
        $scope.clearMessages();
    });

    $scope.$watch('service.getInfos()', function (newInfos) {
        $scope.infos = newInfos;
        $scope.clearMessages();
    });

    $scope.clearMessages = function () {
        $timeout(function () {
            InformationService.clear();
        }, 10000);
    };

}]);
