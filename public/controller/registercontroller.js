chatApp.controller('registerController', function($scope, $http){

    console.log('register');
    $scope.user={
        'firstname':'',
        'lastname':'',
        'email': '',
        'password': '',
        'mobile':''
    }
    console.log($scope.user);
    $scope.register = function(){
        console.log("register credential process", $scope.user);
   $http({
       method: 'POST',
       url: '/register',
       data: $scope.user
   }).then(function(response){
       console.log(response);
       console.log(response.data);
       console.log(response.data.error);
        if(response.data.error==false){
           console.log("successfull");
           $scope.message="registration Successful";
           $location.path("/login");
       }
       else if(response.status==400){
           $scope.message="registration Unsuccessful"
       }
   })
   }
   
});