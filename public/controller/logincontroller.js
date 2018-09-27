chatApp.controller('loginController', function($scope, $http , $location){

    console.log('login');
    $scope.user={
        'email': '',
        'password': ''
    }
     console.log($scope.user);
    $scope.login = function(){
        console.log("login credential process", $scope.user);
   $http({
       method: 'POST',
       url: '/login',
       data: $scope.user
   }).then(function(response){
       console.log(response);
    //    console.log(response.data);
       console.log(response.data.error);
       
       if(response.data.error===false){
           console.log("successfull");
           $scope.message="login Successful";
           var token=response.data.token;
           localStorage.setItem("token",token);
           $location.path("/dashboard");
       }
       else if(response.status===400){
           $scope.message="login Unsuccessful"
       }
   })
   }
   
});