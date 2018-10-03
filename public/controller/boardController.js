/* @function : controller is defined with a function for binding,communicating,providing path
 and services the data through browser*/
chatApp.controller('boardController', function ($scope, $http, $location, SocketService) {
    // console.log(localStorage.getItem("token"));
    // console.log(localStorage.getItem("firstname"));
    // 
    var usertoken = localStorage.getItem("token");
    var userid = localStorage.getItem("userid");
    var firstname = localStorage.getItem("firstname");
    // console.log(userid);
    var array = [];
    $scope.userlogin=firstname;
    $http({
        method: 'GET',
        url: '/auth/users/' + userid + '/list/',
        headers: {
            'token': usertoken,
        }
    }).then(function (response) {
        // console.log(usertoken);
        // console.log(response);
        // console.log(response.data)
        // console.log('response-->' + response);
        for (i = 1; i < (response.data.message).length; i++) {
            array.push(response.data.message[i].firstname);

        }
        // console.log('final array--' + array);
    })
    $scope.array = array;

    // $scope.chatlistnew = [];
    $scope.add = function () {
        //  console.log($scope.message);
        if ($scope.message.length!= 0 ) {
            
            SocketService.emit('chatbackend', { 'userid': userid, 'firstname': firstname, 'message': $scope.message, 'dateTime': new Date() });
            $scope.message=' ';
        } 


    }

    $http({

        method: 'GET',
        url: '/auth/chatlist',
        headers: {
            'token': usertoken
        }
    }).then(function (response) {


        //array.push(response.data.message)
        console.log(response.data.message);

        //$scope.chatlistnew = arr;
        var chat_array = response.data.message;
        $scope.chat_array = chat_array;
        // console.log($scope.chat_array);
    })

    SocketService.on('chatroomClient', function (message) {
        // console.log('hii')
        // console.log(message);
        $scope.chat_array.push(message)
        // console.log('chat_array---' + chat_array)
    });



    $scope.logout = function () {
        localStorage.removeItem("token");
        // console.log(localStorage.removeItem("token"));
        localStorage.removeItem("userid");
        // console.log(localStorage.removeItem("userid"));

        $location.path("/login");
    }
})

