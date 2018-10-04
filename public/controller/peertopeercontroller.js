chatApp.controller('peertopeercontroller', function ($scope, $http, $location, SocketService) {
    // console.log(localStorage.getItem("token"));
    // console.log(localStorage.getItem("userid"));
    // console.log(localStorage.getItem("firstname"));
    // console.log(localStorage.getItem("receiverid"));
    // console.log(localStorage.getItem("receivername"));
    var usertoken = localStorage.getItem("token");
    var userid = localStorage.getItem("userid");
    var firstname = localStorage.getItem("firstname");
    var receiverid=localStorage.getItem("receiverid");
    var receivername=localStorage.getItem("receivername");
    var array = [];
    var chatArray=[];
    $scope.loginuser=receiverid;
    $http({
        method: 'GET',
        url: '/auth/users/' + userid + '/list/',
        headers: {
            'token': usertoken,
        }
    }).then(function (response) {
        for (i = 1; i < (response.data.message).length; i++) {
            array.push(response.data.message[i].firstname);

        }
    })
    $scope.array = array;
    // console.log($scope.array);

    $http({

        method: 'GET',
        url: '/auth/users/'+userid+'/peerchatlist/'+receiverid,
        headers: {
            'token': usertoken
        }
    }).then(function (response) {

        console.log(response.data.message);
         $scope.chatArray = response.data.message;
        
     console.log($scope.chatArray);
    })

    $scope.addpeer = function () {
        //  console.log($scope.message);
        if ($scope.message.length!= 0 ) {
            
            SocketService.emit('chatpeerbackend', { 'userid': userid, 'firstname': firstname,'receiverid':receiverid,'receivername':receivername, 'message': $scope.message, 'date': new Date() });
            $scope.chatArray.push({'userid': userid, 'firstname': firstname,'receiverid':receiverid,'receivername':receivername, 'message': $scope.message, 'date': new Date()})
            // $scope.message=' ';
        } 
    }
   
    SocketService.on(userid, function (message) {
        // console.log('hii')
        // console.log(message);
        // if(userid=message.receiverid)
    
        $scope.chatArray.push(message)
        console.log( $scope.chatArray.push(message));
    
        // console.log('chat_array---' + chat_array)
    });

    $scope.logout = function () {
        localStorage.removeItem("token");
        // console.log(localStorage.removeItem("token"));
        localStorage.removeItem("userid");
        // console.log(localStorage.removeItem("userid"));
        localStorage.removeItem("firstname");
        localStorage.removeItem("receiverid");
        localStorage.removeItem("receivername")
        $location.path("/login");
    }
    $scope.close=function(){
        localStorage.removeItem("receiverid");
        localStorage.removeItem("receivername");
        $location.path("/dashboard");
    }
   


})