ig.module (
    'game.entities.player'
)

.requires(
    'impact.entity'
)
.defines(function(){

    EntityPlayer = ig.Entity.extend({
        size: {x: 32, y: 48},
        type: ig.Entity.TYPE.A,
	     checkAgainst: ig.Entity.TYPE.NONE,
	     collides: ig.Entity.COLLIDES.PASSIVE,
        messagebox: "Player1",
        speed:100,
        animSheet: new ig.AnimationSheet( 'media/player.png', 32, 48 ),

        init: function( x, y, settings ) {
      		this.parent( x, y, settings );

      		// Add the animations
      		this.addAnim( 'up', .21, [9,10,11] );
      		this.addAnim( 'down', .21, [0,1,2] );
            this.addAnim( 'left', .21, [3,4,5] );
            this.addAnim( 'right', .21, [6,7,8] );
            this.addAnim( 'idleup', 0.1, [10] );
            this.addAnim( 'idledown', 0.1, [1] );
            this.addAnim( 'idleleft', 0.1, [4] );
            this.addAnim( 'idleright', 0.1, [7] );
            this.currentAnim = this.anims.idleleft;

   	},

        	update: function() {
            	if( ig.input.state('left') && ismove != 1 && ismove != 2 && ismove != 4) {
	               this.vel.x = -this.speed;
                 ismove = 3;
                 this.direction = 3;
                 this.currentAnim = this.anims.left;
			      }
         		else if( ig.input.state('right')  && ismove != 1 && ismove != 3 && ismove != 4) {
         			this.vel.x = +this.speed;
                  ismove = 2;
                  this.direction = 2;
                  this.currentAnim = this.anims.right;
         		}
                else if( ig.input.state('up')  && ismove != 3 && ismove != 2 && ismove != 4) {
			         this.vel.y = -this.speed;
                  ismove = 1;
                  this.direction = 1;
                  this.currentAnim = this.anims.up;
		    	   }
                else if( ig.input.state('down')  && ismove != 1 && ismove != 2 && ismove != 3) {
         			this.vel.y = +this.speed;
                  ismove = 4;
                  this.direction = 4;
                  this.currentAnim = this.anims.down;
         		}
         		else {
         			this.vel.x = 0;
                  this.vel.y = 0;
                  ismove = 0;

                  if( this.direction == 4 )
                  {
                      this.currentAnim = this.anims.idledown;
                   // currentanimation = 6;
                  }
                  if( this.direction == 3 )
                  {
                      this.currentAnim = this.anims.idleleft;
                   // currentanimation = 7;
                  }
                  if( this.direction == 2 )
                  {
                      this.currentAnim = this.anims.idleright;
                   // currentanimation = 8;
                  }
                  if( this.direction == 1 )
                  {
                      this.currentAnim = this.anims.idleup;
                   // currentanimation = 5;
                  }
         		}


        this.parent();
                }
    });

    EntityPlayerClient = ig.Entity.extend({
        size: {x: 32, y: 48},
        type: ig.Entity.TYPE.A,
	     checkAgainst: ig.Entity.TYPE.NONE,
	     collides: ig.Entity.COLLIDES.PASSIVE,
        messagebox: "Player2",
        speed:100,
        animSheet: new ig.AnimationSheet( 'media/player.png', 32, 48 ),

        init: function( x, y, settings ) {
      		this.parent( x, y, settings );

      		// Add the animations
      		this.addAnim( 'up', .21, [9,10,11] );
      		this.addAnim( 'down', .21, [0,1,2] );
            this.addAnim( 'left', .21, [3,4,5] );
            this.addAnim( 'right', .21, [6,7,8] );
            this.addAnim( 'idleup', 0.1, [10] );
            this.addAnim( 'idledown', 0.1, [1] );
            this.addAnim( 'idleleft', 0.1, [4] );
            this.addAnim( 'idleright', 0.1, [7] );
            this.currentAnim = this.anims.idleleft;

   	},

        	update: function() {
            	// if( ig.input.state('left') && ismove != 1 && ismove != 2 && ismove != 4) {
	            //    this.pos.x = -this.speed;
               //   ismove = 3;
               //   this.direction = 3;
               //   this.currentAnim = this.anims.left;
			      // }
         		// else if( ig.input.state('right')  && ismove != 1 && ismove != 3 && ismove != 4) {
         		// 	this.pos.x = +this.speed;
               //    ismove = 2;
               //    this.direction = 2;
               //    this.currentAnim = this.anims.right;
         		// }
               //  else if( ig.input.state('up')  && ismove != 3 && ismove != 2 && ismove != 4) {
			      //    this.vel.y = -this.speed;
               //    ismove = 1;
               //    this.direction = 1;
               //    this.currentAnim = this.anims.up;
		    	   // }
               //  else if( ig.input.state('down')  && ismove != 1 && ismove != 2 && ismove != 3) {
         		// 	this.vel.y = +this.speed;
               //    ismove = 4;
               //    this.direction = 4;
               //    this.currentAnim = this.anims.down;
         		// }
         		// else {
         		// 	this.vel.x = 0;
               //    this.vel.y = 0;
               //    ismove = 0;
               //
               //    if( this.direction == 4 )
               //    {
               //        this.currentAnim = this.anims.idledown;
               //     // currentanimation = 6;
               //    }
               //    if( this.direction == 3 )
               //    {
               //        this.currentAnim = this.anims.idleleft;
               //     // currentanimation = 7;
               //    }
               //    if( this.direction == 2 )
               //    {
               //        this.currentAnim = this.anims.idleright;
               //     // currentanimation = 8;
               //    }
               //    if( this.direction == 1 )
               //    {
               //        this.currentAnim = this.anims.idleup;
               //     // currentanimation = 5;
               //    }
         		// }


        this.parent();
                }
    });
});
 ///////////////////////////////Enemy Other Players////////////////////////////////
