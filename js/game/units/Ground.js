
(function(){
	'use strict';
	
	var width = 2000, depth = 14000;
	
	window.Ground = Board.extend({
		init: function(){
			//this._super(width, depth, 'img/textures/diamond.png');
			this._super(width, depth, this._class.color);
			this.scale.z = 3;
			// plane
			this.plane = this._class.plane;
			
			// rotation
			this.rotation.x = - Math.PI / 2;
			
			// fraction
			this.friction = this._class.friction;
			
			return this;
		}
	}, {
		type: 'ground',
		
		width: width,
		depth: depth,
		color: 0x009900,
		
		friction: 0.18,
		
		plane: new THREE.Plane(new THREE.Vector3(0, 1, 0))
	});
})();
