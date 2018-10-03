chatApp.controller('loginController', function ($scope, $http, $location) {
    if (localStorage.getItem("token") != null) {
        $location.path("/dashboard");
    }
    else {
        $scope.user = {
            'email': '',
            'password': ''
        }
        console.log($scope.user);
        $scope.login = function () {
            console.log("login credential process", $scope.user);
            $http({
                method: 'POST',
                url: '/login',
                data: $scope.user
            }).then(function (response) {
                console.log(response);
                //    console.log(response.data);
                console.log(response.data.error);

                if (response.data.error === false) {
                    console.log("successfull");
                    $scope.message = "login Successful";
                    var token = response.data.token;
                    var userid = response.data.userid;
                    var firstname = response.data.firstname;
                    
                    localStorage.setItem("token", token);
                    localStorage.setItem("userid", userid);
                    localStorage.setItem("firstname", firstname);
                    console.log(localStorage.setItem("firstname", firstname));

                    $location.path("/dashboard");
                }
                else if (response.status === 400) {
                    $scope.message = "login Unsuccessful"
                }
            })
        }
    }
});