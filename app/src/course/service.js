app.service('CourseService', ['$resource', function ($resource) {
    this.selectedCourse = null;
    var courseApi = $resource('http://localhost:8080/course/:courseId', {
        courseId: '@courseId'
    }, {
        getAll: {
            method: 'GET',
            isArray: true
        },
        getAllForUser: {
            method: 'GET',
            isArray: true,
            params: {
                userId: '@userId'
            },
            url: 'http://localhost:8080/course/user/:userId'
        },
        getCourseById: {
            method: 'GET'
        },
        create: {
            method: 'POST'
        }
    });

    this.getAllCourses = function () {
        return courseApi.getAll();
    };

    this.getAllRegisteredCourses = function (userIdPassed) {
        console.log(userIdPassed);
        return courseApi.getAllForUser({
            userId: userIdPassed
        });
    };

    this.saveCourse = function (course) {
        return courseApi.create(course);
    };

    this.getCourseById = function (courseIdPassed) {
        return courseApi.getCourseById({
            courseId: courseIdPassed
        });
    };

    this.setSelectedCourse = function (course) {
        this.selectedCourse = course;
    };

}]);
