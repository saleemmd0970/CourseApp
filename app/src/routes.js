app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    // Now set up the states
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'src/user/login.html',
            controller: 'UserController'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'src/user/signup.html',
            controller: 'UserController'
        })
        .state('courses', {
            url: '/courses',
            templateUrl: 'src/course/course-list.html',
            controller: 'CourseController'
        })
        .state('courseAdd', {
            url: '/addCourse',
            templateUrl: 'src/course/course-add.html',
            controller: 'CourseController'
        })
        .state('courseEdit', {
            url: '/editCourse/:courseId',
            templateUrl: 'src/course/course-add.html',
            controller: 'CourseController'
        })
        .state('courseTopics', {
            url: '/courseTopics/:courseId',
            templateUrl: 'src/course/course-topics.html',
            controller: 'TopicsController'
        })
}]);

app.run(['$rootScope', '$cookies', '$location', '$state', 'InformationService', function ($rootScope, $cookies, $location, $state, InformationService) {
    $rootScope.logOut = function () {
        $cookies.remove('loggedInUser');
        $state.go('login');
        InformationService.populateInfo("Logged out successfully");
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {
        var loggedInUser = $cookies.get('loggedInUser');
        $rootScope.showLogout = true;
        if (toState.name === 'login' || toState.name === 'signup') {
            $rootScope.showLogout = false;
        } else {
            $rootScope.message = null;
            if (loggedInUser === undefined) {
                event.preventDefault();
                $rootScope.showLogout = false;
                $location.path('/login');
            }
        }
        InformationService.clear();

    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.currentState = toState.name;
        $rootScope.previousState = fromState.name;
    })

}]);
