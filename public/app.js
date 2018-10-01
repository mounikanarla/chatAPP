
// create the module and name it as chatApp
var chatApp = angular.module('chatApp', ['ngRoute', 'btford.socket-io']);

// configure our routes
chatApp.config(function ($routeProvider) {
	$routeProvider

		// route for the login page
		.when('/login', {
			templateUrl: 'templets/login.html',
			controller: 'loginController'
		})

		// route for the register page
		.when('/register', {
			templateUrl: 'templets/register.html',
			controller: 'registerController'
		})
        // route for the home controller
		.when('/dashboard', {
			templateUrl: 'templets/dashboard.html',
			controller: 'boardController'
		})
		.otherwise({
			redirectTo:'/error'
		});
});

chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
	return socketFactory({
		ioSocket: io.connect('http://localhost:5500')
	});
}]);


