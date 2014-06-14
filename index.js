var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const W = 120, H = 40, MAP_FOOD = 240;;
var map0 = new Uint8Array(W*H);
var game_conf = function() {
	this.W = W;
	this.H = H;
};
function spawnNewFood(num) {
	for(var i=0; i<num; i++) {
		while(true) {
			var x = Math.random() * W >>> 0;
			var y = Math.random() * H >>> 0;
			if(map0[y*W+x] == 0) {
				map0[y*W+x] = MAP_FOOD;
//				ctx.fillStyle = "#3333FF";
//				ctx.fillRect(x*10, y*10, 10, 10);
				break;
			}
		}
	}
}

app.get('/', function(req, res){
	res.sendfile("./gluttonousSnake.html");
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function() {
		console.log('a user disconnected');
	});
	var conf = new game_conf();
	spawnNewFood(10);
	conf.map0 = map0;
	socket.emit('game_conf', conf);
	socket.emit('game_start', 'haha');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
