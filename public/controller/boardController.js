
chatApp.controller('boardController', function($scope, $http, $location, ){
    // console.log(localStorage.getItem("token"));
    //  console.log(localStorage.getItem("userid"));
var usertoken=localStorage.getItem("token");
var userid=localStorage.getItem("userid");
// console.log(userid);
var array=[];
$http({
    method: 'GET',
    url: '/auth/users/'+userid+'/list/',
    headers:{
        'token':usertoken,
     }
     }).then(function(response){
        // console.log(usertoken);
    console.log(response);
    // console.log(response.data)
    console.log(response.data.message);
    for(i=1;i<(response.data.message).length;i++)
    {
        array.push(response.data.message[i].firstname);
    }
     console.log(array);
})
 $scope.array=array;


 $scope.sendMes=function()
 {
     SocketService.emit('chatbackend',{"userid":id,"message":$scope.message,"date":new Date()})
 }

 $http({
     method:'GET',
     url:"/messages"
 }).then(function(reesponse){
     console.log(response.data.message[0])
     for(var i=0;i<(response.data.message).length;i++)
     {
         array.push(response.data.message[i]);
     }
 })

 $scope.logout = function(){
    localStorage.removeItem("token");
    // console.log(localStorage.removeItem("token"));
    localStorage.removeItem("userid");
    // console.log(localStorage.removeItem("userid"));

    $location.path("/login");
}
})
    
