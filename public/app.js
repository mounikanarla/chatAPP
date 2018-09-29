
	// create the module and name it scotchApp
	var chatApp = angular.module('chatApp', ['ngRoute','btford.socket-io']);

	// configure our routes
	chatApp.config(function($routeProvider) {
		$routeProvider

			// route for the login page
			.when('/login', {
				templateUrl : 'templets/login.html',
				controller : 'loginController'
			})

			// route for the about page
			.when('/register', {
				templateUrl : 'templets/register.html',
				controller : 'registerController'
			})
			
			.when('/dashboard',{
				templateUrl: 'templets/dashboard.html',
				controller : 'boardController'
			})
			
	});

	chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
		return socketFactory({
			ioSocket: io.connect('http://localhost:5500')
		});
	}]);

	
	