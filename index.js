// JavaScript source code

var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);//initialize a new instance of socket by passing http server object
var loggedinUser;
var port = 3000;
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});

//listen to onconnection event for incoming sockets 
//Each socket fires a special disconnect event
io.on('connection', function (socket) {
    console.log('a user connected');
   
    //Listen to chat message event
     socket.on('chat message', function (msg,user) {
         //console.log('message : ' + msg);
         /****Connect and send message to particular user****/
         //console.log('chat message submisson by user : ' + user);
         //var eventname = 'chat message_' + user;
         //console.log('[event] : ' + eventname);
         //io.emit(eventname, msg, user);

         /*****broadcast message to all users with usernames******/
        // io.emit('chat message', 'is coonected', user);
         io.emit('chat message', msg, user);

     });

     //socket.on('username', function (user) {
     //    console.log('User : ' + user);
        
     //  //  sessionStorage.setItem('username', user);
     //    loggedinUser = user;// sessionStorage.getItem('username');
     //});

    socket.on('disconnect', function () {
        console.log('a user disconnected');
    });
});

http.listen(port, function () {
    console.log('listening to port ' + port);
});
