
	// create the module and name it scotchApp
	var chatApp = angular.module('chatApp', ['ngRoute']);

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
			});

			// .when('/login', {
			// 	templateUrl : 'templets/login.html',
			// 	controller : 'loginControl'
			// })

			// // route for the contact page
			// .when('/contact', {
			// 	templateUrl : 'pages/contact.html',
			// 	controller  : 'contactController'
			// });
	});
