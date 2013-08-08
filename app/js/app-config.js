var myAppConfig = angular.module('myAppConfig', ['ngCookies','ngResource', 'analytics','aceDirective']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('', {templateUrl: 'partials/home.html', controller: IndexController});
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: IndexController});
    $routeProvider.when('/quests', {templateUrl: 'partials/selectquests.html', controller: IndexController, reloadOnSearch:false});
    $routeProvider.when('/practice', {templateUrl: 'partials/practice.html', controller: IndexController, reloadOnSearch:false});
    $routeProvider.when('/challenges', {templateUrl: 'partials/challenges.html', controller: IndexController});
    $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: IndexController});
    $routeProvider.when('/teach', {templateUrl: 'partials/teach.html', controller: IndexController});
    $routeProvider.when('/storyboard', {templateUrl: 'partials/storyboard.html', controller: IndexController});
    $routeProvider.when('/story', {templateUrl: 'partials/story.html', controller: IndexController});
	$routeProvider.when('/challengedetails', {templateUrl: 'partials/challengedetails.html', controller: IndexController});
	$routeProvider.when('/ranking', {templateUrl: 'partials/ranking.html', controller: IndexController});
	$routeProvider.when('/registration', {templateUrl: 'partials/registration.html', controller: IndexController});
    $routeProvider.when('/challengeCreator', {templateUrl: 'partials/challengeCreator.html', controller: IndexController});
    $routeProvider.when('/tournaments', {templateUrl: 'partials/tournament.html', controller: IndexController});
	$routeProvider.when('/create', {templateUrl: 'partials/create_paths_and_levels.html', controller: IndexController});
    $routeProvider.when('/videos', {templateUrl: 'partials/videos.html', controller: IndexController});
    $routeProvider.when('/feedback', {templateUrl: 'partials/feedback.html', controller: IndexController});
    $routeProvider.otherwise({redirectTo: '/home'});
}]);

myAppConfig.run(function($rootScope, $location) {
    $rootScope.location = $location;
});

myAppConfig.filter('startFrom', function() {
    return function(input, idx) {
        if(input != undefined){
            var i=idx, len=input.length, result = [];
            for (; i<len; i++)
                result.push(input[i]);
            return result;
        }
    };
});