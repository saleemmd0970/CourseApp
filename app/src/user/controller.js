app.controller('UserController', ['UserService', '$scope', '$rootScope', '$cookies', '$state', 'InformationService', function (UserService, $scope, $rootScope, $cookies, $state, InformationService) {
    $scope.value = 'Hello User';
    $scope.regex = "((?=.*\\d)(?=.*[a-z])(?=.*[@#$%]).{6,10})";
    $scope.user = {
        userName: '',
        password: '',
        fName: '',
        lName: '',
        mName: '',
        phoneNumber: '',
        dob: null
    };

    $scope.login = {
        userName: '',
        password: ''
    };

    $scope.signup = function () {
        UserService.createUser($scope.user).$promise.then(function (savedUser) {
            console.log(savedUser);
            $scope.resetForm();
            $state.go('login');
            InformationService.populateInfo("Signup attempt successfull. Please login");
        });;
    };

    $scope.loginToApp = function () {
        UserService.login($scope.login).$promise.then(function (user) {
            console.log(user);
            $cookies.put('loggedInUser', JSON.stringify(user));
            $state.go('courses');
            InformationService.populateInfo("Login attempt successfull..");
        });
    };

    $scope.resetForm = function () {
        $scope.user = {
            userName: '',
            password: '',
            fName: '',
            lName: '',
            mName: '',
            phoneNumber: '',
            dob: null
        };
        $scope.signupForm.$setPristine();
        $scope.signupForm.$setUntouched();
    };
}]);
