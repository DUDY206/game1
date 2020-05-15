ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.level1',
	'game.entities.player'
)
.defines(function(){

	let socket = io.connect("/", {
	    transports: ['websocket']
	});

socket.on('connect', function () {
    console.log('Connected to server');
	});


socket.on('disconnect', function () {
    alert('Đã ngắt kết nối');
    location.reload();
})


function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();

const userId = guid();

let playerlist = [];

MyGame = ig.Game.extend({

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),


	init: function() {
		socket.emit('join-game', {
			id: userId,
			player: {
				pos: {
					x: 388,
					y: 332
				}

			}
		})
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.S, 'down' );
		this.loadLevel (LevelLevel1);
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		let that = this;
		socket.on('list-player', function (data) {
			for (let client of data.playerlist) {
				const clientPlayer = playerlist.find(x => x.id === client.id);
				if(!clientPlayer){
					playerlist.push(client);
				}
				else {

					clientPlayer.pos = client.player.pos;
					  clientPlayer.direction = client.player.direction;
					  clientPlayer.currentAnim = client.player.currentAnim;

				}
			}
				 //playerlist = data.playerlist;
				 // tao player va hien thi

		});
		var  player = this.getEntitiesByType(EntityPlayer)[0];
		for (var playerClient of playerlist) {
			if(playerClient.id === userId)
			continue
			var settings = {health: 100 , name: playerClient.id };
				const client = this.getEntityByName(playerClient.id);
				if(!client) {
					this.spawnEntity(EntityPlayerClient, playerClient.player.pos.x, playerClient.player.pos.y, settings);
					console.log('spawn ',playerClient );
				}
				else {
					client.pos.x = playerClient.player.pos.x;
					client.pos.y = playerClient.player.pos.y;
					client.direction = playerClient.player.direction;
				}
			//that.spawnEntity(EntityPlayerClient, playerClient.position.x, playerClient.position.y, settings);

		}


		if(player){
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
		// Add your own, additional update code here


	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		var  player = this.getEntitiesByType(EntityPlayer)[0];

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		//
		this.font.draw( player.messagebox, x, y, ig.Font.ALIGN.CENTER );

		socket.emit('player-move', {
			id: userId,
			player
		});


	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

});
