app.directive('usernameValidator', ['$http', '$q', function ($http, $q) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.userName = function (modelValue, viewValue) {
                return $http.post('http://localhost:8080/user/checkIfExists?userName=' + viewValue).then(
                    function (response) {
                        console.log(response);
                        if (response.data == true) {
                            ngModel.$error.alreadyTaken = true;
                            return $q.reject();
                        }
                        delete ngModel.$error.alreadyTaken;
                        return true;
                    }
                );
            }
        }
    };
}]);
