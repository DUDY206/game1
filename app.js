const express = require('express');
const app = express();
//Connect Socket.io
let server = app.listen(3000, () => console.log("Application start on port 3000..."));

let io = require('socket.io')(server);


var playerlocation = 0;
var playerlist = [];
app.use(express.static("public"));
app.get("/", function (req, res) {

        res.sendFile('index.html', {
            root: __dirname
        });
});



io.sockets.on('connection', function (socket) {
socket.on('join-game', function (user){
   playerlist.push(user);
})

socket.on('player-move', function (data){
   playerlist.find(x => x.id === data.id).player = data.player;
   socket.emit('list-player', {
      playerlist
   });
})

// socket.on('recievedata', function (positionx,positiony,currentanimation,gamename) {
//      socket.broadcast.emit('playermove', positionx, positiony, currentanimation,gamename);
//   });
//
//
//
//
//
//   socket.on('initializeplayer', function (newplayername) {
//
//     socket.clientname = newplayername;
//      playerlist.push(newplayername);
//  io.sockets.emit('addplayer',playerlist,newplayername);
//
//
//   });
 socket.on('disconnect', function(){
   delete playerlist[socket.clientname];
 for(var i in playerlist)
 {
  if(playerlist[i] == socket.clientname)
  {
    playerlist.splice(i, 1);
  }
 }
socket.broadcast.emit('message',socket.clientname);
 socket.broadcast.emit('netreplayer',playerlist);


});



});
