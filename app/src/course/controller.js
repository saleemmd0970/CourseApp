app.controller('CourseController', ['CourseService', '$scope', '$cookies', '$state', '$stateParams', function (CourseService, $scope, $cookies, $state, $stateParams) {
    $scope.courses = null;
    $scope.registeredCourses = null;
    $scope.pageTitle = "Add Course";
    var createNewTopic = function () {
        return {
            name: '',
            duration: ''
        }
    };
    $scope.course = {
        name: '',
        author: '',
        level: 'BEGINNER',
        description: '',
        prereqs: '',
        fee: '',
        endGoal: '',
        type: 'Free',
        topics: [createNewTopic(), createNewTopic()]
    };
    var loggedInUserString = $cookies.get('loggedInUser');
    var loggedInUser;
    if (loggedInUserString != undefined) {
        loggedInUser = JSON.parse(loggedInUserString);
    }
    CourseService.getAllRegisteredCourses(loggedInUser.userId).$promise.then(function (courses) {
        $scope.registeredCourses = courses;
    });

    CourseService.getAllCourses().$promise.then(function (courses) {
        $scope.courses = courses;
    });

    $scope.addNewTopic = function () {
        $scope.course.topics.push(createNewTopic());
    }

    $scope.removeTopic = function (topic) {
        $scope.course.topics.pop(topic);
    }

    $scope.saveCourse = function () {
        var loggedInUser = $cookies.get('loggedInUser');
        $scope.course.author = JSON.parse(loggedInUser).userName;
        console.log($scope.course);
        CourseService.saveCourse($scope.course).$promise.then(function () {
            $state.go('courses');
        });
    }

    $scope.displayTopics = function (course) {
        CourseService.setSelectedCourse(course);
        $state.go('courseTopics', {
            courseId: course.courseId
        });
    };

    if ($stateParams.courseId !== undefined) {
        $scope.pageTitle = "Edit Course";
        CourseService.getCourseById($stateParams.courseId).$promise.then(function (course) {
            $scope.course = course;
        });
    }
}]);

app.controller('TopicsController', ['CourseService', '$scope', '$cookies', '$state', '$stateParams', function (CourseService, $scope, $cookies, $state, $stateParams) {
    $scope.selectedCourse = CourseService.selectedCourse;
    $scope.loggedInUser = JSON.parse($cookies.get('loggedInUser'));
    $scope.register = function () {

    };

    $scope.editCourse = function () {
        $state.go('courseEdit', {
            courseId: $scope.selectedCourse.courseId
        });
    };

}]);
