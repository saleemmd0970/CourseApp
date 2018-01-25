app.service('UserService', ['$resource', function ($resource) {
    var userApi = $resource('http://localhost:8080/user', {}, {
        create: {
            method: 'POST'
        },
        login: {
            method: 'POST',
            url: 'http://localhost:8080/user/login'
        }
    });

    this.createUser = function (user) {
        return userApi.create(user);
    };

    this.login = function (loginObj) {
        return userApi.login(loginObj);
    };

}]);
